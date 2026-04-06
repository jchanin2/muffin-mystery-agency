// combat.js — Encounter and combat logic for Realms of Mathematica

const Combat = {
  active: false,
  monster: null,
  monsterHp: 0,
  monsterMaxHp: 0,
  encounter: null,
  currentProblem: null,
  consecutiveCorrect: 0, // Track streak for Warrior Power Strike
  onComplete: null, // callback when combat ends

  // Start a combat or puzzle encounter
  start(encounter, character, onComplete) {
    this.active = true;
    this.encounter = encounter;
    this.onComplete = onComplete;
    this.consecutiveCorrect = 0;

    if (encounter.type === 'combat' && encounter.monster) {
      this.monster = { ...encounter.monster };
      this.monsterHp = encounter.monster.hp;
      this.monsterMaxHp = encounter.monster.maxHp;
    } else {
      this.monster = null;
      this.monsterHp = 0;
      this.monsterMaxHp = 0;
    }

    this.generateProblem(encounter);
  },

  // Generate a math problem for the current encounter
  generateProblem(encounter) {
    const topic = encounter.problemTopic;
    const difficulty = encounter.difficulty || 'easy';
    this.currentProblem = generateProblem(topic, difficulty);
  },

  // Handle answer submission — returns result object
  submitAnswer(userAnswer, character) {
    const correct = checkAnswer(userAnswer, this.currentProblem.answer);
    const result = {
      correct,
      damage: 0,
      dodged: false,
      critical: false,
      monsterDefeated: false,
      encounterComplete: false,
      message: ''
    };

    if (correct) {
      // Record academic performance
      Academics.record(this.currentProblem.topic, true);
      this.consecutiveCorrect++;

      if (this.encounter.type === 'combat' && this.monster) {
        // Calculate player damage to monster
        let dmg = Character.attackDamage(character);

        // Warrior Power Strike: consecutive correct answers trigger double damage
        if (character.class === 'warrior' && this.consecutiveCorrect >= 2) {
          dmg = dmg * 2;
          result.critical = true;
        }

        this.monsterHp = Math.max(0, this.monsterHp - dmg);
        result.damage = dmg;

        if (this.monsterHp <= 0) {
          result.monsterDefeated = true;
          result.encounterComplete = true;
          result.message = `You defeated ${this.monster.name}!`;
        } else {
          result.message = result.critical
            ? `POWER STRIKE! You deal ${dmg} damage!`
            : `You deal ${dmg} damage!`;
        }
      } else {
        // Puzzle — correct means solved
        result.encounterComplete = true;
        result.message = this.encounter.success || 'Puzzle solved!';
      }
    } else {
      // Wrong answer
      Academics.record(this.currentProblem.topic, false);
      this.consecutiveCorrect = 0; // Reset streak

      if (this.encounter.type === 'combat' && this.monster) {
        // Monster attacks
        const rawDmg = this.monster.attack;
        const actualDmg = Character.takeDamage(character, rawDmg);

        if (actualDmg === 0) {
          result.dodged = true;
          result.message = 'You dodge the attack! But your answer was wrong — try again!';
        } else {
          result.damage = actualDmg;
          result.message = `The ${this.monster.name} hits you for ${actualDmg} damage!`;
        }
      } else {
        // Puzzle — wrong answer deals minor damage (traps, magical feedback, etc.)
        const puzzleDmg = this.encounter.difficulty === 'hard' ? 3 :
                          this.encounter.difficulty === 'medium' ? 2 : 1;
        const actualDmg = Math.max(1, puzzleDmg - Character.defense(character));
        character.hp = Math.max(0, character.hp - actualDmg);
        result.damage = actualDmg;

        if (character.hp <= 0) {
          result.playerDefeated = true;
        }

        result.message = this.encounter.failure || `The puzzle fights back! You take ${actualDmg} damage.`;
      }

      // Generate a new problem on wrong answer so player can't brute-force
      this.generateProblem(this.encounter);
    }

    // Check if player is defeated
    if (character.hp <= 0) {
      result.playerDefeated = true;
    }

    // Generate new problem if encounter isn't complete (next round of combat)
    if (correct && !result.encounterComplete) {
      this.generateProblem(this.encounter);
    }

    return result;
  },

  // End combat and call completion callback
  end(victory) {
    this.active = false;
    if (this.onComplete) {
      this.onComplete(victory);
    }
  }
};
