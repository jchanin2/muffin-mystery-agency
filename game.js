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
// GAME STATE
// ============================================================
const Game = {
  currentScreen: 'title',
  currentCase: null,
  currentProblemIndex: 0,
  health: 3,
  problems: [],
  solvedCases: [],

  loadProgress() {
    try {
      const saved = localStorage.getItem('muffin_agency_progress');
      if (saved) {
        this.solvedCases = JSON.parse(saved);
      }
    } catch (e) {
      this.solvedCases = [];
    }
  },

  saveProgress() {
    try {
      localStorage.setItem('muffin_agency_progress', JSON.stringify(this.solvedCases));
    } catch (e) {
      // Silent fail
    }
  },

  isCaseSolved(caseId) {
    return this.solvedCases.includes(caseId);
  },

  markCaseSolved(caseId) {
    if (!this.solvedCases.includes(caseId)) {
      this.solvedCases.push(caseId);
      this.saveProgress();
    }
  }
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
    element.textContent = '';
    let i = 0;
    let cancelled = false;

    typeWriterCancel = () => {
      cancelled = true;
      element.textContent = text;
      resolve();
    };

    function type() {
      if (cancelled) return;
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
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
// CASE SELECT SCREEN
// ============================================================
function renderCaseSelect() {
  const list = document.getElementById('case-list');
  list.innerHTML = '';

  CASES.forEach((c, index) => {
    const card = document.createElement('div');
    card.className = 'case-card' + (Game.isCaseSolved(c.id) ? ' solved' : '');

    const diffClass = `difficulty-${c.difficulty}`;
    card.innerHTML = `
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
  Game.currentProblemIndex = 0;
  Game.health = 3;

  // Use the fixed story-relevant problems from the case data
  Game.problems = caseData.problems;

  // Set up UI
  document.getElementById('game-case-title').textContent = caseData.title;
  document.getElementById('progress-total').textContent = Game.problems.length;

  // Reset hearts
  updateHearts();

  // Build clue cards
  renderClueCards();

  // Remove critical state
  document.getElementById('screen-game').classList.remove('critical');

  // Hide continue button
  document.getElementById('btn-continue').style.display = 'none';

  // Show game screen
  showScreen('game');

  // Show first problem
  showProblem();
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
}

// ============================================================
// CLUE CARDS
// ============================================================
function renderClueCards() {
  const container = document.getElementById('clue-cards');
  container.innerHTML = '';

  Game.problems.forEach((_, i) => {
    const card = document.createElement('div');
    card.className = 'clue-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="clue-card-inner">
        <div class="clue-card-front">?</div>
        <div class="clue-card-back">Clue ${i + 1}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function revealClueCard(index) {
  const card = document.querySelector(`.clue-card[data-index="${index}"]`);
  if (card) {
    card.classList.add('revealed');
  }
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
  questionText.textContent = problem.question;
  questionText.style.marginBottom = '8px';
  problemTextEl.appendChild(questionText);

  if (problem.hint) {
    const hintText = document.createElement('div');
    hintText.textContent = problem.hint + ' = ?';
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
  Game.currentProblemIndex++;
  if (Game.currentProblemIndex >= Game.problems.length) {
    handleVictory();
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

  // Update progress
  document.getElementById('progress-current').textContent = Game.currentProblemIndex + 1;

  // Show the clue reveal text (already solved)
  narrativeEl.textContent = problem.clueReveal;

  // Show the question and answer
  problemTextEl.innerHTML = '';
  const questionText = document.createElement('div');
  questionText.textContent = problem.question;
  questionText.style.marginBottom = '8px';
  problemTextEl.appendChild(questionText);
  if (problem.hint) {
    const hintText = document.createElement('div');
    hintText.textContent = problem.hint + ' = ' + problem.answer;
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
  Game.loadProgress();
  renderMuffinCharacters();

  // Title screen
  document.getElementById('btn-start').addEventListener('click', () => {
    Audio.init();
    renderCaseSelect();
    showScreen('cases');
  });

  // Case select back button
  document.getElementById('btn-back-title').addEventListener('click', () => {
    showScreen('title');
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
