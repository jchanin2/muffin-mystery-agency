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
// Answer checking — handles whole, decimal, fraction, mixed-number
// ------------------------------------------------------
function _parseFraction(str) {
  // Returns [num, den] or null. Handles: "3/4", "16 1/2", "-3/4", whole "12".
  const t = String(str).trim();
  const mm = t.match(/^(-?\d+)[\s_-]+(\d+)\s*\/\s*(\d+)$/);
  if (mm) {
    const w = parseInt(mm[1], 10), n = parseInt(mm[2], 10), d = parseInt(mm[3], 10);
    if (d === 0) return null;
    const sign = w < 0 ? -1 : 1;
    return [sign * (Math.abs(w) * d + n), d];
  }
  const fm = t.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fm) {
    const n = parseInt(fm[1], 10), d = parseInt(fm[2], 10);
    if (d === 0) return null;
    return [n, d];
  }
  const wm = t.match(/^(-?\d+)$/);
  if (wm) return [parseInt(wm[1], 10), 1];
  return null;
}
function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === null || userAnswer === undefined) return false;
  const uRaw = String(userAnswer).trim().toLowerCase();
  const cRaw = String(correctAnswer).trim().toLowerCase();
  if (uRaw === cRaw) return true;
  // Try fraction/mixed parse for both sides — cross compare
  const uf = _parseFraction(uRaw);
  const cf = _parseFraction(cRaw);
  if (uf && cf) {
    return uf[0] * cf[1] === cf[0] * uf[1];
  }
  // mixed types: decimal vs fraction
  const toNum = (s, parsed) => {
    if (parsed) return parsed[0] / parsed[1];
    const n = parseFloat(s.replace(/\s+/g, ''));
    return isNaN(n) ? null : n;
  };
  const un = toNum(uRaw, uf);
  const cn = toNum(cRaw, cf);
  if (un !== null && cn !== null && Math.abs(un - cn) < 0.0001) return true;
  // strip spaces for residual comparison
  const u = uRaw.replace(/\s+/g, '');
  const c = cRaw.replace(/\s+/g, '');
  if (u === c) return true;
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
// UNIT 2 & 3: FRACTIONS
// ======================================================

// helper: gcd & simplify
function _gcd(a, b) { a = Math.abs(a); b = Math.abs(b); return b ? _gcd(b, a % b) : a; }
function _simplify(n, d) {
  const g = _gcd(n, d) || 1;
  return [n / g, d / g];
}
function _fracStr(n, d) {
  if (d === 1) return String(n);
  const [sn, sd] = _simplify(n, d);
  if (sd === 1) return String(sn);
  // mixed-number form for improper
  if (sn > sd) {
    const whole = Math.floor(sn / sd);
    const rem = sn % sd;
    if (rem === 0) return String(whole);
    return whole + ' ' + rem + '/' + sd;
  }
  return sn + '/' + sd;
}

// Fractions as division: a/b = a ÷ b
function gen_fractions_as_division(difficulty) {
  // pick a clean a/b with whole-number quotient or simple decimal
  let a, b;
  if (difficulty === 'easy') {
    const choices = [[6,2],[8,4],[10,5],[12,3],[12,4],[15,3],[16,4],[20,5],[14,2],[18,6]];
    [a, b] = _pick(choices);
  } else {
    const choices = [[7,4],[9,4],[11,4],[3,4],[5,8],[7,8],[3,8],[5,2],[11,2],[13,4]];
    [a, b] = _pick(choices);
  }
  let ans;
  if (a % b === 0) ans = String(a / b);
  else {
    // express as mixed number if improper, else simple fraction
    if (a > b) {
      const w = Math.floor(a / b);
      const r = a % b;
      const [sn, sd] = _simplify(r, b);
      ans = w + ' ' + sn + '/' + sd;
    } else {
      const [sn, sd] = _simplify(a, b);
      ans = sn + '/' + sd;
    }
  }
  return {
    question: 'A fraction is the same as a division. What is ' + a + ' ÷ ' + b + ' written as a fraction (or mixed number)?',
    answer: ans,
    hint: a + '/' + b + ' — simplify or express as a mixed number.',
    topic: 'fractions_as_division',
    difficulty: difficulty,
    format: 'input'
  };
}

// Fraction × whole, simple case
function gen_fraction_times_whole(difficulty) {
  let n, d, w;
  if (difficulty === 'easy') {
    d = _pick([2,3,4,5]);
    n = _pick([1,2,3].filter(x => x < d));
    w = _pick([2,3,4,5,6,8,10].filter(x => x % d === 0));
    if (!w) w = d * 2;
  } else if (difficulty === 'medium') {
    d = _pick([3,4,5,6,8]);
    n = _pick([1,2,3,4,5].filter(x => x < d));
    w = _pick([6,8,9,10,12,15,16,18]);
  } else {
    d = _pick([4,6,8,10]);
    n = _pick([3,5,7,9].filter(x => x < d));
    w = _pick([12,15,18,20,24,30]);
  }
  const total = n * w;
  const ans = (total % d === 0) ? String(total / d) : _fracStr(total, d);
  return {
    question: 'What is ' + n + '/' + d + ' × ' + w + '?',
    answer: ans,
    hint: '(' + n + ' × ' + w + ') ÷ ' + d,
    topic: 'fraction_times_whole',
    difficulty: difficulty,
    format: 'input'
  };
}

// Fraction × fraction
function gen_fraction_times_fraction(difficulty) {
  let n1, d1, n2, d2;
  if (difficulty === 'easy') {
    n1 = _R(1, 2); d1 = _R(2, 4);
    n2 = _R(1, 2); d2 = _R(2, 4);
  } else if (difficulty === 'medium') {
    n1 = _R(1, 4); d1 = _R(2, 6);
    n2 = _R(1, 4); d2 = _R(2, 6);
  } else {
    n1 = _R(2, 6); d1 = _R(3, 9);
    n2 = _R(2, 6); d2 = _R(3, 9);
  }
  // ensure proper fractions
  if (n1 >= d1) n1 = d1 - 1;
  if (n2 >= d2) n2 = d2 - 1;
  if (n1 < 1) n1 = 1;
  if (n2 < 1) n2 = 1;
  const [sn, sd] = _simplify(n1 * n2, d1 * d2);
  const ans = sd === 1 ? String(sn) : (sn + '/' + sd);
  return {
    question: 'What is ' + n1 + '/' + d1 + ' × ' + n2 + '/' + d2 + '? (simplify)',
    answer: ans,
    hint: 'Multiply tops, multiply bottoms, then simplify.',
    topic: 'fraction_times_fraction',
    difficulty: difficulty,
    format: 'input'
  };
}

// Mixed number × whole
function gen_mixed_number_multiply(difficulty) {
  let w, n, d, m;
  if (difficulty === 'easy') {
    w = _R(2, 4); n = 1; d = 2; m = _R(2, 4);
  } else if (difficulty === 'medium') {
    w = _R(2, 5); d = _pick([2,3,4]);
    n = _pick([1,2,3].filter(x => x < d));
    m = _R(2, 6);
  } else {
    w = _R(2, 6); d = _pick([3,4,5,6]);
    n = _pick([1,2,3,4,5].filter(x => x < d));
    m = _R(3, 8);
  }
  // Simplify the fractional part for display ("6 2/4" → "6 1/2")
  const [sn, sd] = _simplify(n, d);
  n = sn; d = sd;
  // (w + n/d) × m  = wm + nm/d
  const numerator = (w * d + n) * m;
  const ans = (numerator % d === 0) ? String(numerator / d) : _fracStr(numerator, d);
  return {
    question: 'What is ' + w + ' ' + n + '/' + d + ' × ' + m + '?  (answer as mixed number or fraction)',
    answer: ans,
    hint: 'Convert ' + w + ' ' + n + '/' + d + ' to ' + (w * d + n) + '/' + d + ', then × ' + m + '.',
    topic: 'mixed_number_multiply',
    difficulty: difficulty,
    format: 'input'
  };
}

// Area with fractional side lengths
function gen_area_fractional_sides(difficulty) {
  let n1, d1, n2, d2;
  if (difficulty === 'easy') {
    n1 = 1; d1 = _pick([2,3,4]);
    n2 = 1; d2 = _pick([2,3,4]);
  } else if (difficulty === 'medium') {
    d1 = _pick([2,3,4,5]); n1 = _R(1, d1 - 1);
    d2 = _pick([2,3,4,5]); n2 = _R(1, d2 - 1);
  } else {
    d1 = _pick([3,4,5,6,8]); n1 = _R(1, d1 - 1);
    d2 = _pick([3,4,5,6,8]); n2 = _R(1, d2 - 1);
  }
  const [sn, sd] = _simplify(n1 * n2, d1 * d2);
  const ans = sd === 1 ? String(sn) : (sn + '/' + sd);
  return {
    question: 'A rectangle has width ' + n1 + '/' + d1 + ' and height ' + n2 + '/' + d2 + '. What is its area? (simplify)',
    answer: ans,
    hint: 'Area = width × height = ' + n1 + '/' + d1 + ' × ' + n2 + '/' + d2,
    topic: 'area_fractional_sides',
    difficulty: difficulty,
    format: 'input'
  };
}

// Unit fraction ÷ whole number
function gen_divide_unit_fraction_by_whole(difficulty) {
  let d, w;
  if (difficulty === 'easy') { d = _pick([2,3,4]); w = _R(2, 4); }
  else if (difficulty === 'medium') { d = _pick([2,3,4,5]); w = _R(2, 6); }
  else { d = _pick([3,4,5,6,8]); w = _R(3, 8); }
  // (1/d) ÷ w = 1 / (d*w)
  const newD = d * w;
  return {
    question: 'What is 1/' + d + ' ÷ ' + w + '?',
    answer: '1/' + newD,
    hint: 'Dividing by ' + w + ' is the same as multiplying by 1/' + w + ': 1/' + d + ' × 1/' + w,
    topic: 'divide_unit_fraction_by_whole',
    difficulty: difficulty,
    format: 'input'
  };
}

// Whole ÷ unit fraction
function gen_divide_whole_by_unit_fraction(difficulty) {
  let w, d;
  if (difficulty === 'easy') { w = _R(2, 6); d = _pick([2,3,4]); }
  else if (difficulty === 'medium') { w = _R(3, 10); d = _pick([2,3,4,5]); }
  else { w = _R(5, 15); d = _pick([3,4,5,6,8]); }
  // w ÷ (1/d) = w * d
  return {
    question: 'What is ' + w + ' ÷ 1/' + d + '?',
    answer: String(w * d),
    hint: 'Dividing by 1/' + d + ' = multiplying by ' + d + ': ' + w + ' × ' + d,
    topic: 'divide_whole_by_unit_fraction',
    difficulty: difficulty,
    format: 'input'
  };
}

// Compare products without multiplying (multiplication as scaling)
function gen_compare_products_scaling(difficulty) {
  let w, n, d;
  if (difficulty === 'easy') { w = _R(4, 20); d = _pick([2,3,4]); n = _pick([1,3,5].filter(x => x !== d && x < d + 2)); }
  else { w = _R(6, 30); d = _pick([3,4,5,6]); n = _pick([1,2,3,5,7].filter(x => x !== d)); }
  // compare (n/d) × w  to  w
  const compareTo = w;
  const product = (n / d) * w;
  let answer;
  if (n < d) answer = 'less';
  else if (n > d) answer = 'greater';
  else answer = 'equal';
  return {
    question: 'Without multiplying, which is bigger: ' + n + '/' + d + ' × ' + w + ' OR ' + w + ' ?  (answer: less, greater, or equal)',
    answer: answer,
    hint: 'If the fraction is less than 1, scaling makes it smaller. If greater than 1, larger. If = 1, same.',
    options: _shuffle(['less', 'greater', 'equal']),
    topic: 'compare_products_scaling',
    difficulty: difficulty,
    format: 'mc'
  };
}

// ======================================================
// UNIT 4: MULTI-DIGIT MULTIPLICATION & DIVISION
// ======================================================

// Round a number to its greatest place value (38 -> 40, 412 -> 400)
function _roundLead(n) {
  if (n < 10) return n;
  const mag = Math.pow(10, String(Math.floor(n)).length - 1);
  return Math.round(n / mag) * mag;
}

function gen_estimate_product(difficulty) {
  let a, b;
  if (difficulty === 'easy') { a = _R(21, 89); b = _R(3, 9); }
  else if (difficulty === 'medium') { a = _R(21, 89); b = _R(11, 49); }
  else { a = _R(120, 890); b = _R(11, 39); }
  const est = _roundLead(a) * _roundLead(b);
  const options = _shuffle([
    String(est),
    String(est + _roundLead(b) * (_roundLead(a) >= 100 ? 100 : 10)),
    String(Math.max(1, est - _roundLead(a) * (_roundLead(b) >= 10 ? 10 : 1))),
    String(_roundLead(a) * b)
  ].filter((v, i, arr) => arr.indexOf(v) === i));
  // ensure the correct one is present
  if (options.indexOf(String(est)) < 0) options[0] = String(est);
  return {
    question: 'Estimate ' + a + ' × ' + b + ' by rounding each number to its greatest place value.',
    answer: String(est),
    hint: 'Round to ' + _roundLead(a) + ' × ' + _roundLead(b) + '.',
    options: options,
    topic: 'estimate_product',
    difficulty: difficulty,
    format: 'mc'
  };
}

function gen_estimate_quotient(difficulty) {
  // compatible numbers: pick divisor d and a round-ish quotient q, dividend close to d*q
  let d, q;
  if (difficulty === 'easy') { d = _R(2, 9); q = _pick([20, 30, 40, 50, 60, 70, 80, 90]); }
  else if (difficulty === 'medium') { d = _R(3, 9); q = _pick([30, 40, 50, 60, 70, 80, 90, 100, 200]); }
  else { d = _R(11, 29); q = _pick([20, 30, 40, 50, 60, 70, 80, 90]); }
  const compatible = d * q;
  const dividend = compatible + _pick([-1, 1, 2, -2, 3, -3, 4, 5]);
  const options = _shuffle([String(q), String(q + 10), String(Math.max(1, q - 10)), String(q * (d <= 9 ? 2 : 1) + 5)]
    .filter((v, i, arr) => arr.indexOf(v) === i));
  if (options.indexOf(String(q)) < 0) options[0] = String(q);
  return {
    question: 'Estimate ' + dividend + ' ÷ ' + d + ' using compatible numbers (a nearby number that divides evenly).',
    answer: String(q),
    hint: 'Think: ' + compatible + ' ÷ ' + d + ' = ' + q + '. ' + dividend + ' is close to ' + compatible + '.',
    options: options,
    topic: 'estimate_quotient',
    difficulty: difficulty,
    format: 'mc'
  };
}

function gen_partial_products(difficulty) {
  let tens, ones, b;
  if (difficulty === 'easy') { tens = _R(1, 4) * 10; ones = _R(1, 9); b = _R(3, 9); }
  else { tens = _R(2, 8) * 10; ones = _R(1, 9); b = _R(4, 9); }
  const a = tens + ones;
  // ask for one of the partial products
  const askTens = Math.random() < 0.5;
  if (askTens) {
    return {
      question: 'To find ' + a + ' × ' + b + ', break it apart: (' + tens + ' × ' + b + ') + (' + ones + ' × ' + b + '). What is ' + tens + ' × ' + b + '?',
      answer: String(tens * b),
      hint: tens + ' × ' + b,
      topic: 'partial_products',
      difficulty: difficulty,
      format: 'input'
    };
  }
  return {
    question: 'Using partial products, ' + a + ' × ' + b + ' = (' + tens + ' × ' + b + ') + (' + ones + ' × ' + b + '). What is the FULL product?',
    answer: String(a * b),
    hint: 'Add the two partial products: ' + (tens * b) + ' + ' + (ones * b) + '.',
    topic: 'partial_products',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_multidigit_multiply_word(difficulty) {
  let a, b;
  if (difficulty === 'easy') { a = _R(12, 30); b = _R(3, 9); }
  else if (difficulty === 'medium') { a = _R(15, 60); b = _R(11, 25); }
  else { a = _R(110, 480); b = _R(12, 30); }
  const scenes = [
    () => ({ q: 'Each forge-crate holds ' + a + ' iron ingots. A wagon carries ' + b + ' crates. How many ingots in all?', }),
    () => ({ q: 'A foundry worker rivets ' + a + ' bolts an hour. How many bolts after ' + b + ' hours?', }),
    () => ({ q: 'Each war-banner needs ' + a + ' threads of gold. The quartermaster orders ' + b + ' banners. How many threads of gold?', }),
    () => ({ q: 'A coal-cart holds ' + a + ' lumps. The furnace devours ' + b + ' carts a day. How many lumps a day?', })
  ];
  return {
    question: _pick(scenes)().q,
    answer: String(a * b),
    hint: a + ' × ' + b,
    topic: 'multidigit_multiply_word',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_multidigit_divide_word(difficulty) {
  let q, d;
  if (difficulty === 'easy') { q = _R(4, 12); d = _R(3, 8); }
  else if (difficulty === 'medium') { q = _R(8, 30); d = _R(6, 15); }
  else { q = _R(12, 40); d = _R(14, 28); }
  const remainder = Math.random() < 0.4;
  if (remainder) {
    const r = _R(1, d - 1);
    const total = q * d + r;
    return {
      question: total + ' bolts are packed ' + d + ' to a box. How many bolts are LEFT OVER after filling every full box?',
      answer: String(r),
      hint: total + ' ÷ ' + d + ' has a remainder. ' + d + ' × ' + q + ' = ' + (q * d) + ', so ' + total + ' − ' + (q * d) + ' = ?',
      topic: 'multidigit_divide_word',
      difficulty: difficulty,
      format: 'input'
    };
  }
  const total = q * d;
  const scenes = [
    () => ({ q: total + ' ingots are shared equally among ' + d + ' forges. How many ingots per forge?' }),
    () => ({ q: total + ' rivets are packed ' + d + ' to a pouch. How many full pouches?' }),
    () => ({ q: 'The march covers ' + total + ' miles in ' + d + ' equal days. How many miles per day?' })
  ];
  return {
    question: _pick(scenes)().q,
    answer: String(q),
    hint: total + ' ÷ ' + d,
    topic: 'multidigit_divide_word',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_unknown_factor(difficulty) {
  let a, q;
  if (difficulty === 'easy') { a = _R(3, 9); q = _R(11, 30); }
  else if (difficulty === 'medium') { a = _R(6, 15); q = _R(12, 40); }
  else { a = _R(12, 25); q = _R(15, 60); }
  const product = a * q;
  // randomly hide which factor
  if (Math.random() < 0.5) {
    return {
      question: a + ' × ? = ' + product + '. What is the missing factor?',
      answer: String(q),
      hint: 'Divide: ' + product + ' ÷ ' + a,
      topic: 'unknown_factor',
      difficulty: difficulty,
      format: 'input'
    };
  }
  return {
    question: '? × ' + a + ' = ' + product + '. What is the missing factor?',
    answer: String(q),
    hint: 'Divide: ' + product + ' ÷ ' + a,
    topic: 'unknown_factor',
    difficulty: difficulty,
    format: 'input'
  };
}

// ======================================================
// UNIT 5: DECIMAL OPERATIONS
// ======================================================
function _roundp(n, p) { const m = Math.pow(10, p); return Math.round(n * m) / m; }

function gen_decimals_subtract(difficulty) {
  let places, a, b;
  if (difficulty === 'easy') { places = 1; a = _R(20, 99) / 10; b = _R(5, 19) / 10; }
  else if (difficulty === 'medium') { places = 2; a = _R(200, 999) / 100; b = _R(50, 199) / 100; }
  else { places = 2; a = _R(500, 1999) / 100; b = _R(100, 499) / 100; }
  if (b > a) { const t = a; a = b; b = t; }
  a = _roundp(a, places); b = _roundp(b, places);
  const ans = _roundp(a - b, places);
  return {
    question: 'What is ' + a + ' − ' + b + '?',
    answer: String(ans),
    hint: 'Line up the decimal points, then subtract.',
    topic: 'decimals_subtract',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_decimals_multiply_whole(difficulty) {
  let dec, w, places;
  if (difficulty === 'easy') { places = 1; dec = _R(2, 9) / 10; w = _R(2, 9); }
  else if (difficulty === 'medium') { places = 1; dec = _R(11, 49) / 10; w = _R(3, 12); }
  else { places = 2; dec = _R(15, 95) / 100; w = _R(4, 20); }
  dec = _roundp(dec, places);
  const ans = _roundp(dec * w, places);
  return {
    question: 'What is ' + dec + ' × ' + w + '?',
    answer: String(ans),
    hint: 'Multiply as whole numbers (' + Math.round(dec * Math.pow(10, places)) + ' × ' + w + '), then place the decimal point ' + places + ' spot' + (places > 1 ? 's' : '') + ' in.',
    topic: 'decimals_multiply_whole',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_decimals_multiply(difficulty) {
  let a, b;
  if (difficulty === 'easy') { a = _R(2, 9) / 10; b = _R(2, 9) / 10; }       // tenths × tenths
  else if (difficulty === 'medium') { a = _R(11, 19) / 10; b = _R(2, 9) / 10; }
  else { a = _R(11, 49) / 10; b = _R(11, 29) / 10; }
  a = _roundp(a, 1); b = _roundp(b, 1);
  const ans = _roundp(a * b, 2);
  return {
    question: 'What is ' + a + ' × ' + b + '?',
    answer: String(ans),
    hint: 'Multiply ' + Math.round(a * 10) + ' × ' + Math.round(b * 10) + ', then place TWO decimal digits.',
    topic: 'decimals_multiply',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_decimals_divide_whole(difficulty) {
  // (decimal quotient) × whole = decimal dividend
  let q, w, places;
  if (difficulty === 'easy') { places = 1; q = _R(2, 9) / 10; w = _R(2, 9); }
  else if (difficulty === 'medium') { places = 1; q = _R(11, 39) / 10; w = _R(3, 9); }
  else { places = 2; q = _R(15, 85) / 100; w = _R(4, 12); }
  q = _roundp(q, places);
  const dividend = _roundp(q * w, places + 1);
  return {
    question: 'What is ' + dividend + ' ÷ ' + w + '?',
    answer: String(q),
    hint: 'Divide as usual; the decimal point in the answer lines up above the one in ' + dividend + '.',
    topic: 'decimals_divide_whole',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_divide_by_decimal(difficulty) {
  let answer, divisor;
  if (difficulty === 'easy') { answer = _R(2, 12); divisor = _pick([0.5, 0.2, 0.25]); }
  else if (difficulty === 'medium') { answer = _R(5, 30); divisor = _pick([0.2, 0.4, 0.5, 0.25]); }
  else { answer = _R(8, 40); divisor = _pick([0.25, 0.05, 0.125, 0.4]); }
  let dividend = _roundp(answer * divisor, 3);
  // ensure dividend is a whole number for a clean "whole ÷ decimal"
  if (dividend !== Math.floor(dividend)) {
    answer = _R(4, 20); divisor = _pick([0.5, 0.25, 0.2]);
    dividend = _roundp(answer * divisor, 3);
  }
  return {
    question: 'What is ' + dividend + ' ÷ ' + divisor + '?',
    answer: String(answer),
    hint: 'How many ' + divisor + 's fit into ' + dividend + '? (Tip: multiply both by ' + (divisor.toString().split('.')[1].length === 1 ? 10 : 100) + '.)',
    topic: 'divide_by_decimal',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_round_decimal(difficulty) {
  let n, place, placeName, ans;
  if (difficulty === 'easy') { n = _R(100, 999) / 100; place = 1; placeName = 'tenth'; }
  else if (difficulty === 'medium') { n = _R(1000, 9999) / 1000; place = 2; placeName = 'hundredth'; }
  else { n = _R(1000, 9999) / 1000; place = (Math.random() < 0.5 ? 0 : 1); placeName = place === 0 ? 'whole number' : 'tenth'; }
  ans = _roundp(n, place);
  const ansStr = place === 0 ? String(Math.round(n)) : String(ans);
  return {
    question: 'Round ' + n + ' to the nearest ' + placeName + '.',
    answer: ansStr,
    hint: 'Look at the digit just to the right of the ' + placeName + ' place. 5 or more rounds up.',
    topic: 'round_decimal',
    difficulty: difficulty,
    format: 'input'
  };
}

function gen_compare_decimals(difficulty) {
  let a, b, places;
  if (difficulty === 'easy') { places = 1; a = _R(1, 9) / 10; b = _R(1, 9) / 10; }
  else if (difficulty === 'medium') { places = 2; a = _R(10, 99) / 100; b = _R(10, 99) / 100; }
  else { places = 3; a = _R(100, 999) / 1000; b = _R(100, 999) / 1000; }
  // occasionally make them tricky (e.g., 0.7 vs 0.65)
  if (Math.random() < 0.5) { a = _roundp(_R(1, 9) / 10, 1); b = _roundp(_R(10, 99) / 100, 2); }
  a = _roundp(a, 3); b = _roundp(b, 3);
  if (a === b) b = _roundp(b + 0.1, 3);
  const greater = a > b ? a : b;
  return {
    question: 'Which is greater: ' + a + ' or ' + b + '?',
    answer: String(greater),
    hint: 'Compare place by place: tenths first, then hundredths, then thousandths.',
    options: _shuffle([String(a), String(b)]),
    topic: 'compare_decimals',
    difficulty: difficulty,
    format: 'mc'
  };
}

function gen_decimal_place_value(difficulty) {
  // build a decimal and ask the VALUE of a chosen digit
  let digits, places;
  if (difficulty === 'easy') { places = 2; }
  else if (difficulty === 'medium') { places = 3; }
  else { places = 3; }
  const whole = _R(1, 9);
  const frac = [];
  for (let i = 0; i < places; i++) frac.push(_R(1, 9));
  const numStr = whole + '.' + frac.join('');
  // pick a fractional position to ask about
  const pos = _R(1, places); // 1=tenths,2=hundredths,3=thousandths
  const digit = frac[pos - 1];
  const placeNames = { 1: 'tenths', 2: 'hundredths', 3: 'thousandths' };
  const value = _roundp(digit / Math.pow(10, pos), pos);
  const options = _shuffle([
    String(value),
    String(digit),
    String(_roundp(digit / Math.pow(10, pos - 1), pos)),
    String(_roundp(digit / Math.pow(10, pos + 1), pos + 1))
  ].filter((v, i, arr) => arr.indexOf(v) === i));
  if (options.indexOf(String(value)) < 0) options[0] = String(value);
  return {
    question: 'In ' + numStr + ', what is the VALUE of the digit in the ' + placeNames[pos] + ' place?',
    answer: String(value),
    hint: 'The ' + placeNames[pos] + ' digit is ' + digit + '. Its value is ' + digit + ' × ' + (1 / Math.pow(10, pos)) + '.',
    options: options,
    topic: 'decimal_place_value',
    difficulty: difficulty,
    format: 'mc'
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
  fractions_multiply: gen_fractions_multiply,
  // Act II
  fractions_as_division: gen_fractions_as_division,
  fraction_times_whole: gen_fraction_times_whole,
  fraction_times_fraction: gen_fraction_times_fraction,
  mixed_number_multiply: gen_mixed_number_multiply,
  area_fractional_sides: gen_area_fractional_sides,
  divide_unit_fraction_by_whole: gen_divide_unit_fraction_by_whole,
  divide_whole_by_unit_fraction: gen_divide_whole_by_unit_fraction,
  compare_products_scaling: gen_compare_products_scaling,
  // Act III (Unit 4)
  estimate_product: gen_estimate_product,
  estimate_quotient: gen_estimate_quotient,
  partial_products: gen_partial_products,
  multidigit_multiply_word: gen_multidigit_multiply_word,
  multidigit_divide_word: gen_multidigit_divide_word,
  unknown_factor: gen_unknown_factor,
  // Act IV (Unit 5)
  decimals_subtract: gen_decimals_subtract,
  decimals_multiply_whole: gen_decimals_multiply_whole,
  decimals_multiply: gen_decimals_multiply,
  decimals_divide_whole: gen_decimals_divide_whole,
  divide_by_decimal: gen_divide_by_decimal,
  round_decimal: gen_round_decimal,
  compare_decimals: gen_compare_decimals,
  decimal_place_value: gen_decimal_place_value
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
