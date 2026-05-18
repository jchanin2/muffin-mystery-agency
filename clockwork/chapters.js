// chapters.js — The Clockmaker's Workshop
// Mr. Cogworth's apprentice. Four "jobs" over a week's work.
//
// Challenge types (see challenges.js):
//   ruleFromTable     — full table given, pick the rule (multiple choice)
//   patternTable      — student fills in blank cells of a rule-based table
//   sequence          — extend a numerical pattern
//   twoPatternCompare — two parallel patterns; pick relationship statement
//   plotShape         — plot N ordered pairs, identify the path (line / shape)
//   graphRule         — plot the 3-4 points of a rule on a Q1 grid
//   sortShapes        — click all shapes matching a property
//   dragClassify      — drag shapes to category bins
//   perimeterArea     — compute perimeter or area of a labeled rectangle
//   shapeTrueFalse    — true / false statement about shape hierarchy
//   gridClick / identifyPoint / distance — coord-grid basics
//   coordWord         — word problem ending in a single grid click
//   expression        — evaluate a parenthesised expression
//   expressionTranslate — pick the expression that matches a phrase

// ---------- Shape library (smaller than Atlas's, for Chapter 2) ----------
const SHAPES = {
  sq:   { svg: '<polygon points="30,30 70,30 70,70 30,70"/>',                   tags: ['quadrilateral','parallelogram','rectangle','rhombus','square'],   category: 'square'        },
  rect: { svg: '<polygon points="14,32 86,32 86,68 14,68"/>',                   tags: ['quadrilateral','parallelogram','rectangle'],                       category: 'rectangle'     },
  rhom: { svg: '<polygon points="50,12 88,50 50,88 12,50"/>',                   tags: ['quadrilateral','parallelogram','rhombus'],                         category: 'rhombus'       },
  par:  { svg: '<polygon points="22,30 88,30 78,70 12,70"/>',                   tags: ['quadrilateral','parallelogram'],                                   category: 'parallelogram' },
  trap: { svg: '<polygon points="22,78 78,78 64,22 36,22"/>',                   tags: ['quadrilateral','trapezoid'],                                       category: 'trapezoid'     },
  trap2:{ svg: '<polygon points="10,30 90,30 75,75 25,75"/>',                   tags: ['quadrilateral','trapezoid'],                                       category: 'trapezoid'     },
  kite: { svg: '<polygon points="50,10 80,40 50,90 20,40"/>',                   tags: ['quadrilateral','kite'],                                            category: 'kite'          },
  // Triangles by sides AND angles
  tEqA: { svg: '<polygon points="50,14 88,82 12,82"/>',                          tags: ['triangle','equilateral','acute'],   category: 'equilateral_acute' },
  tIsoA:{ svg: '<polygon points="50,14 76,82 24,82"/>',                          tags: ['triangle','isosceles','acute'],     category: 'isosceles_acute'   },
  tScA: { svg: '<polygon points="20,82 88,72 62,15"/>',                          tags: ['triangle','scalene','acute'],       category: 'scalene_acute'     },
  tIsoR:{ svg: '<polygon points="14,82 86,82 14,14"/>',                          tags: ['triangle','isosceles','right'],     category: 'isosceles_right'   },
  tScR: { svg: '<polygon points="14,82 86,82 14,30"/>',                          tags: ['triangle','scalene','right'],       category: 'scalene_right'     },
  tScO: { svg: '<polygon points="14,80 38,38 90,82"/>',                          tags: ['triangle','scalene','obtuse'],      category: 'scalene_obtuse'    }
};
const CATEGORY_LABELS = {
  square: 'Square', rectangle: 'Rectangle', rhombus: 'Rhombus', parallelogram: 'Parallelogram',
  trapezoid: 'Trapezoid', kite: 'Kite', quadrilateral: 'Other Quadrilateral',
  equilateral_acute: 'Equilateral · Acute',
  isosceles_acute: 'Isosceles · Acute',
  scalene_acute: 'Scalene · Acute',
  isosceles_right: 'Isosceles · Right',
  scalene_right: 'Scalene · Right',
  scalene_obtuse: 'Scalene · Obtuse'
};

function renderShape(name) {
  const s = SHAPES[name]; if (!s) return '';
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
         '<g fill="#b8902a" stroke="#1a1208" stroke-width="2.5" stroke-linejoin="round">' + s.svg + '</g></svg>';
}
function shapeHasTag(name, tag) { const s = SHAPES[name]; return !!(s && s.tags.indexOf(tag) >= 0); }
if (typeof window !== 'undefined') {
  window.SHAPES = SHAPES;
  window.CATEGORY_LABELS = CATEGORY_LABELS;
  window.renderShape = renderShape;
  window.shapeHasTag = shapeHasTag;
}

// ---------- Chapters ----------
const CHAPTERS = [
  // =========================================================
  // CHAPTER 1 — THE GEAR BOOK
  // =========================================================
  {
    id: 'gear_book',
    title: 'The Gear Book',
    description: 'Mr. Cogworth\'s big leather book of gear pairs. Every gear follows a rule.',
    emblem: '⚙️',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="c1bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2818"/><stop offset="1" stop-color="#1a1008"/></linearGradient></defs>' +
      '<rect width="460" height="200" fill="url(#c1bg)"/>' +
      // Wooden workbench surface
      '<rect x="0" y="120" width="460" height="80" fill="#5a3818"/>' +
      '<line x1="0" y1="120" x2="460" y2="120" stroke="#3a2010" stroke-width="2"/>' +
      // Open ledger book
      '<rect x="40" y="80" width="200" height="100" fill="#7a3818" stroke="#3a1810" stroke-width="2" rx="3"/>' +
      '<rect x="48" y="86" width="184" height="88" fill="#f0e8c4"/>' +
      '<line x1="140" y1="86" x2="140" y2="174" stroke="#aa8838" stroke-width="1"/>' +
      // Lines on the pages
      '<line x1="56" y1="100" x2="132" y2="100" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="56" y1="110" x2="132" y2="110" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="56" y1="120" x2="132" y2="120" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="56" y1="130" x2="132" y2="130" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="148" y1="100" x2="224" y2="100" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="148" y1="110" x2="224" y2="110" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="148" y1="120" x2="224" y2="120" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="148" y1="130" x2="224" y2="130" stroke="#3a2010" stroke-width="0.4" opacity="0.5"/>' +
      // Sketched gear on the ledger
      '<g transform="translate(94, 144)"><circle r="14" fill="none" stroke="#3a2010" stroke-width="1.5"/><circle r="4" fill="#3a2010"/>' +
      '<rect x="-2" y="-16" width="4" height="4" fill="#3a2010"/><rect x="-2" y="12" width="4" height="4" fill="#3a2010"/>' +
      '<rect x="12" y="-2" width="4" height="4" fill="#3a2010"/><rect x="-16" y="-2" width="4" height="4" fill="#3a2010"/>' +
      '<rect x="9" y="-11" width="3" height="3" fill="#3a2010" transform="rotate(45 10 -9)"/>' +
      '<rect x="9" y="9" width="3" height="3" fill="#3a2010" transform="rotate(-45 10 11)"/>' +
      '<rect x="-12" y="-11" width="3" height="3" fill="#3a2010" transform="rotate(-45 -10 -9)"/>' +
      '<rect x="-12" y="9" width="3" height="3" fill="#3a2010" transform="rotate(45 -10 11)"/></g>' +
      // Brass gears on the right side of bench
      '<g transform="translate(330, 100)"><circle r="34" fill="#b8902a" stroke="#3a2010" stroke-width="1.5"/><circle r="22" fill="#d4a624"/><circle r="6" fill="#3a2010"/>' +
      // Cog teeth
      '<rect x="-3" y="-38" width="6" height="8" fill="#b8902a" stroke="#3a2010" stroke-width="0.5"/>' +
      '<rect x="-3" y="30" width="6" height="8" fill="#b8902a" stroke="#3a2010" stroke-width="0.5"/>' +
      '<rect x="-38" y="-3" width="8" height="6" fill="#b8902a" stroke="#3a2010" stroke-width="0.5"/>' +
      '<rect x="30" y="-3" width="8" height="6" fill="#b8902a" stroke="#3a2010" stroke-width="0.5"/>' +
      '<rect x="22" y="-26" width="6" height="8" fill="#b8902a" stroke="#3a2010" stroke-width="0.5" transform="rotate(45)"/>' +
      '<rect x="-30" y="-26" width="6" height="8" fill="#b8902a" stroke="#3a2010" stroke-width="0.5" transform="rotate(-45)"/>' +
      '<rect x="22" y="18" width="6" height="8" fill="#b8902a" stroke="#3a2010" stroke-width="0.5" transform="rotate(-45)"/>' +
      '<rect x="-30" y="18" width="6" height="8" fill="#b8902a" stroke="#3a2010" stroke-width="0.5" transform="rotate(45)"/></g>' +
      '<g transform="translate(400, 138)"><circle r="22" fill="#b8902a" stroke="#3a2010" stroke-width="1.2"/><circle r="14" fill="#d4a624"/><circle r="4" fill="#3a2010"/>' +
      '<rect x="-2" y="-24" width="4" height="6" fill="#b8902a" stroke="#3a2010" stroke-width="0.4"/>' +
      '<rect x="-2" y="18" width="4" height="6" fill="#b8902a" stroke="#3a2010" stroke-width="0.4"/>' +
      '<rect x="-24" y="-2" width="6" height="4" fill="#b8902a" stroke="#3a2010" stroke-width="0.4"/>' +
      '<rect x="18" y="-2" width="6" height="4" fill="#b8902a" stroke="#3a2010" stroke-width="0.4"/>' +
      '<rect x="14" y="-16" width="4" height="6" fill="#b8902a" stroke="#3a2010" stroke-width="0.4" transform="rotate(45)"/>' +
      '<rect x="-18" y="-16" width="4" height="6" fill="#b8902a" stroke="#3a2010" stroke-width="0.4" transform="rotate(-45)"/></g>' +
      // Candle
      '<rect x="270" y="100" width="6" height="20" fill="#f0e8c4"/>' +
      '<rect x="268" y="120" width="10" height="3" fill="#3a2010"/>' +
      '<ellipse cx="273" cy="96" rx="3" ry="6" fill="#ffcc55"/>' +
      '<circle cx="273" cy="110" r="40" fill="#ffaa33" opacity="0.08"/>' +
      '</svg>',
    intro:
      '<p>The morning bell rings over the harbour. You climb the narrow stairs above the watchmaker\'s shop on the Strand and let yourself into the workshop of <em>Mr. Cogworth</em> — clockmaker to the town for forty-two years.</p>' +
      '<p>The old man is hunched over his great leather <em>gear book</em>. "Apprentice — there you are. Every gear in this town has been paired with another, and every pair follows a <em>rule</em>. Big gear in, small gear out. Slow turn in, fast turn out. You\'ll learn to read the rules today."</p>' +
      '<p>He turns a page. Tables, numbers, and the smell of pipe-smoke.</p>',
    outro:
      '<p>By tea-time the gear book is closed and Mr. Cogworth has poured you a cup of strong dark tea. "You can read a rule, apprentice. Tomorrow we look at the brass cabinet."</p>',
    challenges: [
      {
        type: 'ruleFromTable',
        story: 'Mr. Cogworth opens the gear book to the first table — a pair of gears in the mantelpiece clock.',
        prompt: 'What rule turns each input into its output?',
        table: { headers: ['Input', 'Output'], rows: [[1,3],[2,6],[3,9],[4,12]] },
        options: ['Output = Input + 3', 'Output = Input × 3', 'Output = Input × 2', 'Output = Input + 6'],
        answer: 'Output = Input × 3'
      },
      {
        type: 'patternTable',
        story: '"The rule for this pair," Mr. Cogworth says, "is <em>Output = Input + 5</em>. Fill in the missing outputs."',
        prompt: 'Use the rule Output = Input + 5 to fill in the table.',
        headers: ['Input', 'Output'],
        rows: [[2, '?'], [4, '?'], [6, '?'], [9, '?']],
        answers: [7, 9, 11, 14]
      },
      {
        type: 'sequence',
        story: 'A row of gears on the wall is sized: <em>4, 8, 12, 16, …</em> "Each gear is four teeth bigger than the last, apprentice."',
        prompt: 'What are the next THREE gear sizes?',
        sequence: [4, 8, 12, 16],
        next: [20, 24, 28]
      },
      {
        type: 'twoPatternCompare',
        story: 'Two gears spin together. Gear A turns 1 tooth at a time; Gear B turns 2 teeth at a time.',
        prompt: 'How are the two patterns related?',
        headers: ['Step', 'Gear A', 'Gear B'],
        rows: [[1, 1, 2], [2, 2, 4], [3, 3, 6], [4, 4, 8], [5, 5, 10]],
        options: ['Gear B is always 1 more than Gear A', 'Gear B is always twice Gear A', 'Gear B is always 5 more than Gear A', 'Gear A is always greater than Gear B'],
        answer: 'Gear B is always twice Gear A'
      },
      {
        type: 'graphRule',
        story: 'Mr. Cogworth hands you a fresh sheet of graph paper. "Plot four points that follow the rule <em>Output = Input × 2</em>: <em>(1, 2)</em>, <em>(2, 4)</em>, <em>(3, 6)</em>, <em>(4, 8)</em>."',
        prompt: 'Click each point in order. What shape do the points make?',
        points: [[1,2],[2,4],[3,6],[4,8]],
        gridSize: 10,
        options: ['A straight line', 'A square', 'A circle', 'A curve'],
        answer: 'A straight line',
        connect: 'line'
      },
      {
        type: 'ruleFromTable',
        story: 'Last page in the gear book: a tricky pair Mr. Cogworth designed for the church-bell ringer.',
        prompt: 'What is the rule?',
        table: { headers: ['Input', 'Output'], rows: [[1,3],[2,5],[3,7],[5,11]] },
        options: ['Output = Input × 3', 'Output = Input × 2 + 1', 'Output = Input + 2', 'Output = Input × 2 + 3'],
        answer: 'Output = Input × 2 + 1'
      }
    ]
  },

  // =========================================================
  // CHAPTER 2 — THE BRASS CABINET
  // =========================================================
  {
    id: 'brass_cabinet',
    title: 'The Brass Cabinet',
    description: 'A cabinet of drawer-fronts and brass triangles. Sort, classify, measure.',
    emblem: '🪟',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="460" height="200" fill="#2a1810"/>' +
      // Floor
      '<rect y="170" width="460" height="30" fill="#3a2010"/>' +
      // Cabinet structure
      '<rect x="60" y="20" width="340" height="160" fill="#5a3818" stroke="#1a1008" stroke-width="2" rx="3"/>' +
      '<rect x="68" y="28" width="324" height="144" fill="#7a4818"/>' +
      // Six drawers with different shape inlays
      // Drawer 1 (top-left): square inlay
      '<rect x="76" y="36" width="100" height="44" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<rect x="116" y="46" width="24" height="24" fill="#b8902a" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="170" cy="58" r="2" fill="#b8902a"/>' +
      // Drawer 2 (top-middle): rhombus inlay
      '<rect x="180" y="36" width="100" height="44" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<polygon points="230,42 248,58 230,74 212,58" fill="#b8902a" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="274" cy="58" r="2" fill="#b8902a"/>' +
      // Drawer 3 (top-right): trapezoid inlay
      '<rect x="284" y="36" width="100" height="44" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<polygon points="318,72 350,72 342,46 326,46" fill="#b8902a" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="378" cy="58" r="2" fill="#b8902a"/>' +
      // Drawer 4 (bottom-left): parallelogram inlay
      '<rect x="76" y="84" width="100" height="44" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<polygon points="108,72 156,72 148,98 100,98" fill="#b8902a" stroke="#3a2010" stroke-width="1" transform="translate(0,18)"/>' +
      '<circle cx="170" cy="106" r="2" fill="#b8902a"/>' +
      // Drawer 5 (bottom-middle): right triangle inlay
      '<rect x="180" y="84" width="100" height="44" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<polygon points="216,116 250,116 216,90" fill="#b8902a" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="274" cy="106" r="2" fill="#b8902a"/>' +
      // Drawer 6 (bottom-right): rectangle inlay
      '<rect x="284" y="84" width="100" height="44" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<rect x="316" y="94" width="36" height="22" fill="#b8902a" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="378" cy="106" r="2" fill="#b8902a"/>' +
      // Wide drawer at bottom
      '<rect x="76" y="132" width="308" height="36" fill="#3a2010" stroke="#1a1008" stroke-width="1"/>' +
      '<polygon points="160,160 200,140 240,160 200,164" fill="#b8902a" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="380" cy="150" r="2" fill="#b8902a"/>' +
      // Lamp glow on top
      '<ellipse cx="240" cy="22" rx="80" ry="6" fill="#ffaa33" opacity="0.1"/>' +
      '</svg>',
    intro:
      '<p>"My brass cabinet, apprentice," Mr. Cogworth says, opening the workshop\'s tall corner case. "Six drawers, six different inlays. Each one is a shape I cut myself, forty years ago, when my hands were steadier."</p>' +
      '<p>"Today we sort. Squares from rectangles, rhombuses from parallelograms, triangles by their sides AND their angles. And we measure a drawer-front or two. Geometry, apprentice. The bones of the workshop."</p>',
    outro:
      '<p>The cabinet is sorted, the drawer-fronts measured, the triangles named. Mr. Cogworth nods slowly. "Tomorrow — the floor plan."</p>',
    challenges: [
      {
        type: 'sortShapes',
        story: 'Eight brass cuttings lie scattered on the workbench. The old clockmaker wants the quadrilaterals first.',
        prompt: 'Click <em>all the QUADRILATERALS</em> (four-sided shapes).',
        shapes: ['sq','tEqA','rect','rhom','tIsoR','trap','tScA','par'],
        criterion: 'quadrilateral'
      },
      {
        type: 'shapeTrueFalse',
        story: '"A small test, apprentice," Mr. Cogworth says with a faint smile.',
        prompt: 'TRUE or FALSE: "Every square is also a rectangle."',
        statement: 'Every square is also a rectangle.',
        answer: true,
        explanation: 'A square has four right angles and opposite sides parallel — that makes it a rectangle. (A rectangle is a quadrilateral with four right angles.) So every square IS a rectangle.'
      },
      {
        type: 'shapeTrueFalse',
        story: 'Mr. Cogworth turns another drawer-front in his palm.',
        prompt: 'TRUE or FALSE: "Every rectangle is also a square."',
        statement: 'Every rectangle is also a square.',
        answer: false,
        explanation: 'A square requires ALL four sides equal. A rectangle only needs four right angles — its sides can be different lengths. So most rectangles are NOT squares.'
      },
      {
        type: 'dragClassify',
        story: '"Classify each triangle, apprentice — by its sides AND its angles." Mr. Cogworth hands you six brass triangles.',
        prompt: 'Place each triangle in its category (sides · angles).',
        shapes: ['tEqA','tIsoR','tScA','tIsoA','tScO','tScR'],
        bins: ['equilateral_acute','isosceles_acute','scalene_acute','isosceles_right','scalene_right','scalene_obtuse']
      },
      {
        type: 'perimeterArea',
        story: 'A drawer-front measures <em>8 inches by 5 inches</em>. The old clockmaker needs the perimeter for a brass trim he\'s cutting.',
        prompt: 'What is the <em>perimeter</em> of this 8 × 5 drawer-front, in inches?',
        width: 8, height: 5, mode: 'perimeter',
        answer: 26
      },
      {
        type: 'perimeterArea',
        story: 'For the velvet lining of the same drawer he needs the area.',
        prompt: 'What is the <em>area</em>, in square inches?',
        width: 8, height: 5, mode: 'area',
        answer: 40
      }
    ]
  },

  // =========================================================
  // CHAPTER 3 — THE WORKSHOP FLOOR PLAN
  // =========================================================
  {
    id: 'floor_plan',
    title: 'The Workshop Floor Plan',
    description: 'Map every tool station on the coordinate grid. Plot, identify, measure distance.',
    emblem: '📐',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="460" height="200" fill="#2a1810"/>' +
      // Wooden floor planks
      '<rect y="0" width="460" height="200" fill="#5a3818"/>' +
      '<line x1="0" y1="40" x2="460" y2="40" stroke="#3a2010" stroke-width="0.7"/>' +
      '<line x1="0" y1="80" x2="460" y2="80" stroke="#3a2010" stroke-width="0.7"/>' +
      '<line x1="0" y1="120" x2="460" y2="120" stroke="#3a2010" stroke-width="0.7"/>' +
      '<line x1="0" y1="160" x2="460" y2="160" stroke="#3a2010" stroke-width="0.7"/>' +
      // Walls
      '<rect x="0" y="0" width="20" height="200" fill="#3a2010"/>' +
      '<rect x="440" y="0" width="20" height="200" fill="#3a2010"/>' +
      '<rect x="0" y="0" width="460" height="20" fill="#3a2010"/>' +
      // Workbench (left side)
      '<rect x="40" y="40" width="120" height="60" fill="#7a5818" stroke="#3a2010" stroke-width="1.5"/>' +
      '<rect x="40" y="40" width="120" height="6" fill="#aa7838"/>' +
      '<rect x="44" y="100" width="8" height="40" fill="#3a2010"/>' +
      '<rect x="148" y="100" width="8" height="40" fill="#3a2010"/>' +
      // Tools on bench
      '<circle cx="70" cy="56" r="6" fill="#b8902a" stroke="#3a2010"/>' +
      '<rect x="92" y="48" width="20" height="14" fill="#aa8838" stroke="#3a2010"/>' +
      '<polygon points="130,58 144,52 144,62" fill="#3a2010"/>' +
      // Anvil (middle)
      '<polygon points="200,120 260,120 270,140 190,140" fill="#3a3838" stroke="#1a1008" stroke-width="1.5"/>' +
      '<rect x="218" y="100" width="24" height="20" fill="#5a5050" stroke="#1a1008"/>' +
      '<rect x="222" y="92" width="16" height="8" fill="#3a3838"/>' +
      // Lathe (right side)
      '<rect x="300" y="60" width="120" height="40" fill="#aa8838" stroke="#3a2010" stroke-width="1.5"/>' +
      '<circle cx="320" cy="80" r="14" fill="#d4a624" stroke="#3a2010"/>' +
      '<circle cx="400" cy="80" r="14" fill="#d4a624" stroke="#3a2010"/>' +
      '<line x1="334" y1="80" x2="386" y2="80" stroke="#3a2010" stroke-width="3"/>' +
      // Stool
      '<rect x="240" y="160" width="20" height="14" fill="#7a5818"/>' +
      '<line x1="244" y1="174" x2="240" y2="184" stroke="#3a2010" stroke-width="2"/>' +
      '<line x1="256" y1="174" x2="260" y2="184" stroke="#3a2010" stroke-width="2"/>' +
      // Hanging lantern (top-right)
      '<line x1="390" y1="20" x2="390" y2="36" stroke="#3a2010" stroke-width="1"/>' +
      '<rect x="380" y="36" width="20" height="22" fill="#7a5818" stroke="#3a2010"/>' +
      '<ellipse cx="390" cy="48" rx="6" ry="8" fill="#ffcc55"/>' +
      '<circle cx="390" cy="48" r="32" fill="#ffaa33" opacity="0.12"/>' +
      '</svg>',
    intro:
      '<p>"My workshop, apprentice. Forty-two years of tools, and not a single map of where any of them sits." Mr. Cogworth taps the floor with his cane. "Today we draw one. Every station, every distance, every step."</p>' +
      '<p>He unrolls a sheet of graph paper marked with a single-quadrant grid. "Plot every tool. We\'ll need it next winter when my eyes finally go."</p>',
    outro:
      '<p>The workshop floor plan is drawn. Mr. Cogworth folds the paper and tucks it into the gear book. "One more job, apprentice. The big one. The tower clock for the town hall."</p>',
    challenges: [
      {
        type: 'gridClick',
        story: '"The <em>workbench</em> is in the south-west corner — at <em>(2, 2)</em>. Plot it first."',
        prompt: 'Plot the <em>workbench</em> at <em>(2, 2)</em>.',
        target: { x: 2, y: 2 },
        landmark: 'Workbench',
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: '"The <em>anvil</em> stands in the middle of the floor — at <em>(5, 4)</em>. Plot it."',
        prompt: 'Plot the <em>anvil</em> at <em>(5, 4)</em>.',
        target: { x: 5, y: 4 },
        landmark: 'Anvil',
        gridSize: 10
      },
      {
        type: 'identifyPoint',
        story: 'Mr. Cogworth has already drawn one mark in red — the <em>lathe</em>, by the east wall.',
        prompt: 'What are the coordinates of the lathe?',
        marker: { x: 8, y: 7 },
        landmark: 'Lathe',
        gridSize: 10
      },
      {
        type: 'distance',
        story: '"How many paces, apprentice, from the workbench to the anvil? Plot both, then count along the grid." (Hint: workbench at (2,2), anvil at (5,4).)',
        prompt: 'Count the grid steps from workbench to anvil — first east, then north. Add them.',
        pointA: [2, 2],
        pointB: [5, 4],
        endpointA: 'Workbench',
        endpointB: 'Anvil',
        pathLabel: '5 steps',
        landmark: 'Anvil',
        answer: 5,
        gridSize: 10
      },
      {
        type: 'coordWord',
        story: '"You begin at the workbench. Walk three steps EAST, then five steps NORTH. Where do you end up?"',
        prompt: 'Starting at (2, 2), walk 3 east and 5 north. Click the spot.',
        start: [2, 2],
        target: { x: 5, y: 7 },
        landmark: 'Tool Closet',
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: '"Last station, apprentice — the apprentice\'s <em>stool</em>. Right where you sit. Plot it at <em>(6, 3)</em>."',
        prompt: 'Plot the <em>apprentice\'s stool</em> at <em>(6, 3)</em>.',
        target: { x: 6, y: 3 },
        landmark: 'Your Stool',
        gridSize: 10
      }
    ]
  },

  // =========================================================
  // CHAPTER 4 — THE TOWER CLOCK
  // =========================================================
  {
    id: 'tower_clock',
    title: 'The Tower Clock',
    description: 'Final job. Compute the cipher to set the new town-hall clock in motion.',
    emblem: '🕰️',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="c4sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4858"/><stop offset="1" stop-color="#7a6848"/></linearGradient></defs>' +
      '<rect width="460" height="200" fill="url(#c4sky)"/>' +
      // Moon
      '<circle cx="80" cy="40" r="18" fill="#f0e8c4" opacity="0.85"/>' +
      // Distant rooftops
      '<polygon points="0,160 30,140 60,150 100,128 140,150 180,138 220,148 260,124 300,148 340,132 380,150 420,140 460,150 460,200 0,200" fill="#1a1008"/>' +
      // Town hall (centered, tall stone building)
      '<rect x="180" y="50" width="100" height="120" fill="#7a6848" stroke="#3a2010" stroke-width="2"/>' +
      '<polygon points="180,50 230,18 280,50" fill="#5a3818"/>' +
      // Steeple
      '<polygon points="222,18 230,4 238,18" fill="#3a2010"/>' +
      // Big clock face
      '<circle cx="230" cy="92" r="32" fill="#f0e8c4" stroke="#3a2010" stroke-width="2.5"/>' +
      '<circle cx="230" cy="92" r="28" fill="none" stroke="#3a2010" stroke-width="0.6"/>' +
      // Roman numerals (just at 12, 3, 6, 9)
      '<text x="230" y="72" text-anchor="middle" fill="#3a2010" font-size="8" font-weight="bold">XII</text>' +
      '<text x="252" y="95" text-anchor="middle" fill="#3a2010" font-size="8" font-weight="bold">III</text>' +
      '<text x="230" y="116" text-anchor="middle" fill="#3a2010" font-size="8" font-weight="bold">VI</text>' +
      '<text x="208" y="95" text-anchor="middle" fill="#3a2010" font-size="8" font-weight="bold">IX</text>' +
      // Clock hands
      '<line x1="230" y1="92" x2="230" y2="72" stroke="#1a1008" stroke-width="2.5"/>' +
      '<line x1="230" y1="92" x2="246" y2="100" stroke="#1a1008" stroke-width="1.8"/>' +
      '<circle cx="230" cy="92" r="2.5" fill="#1a1008"/>' +
      // Windows
      '<rect x="194" y="132" width="14" height="20" fill="#ffaa55" opacity="0.8"/>' +
      '<rect x="252" y="132" width="14" height="20" fill="#ffaa55" opacity="0.8"/>' +
      // Door
      '<rect x="220" y="140" width="20" height="30" fill="#3a2010"/>' +
      // Gas-lamp street lights either side
      '<line x1="80" y1="180" x2="80" y2="150" stroke="#3a2010" stroke-width="2"/>' +
      '<rect x="74" y="142" width="12" height="12" fill="#5a4818"/>' +
      '<ellipse cx="80" cy="148" rx="3" ry="5" fill="#ffcc55"/>' +
      '<circle cx="80" cy="150" r="32" fill="#ffaa33" opacity="0.1"/>' +
      '<line x1="380" y1="180" x2="380" y2="150" stroke="#3a2010" stroke-width="2"/>' +
      '<rect x="374" y="142" width="12" height="12" fill="#5a4818"/>' +
      '<ellipse cx="380" cy="148" rx="3" ry="5" fill="#ffcc55"/>' +
      '<circle cx="380" cy="150" r="32" fill="#ffaa33" opacity="0.1"/>' +
      // Cobblestone street
      '<rect y="170" width="460" height="30" fill="#3a2818"/>' +
      '<line x1="80" y1="180" x2="180" y2="180" stroke="#1a1008" stroke-width="0.4"/>' +
      '<line x1="280" y1="180" x2="380" y2="180" stroke="#1a1008" stroke-width="0.4"/>' +
      '</svg>',
    intro:
      '<p>"The big job, apprentice. The tower clock for the town hall. It rings in three days and the whole town is waiting."</p>' +
      '<p>Mr. Cogworth opens a cipher-book — a thin booklet of <em>expressions</em> he uses to set up a new clock. Numbers, parentheses, and one very careful order of operations.</p>' +
      '<p>"Evaluate each. Translate the ones in plain English. Get every cipher right, and the great gear locks in and the clock begins to tick. Get one wrong and the whole movement jams. Take your time."</p>',
    outro:
      '<p>The cipher solves cleanly. The great brass mainspring catches; the gears settle; the pendulum swings; and high above the workshop, the tower clock strikes one — for the very first time. The whole town hears it.</p>',
    challenges: [
      {
        type: 'expression',
        story: 'The first dial: a simple cipher to test your hand.',
        prompt: 'Evaluate <em>(4 + 5) × 2</em>.',
        expression: '(4 + 5) × 2',
        answer: 18
      },
      {
        type: 'expression',
        story: 'The second dial. Mr. Cogworth notes: <em>"Parentheses first — always."</em>',
        prompt: 'Evaluate <em>20 − (3 × 4)</em>.',
        expression: '20 − (3 × 4)',
        answer: 8
      },
      {
        type: 'expressionTranslate',
        story: 'Cipher number three is written in plain English. "Translate it, apprentice — pick the right expression."',
        prompt: 'Which expression matches the phrase: <em>"Three more than the product of 4 and 5"</em>?',
        phrase: 'Three more than the product of 4 and 5',
        options: ['(4 × 5) + 3', '4 × (5 + 3)', '4 + 5 × 3', '3 + 4 × 5 ÷ 3'],
        answer: '(4 × 5) + 3'
      },
      {
        type: 'expressionTranslate',
        story: '"Another in plain English. Read it carefully."',
        prompt: 'Which expression matches: <em>"Twice the sum of 6 and 4"</em>?',
        phrase: 'Twice the sum of 6 and 4',
        options: ['2 × (6 + 4)', '(2 × 6) + 4', '6 + 4 + 2', '2 + 6 × 4'],
        answer: '2 × (6 + 4)'
      },
      {
        type: 'expression',
        story: 'A trickier dial — and the order of operations matters.',
        prompt: 'Evaluate <em>3 × (8 − 2) + 5</em>.',
        expression: '3 × (8 − 2) + 5',
        answer: 23
      },
      {
        type: 'expression',
        story: '"The final cipher, apprentice. Get this one and the clock comes to life." Mr. Cogworth holds out the gear-key.',
        prompt: 'Evaluate <em>2 × (10 − 3) + (4 × 2)</em>.',
        expression: '2 × (10 − 3) + (4 × 2)',
        answer: 22
      }
    ]
  }
];

if (typeof window !== 'undefined') window.CHAPTERS = CHAPTERS;
