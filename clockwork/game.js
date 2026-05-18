// game.js — The Clockmaker's Workshop
// Save slots, chapter progression, challenge dispatcher.

// ============================================================
// SAVE SLOTS
// ============================================================
const Slots = {
  KEY: 'clockwork_slots_v1',
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
  // Persistent chapter map for grid-based chapters (Chapter 3: Floor Plan)
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
    // Large back gear (slowly turning)
    '<g class="emblem-gear-slow" style="transform-origin: 90px 90px;">' +
    '<circle cx="90" cy="90" r="58" fill="#7a5018" stroke="#3a2010" stroke-width="2"/>' +
    '<circle cx="90" cy="90" r="48" fill="#b8902a" stroke="#3a2010" stroke-width="1.5"/>' +
    // teeth (12)
    (() => {
      let s = '';
      for (let i = 0; i < 12; i++) {
        const a = (i * 30) * Math.PI / 180;
        const x1 = 90 + Math.cos(a) * 58, y1 = 90 + Math.sin(a) * 58;
        const x2 = 90 + Math.cos(a) * 70, y2 = 90 + Math.sin(a) * 70;
        const ap = ((i * 30) - 8) * Math.PI / 180;
        const an = ((i * 30) + 8) * Math.PI / 180;
        const px = 90 + Math.cos(ap) * 58, py = 90 + Math.sin(ap) * 58;
        const nx = 90 + Math.cos(an) * 58, ny = 90 + Math.sin(an) * 58;
        s += '<polygon points="' + px + ',' + py + ' ' + (90 + Math.cos(ap) * 68) + ',' + (90 + Math.sin(ap) * 68) + ' ' + (90 + Math.cos(an) * 68) + ',' + (90 + Math.sin(an) * 68) + ' ' + nx + ',' + ny + '" fill="#7a5018"/>';
      }
      return s;
    })() +
    '<circle cx="90" cy="90" r="12" fill="#3a2010"/>' +
    '<circle cx="90" cy="90" r="5" fill="#d4a624"/>' +
    '</g>' +
    // Small front gear (faster)
    '<g class="emblem-gear-fast" style="transform-origin: 138px 50px;">' +
    '<circle cx="138" cy="50" r="20" fill="#8a4818" stroke="#3a1810" stroke-width="1.5"/>' +
    (() => {
      let s = '';
      for (let i = 0; i < 8; i++) {
        const a = (i * 45 + 22.5) * Math.PI / 180;
        const x = 138 + Math.cos(a) * 24, y = 50 + Math.sin(a) * 24;
        s += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#8a4818" stroke="#3a1810" stroke-width="1"/>';
      }
      return s;
    })() +
    '<circle cx="138" cy="50" r="5" fill="#3a1810"/>' +
    '</g>' +
    // Clock hands at center (still)
    '<line x1="90" y1="90" x2="90" y2="58" stroke="#1a1008" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="90" y1="90" x2="112" y2="90" stroke="#1a1008" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="90" cy="90" r="3" fill="#1a1008"/>' +
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
        '<div class="slot-card-title">Empty Bench</div>' +
        '<div class="slot-card-empty-hint">Tap to begin a new apprenticeship.</div>';
    } else {
      const inProg = summary.inProgress;
      const resume = inProg ? '<div class="resume-line">▶ ' + inProg.title + ' — Job ' + (inProg.currentChallenge + 1) + ' of ' + inProg.total + '</div>' : '';
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
    const resume = inProg ? '<span class="resume-tag">Resume Job ' + (state.currentChallenge + 1) + '</span>' : '';
    card.innerHTML = stamp + lock +
      '<div class="chapter-card-num">Chapter ' + (i + 1) + '</div>' +
      '<div class="chapter-card-title">' + ch.title + '</div>' +
      '<div class="chapter-card-desc">' + ch.description + '</div>' +
      '<div class="chapter-card-progress">' + ch.challenges.length + ' jobs' + resume + '</div>';
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
    case 'coordWord':
      if (challenge.start) addMarker(challenge.start[0], challenge.start[1], challenge.startLabel || 'Start');
      if (challenge.target) addMarker(challenge.target.x, challenge.target.y, challenge.landmark || '');
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
  document.getElementById('complete-emblem').textContent = chapter.emblem || '⚙️';
  document.getElementById('complete-text').innerHTML = chapter.outro || '';
  showScreen('chapter-complete');
  const allDone = CHAPTERS.every(c => Slots.isChapterComplete(c.id));
  const btn = document.getElementById('btn-back-to-workshop');
  btn.textContent = allDone ? 'Climb the Tower' : 'Back to the Workshop';
  btn.onclick = () => {
    if (allDone) {
      document.getElementById('final-text').innerHTML =
        '<p>Mr. Cogworth flips the final lever. Deep inside the tower, the great gear catches the small gear, the small gear catches the escapement, and the escapement begins to tick.</p>' +
        '<p><em>Tick. Tick. Tick.</em></p>' +
        '<p>The minute hand sweeps. The hour hand follows. The tower clock rings out across the town square — one, two, three full chimes — and the townsfolk stop in the street to listen.</p>' +
        '<p>"You read patterns like a clockmaker," Mr. Cogworth says, dusting brass shavings from his apron. "You sorted shapes, plotted the workshop floor, and untangled every expression I threw at you. Off you go, apprentice. The next tower won\'t build itself."</p>';
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
