// problems.js — Math problem generators for all curriculum topics
// Uses backward-generation: generate clean answer first, then construct the problem

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function round(n, places) { return Math.round(n * Math.pow(10, places)) / Math.pow(10, places); }

// ============================================================
// ANSWER CHECKING
// ============================================================
function checkAnswer(userAnswer, correctAnswer) {
  const userStr = String(userAnswer).trim().toLowerCase().replace(/\s+/g, '');
  const correctStr = String(correctAnswer).toLowerCase().replace(/\s+/g, '');

  // Direct string match
  if (userStr === correctStr) return true;

  // Numeric comparison with epsilon
  const userNum = parseFloat(userStr);
  const correctNum = parseFloat(correctStr);
  if (!isNaN(userNum) && !isNaN(correctNum)) {
    return Math.abs(userNum - correctNum) < 0.01;
  }

  // Fraction handling — accept equivalent fractions
  if (correctStr.includes('/') && userStr.includes('/')) {
    const [cn, cd] = correctStr.split('/').map(Number);
    const [un, ud] = userStr.split('/').map(Number);
    if (cd && ud && cn * ud === un * cd) return true;
  }

  return false;
}

// ============================================================
// TOPIC GENERATORS
// ============================================================

// 1. Divide whole numbers by decimals (6 ÷ 0.3 = 20)
function gen_whole_by_decimal(difficulty) {
  let answer, divisor, dividend;
  if (difficulty === 'easy') {
    answer = randInt(2, 10);
    divisor = pick([0.5, 0.2, 0.5, 0.25]);
  } else if (difficulty === 'medium') {
    answer = randInt(5, 30);
    divisor = pick([0.2, 0.3, 0.4, 0.5, 0.6]);
  } else {
    answer = randInt(10, 50);
    divisor = pick([0.25, 0.15, 0.05, 0.125]);
  }
  dividend = round(answer * divisor, 2);
  // Ensure dividend is a whole number
  if (dividend !== Math.floor(dividend)) {
    answer = randInt(4, 20);
    divisor = pick([0.5, 0.25, 0.2]);
    dividend = round(answer * divisor, 2);
  }
  return {
    question: `What is ${dividend} ÷ ${divisor}?`,
    answer: answer,
    hint: `${dividend} ÷ ${divisor}`,
    topic: 'whole_by_decimal',
    difficulty
  };
}

// 2. Divide decimals by whole numbers (4.8 ÷ 2 = 2.4)
function gen_decimal_by_whole(difficulty) {
  let answer, divisor, dividend;
  if (difficulty === 'easy') {
    answer = pick([1.2, 1.5, 2.4, 2.5, 3.5, 1.4, 1.6, 0.5, 0.8]);
    divisor = randInt(2, 4);
  } else if (difficulty === 'medium') {
    answer = pick([1.25, 2.15, 3.25, 1.75, 2.75, 0.45, 0.35]);
    divisor = randInt(2, 6);
  } else {
    answer = pick([0.125, 1.125, 2.375, 0.625, 1.875]);
    divisor = randInt(3, 8);
  }
  dividend = round(answer * divisor, 3);
  return {
    question: `What is ${dividend} ÷ ${divisor}?`,
    answer: answer,
    hint: `${dividend} ÷ ${divisor}`,
    topic: 'decimal_by_whole',
    difficulty
  };
}

// 3. Divide decimals by decimals (3.6 ÷ 0.4 = 9)
function gen_decimal_by_decimal(difficulty) {
  let answer, divisor, dividend;
  if (difficulty === 'easy') {
    answer = randInt(2, 10);
    divisor = pick([0.2, 0.3, 0.4, 0.5, 0.6]);
    dividend = round(answer * divisor, 2);
  } else if (difficulty === 'medium') {
    answer = pick([2.5, 3.5, 1.5, 4.5, 5.5]);
    divisor = pick([0.2, 0.4, 0.5, 0.6]);
    dividend = round(answer * divisor, 2);
  } else {
    answer = pick([5, 8, 12, 15, 20, 25]);
    divisor = pick([0.25, 0.15, 0.125, 0.75]);
    dividend = round(answer * divisor, 3);
  }
  return {
    question: `What is ${dividend} ÷ ${divisor}?`,
    answer: answer,
    hint: `${dividend} ÷ ${divisor}`,
    topic: 'decimal_by_decimal',
    difficulty
  };
}

// 4. Convert fractions to decimals (3/4 = 0.75)
const FRAC_TABLE = {
  easy: [
    { frac: '1/2', dec: 0.5 }, { frac: '1/4', dec: 0.25 }, { frac: '3/4', dec: 0.75 },
    { frac: '1/10', dec: 0.1 }, { frac: '3/10', dec: 0.3 }, { frac: '7/10', dec: 0.7 }
  ],
  medium: [
    { frac: '1/5', dec: 0.2 }, { frac: '2/5', dec: 0.4 }, { frac: '3/5', dec: 0.6 },
    { frac: '4/5', dec: 0.8 }, { frac: '9/10', dec: 0.9 }, { frac: '1/20', dec: 0.05 }
  ],
  hard: [
    { frac: '1/8', dec: 0.125 }, { frac: '3/8', dec: 0.375 }, { frac: '5/8', dec: 0.625 },
    { frac: '7/8', dec: 0.875 }, { frac: '1/3', dec: 0.33 }, { frac: '2/3', dec: 0.67 }
  ]
};

function gen_frac_to_decimal(difficulty) {
  const entry = pick(FRAC_TABLE[difficulty] || FRAC_TABLE.easy);
  const isThird = entry.frac === '1/3' || entry.frac === '2/3';
  return {
    question: `What is ${entry.frac} as a decimal?${isThird ? ' (Round to the nearest hundredth)' : ''}`,
    answer: entry.dec,
    hint: `${entry.frac} = ?`,
    topic: 'frac_to_decimal',
    difficulty
  };
}

// 5. Convert decimals to fractions (0.25 = 1/4)
const DEC_TO_FRAC_TABLE = {
  easy: [
    { dec: 0.5, frac: '1/2' }, { dec: 0.25, frac: '1/4' }, { dec: 0.75, frac: '3/4' }
  ],
  medium: [
    { dec: 0.2, frac: '1/5' }, { dec: 0.4, frac: '2/5' }, { dec: 0.6, frac: '3/5' },
    { dec: 0.8, frac: '4/5' }, { dec: 0.1, frac: '1/10' }
  ],
  hard: [
    { dec: 0.125, frac: '1/8' }, { dec: 0.375, frac: '3/8' },
    { dec: 0.625, frac: '5/8' }, { dec: 0.875, frac: '7/8' }
  ]
};

function gen_decimal_to_frac(difficulty) {
  const entry = pick(DEC_TO_FRAC_TABLE[difficulty] || DEC_TO_FRAC_TABLE.easy);
  return {
    question: `What is ${entry.dec} as a fraction? (e.g., 1/2)`,
    answer: entry.frac,
    hint: `${entry.dec} = ?`,
    topic: 'decimal_to_frac',
    difficulty
  };
}

// 6. Place value — identify value of a digit
function gen_place_value(difficulty) {
  let number, digitPos, digitValue, posName;
  if (difficulty === 'easy') {
    const ones = randInt(1, 9);
    const tenths = randInt(1, 9);
    number = ones + '.' + tenths;
    posName = 'tenths';
    digitValue = tenths / 10;
  } else if (difficulty === 'medium') {
    const ones = randInt(1, 9);
    const tenths = randInt(0, 9);
    const hundredths = randInt(1, 9);
    number = ones + '.' + tenths + hundredths;
    if (Math.random() < 0.5) {
      posName = 'tenths';
      digitValue = tenths / 10;
      digitPos = tenths;
    } else {
      posName = 'hundredths';
      digitValue = hundredths / 100;
      digitPos = hundredths;
    }
  } else {
    const tens = randInt(1, 9);
    const ones = randInt(0, 9);
    const tenths = randInt(0, 9);
    const hundredths = randInt(0, 9);
    const thousandths = randInt(1, 9);
    number = '' + tens + ones + '.' + tenths + hundredths + thousandths;
    const choices = [
      { name: 'tenths', val: tenths / 10 },
      { name: 'hundredths', val: hundredths / 100 },
      { name: 'thousandths', val: thousandths / 1000 }
    ];
    const chosen = pick(choices);
    posName = chosen.name;
    digitValue = chosen.val;
  }
  return {
    question: `In the number ${number}, what is the value of the digit in the ${posName} place?`,
    answer: digitValue,
    hint: `${posName} place value`,
    topic: 'place_value',
    difficulty
  };
}

// 7. Decimal forms — expanded form
function gen_decimal_forms(difficulty) {
  let number, expanded;
  if (difficulty === 'easy') {
    const ones = randInt(1, 9);
    const tenths = randInt(1, 9);
    number = ones + '.' + tenths;
    expanded = `${ones} + ${round(tenths/10, 1)}`;
  } else if (difficulty === 'medium') {
    const ones = randInt(1, 9);
    const tenths = randInt(1, 9);
    const hundredths = randInt(1, 9);
    number = `${ones}.${tenths}${hundredths}`;
    expanded = `${ones} + ${round(tenths/10, 1)} + ${round(hundredths/100, 2)}`;
  } else {
    const tens = randInt(1, 5);
    const ones = randInt(0, 9);
    const tenths = randInt(1, 9);
    const hundredths = randInt(1, 9);
    number = `${tens}${ones}.${tenths}${hundredths}`;
    expanded = `${tens*10 + ones} + ${round(tenths/10, 1)} + ${round(hundredths/100, 2)}`;
  }

  // Generate wrong options
  const n = parseFloat(number);
  const wrongOptions = [
    expanded.replace(/ \+ /g, ' - '),
    `${Math.floor(n)} + ${round(n - Math.floor(n) + 0.1, 2)}`,
    `${Math.floor(n) + 1} + ${round(n - Math.floor(n) - 0.1, 2)}`
  ];

  // Shuffle options
  const allOptions = [expanded, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
  const correctIdx = allOptions.indexOf(expanded);
  const labels = ['A', 'B', 'C'];

  return {
    question: `Write ${number} in expanded form:\n${allOptions.map((o, i) => `${labels[i]}) ${o}`).join('\n')}`,
    answer: labels[correctIdx],
    hint: `Expanded form of ${number}`,
    topic: 'decimal_forms',
    difficulty
  };
}

// 8. Regrouping decimals
function gen_regroup_decimals(difficulty) {
  if (difficulty === 'easy') {
    // How many tenths in X.Y?
    const ones = randInt(1, 5);
    const tenths = randInt(1, 9);
    const number = ones + '.' + tenths;
    const answer = ones * 10 + tenths;
    return {
      question: `How many tenths are in ${number}?`,
      answer: answer,
      hint: `${number} = ? tenths`,
      topic: 'regroup_decimals',
      difficulty
    };
  } else if (difficulty === 'medium') {
    // How many hundredths in 0.X?
    const tenths = randInt(1, 9);
    const answer = tenths * 10;
    return {
      question: `How many hundredths equal ${round(tenths/10, 1)}?`,
      answer: answer,
      hint: `${round(tenths/10, 1)} = ? hundredths`,
      topic: 'regroup_decimals',
      difficulty
    };
  } else {
    // Regrouping: X.YZ = (X-1) + ? tenths + Z hundredths
    const ones = randInt(2, 9);
    const tenths = randInt(1, 5);
    const hundredths = randInt(1, 9);
    const number = `${ones}.${tenths}${hundredths}`;
    const answer = 10 + tenths; // tenths after regrouping one whole
    return {
      question: `${number} can be regrouped as ${ones - 1} ones + ? tenths + ${hundredths} hundredths. What number replaces the "?"`,
      answer: answer,
      hint: `Regroup 1 one as 10 tenths`,
      topic: 'regroup_decimals',
      difficulty
    };
  }
}

// 9. Estimate decimal multiplication
function gen_estimate_multiply(difficulty) {
  let a, b, roundedA, roundedB;
  if (difficulty === 'easy') {
    a = pick([2.1, 2.9, 3.1, 3.9, 4.1, 4.9]);
    b = randInt(2, 5);
    roundedA = Math.round(a);
    roundedB = b;
  } else if (difficulty === 'medium') {
    a = pick([3.2, 4.8, 5.1, 6.9, 7.2, 8.8]);
    b = pick([2.1, 2.9, 3.1, 3.9, 4.1]);
    roundedA = Math.round(a);
    roundedB = Math.round(b);
  } else {
    a = pick([11.3, 14.7, 19.8, 24.6, 31.2]);
    b = pick([2.1, 3.8, 4.2, 5.9]);
    roundedA = Math.round(a);
    roundedB = Math.round(b);
  }
  const answer = roundedA * roundedB;
  return {
    question: `Estimate ${a} × ${b} by rounding to the nearest whole number.`,
    answer: answer,
    hint: `${roundedA} × ${roundedB}`,
    topic: 'estimate_multiply',
    difficulty
  };
}

// 10. Estimate decimal division
function gen_estimate_divide(difficulty) {
  let a, b, roundedA, roundedB;
  if (difficulty === 'easy') {
    roundedA = pick([6, 8, 10, 12, 15, 20]);
    roundedB = pick([2, 3, 4, 5]);
    a = roundedA + pick([-0.2, 0.1, 0.3, -0.1, 0.2]);
    b = roundedB + pick([-0.1, 0.1, 0.2, -0.2]);
  } else if (difficulty === 'medium') {
    roundedA = pick([12, 15, 18, 20, 24, 30]);
    roundedB = pick([3, 4, 5, 6]);
    a = round(roundedA + (Math.random() * 0.8 - 0.4), 1);
    b = round(roundedB + (Math.random() * 0.8 - 0.4), 1);
  } else {
    roundedA = pick([24, 30, 36, 42, 48, 60]);
    roundedB = pick([4, 5, 6, 8, 10, 12]);
    a = round(roundedA + (Math.random() * 1.6 - 0.8), 1);
    b = round(roundedB + (Math.random() * 0.8 - 0.4), 1);
  }
  const answer = roundedA / roundedB;
  return {
    question: `Estimate ${a} ÷ ${b} by rounding to the nearest whole number.`,
    answer: answer,
    hint: `${roundedA} ÷ ${roundedB}`,
    topic: 'estimate_divide',
    difficulty
  };
}

// 11. Divide whole numbers to get a decimal quotient (5 ÷ 2 = 2.5)
function gen_whole_div_decimal_quot(difficulty) {
  let dividend, divisor, answer;
  if (difficulty === 'easy') {
    // 1-digit divisors with clean decimal answers
    answer = pick([0.5, 1.5, 2.5, 3.5, 4.5, 1.25, 2.25, 3.75]);
    divisor = pick([2, 4]);
    dividend = round(answer * divisor, 0);
  } else if (difficulty === 'medium') {
    answer = pick([2.5, 3.5, 6.5, 7.5, 1.5, 4.5, 5.5]);
    divisor = pick([2, 4, 5, 8]);
    dividend = round(answer * divisor, 0);
  } else {
    // 2-digit divisors
    answer = pick([2.5, 3.5, 6.5, 1.25, 2.75, 4.5]);
    divisor = pick([12, 14, 15, 16, 18, 20, 24, 25]);
    dividend = round(answer * divisor, 0);
  }
  return {
    question: `What is ${dividend} ÷ ${divisor}?`,
    answer: answer,
    hint: `${dividend} ÷ ${divisor}`,
    topic: 'whole_div_decimal_quot',
    difficulty
  };
}

// ============================================================
// DISPATCHER
// ============================================================
const GENERATORS = {
  whole_by_decimal: gen_whole_by_decimal,
  decimal_by_whole: gen_decimal_by_whole,
  decimal_by_decimal: gen_decimal_by_decimal,
  frac_to_decimal: gen_frac_to_decimal,
  decimal_to_frac: gen_decimal_to_frac,
  place_value: gen_place_value,
  decimal_forms: gen_decimal_forms,
  regroup_decimals: gen_regroup_decimals,
  estimate_multiply: gen_estimate_multiply,
  estimate_divide: gen_estimate_divide,
  whole_div_decimal_quot: gen_whole_div_decimal_quot
};

function generateProblem(topicId, difficulty) {
  const gen = GENERATORS[topicId];
  if (!gen) {
    // Fallback to a random topic
    const keys = Object.keys(GENERATORS);
    return GENERATORS[pick(keys)](difficulty || 'easy');
  }
  return gen(difficulty || 'easy');
}

// ============================================================
// TOPIC SELECTION (weighted by performance)
// ============================================================
function selectTopic(academics, enabledTopics) {
  const topics = enabledTopics || Object.keys(GENERATORS);
  const weights = [];

  topics.forEach(topicId => {
    const data = academics[topicId];
    let weight = 1;

    if (!data || data.attempts === 0) {
      weight = 2; // Never attempted — prioritize
    } else {
      const accuracy = (data.correct / data.attempts) * 100;
      if (accuracy < 60) weight = 3;       // Struggling — high priority
      else if (accuracy < 80) weight = 2;  // Needs work
    }

    weights.push({ topicId, weight });
  });

  // Weighted random selection
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const w of weights) {
    rand -= w.weight;
    if (rand <= 0) return w.topicId;
  }

  return weights[weights.length - 1].topicId;
}
