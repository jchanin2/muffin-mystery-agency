// game.js — Main state machine, screen management, and event wiring

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + screenId);
  if (screen) screen.classList.add('active');
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
let typeWriterCancel = null;
function typeWriter(el, text, speed = 18, onComplete) {
  if (typeWriterCancel) typeWriterCancel();
  el.textContent = '';
  let i = 0;
  let cancelled = false;
  typeWriterCancel = () => { cancelled = true; el.textContent = text; if (onComplete) { onComplete(); onComplete = null; } };
  function tick() {
    if (cancelled) return;
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(tick, speed);
    } else if (onComplete) {
      onComplete();
      onComplete = null;
    }
  }
  tick();
}

// ============================================================
// GAME STATE
// ============================================================
let gameCharacter = null;
let gameProgress = null;

// Character creation state
const createState = {
  name: '',
  race: 'human',
  class: 'warrior',
  appearance: { skinTone: '#f5d0a9', hairColor: '#2c1810', armorColor: '#7f8c8d' }
};

// ============================================================
// HUD UPDATE
// ============================================================
function updateHUD() {
  if (!gameCharacter) return;

  document.getElementById('hud-name').textContent = gameCharacter.name;
  document.getElementById('hud-level').textContent = 'Lv. ' + gameCharacter.level;
  document.getElementById('gold-display').textContent = gameCharacter.gold + 'g';

  // HP bar
  const hpPct = Math.max(0, (gameCharacter.hp / gameCharacter.maxHp) * 100);
  const hpBar = document.getElementById('hp-bar');
  hpBar.style.width = hpPct + '%';
  hpBar.classList.toggle('critical', hpPct <= 25);
  document.getElementById('hp-text').textContent = gameCharacter.hp + '/' + gameCharacter.maxHp;

  // XP bar
  const xpPct = (gameCharacter.xp / gameCharacter.xpToNext) * 100;
  document.getElementById('xp-bar').style.width = xpPct + '%';
  document.getElementById('xp-text').textContent = 'XP: ' + gameCharacter.xp + '/' + gameCharacter.xpToNext;

  // Sprite
  document.getElementById('hud-sprite').innerHTML =
    Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, 2);
}

// ============================================================
// CHARACTER CREATION
// ============================================================
function initCharacterCreation() {
  // Populate race grid
  const raceGrid = document.getElementById('race-grid');
  raceGrid.innerHTML = '';
  const statExplain = {
    strength: 'More damage',
    dexterity: 'Dodge attacks',
    intelligence: 'Get hints & tips',
    wisdom: 'Spot danger',
    charisma: 'Better prices',
    constitution: 'More HP'
  };
  for (const [id, data] of Object.entries(RACES)) {
    const div = document.createElement('div');
    div.className = 'race-option' + (id === createState.race ? ' selected' : '');
    div.dataset.race = id;
    const bonusHtml = Object.entries(data.bonus).map(([s, v]) => {
      const abbr = s.substring(0, 3).toUpperCase();
      return `<span class="bonus-tag" title="${statExplain[s]}">+${v} ${abbr}</span>`;
    }).join('');
    const raceGameplayShort = {
      human: 'Balanced — good at everything',
      elf: 'Smart & wise — gets hints',
      dwarf: 'Tough & strong — tanks hits',
      halfling: 'Quick & charming — dodges & deals',
      dragonborn: 'Powerful — hits hard, survives',
      tabaxi: 'Agile & alert — dodges & spots danger'
    };
    div.innerHTML = `
      <div class="option-sprite">${Sprites.player(id, createState.class, createState.appearance, 2)}</div>
      <div class="option-label">${data.name}</div>
      <div class="option-bonuses">${bonusHtml}</div>
      <div class="option-gameplay">${raceGameplayShort[id]}</div>
    `;
    div.onclick = () => selectRace(id);
    raceGrid.appendChild(div);
  }

  // Populate class grid
  const classGrid = document.getElementById('class-grid');
  classGrid.innerHTML = '';
  const classPerks = {
    warrior: { icon: '⚔️', perk: 'Double damage on answer streaks' },
    wizard: { icon: '🔮', perk: 'Hints narrow the answer range' },
    rogue: { icon: '🗡️', perk: 'Chance to dodge damage on wrong answers' },
    ranger: { icon: '🏹', perk: 'See which choices are dangerous' }
  };
  for (const [id, data] of Object.entries(CLASSES)) {
    const div = document.createElement('div');
    div.className = 'class-option' + (id === createState.class ? ' selected' : '');
    div.dataset.class = id;
    const cp = classPerks[id];
    div.innerHTML = `
      <div class="option-sprite">${Sprites.player(createState.race, id, createState.appearance, 2)}</div>
      <div class="option-label">${cp.icon} ${data.name}</div>
      <div class="option-primary">Best stat: <b>${data.primaryStat.substring(0,3).toUpperCase()}</b></div>
      <div class="option-perk">${cp.perk}</div>
    `;
    div.onclick = () => selectClass(id);
    classGrid.appendChild(div);
  }

  // Populate appearance swatches
  populateSwatches('skin-swatches', SKIN_TONES, 'skinTone');
  populateSwatches('hair-swatches', HAIR_COLORS, 'hairColor');
  populateSwatches('armor-swatches', ARMOR_COLORS, 'armorColor');

  updateRaceInfo();
  updateClassInfo();
  updateAppearancePreview();
}

function populateSwatches(containerId, colors, property) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  // Initialize appearance with first color if not already a color string
  if (!createState.appearance[property] || typeof createState.appearance[property] === 'number') {
    createState.appearance[property] = colors[0];
  }
  colors.forEach((color) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch' + (createState.appearance[property] === color ? ' selected' : '');
    swatch.style.background = color;
    swatch.onclick = () => {
      createState.appearance[property] = color;
      container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
      updateAppearancePreview();
    };
    container.appendChild(swatch);
  });
}

function selectRace(raceId) {
  createState.race = raceId;
  document.querySelectorAll('.race-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.race === raceId);
  });
  updateRaceInfo();
  updateAppearancePreview();
  // Update class sprites to match race
  document.querySelectorAll('.class-option').forEach(el => {
    el.querySelector('.option-sprite').innerHTML =
      Sprites.player(createState.race, el.dataset.class, createState.appearance, 2);
  });
}

function selectClass(classId) {
  createState.class = classId;
  document.querySelectorAll('.class-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.class === classId);
  });
  updateClassInfo();
  updateAppearancePreview();
}

function updateRaceInfo() {
  const data = RACES[createState.race];
  const gameplay = {
    human: 'Good at everything, great for beginners. No weaknesses!',
    elf: 'Gets math hints sooner and spots danger more often.',
    dwarf: 'Survives longer in tough fights with bonus HP and damage.',
    halfling: 'Dodges damage on wrong answers and gets cheaper shop prices.',
    dragonborn: 'Hits hard and takes hits well — a powerhouse in combat.',
    tabaxi: 'Nimble and perceptive — dodges attacks and spots hidden dangers.'
  };
  document.getElementById('race-info').innerHTML =
    `<strong>${data.name}:</strong> ${data.desc}<br><span style="color:var(--parchment-light);font-size:0.85rem;">🎮 <em>${gameplay[createState.race]}</em></span>`;
}

function updateClassInfo() {
  const data = CLASSES[createState.class];
  const gameplay = {
    warrior: 'Best for players who want to deal big damage. Get 2+ correct answers in a row for a Power Strike that deals double damage!',
    wizard: 'Best for players who want extra help with math. High INT means you get strategy tips and hints that narrow down the answer range.',
    rogue: 'Best for players who want a safety net. Wrong answers? Your DEX gives you a chance to dodge the damage entirely!',
    ranger: 'Best for players who like making smart choices. Your WIS can reveal which story choices are risky before you pick them.'
  };
  document.getElementById('class-info').innerHTML =
    `<strong>${data.name}:</strong> ${data.desc}<br><span style="color:var(--parchment-light);font-size:0.85rem;">🎮 <em>${gameplay[createState.class]}</em></span>`;
}

function updateAppearancePreview() {
  const preview = document.getElementById('appearance-preview');
  if (preview) {
    preview.innerHTML = Sprites.player(createState.race, createState.class, createState.appearance, 5);
  }
  // Update create-preview sidebar too
  const sidebar = document.getElementById('create-preview');
  if (sidebar) {
    sidebar.innerHTML = `
      <div>${Sprites.player(createState.race, createState.class, createState.appearance, 3)}</div>
      <div style="color: var(--parchment-light); margin-top: 8px; font-weight: bold;">${createState.name || 'Hero'}</div>
      <div style="color: var(--text-dim); font-size: 0.8rem;">${RACES[createState.race].name} ${CLASSES[createState.class].name}</div>
    `;
  }
}

function showCreateStep(stepNum) {
  document.querySelectorAll('.create-step').forEach(s => s.classList.remove('active'));
  document.getElementById('create-step-' + stepNum).classList.add('active');
  document.querySelectorAll('.step-dot').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.toggle('active', s === stepNum);
    dot.classList.toggle('done', s < stepNum);
  });

  // Update preview for step 4
  if (stepNum === 4) {
    updateAppearancePreview();
  }
}

// ============================================================
// ADVENTURE — SHOW STORY NODE
// ============================================================
function showNode(nodeId) {
  const node = STORY[nodeId];
  if (!node) return;

  gameProgress.currentNodeId = nodeId;
  if (!gameProgress.nodesVisited.includes(nodeId)) {
    gameProgress.nodesVisited.push(nodeId);
  }
  Progress.save(gameProgress);

  // Check for chapter complete
  if (node.chapterComplete) {
    showChapterComplete(node);
    return;
  }

  // Show adventure screen
  showScreen('adventure');
  updateHUD();

  // Show environment
  const sceneEl = document.getElementById('adventure-scene');
  if (node.environment && Environments[node.environment]) {
    sceneEl.innerHTML = Environments[node.environment]();
  }

  // Show narrative, then show choices/encounter after text finishes
  const narrativeEl = document.getElementById('narrative-text');
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';

  typeWriter(narrativeEl, node.narrative, 15, () => {
    if (node.encounter) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-gold choice-btn';
      const label = node.encounter.type === 'combat' ? 'Ready for battle!' : 'Ready!';
      btn.innerHTML = '<span class="choice-key">!</span> ' + label;
      btn.onclick = () => {
        choicesEl.innerHTML = '';
        startEncounter(node);
      };
      choicesEl.appendChild(btn);
    } else if (node.shop) {
      showShopAndChoices(node);
    } else {
      if (node.reward) applyReward(node.reward);
      showChoices(node.choices);
    }
  });
}

function showChoices(choices) {
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';

  if (!choices) return;

  const keys = ['A', 'B', 'C', 'D'];
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-key">${keys[i]}.</span> ${choice.text}`;

    // Ranger wisdom reveal — mark dangerous choices
    if (gameCharacter && Character.wisdomReveal(gameCharacter)) {
      // Check if the choice leads to a combat node
      const targetNode = STORY[choice.next];
      if (targetNode && targetNode.encounter && targetNode.encounter.type === 'combat') {
        btn.innerHTML += ' <span style="color: var(--torch); font-size: 0.8rem;">(danger ahead)</span>';
      }
    }

    btn.onclick = () => {
      Audio.dice();
      showNode(choice.next);
    };
    choicesEl.appendChild(btn);
  });
}

// ============================================================
// ENCOUNTERS
// ============================================================
function startEncounter(node) {
  const encounter = node.encounter;

  Combat.start(encounter, gameCharacter, (victory) => {
    // Combat ended
    document.getElementById('combat-overlay').style.display = 'none';
    Whiteboard.hide();

    if (gameCharacter.hp <= 0) {
      handleGameOver();
      return;
    }

    if (victory && node.reward) {
      applyReward(node.reward);
    }

    // Show post-encounter narrative and choices
    updateHUD();
    const postText = victory ? encounter.success : encounter.failure;
    if (postText && node.choicesAfter) {
      const narrativeEl = document.getElementById('narrative-text');
      const choicesEl = document.getElementById('choices');
      choicesEl.innerHTML = '';
      typeWriter(narrativeEl, postText, 15, () => {
        showChoices(node.choicesAfter);
      });
    } else if (node.choicesAfter) {
      showChoices(node.choicesAfter);
    }
  });

  showCombatUI();
}

function showCombatUI() {
  const overlay = document.getElementById('combat-overlay');
  overlay.style.display = 'flex';

  // Clean up any leftover Continue buttons from previous encounters
  overlay.querySelectorAll('.btn-gold:not(#btn-combat-submit)').forEach(b => b.remove());
  document.querySelector('.answer-area').style.display = '';
  document.getElementById('combat-answer').disabled = false;
  document.getElementById('combat-answer').value = '';
  document.getElementById('btn-combat-submit').disabled = false;
  document.getElementById('combat-feedback').textContent = '';

  // Monster info
  if (Combat.monster) {
    document.getElementById('monster-sprite').innerHTML =
      Sprites.monster(Combat.monster.sprite, 3);
    document.getElementById('monster-name').textContent = Combat.monster.name;
    updateMonsterHPBar();
  } else {
    document.getElementById('monster-sprite').innerHTML = '';
    document.getElementById('monster-name').textContent = 'Puzzle';
    document.getElementById('monster-hp-bar').style.width = '0%';
  }

  // Player sprite
  document.getElementById('player-combat-sprite').innerHTML =
    Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, 3);

  // Narrative
  document.getElementById('combat-narrative').textContent =
    Combat.encounter.intro || '';

  // Update label based on encounter type
  document.querySelector('.problem-label').textContent =
    Combat.encounter.type === 'combat' ? 'SOLVE TO ATTACK:' : 'SOLVE:';

  // Problem
  showCombatProblem();

  // Clear feedback
  document.getElementById('combat-feedback').textContent = '';
  document.getElementById('combat-feedback').className = 'combat-feedback';

  // Show potion button if player has potions
  updateCombatPotions();

  // Show whiteboard toggle
  Whiteboard.show();

  // Focus input
  const input = document.getElementById('combat-answer');
  input.value = '';
  input.disabled = false;
  document.getElementById('btn-combat-submit').disabled = false;
  setTimeout(() => input.focus(), 300);
}

function showCombatProblem() {
  const problem = Combat.currentProblem;
  if (!problem) return;

  const problemEl = document.getElementById('combat-problem-text');
  let html = problem.question.replace(/\n/g, '<br>');
  if (problem.hint) {
    html += `<div style="color: var(--torch); font-size: 1.2rem; margin-top: 8px; font-weight: bold;">${problem.hint} = ?</div>`;
  }

  // Wizard hint (numeric range narrowing)
  const wizHint = Character.getHint(gameCharacter, problem.answer);
  if (wizHint) {
    html += `<div style="color: var(--purple); font-size: 0.85rem; margin-top: 6px; font-style: italic;">${wizHint}</div>`;
  }

  // Strategy tip on first encounter with a topic
  const academics = Academics.getAll();
  const topicData = academics[problem.topic];
  if (!topicData || topicData.attempts <= 1) {
    const tip = getStrategyTip(problem.topic, gameCharacter);
    if (tip) {
      html += `<div class="strategy-tip" style="color: #a8d8ea; font-size: 0.82rem; margin-top: 8px; padding: 6px 10px; background: rgba(42,42,62,0.7); border-left: 3px solid #a8d8ea; border-radius: 4px;">📖 ${tip}</div>`;
    }
  }

  problemEl.innerHTML = html;

  // Update input placeholder for multiple choice vs free-response
  const answerInput = document.getElementById('combat-answer');
  if (['A', 'B', 'C', 'D'].includes(String(problem.answer).toUpperCase())) {
    answerInput.placeholder = 'Enter A, B, or C';
  } else if (String(problem.answer).includes('/')) {
    answerInput.placeholder = 'Your answer (e.g. 3/4)...';
  } else {
    answerInput.placeholder = 'Your answer...';
  }

  // Set button text based on encounter type
  const btn = document.getElementById('btn-combat-submit');
  if (Combat.encounter.type === 'combat') {
    btn.textContent = gameCharacter.class === 'wizard' ? 'Cast Spell!' :
                      gameCharacter.class === 'ranger' ? 'Fire Arrow!' :
                      gameCharacter.class === 'rogue' ? 'Strike!' : 'Attack!';
  } else {
    btn.textContent = 'Solve!';
  }
}

function updateCombatPotions() {
  const area = document.getElementById('combat-potion-area');
  area.innerHTML = '';
  if (!gameCharacter) return;

  const potions = gameCharacter.inventory.filter(i =>
    i.id === 'health_potion' || i.id === 'great_health_potion'
  );

  if (potions.length === 0 || gameCharacter.hp >= gameCharacter.maxHp) return;

  potions.forEach(potion => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.cssText = 'padding:4px 12px;font-size:0.8rem;background:#2a6e2a;color:#fff;border:1px solid #4a4;margin-right:6px;cursor:pointer;';
    const hpAmount = potion.id === 'great_health_potion' ? 30 : 15;
    btn.textContent = `\u2764 ${potion.name} (${potion.quantity}) +${hpAmount} HP`;
    btn.onclick = () => {
      Character.useItem(gameCharacter, potion.id);
      Character.save(gameCharacter);
      updateHUD();
      updateCombatPotions();
      const feedbackEl = document.getElementById('combat-feedback');
      feedbackEl.textContent = `You used a ${potion.name}! Restored ${hpAmount} HP.`;
      feedbackEl.className = 'combat-feedback correct';
    };
    area.appendChild(btn);
  });
}

function updateMonsterHPBar() {
  if (!Combat.monster) return;
  const pct = Math.max(0, (Combat.monsterHp / Combat.monsterMaxHp) * 100);
  document.getElementById('monster-hp-bar').style.width = pct + '%';
}

function submitCombatAnswer() {
  const input = document.getElementById('combat-answer');
  const answer = input.value.trim();
  if (!answer) return;

  const result = Combat.submitAnswer(answer, gameCharacter);
  const feedbackEl = document.getElementById('combat-feedback');

  if (result.correct) {
    if (Combat.encounter.type === 'combat') {
      // Show damage number for combat encounters
      if (result.critical) {
        feedbackEl.innerHTML = `<span style="color:#ff6600;font-size:1.2em;">POWER STRIKE!</span> You deal <b>${result.damage}</b> damage!`;
      } else {
        feedbackEl.innerHTML = `You deal <b>${result.damage}</b> damage!`;
      }
      feedbackEl.className = 'combat-feedback correct';
      Audio.slash();
      updateMonsterHPBar();
    } else {
      feedbackEl.textContent = result.message;
      feedbackEl.className = 'combat-feedback correct';
      Audio.correct();
    }

    // Add XP for correct answer
    const xpGain = Combat.encounter.difficulty === 'hard' ? 30 :
                   Combat.encounter.difficulty === 'medium' ? 20 : 15;
    const leveledUp = Character.addXP(gameCharacter, xpGain);
    Character.save(gameCharacter);
    updateHUD();

    if (result.encounterComplete) {
      if (result.monsterDefeated) {
        Audio.treasure();
        feedbackEl.innerHTML = `You defeated <b>${Combat.monster.name}</b>!`;
      }

      // Hide the answer area and potions, show Continue button
      document.querySelector('.answer-area').style.display = 'none';
      document.getElementById('combat-potion-area').innerHTML = '';
      const continueBtn = document.createElement('button');
      continueBtn.className = 'btn btn-gold';
      continueBtn.textContent = 'Continue';
      continueBtn.style.marginTop = '12px';
      continueBtn.onclick = () => {
        // Restore answer area for next combat
        document.querySelector('.answer-area').style.display = '';
        input.disabled = false;
        input.value = '';
        document.getElementById('btn-combat-submit').disabled = false;
        continueBtn.remove();
        Combat.end(true);
        if (leveledUp) {
          showLevelUp();
        }
      };
      feedbackEl.after(continueBtn);
    } else {
      // Next round — new problem after brief delay to read damage
      input.value = '';
      setTimeout(() => {
        showCombatProblem();
        feedbackEl.textContent = '';
        input.focus();
      }, 1200);
    }
  } else {
    feedbackEl.className = 'combat-feedback wrong';

    if (result.dodged) {
      feedbackEl.textContent = result.message;
      Audio.dice();
    } else {
      // Show wrong-answer message + strategy tip if available
      let wrongHtml = result.message;
      const tip = getStrategyTip(Combat.currentProblem.topic, gameCharacter);
      if (tip) {
        wrongHtml += `<div style="color: #a8d8ea; font-size: 0.8rem; margin-top: 6px; padding: 5px 8px; background: rgba(42,42,62,0.7); border-left: 3px solid #a8d8ea; border-radius: 4px;">📖 ${tip}</div>`;
      }
      feedbackEl.innerHTML = wrongHtml;
      Audio.wrong();
      // Shake screen
      document.querySelector('.combat-panel').classList.add('shake');
      setTimeout(() => document.querySelector('.combat-panel').classList.remove('shake'), 500);
    }

    Character.save(gameCharacter);
    updateHUD();
    updateCombatPotions();

    if (result.playerDefeated) {
      input.disabled = true;
      document.getElementById('btn-combat-submit').disabled = true;
      document.getElementById('combat-potion-area').innerHTML = '';
      setTimeout(() => Combat.end(false), 1500);
    } else {
      // New problem generated on wrong answer — show it after delay
      input.value = '';
      setTimeout(() => {
        showCombatProblem();
        input.focus();
      }, 1200);
    }
  }
}

// ============================================================
// REWARDS
// ============================================================
function applyReward(reward) {
  if (!reward || !gameCharacter) return;

  if (reward.xp) {
    const leveledUp = Character.addXP(gameCharacter, reward.xp);
    if (leveledUp) {
      // Queue level up after current flow
      setTimeout(() => showLevelUp(), 500);
    }
  }
  if (reward.gold) gameCharacter.gold += reward.gold;
  if (reward.items) {
    reward.items.forEach(item => {
      const existing = gameCharacter.inventory.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        gameCharacter.inventory.push({ ...item });
      }
    });
  }

  Character.save(gameCharacter);
  updateHUD();
}

// ============================================================
// LEVEL UP
// ============================================================
function showLevelUp() {
  Audio.levelUp();
  showScreen('levelup');

  document.getElementById('levelup-sprite').innerHTML =
    Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, 4);
  document.getElementById('levelup-info').textContent =
    `You reached Level ${gameCharacter.level + 1}!`;

  const statChoices = document.getElementById('stat-choices');
  statChoices.innerHTML = '';
  const stats = ['strength', 'dexterity', 'intelligence', 'wisdom', 'charisma', 'constitution'];
  const statLabels = { strength: 'STR', dexterity: 'DEX', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA', constitution: 'CON' };

  // Compute what each stat does at current and +1 values
  const classData = CLASSES[gameCharacter.class];
  function statEffect(stat, value) {
    const mod = Character.modifier(value);
    switch (stat) {
      case 'strength':
        if (classData.primaryStat === 'strength') {
          return `${Character.attackDamage({ ...gameCharacter, stats: { ...gameCharacter.stats, strength: value } })} damage`;
        }
        const strBonus = Math.max(0, Math.floor(mod / 2));
        return strBonus > 0 ? `+${strBonus} bonus damage` : 'no bonus yet';
      case 'dexterity':
        if (gameCharacter.class === 'rogue') {
          return `${Math.min(45, 15 + mod * 6)}% dodge`;
        }
        const dodge = Math.min(15, Math.max(0, mod * 5));
        return dodge > 0 ? `${dodge}% dodge` : 'no dodge yet';
      case 'intelligence':
        const isWiz = gameCharacter.class === 'wizard';
        const intThreshold = isWiz ? 1 : 2;
        if (mod >= intThreshold) {
          const baseRange = isWiz ? 10 : 14;
          return `hint range \u00b1${Math.max(1, Math.round((baseRange - mod * 2) / 2))}`;
        }
        return 'no hints yet';
      case 'wisdom':
        const isRanger = gameCharacter.class === 'ranger';
        if (isRanger) return `${Math.min(100, 30 + mod * 10)}% danger sense`;
        if (mod >= 2) return `${mod * 8}% danger sense`;
        return 'no sense yet';
      case 'charisma':
        const disc = Math.min(25, Math.max(0, mod * 5));
        return disc > 0 ? `${disc}% shop discount` : 'no discount yet';
      case 'constitution':
        const hpBonus = 5 + Math.max(0, mod);
        const defBonus = Math.max(0, Math.floor(mod / 2));
        return `+${hpBonus} HP/level` + (defBonus > 0 ? `, +${defBonus} defense` : '');
    }
  }

  stats.forEach(stat => {
    const curVal = gameCharacter.stats[stat];
    const isPrimary = classData.primaryStat === stat;
    const curEffect = statEffect(stat, curVal);
    const newEffect = statEffect(stat, curVal + 1);
    const improved = curEffect !== newEffect;

    const btn = document.createElement('button');
    btn.className = 'stat-choice-btn';
    btn.innerHTML = `
      <div class="stat-choice-name">${statLabels[stat]}${isPrimary ? ' <span style="color:var(--torch);font-size:0.7em;">\u2605 PRIMARY</span>' : ''}</div>
      <div class="stat-choice-value">${curVal} \u2192 ${curVal + 1}</div>
      <div class="stat-choice-effect" style="font-size:0.75em;color:${improved ? 'var(--success)' : 'var(--muted)'};">${improved ? newEffect + ' \u2191' : curEffect}</div>
    `;
    btn.onclick = () => {
      Audio.correct();
      const hpGain = Character.levelUp(gameCharacter, stat);
      Character.save(gameCharacter);
      updateHUD();
      // Return to adventure
      showScreen('adventure');
      showNode(gameProgress.currentNodeId);
    };
    statChoices.appendChild(btn);
  });
}

// ============================================================
// GAME OVER
// ============================================================
function handleGameOver() {
  Audio.defeat();
  showScreen('gameover');

  document.getElementById('gameover-sprite').innerHTML =
    Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, 4);

  const goldLoss = Math.min(gameCharacter.gold, Math.floor(gameCharacter.gold * 0.3) + 5);
  gameCharacter.gold -= goldLoss;
  document.getElementById('gameover-penalty').textContent = `You lost ${goldLoss} gold.`;

  // Restore HP to half
  gameCharacter.hp = Math.floor(gameCharacter.maxHp / 2);
  Character.save(gameCharacter);
}

// ============================================================
// CHAPTER COMPLETE
// ============================================================
function showChapterComplete(node) {
  Audio.victory();
  showScreen('chapter-complete');

  document.getElementById('chapter-sprite').innerHTML =
    Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, 4);
  document.getElementById('chapter-title').textContent = node.chapterTitle;
  document.getElementById('chapter-summary').textContent = node.chapterSummary;
  document.getElementById('chapter-rewards').textContent = node.chapterReward || '';

  // Mark chapter completed
  if (!gameProgress.chaptersCompleted.includes(gameProgress.currentChapter)) {
    gameProgress.chaptersCompleted.push(gameProgress.currentChapter);
  }

  // Grant chapter completion rewards
  const chapterRewards = { xp: 100, gold: 50 };
  applyReward(chapterRewards);

  // Grant chapter reward item (equipment)
  if (node.chapterRewardItem) {
    const item = node.chapterRewardItem;
    if (item.slot === 'weapon') {
      gameCharacter.equipment.weapon = { name: item.name, bonus: item.bonus, type: item.type };
    } else if (item.slot === 'armor') {
      gameCharacter.equipment.armor = { name: item.name, bonus: item.bonus };
    } else if (item.slot === 'accessory') {
      gameCharacter.equipment.accessory = { name: item.name, bonus: item.bonus, effect: item.effect };
    }
    Character.save(gameCharacter);
  }

  // Set up next chapter button
  const nextBtn = document.getElementById('btn-next-chapter');
  const nextChapter = gameProgress.currentChapter + 1;
  if (STORY[getChapterStart(nextChapter)]) {
    nextBtn.textContent = 'Continue to Chapter ' + nextChapter;
    nextBtn.onclick = () => {
      gameProgress.currentChapter = nextChapter;
      gameProgress.currentNodeId = getChapterStart(nextChapter);
      Progress.save(gameProgress);
      showNode(gameProgress.currentNodeId);
    };
  } else {
    nextBtn.textContent = 'Return to Title (Quest Complete!)';
    nextBtn.onclick = () => showScreen('title');
  }
}

// ============================================================
// SHOP
// ============================================================
function showShopAndChoices(node) {
  // Show regular choices first (this clears and rebuilds the list)
  if (node.choices) {
    showChoices(node.choices);
  }

  // Then prepend the shop button
  const choicesEl = document.getElementById('choices');
  const shopBtn = document.createElement('button');
  shopBtn.className = 'choice-btn';
  shopBtn.innerHTML = '<span class="choice-key">$</span> Visit the merchant\'s shop';
  shopBtn.onclick = () => openShop(node);
  choicesEl.prepend(shopBtn);
}

function openShop(returnNode) {
  showScreen('shop');

  document.getElementById('shop-npc').innerHTML = Sprites.npc('merchant', 3);
  document.getElementById('shop-gold-display').textContent = gameCharacter.gold;

  const shopItemsEl = document.getElementById('shop-items');
  shopItemsEl.innerHTML = '';

  // CHA discount: each point of CHA modifier gives 5% off, up to 25%
  const chaMod = Character.modifier(gameCharacter.stats.charisma);
  const discountPct = Math.min(25, Math.max(0, chaMod * 5));

  SHOP_ITEMS.forEach(item => {
    const discountedPrice = Math.max(1, Math.round(item.price * (1 - discountPct / 100)));
    const div = document.createElement('div');
    div.className = 'shop-item';
    const priceHTML = discountPct > 0
      ? `<span class="shop-item-price"><s style="opacity:0.5">${item.price}g</s> ${discountedPrice}g</span>`
      : `<span class="shop-item-price">${item.price}g</span>`;
    div.innerHTML = `
      <div>
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${item.desc}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        ${priceHTML}
        <button class="btn btn-gold" style="padding:6px 14px;font-size:0.85rem;" ${gameCharacter.gold < discountedPrice ? 'disabled' : ''}>Buy</button>
      </div>
    `;
    const buyBtn = div.querySelector('button');
    buyBtn.onclick = () => {
      const shopItem = { ...item, price: discountedPrice };
      if (Character.buyItem(gameCharacter, shopItem)) {
        Audio.treasure();
        Character.save(gameCharacter);
        updateHUD();
        document.getElementById('shop-gold-display').textContent = gameCharacter.gold;
        // Refresh shop to update afford status
        openShop(returnNode);
      }
    };
    shopItemsEl.appendChild(div);
  });

  document.getElementById('btn-close-shop').onclick = () => {
    showScreen('adventure');
  };
}

// ============================================================
// INVENTORY SCREEN
// ============================================================
function showInventory() {
  showScreen('inventory');

  document.getElementById('inv-sprite').innerHTML =
    Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, 4);
  document.getElementById('inv-name').textContent = gameCharacter.name;
  document.getElementById('inv-class').textContent =
    RACES[gameCharacter.race].name + ' ' + CLASSES[gameCharacter.class].name;
  document.getElementById('inv-level').textContent = 'Level ' + gameCharacter.level;

  // Stats
  const statsEl = document.getElementById('inv-stats');
  const statLabels = { strength: 'STR', dexterity: 'DEX', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA', constitution: 'CON' };
  statsEl.innerHTML = '';
  for (const [stat, label] of Object.entries(statLabels)) {
    statsEl.innerHTML += `
      <div class="stat-box">
        <div class="stat-label">${label}</div>
        <div class="stat-value">${gameCharacter.stats[stat]}</div>
      </div>
    `;
  }

  // Equipment
  const equipEl = document.getElementById('inv-equipment');
  equipEl.innerHTML = '<h3>Equipment</h3>';
  const slots = ['weapon', 'armor', 'accessory'];
  slots.forEach(slot => {
    const item = gameCharacter.equipment[slot];
    equipEl.innerHTML += `
      <div class="equip-slot">
        <span class="slot-name">${slot.charAt(0).toUpperCase() + slot.slice(1)}</span>
        <span class="slot-item">${item ? item.name + ' (+' + item.bonus + ')' : 'Empty'}</span>
      </div>
    `;
  });

  // Items
  const itemsEl = document.getElementById('inv-items');
  itemsEl.innerHTML = '<h3>Inventory</h3>';
  if (gameCharacter.inventory.length === 0) {
    itemsEl.innerHTML += '<div style="color: var(--text-dim); font-size: 0.85rem;">No items</div>';
  } else {
    gameCharacter.inventory.forEach(item => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-qty">x${item.quantity}</span>
        <button class="btn btn-gold btn-use">Use</button>
      `;
      row.querySelector('.btn-use').onclick = () => {
        if (Character.useItem(gameCharacter, item.id)) {
          Audio.correct();
          Character.save(gameCharacter);
          showInventory(); // Refresh
        }
      };
      itemsEl.appendChild(row);
    });
  }

  // Academic journal
  const academicsEl = document.getElementById('inv-academics');
  const academics = Academics.getAll();
  academicsEl.innerHTML = '';

  const topicNames = {
    whole_by_decimal: 'Whole ÷ Decimal',
    decimal_by_whole: 'Decimal ÷ Whole',
    decimal_by_decimal: 'Decimal ÷ Decimal',
    frac_to_decimal: 'Fraction → Decimal',
    decimal_to_frac: 'Decimal → Fraction',
    place_value: 'Place Value',
    decimal_forms: 'Decimal Forms',
    regroup_decimals: 'Regrouping Decimals',
    estimate_multiply: 'Estimate Multiplication',
    estimate_divide: 'Estimate Division',
    whole_div_decimal_quot: 'Whole ÷ Whole (Decimal)'
  };

  for (const [id, name] of Object.entries(topicNames)) {
    const data = academics[id];
    const accuracy = data ? Math.round((data.correct / data.attempts) * 100) : null;
    const accClass = accuracy === null ? '' : accuracy >= 80 ? 'good' : accuracy >= 60 ? 'ok' : 'weak';
    academicsEl.innerHTML += `
      <div class="topic-row">
        <span class="topic-name">${name}</span>
        <span class="topic-accuracy ${accClass}">${accuracy !== null ? accuracy + '%' : '--'}</span>
      </div>
    `;
  }
}

// ============================================================
// INITIALIZATION + EVENT LISTENERS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Initialize whiteboard
  Whiteboard.init();

  // Title screen — show emblem
  document.getElementById('title-emblem').innerHTML = `
    <svg width="120" height="120" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 5 L 70 18 L 70 45 Q 70 68 40 78 Q 10 68 10 45 L 10 18 Z" fill="#3a3a52" stroke="#e8a030" stroke-width="2"/>
      <path d="M 40 12 L 63 22 L 63 43 Q 63 62 40 71 Q 17 62 17 43 L 17 22 Z" fill="#2a2a3e"/>
      <path d="M 40 22 L 50 35 L 58 28 L 52 40 L 58 52 L 47 46 L 40 58 L 33 46 L 22 52 L 28 40 L 22 28 L 30 35 Z" fill="#e8a030"/>
    </svg>
  `;

  // Click narrative to skip typewriter animation
  document.getElementById('narrative-text').addEventListener('click', () => {
    if (typeWriterCancel) typeWriterCancel();
  });

  // Save slot helpers
  function refreshSlots() {
    for (let i = 1; i <= 3; i++) {
      const card = document.querySelector(`.save-slot-card[data-slot="${i}"]`);
      const spriteEl = document.getElementById(`slot-sprite-${i}`);
      const infoEl = document.getElementById(`slot-info-${i}`);
      const delBtn = card.querySelector('.btn-delete-slot');
      const charData = Character.peekSlot(i);
      const progData = Progress.peekSlot(i);

      if (charData) {
        card.classList.remove('empty');
        spriteEl.innerHTML = Sprites.player(charData.race, charData.class, charData.appearance, 3);
        const chapterNum = progData ? progData.currentChapter : 1;
        infoEl.innerHTML = `
          <span class="slot-name">${charData.name}</span>
          <span class="slot-detail">${RACES[charData.race].name} ${CLASSES[charData.class].name}</span>
          <span class="slot-detail">Level ${charData.level}</span>
          <span class="slot-chapter">Chapter ${chapterNum}</span>
        `;
        delBtn.style.display = '';
      } else {
        card.classList.add('empty');
        spriteEl.innerHTML = '<span style="font-size:2rem;opacity:0.3">+</span>';
        infoEl.innerHTML = 'Empty Slot';
        delBtn.style.display = 'none';
      }
    }
  }

  function showSlots() {
    document.querySelector('.title-buttons').style.display = 'none';
    document.querySelector('.subtitle').style.display = 'none';
    document.querySelector('.btn-back-hub').style.display = 'none';
    document.getElementById('save-slots').style.display = '';
    refreshSlots();
  }

  function hideSlots() {
    document.getElementById('save-slots').style.display = 'none';
    document.querySelector('.title-buttons').style.display = '';
    document.querySelector('.subtitle').style.display = '';
    document.querySelector('.btn-back-hub').style.display = '';
  }

  // Play button shows save slots
  document.getElementById('btn-show-slots').onclick = showSlots;
  document.getElementById('btn-back-title').onclick = hideSlots;

  // Slot card clicks
  document.querySelectorAll('.save-slot-card').forEach(card => {
    card.onclick = (e) => {
      if (e.target.closest('.btn-delete-slot')) return;
      const slot = parseInt(card.dataset.slot);
      activeSlot = slot;
      const saved = Character.peekSlot(slot);
      if (saved) {
        // Continue existing game
        gameCharacter = Character.load();
        gameProgress = Progress.load();
        updateHUD();
        showNode(gameProgress.currentNodeId);
      } else {
        // New game in this slot
        deleteSlot(slot);
        createState.name = '';
        createState.race = 'human';
        createState.class = 'warrior';
        createState.appearance = { skinTone: '#f5d0a9', hairColor: '#2c1810', armorColor: '#7f8c8d' };
        initCharacterCreation();
        showCreateStep(1);
        showScreen('create');
      }
    };
  });

  // Delete slot buttons
  document.querySelectorAll('.btn-delete-slot').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const slot = parseInt(btn.dataset.slot);
      const charData = Character.peekSlot(slot);
      if (charData && confirm(`Delete ${charData.name}'s save?`)) {
        deleteSlot(slot);
        refreshSlots();
      }
    };
  });

  // Name chips
  document.querySelectorAll('.name-chip').forEach(chip => {
    chip.onclick = () => {
      document.getElementById('input-name').value = chip.dataset.name;
      createState.name = chip.dataset.name;
      updateAppearancePreview();
    };
  });

  // Name input
  document.getElementById('input-name').addEventListener('input', (e) => {
    createState.name = e.target.value;
    updateAppearancePreview();
  });

  // Step navigation
  document.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.onclick = () => {
      const next = parseInt(btn.dataset.next);
      if (next === 2 && !createState.name.trim()) {
        document.getElementById('input-name').focus();
        document.getElementById('input-name').style.borderColor = 'var(--red)';
        setTimeout(() => document.getElementById('input-name').style.borderColor = '', 1500);
        return;
      }
      showCreateStep(next);
    };
  });
  document.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.onclick = () => showCreateStep(parseInt(btn.dataset.prev));
  });

  // Begin Quest
  document.getElementById('btn-begin-quest').onclick = () => {
    Audio.dice();
    gameCharacter = Character.create(
      createState.name.trim(),
      createState.race,
      createState.class,
      { ...createState.appearance }
    );
    Character.save(gameCharacter);
    gameProgress = Progress.load();
    Progress.save(gameProgress);

    updateHUD();
    showNode('ch1_start');
  };

  // Combat submit
  document.getElementById('btn-combat-submit').onclick = submitCombatAnswer;
  document.getElementById('combat-answer').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitCombatAnswer();
  });

  // Inventory
  document.getElementById('btn-inventory').onclick = showInventory;
  document.getElementById('btn-close-inventory').onclick = () => {
    showScreen('adventure');
    updateHUD();
  };

  // Back to menu
  document.getElementById('btn-back-menu').onclick = () => {
    Character.save(gameCharacter);
    Progress.save(gameProgress);
    hideSlots();
    showScreen('title');
  };

  // Respawn
  document.getElementById('btn-respawn').onclick = () => {
    // Go back to last safe node (chapter start)
    const chapterStart = getChapterStart(gameProgress.currentChapter);
    gameProgress.currentNodeId = chapterStart;
    Progress.save(gameProgress);
    Character.save(gameCharacter);
    updateHUD();
    showNode(chapterStart);
  };
});
