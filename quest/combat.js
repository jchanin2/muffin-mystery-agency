// combat.js — Encounter and combat logic for Realms of Mathematica

const Combat = {
  active: false,
  monster: null,
  monsterHp: 0,
  monsterMaxHp: 0,
  encounter: null,
  currentProblem: null,
  roundsRemaining: 1,
  onComplete: null, // callback when combat ends

  // Start a combat or puzzle encounter
  start(encounter, character, onComplete) {
    this.active = true;
    this.encounter = encounter;
    this.onComplete = onComplete;

    if (encounter.type === 'combat' && encounter.monster) {
      this.monster = { ...encounter.monster };
      this.monsterHp = encounter.monster.hp;
      this.monsterMaxHp = encounter.monster.maxHp;
    } else {
      this.monster = null;
      this.monsterHp = 0;
      this.monsterMaxHp = 0;
    }

    this.roundsRemaining = encounter.rounds || 1;
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
      monsterDefeated: false,
      encounterComplete: false,
      message: ''
    };

    if (correct) {
      // Record academic performance
      Academics.record(this.currentProblem.topic, true);

      if (this.encounter.type === 'combat' && this.monster) {
        // Calculate player damage to monster
        const dmg = Character.attackDamage(character);
        this.monsterHp = Math.max(0, this.monsterHp - dmg);
        result.damage = dmg;
        result.message = this.encounter.success || `You deal ${dmg} damage!`;

        if (this.monsterHp <= 0) {
          result.monsterDefeated = true;
          result.encounterComplete = true;
          result.message = `You defeated ${this.monster.name}!`;
        } else {
          this.roundsRemaining--;
          if (this.roundsRemaining <= 0) {
            // Ran out of rounds but monster still alive — still counts as win for story flow
            result.monsterDefeated = true;
            result.encounterComplete = true;
            result.message = `You defeated ${this.monster.name}!`;
          }
        }
      } else {
        // Puzzle — correct means solved
        result.encounterComplete = true;
        result.message = this.encounter.success || 'Puzzle solved!';
      }
    } else {
      // Wrong answer
      Academics.record(this.currentProblem.topic, false);

      if (this.encounter.type === 'combat' && this.monster) {
        // Monster attacks
        const rawDmg = this.monster.attack;
        const actualDmg = Character.takeDamage(character, rawDmg);

        if (actualDmg === 0) {
          result.dodged = true;
          result.message = 'You dodge the attack! But your answer was wrong — try again!';
        } else {
          result.damage = actualDmg;
          result.message = this.encounter.failure || `The ${this.monster.name} hits you for ${actualDmg} damage!`;
        }
      } else {
        // Puzzle — wrong means try again, maybe take damage
        result.message = this.encounter.failure || 'That\'s not right. Try again!';
      }
    }

    // Check if player is defeated
    if (character.hp <= 0) {
      result.playerDefeated = true;
    }

    // Generate new problem if encounter isn't complete and answer was correct (next round)
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
