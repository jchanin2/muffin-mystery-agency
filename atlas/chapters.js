// chapters.js — Story content for Captain Cartwright's Atlas.
// Four chapters of 6 challenges each. Each grid-based challenge can
// declare a `landmark` (or endpointA/endpointB/pathLabel for distance)
// that gets committed to the chapter's accumulating map on success.

const CHAPTERS = [
  // =========================================================
  // CHAPTER 1 — THE GARDEN ESTATE
  // =========================================================
  {
    id: 'garden_estate',
    title: 'The Garden Estate',
    description: 'Open the captain\'s atlas. Plot the points. Walk his garden.',
    treasure: '🗝️',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      // Sky / dawn gradient
      '<defs><linearGradient id="g1sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a5868"/><stop offset="1" stop-color="#aa8838"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#g1sky)"/>' +
      '<circle cx="350" cy="60" r="22" fill="#f5e8b8" opacity="0.85"/>' +
      // Distant hills
      '<path d="M 0 130 Q 100 100 200 120 Q 320 90 460 110 L 460 140 L 0 140 Z" fill="#3a4828"/>' +
      // Lawn
      '<rect x="0" y="138" width="460" height="62" fill="#5a6828"/>' +
      // Garden wall
      '<rect x="40" y="120" width="380" height="22" fill="#7a5828" stroke="#3a2010" stroke-width="1"/>' +
      // Iron gate (centered)
      '<rect x="200" y="86" width="60" height="56" fill="#1a1208" stroke="#3a2010" stroke-width="1.5"/>' +
      '<line x1="215" y1="92" x2="215" y2="138" stroke="#5a3818" stroke-width="1"/>' +
      '<line x1="230" y1="92" x2="230" y2="138" stroke="#5a3818" stroke-width="1"/>' +
      '<line x1="245" y1="92" x2="245" y2="138" stroke="#5a3818" stroke-width="1"/>' +
      '<polygon points="200,86 230,72 260,86" fill="#3a2010"/>' +
      // Apple trees
      '<line x1="80" y1="138" x2="80" y2="118" stroke="#3a2010" stroke-width="3"/>' +
      '<circle cx="80" cy="105" r="14" fill="#4a6828"/>' +
      '<circle cx="76" cy="100" r="2" fill="#aa2222"/><circle cx="84" cy="103" r="2" fill="#aa2222"/>' +
      '<line x1="380" y1="138" x2="380" y2="118" stroke="#3a2010" stroke-width="3"/>' +
      '<circle cx="380" cy="105" r="14" fill="#4a6828"/>' +
      '<circle cx="376" cy="100" r="2" fill="#aa2222"/><circle cx="384" cy="103" r="2" fill="#aa2222"/>' +
      // Roses on the wall
      '<circle cx="120" cy="138" r="3" fill="#aa2222"/><circle cx="135" cy="140" r="3" fill="#cc3344"/><circle cx="150" cy="138" r="3" fill="#aa2222"/>' +
      '<circle cx="320" cy="138" r="3" fill="#cc3344"/><circle cx="335" cy="140" r="3" fill="#aa2222"/><circle cx="350" cy="138" r="3" fill="#cc3344"/>' +
      // Well (round stone with bucket)
      '<circle cx="170" cy="160" r="14" fill="#5a4828" stroke="#3a2010" stroke-width="1.5"/>' +
      '<circle cx="170" cy="160" r="9" fill="#1a1208"/>' +
      '<line x1="158" y1="148" x2="158" y2="138" stroke="#3a2010" stroke-width="2"/>' +
      '<line x1="182" y1="148" x2="182" y2="138" stroke="#3a2010" stroke-width="2"/>' +
      '<line x1="156" y1="138" x2="184" y2="138" stroke="#3a2010" stroke-width="2"/>' +
      '<line x1="170" y1="138" x2="170" y2="156" stroke="#3a2010" stroke-width="0.7"/>' +
      // Tea pavilion (small gazebo on the right)
      '<polygon points="290,168 290,150 320,138 350,150 350,168" fill="#aa8838" stroke="#3a2010" stroke-width="1"/>' +
      '<polygon points="288,150 320,128 352,150" fill="#7a3818" stroke="#3a2010" stroke-width="1"/>' +
      '<rect x="305" y="158" width="6" height="10" fill="#3a2010"/>' +
      '</svg>',
    intro:
      '<p>You are a young cartographer in a city by the sea, working from a tiny harbour-bookshop your grandfather left you. One stormy afternoon the bell over the door rings and a stranger steps inside, dripping rain, carrying a heavy oilcloth bundle.</p>' +
      '<p>"For you," the stranger says. "From your grandfather\'s old shipmate. He\'s gone now. Wanted you to have it." She sets the bundle on the counter and is gone before you can ask her name.</p>' +
      '<p>You unwrap it. Inside lies a battered leather atlas, sea-stained and salt-stiff. The first page is marked in spidery handwriting:</p>' +
      '<p style="text-align:center;font-family:Cormorant Garamond,serif;font-style:italic;color:#f2cc5e;font-size:1.05rem;">"For the cartographer who can read me — my fortune lies hidden across these maps."<br><span style="font-size:0.85em;">— Captain Hieronymus Cartwright</span></p>' +
      '<p>You\'ve heard the name. Captain Cartwright was a famous explorer who vanished at sea fifteen years ago. The atlas was thought lost with him. Your grandfather had sailed with him in his youth.</p>' +
      '<p>You light a fresh candle, sharpen a quill, and turn the page. The first map shows the captain\'s own <em>garden estate</em>, drawn on a tidy coordinate grid. He has begun marking the landmarks for you to find.</p>' +
      '<p>Let\'s open the atlas.</p>',
    outro:
      '<p>You\'ve charted every landmark in the captain\'s garden. Beneath the stone marker at the end of the path you uncover a small brass key — the kind that opens a sea-trunk.</p>' +
      '<p>The next page of the atlas turns of its own accord. <em>Trapezoid Island.</em></p>',
    challenges: [
      {
        type: 'gridClick',
        story: 'The atlas opens to the captain\'s garden estate. He has marked his <em>tea pavilion</em> first, in tidy red ink — a square gazebo at the back of the lawn.',
        prompt: 'Plot the <em>tea pavilion</em> at <em>(3, 4)</em>.',
        target: { x: 3, y: 4 },
        landmark: 'Tea Pavilion',
        gridSize: 10
      },
      {
        type: 'identifyPoint',
        story: 'A second mark appears in the captain\'s ink — the round stone <em>well</em> from which he drew his morning water. The captain has plotted it; he wants you to read its coordinates back to him.',
        prompt: 'What are the coordinates of the well?',
        marker: { x: 7, y: 2 },
        landmark: 'Well',
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: 'The captain\'s rose-bed lies in a sunlit corner under the high garden wall. He notes: <em>"Roses, planted at the third column, ninth row."</em>',
        prompt: 'Plot the <em>rose-bed</em> at <em>(3, 9)</em>.',
        target: { x: 3, y: 9 },
        landmark: 'Rose Bed',
        gridSize: 10
      },
      {
        type: 'plotShape',
        story: 'The captain marks the four corners of his herb-garden — a tidy plot in the lawn. Plot them in order: <em>(1,1) → (5,1) → (5,3) → (1,3)</em>.',
        prompt: 'Click the four corners in order. What shape does he draw?',
        points: [[1,1],[5,1],[5,3],[1,3]],
        landmark: 'Herb Garden',
        gridSize: 10,
        options: ['Square', 'Rectangle', 'Trapezoid', 'Triangle'],
        answer: 'Rectangle'
      },
      {
        type: 'sequence',
        story: 'In the orchard the captain planted apple trees in a careful pattern: <em>2 trees in row one, 4 in row two, 6 in row three</em>. He writes: <em>"Each row, two more than the last."</em>',
        prompt: 'What are the next THREE numbers in his pattern?',
        sequence: [2, 4, 6],
        next: [8, 10, 12]
      },
      {
        type: 'distance',
        story: 'The captain hides a brass key. The atlas says: <em>"The key lies on a straight line between the WELL and a stone marker due north of it."</em> Walk straight up from the well to find the stone marker.',
        prompt: 'How far apart (in grid units) are the well at (7, 2) and the stone marker at (7, 8)?',
        pointA: [7, 2],
        pointB: [7, 8],
        endpointA: 'Well',
        endpointB: 'Stone Marker',
        pathLabel: '6 paces',
        landmark: 'Stone Marker',
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
    description: 'Survey the island. Sort the captain\'s sketches. Measure the plots.',
    treasure: '⚓',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      // Sky
      '<defs><linearGradient id="g2sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8aaa"/><stop offset="1" stop-color="#aaccdd"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#g2sky)"/>' +
      // Sun
      '<circle cx="370" cy="50" r="18" fill="#f5e8b8"/>' +
      // Ocean
      '<rect y="120" width="460" height="80" fill="#5a8aaa"/>' +
      '<path d="M 0 130 Q 60 124 120 130 Q 180 136 240 130 Q 300 124 360 130 Q 420 136 460 130" stroke="#aaccdd" stroke-width="1" fill="none" opacity="0.7"/>' +
      '<path d="M 0 145 Q 80 140 160 145 Q 240 150 320 145 Q 400 140 460 145" stroke="#aaccdd" stroke-width="1" fill="none" opacity="0.5"/>' +
      // Island (trapezoidal)
      '<polygon points="120,160 340,160 290,118 170,118" fill="#d4a868" stroke="#7a5828" stroke-width="1.5"/>' +
      '<polygon points="170,118 290,118 280,108 180,108" fill="#aa8838" opacity="0.6"/>' +
      // Palm trees
      '<line x1="200" y1="118" x2="195" y2="80" stroke="#3a2010" stroke-width="3"/>' +
      '<path d="M 195 80 Q 175 70 160 80" stroke="#4a7028" stroke-width="2.5" fill="none"/>' +
      '<path d="M 195 80 Q 215 68 230 78" stroke="#4a7028" stroke-width="2.5" fill="none"/>' +
      '<path d="M 195 80 Q 200 60 210 56" stroke="#4a7028" stroke-width="2.5" fill="none"/>' +
      '<line x1="260" y1="118" x2="265" y2="86" stroke="#3a2010" stroke-width="3"/>' +
      '<path d="M 265 86 Q 245 76 232 88" stroke="#4a7028" stroke-width="2.5" fill="none"/>' +
      '<path d="M 265 86 Q 285 74 298 84" stroke="#4a7028" stroke-width="2.5" fill="none"/>' +
      '<path d="M 265 86 Q 268 64 278 60" stroke="#4a7028" stroke-width="2.5" fill="none"/>' +
      // Tent (camp)
      '<polygon points="220,140 250,140 235,118" fill="#aa8838" stroke="#3a2010" stroke-width="1"/>' +
      '<line x1="235" y1="118" x2="235" y2="140" stroke="#3a2010" stroke-width="0.8"/>' +
      // Ship in distance
      '<polygon points="400,135 430,135 425,128 420,135" fill="#3a2010"/>' +
      '<line x1="425" y1="128" x2="425" y2="116" stroke="#3a2010" stroke-width="1"/>' +
      '<polygon points="425,118 433,128 425,128" fill="#eadba0"/>' +
      '</svg>',
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
        story: 'The captain marks every <em>trapezoid</em> on the island for the local cartography society. Some look obvious; some have to be looked at carefully.',
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
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      // Sky
      '<defs><linearGradient id="g3sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4858"/><stop offset="1" stop-color="#7a8898"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#g3sky)"/>' +
      // Distant mountains
      '<polygon points="0,140 80,80 140,120 220,70 300,110 380,75 460,130 460,140" fill="#3a4858"/>' +
      '<polygon points="0,140 60,100 120,135 200,90 270,125 350,95 430,140" fill="#5a6878" opacity="0.7"/>' +
      // Banks
      '<rect y="138" width="460" height="62" fill="#5a6828"/>' +
      // River (winding)
      '<path d="M 0 175 Q 80 165 140 175 Q 200 185 260 165 Q 320 145 380 160 Q 420 168 460 158 L 460 200 L 0 200 Z" fill="#5a8aaa"/>' +
      '<path d="M 20 178 Q 100 168 160 178" stroke="#aaccdd" stroke-width="1" fill="none" opacity="0.6"/>' +
      '<path d="M 220 175 Q 280 168 340 158" stroke="#aaccdd" stroke-width="1" fill="none" opacity="0.6"/>' +
      // Trees on banks
      '<line x1="60" y1="155" x2="60" y2="138" stroke="#3a2010" stroke-width="2"/>' +
      '<polygon points="55,148 65,148 60,128" fill="#3a5818"/>' +
      '<line x1="200" y1="158" x2="200" y2="142" stroke="#3a2010" stroke-width="2"/>' +
      '<polygon points="195,150 205,150 200,132" fill="#3a5818"/>' +
      '<line x1="340" y1="148" x2="340" y2="132" stroke="#3a2010" stroke-width="2"/>' +
      '<polygon points="335,140 345,140 340,122" fill="#3a5818"/>' +
      '<line x1="420" y1="153" x2="420" y2="137" stroke="#3a2010" stroke-width="2"/>' +
      '<polygon points="415,145 425,145 420,127" fill="#3a5818"/>' +
      // Wooden dock
      '<rect x="100" y="172" width="38" height="6" fill="#5a3818" stroke="#3a2010" stroke-width="0.7"/>' +
      '<line x1="105" y1="178" x2="105" y2="186" stroke="#3a2010" stroke-width="1"/>' +
      '<line x1="120" y1="178" x2="120" y2="186" stroke="#3a2010" stroke-width="1"/>' +
      '<line x1="135" y1="178" x2="135" y2="186" stroke="#3a2010" stroke-width="1"/>' +
      // Small boat
      '<polygon points="260,170 290,170 285,177 265,177" fill="#3a2010"/>' +
      '<line x1="275" y1="170" x2="275" y2="158" stroke="#3a2010" stroke-width="1"/>' +
      '<polygon points="275,160 285,170 275,170" fill="#eadba0"/>' +
      '</svg>',
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
        landmark: 'Rule y = 2x',
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
        landmark: 'River Mouth',
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
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      // Stormy sky
      '<defs><linearGradient id="g4sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1a2a"/><stop offset="1" stop-color="#5a4a48"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#g4sky)"/>' +
      // Moon
      '<circle cx="80" cy="50" r="20" fill="#eadba0" opacity="0.9"/>' +
      '<circle cx="76" cy="46" r="3" fill="#c4b888" opacity="0.6"/>' +
      // Cliffs
      '<polygon points="0,140 460,140 460,200 0,200" fill="#4a4040"/>' +
      '<polygon points="0,140 60,80 140,140" fill="#3a3030"/>' +
      '<polygon points="320,140 400,75 460,140" fill="#3a3030"/>' +
      // Citadel (centered, tall stone tower)
      '<rect x="180" y="60" width="100" height="80" fill="#5a4848" stroke="#1a1208" stroke-width="1.5"/>' +
      '<polygon points="180,60 230,30 280,60" fill="#3a2810"/>' +
      // Crenellations
      '<rect x="180" y="56" width="10" height="6" fill="#5a4848"/>' +
      '<rect x="200" y="56" width="10" height="6" fill="#5a4848"/>' +
      '<rect x="220" y="56" width="10" height="6" fill="#5a4848"/>' +
      '<rect x="240" y="56" width="10" height="6" fill="#5a4848"/>' +
      '<rect x="260" y="56" width="10" height="6" fill="#5a4848"/>' +
      // Vault door
      '<rect x="210" y="100" width="40" height="40" fill="#3a2410" stroke="#1a1208" stroke-width="1.5" rx="2"/>' +
      '<circle cx="230" cy="120" r="6" fill="#aa8838" stroke="#5a3010" stroke-width="1"/>' +
      // Tower windows
      '<rect x="190" y="80" width="6" height="12" fill="#ffaa55" opacity="0.7"/>' +
      '<rect x="264" y="80" width="6" height="12" fill="#ffaa55" opacity="0.7"/>' +
      // Side towers
      '<rect x="140" y="90" width="30" height="50" fill="#5a4848" stroke="#1a1208" stroke-width="1.2"/>' +
      '<polygon points="140,90 155,68 170,90" fill="#3a2810"/>' +
      '<rect x="290" y="90" width="30" height="50" fill="#5a4848" stroke="#1a1208" stroke-width="1.2"/>' +
      '<polygon points="290,90 305,68 320,90" fill="#3a2810"/>' +
      // Lightning
      '<polyline points="380,30 386,55 378,55 388,90" stroke="#fff5aa" stroke-width="2" fill="none" opacity="0.8"/>' +
      '</svg>',
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
        landmark: 'Treasure',
        gridSize: 10
      }
    ]
  }
];

if (typeof window !== 'undefined') window.CHAPTERS = CHAPTERS;
