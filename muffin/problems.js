// problems.js — Decimal division problem generator for 5th grade (Illustrative Math)

const ProblemType = {
  DECIMAL_BY_WHOLE: 'decimal_by_whole',
  WHOLE_BY_DECIMAL: 'whole_by_decimal',
  DECIMAL_BY_DECIMAL: 'decimal_by_decimal',
  MONEY_WORD: 'money_word',
  MEASUREMENT_WORD: 'measurement_word',
  POWERS_OF_10: 'powers_of_10',
  METRIC_CONVERSION: 'metric_conversion',
  MULTIPLY_DIVIDE_POW10: 'multiply_divide_pow10',
  COMMON_DENOMINATOR: 'common_denominator'
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

  // Type 6: Powers of 10
  // e.g., 10^3 = ?, or 4.5 x 10^2 = ?
  generatePowersOf10(difficulty) {
    if (difficulty === 'easy') {
      // Simple: What is 10^n?
      const exp = this.randInt(1, 4);
      const answer = Math.pow(10, exp);
      return {
        type: ProblemType.POWERS_OF_10,
        question: `What is 10 to the power of ${exp}? (10^${exp})`,
        answer: answer,
        isWordProblem: true
      };
    } else if (difficulty === 'medium') {
      // Multiply a number by a power of 10
      const exp = this.randInt(1, 3);
      const base = this.round(this.pick([1.5, 2.5, 3.5, 4.5, 0.5, 0.25, 6.2, 7.8]));
      const power = Math.pow(10, exp);
      const answer = this.round(base * power);
      return {
        type: ProblemType.POWERS_OF_10,
        question: `What is ${base} x 10^${exp}?`,
        answer: answer,
        isWordProblem: true
      };
    } else {
      // Mixed: evaluate expressions with powers of 10
      const exp = this.randInt(2, 4);
      const base = this.round(this.pick([0.3, 0.45, 1.2, 2.5, 3.6, 0.08]));
      const power = Math.pow(10, exp);
      const answer = this.round(base * power);
      return {
        type: ProblemType.POWERS_OF_10,
        question: `Calculate: ${base} x 10^${exp}`,
        answer: answer,
        isWordProblem: true
      };
    }
  },

  // Type 7: Metric conversions
  // e.g., 3.5 km = ? m, 2500 mg = ? g
  generateMetricConversion(difficulty) {
    const conversions = [
      { from: 'km', to: 'm', factor: 1000, dir: 'multiply' },
      { from: 'm', to: 'cm', factor: 100, dir: 'multiply' },
      { from: 'cm', to: 'mm', factor: 10, dir: 'multiply' },
      { from: 'kg', to: 'g', factor: 1000, dir: 'multiply' },
      { from: 'g', to: 'mg', factor: 1000, dir: 'multiply' },
      { from: 'L', to: 'mL', factor: 1000, dir: 'multiply' },
      { from: 'm', to: 'km', factor: 1000, dir: 'divide' },
      { from: 'cm', to: 'm', factor: 100, dir: 'divide' },
      { from: 'g', to: 'kg', factor: 1000, dir: 'divide' },
      { from: 'mg', to: 'g', factor: 1000, dir: 'divide' },
      { from: 'mL', to: 'L', factor: 1000, dir: 'divide' }
    ];
    const conv = this.pick(conversions);
    let value, answer;
    if (conv.dir === 'multiply') {
      value = this.round(this.pick([0.5, 1.5, 2.5, 3.5, 0.75, 4.2, 0.25, 6.8]));
      answer = this.round(value * conv.factor);
    } else {
      answer = this.round(this.pick([0.5, 1.5, 2.5, 3.5, 0.75, 4.2, 0.25, 6.8]));
      value = this.round(answer * conv.factor);
    }
    return {
      type: ProblemType.METRIC_CONVERSION,
      question: `Convert: ${value} ${conv.from} = ? ${conv.to}`,
      answer: answer,
      isWordProblem: true
    };
  },

  // Type 8: Multiply/divide whole numbers and decimals by 10, 100, 1000
  generateMultiplyDividePow10(difficulty) {
    const multipliers = [10, 100, 1000];
    const mult = this.pick(multipliers);
    const isMultiply = Math.random() < 0.5;
    let value, answer;
    if (isMultiply) {
      value = this.round(this.pick([0.3, 0.45, 1.2, 2.5, 3.6, 0.08, 4.5, 7.25]));
      answer = this.round(value * mult);
      return {
        type: ProblemType.MULTIPLY_DIVIDE_POW10,
        question: `${value} x ${mult} = ?`,
        answer: answer,
        isWordProblem: true
      };
    } else {
      answer = this.round(this.pick([0.3, 0.45, 1.2, 2.5, 3.6, 4.5, 6.7, 7.25]));
      value = this.round(answer * mult);
      return {
        type: ProblemType.MULTIPLY_DIVIDE_POW10,
        question: `${value} / ${mult} = ?`,
        answer: answer,
        isWordProblem: true
      };
    }
  },

  // Type 9: Common denominators (intro)
  // e.g., Find the least common denominator for 1/3 and 1/4
  generateCommonDenominator(difficulty) {
    const pairs = [
      { d1: 2, d2: 3, lcd: 6 },
      { d1: 3, d2: 4, lcd: 12 },
      { d1: 2, d2: 5, lcd: 10 },
      { d1: 3, d2: 5, lcd: 15 },
      { d1: 4, d2: 5, lcd: 20 },
      { d1: 3, d2: 6, lcd: 6 },
      { d1: 4, d2: 6, lcd: 12 },
      { d1: 2, d2: 7, lcd: 14 },
      { d1: 5, d2: 6, lcd: 30 }
    ];
    const easyPairs = pairs.slice(0, 4);
    const pool = difficulty === 'easy' ? easyPairs : pairs;
    const pair = this.pick(pool);
    return {
      type: ProblemType.COMMON_DENOMINATOR,
      question: `Find the least common denominator for 1/${pair.d1} and 1/${pair.d2}.`,
      answer: pair.lcd,
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
      case ProblemType.POWERS_OF_10:
        return this.generatePowersOf10(difficulty);
      case ProblemType.METRIC_CONVERSION:
        return this.generateMetricConversion(difficulty);
      case ProblemType.MULTIPLY_DIVIDE_POW10:
        return this.generateMultiplyDividePow10(difficulty);
      case ProblemType.COMMON_DENOMINATOR:
        return this.generateCommonDenominator(difficulty);
      default:
        return this.generateDecimalByWhole(difficulty);
    }
  },

  // Validate an answer with epsilon tolerance.
  // Accepts plain decimals ("0.75"), commas ("1,200"), pure fractions ("3/4"),
  // and mixed numbers ("1 7/12", "1-7/12", "1_7/12"). If correctAnswer is itself
  // a fraction string (e.g. "1/4"), it is parsed the same way, so equivalent
  // forms like "2/8" or "0.25" also count.
  checkAnswer(userAnswer, correctAnswer) {
    const parseVal = (v) => {
      if (typeof v === 'number') return v;
      const s = String(v).trim().replace(/,/g, '');
      // Mixed number: "1 7/12" / "1-7/12" / "1_7/12"
      const mixedMatch = s.match(/^(-?\d+)[\s_-]+(\d+)\s*\/\s*(\d+)$/);
      if (mixedMatch) {
        const whole = parseInt(mixedMatch[1], 10);
        const num = parseInt(mixedMatch[2], 10);
        const denom = parseInt(mixedMatch[3], 10);
        if (denom === 0) return NaN;
        const sign = whole < 0 || mixedMatch[1] === '-0' ? -1 : 1;
        return whole + sign * (num / denom);
      }
      // Pure fraction: "3/4"
      const fracMatch = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
      if (fracMatch) {
        const denom = parseFloat(fracMatch[2]);
        if (denom === 0) return NaN;
        return parseFloat(fracMatch[1]) / denom;
      }
      // Plain decimal or whole number
      const n = parseFloat(s);
      return isNaN(n) ? NaN : n;
    };
    const u = parseVal(userAnswer);
    const c = parseVal(correctAnswer);
    if (isNaN(u) || isNaN(c)) return false;
    return Math.abs(u - c) < 0.001;
  }
};
