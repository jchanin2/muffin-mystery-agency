// chapters.js — Story content for Captain Cartwright's Atlas. Four
// chapters of 6 challenges each. Each challenge is a self-contained
// object that the Challenges runtime knows how to render.
//
// Challenge types:
//   gridClick     — click a point on a grid to plot it
//   identifyPoint — look at a marked point and type its coordinates
//   plotShape     — plot multiple points then identify the shape
//   sortShapes    — click all shapes with a given property
//   dragClassify  — drag/select shapes into category bins
//   patternTable  — fill in missing cells of a rules-based table
//   expression    — evaluate a parenthesised expression
//   distance      — type the distance between two grid points
//   perimeterArea — compute perimeter or area of a rectangle
//   sequence      — extend a numerical pattern (next N terms)

const CHAPTERS = [
  // =========================================================
  // CHAPTER 1 — THE GARDEN ESTATE
  // =========================================================
  {
    id: 'garden_estate',
    title: 'The Garden Estate',
    description: 'Open the captain\'s atlas. Plot the points. Walk his garden.',
    treasure: '🗝️',
    intro:
      '<p>You unlock the captain\'s old sea-chest in the back of the agency. Inside, wrapped in oilcloth, lies a leather-bound atlas. Its first page is marked: <em>"For the cartographer who can read me — my fortune lies hidden across these maps."</em></p>' +
      '<p>The first map shows the captain\'s own garden estate, drawn on a tidy <em>coordinate grid</em>. To follow him you\'ll need to plot points, identify locations, and trace the simple patterns he planted in his rose-beds.</p>' +
      '<p>Let\'s open the atlas.</p>',
    outro:
      '<p>You\'ve walked every path in the garden. The captain left you a small brass key tucked beneath a stone marker — the kind of key that opens a sea-trunk.</p>' +
      '<p>The next page of the atlas turns of its own accord. <em>Trapezoid Island</em>.</p>',
    challenges: [
      {
        type: 'gridClick',
        story: 'The atlas opens to a sketch of the captain\'s garden. He has marked his <em>tea pavilion</em> with a tidy red dot.',
        prompt: 'Plot the tea pavilion at <em>(3, 4)</em>.',
        target: { x: 3, y: 4 },
        gridSize: 10
      },
      {
        type: 'identifyPoint',
        story: 'A second mark in the captain\'s ink — the well from which he drew his morning water.',
        prompt: 'What are the coordinates of the well?',
        marker: { x: 7, y: 2 },
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: 'The captain\'s rose-bed lies in a sunlit corner. The atlas notes: <em>"Roses, planted at the third column, ninth row."</em>',
        prompt: 'Plot the rose-bed at <em>(3, 9)</em>.',
        target: { x: 3, y: 9 },
        gridSize: 10
      },
      {
        type: 'plotShape',
        story: 'The captain marks the four corners of his herb-garden. Plot them in order: <em>(1,1) → (5,1) → (5,3) → (1,3)</em>.',
        prompt: 'Click the four corners in order. What shape does he draw?',
        points: [[1,1],[5,1],[5,3],[1,3]],
        gridSize: 10,
        options: ['Square', 'Rectangle', 'Trapezoid', 'Triangle'],
        answer: 'Rectangle'
      },
      {
        type: 'sequence',
        story: 'The captain planted apple trees in a careful pattern: 2 trees in row one, 4 in row two, 6 in row three. He writes: <em>"Each row, two more than the last."</em>',
        prompt: 'What are the next THREE numbers in his pattern?',
        sequence: [2, 4, 6],
        next: [8, 10, 12]
      },
      {
        type: 'distance',
        story: 'The captain hides a brass key. The atlas says: <em>"The key lies on a straight line between the well at (7, 2) and a stone marker at (7, 8)."</em> Walk straight up from one to the other.',
        prompt: 'How far apart are the well and the stone marker?',
        pointA: [7, 2],
        pointB: [7, 8],
        answer: 6,
        gridSize: 10
      }
    ]
  },

  // =========================================================
  // CHAPTER 2 — TRAPEZOID ISLAND
  // =========================================================
  {
    id: 'trapezoid_island',
    title: 'Trapezoid Island',
    description: 'Survey the island. Sort his sketches. Measure the plots.',
    treasure: '⚓',
    intro:
      '<p>The next pages of the atlas show a tropical island the captain charted himself. He named it <em>Trapezoid Island</em> for the strange four-sided plots of land that cover its interior.</p>' +
      '<p>The captain was a meticulous surveyor. To find his next clue you must sort his sketched shapes, classify the triangles in his survey notes, and measure the rectangular plots he laid out for his expedition camp.</p>',
    outro:
      '<p>You\'ve catalogued every plot on the island. Beneath the largest rectangle — the captain\'s base camp — you uncover a small bronze anchor. It is engraved with the words <em>"To the Riverlands."</em></p>',
    challenges: [
      {
        type: 'sortShapes',
        story: 'The captain has sketched eight shapes in his survey book. Some are quadrilaterals. Some are not.',
        prompt: 'Click <em>all the QUADRILATERALS</em> (four-sided shapes).',
        shapes: ['square_1','tri_equilateral','rectangle_1','pentagon_1','rhombus_1','tri_right_1','trapezoid_1','hexagon_1'],
        criterion: 'quadrilateral'
      },
      {
        type: 'sortShapes',
        story: 'The captain marks every <em>trapezoid</em> on the island for the local cartography society. Some look obvious. Some have to be looked at carefully.',
        prompt: 'Click <em>all the TRAPEZOIDS</em>.',
        shapes: ['trapezoid_1','rectangle_1','trapezoid_2','square_2','rhombus_2','trapezoid_3'],
        criterion: 'trapezoid'
      },
      {
        type: 'dragClassify',
        story: 'The captain hands you a stack of his quadrilateral sketches. He wants each one filed in the right category before nightfall.',
        prompt: 'Place each shape into its <em>most specific</em> category.',
        shapes: ['square_2','rectangle_2','rhombus_1','parallelogram_1','trapezoid_2'],
        bins: ['square','rectangle','rhombus','parallelogram','trapezoid']
      },
      {
        type: 'sortShapes',
        story: 'Among his sketches the captain has drawn six triangles. He needs the <em>right triangles</em> picked out for a measuring exercise.',
        prompt: 'Click <em>all the RIGHT TRIANGLES</em> (one 90° angle).',
        shapes: ['tri_equilateral','tri_right_1','tri_isosceles','tri_right_2','tri_obtuse','tri_scalene'],
        criterion: 'right'
      },
      {
        type: 'perimeterArea',
        story: 'The captain\'s base camp is a perfect rectangle: <em>5 paces wide, 3 paces deep</em>. He needs the perimeter to mark the rope boundary.',
        prompt: 'What is the <em>perimeter</em> of a 5 × 3 rectangle?',
        width: 5, height: 3, mode: 'perimeter',
        answer: 16
      },
      {
        type: 'perimeterArea',
        story: 'For the canvas tent floor the captain needs the area instead. Same rectangle: <em>5 paces × 3 paces</em>.',
        prompt: 'What is the <em>area</em>?',
        width: 5, height: 3, mode: 'area',
        answer: 15
      }
    ]
  },

  // =========================================================
  // CHAPTER 3 — RIVERLANDS
  // =========================================================
  {
    id: 'riverlands',
    title: 'The Riverlands',
    description: 'Follow the captain\'s rules downriver. Read his patterns.',
    treasure: '🧭',
    intro:
      '<p>Beyond the island the captain charted a long winding river system. To navigate it he left <em>rules</em> — small algebraic patterns that tell you exactly where the next dock, mile-post, or hidden cove lies, given where you came from.</p>' +
      '<p>You\'ll need to read his rules, fill his tables, and graph his sequences along the way.</p>',
    outro:
      '<p>You reach the mouth of the river just before sundown. Beneath an old ferry-plank you find a brass compass with the captain\'s initials — pointing, persistently, due east. <em>To the Citadel Vault.</em></p>',
    challenges: [
      {
        type: 'patternTable',
        story: 'The captain charts the docks downriver. <em>"Each new dock: x increases by 2, y stays the same."</em>',
        prompt: 'Fill in the missing dock coordinates.',
        headers: ['Dock #', 'x', 'y'],
        rows: [
          [1, 1, 4],
          [2, '?', 4],
          [3, '?', 4],
          [4, '?', 4]
        ],
        answers: [3, 5, 7]
      },
      {
        type: 'patternTable',
        story: 'A second rule the captain writes: <em>"y is x doubled."</em> He wants the table filled.',
        prompt: 'Fill in the missing y-values for y = x × 2.',
        headers: ['x', 'y'],
        rows: [
          [1, '?'],
          [2, '?'],
          [3, '?'],
          [5, '?']
        ],
        answers: [2, 4, 6, 10]
      },
      {
        type: 'plotShape',
        story: 'Plot the four points from the captain\'s y = x × 2 table on the grid: <em>(1,2), (2,4), (3,6), (5,10)</em>.',
        prompt: 'Click the four points in order. What shape does the captain\'s rule trace?',
        points: [[1,2],[2,4],[3,6],[5,10]],
        gridSize: 10,
        options: ['A straight line', 'A square', 'A circle', 'A triangle'],
        answer: 'A straight line',
        connect: 'line'
      },
      {
        type: 'sequence',
        story: 'The captain notes the sequence of mile-posts: <em>3, 7, 11, 15, ...</em> "Each post adds four leagues to the last," he writes.',
        prompt: 'What are the next THREE mile-posts?',
        sequence: [3, 7, 11, 15],
        next: [19, 23, 27]
      },
      {
        type: 'patternTable',
        story: 'The captain compares two paths down the river. Path A: <em>each step adds 3</em>. Path B: <em>each step doubles</em>. Both start at 1.',
        prompt: 'Fill in step 4 for each path.',
        headers: ['Step', 'Path A', 'Path B'],
        rows: [
          [1, 1, 1],
          [2, 4, 2],
          [3, 7, 4],
          [4, '?', '?']
        ],
        answers: [10, 8]
      },
      {
        type: 'identifyPoint',
        story: 'The captain marks the river mouth with a single careful star on the atlas grid.',
        prompt: 'What are the coordinates of the river mouth?',
        marker: { x: 8, y: 6 },
        gridSize: 10
      }
    ]
  },

  // =========================================================
  // CHAPTER 4 — THE CITADEL VAULT
  // =========================================================
  {
    id: 'citadel_vault',
    title: 'The Citadel Vault',
    description: 'Decode the captain\'s parenthesised cipher. Unlock the vault.',
    treasure: '💰',
    intro:
      '<p>The captain\'s last map shows a windswept stone citadel. Inside is the vault that holds his fortune. The vault\'s lock is engraved with a series of <em>parenthesised expressions</em> — ciphers the captain used so that even his own crew couldn\'t crack the door without his exact instructions.</p>' +
      '<p>One last set of math problems and the treasure is yours.</p>',
    outro:
      '<p>The vault\'s great brass tumblers fall into place. The door swings open on candlelit gold — and a final letter from the captain, addressed simply: <em>"To the cartographer who could read me — well done."</em></p>',
    challenges: [
      {
        type: 'expression',
        story: 'The first dial bears the cipher: <em>(3 + 4) × 2</em>.',
        prompt: 'Evaluate the expression.',
        expression: '(3 + 4) × 2',
        answer: 14
      },
      {
        type: 'expression',
        story: 'The second dial — the captain notes that <em>parentheses come first</em>.',
        prompt: 'Evaluate <em>(8 − 3) × 4 + 1</em>.',
        expression: '(8 − 3) × 4 + 1',
        answer: 21
      },
      {
        type: 'expression',
        story: 'A trickier dial — same numbers, different parentheses, different result.',
        prompt: 'Evaluate <em>8 − (3 × 2)</em>.',
        expression: '8 − (3 × 2)',
        answer: 2
      },
      {
        type: 'expression',
        story: 'The captain wrote a phrase in plain English on this tumbler: <em>"three more than four, all multiplied by five."</em> Translate it.',
        prompt: 'Evaluate <em>(4 + 3) × 5</em>.',
        expression: '(4 + 3) × 5',
        answer: 35
      },
      {
        type: 'expression',
        story: 'The final lock-cipher — a longer expression. Take it carefully.',
        prompt: 'Evaluate <em>2 × (6 + 4) − (3 × 2)</em>.',
        expression: '2 × (6 + 4) − (3 × 2)',
        answer: 14
      },
      {
        type: 'gridClick',
        story: 'The vault swings open. Inside, on the captain\'s old desk, lies one final atlas page with a single instruction: <em>"The treasure-chest itself sits at the point (6, 7)."</em>',
        prompt: 'Plot the treasure chest at <em>(6, 7)</em>.',
        target: { x: 6, y: 7 },
        gridSize: 10
      }
    ]
  }
];

if (typeof window !== 'undefined') window.CHAPTERS = CHAPTERS;
