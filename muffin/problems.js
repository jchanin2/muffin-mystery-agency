// problems.js — Decimal division problem generator for 5th grade (Illustrative Math)

const ProblemType = {
  DECIMAL_BY_WHOLE: 'decimal_by_whole',
  WHOLE_BY_DECIMAL: 'whole_by_decimal',
  DECIMAL_BY_DECIMAL: 'decimal_by_decimal',
  MONEY_WORD: 'money_word',
  MEASUREMENT_WORD: 'measurement_word'
};

// Generate problems backwards from clean answers to guarantee nice results
const ProblemGenerator = {

  // Helper: pick random integer in [min, max]
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Helper: pick random element from array
  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // Helper: round to avoid floating point weirdness
  round(n, decimals = 4) {
    return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  // Type 1: Decimal ÷ Whole Number → Decimal answer
  // e.g., 4.8 ÷ 2 = 2.4
  generateDecimalByWhole(difficulty) {
    let divisor, answer, dividend;
    if (difficulty === 'easy') {
      divisor = this.randInt(2, 5);
      answer = this.round(this.randInt(1, 9) / 10 + this.randInt(0, 4));
      // Make answer have 1 decimal place
      answer = this.round(this.randInt(1, 50) / 10);
      dividend = this.round(answer * divisor);
    } else if (difficulty === 'medium') {
      divisor = this.randInt(2, 8);
      answer = this.round(this.randInt(1, 99) / 10);
      dividend = this.round(answer * divisor);
    } else {
      divisor = this.randInt(2, 12);
      answer = this.round(this.randInt(1, 999) / 100);
      dividend = this.round(answer * divisor);
    }
    return {
      type: ProblemType.DECIMAL_BY_WHOLE,
      question: `${dividend} ÷ ${divisor}`,
      answer: answer,
      dividend,
      divisor
    };
  },

  // Type 2: Whole Number ÷ Decimal → Whole number answer
  // e.g., 6 ÷ 0.3 = 20
  generateWholeByDecimal(difficulty) {
    let divisor, answer, dividend;
    if (difficulty === 'easy') {
      answer = this.randInt(2, 10);
      divisor = this.round(this.pick([0.2, 0.3, 0.4, 0.5]));
      dividend = this.round(answer * divisor);
    } else if (difficulty === 'medium') {
      answer = this.randInt(2, 20);
      divisor = this.round(this.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8]));
      dividend = this.round(answer * divisor);
    } else {
      answer = this.randInt(5, 30);
      divisor = this.round(this.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8, 1.5]));
      dividend = this.round(answer * divisor);
    }
    return {
      type: ProblemType.WHOLE_BY_DECIMAL,
      question: `${dividend} ÷ ${divisor}`,
      answer: answer,
      dividend,
      divisor
    };
  },

  // Type 3: Decimal ÷ Decimal → Whole or simple decimal answer
  // e.g., 3.6 ÷ 0.4 = 9
  generateDecimalByDecimal(difficulty) {
    let divisor, answer, dividend;
    if (difficulty === 'easy') {
      answer = this.randInt(2, 9);
      divisor = this.round(this.pick([0.2, 0.3, 0.4, 0.5]));
      dividend = this.round(answer * divisor);
    } else if (difficulty === 'medium') {
      answer = this.randInt(2, 15);
      divisor = this.round(this.pick([0.3, 0.4, 0.5, 0.6, 0.8, 1.2]));
      dividend = this.round(answer * divisor);
    } else {
      answer = this.randInt(2, 20);
      divisor = this.round(this.pick([0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8, 1.5]));
      dividend = this.round(answer * divisor);
    }
    return {
      type: ProblemType.DECIMAL_BY_DECIMAL,
      question: `${dividend} ÷ ${divisor}`,
      answer: answer,
      dividend,
      divisor
    };
  },

  // Type 4: Money word problems
  generateMoneyWord(difficulty) {
    const scenarios = [
      {
        template: (total, count) => `${count} friends want to split a bill of $${total.toFixed(2)} equally. How much does each person pay?`,
        generate: (diff) => {
          const count = diff === 'easy' ? ProblemGenerator.randInt(2, 4) : ProblemGenerator.randInt(2, 6);
          const perPerson = ProblemGenerator.round(ProblemGenerator.randInt(1, diff === 'easy' ? 5 : 12) + ProblemGenerator.pick([0.25, 0.50, 0.75, 0.20, 0.40, 0.60, 0.80]));
          const total = ProblemGenerator.round(perPerson * count);
          return { total, count, answer: perPerson };
        }
      },
      {
        template: (total, price) => `Muffin found a receipt for $${total.toFixed(2)} worth of donuts. Each donut costs $${price.toFixed(2)}. How many donuts were bought?`,
        generate: (diff) => {
          const price = ProblemGenerator.round(ProblemGenerator.pick(diff === 'easy' ? [0.50, 0.75, 1.25, 1.50] : [0.35, 0.65, 0.75, 1.25, 1.50, 2.25]));
          const count = ProblemGenerator.randInt(2, diff === 'easy' ? 6 : 10);
          const total = ProblemGenerator.round(price * count);
          return { total, price, answer: count };
        }
      },
      {
        template: (total, weeks) => `A suspect saved $${total.toFixed(2)} over ${weeks} weeks. How much did they save per week?`,
        generate: (diff) => {
          const weeks = ProblemGenerator.randInt(2, diff === 'easy' ? 5 : 8);
          const perWeek = ProblemGenerator.round(ProblemGenerator.randInt(1, diff === 'easy' ? 8 : 15) + ProblemGenerator.pick([0.25, 0.50, 0.75]));
          const total = ProblemGenerator.round(perWeek * weeks);
          return { total, weeks, answer: perWeek };
        }
      }
    ];

    const scenario = this.pick(scenarios);
    const data = scenario.generate(difficulty);
    const args = Object.values(data).filter(v => v !== data.answer);

    return {
      type: ProblemType.MONEY_WORD,
      question: scenario.template(...args),
      answer: data.answer,
      isWordProblem: true
    };
  },

  // Type 5: Measurement word problems
  generateMeasurementWord(difficulty) {
    const scenarios = [
      {
        template: (total, section) => `A hiking trail is ${total} km long. If each section is ${section} km, how many sections is the trail divided into?`,
        generate: (diff) => {
          const section = ProblemGenerator.pick(diff === 'easy' ? [0.5, 0.25, 0.2] : [0.3, 0.4, 0.5, 0.6, 0.8, 1.5]);
          const count = ProblemGenerator.randInt(3, diff === 'easy' ? 8 : 12);
          const total = ProblemGenerator.round(section * count);
          return { total, section, answer: count };
        }
      },
      {
        template: (total, pieces) => `A rope is ${total} meters long. It needs to be cut into ${pieces} equal pieces. How long is each piece?`,
        generate: (diff) => {
          const pieces = ProblemGenerator.randInt(2, diff === 'easy' ? 5 : 8);
          const each = ProblemGenerator.round(ProblemGenerator.randInt(1, diff === 'easy' ? 5 : 10) + ProblemGenerator.pick([0.2, 0.25, 0.4, 0.5, 0.75]));
          const total = ProblemGenerator.round(each * pieces);
          return { total, pieces, answer: each };
        }
      },
      {
        template: (total, perBottle) => `A container holds ${total} liters of juice. Each bottle holds ${perBottle} liters. How many bottles can be filled?`,
        generate: (diff) => {
          const perBottle = ProblemGenerator.pick(diff === 'easy' ? [0.25, 0.5] : [0.25, 0.3, 0.4, 0.5, 0.6, 0.75]);
          const bottles = ProblemGenerator.randInt(3, diff === 'easy' ? 8 : 12);
          const total = ProblemGenerator.round(perBottle * bottles);
          return { total, perBottle, answer: bottles };
        }
      }
    ];

    const scenario = this.pick(scenarios);
    const data = scenario.generate(difficulty);
    const args = Object.values(data).filter(v => v !== data.answer);

    return {
      type: ProblemType.MEASUREMENT_WORD,
      question: scenario.template(...args),
      answer: data.answer,
      isWordProblem: true
    };
  },

  // Main generator: dispatch by type
  generate(type, difficulty = 'easy') {
    switch (type) {
      case ProblemType.DECIMAL_BY_WHOLE:
        return this.generateDecimalByWhole(difficulty);
      case ProblemType.WHOLE_BY_DECIMAL:
        return this.generateWholeByDecimal(difficulty);
      case ProblemType.DECIMAL_BY_DECIMAL:
        return this.generateDecimalByDecimal(difficulty);
      case ProblemType.MONEY_WORD:
        return this.generateMoneyWord(difficulty);
      case ProblemType.MEASUREMENT_WORD:
        return this.generateMeasurementWord(difficulty);
      default:
        return this.generateDecimalByWhole(difficulty);
    }
  },

  // Validate an answer with epsilon tolerance
  checkAnswer(userAnswer, correctAnswer) {
    const parsed = parseFloat(userAnswer);
    if (isNaN(parsed)) return false;
    return Math.abs(parsed - correctAnswer) < 0.001;
  }
};
