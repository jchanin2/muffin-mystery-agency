// game.js — Captain Cartwright's Atlas
// Screen flow, save slots, chapter progression, challenge dispatcher.

// ============================================================
// SAVE SLOTS — three independent profiles, each tracking which
// chapters are completed AND mid-chapter progress.
// ============================================================
const Slots = {
  KEY: 'atlas_slots_v1',
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

  persist() {
    try { localStorage.setItem(this.KEY, JSON.stringify(this._data)); } catch (e) { /* silent */ }
  },

  getSlots() { this.load(); return this._data.slots; },
  getActive() { this.load(); return this._data.slots[this.activeIndex]; },
  ensureActive() {
    this.load();
    if (!this._data.slots[this.activeIndex]) {
      this._data.slots[this.activeIndex] = {
        chapters: {},     // id → { completed: bool, currentChallenge: idx }
        createdAt: Date.now(),
        lastPlayed: Date.now()
      };
    }
    return this._data.slots[this.activeIndex];
  },
  selectSlot(idx) { this.load(); this.activeIndex = idx; this._data.activeIndex = idx; this.persist(); },
  deleteSlot(idx) { this.load(); this._data.slots[idx] = null; this.persist(); },

  chapterState(chapterId) {
    const slot = this.getActive();
    if (!slot || !slot.chapters) return null;
    return slot.chapters[chapterId] || null;
  },

  saveChapterState(chapterId, state) {
    const slot = this.ensureActive();
    if (!slot.chapters) slot.chapters = {};
    slot.chapters[chapterId] = Object.assign({}, slot.chapters[chapterId] || {}, state);
    slot.lastPlayed = Date.now();
    this.persist();
  },

  markChapterComplete(chapterId) {
    const slot = this.ensureActive();
    if (!slot.chapters) slot.chapters = {};
    slot.chapters[chapterId] = { completed: true, currentChallenge: 0 };
    slot.lastPlayed = Date.now();
    this.persist();
  },

  isChapterComplete(chapterId) {
    const slot = this.getActive();
    return !!(slot && slot.chapters && slot.chapters[chapterId] && slot.chapters[chapterId].completed);
  },

  // Chapters unlock left-to-right. Chapter 0 is always unlocked.
  // Chapter N is unlocked iff chapter N-1 is complete.
  isChapterUnlocked(idx) {
    if (idx === 0) return true;
    const prev = CHAPTERS[idx - 1];
    return this.isChapterComplete(prev.id);
  },

  // Snapshot the current chapter progress
  snapshotChapter() {
    if (!Game.currentChapter) return;
    this.saveChapterState(Game.currentChapter.id, {
      currentChallenge: Game.currentChallengeIndex
    });
  },

  summary(idx) {
    this.load();
    const slot = this._data.slots[idx];
    if (!slot) return { isEmpty: true };
    const chapters = slot.chapters || {};
    const completedCount = Object.values(chapters).filter(c => c.completed).length;
    let inProgress = null;
    for (const ch of CHAPTERS) {
      const st = chapters[ch.id];
      if (st && !st.completed && typeof st.currentChallenge === 'number' && st.currentChallenge > 0) {
        inProgress = { id: ch.id, title: ch.title, currentChallenge: st.currentChallenge, total: ch.challenges.length };
        break;
      }
    }
    return {
      isEmpty: false,
      completedCount,
      totalChapters: CHAPTERS.length,
      inProgress,
      lastPlayed: slot.lastPlayed
    };
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
  // Per-chapter accumulating map state — every grid challenge in a
  // chapter draws this PLUS its own task; on successful completion
  // the new landmark is committed here so the next challenge sees it.
  chapterMap: { markers: [], shapes: [], paths: [] }
};

function _resetChapterMap() {
  Game.chapterMap = { markers: [], shapes: [], paths: [] };
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenId).classList.add('active');
  Game.currentScreen = screenId;
}

// ============================================================
// SLOT PICKER
// ============================================================
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

function renderSlotPicker() {
  const list = document.getElementById('slots-list');
  if (!list) return;
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
        '<div class="slot-card-empty-hint">Tap to begin a new atlas.</div>';
    } else {
      const inProg = summary.inProgress;
      const resumeLine = inProg
        ? '<div class="resume-line">▶ ' + inProg.title + ' — Page ' + (inProg.currentChallenge + 1) + ' of ' + inProg.total + '</div>'
        : '';
      card.innerHTML =
        '<div class="slot-card-number">Slot ' + (i + 1) + '</div>' +
        '<div class="slot-card-title">Cartographer ' + (i + 1) + '</div>' +
        '<div class="slot-card-stats">' +
          '<div class="stat-line"><span>Chapters complete</span><span>' + summary.completedCount + ' of ' + summary.totalChapters + '</span></div>' +
          resumeLine +
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
    const delBtn = card.querySelector('.slot-card-delete');
    if (delBtn) delBtn.addEventListener('click', (e) => {
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
    'Cartographer ' + (Slots.activeIndex + 1) + ' · ' +
    (Slots.summary(Slots.activeIndex).completedCount || 0) + '/' + CHAPTERS.length + ' chapters';

  CHAPTERS.forEach((ch, i) => {
    const unlocked = Slots.isChapterUnlocked(i);
    const complete = Slots.isChapterComplete(ch.id);
    const state = Slots.chapterState(ch.id);
    const inProgress = state && !state.completed && typeof state.currentChallenge === 'number' && state.currentChallenge > 0;

    const card = document.createElement('div');
    card.className = 'chapter-card' + (!unlocked ? ' locked' : '') + (complete ? ' complete' : '');

    const stamp = complete ? '<div class="chapter-card-stamp">Complete</div>' : '';
    const lock = !unlocked ? '<div class="chapter-card-lock">🔒</div>' : '';
    const resume = inProgress
      ? '<span class="resume-tag">Resume p.' + (state.currentChallenge + 1) + '</span>'
      : '';

    card.innerHTML =
      stamp + lock +
      '<div class="chapter-card-num">Chapter ' + (i + 1) + '</div>' +
      '<div class="chapter-card-title">' + ch.title + '</div>' +
      '<div class="chapter-card-desc">' + ch.description + '</div>' +
      '<div class="chapter-card-progress">' +
        ch.challenges.length + ' pages' + resume +
      '</div>';

    if (unlocked) {
      card.addEventListener('click', () => startChapter(ch));
    }
    list.appendChild(card);
  });
}

// ============================================================
// CHAPTER LIFECYCLE
// ============================================================
function startChapter(chapter) {
  Game.currentChapter = chapter;
  _resetChapterMap();
  // Replay any earlier challenges' map additions if resuming mid-chapter
  // (so the persistent map reflects everything Jacob has already plotted).
  const state = Slots.chapterState(chapter.id);
  const resumeIdx = (state && !state.completed && typeof state.currentChallenge === 'number' && state.currentChallenge > 0)
    ? state.currentChallenge : 0;
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
    showChapterIntro(chapter, () => {
      showScreen('challenge');
      renderChallenge();
    });
  }
}

// Commit a challenge's map additions (the items it would have placed
// on the persistent map when answered correctly). Used both when the
// student succeeds AND when resuming mid-chapter to rebuild the map.
function _applyChallengeMapAdditions(challenge) {
  if (!challenge) return;
  const m = Game.chapterMap;
  // Add a marker only if there isn't already one at the same coords.
  const addMarker = (x, y, label) => {
    const existing = m.markers.find(p => p.x === x && p.y === y);
    if (existing) {
      if (label && !existing.label) existing.label = label;
    } else {
      m.markers.push({ x, y, label: label || '' });
    }
  };
  switch (challenge.type) {
    case 'gridClick':
      if (challenge.landmark) addMarker(challenge.target.x, challenge.target.y, challenge.landmark);
      break;
    case 'identifyPoint':
      if (challenge.landmark) addMarker(challenge.marker.x, challenge.marker.y, challenge.landmark);
      break;
    case 'plotShape':
      if (!challenge.landmark) break;
      if (challenge.connect === 'line') {
        challenge.points.forEach((p, i) => addMarker(p[0], p[1], i === 0 ? challenge.landmark : ''));
      } else {
        m.shapes.push({ points: challenge.points.slice(), label: challenge.landmark });
      }
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
  // Render the chapter illustration above the title if provided
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
    // Commit this challenge's contribution to the persistent map
    _applyChallengeMapAdditions(Game.currentChapter.challenges[Game.currentChallengeIndex]);
  }
}

function handleContinue() {
  Game.currentChallengeIndex++;
  const ch = Game.currentChapter;
  if (Game.currentChallengeIndex >= ch.challenges.length) {
    // Chapter complete
    Slots.markChapterComplete(ch.id);
    showChapterComplete(ch);
    return;
  }
  Slots.snapshotChapter();
  renderChallenge();
}

function showChapterComplete(chapter) {
  document.getElementById('complete-chapter-title').textContent = chapter.title;
  document.getElementById('complete-treasure').textContent = chapter.treasure || '🗝️';
  document.getElementById('complete-text').innerHTML = chapter.outro || '';
  showScreen('chapter-complete');
  // Check if all chapters complete → final screen on next "back"
  const allDone = CHAPTERS.every(c => Slots.isChapterComplete(c.id));
  const btn = document.getElementById('btn-back-to-atlas');
  btn.textContent = allDone ? 'Open the Captain\'s Treasure' : 'Back to the Atlas';
  btn.onclick = () => {
    if (allDone) {
      document.getElementById('final-text').innerHTML =
        '<p>Every page of the captain\'s atlas read. Every coordinate plotted. Every shape sorted, every rule followed, every cipher broken.</p>' +
        '<p>The treasure was never just the gold — the captain wanted a cartographer who could read his work as carefully as he made it. You read it perfectly.</p>' +
        '<p>The atlas closes itself.</p>';
      showScreen('final');
    } else {
      renderChapterMap();
      showScreen('chapters');
    }
  };
}

// ============================================================
// EVENT WIRING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  Slots.load();

  document.getElementById('btn-start').addEventListener('click', () => {
    renderSlotPicker();
    showScreen('slots');
  });
  document.getElementById('btn-slots-back').addEventListener('click', () => showScreen('title'));
  document.getElementById('btn-chapters-back').addEventListener('click', () => {
    renderSlotPicker(); showScreen('slots');
  });
  document.getElementById('btn-switch-slot').addEventListener('click', () => {
    renderSlotPicker(); showScreen('slots');
  });
  document.getElementById('btn-game-back').addEventListener('click', () => {
    Slots.snapshotChapter();
    renderChapterMap(); showScreen('chapters');
  });

  document.getElementById('btn-check').addEventListener('click', handleCheck);
  document.getElementById('btn-continue').addEventListener('click', handleContinue);

  document.getElementById('btn-final-back').addEventListener('click', () => showScreen('title'));
});
