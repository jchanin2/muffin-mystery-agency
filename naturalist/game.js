// game.js — Foxglove Hollow: A Field Notebook
// Save slots, chapter progression, challenge dispatcher.

// ============================================================
// SAVE SLOTS
// ============================================================
const Slots = {
  KEY: 'naturalist_slots_v1',
  NUM_SLOTS: 3,
  activeIndex: 0,
  _data: null,

  load() {
    if (this._data) return this._data;
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) this._data = JSON.parse(raw);
    } catch (e) { /* fall through */ }
    if (!this._data) this._data = { slots: [null, null, null], activeIndex: 0 };
    if (!Array.isArray(this._data.slots) || this._data.slots.length !== this.NUM_SLOTS) {
      this._data.slots = [null, null, null];
    }
    if (typeof this._data.activeIndex !== 'number' || this._data.activeIndex < 0 || this._data.activeIndex >= this.NUM_SLOTS) {
      this._data.activeIndex = 0;
    }
    this.activeIndex = this._data.activeIndex;
    return this._data;
  },
  persist() { try { localStorage.setItem(this.KEY, JSON.stringify(this._data)); } catch (e) {} },
  getSlots() { this.load(); return this._data.slots; },
  getActive() { this.load(); return this._data.slots[this.activeIndex]; },
  ensureActive() {
    this.load();
    if (!this._data.slots[this.activeIndex]) {
      this._data.slots[this.activeIndex] = { chapters: {}, createdAt: Date.now(), lastPlayed: Date.now() };
    }
    return this._data.slots[this.activeIndex];
  },
  selectSlot(idx) { this.load(); this.activeIndex = idx; this._data.activeIndex = idx; this.persist(); },
  deleteSlot(idx) { this.load(); this._data.slots[idx] = null; this.persist(); },
  chapterState(id) { const s = this.getActive(); return (s && s.chapters && s.chapters[id]) || null; },
  saveChapterState(id, state) {
    const slot = this.ensureActive();
    if (!slot.chapters) slot.chapters = {};
    slot.chapters[id] = Object.assign({}, slot.chapters[id] || {}, state);
    slot.lastPlayed = Date.now();
    this.persist();
  },
  markChapterComplete(id) {
    const slot = this.ensureActive();
    if (!slot.chapters) slot.chapters = {};
    slot.chapters[id] = { completed: true, currentChallenge: 0 };
    slot.lastPlayed = Date.now();
    this.persist();
  },
  isChapterComplete(id) {
    const s = this.getActive();
    return !!(s && s.chapters && s.chapters[id] && s.chapters[id].completed);
  },
  isChapterUnlocked(idx) {
    if (idx === 0) return true;
    return this.isChapterComplete(CHAPTERS[idx - 1].id);
  },
  snapshotChapter() {
    if (!Game.currentChapter) return;
    this.saveChapterState(Game.currentChapter.id, { currentChallenge: Game.currentChallengeIndex });
  },
  summary(idx) {
    this.load();
    const slot = this._data.slots[idx];
    if (!slot) return { isEmpty: true };
    const chapters = slot.chapters || {};
    const completed = Object.values(chapters).filter(c => c.completed).length;
    let inProg = null;
    for (const ch of CHAPTERS) {
      const st = chapters[ch.id];
      if (st && !st.completed && typeof st.currentChallenge === 'number' && st.currentChallenge > 0) {
        inProg = { id: ch.id, title: ch.title, currentChallenge: st.currentChallenge, total: ch.challenges.length };
        break;
      }
    }
    return { isEmpty: false, completedCount: completed, totalChapters: CHAPTERS.length, inProgress: inProg, lastPlayed: slot.lastPlayed };
  }
};

// ============================================================
// GAME STATE
// ============================================================
const Game = {
  currentScreen: 'title',
  currentChapter: null,
  currentChallengeIndex: 0,
  activeEvaluator: null,
  // Persistent chapter map for grid-based chapters (mainly Chapter 4)
  chapterMap: { markers: [], paths: [] }
};

function _resetChapterMap() {
  Game.chapterMap = { markers: [], paths: [] };
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  Game.currentScreen = id;
}

function _formatLastPlayed(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  if (d.toDateString() === now.toDateString()) return 'today';
  const diff = Math.floor((now - d) / dayMs);
  if (diff === 1) return 'yesterday';
  if (diff < 7) return diff + ' days ago';
  return d.toLocaleDateString();
}

// ============================================================
// TITLE EMBLEM (SVG)
// ============================================================
function renderTitleEmblem() {
  const el = document.getElementById('title-emblem');
  if (!el) return;
  el.innerHTML =
    '<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">' +
    // Notebook
    '<rect x="34" y="40" width="112" height="110" fill="#3a2010" stroke="#1a1008" stroke-width="2.5" rx="3"/>' +
    '<rect x="38" y="44" width="104" height="102" fill="#f0e3bd" rx="1"/>' +
    '<line x1="50" y1="44" x2="50" y2="146" stroke="#aa3838" stroke-width="0.6"/>' +
    // Lines on page
    '<line x1="56" y1="60" x2="138" y2="60" stroke="#3a2010" stroke-width="0.4" opacity="0.6"/>' +
    '<line x1="56" y1="70" x2="130" y2="70" stroke="#3a2010" stroke-width="0.4" opacity="0.6"/>' +
    '<line x1="56" y1="80" x2="138" y2="80" stroke="#3a2010" stroke-width="0.4" opacity="0.6"/>' +
    // Sketched leaf on the page
    '<ellipse cx="80" cy="110" rx="22" ry="13" fill="#7a8a48" transform="rotate(-20 80 110)"/>' +
    '<line x1="100" y1="100" x2="64" y2="120" stroke="#3a2010" stroke-width="0.7"/>' +
    '<line x1="78" y1="103" x2="84" y2="116" stroke="#3a2010" stroke-width="0.5"/>' +
    '<line x1="85" y1="100" x2="78" y2="117" stroke="#3a2010" stroke-width="0.5"/>' +
    // Quill feather across notebook
    '<path d="M 120 30 Q 150 50 145 95 Q 140 120 125 130" fill="#c47828" stroke="#3a2010" stroke-width="1.5"/>' +
    '<path d="M 130 50 Q 138 60 140 75 M 125 70 Q 135 80 138 95 M 122 90 Q 130 100 134 112" stroke="#3a2010" stroke-width="0.5" fill="none"/>' +
    // Magnifying glass
    '<circle cx="44" cy="156" r="16" fill="rgba(170, 220, 200, 0.25)" stroke="#aa8838" stroke-width="2.5"/>' +
    '<line x1="32" y1="168" x2="22" y2="178" stroke="#aa8838" stroke-width="3.5" stroke-linecap="round"/>' +
    '<circle cx="38" cy="150" r="2" fill="rgba(255,255,255,0.4)"/>' +
    // Acorn corner decoration
    '<ellipse cx="158" cy="42" rx="6" ry="8" fill="#8a4818"/>' +
    '<path d="M 152 38 Q 158 32 164 38" fill="#5a3018"/>' +
    '<line x1="158" y1="32" x2="158" y2="28" stroke="#5a3018" stroke-width="1"/>' +
    '</svg>';
}

// ============================================================
// SLOT PICKER
// ============================================================
function renderSlotPicker() {
  const list = document.getElementById('slots-list');
  list.innerHTML = '';
  for (let i = 0; i < Slots.NUM_SLOTS; i++) {
    const summary = Slots.summary(i);
    const isActive = i === Slots.activeIndex && !summary.isEmpty;
    const card = document.createElement('div');
    card.className = 'slot-card' + (summary.isEmpty ? ' empty' : '') + (isActive ? ' active' : '');
    if (summary.isEmpty) {
      card.innerHTML =
        '<div class="slot-card-number">Slot ' + (i + 1) + '</div>' +
        '<div class="slot-card-title">Empty</div>' +
        '<div class="slot-card-empty-hint">Tap to start a new notebook.</div>';
    } else {
      const inProg = summary.inProgress;
      const resume = inProg ? '<div class="resume-line">▶ ' + inProg.title + ' — Page ' + (inProg.currentChallenge + 1) + ' of ' + inProg.total + '</div>' : '';
      card.innerHTML =
        '<div class="slot-card-number">Slot ' + (i + 1) + '</div>' +
        '<div class="slot-card-title">Apprentice ' + (i + 1) + '</div>' +
        '<div class="slot-card-stats">' +
          '<div class="stat-line"><span>Chapters complete</span><span>' + summary.completedCount + ' of ' + summary.totalChapters + '</span></div>' +
          resume +
        '</div>' +
        '<div class="slot-card-last-played">Last opened ' + _formatLastPlayed(summary.lastPlayed) + '</div>' +
        '<button class="slot-card-delete" title="Delete this save">✕</button>';
    }
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('slot-card-delete')) return;
      Slots.selectSlot(i);
      renderChapterMap();
      showScreen('chapters');
    });
    const del = card.querySelector('.slot-card-delete');
    if (del) del.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Delete Slot ' + (i + 1) + '? This cannot be undone.')) {
        Slots.deleteSlot(i);
        renderSlotPicker();
      }
    });
    list.appendChild(card);
  }
}

// ============================================================
// CHAPTER MAP
// ============================================================
function renderChapterMap() {
  const list = document.getElementById('chapter-list');
  list.innerHTML = '';
  document.getElementById('active-slot-label').textContent =
    'Apprentice ' + (Slots.activeIndex + 1) + ' · ' +
    (Slots.summary(Slots.activeIndex).completedCount || 0) + '/' + CHAPTERS.length + ' chapters';
  CHAPTERS.forEach((ch, i) => {
    const unlocked = Slots.isChapterUnlocked(i);
    const complete = Slots.isChapterComplete(ch.id);
    const state = Slots.chapterState(ch.id);
    const inProg = state && !state.completed && typeof state.currentChallenge === 'number' && state.currentChallenge > 0;
    const card = document.createElement('div');
    card.className = 'chapter-card' + (!unlocked ? ' locked' : '') + (complete ? ' complete' : '');
    const stamp = complete ? '<div class="chapter-card-stamp">Complete</div>' : '';
    const lock = !unlocked ? '<div class="chapter-card-lock">🔒</div>' : '';
    const resume = inProg ? '<span class="resume-tag">Resume p.' + (state.currentChallenge + 1) + '</span>' : '';
    card.innerHTML = stamp + lock +
      '<div class="chapter-card-num">Chapter ' + (i + 1) + '</div>' +
      '<div class="chapter-card-title">' + ch.title + '</div>' +
      '<div class="chapter-card-desc">' + ch.description + '</div>' +
      '<div class="chapter-card-progress">' + ch.challenges.length + ' pages' + resume + '</div>';
    if (unlocked) card.addEventListener('click', () => startChapter(ch));
    list.appendChild(card);
  });
}

// ============================================================
// CHAPTER LIFECYCLE
// ============================================================
function startChapter(chapter) {
  Game.currentChapter = chapter;
  _resetChapterMap();
  const state = Slots.chapterState(chapter.id);
  const resumeIdx = (state && !state.completed && typeof state.currentChallenge === 'number' && state.currentChallenge > 0) ? state.currentChallenge : 0;
  // Rebuild the persistent map from prior challenges if resuming
  for (let i = 0; i < resumeIdx; i++) {
    _applyChallengeMapAdditions(chapter.challenges[i]);
  }
  if (resumeIdx > 0) {
    Game.currentChallengeIndex = resumeIdx;
    showScreen('challenge');
    renderChallenge();
  } else {
    Game.currentChallengeIndex = 0;
    Slots.snapshotChapter();
    showChapterIntro(chapter, () => { showScreen('challenge'); renderChallenge(); });
  }
}

function _applyChallengeMapAdditions(challenge) {
  if (!challenge) return;
  const m = Game.chapterMap;
  const addMarker = (x, y, label) => {
    const ex = m.markers.find(p => p.x === x && p.y === y);
    if (ex) { if (label && !ex.label) ex.label = label; }
    else m.markers.push({ x, y, label: label || '' });
  };
  switch (challenge.type) {
    case 'gridClick':
      if (challenge.landmark) addMarker(challenge.target.x, challenge.target.y, challenge.landmark);
      break;
    case 'identifyPoint':
      if (challenge.landmark) addMarker(challenge.marker.x, challenge.marker.y, challenge.landmark);
      break;
    case 'distance':
      addMarker(challenge.pointA[0], challenge.pointA[1], challenge.endpointA || '');
      addMarker(challenge.pointB[0], challenge.pointB[1], challenge.endpointB || challenge.landmark || '');
      m.paths.push({ from: challenge.pointA, to: challenge.pointB, label: challenge.pathLabel || '' });
      break;
  }
}

function showChapterIntro(chapter, onContinue) {
  const overlay = document.getElementById('chapter-intro-overlay');
  if (!overlay) { onContinue(); return; }
  document.getElementById('chapter-intro-title').textContent = chapter.title;
  document.getElementById('chapter-intro-text').innerHTML = chapter.intro;
  const illusEl = document.getElementById('chapter-intro-illustration');
  if (illusEl) {
    illusEl.innerHTML = chapter.illustration || '';
    illusEl.style.display = chapter.illustration ? 'block' : 'none';
  }
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('active'));
  const btn = document.getElementById('btn-chapter-intro-continue');
  const handler = () => {
    btn.removeEventListener('click', handler);
    overlay.classList.remove('active');
    setTimeout(() => { overlay.style.display = 'none'; onContinue(); }, 250);
  };
  btn.addEventListener('click', handler);
}

function renderChallenge() {
  const ch = Game.currentChapter;
  const idx = Game.currentChallengeIndex;
  const challenge = ch.challenges[idx];
  document.getElementById('game-chapter-title').textContent = ch.title;
  document.getElementById('progress-current').textContent = idx + 1;
  document.getElementById('progress-total').textContent = ch.challenges.length;

  const story = document.getElementById('challenge-story');
  story.innerHTML = challenge.story || '';
  story.style.display = challenge.story ? 'block' : 'none';

  document.getElementById('challenge-prompt').innerHTML = challenge.prompt || '';

  const area = document.getElementById('challenge-area');
  area.innerHTML = '';

  const fb = document.getElementById('challenge-feedback');
  fb.textContent = '';
  fb.className = 'challenge-feedback';

  document.getElementById('btn-check').style.display = 'inline-block';
  document.getElementById('btn-check').disabled = false;
  document.getElementById('btn-continue').style.display = 'none';

  const fn = Challenges[challenge.type];
  if (typeof fn !== 'function') {
    area.textContent = 'Unknown challenge type: ' + challenge.type;
    Game.activeEvaluator = null;
    return;
  }
  Game.activeEvaluator = fn.call(Challenges, challenge, area, Game.chapterMap);
}

function handleCheck() {
  if (!Game.activeEvaluator) return;
  const result = Game.activeEvaluator.evaluate();
  const fb = document.getElementById('challenge-feedback');
  fb.textContent = result.message;
  fb.className = 'challenge-feedback ' + (result.ok ? 'correct' : 'wrong');
  if (result.ok) {
    document.getElementById('btn-check').style.display = 'none';
    document.getElementById('btn-continue').style.display = 'inline-block';
    _applyChallengeMapAdditions(Game.currentChapter.challenges[Game.currentChallengeIndex]);
  }
}

function handleContinue() {
  Game.currentChallengeIndex++;
  const ch = Game.currentChapter;
  if (Game.currentChallengeIndex >= ch.challenges.length) {
    Slots.markChapterComplete(ch.id);
    showChapterComplete(ch);
    return;
  }
  Slots.snapshotChapter();
  renderChallenge();
}

function showChapterComplete(chapter) {
  document.getElementById('complete-chapter-title').textContent = chapter.title;
  document.getElementById('complete-emblem').textContent = chapter.emblem || '🍃';
  document.getElementById('complete-text').innerHTML = chapter.outro || '';
  showScreen('chapter-complete');
  const allDone = CHAPTERS.every(c => Slots.isChapterComplete(c.id));
  const btn = document.getElementById('btn-back-to-notebook');
  btn.textContent = allDone ? 'Close the Notebook' : 'Back to the Notebook';
  btn.onclick = () => {
    if (allDone) {
      document.getElementById('final-text').innerHTML =
        '<p>You return the notebook to its proper shelf in Professor Quill\'s study. She nods at you over her glasses and pours another cup of tea.</p>' +
        '<p>"You read line plots like an old hand now," she says. "You map a grid like a surveyor. And you have measured, recorded, calculated, and concluded — without me lifting a single quill once your hand was steady. Take a season off, dear apprentice. There will always be more leaves."</p>' +
        '<p>The Foxglove Hollow notebook closes itself.</p>';
      showScreen('final');
    } else {
      renderChapterMap(); showScreen('chapters');
    }
  };
}

// ============================================================
// EVENT WIRING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  Slots.load();
  renderTitleEmblem();
  document.getElementById('btn-start').addEventListener('click', () => { renderSlotPicker(); showScreen('slots'); });
  document.getElementById('btn-slots-back').addEventListener('click', () => showScreen('title'));
  document.getElementById('btn-chapters-back').addEventListener('click', () => { renderSlotPicker(); showScreen('slots'); });
  document.getElementById('btn-switch-slot').addEventListener('click', () => { renderSlotPicker(); showScreen('slots'); });
  document.getElementById('btn-game-back').addEventListener('click', () => { Slots.snapshotChapter(); renderChapterMap(); showScreen('chapters'); });
  document.getElementById('btn-check').addEventListener('click', handleCheck);
  document.getElementById('btn-continue').addEventListener('click', handleContinue);
  document.getElementById('btn-final-back').addEventListener('click', () => showScreen('title'));
});
