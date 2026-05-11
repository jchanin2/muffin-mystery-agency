// chapters.js — Story content for Foxglove Hollow.
//
// Line-plot data uses an array of tick objects [{ value, label }, ...]
// where value is a JS-parseable expression like "1/8" or "1 3/8" and
// label is the rendered text under the tick.
//
// Challenge types (see challenges.js):
//   lineplotRead      — show a fixed line plot, ask a question
//   lineplotBuild     — student stacks X's from raw data
//   fractionOpFromPlot — line plot stays visible, perform fraction op
//   gridClick / identifyPoint / distance / gridPlotMC — coordinate grid

const CHAPTERS = [
  // =========================================================
  // CHAPTER 1 — FALLEN LEAVES
  // =========================================================
  {
    id: 'fallen_leaves',
    title: 'Fallen Leaves',
    description: 'Measure the autumn leaves. Build a plot. Read your data.',
    emblem: '🍁',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="ch1sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c47828"/><stop offset="1" stop-color="#f0c878"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#ch1sky)"/>' +
      // Distant treeline (autumn)
      '<polygon points="0,140 30,120 60,128 100,108 140,124 180,110 230,118 280,104 330,120 380,112 430,124 460,118 460,140" fill="#7a3818"/>' +
      '<polygon points="0,140 40,128 80,134 130,118 180,132 240,124 300,134 360,122 420,134 460,128 460,140" fill="#8a4828" opacity="0.7"/>' +
      // Lawn
      '<rect x="0" y="138" width="460" height="62" fill="#5a6828"/>' +
      // Big maple tree
      '<rect x="100" y="80" width="20" height="60" fill="#3a2010"/>' +
      '<ellipse cx="110" cy="68" rx="55" ry="40" fill="#c47828"/>' +
      '<ellipse cx="92" cy="55" rx="20" ry="14" fill="#aa3818"/>' +
      '<ellipse cx="130" cy="60" rx="22" ry="16" fill="#e88838"/>' +
      '<ellipse cx="125" cy="80" rx="18" ry="12" fill="#aa3818"/>' +
      // Falling leaves
      '<path d="M 200 50 q 6 -3 8 4 q -6 -1 -8 -4" fill="#c47828"/>' +
      '<path d="M 240 80 q 5 -3 7 4 q -5 -2 -7 -4" fill="#aa3818"/>' +
      '<path d="M 280 60 q 6 -3 8 4 q -6 -1 -8 -4" fill="#e88838"/>' +
      '<path d="M 320 100 q 5 -3 7 4 q -5 -2 -7 -4" fill="#c47828"/>' +
      '<path d="M 360 70 q 6 -3 8 4 q -6 -1 -8 -4" fill="#aa3818"/>' +
      '<path d="M 400 90 q 5 -3 7 4 q -5 -2 -7 -4" fill="#e88838"/>' +
      // Leaves on the ground
      '<ellipse cx="200" cy="170" rx="8" ry="4" fill="#aa3818" transform="rotate(-20 200 170)"/>' +
      '<ellipse cx="240" cy="180" rx="9" ry="4" fill="#c47828" transform="rotate(15 240 180)"/>' +
      '<ellipse cx="290" cy="175" rx="7" ry="3" fill="#e88838" transform="rotate(-30 290 175)"/>' +
      '<ellipse cx="350" cy="185" rx="9" ry="4" fill="#aa3818" transform="rotate(10 350 185)"/>' +
      '<ellipse cx="400" cy="172" rx="8" ry="4" fill="#c47828" transform="rotate(-15 400 172)"/>' +
      // Field notebook on the lawn
      '<rect x="20" y="150" width="60" height="42" fill="#3a2010" stroke="#1a1008" stroke-width="1" rx="2"/>' +
      '<rect x="24" y="154" width="52" height="34" fill="#eadba0"/>' +
      '<line x1="26" y1="162" x2="74" y2="162" stroke="#3a2010" stroke-width="0.5"/>' +
      '<line x1="26" y1="168" x2="74" y2="168" stroke="#3a2010" stroke-width="0.5"/>' +
      '<line x1="26" y1="174" x2="60" y2="174" stroke="#3a2010" stroke-width="0.5"/>' +
      '<line x1="26" y1="180" x2="68" y2="180" stroke="#3a2010" stroke-width="0.5"/>' +
      '</svg>',
    intro:
      '<p>You are the new apprentice at <em>Foxglove Hollow</em>, a small countryside research garden run by <em>Professor Fern Quill</em>, an elderly badger naturalist who has kept careful field notes for forty-odd years.</p>' +
      '<p>It is the first morning of autumn observation season. The professor meets you at the edge of the great maple grove with a basket, a steel ruler, and a worn leather notebook. "Today, my dear apprentice — leaves. Every shape, every size, every length. Measure each one in eighths of an inch. Then we plot."</p>' +
      '<p>You sharpen your pencil. Time to record.</p>',
    outro:
      '<p>By teatime, you and the professor have plotted every leaf in the basket. A pressed maple leaf joins your notebook as a memento.</p>' +
      '<p>The professor closes the book gently. "Tomorrow — butterflies."</p>',
    challenges: [
      {
        type: 'lineplotRead',
        story: 'The professor hands you a finished line plot from last week\'s leaf collection.',
        prompt: 'Which leaf length was recorded <em>most often</em>?',
        plot: {
          title: 'Maple Leaf Lengths',
          xLabel: 'Length (in inches)',
          ticks: ['0','1/8','2/8','3/8','4/8','5/8','6/8','7/8','1'],
          counts: [0, 0, 1, 2, 3, 4, 2, 1, 0]
        },
        answer: '5/8'
      },
      {
        type: 'lineplotRead',
        story: 'The professor squints at the same plot. "Eighths can be tricky. Tell me, dear — how many leaves measured one half inch or LONGER?"',
        prompt: 'How many leaves measured <em>1/2 inch or more</em>?',
        plot: {
          title: 'Maple Leaf Lengths',
          xLabel: 'Length (in inches)',
          ticks: ['0','1/8','2/8','3/8','4/8','5/8','6/8','7/8','1'],
          counts: [0, 0, 1, 2, 3, 4, 2, 1, 0]
        },
        answer: 10
      },
      {
        type: 'fractionOpFromPlot',
        story: '"And what is the SPAN," asks the professor, "from our shortest leaf to our longest?"',
        prompt: 'How much LONGER is the longest leaf than the shortest? (Give as a fraction.)',
        plot: {
          title: 'Maple Leaf Lengths',
          xLabel: 'Length (in inches)',
          ticks: ['0','1/8','2/8','3/8','4/8','5/8','6/8','7/8','1'],
          counts: [0, 0, 1, 2, 3, 4, 2, 1, 0]
        },
        answer: '5/8'
      },
      {
        type: 'lineplotBuild',
        story: 'A fresh handful of leaves comes in from the orchard. The professor hands you the raw measurements. You plot them yourself.',
        prompt: 'Click above each tick to stack an X for every measurement. (Click an X to remove it.)',
        plot: {
          title: 'Orchard Leaf Lengths',
          xLabel: 'Length (in inches)',
          ticks: ['0','1/8','2/8','3/8','4/8','5/8','6/8','7/8','1'],
          raw: ['3/8','4/8','4/8','5/8','5/8','5/8','6/8','6/8','7/8']
        }
      },
      {
        type: 'fractionOpFromPlot',
        story: 'Looking at your orchard plot, the professor asks: "Of the three LONGEST leaves you measured — what is their TOTAL length, added together?"',
        prompt: 'Total length of the 3 longest orchard leaves. (Give as a mixed number or fraction.)',
        plot: {
          title: 'Orchard Leaf Lengths',
          xLabel: 'Length (in inches)',
          ticks: ['0','1/8','2/8','3/8','4/8','5/8','6/8','7/8','1'],
          counts: [0, 0, 0, 1, 2, 3, 2, 1, 0]
        },
        answer: '19/8'
      },
      {
        type: 'fractionOpFromPlot',
        story: 'The professor lays both line plots side by side. "Of the orchard leaves only," she says, "what FRACTION of them measured five-eighths of an inch?"',
        prompt: 'What fraction of the 9 orchard leaves measured exactly <em>5/8 inch</em>? (Give as a fraction in simplest form.)',
        plot: {
          title: 'Orchard Leaf Lengths',
          xLabel: 'Length (in inches)',
          ticks: ['0','1/8','2/8','3/8','4/8','5/8','6/8','7/8','1'],
          counts: [0, 0, 0, 1, 2, 3, 2, 1, 0]
        },
        answer: '1/3'
      }
    ]
  },

  // =========================================================
  // CHAPTER 2 — BUTTERFLY WINGS
  // =========================================================
  {
    id: 'butterfly_wings',
    title: 'Butterfly Wings',
    description: 'Wingspans of fritillaries and skippers in halves of an inch.',
    emblem: '🦋',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="ch2sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa8c8"/><stop offset="1" stop-color="#aac8d8"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#ch2sky)"/>' +
      '<circle cx="380" cy="40" r="18" fill="#f5e8a8" opacity="0.85"/>' +
      // Distant hills
      '<polygon points="0,140 60,110 130,124 200,108 270,118 340,104 410,120 460,108 460,140" fill="#5a6838" opacity="0.85"/>' +
      '<polygon points="0,140 50,128 110,134 180,122 250,132 320,118 380,128 460,118 460,140" fill="#7a8848" opacity="0.6"/>' +
      // Meadow
      '<rect x="0" y="138" width="460" height="62" fill="#7a9048"/>' +
      // Flowers in meadow (foxgloves)
      '<line x1="80" y1="180" x2="80" y2="160" stroke="#3a4018" stroke-width="2"/>' +
      '<ellipse cx="80" cy="158" rx="5" ry="6" fill="#9a2a48"/>' +
      '<ellipse cx="78" cy="164" rx="4" ry="5" fill="#aa3858"/>' +
      '<line x1="180" y1="182" x2="180" y2="158" stroke="#3a4018" stroke-width="2"/>' +
      '<ellipse cx="180" cy="156" rx="5" ry="6" fill="#9a2a48"/>' +
      '<ellipse cx="182" cy="162" rx="4" ry="5" fill="#aa3858"/>' +
      '<line x1="340" y1="184" x2="340" y2="162" stroke="#3a4018" stroke-width="2"/>' +
      '<ellipse cx="340" cy="160" rx="5" ry="6" fill="#9a2a48"/>' +
      '<ellipse cx="342" cy="166" rx="4" ry="5" fill="#aa3858"/>' +
      // Butterflies (3 of them, varying sizes)
      // Large butterfly mid-air
      '<g transform="translate(220,60)"><ellipse cx="0" cy="0" rx="3" ry="10" fill="#3a2010"/><path d="M -2 -4 q -18 -10 -22 6 q 0 8 22 -2" fill="#c47828" stroke="#3a2010" stroke-width="0.7"/><path d="M 2 -4 q 18 -10 22 6 q 0 8 -22 -2" fill="#c47828" stroke="#3a2010" stroke-width="0.7"/><path d="M -2 4 q -14 6 -16 -2 q 0 -4 16 -2" fill="#e88838" stroke="#3a2010" stroke-width="0.7"/><path d="M 2 4 q 14 6 16 -2 q 0 -4 -16 -2" fill="#e88838" stroke="#3a2010" stroke-width="0.7"/></g>' +
      // Smaller butterfly
      '<g transform="translate(110,85)"><ellipse cx="0" cy="0" rx="2" ry="6" fill="#3a2010"/><path d="M -1 -2 q -10 -6 -12 3 q 0 4 12 -1" fill="#7a2a48" stroke="#3a2010" stroke-width="0.5"/><path d="M 1 -2 q 10 -6 12 3 q 0 4 -12 -1" fill="#7a2a48" stroke="#3a2010" stroke-width="0.5"/></g>' +
      // Tiny butterfly
      '<g transform="translate(390,95)"><ellipse cx="0" cy="0" rx="1.5" ry="4" fill="#3a2010"/><path d="M -1 -1 q -7 -4 -8 2 q 0 3 8 -1" fill="#c47828" stroke="#3a2010" stroke-width="0.4"/><path d="M 1 -1 q 7 -4 8 2 q 0 3 -8 -1" fill="#c47828" stroke="#3a2010" stroke-width="0.4"/></g>' +
      // Naturalist's net
      '<line x1="40" y1="180" x2="30" y2="120" stroke="#5a3818" stroke-width="2"/>' +
      '<ellipse cx="22" cy="118" rx="14" ry="10" fill="none" stroke="#7a5828" stroke-width="1.5"/>' +
      '<path d="M 14 110 q 4 -4 16 0 q -8 8 -16 8 z" fill="rgba(255,255,255,0.25)" stroke="#7a5828" stroke-width="0.5"/>' +
      '</svg>',
    intro:
      '<p>Mid-week. The professor packs nets and glass collection vials into a wicker basket. "To the meadow, my dear. The fritillaries are about, and the skippers, and a great many small blues. We catch them gently, measure their wingspans, and let them go."</p>' +
      '<p>She hands you a steel caliper marked in halves of an inch. "Halves only today. They flutter too quickly for eighths."</p>',
    outro:
      '<p>You return to the cottage at sundown with a notebook full of wingspans and a single bronze butterfly-pin from the professor — a token for an apprentice who can read a line plot.</p>' +
      '<p>"Tomorrow," she says, "the orchard."</p>',
    challenges: [
      {
        type: 'lineplotBuild',
        story: 'Twelve butterflies, twelve wingspans, all caught and released. You sit on the meadow stones and plot.',
        prompt: 'Plot the captain\'s data on the line plot. Click above each tick to stack an X.',
        plot: {
          title: 'Butterfly Wingspans',
          xLabel: 'Wingspan (in inches)',
          ticks: ['1/2','1','1 1/2','2','2 1/2','3'],
          raw: ['1','1','1 1/2','1 1/2','1 1/2','1 1/2','2','2','2','2 1/2','2 1/2','3']
        }
      },
      {
        type: 'lineplotRead',
        story: 'Looking over your plot, the professor pulls out her steel pencil.',
        prompt: 'What was the <em>most common</em> wingspan?',
        plot: {
          title: 'Butterfly Wingspans',
          xLabel: 'Wingspan (in inches)',
          ticks: ['1/2','1','1 1/2','2','2 1/2','3'],
          counts: [0, 2, 4, 3, 2, 1]
        },
        answer: '1 1/2'
      },
      {
        type: 'fractionOpFromPlot',
        story: '"The four smallest butterflies," the professor says, "were the rare orange skippers. Add their wingspans together."',
        prompt: 'Total wingspan of the FOUR smallest butterflies?',
        plot: {
          title: 'Butterfly Wingspans',
          xLabel: 'Wingspan (in inches)',
          ticks: ['1/2','1','1 1/2','2','2 1/2','3'],
          counts: [0, 2, 4, 3, 2, 1]
        },
        // 1 + 1 + 1 1/2 + 1 1/2 = 5
        answer: 5
      },
      {
        type: 'fractionOpFromPlot',
        story: '"And the spread," the professor adds — "widest to narrowest."',
        prompt: 'How much WIDER is the widest wingspan than the narrowest?',
        plot: {
          title: 'Butterfly Wingspans',
          xLabel: 'Wingspan (in inches)',
          ticks: ['1/2','1','1 1/2','2','2 1/2','3'],
          counts: [0, 2, 4, 3, 2, 1]
        },
        // 3 - 1 = 2
        answer: 2
      },
      {
        type: 'fractionOpFromPlot',
        story: '"Of all twelve butterflies," the professor asks, "what FRACTION of them had wings smaller than two inches?"',
        prompt: 'What fraction of the 12 butterflies had wingspans <em>LESS THAN 2 inches</em>? (Simplest form.)',
        plot: {
          title: 'Butterfly Wingspans',
          xLabel: 'Wingspan (in inches)',
          ticks: ['1/2','1','1 1/2','2','2 1/2','3'],
          counts: [0, 2, 4, 3, 2, 1]
        },
        // (2 + 4) / 12 = 6/12 = 1/2
        answer: '1/2'
      },
      {
        type: 'fractionOpFromPlot',
        story: 'The professor turns to a fresh page. "If every butterfly we measured today flew in single-file, wing-tip to wing-tip — how long would the line be?"',
        prompt: 'TOTAL wingspan of all twelve butterflies, added together. (Mixed number or fraction.)',
        plot: {
          title: 'Butterfly Wingspans',
          xLabel: 'Wingspan (in inches)',
          ticks: ['1/2','1','1 1/2','2','2 1/2','3'],
          counts: [0, 2, 4, 3, 2, 1]
        },
        // 2(1) + 4(1.5) + 3(2) + 2(2.5) + 1(3) = 2 + 6 + 6 + 5 + 3 = 22
        answer: 22
      }
    ]
  },

  // =========================================================
  // CHAPTER 3 — THE APPLE HARVEST
  // =========================================================
  {
    id: 'apple_harvest',
    title: 'The Apple Harvest',
    description: 'Weigh every bag from the orchard. Multiply, divide, share.',
    emblem: '🍎',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="ch3sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#88a8c8"/><stop offset="1" stop-color="#d8d0a0"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#ch3sky)"/>' +
      '<circle cx="80" cy="50" r="18" fill="#f5e8a8" opacity="0.85"/>' +
      // Distant orchard rows
      '<polygon points="0,140 0,128 460,128 460,140" fill="#5a6828"/>' +
      // Apple trees
      '<g transform="translate(70,90)"><rect x="-4" y="0" width="8" height="50" fill="#3a2010"/><ellipse cx="0" cy="-8" rx="35" ry="28" fill="#5a7028"/><circle cx="-12" cy="-12" r="4" fill="#aa2828"/><circle cx="6" cy="-18" r="4" fill="#c43838"/><circle cx="14" cy="-2" r="4" fill="#aa2828"/><circle cx="-18" cy="0" r="4" fill="#c43838"/><circle cx="0" cy="8" r="4" fill="#aa2828"/></g>' +
      '<g transform="translate(180,86)"><rect x="-4" y="0" width="8" height="54" fill="#3a2010"/><ellipse cx="0" cy="-8" rx="38" ry="30" fill="#4a6018"/><circle cx="-14" cy="-10" r="4" fill="#c43838"/><circle cx="8" cy="-16" r="4" fill="#aa2828"/><circle cx="16" cy="0" r="4" fill="#c43838"/><circle cx="-20" cy="-2" r="4" fill="#aa2828"/><circle cx="2" cy="10" r="4" fill="#c43838"/><circle cx="-8" cy="14" r="4" fill="#aa2828"/></g>' +
      '<g transform="translate(310,90)"><rect x="-4" y="0" width="8" height="50" fill="#3a2010"/><ellipse cx="0" cy="-8" rx="36" ry="28" fill="#5a7028"/><circle cx="-12" cy="-12" r="4" fill="#aa2828"/><circle cx="6" cy="-18" r="4" fill="#c43838"/><circle cx="14" cy="-2" r="4" fill="#aa2828"/><circle cx="-18" cy="0" r="4" fill="#c43838"/></g>' +
      '<g transform="translate(420,92)"><rect x="-4" y="0" width="8" height="48" fill="#3a2010"/><ellipse cx="0" cy="-8" rx="32" ry="26" fill="#4a6018"/><circle cx="-10" cy="-10" r="3.5" fill="#aa2828"/><circle cx="6" cy="-14" r="3.5" fill="#c43838"/><circle cx="14" cy="-2" r="3.5" fill="#aa2828"/></g>' +
      // Ground
      '<rect x="0" y="140" width="460" height="60" fill="#7a6018"/>' +
      // Wicker basket of apples in foreground
      '<rect x="240" y="156" width="80" height="38" fill="#aa6818" stroke="#5a3010" stroke-width="1.5" rx="2"/>' +
      '<rect x="240" y="156" width="80" height="6" fill="#7a4818"/>' +
      '<ellipse cx="252" cy="156" r="8" fill="#aa2828"/>' +
      '<ellipse cx="268" cy="153" rx="9" ry="8" fill="#c43838"/>' +
      '<ellipse cx="284" cy="156" rx="9" ry="8" fill="#aa2828"/>' +
      '<ellipse cx="300" cy="154" rx="8" ry="7" fill="#c43838"/>' +
      '<ellipse cx="314" cy="157" r="7" fill="#aa2828"/>' +
      '<ellipse cx="252" cy="158" rx="2" ry="2.5" fill="#5a7028" transform="rotate(-20 252 158)"/>' +
      '<ellipse cx="298" cy="155" rx="2" ry="2.5" fill="#5a7028" transform="rotate(15 298 155)"/>' +
      // Scale on the right
      '<line x1="380" y1="195" x2="380" y2="150" stroke="#5a4828" stroke-width="2"/>' +
      '<line x1="365" y1="150" x2="395" y2="150" stroke="#5a4828" stroke-width="2"/>' +
      '<ellipse cx="380" cy="155" rx="18" ry="4" fill="#aa8838"/>' +
      '<ellipse cx="380" cy="153" rx="18" ry="4" fill="#d4a624"/>' +
      '</svg>',
    intro:
      '<p>October. The orchard at Foxglove Hollow is hung heavy with cider apples. The professor and you bring sturdy baskets and a brass scale calibrated in mixed-number pounds — quarters, halves, three-quarters, the lot.</p>' +
      '<p>"Every bag weighed, every bag plotted," the professor says. "Then we add, we subtract, and we work out how many pies my old friend the village baker can manage this season."</p>',
    outro:
      '<p>The cider apples are weighed and stored. Professor Quill pulls a small jar of last year\'s apple preserve from the larder and pours you a slice on toast. "Apprentice, you\'ve earned that."</p>' +
      '<p>"One more page tomorrow," she says, "and then a different kind of paper altogether. We move from the orchard — into the glasshouse."</p>',
    challenges: [
      {
        type: 'lineplotBuild',
        story: 'Ten harvest bags weighed and labelled. You unfold a fresh page and plot.',
        prompt: 'Plot the weight of each bag on the line plot.',
        plot: {
          title: 'Apple Bag Weights',
          xLabel: 'Bag Weight (lbs)',
          ticks: ['1/4','3/8','1/2','3/4','1','1 1/4','1 1/2'],
          raw: ['1 1/4','3/8','1/2','3/8','1 1/4','1/4','1 1/2','3/4','1/2','1']
        }
      },
      {
        type: 'fractionOpFromPlot',
        story: '"The three heaviest," the professor says, taking the plot from you. "Add them. They go to the baker first."',
        prompt: 'Total weight of the THREE heaviest bags? (Mixed number or whole number.)',
        plot: {
          title: 'Apple Bag Weights',
          xLabel: 'Bag Weight (lbs)',
          ticks: ['1/4','3/8','1/2','3/4','1','1 1/4','1 1/2'],
          counts: [1, 2, 2, 1, 1, 2, 1]
        },
        // 1 1/2 + 1 1/4 + 1 1/4 = 4
        answer: 4
      },
      {
        type: 'fractionOpFromPlot',
        story: 'The baker — old Mr. Pippin — sends word he can make ONE pie from every <em>1/2 pound</em> of apples. From the three heaviest bags (total 4 lbs), how many pies?',
        prompt: '<em>4 ÷ 1/2 = ?</em> How many pies from the three heaviest?',
        plot: null,
        // 4 ÷ (1/2) = 8
        answer: 8
      },
      {
        type: 'fractionOpFromPlot',
        story: '"Subtract our heaviest bag from our lightest, dear. By how much?"',
        prompt: 'Heaviest bag minus lightest bag? (Mixed number or fraction.)',
        plot: {
          title: 'Apple Bag Weights',
          xLabel: 'Bag Weight (lbs)',
          ticks: ['1/4','3/8','1/2','3/4','1','1 1/4','1 1/2'],
          counts: [1, 2, 2, 1, 1, 2, 1]
        },
        // 1 1/2 - 1/4 = 5/4 = 1 1/4
        answer: '5/4'
      },
      {
        type: 'fractionOpFromPlot',
        story: 'Pippin\'s special pie needs exactly <em>3/4 pound</em> of apples per pie. He plans on baking <em>6</em> pies on Sunday. How many pounds of apples does he need in total?',
        prompt: 'Calculate <em>3/4 × 6</em>. (Mixed number or fraction.)',
        plot: null,
        // 3/4 × 6 = 18/4 = 9/2 = 4 1/2
        answer: '9/2'
      },
      {
        type: 'fractionOpFromPlot',
        story: 'The total apple harvest weighed <em>8 1/2 pounds</em>. The professor splits it evenly between TWO village families. How much does each family receive?',
        prompt: '<em>8 1/2 ÷ 2 = ?</em> Pounds per family. (Mixed number or fraction.)',
        plot: null,
        // 8 1/2 ÷ 2 = 17/2 ÷ 2 = 17/4 = 4 1/4
        answer: '17/4'
      }
    ]
  },

  // =========================================================
  // CHAPTER 4 — THE GREENHOUSE MAP
  // =========================================================
  {
    id: 'greenhouse_map',
    title: 'The Greenhouse Map',
    description: 'Map the glasshouse on a coordinate grid. Plot every species.',
    emblem: '🏛️',
    illustration:
      '<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="ch4sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4858"/><stop offset="1" stop-color="#5a6878"/></linearGradient></defs>' +
      '<rect width="460" height="140" fill="url(#ch4sky)"/>' +
      // Distant trees behind glasshouse
      '<polygon points="0,140 30,118 80,128 130,116 180,122 230,114 280,124 330,118 380,126 430,116 460,124 460,140" fill="#3a4828" opacity="0.85"/>' +
      // Ground
      '<rect x="0" y="138" width="460" height="62" fill="#5a6828"/>' +
      // Victorian glasshouse
      // Main building
      '<rect x="80" y="80" width="300" height="80" fill="rgba(180, 220, 200, 0.35)" stroke="#3a4828" stroke-width="2"/>' +
      // Roof (curved/sloped)
      '<polygon points="80,80 230,30 380,80" fill="rgba(180, 220, 200, 0.4)" stroke="#3a4828" stroke-width="2"/>' +
      // Roof ridges (glass panes)
      '<line x1="120" y1="80" x2="180" y2="50" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="160" y1="80" x2="200" y2="42" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="200" y1="80" x2="220" y2="34" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="240" y1="80" x2="220" y2="34" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="280" y1="80" x2="240" y2="42" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="320" y1="80" x2="260" y2="50" stroke="#3a4828" stroke-width="1"/>' +
      // Wall mullions (vertical panes)
      '<line x1="120" y1="80" x2="120" y2="160" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="160" y1="80" x2="160" y2="160" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="200" y1="80" x2="200" y2="160" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="260" y1="80" x2="260" y2="160" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="300" y1="80" x2="300" y2="160" stroke="#3a4828" stroke-width="1"/>' +
      '<line x1="340" y1="80" x2="340" y2="160" stroke="#3a4828" stroke-width="1"/>' +
      // Horizontal mullions
      '<line x1="80" y1="115" x2="380" y2="115" stroke="#3a4828" stroke-width="1"/>' +
      // Door
      '<rect x="218" y="120" width="24" height="40" fill="#5a3818" stroke="#3a2010" stroke-width="1"/>' +
      '<circle cx="236" cy="140" r="1.5" fill="#aa8838"/>' +
      // Cupola on top
      '<circle cx="230" cy="30" r="6" fill="#aa8838" stroke="#3a2010" stroke-width="1"/>' +
      '<line x1="230" y1="24" x2="230" y2="14" stroke="#aa8838" stroke-width="1.5"/>' +
      // Plants visible inside through glass (hint of green)
      '<ellipse cx="100" cy="140" rx="14" ry="10" fill="#5a7028" opacity="0.6"/>' +
      '<ellipse cx="146" cy="140" rx="12" ry="10" fill="#7a8a48" opacity="0.55"/>' +
      '<ellipse cx="280" cy="140" rx="14" ry="10" fill="#5a7028" opacity="0.6"/>' +
      '<ellipse cx="320" cy="140" rx="11" ry="9" fill="#aa3858" opacity="0.55"/>' +
      '<ellipse cx="360" cy="142" rx="12" ry="9" fill="#7a8a48" opacity="0.55"/>' +
      // Path leading to door
      '<polygon points="220,160 240,160 245,200 215,200" fill="#aa8838" opacity="0.7"/>' +
      '</svg>',
    intro:
      '<p>The last week of observation season turns colder, and the professor leads you indoors — through the iron gate to the manor\'s great <em>Victorian glasshouse</em>. Inside: rows of raised beds, each lit by a different angle of leaded glass, each holding a different species.</p>' +
      '<p>"A new sort of paper today, dear. We use a <em>coordinate grid</em>. Every bed lies at a numbered position. Plot them; remember them; cross-reference them. Cartographer\'s tools for a botanist."</p>',
    outro:
      '<p>The greenhouse map is complete — every species in its rightful place. The professor closes the notebook and presses it into your hands. "Yours, now. Apprentice no more. Naturalist."</p>',
    challenges: [
      {
        type: 'gridClick',
        story: 'The professor unfolds a blank coordinate grid. "Plot our foxgloves first, dear. They are in the southwest bed, at (3, 2)."',
        prompt: 'Plot the <em>foxgloves</em> at <em>(3, 2)</em>.',
        target: { x: 3, y: 2 },
        landmark: 'Foxgloves',
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: '"The ferns next — far northwest corner, by the misting pipe. (1, 8)."',
        prompt: 'Plot the <em>ferns</em> at <em>(1, 8)</em>.',
        target: { x: 1, y: 8 },
        landmark: 'Ferns',
        gridSize: 10
      },
      {
        type: 'identifyPoint',
        story: 'The professor points to an already-marked bed on the grid — the <em>orchid house</em>, deep in the east wall.',
        prompt: 'What are the coordinates of the orchid house?',
        marker: { x: 7, y: 5 },
        landmark: 'Orchids',
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: '"The herb bed by the back glass — (5, 9). It needs the most morning light."',
        prompt: 'Plot the <em>herbs</em> at <em>(5, 9)</em>.',
        target: { x: 5, y: 9 },
        landmark: 'Herbs',
        gridSize: 10
      },
      {
        type: 'distance',
        story: '"The greenhouse door — our entrance — lies at <em>(3, 8)</em>. Directly north of our foxgloves. How many grid units between them?"',
        prompt: 'Distance from <em>foxgloves (3, 2)</em> to the <em>door (3, 8)</em>?',
        pointA: [3, 2],
        pointB: [3, 8],
        endpointA: 'Foxgloves',
        endpointB: 'Door',
        pathLabel: '6 paces',
        landmark: 'Door',
        answer: 6,
        gridSize: 10
      },
      {
        type: 'gridClick',
        story: 'The professor smiles. "Last bed, my dear naturalist. Your butterfly garden — somewhere the butterflies we measured will love. Plot it where you think they\'ll thrive. Try <em>(6, 6)</em>."',
        prompt: 'Plot the <em>butterfly garden</em> at <em>(6, 6)</em>.',
        target: { x: 6, y: 6 },
        landmark: 'Butterfly Garden',
        gridSize: 10
      }
    ]
  }
];

if (typeof window !== 'undefined') window.CHAPTERS = CHAPTERS;
