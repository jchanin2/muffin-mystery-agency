// ======================================================
// problems.js — Problem generators
// Each generator returns:
//   { question, answer, hint, options?, topic, difficulty, format }
// format: 'input' | 'mc'
// ======================================================

const _R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const _pick = arr => arr[Math.floor(Math.random() * arr.length)];
const _shuffle = arr => arr.slice().sort(() => Math.random() - 0.5);

// ------------------------------------------------------
// Answer checking
// ------------------------------------------------------
function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === null || userAnswer === undefined) return false;
  const u = String(userAnswer).trim().toLowerCase().replace(/\s+/g, '');
  const c = String(correctAnswer).toLowerCase().replace(/\s+/g, '');
  if (u === c) return true;
  // numeric tolerance
  const un = parseFloat(u);
  const cn = parseFloat(c);
  if (!isNaN(un) && !isNaN(cn) && Math.abs(un - cn) < 0.0001) return true;
  // fraction equivalence (a/b)
  if (u.includes('/') && c.includes('/')) {
    const [un2, ud2] = u.split('/').map(Number);
    const [cn2, cd2] = c.split('/').map(Number);
    if (ud2 && cd2 && un2 * cd2 === cn2 * ud2) return true;
  }
  return false;
}

// ------------------------------------------------------
// MC distractor helper
// ------------------------------------------------------
function _mcDistractors(answer, count, range) {
  const set = new Set([Number(answer)]);
  let tries = 0;
  while (set.size < count + 1 && tries < 30) {
    const d = Number(answer) + _R(-range, range);
    if (d !== Number(answer) && d > 0) set.add(d);
    tries++;
  }
  // fall back: just nudge
  while (set.size < count + 1) {
    set.add(Number(answer) + set.size);
  }
  const options = Array.from(set);
  return _shuffle(options).map(String);
}

// ======================================================
// UNIT 1: VOLUME
// ======================================================

function gen_volume_rect_prism(difficulty) {
  let l, w, h;
  if (difficulty === 'easy') { l = _R(2, 5); w = _R(2, 5); h = _R(2, 4); }
  else if (difficulty === 'medium') { l = _R(3, 8); w = _R(3, 7); h = _R(2, 6); }
  else { l = _R(4, 12); w = _R(3, 9); h = _R(3, 8); }
  const answer = l * w * h;
  return {
    question: 'A rectangular prism has length ' + l + ', width ' + w + ', and height ' + h + '. What is its volume in cubic units?',
    answer: String(answer),
    hint: 'Volume = length × width × height = ' + l + ' × ' + w + ' × ' + h,
    topic: 'volume_rect_prism',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_volume_unit_cubes(difficulty) {
  let l, w, h;
  if (difficulty === 'easy') { l = _R(2, 4); w = _R(2, 3); h = _R(2, 3); }
  else { l = _R(3, 6); w = _R(2, 4); h = _R(2, 4); }
  const answer = l * w * h;
  const wrongs = _mcDistractors(answer, 3, Math.max(4, Math.floor(answer * 0.3)));
  return {
    question: 'A prism is built from unit cubes: ' + l + ' cubes wide, ' + w + ' cubes deep, ' + h + ' cubes tall. How many unit cubes does it contain?',
    answer: String(answer),
    hint: 'Count: ' + l + ' × ' + w + ' × ' + h,
    options: wrongs,
    topic: 'volume_unit_cubes',
    difficulty: difficulty,
    format: 'mc'
  };
}

function gen_volume_decomposed(difficulty) {
  // Two prisms whose volumes sum to the answer
  let a, b;
  if (difficulty === 'easy') {
    a = { l: _R(2,4), w: _R(2,3), h: _R(2,3) };
    b = { l: _R(2,4), w: _R(2,3), h: _R(2,3) };
  } else if (difficulty === 'medium') {
    a = { l: _R(3,6), w: _R(3,5), h: _R(2,4) };
    b = { l: _R(3,5), w: _R(2,4), h: _R(2,4) };
  } else {
    a = { l: _R(4,8), w: _R(3,6), h: _R(3,5) };
    b = { l: _R(3,7), w: _R(3,5), h: _R(2,4) };
  }
  const va = a.l * a.w * a.h;
  const vb = b.l * b.w * b.h;
  const answer = va + vb;
  return {
    question: 'A figure is made of two rectangular prisms joined together. Prism A is ' + a.l + '×' + a.w + '×' + a.h + '. Prism B is ' + b.l + '×' + b.w + '×' + b.h + '. What is the total volume?',
    answer: String(answer),
    hint: 'Find each volume separately, then add: ' + va + ' + ' + vb,
    topic: 'volume_decomposed',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_volume_word(difficulty) {
  const scenes = [
    (l, w, h, v) => ({
      q: 'The Numerian water-tank is a rectangular prism ' + l + ' ft long, ' + w + ' ft wide, and ' + h + ' ft tall. How many cubic feet of water can it hold?',
      a: v, hint: 'V = ' + l + ' × ' + w + ' × ' + h
    }),
    (l, w, h, v) => ({
      q: 'A stone crate measures ' + l + ' × ' + w + ' × ' + h + ' units. What is its volume in cubic units?',
      a: v, hint: 'Volume = l · w · h'
    }),
    (l, w, h, v) => ({
      q: 'A treasure chest is ' + l + ' inches long, ' + w + ' inches deep, and ' + h + ' inches tall. How many cubic inches will it hold?',
      a: v, hint: 'V = ' + l + ' × ' + w + ' × ' + h
    }),
    (l, w, h, v) => ({
      q: 'Dorrick the smith\'s forge has an inner cavity ' + l + ' × ' + w + ' × ' + h + ' inches. What is its volume?',
      a: v, hint: 'Multiply: ' + l + ' × ' + w + ' × ' + h
    })
  ];
  let l, w, h;
  if (difficulty === 'easy') { l = _R(2,5); w = _R(2,5); h = _R(2,4); }
  else if (difficulty === 'medium') { l = _R(3,8); w = _R(3,7); h = _R(2,6); }
  else { l = _R(4,12); w = _R(4,10); h = _R(3,8); }
  const v = l * w * h;
  const s = _pick(scenes)(l, w, h, v);
  return {
    question: s.q,
    answer: String(v),
    hint: s.hint,
    topic: 'volume_word',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_volume_expression(difficulty) {
  let l, w, h;
  if (difficulty === 'easy') { l = _R(2,5); w = _R(2,5); h = _R(2,4); }
  else if (difficulty === 'medium') { l = _R(3,8); w = _R(3,7); h = _R(2,6); }
  else { l = _R(4,12); w = _R(4,9); h = _R(3,8); }
  // Two flavors at random
  const variants = [
    () => {
      const answer = l * w * h;
      const exp = l + ' × ' + w + ' × ' + h;
      return {
        question: 'Evaluate the volume expression: ' + exp + ' = ?',
        answer: String(answer),
        hint: 'Multiply left to right.',
        format: 'input'
      };
    },
    () => {
      // group (l × w) × h
      const area = l * w;
      const exp = '(' + l + ' × ' + w + ') × ' + h;
      const answer = area * h;
      return {
        question: 'Evaluate: ' + exp,
        answer: String(answer),
        hint: '(' + l + ' × ' + w + ') first, then × ' + h,
        format: 'input'
      };
    },
    () => {
      const answer = l * w * h;
      const options = _mcDistractors(answer, 3, Math.max(6, Math.floor(answer * 0.25)));
      return {
        question: 'Which expression gives the volume of a ' + l + ' × ' + w + ' × ' + h + ' prism?',
        answer: l + '×' + w + '×' + h,
        options: _shuffle([l + '×' + w + '×' + h, l + '+' + w + '+' + h, '2(' + l + '+' + w + '+' + h + ')', l + '×' + w]).map(String),
        hint: 'Volume = length × width × height',
        format: 'mc'
      };
    }
  ];
  const r = _pick(variants)();
  r.topic = 'volume_expression';
  r.difficulty = difficulty;
  return r;
}

function gen_volume_side_length(difficulty) {
  let l, w, h;
  if (difficulty === 'easy') { l = _R(2,5); w = _R(2,5); h = _R(2,4); }
  else { l = _R(3,8); w = _R(3,7); h = _R(2,6); }
  const v = l * w * h;
  // hide one dimension
  const hide = _pick(['l','w','h']);
  let q, a, hint;
  if (hide === 'l') {
    q = 'A rectangular prism has volume ' + v + ' cubic units. Its width is ' + w + ' and height is ' + h + '. What is the length?';
    a = l;
    hint = 'Length = V ÷ (width × height) = ' + v + ' ÷ ' + (w * h);
  } else if (hide === 'w') {
    q = 'A rectangular prism has volume ' + v + ' cubic units. Its length is ' + l + ' and height is ' + h + '. What is the width?';
    a = w;
    hint = 'Width = V ÷ (length × height) = ' + v + ' ÷ ' + (l * h);
  } else {
    q = 'A rectangular prism has volume ' + v + ' cubic units. Its length is ' + l + ' and width is ' + w + '. What is the height?';
    a = h;
    hint = 'Height = V ÷ (length × width) = ' + v + ' ÷ ' + (l * w);
  }
  return {
    question: q,
    answer: String(a),
    hint: hint,
    topic: 'volume_side_length',
    difficulty: difficulty,
    format: 'input'
  };
}

// ======================================================
// LIGHT REVIEW TOPICS (used in shop/training/side quests)
// ======================================================

function gen_multidigit_multiply(difficulty) {
  let a, b;
  if (difficulty === 'easy') { a = _R(11, 25); b = _R(3, 9); }
  else if (difficulty === 'medium') { a = _R(20, 99); b = _R(11, 25); }
  else { a = _R(100, 999); b = _R(11, 30); }
  return {
    question: 'What is ' + a + ' × ' + b + '?',
    answer: String(a * b),
    hint: 'Try partial products or the standard algorithm.',
    topic: 'multidigit_multiply',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_multidigit_divide(difficulty) {
  // build from quotient for clean answer
  let q, d;
  if (difficulty === 'easy') { q = _R(3, 12); d = _R(2, 9); }
  else if (difficulty === 'medium') { q = _R(10, 40); d = _R(11, 19); }
  else { q = _R(15, 60); d = _R(20, 35); }
  const div = q * d;
  return {
    question: 'What is ' + div + ' ÷ ' + d + '?',
    answer: String(q),
    hint: 'Use partial quotients: how many ' + d + 's are in ' + div + '?',
    topic: 'multidigit_divide',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_decimals_add(difficulty) {
  let a, b;
  if (difficulty === 'easy') { a = _R(10, 99) / 10; b = _R(10, 99) / 10; }
  else if (difficulty === 'medium') { a = _R(100, 999) / 100; b = _R(100, 999) / 100; }
  else { a = _R(100, 9999) / 1000; b = _R(100, 9999) / 1000; }
  const sum = Math.round((a + b) * 10000) / 10000;
  return {
    question: 'What is ' + a + ' + ' + b + '?',
    answer: String(sum),
    hint: 'Line up the decimal points.',
    topic: 'decimals_add',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_fractions_multiply(difficulty) {
  let n1, d1, n2, d2;
  if (difficulty === 'easy') {
    n1 = _R(1, 3); d1 = _R(2, 5);
    n2 = _R(1, 3); d2 = _R(2, 5);
  } else {
    n1 = _R(1, 5); d1 = _R(2, 8);
    n2 = _R(1, 5); d2 = _R(2, 8);
  }
  // multiply and simplify
  let n = n1 * n2, d = d1 * d2;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const g = gcd(n, d);
  n /= g; d /= g;
  const ansStr = d === 1 ? String(n) : (n + '/' + d);
  return {
    question: 'What is ' + n1 + '/' + d1 + ' × ' + n2 + '/' + d2 + '? (simplify)',
    answer: ansStr,
    hint: 'Multiply numerators together, multiply denominators together, then simplify.',
    topic: 'fractions_multiply',
    difficulty: difficulty,
    format: 'input'
  };
}

// ======================================================
// DISPATCH
// ======================================================
const GENERATORS = {
  volume_rect_prism: gen_volume_rect_prism,
  volume_unit_cubes: gen_volume_unit_cubes,
  volume_decomposed: gen_volume_decomposed,
  volume_word: gen_volume_word,
  volume_expression: gen_volume_expression,
  volume_side_length: gen_volume_side_length,
  multidigit_multiply: gen_multidigit_multiply,
  multidigit_divide: gen_multidigit_divide,
  decimals_add: gen_decimals_add,
  fractions_multiply: gen_fractions_multiply
};

function generateProblem(topic, difficulty) {
  const fn = GENERATORS[topic];
  if (!fn) {
    return {
      question: 'What is 7 × 8?',
      answer: '56',
      hint: '7 × 8',
      topic: topic || 'volume_rect_prism',
      difficulty: difficulty || 'easy',
      format: 'input'
    };
  }
  return fn(difficulty || 'easy');
}

if (typeof window !== 'undefined') {
  window.checkAnswer = checkAnswer;
  window.generateProblem = generateProblem;
  window.GENERATORS = GENERATORS;
}
