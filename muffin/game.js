// game.js — State machine, events, audio, and localStorage for Muffin's Mystery Agency

// ============================================================
// AUDIO ENGINE (Web Audio API — no files needed)
// ============================================================
const Audio = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playTone(freq, duration, type = 'sine', volume = 0.15) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  correct() {
    this.init();
    this.playTone(523, 0.15, 'sine', 0.12);
    setTimeout(() => this.playTone(659, 0.15, 'sine', 0.12), 100);
    setTimeout(() => this.playTone(784, 0.25, 'sine', 0.12), 200);
  },

  wrong() {
    this.init();
    this.playTone(200, 0.3, 'sawtooth', 0.08);
    setTimeout(() => this.playTone(150, 0.4, 'sawtooth', 0.08), 150);
  },

  clueReveal() {
    this.init();
    [523, 587, 659, 784].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.2, 'sine', 0.1), i * 80);
    });
  },

  victory() {
    this.init();
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.4, 'sine', 0.12), i * 150);
    });
    setTimeout(() => {
      [523, 659, 784, 1047].forEach((f) => {
        this.playTone(f, 0.8, 'sine', 0.06);
      });
    }, 700);
  },

  defeat() {
    this.init();
    [400, 350, 300, 200].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.3, 'sawtooth', 0.06), i * 200);
    });
  }
};

// ============================================================
// SAVE SLOTS — three independent profiles, each tracking which cases
// are solved AND mid-case progress (current clue, hearts, revealed
// clue cards) per case. Auto-saved on every clue advance, heart loss,
// case start, and case completion.
// ============================================================
const Slots = {
  KEY: 'muffin_slots_v1',
  LEGACY_KEY: 'muffin_agency_progress',
  NUM_SLOTS: 3,
  activeIndex: 0,
  _data: null,

  load() {
    if (this._data) return this._data;
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        this._data = JSON.parse(raw);
      } else {
        this._migrateFromLegacy();
      }
    } catch (e) { /* fall through */ }
    if (!this._data) this._data = { slots: [null, null, null], activeIndex: 0 };
    if (!Array.isArray(this._data.slots) || this._data.slots.length !== this.NUM_SLOTS) {
      this._data.slots = [null, null, null];
    }
    if (typeof this._data.activeIndex !== 'number' || this._data.activeIndex < 0 || this._data.activeIndex >= this.NUM_SLOTS) {
      this._data.activeIndex = 0;
    }
    this.activeIndex = this._data.activeIndex;
    this._seedPracticeSlotIfNeeded();
    return this._data;
  },

  // One-time seed: Slot 3 is pre-populated with Case 7 paused at the
  // cold-spot line-plot question (Clue 11), so the tutor can drop
  // straight to that math problem for line-plot practice without
  // walking through the first ten clues. Only seeds once, and skips
  // if the slot has already been used or deliberately deleted.
  _seedPracticeSlotIfNeeded() {
    if (this._data.practiceSeeded) return;
    if (this._data.slots[2]) {
      // Slot already in use; just record that we have considered it
      this._data.practiceSeeded = true;
      this.persist();
      return;
    }
    this._data.slots[2] = {
      label: 'Cold-Spot Practice',
      perCase: {
        ghost_ravenhollow: {
          currentProblemIndex: 10,
          health: 3,
          solvedClues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      },
      createdAt: Date.now(),
      lastPlayed: Date.now()
    };
    this._data.practiceSeeded = true;
    this.persist();
  },

  _migrateFromLegacy() {
    const legacy = localStorage.getItem(this.LEGACY_KEY);
    if (!legacy) return;
    try {
      const solvedCases = JSON.parse(legacy);
      if (Array.isArray(solvedCases) && solvedCases.length) {
        const perCase = {};
        for (const id of solvedCases) perCase[id] = { solved: true };
        this._data = {
          slots: [
            { perCase, lastPlayed: Date.now(), createdAt: Date.now() },
            null,
            null
          ],
          activeIndex: 0
        };
        this.persist();
      }
    } catch (e) { /* ignore */ }
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
        perCase: {},
        createdAt: Date.now(),
        lastPlayed: Date.now()
      };
    }
    return this._data.slots[this.activeIndex];
  },

  selectSlot(idx) {
    this.load();
    this.activeIndex = idx;
    this._data.activeIndex = idx;
    this.persist();
  },

  deleteSlot(idx) {
    this.load();
    this._data.slots[idx] = null;
    this.persist();
  },

  caseState(caseId) {
    const slot = this.getActive();
    if (!slot || !slot.perCase) return null;
    return slot.perCase[caseId] || null;
  },

  saveCaseState(caseId, state) {
    const slot = this.ensureActive();
    if (!slot.perCase) slot.perCase = {};
    slot.perCase[caseId] = Object.assign({}, slot.perCase[caseId] || {}, state);
    slot.lastPlayed = Date.now();
    this.persist();
  },

  markCaseSolved(caseId) {
    const slot = this.ensureActive();
    if (!slot.perCase) slot.perCase = {};
    slot.perCase[caseId] = Object.assign({}, slot.perCase[caseId] || {}, {
      solved: true,
      // Clear mid-case state so the next entry starts fresh.
      currentProblemIndex: 0,
      health: 3,
      solvedClues: []
    });
    slot.lastPlayed = Date.now();
    this.persist();
  },

  isCaseSolved(caseId) {
    const slot = this.getActive();
    return !!(slot && slot.perCase && slot.perCase[caseId] && slot.perCase[caseId].solved);
  },

  // Snapshot the current Game state into the active slot for the current case
  snapshot() {
    if (!Game.currentCase) return;
    this.saveCaseState(Game.currentCase.id, {
      currentProblemIndex: Game.currentProblemIndex,
      health: Game.health,
      solvedClues: Array.from(Game.solvedClues || [])
    });
  },

  // Try to hydrate Game state from active slot for the given case.
  // Returns true if mid-case progress was restored.
  hydrate(caseId) {
    const cs = this.caseState(caseId);
    if (cs && !cs.solved && typeof cs.currentProblemIndex === 'number' && cs.currentProblemIndex > 0) {
      Game.currentProblemIndex = cs.currentProblemIndex;
      Game.health = (typeof cs.health === 'number') ? cs.health : 3;
      Game.solvedClues = new Set(cs.solvedClues || []);
      return true;
    }
    return false;
  },

  // Returns a friendly summary of a slot for the picker UI.
  summary(idx) {
    this.load();
    const slot = this._data.slots[idx];
    if (!slot) return { isEmpty: true };
    const allCases = (typeof CASES !== 'undefined') ? CASES : [];
    const perCase = slot.perCase || {};
    const solvedCount = Object.values(perCase).filter(c => c.solved).length;
    let inProgress = null;
    for (const caseObj of allCases) {
      const state = perCase[caseObj.id];
      if (state && !state.solved && typeof state.currentProblemIndex === 'number' && state.currentProblemIndex > 0) {
        inProgress = {
          id: caseObj.id,
          title: caseObj.title,
          currentProblemIndex: state.currentProblemIndex,
          totalClues: caseObj.problems.length
        };
        break;
      }
    }
    return {
      isEmpty: false,
      solvedCount,
      totalCases: allCases.length,
      inProgress,
      lastPlayed: slot.lastPlayed,
      createdAt: slot.createdAt
    };
  }
};

// ============================================================
// GAME STATE
// ============================================================
const Game = {
  currentScreen: 'title',
  currentCase: null,
  currentProblemIndex: 0,
  health: 3,
  problems: [],

  // Convenience accessors that delegate to the active slot.
  isCaseSolved(caseId) { return Slots.isCaseSolved(caseId); },
  markCaseSolved(caseId) { Slots.markCaseSolved(caseId); }
};

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${screenId}`).classList.add('active');
  Game.currentScreen = screenId;
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
let typeWriterCancel = null;

function typeWriter(element, text, speed = 25) {
  if (typeWriterCancel) {
    typeWriterCancel();
  }

  return new Promise(resolve => {
    // innerHTML so inline tags like <sup> and <em> render as they appear.
    element.innerHTML = '';
    let i = 0;
    let cancelled = false;

    typeWriterCancel = () => {
      cancelled = true;
      element.innerHTML = text;
      resolve();
    };

    function type() {
      if (cancelled) return;
      if (i < text.length) {
        // If we're at the start of an HTML tag, consume the whole tag in
        // one step so the browser never sees a half-open tag.
        if (text.charAt(i) === '<') {
          const end = text.indexOf('>', i);
          i = (end === -1) ? text.length : end + 1;
        } else {
          i++;
        }
        element.innerHTML = text.slice(0, i);
        setTimeout(type, speed);
      } else {
        typeWriterCancel = null;
        resolve();
      }
    }
    type();
  });
}

// ============================================================
// SCENE ILLUSTRATIONS
// ============================================================
function showSceneIllustration(caseId, problemIndex) {
  const container = document.getElementById('scene-illustration');
  const scenes = SCENE_MAP[caseId];
  if (scenes && scenes[problemIndex] && Illustrations[scenes[problemIndex]]) {
    container.innerHTML = Illustrations[scenes[problemIndex]]();
  } else {
    container.innerHTML = '';
  }
}

// ============================================================
// MUFFIN SVG RENDERING
// ============================================================
function renderMuffinCharacters() {
  document.getElementById('title-muffin').innerHTML = Illustrations.muffin(180, 'happy', true);
  document.getElementById('victory-muffin').innerHTML = Illustrations.muffin(130, 'happy', true);
  document.getElementById('defeat-muffin').innerHTML = Illustrations.muffin(130, 'hurt', false);
}

// ============================================================
// SLOT PICKER SCREEN
// ============================================================
function _formatLastPlayed(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return 'today';
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
    const card = document.createElement('div');
    const isActive = i === Slots.activeIndex && !summary.isEmpty;
    card.className = 'slot-card' + (summary.isEmpty ? ' empty' : '') + (isActive ? ' active' : '');

    if (summary.isEmpty) {
      card.innerHTML =
        '<div class="slot-card-header">' +
          '<span class="slot-card-number">Slot ' + (i + 1) + '</span>' +
        '</div>' +
        '<div class="slot-card-title">Empty</div>' +
        '<div class="slot-card-empty-hint">Tap to begin a new game.</div>';
    } else {
      const slotData = Slots.getSlots()[i] || {};
      const slotTitle = slotData.label || ('Detective ' + (i + 1));
      const inProg = summary.inProgress;
      const resumeLine = inProg
        ? '<div class="resume-line">▶ Currently: ' + inProg.title + ' — Clue ' + (inProg.currentProblemIndex + 1) + ' of ' + inProg.totalClues + '</div>'
        : '';
      card.innerHTML =
        '<div class="slot-card-header">' +
          '<span class="slot-card-number">Slot ' + (i + 1) + '</span>' +
        '</div>' +
        '<div class="slot-card-title">' + slotTitle + '</div>' +
        '<div class="slot-card-stats">' +
          '<div class="stat-line"><span>Cases solved</span><span>' + summary.solvedCount + ' of ' + summary.totalCases + '</span></div>' +
          resumeLine +
        '</div>' +
        '<div class="slot-card-last-played">Last played ' + _formatLastPlayed(summary.lastPlayed) + '</div>' +
        '<button class="slot-card-delete" title="Delete this save">✕</button>';
    }

    // Click anywhere on the card (except delete) selects this slot
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('slot-card-delete')) return;
      Slots.selectSlot(i);
      renderCaseSelect();
      showScreen('cases');
    });

    const delBtn = card.querySelector('.slot-card-delete');
    if (delBtn) {
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete Slot ' + (i + 1) + '? This cannot be undone.')) {
          Slots.deleteSlot(i);
          renderSlotPicker();
        }
      });
    }

    list.appendChild(card);
  }
}

// ============================================================
// CASE SELECT SCREEN
// ============================================================
function renderCaseSelect() {
  const list = document.getElementById('case-list');
  list.innerHTML = '';

  // Update the active-slot indicator at the top
  const slotLabel = document.getElementById('active-slot-label');
  if (slotLabel) {
    const summary = Slots.summary(Slots.activeIndex);
    const slotData = Slots.getSlots()[Slots.activeIndex] || {};
    const slotName = slotData.label || ('Detective ' + (Slots.activeIndex + 1));
    const solvedText = summary.isEmpty ? 'new' : summary.solvedCount + '/' + summary.totalCases + ' solved';
    slotLabel.textContent = slotName + ' · ' + solvedText;
  }

  CASES.forEach((c, index) => {
    const card = document.createElement('div');
    const isSolved = Game.isCaseSolved(c.id);
    const slotState = Slots.caseState(c.id);
    const inProgress = slotState && !slotState.solved && typeof slotState.currentProblemIndex === 'number' && slotState.currentProblemIndex > 0;
    card.className = 'case-card' + (isSolved ? ' solved' : '');

    const diffClass = `difficulty-${c.difficulty}`;
    const resumeBadge = inProgress
      ? '<div class="resume-badge">Resume · Clue ' + (slotState.currentProblemIndex + 1) + '/' + c.problems.length + '</div>'
      : '';
    card.innerHTML = `
      ${resumeBadge}
      <div class="case-difficulty ${diffClass}">${c.difficulty}</div>
      <div class="case-card-title">Case ${index + 1}: ${c.title}</div>
      <div class="case-card-desc">${c.description}</div>
    `;

    card.addEventListener('click', () => startCase(c));
    list.appendChild(card);
  });
}

// ============================================================
// START A CASE
// ============================================================
function startCase(caseData) {
  Audio.init();
  Game.currentCase = caseData;
  Game.problems = caseData.problems;

  // Try to resume from saved slot state for this case. If there's
  // saved mid-case progress, hydrate it; otherwise start fresh.
  const resumed = Slots.hydrate(caseData.id);
  if (!resumed) {
    Game.currentProblemIndex = 0;
    Game.health = 3;
    Game.solvedClues = new Set();
  }

  // Persist immediately so the slot records the case is now "started"
  // even if the player closes the tab before finishing a clue.
  Slots.snapshot();

  // Set up UI
  document.getElementById('game-case-title').textContent = caseData.title;
  document.getElementById('progress-total').textContent = Game.problems.length;

  updateHearts();
  renderClueCards();

  document.getElementById('screen-game').classList.remove('critical');
  document.getElementById('btn-continue').style.display = 'none';

  showScreen('game');

  // Show the intro card only on a FRESH start. If we're resuming a
  // case mid-stream, skip straight to the current clue.
  if (caseData.intro && !resumed) {
    showCaseIntro(caseData.intro, () => showProblem());
  } else {
    showProblem();
  }
}

// ============================================================
// HEARTS DISPLAY
// ============================================================
function updateHearts() {
  const hearts = document.querySelectorAll('#hearts .heart');
  hearts.forEach((h, i) => {
    h.classList.remove('lost', 'critical', 'hit');
    if (i >= Game.health) {
      h.classList.add('lost');
    }
  });

  if (Game.health === 1) {
    hearts.forEach(h => {
      if (!h.classList.contains('lost')) {
        h.classList.add('critical');
      }
    });
    document.getElementById('screen-game').classList.add('critical');
  }
}

function loseHeart() {
  const heartIndex = Game.health - 1;
  Game.health--;
  const heart = document.querySelector(`#hearts .heart[data-index="${heartIndex}"]`);
  if (heart) {
    heart.classList.add('hit');
  }
  setTimeout(updateHearts, 500);
  Slots.snapshot();
}

// ============================================================
// CHAPTERS — optional per-case multi-chapter pacing
// ============================================================
// A case can declare a `chapters` array like:
//   chapters: [
//     { title: 'Night One — Arrival', length: 6 },
//     { title: 'Night Two — Investigation', length: 7 },
//     ...
//   ]
// The lengths must sum to the total number of problems. Cases without
// `chapters` keep the original behavior (all clue cards visible at once).
function getCaseChapters() {
  return (Game.currentCase && Array.isArray(Game.currentCase.chapters))
    ? Game.currentCase.chapters
    : null;
}

function getChapterForIndex(problemIndex) {
  const chapters = getCaseChapters();
  if (!chapters) return null;
  let acc = 0;
  for (let i = 0; i < chapters.length; i++) {
    const len = chapters[i].length;
    if (problemIndex < acc + len) {
      return { index: i, title: chapters[i].title, startIndex: acc, endIndex: acc + len - 1 };
    }
    acc += len;
  }
  // Past the last chapter — return the final one for safety.
  const last = chapters.length - 1;
  return { index: last, title: chapters[last].title, startIndex: acc - chapters[last].length, endIndex: acc - 1 };
}

// ============================================================
// CLUE CARDS
// ============================================================
function renderClueCards() {
  const container = document.getElementById('clue-cards');
  container.innerHTML = '';

  const chapter = getChapterForIndex(Game.currentProblemIndex);
  const headerEl = document.getElementById('clue-board-chapter');
  if (chapter && headerEl) {
    headerEl.textContent = chapter.title;
    headerEl.style.display = 'block';
  } else if (headerEl) {
    headerEl.style.display = 'none';
  }

  // Determine which problem indices to render in the evidence board.
  const startIdx = chapter ? chapter.startIndex : 0;
  const endIdx = chapter ? chapter.endIndex : Game.problems.length - 1;

  for (let i = startIdx; i <= endIdx; i++) {
    const card = document.createElement('div');
    card.className = 'clue-card';
    card.dataset.index = i;
    // Numbering inside a chapter is local (Clue 1, 2, 3, ...) so Jacob
    // sees a manageable count instead of "Clue 14 of 25".
    const localNum = chapter ? (i - startIdx + 1) : (i + 1);
    card.innerHTML = `
      <div class="clue-card-inner">
        <div class="clue-card-front">?</div>
        <div class="clue-card-back">Clue ${localNum}</div>
      </div>
    `;
    // If this clue is already solved (revisiting the case), mark revealed.
    if (Game.solvedClues && Game.solvedClues.has(i)) {
      card.classList.add('revealed');
    }
    container.appendChild(card);
  }
}

function revealClueCard(index) {
  if (!Game.solvedClues) Game.solvedClues = new Set();
  Game.solvedClues.add(index);
  const card = document.querySelector(`.clue-card[data-index="${index}"]`);
  if (card) {
    card.classList.add('revealed');
  }
}

// ============================================================
// CASE INTRO OVERLAY — fires once before Clue 1 if the case has an
// `intro` field. Optional illustration + multi-paragraph narrative.
// ============================================================
function showCaseIntro(intro, onContinue) {
  const overlay = document.getElementById('case-intro-overlay');
  if (!overlay || !intro) {
    onContinue();
    return;
  }
  // Title + body text (HTML allowed for <em>, <p>, custom classes)
  document.getElementById('case-intro-title').textContent = intro.title || '';
  document.getElementById('case-intro-text').innerHTML = intro.text || '';

  // Optional illustration: render the named scene from Illustrations
  const illusEl = document.getElementById('case-intro-illustration');
  if (intro.illustration && Illustrations[intro.illustration]) {
    illusEl.innerHTML = Illustrations[intro.illustration]();
  } else {
    illusEl.innerHTML = '';
  }

  // Custom button label, falling back to the default
  const btn = document.getElementById('btn-case-intro-continue');
  btn.innerHTML = intro.buttonLabel ? intro.buttonLabel.replace(/→/g, '&rarr;') : 'Begin Investigation &rarr;';

  overlay.style.display = 'flex';
  overlay.scrollTop = 0;
  requestAnimationFrame(() => overlay.classList.add('active'));

  const handler = () => {
    btn.removeEventListener('click', handler);
    overlay.classList.remove('active');
    setTimeout(() => { overlay.style.display = 'none'; onContinue(); }, 300);
  };
  btn.addEventListener('click', handler);
}

// ============================================================
// CHAPTER-BREAK OVERLAY
// ============================================================
function showChapterBreak(chapterTitle, onContinue) {
  const overlay = document.getElementById('chapter-break-overlay');
  if (!overlay) {
    // No overlay element (legacy HTML) — just continue.
    onContinue();
    return;
  }
  document.getElementById('chapter-break-title').textContent = chapterTitle;
  overlay.style.display = 'flex';
  // Trigger CSS animation
  requestAnimationFrame(() => overlay.classList.add('active'));

  const btn = document.getElementById('btn-chapter-continue');
  const handler = () => {
    btn.removeEventListener('click', handler);
    overlay.classList.remove('active');
    setTimeout(() => { overlay.style.display = 'none'; onContinue(); }, 250);
  };
  btn.addEventListener('click', handler);
}

// ============================================================
// SHOW PROBLEM
// ============================================================
function showProblem() {
  const problem = Game.problems[Game.currentProblemIndex];
  const narrativeEl = document.getElementById('narrative-text');
  const problemTextEl = document.getElementById('problem-text');
  const feedbackEl = document.getElementById('feedback');
  const inputEl = document.getElementById('answer-input');
  const continueBtn = document.getElementById('btn-continue');

  // Update progress
  document.getElementById('progress-current').textContent = Game.currentProblemIndex + 1;

  // Clear previous state
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  inputEl.value = '';
  inputEl.disabled = false;
  document.getElementById('btn-submit').disabled = false;
  document.getElementById('btn-submit').style.display = '';
  continueBtn.style.display = 'none';

  // Show/hide previous clue button
  const prevBtn = document.getElementById('btn-prev-clue');
  if (Game.currentProblemIndex > 0) {
    prevBtn.style.display = 'block';
  } else {
    prevBtn.style.display = 'none';
  }

  // Show answer area
  document.querySelector('.answer-area').style.display = 'flex';

  // Show scene illustration
  showSceneIllustration(Game.currentCase.id, Game.currentProblemIndex);

  // Show narrative with typewriter effect
  typeWriter(narrativeEl, problem.cluePrompt, 20);

  // Show story-relevant problem with equation hint
  problemTextEl.innerHTML = '';
  const questionText = document.createElement('div');
  questionText.innerHTML = problem.question;
  questionText.style.marginBottom = '8px';
  problemTextEl.appendChild(questionText);

  if (problem.hint) {
    const hintText = document.createElement('div');
    hintText.innerHTML = problem.hint + ' = ?';
    hintText.style.fontSize = '1.4rem';
    hintText.style.color = '#e2b714';
    hintText.style.marginTop = '4px';
    problemTextEl.appendChild(hintText);
  }

  problemTextEl.style.fontSize = '0.95rem';
  problemTextEl.style.textAlign = 'left';
  problemTextEl.style.flexDirection = 'column';

  // Focus input
  setTimeout(() => inputEl.focus(), 300);
}

// ============================================================
// SUBMIT ANSWER
// ============================================================
function submitAnswer() {
  const inputEl = document.getElementById('answer-input');
  const answer = inputEl.value.trim();

  if (!answer) return;

  const problem = Game.problems[Game.currentProblemIndex];
  const isCorrect = ProblemGenerator.checkAnswer(answer, problem.answer);

  if (isCorrect) {
    handleCorrect(problem);
  } else {
    handleWrong(problem);
  }
}

function handleCorrect(problem) {
  const feedbackEl = document.getElementById('feedback');
  const inputEl = document.getElementById('answer-input');
  const narrativeEl = document.getElementById('narrative-text');
  const problemCard = document.querySelector('.problem-card');
  const continueBtn = document.getElementById('btn-continue');

  // Disable input
  inputEl.disabled = true;
  document.getElementById('btn-submit').disabled = true;

  // Feedback
  feedbackEl.textContent = 'Correct!';
  feedbackEl.className = 'feedback correct';
  Audio.correct();

  // Green glow on problem card
  problemCard.classList.add('green-glow');
  setTimeout(() => problemCard.classList.remove('green-glow'), 800);

  // Reveal clue card and show clue text after a brief delay
  setTimeout(() => {
    revealClueCard(Game.currentProblemIndex);
    Slots.snapshot();
    Audio.clueReveal();

    // Show clue text in narrative
    typeWriter(narrativeEl, problem.clueReveal, 20);

    // Show Continue button (player controls pacing)
    setTimeout(() => {
      // Hide answer area, show continue
      document.querySelector('.answer-area').style.display = 'none';
      document.getElementById('btn-submit').style.display = 'none';
      feedbackEl.textContent = '';

      if (Game.currentProblemIndex >= Game.problems.length - 1) {
        continueBtn.textContent = 'Solve the Case!';
      } else {
        continueBtn.textContent = 'Continue Investigation';
      }
      continueBtn.style.display = 'block';
    }, 500);
  }, 800);
}

function handleContinue() {
  const prevChapter = getChapterForIndex(Game.currentProblemIndex);
  Game.currentProblemIndex++;
  if (Game.currentProblemIndex >= Game.problems.length) {
    handleVictory();
    return;
  }
  Slots.snapshot();
  const nextChapter = getChapterForIndex(Game.currentProblemIndex);
  // If we've crossed a chapter boundary, show the chapter-break overlay first.
  if (prevChapter && nextChapter && nextChapter.index > prevChapter.index) {
    showChapterBreak(nextChapter.title, () => {
      renderClueCards();
      showProblem();
    });
  } else {
    showProblem();
  }
}

function handleWrong(problem) {
  const feedbackEl = document.getElementById('feedback');
  const inputEl = document.getElementById('answer-input');
  const gameScreen = document.getElementById('screen-game');

  // Damage feedback
  const wrongMessages = [
    'Muffin stumbles! The trail grows cold...',
    'A wrong turn! Muffin takes a hit!',
    'The shadows close in! Muffin is hurt!',
    'A dead end! Muffin loses ground!'
  ];
  feedbackEl.textContent = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
  feedbackEl.className = 'feedback wrong';
  Audio.wrong();

  // Screen shake
  gameScreen.classList.add('shake', 'red-flash');
  setTimeout(() => gameScreen.classList.remove('shake', 'red-flash'), 500);

  // Lose heart
  loseHeart();

  // Clear input for retry
  inputEl.value = '';
  inputEl.focus();

  // Check for defeat
  setTimeout(() => {
    if (Game.health <= 0) {
      handleDefeat();
    }
  }, 600);
}

// ============================================================
// VICTORY
// ============================================================
function handleVictory() {
  Audio.victory();
  Game.markCaseSolved(Game.currentCase.id);

  document.getElementById('victory-title').textContent = `"${Game.currentCase.title}" — Solved!`;
  document.getElementById('resolution-text').textContent = Game.currentCase.resolution;

  const currentIndex = CASES.findIndex(c => c.id === Game.currentCase.id);
  const nextCaseBtn = document.getElementById('btn-next-case');
  const allSolved = CASES.every(c => Game.isCaseSolved(c.id));
  if (allSolved) {
    nextCaseBtn.textContent = 'Agency Celebration!';
    nextCaseBtn.disabled = false;
    nextCaseBtn.onclick = () => showCelebration();
  } else if (currentIndex < CASES.length - 1) {
    nextCaseBtn.style.display = '';
    nextCaseBtn.disabled = false;
    nextCaseBtn.textContent = 'Next Case';
    nextCaseBtn.onclick = () => startCase(CASES[currentIndex + 1]);
  } else {
    nextCaseBtn.textContent = 'Back to Cases';
    nextCaseBtn.disabled = false;
    nextCaseBtn.onclick = () => { renderCaseSelect(); showScreen('cases'); };
  }

  showScreen('victory');
}

// ============================================================
// DEFEAT
// ============================================================
function handleDefeat() {
  Audio.defeat();
  document.getElementById('defeat-text').textContent = Game.currentCase.defeatMessage;
  showScreen('defeat');
}

// ============================================================
// CELEBRATION SCREEN (ALL CASES SOLVED)
// ============================================================
function showCelebration() {
  Audio.victory();
  document.getElementById('celebrate-muffin').innerHTML = Illustrations.muffin(150, 'happy', true);
  showScreen('celebrate');
}

// ============================================================
// PREVIOUS CLUE REVIEW
// ============================================================
let reviewingClue = false;
let savedProblemIndex = 0;

function showPreviousClue() {
  if (Game.currentProblemIndex <= 0) return;

  reviewingClue = true;
  savedProblemIndex = Game.currentProblemIndex;
  Game.currentProblemIndex--;

  const problem = Game.problems[Game.currentProblemIndex];
  const narrativeEl = document.getElementById('narrative-text');
  const problemTextEl = document.getElementById('problem-text');
  const feedbackEl = document.getElementById('feedback');
  const inputEl = document.getElementById('answer-input');
  const continueBtn = document.getElementById('btn-continue');
  const prevBtn = document.getElementById('btn-prev-clue');

  // Cancel any in-flight typewriter so its queued chars don't get appended
  // to the clue reveal we're about to render.
  if (typeWriterCancel) typeWriterCancel();

  // Update progress
  document.getElementById('progress-current').textContent = Game.currentProblemIndex + 1;

  // Show the clue reveal text (already solved) — innerHTML so <em>/<sup> render
  narrativeEl.innerHTML = problem.clueReveal;

  // Show the question and answer — innerHTML so <sup>/<em> render correctly
  problemTextEl.innerHTML = '';
  const questionText = document.createElement('div');
  questionText.innerHTML = problem.question;
  questionText.style.marginBottom = '8px';
  problemTextEl.appendChild(questionText);
  if (problem.hint) {
    const hintText = document.createElement('div');
    hintText.innerHTML = problem.hint + ' = ' + problem.answer;
    hintText.style.fontSize = '1.4rem';
    hintText.style.color = '#2ecc71';
    hintText.style.marginTop = '4px';
    problemTextEl.appendChild(hintText);
  }

  // Show scene illustration for this clue
  showSceneIllustration(Game.currentCase.id, Game.currentProblemIndex);

  // Hide answer area
  document.querySelector('.answer-area').style.display = 'none';
  feedbackEl.textContent = '';

  // Show "Back to Current" button instead of continue
  continueBtn.textContent = 'Return to Current Clue';
  continueBtn.style.display = 'block';

  // Show prev button if there's an even earlier clue
  if (Game.currentProblemIndex > 0) {
    prevBtn.style.display = 'block';
  } else {
    prevBtn.style.display = 'none';
  }
}

function returnFromReview() {
  reviewingClue = false;
  Game.currentProblemIndex = savedProblemIndex;
  showProblem();
}

// ============================================================
// EVENT LISTENERS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  Slots.load();
  renderMuffinCharacters();

  // Title screen — go to slot picker first (rather than straight to cases)
  document.getElementById('btn-start').addEventListener('click', () => {
    Audio.init();
    renderSlotPicker();
    showScreen('slots');
  });

  // Slot picker back button
  const slotsBackBtn = document.getElementById('btn-slots-back');
  if (slotsBackBtn) slotsBackBtn.addEventListener('click', () => showScreen('title'));

  // Case select back to slot picker (was: back to title)
  document.getElementById('btn-back-title').addEventListener('click', () => {
    renderSlotPicker();
    showScreen('slots');
  });

  // "Switch Detective" button on case select goes back to slot picker
  const switchSlotBtn = document.getElementById('btn-switch-slot');
  if (switchSlotBtn) switchSlotBtn.addEventListener('click', () => {
    renderSlotPicker();
    showScreen('slots');
  });

  // Submit answer
  document.getElementById('btn-submit').addEventListener('click', submitAnswer);

  // Enter key submits
  document.getElementById('answer-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });

  // Continue button — player-controlled pacing (also handles return from review)
  document.getElementById('btn-continue').addEventListener('click', () => {
    if (reviewingClue) {
      returnFromReview();
    } else {
      handleContinue();
    }
  });

  // Previous clue button
  document.getElementById('btn-prev-clue').addEventListener('click', showPreviousClue);

  // Back to cases from gameplay
  document.getElementById('btn-game-back').addEventListener('click', () => {
    renderCaseSelect();
    showScreen('cases');
  });

  // Victory buttons
  document.getElementById('btn-back-cases').addEventListener('click', () => {
    renderCaseSelect();
    showScreen('cases');
  });

  // Celebration screen back button
  document.getElementById('btn-celebrate-back').addEventListener('click', () => {
    renderCaseSelect();
    showScreen('cases');
  });

  // Defeat buttons
  document.getElementById('btn-retry').addEventListener('click', () => {
    startCase(Game.currentCase);
  });

  document.getElementById('btn-defeat-back').addEventListener('click', () => {
    renderCaseSelect();
    showScreen('cases');
  });
});
