// environments.js — Rich procedural SVG fantasy environments for Realms of Mathematica

const Environments = {

  // Shared SVG defs for reusable gradients, filters, patterns
  _defs() {
    return `
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.3"/>
      </filter>
    `;
  },

  // Wrapper: creates an SVG scene
  scene(bgColor1, bgColor2, content, extra = '') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bgColor1}"/>
          <stop offset="100%" stop-color="${bgColor2}"/>
        </linearGradient>
        ${this._defs()}
        ${extra}
      </defs>
      <rect width="400" height="280" fill="url(#sky)"/>
      ${content}
    </svg>`;
  },

  // Helper: draw a detailed tree
  _tree(x, y, trunkH, canopyR, trunkColor, leafColors) {
    const t = trunkColor || '#5a3a1a';
    const leaves = leafColors || ['#2a7a2a', '#3a8a3a', '#1a6a1a'];
    const r = canopyR || 22;
    return `
      <rect x="${x - 4}" y="${y - trunkH}" width="8" height="${trunkH}" fill="${t}"/>
      <rect x="${x - 6}" y="${y - 3}" width="12" height="6" fill="${t}" rx="2"/>
      <circle cx="${x}" cy="${y - trunkH - r * 0.4}" r="${r}" fill="${leaves[0]}"/>
      <circle cx="${x - r * 0.6}" cy="${y - trunkH - r * 0.1}" r="${r * 0.75}" fill="${leaves[1]}"/>
      <circle cx="${x + r * 0.6}" cy="${y - trunkH - r * 0.15}" r="${r * 0.7}" fill="${leaves[2]}"/>
      <circle cx="${x - r * 0.3}" cy="${y - trunkH - r * 0.8}" r="${r * 0.5}" fill="${leaves[1]}"/>
      <circle cx="${x + r * 0.3}" cy="${y - trunkH - r * 0.7}" r="${r * 0.55}" fill="${leaves[0]}"/>
    `;
  },

  // Helper: draw a pine/conifer tree
  _pine(x, y, h, color) {
    const c = color || '#1a5a2a';
    const d = _envDarken(c);
    return `
      <rect x="${x - 3}" y="${y - h * 0.3}" width="6" height="${h * 0.35}" fill="#4a3018"/>
      <polygon points="${x},${y - h} ${x - h * 0.25},${y - h * 0.4} ${x + h * 0.25},${y - h * 0.4}" fill="${c}"/>
      <polygon points="${x},${y - h * 0.8} ${x - h * 0.3},${y - h * 0.2} ${x + h * 0.3},${y - h * 0.2}" fill="${d}"/>
      <polygon points="${x},${y - h * 0.55} ${x - h * 0.35},${y} ${x + h * 0.35},${y}" fill="${c}"/>
    `;
  },

  // Helper: draw a cloud
  _cloud(x, y, w) {
    return `
      <g opacity="0.6">
        <ellipse cx="${x}" cy="${y}" rx="${w * 0.4}" ry="${w * 0.15}" fill="#fff"/>
        <ellipse cx="${x - w * 0.25}" cy="${y + 2}" rx="${w * 0.25}" ry="${w * 0.12}" fill="#f0f0f0"/>
        <ellipse cx="${x + w * 0.25}" cy="${y + 1}" rx="${w * 0.3}" ry="${w * 0.13}" fill="#fff"/>
      </g>
    `;
  },

  // Helper: flickering torch
  _torch(x, y) {
    return `
      <rect x="${x - 2}" y="${y}" width="5" height="18" fill="#7a5230" rx="1"/>
      <ellipse cx="${x}" cy="${y - 2}" rx="7" ry="12" fill="#e8a030" opacity="0.85">
        <animate attributeName="ry" values="12;14;11;13;12" dur="0.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.85;0.95;0.75;0.9;0.85" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="${x}" cy="${y - 5}" rx="4" ry="8" fill="#ffcc44" opacity="0.8">
        <animate attributeName="ry" values="8;10;7;9;8" dur="0.7s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="${x}" cy="${y - 7}" rx="2" ry="5" fill="#fff4cc" opacity="0.7">
        <animate attributeName="ry" values="5;6;4;5" dur="0.5s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="${x}" cy="${y + 5}" r="45" fill="#e8a030" opacity="0.07">
        <animate attributeName="opacity" values="0.07;0.1;0.05;0.08;0.07" dur="1s" repeatCount="indefinite"/>
      </circle>
    `;
  },

  // Helper: floating particles
  _particles(count, xMin, xMax, yMin, yMax, color, sizeMax) {
    let p = '';
    for (let i = 0; i < count; i++) {
      const x = xMin + (i * 137) % (xMax - xMin);
      const y = yMin + (i * 97) % (yMax - yMin);
      const r = 0.5 + (i * 31) % (sizeMax * 10) / 10;
      const dur = 2 + (i % 4);
      const delay = (i * 0.7) % 3;
      p += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="0.5">
        <animate attributeName="cy" values="${y};${y - 15};${y}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0.8;0.3;0.5" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
      </circle>`;
    }
    return p;
  },

  // Helper: stars
  _stars(count) {
    let s = '';
    for (let i = 0; i < count; i++) {
      const x = (i * 83) % 400;
      const y = (i * 47) % 100;
      const r = 0.4 + (i % 3) * 0.3;
      const dur = 2 + (i % 3);
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.8;0.5;0.7" dur="${dur}s" begin="${(i * 0.5) % 3}s" repeatCount="indefinite"/>
      </circle>`;
    }
    return s;
  },

  // ============================================================
  // VILLAGE — warm, bustling town with detailed buildings
  // ============================================================
  village() {
    const extraDefs = `
      <radialGradient id="sunGlow" cx="85%" cy="15%" r="30%">
        <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#fff8e0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5aa836"/>
        <stop offset="100%" stop-color="#3a7a1a"/>
      </linearGradient>
    `;
    return this.scene('#5a9ad8', '#88c4e8', `
      <!-- Sun with glow -->
      <circle cx="340" cy="45" r="22" fill="#ffd700" filter="url(#softGlow)"/>
      <rect width="400" height="280" fill="url(#sunGlow)"/>

      <!-- Clouds -->
      ${this._cloud(80, 35, 60)}
      ${this._cloud(220, 25, 45)}

      <!-- Distant mountains -->
      <polygon points="0,160 50,90 100,140 150,80 200,150 250,95 320,145 370,100 400,130 400,180 0,180" fill="#6a9a6a" opacity="0.4"/>

      <!-- Rolling hills -->
      <ellipse cx="200" cy="200" rx="280" ry="55" fill="#6ab840"/>
      <ellipse cx="80" cy="210" rx="140" ry="45" fill="#5aaa30"/>

      <!-- Winding path -->
      <path d="M160,280 Q170,250 180,230 Q200,205 230,195 Q260,188 300,185 Q340,184 380,190" fill="none" stroke="#c4a56a" stroke-width="14" stroke-linecap="round" opacity="0.8"/>
      <path d="M160,280 Q170,250 180,230 Q200,205 230,195 Q260,188 300,185 Q340,184 380,190" fill="none" stroke="#d4b57a" stroke-width="8" stroke-linecap="round" opacity="0.4"/>

      <!-- House 1 (detailed) -->
      <g filter="url(#shadow)">
        <rect x="30" y="142" width="65" height="50" fill="#b87040" rx="1"/>
        <rect x="30" y="142" width="65" height="4" fill="#a06030"/>
        <polygon points="20,142 62,105 105,142" fill="#8b3030"/>
        <polygon points="25,142 62,110 100,142" fill="#9a3a3a"/>
        <rect x="28" y="132" width="4" height="12" fill="#666"/>
        <rect x="50" y="160" width="16" height="32" fill="#4a2a10" rx="1"/>
        <rect x="56" y="168" width="3" height="3" fill="#c8a030" rx="1"/>
        <rect x="78" y="153" width="12" height="14" fill="#aad4ff" rx="1"/>
        <line x1="84" y1="153" x2="84" y2="167" stroke="#7a5a3a" stroke-width="1"/>
        <line x1="78" y1="160" x2="90" y2="160" stroke="#7a5a3a" stroke-width="1"/>
        <rect x="38" y="153" width="10" height="12" fill="#aad4ff" rx="1"/>
        <line x1="43" y1="153" x2="43" y2="165" stroke="#7a5a3a" stroke-width="1"/>
      </g>

      <!-- House 2 (tavern style) -->
      <g filter="url(#shadow)">
        <rect x="115" y="148" width="58" height="44" fill="#b88050" rx="1"/>
        <polygon points="107,148 144,115 181,148" fill="#994422"/>
        <polygon points="112,148 144,120 176,148" fill="#aa5533"/>
        <rect x="130" y="164" width="14" height="28" fill="#4a2a10" rx="1"/>
        <rect x="135" y="172" width="3" height="3" fill="#c8a030" rx="1"/>
        <rect x="152" y="155" width="10" height="12" fill="#ffdd88" rx="1" opacity="0.8"/>
        <rect x="120" y="155" width="8" height="10" fill="#ffdd88" rx="1" opacity="0.6"/>
        <rect x="130" y="137" width="28" height="5" fill="#7a5a38"/>
        <text x="137" y="141" font-size="3.5" fill="#e8d5b0" font-family="serif">INN</text>
      </g>

      <!-- Well (detailed) -->
      <g>
        <ellipse cx="235" cy="195" rx="14" ry="6" fill="#888" stroke="#666" stroke-width="1"/>
        <rect x="222" y="185" width="26" height="12" fill="#999" stroke="#777" stroke-width="1" rx="2"/>
        <line x1="235" y1="172" x2="235" y2="186" stroke="#6a4a2a" stroke-width="3"/>
        <line x1="226" y1="172" x2="244" y2="172" stroke="#6a4a2a" stroke-width="2.5"/>
        <rect x="232" y="173" width="6" height="6" fill="#555" rx="1"/>
        <ellipse cx="235" cy="188" rx="8" ry="3" fill="#335" opacity="0.5"/>
      </g>

      <!-- Trees (detailed) -->
      ${this._tree(300, 195, 40, 24, '#5a3a1a', ['#2a7a2a', '#3a8a3a', '#1a6a1a'])}
      ${this._tree(355, 190, 35, 20, '#4a3018', ['#3a8a2a', '#4a9a3a', '#2a7a1a'])}

      <!-- Ground layer -->
      <rect x="0" y="210" width="400" height="70" fill="url(#grassGrad)" opacity="0.6"/>

      <!-- Fence -->
      ${[0,1,2,3].map(i => `
        <rect x="${5 + i * 18}" y="200" width="3" height="16" fill="#8b7355"/>
      `).join('')}
      <line x1="0" y1="206" x2="70" y2="206" stroke="#8b7355" stroke-width="2.5"/>
      <line x1="0" y1="212" x2="70" y2="212" stroke="#8b7355" stroke-width="2"/>

      <!-- Flowers in foreground -->
      ${[120, 155, 190, 260, 310, 350].map((x, i) => {
        const colors = ['#ff6688', '#ffcc44', '#88aaff', '#ff88cc', '#ffaa33', '#cc88ff'];
        const y = 218 + (i % 3) * 4;
        return `<circle cx="${x}" cy="${y}" r="3" fill="${colors[i]}"/>
                <line x1="${x}" y1="${y + 3}" x2="${x}" y2="${y + 10}" stroke="#3a7a2a" stroke-width="1"/>`;
      }).join('')}

      <!-- Birds -->
      <path d="M100,60 Q105,55 110,60" fill="none" stroke="#333" stroke-width="1.2" opacity="0.5"/>
      <path d="M115,55 Q120,50 125,55" fill="none" stroke="#333" stroke-width="1" opacity="0.4"/>
      <path d="M280,40 Q285,35 290,40" fill="none" stroke="#333" stroke-width="1" opacity="0.4"/>
    `, extraDefs);
  },

  // ============================================================
  // DUNGEON CORRIDOR — dark stone with torchlight and atmosphere
  // ============================================================
  dungeon_corridor() {
    const extraDefs = `
      <radialGradient id="torchLight1" cx="12%" cy="35%" r="25%">
        <stop offset="0%" stop-color="#e8a030" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#e8a030" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="torchLight2" cx="88%" cy="35%" r="25%">
        <stop offset="0%" stop-color="#e8a030" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#e8a030" stop-opacity="0"/>
      </radialGradient>
      <pattern id="stoneTile" width="50" height="25" patternUnits="userSpaceOnUse">
        <rect width="50" height="25" fill="#333348"/>
        <rect x="0" y="0" width="24" height="12" fill="#2e2e42" stroke="#2a2a3e" stroke-width="0.5" rx="1"/>
        <rect x="25" y="0" width="24" height="12" fill="#303045" stroke="#2a2a3e" stroke-width="0.5" rx="1"/>
        <rect x="12" y="13" width="24" height="11" fill="#2e2e42" stroke="#2a2a3e" stroke-width="0.5" rx="1"/>
      </pattern>
    `;
    return this.scene('#0e0e1a', '#1a1a2e', `
      <!-- Perspective walls -->
      <polygon points="0,0 70,65 70,280 0,280" fill="#252538"/>
      <polygon points="400,0 330,65 330,280 400,280" fill="#222235"/>
      <polygon points="0,0 400,0 330,65 70,65" fill="#1a1a28"/>

      <!-- Floor with stone tile pattern -->
      <rect x="70" y="155" width="260" height="125" fill="url(#stoneTile)"/>

      <!-- Wall stone texture -->
      ${[80, 105, 130].map(y => `
        <line x1="0" y1="${y}" x2="70" y2="${y * 0.7 + 20}" stroke="#1e1e30" stroke-width="0.8" opacity="0.5"/>
        <line x1="400" y1="${y}" x2="330" y2="${y * 0.7 + 20}" stroke="#1e1e30" stroke-width="0.8" opacity="0.5"/>
      `).join('')}

      <!-- Wall cracks -->
      <path d="M25,80 L30,95 L28,115 L32,130" fill="none" stroke="#1a1a28" stroke-width="0.8" opacity="0.5"/>
      <path d="M365,100 L370,120 L368,135" fill="none" stroke="#1a1a28" stroke-width="0.8" opacity="0.5"/>

      <!-- Torches with animated flames -->
      ${this._torch(52, 95)}
      ${this._torch(348, 95)}

      <!-- Torch glow overlays -->
      <rect width="400" height="280" fill="url(#torchLight1)"/>
      <rect width="400" height="280" fill="url(#torchLight2)"/>

      <!-- Cobwebs (detailed) -->
      <path d="M70,65 Q78,75 70,90 M70,65 Q82,68 90,65 M70,65 Q80,72 88,78" fill="none" stroke="#888" stroke-width="0.4" opacity="0.35"/>
      <path d="M330,65 Q322,75 330,90 M330,65 Q318,68 310,65 M330,65 Q320,72 312,78" fill="none" stroke="#888" stroke-width="0.4" opacity="0.35"/>

      <!-- Distant archway with depth -->
      <rect x="140" y="68" width="120" height="87" fill="#0a0a16" rx="60" ry="35"/>
      <rect x="148" y="72" width="104" height="83" fill="#080814" rx="52" ry="30"/>
      <path d="M155,155 L155,90 Q200,60 245,90 L245,155" fill="none" stroke="#2a2a40" stroke-width="3"/>

      <!-- Skull on floor -->
      <ellipse cx="110" cy="210" rx="6" ry="5" fill="#d8d0c0" opacity="0.3"/>
      <circle cx="108" cy="208" r="1.5" fill="#1a1a2e" opacity="0.3"/>
      <circle cx="112" cy="208" r="1.5" fill="#1a1a2e" opacity="0.3"/>

      <!-- Dust motes -->
      ${this._particles(8, 80, 320, 70, 150, '#e8d0a0', 1.5)}

      <!-- Dripping water -->
      <line x1="180" y1="65" x2="180" y2="75" stroke="#4a6a8a" stroke-width="0.8" opacity="0.3">
        <animate attributeName="y2" values="75;155;75" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.5;0" dur="3s" repeatCount="indefinite"/>
      </line>

      <!-- Vignette darkness at edges -->
      <rect x="0" y="0" width="400" height="280" fill="url(#sky)" opacity="0.15"/>
    `, extraDefs);
  },

  // ============================================================
  // FOREST CLEARING — lush, magical, dappled sunlight
  // ============================================================
  forest_clearing() {
    const extraDefs = `
      <radialGradient id="forestLight" cx="50%" cy="10%" r="40%">
        <stop offset="0%" stop-color="#ffffaa" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#ffffaa" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="forestFloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a7a2a"/>
        <stop offset="100%" stop-color="#2a5a1a"/>
      </linearGradient>
    `;
    return this.scene('#1a4a1a', '#2a6a2a', `
      <!-- Sky peeking through canopy -->
      <ellipse cx="200" cy="15" rx="120" ry="50" fill="#4a8ace" opacity="0.25"/>
      <ellipse cx="260" cy="25" rx="60" ry="30" fill="#5a9ade" opacity="0.15"/>

      <!-- Dense canopy (layered) -->
      <circle cx="20" cy="10" r="65" fill="#0e4a0e"/>
      <circle cx="100" cy="-10" r="75" fill="#1a5a1a"/>
      <circle cx="180" cy="5" r="50" fill="#0e4a0e"/>
      <circle cx="310" cy="-5" r="70" fill="#1a5a1a"/>
      <circle cx="390" cy="5" r="60" fill="#0e4a0e"/>
      <circle cx="50" cy="30" r="45" fill="#165016"/>
      <circle cx="350" cy="25" r="50" fill="#165016"/>

      <!-- Massive tree trunks -->
      <rect x="5" y="20" width="22" height="260" fill="#4a3018"/>
      <rect x="8" y="20" width="4" height="260" fill="#3a2510" opacity="0.4"/>
      <path d="M5,180 Q-5,190 -10,185" fill="none" stroke="#4a3018" stroke-width="6" stroke-linecap="round"/>
      <path d="M27,200 Q35,210 40,205" fill="none" stroke="#4a3018" stroke-width="5" stroke-linecap="round"/>

      <rect x="370" y="15" width="20" height="265" fill="#3a2810"/>
      <rect x="374" y="15" width="4" height="265" fill="#2a1a08" opacity="0.4"/>

      <!-- Mid-ground trees -->
      <rect x="110" y="-10" width="14" height="120" fill="#4a3018"/>
      <rect x="295" y="-5" width="15" height="100" fill="#3a2810"/>

      <!-- Hanging vines -->
      <path d="M120,40 Q115,70 118,100 Q114,130 120,155" fill="none" stroke="#2a6a1a" stroke-width="2" opacity="0.6"/>
      <path d="M300,30 Q296,60 298,90 Q294,110 300,130" fill="none" stroke="#2a6a1a" stroke-width="2" opacity="0.5"/>
      <path d="M22,50 Q18,80 20,110" fill="none" stroke="#1a5a0a" stroke-width="1.5" opacity="0.5"/>

      <!-- Ground clearing -->
      <ellipse cx="200" cy="230" rx="160" ry="50" fill="#3a8a2a"/>
      <rect x="0" y="230" width="400" height="50" fill="url(#forestFloor)"/>

      <!-- Mushroom cluster -->
      <g transform="translate(90,215)">
        <rect x="0" y="6" width="3" height="8" fill="#ddd"/>
        <ellipse cx="1.5" cy="6" rx="6" ry="4" fill="#cc3333"/>
        <circle cx="-1" cy="4" r="1" fill="#fff" opacity="0.7"/>
        <circle cx="3" cy="5" r="0.8" fill="#fff" opacity="0.7"/>
      </g>
      <g transform="translate(98,218)">
        <rect x="0" y="5" width="2.5" height="7" fill="#ddd"/>
        <ellipse cx="1.2" cy="5" rx="5" ry="3.5" fill="#dd4444"/>
        <circle cx="0" cy="3.5" r="0.8" fill="#fff" opacity="0.7"/>
      </g>

      <!-- Wildflowers scattered -->
      ${[140, 165, 195, 230, 255, 290, 320].map((x, i) => {
        const colors = ['#ff88cc', '#ffcc44', '#88ccff', '#ff88cc', '#cc88ff', '#ffaa44', '#88ffaa'];
        const y = 222 + (i % 4) * 3;
        return `
          <line x1="${x}" y1="${y + 3}" x2="${x}" y2="${y + 10}" stroke="#3a7a2a" stroke-width="0.8"/>
          <circle cx="${x}" cy="${y + 2}" r="2.5" fill="${colors[i]}"/>
          <circle cx="${x + 4}" cy="${y + 5}" r="2" fill="${colors[(i + 2) % 7]}"/>
        `;
      }).join('')}

      <!-- Light rays through canopy -->
      <polygon points="170,15 148,230 175,230" fill="#ffffaa" opacity="0.06"/>
      <polygon points="240,10 228,230 252,230" fill="#ffffaa" opacity="0.05"/>
      <polygon points="300,20 292,200 308,200" fill="#ffffaa" opacity="0.04"/>

      <!-- Light overlay -->
      <rect width="400" height="280" fill="url(#forestLight)"/>

      <!-- Fireflies / magical particles -->
      ${this._particles(10, 100, 300, 100, 220, '#aaff66', 2)}

      <!-- Butterfly -->
      <g opacity="0.8">
        <ellipse cx="250" cy="120" rx="5" ry="3.5" fill="#ff88cc">
          <animate attributeName="rx" values="5;2;5" dur="0.6s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="258" cy="120" rx="5" ry="3.5" fill="#ffaadd">
          <animate attributeName="rx" values="5;2;5" dur="0.6s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="254" cy="121" rx="1.5" ry="3" fill="#333"/>
        <animate attributeName="transform" type="translate" values="0,0;5,-3;-3,2;0,0" dur="4s" repeatCount="indefinite" attributeType="XML"/>
      </g>
    `, extraDefs);
  },

  // ============================================================
  // CAVE — dark, crystalline, atmospheric
  // ============================================================
  cave() {
    const extraDefs = `
      <radialGradient id="crystalGlow1" cx="14%" cy="72%" r="12%">
        <stop offset="0%" stop-color="#4488ff" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#4488ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="crystalGlow2" cx="84%" cy="70%" r="12%">
        <stop offset="0%" stop-color="#44ff88" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#44ff88" stop-opacity="0"/>
      </radialGradient>
    `;
    return this.scene('#060610', '#0e0e1e', `
      <!-- Cave ceiling (rough, organic shape) -->
      <path d="M0,0 Q30,25 60,10 Q90,35 120,15 Q150,40 180,20 Q210,45 240,10 Q270,30 300,15 Q330,40 360,20 Q390,30 400,5 L400,70 Q360,85 320,75 Q280,95 240,80 Q200,100 160,82 Q120,95 80,78 Q40,90 0,72 Z" fill="#1a1a2e"/>

      <!-- Stalactites (varied) -->
      <polygon points="75,72 80,120 85,72" fill="#252540"/>
      <polygon points="78,72 80,115 82,72" fill="#2a2a45"/>
      <polygon points="140,80 145,130 150,80" fill="#222238"/>
      <polygon points="143,80 145,125 147,80" fill="#282845"/>
      <polygon points="230,82 235,118 240,82" fill="#252540"/>
      <polygon points="310,74 315,105 320,74" fill="#222238"/>
      <polygon points="313,74 315,100 317,74" fill="#2a2a45"/>

      <!-- Cave floor (rough) -->
      <path d="M0,210 Q30,200 60,208 Q90,195 120,205 Q150,192 180,210 Q210,198 240,205 Q270,195 300,208 Q330,200 360,210 Q390,202 400,208 L400,280 L0,280 Z" fill="#1a1a2e"/>

      <!-- Stalagmites -->
      <polygon points="90,210 97,170 104,210" fill="#222238"/>
      <polygon points="94,210 97,175 100,210" fill="#282845"/>
      <polygon points="270,205 277,155 284,205" fill="#252540"/>
      <polygon points="274,205 277,160 280,205" fill="#2a2a48"/>

      <!-- Glowing crystal cluster LEFT -->
      <g>
        <polygon points="45,205 50,175 55,205" fill="#3377ee" opacity="0.7"/>
        <polygon points="48,205 50,180 52,205" fill="#55aaff" opacity="0.9"/>
        <polygon points="55,208 62,178 66,208" fill="#2266dd" opacity="0.6"/>
        <polygon points="58,208 62,182 64,208" fill="#4499ff" opacity="0.8"/>
        <polygon points="38,210 42,188 46,210" fill="#3388ee" opacity="0.5"/>
        ${this._particles(4, 38, 68, 170, 200, '#88bbff', 1.5)}
      </g>

      <!-- Glowing crystal cluster RIGHT -->
      <g>
        <polygon points="325,208 332,172 338,208" fill="#33dd77" opacity="0.7"/>
        <polygon points="328,208 332,178 335,208" fill="#55ffaa" opacity="0.8"/>
        <polygon points="340,205 345,180 350,205" fill="#22cc66" opacity="0.6"/>
        <polygon points="342,205 345,184 348,205" fill="#44ee88" opacity="0.8"/>
        ${this._particles(4, 322, 352, 168, 200, '#88ffbb', 1.5)}
      </g>

      <!-- Crystal glow overlays -->
      <rect width="400" height="280" fill="url(#crystalGlow1)"/>
      <rect width="400" height="280" fill="url(#crystalGlow2)"/>

      <!-- Water puddle with reflection -->
      <ellipse cx="200" cy="235" rx="50" ry="10" fill="#1a2a4a" opacity="0.6"/>
      <ellipse cx="200" cy="235" rx="40" ry="7" fill="#223366" opacity="0.4"/>
      <ellipse cx="195" cy="233" rx="15" ry="3" fill="#335588" opacity="0.3"/>

      <!-- Dripping water -->
      <circle cx="200" cy="100" r="1.5" fill="#4a6a9a" opacity="0.4">
        <animate attributeName="cy" values="100;233;100" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0.6;0" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      <!-- Cave floor detail (small rocks) -->
      <ellipse cx="155" cy="225" rx="5" ry="3" fill="#151528"/>
      <ellipse cx="250" cy="220" rx="4" ry="2.5" fill="#181830"/>
      <ellipse cx="180" cy="240" rx="3" ry="2" fill="#151528"/>

      <!-- Ambient darkness overlay -->
      <rect width="400" height="280" fill="#000" opacity="0.15"/>
    `, extraDefs);
  },

  // ============================================================
  // MOUNTAIN — dramatic peaks, snow, wind
  // ============================================================
  mountain() {
    const extraDefs = `
      <linearGradient id="mountainFace1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#7a8a9a"/>
        <stop offset="100%" stop-color="#5a6a7a"/>
      </linearGradient>
      <linearGradient id="mountainFace2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8a9aaa"/>
        <stop offset="100%" stop-color="#6a7a8a"/>
      </linearGradient>
    `;
    return this.scene('#3a5a7a', '#6a8aaa', `
      <!-- Far distant peaks -->
      <polygon points="-20,180 40,60 100,180" fill="#5a6878" opacity="0.5"/>
      <polygon points="300,180 380,40 420,130 420,180" fill="#4a5868" opacity="0.5"/>

      <!-- Main mountains -->
      <polygon points="50,190 155,40 260,190" fill="url(#mountainFace1)"/>
      <polygon points="155,40 260,190 200,190" fill="url(#mountainFace2)" opacity="0.7"/>
      <polygon points="180,190 290,25 400,190" fill="url(#mountainFace1)"/>
      <polygon points="290,25 400,190 340,190" fill="url(#mountainFace2)" opacity="0.7"/>
      <polygon points="-30,190 60,70 150,190" fill="#6a7a8a"/>

      <!-- Snow caps (detailed) -->
      <polygon points="155,40 135,75 150,70 145,85 160,75 170,90 165,72 175,75" fill="#eef4ff"/>
      <polygon points="290,25 270,60 280,55 275,70 290,60 300,72 295,58 310,65" fill="#eef4ff"/>
      <polygon points="60,70 45,95 55,90 50,105 65,95 75,108 70,92 80,98" fill="#dde8f4"/>

      <!-- Mountain texture lines -->
      <path d="M100,130 L120,120 L135,140" fill="none" stroke="#5a6878" stroke-width="0.8" opacity="0.4"/>
      <path d="M220,110 L240,100 L255,125" fill="none" stroke="#5a6878" stroke-width="0.8" opacity="0.4"/>
      <path d="M320,90 L340,80 L355,105" fill="none" stroke="#5a6878" stroke-width="0.8" opacity="0.4"/>

      <!-- Foreground rocky ground -->
      <path d="M0,210 Q40,195 80,205 Q120,190 160,200 Q200,192 240,202 Q280,195 320,205 Q360,198 400,208 L400,280 L0,280 Z" fill="#4a5a6a"/>

      <!-- Snow patches on ground -->
      <ellipse cx="80" cy="207" rx="25" ry="5" fill="#dde8f0" opacity="0.5"/>
      <ellipse cx="200" cy="200" rx="30" ry="4" fill="#dde8f0" opacity="0.4"/>
      <ellipse cx="320" cy="206" rx="20" ry="4" fill="#dde8f0" opacity="0.5"/>

      <!-- Rocks (3D-ish) -->
      <ellipse cx="140" cy="212" rx="18" ry="10" fill="#4a5a6a"/>
      <ellipse cx="140" cy="208" rx="16" ry="8" fill="#5a6a7a"/>
      <ellipse cx="280" cy="215" rx="14" ry="8" fill="#3a4a5a"/>
      <ellipse cx="280" cy="212" rx="12" ry="6" fill="#4a5a6a"/>
      <ellipse cx="55" cy="220" rx="20" ry="10" fill="#3a4a5a"/>
      <ellipse cx="55" cy="217" rx="18" ry="8" fill="#4a5a6a"/>

      <!-- Winding path -->
      <path d="M170,280 Q180,255 195,235 Q215,215 250,210 Q280,208 310,212" fill="none" stroke="#7a8a7a" stroke-width="10" opacity="0.35" stroke-linecap="round"/>

      <!-- Wind lines (animated) -->
      <line x1="40" y1="100" x2="130" y2="93" stroke="#dde8f0" stroke-width="1" opacity="0">
        <animate attributeName="opacity" values="0;0.35;0" dur="3s" repeatCount="indefinite"/>
      </line>
      <line x1="200" y1="75" x2="310" y2="68" stroke="#dde8f0" stroke-width="1" opacity="0">
        <animate attributeName="opacity" values="0;0.3;0" dur="3.5s" begin="1s" repeatCount="indefinite"/>
      </line>
      <line x1="80" y1="130" x2="180" y2="123" stroke="#dde8f0" stroke-width="0.8" opacity="0">
        <animate attributeName="opacity" values="0;0.25;0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
      </line>

      <!-- Snowflakes (animated falling) -->
      ${[25, 75, 130, 185, 240, 295, 350, 380].map((x, i) => {
        const y = 30 + (i * 41) % 120;
        const dur = 4 + (i % 3) * 2;
        const delay = (i * 0.8) % 3;
        return `<circle cx="${x}" cy="${y}" r="${1 + (i % 2) * 0.5}" fill="white" opacity="0.6">
          <animate attributeName="cy" values="${y};${y + 180}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
          <animate attributeName="cx" values="${x};${x + 15};${x - 10};${x + 5}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.8;0.4;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
      }).join('')}

      <!-- Eagle silhouette -->
      <path d="M310,50 Q315,45 320,48 Q325,45 330,50" fill="none" stroke="#333" stroke-width="1.2" opacity="0.3">
        <animate attributeName="transform" type="translate" values="0,0;-50,5;-100,0" dur="8s" repeatCount="indefinite" attributeType="XML"/>
      </path>
    `, extraDefs);
  },

  // ============================================================
  // CASTLE — grand dark fortress with atmosphere
  // ============================================================
  castle() {
    const extraDefs = `
      <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4466aa" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#2a2a4e" stop-opacity="0"/>
      </radialGradient>
    `;
    return this.scene('#0e0e20', '#1a1a30', `
      <!-- Night sky with stars -->
      ${this._stars(25)}

      <!-- Moon -->
      <circle cx="340" cy="50" r="20" fill="#dde8f0" opacity="0.8" filter="url(#softGlow)"/>
      <circle cx="348" cy="45" r="18" fill="#0e0e20"/>

      <!-- Castle silhouette (detailed) -->
      <!-- Main wall -->
      <rect x="40" y="100" width="320" height="180" fill="#2a2a44"/>

      <!-- Towers -->
      <rect x="30" y="60" width="45" height="220" fill="#252540"/>
      <rect x="325" y="65" width="45" height="215" fill="#252540"/>

      <!-- Tower tops (crenellations) -->
      ${[30, 42, 54, 62].map(x => `<rect x="${x}" y="52" width="8" height="12" fill="#252540"/>`).join('')}
      ${[325, 337, 349, 357].map(x => `<rect x="${x}" y="57" width="8" height="12" fill="#252540"/>`).join('')}

      <!-- Main wall battlements -->
      ${[85, 110, 135, 160, 185, 210, 235, 260, 285].map(x => `<rect x="${x}" y="92" width="18" height="12" fill="#2a2a44"/>`).join('')}

      <!-- Grand entrance archway -->
      <path d="M155,280 L155,155 Q200,120 245,155 L245,280" fill="#0a0a18" stroke="#333355" stroke-width="2"/>
      <path d="M160,280 L160,158 Q200,128 240,158 L240,280" fill="#080816"/>

      <!-- Portcullis hints -->
      ${[170, 185, 200, 215, 230].map(x => `<line x1="${x}" y1="145" x2="${x}" y2="280" stroke="#333" stroke-width="1.5" opacity="0.3"/>`).join('')}

      <!-- Windows with glow -->
      <rect x="90" y="130" width="22" height="30" fill="#0a0a18" rx="11" ry="8"/>
      <rect x="93" y="134" width="16" height="22" fill="#1a2a4a" rx="8" ry="6" opacity="0.5"/>
      <rect x="288" y="130" width="22" height="30" fill="#0a0a18" rx="11" ry="8"/>
      <rect x="291" y="134" width="16" height="22" fill="#1a2a4a" rx="8" ry="6" opacity="0.5"/>

      <!-- Tower windows -->
      <rect x="44" y="90" width="14" height="20" fill="#0a0a18" rx="7" ry="5"/>
      <rect x="46" y="93" width="10" height="14" fill="#1a2a4a" rx="5" ry="4" opacity="0.4"/>
      <rect x="342" y="95" width="14" height="20" fill="#0a0a18" rx="7" ry="5"/>
      <rect x="344" y="98" width="10" height="14" fill="#1a2a4a" rx="5" ry="4" opacity="0.4"/>

      <!-- Torches flanking entrance -->
      ${this._torch(145, 150)}
      ${this._torch(255, 150)}

      <!-- Banners -->
      <g>
        <rect x="100" y="165" width="16" height="35" fill="#8b0000" rx="1"/>
        <polygon points="100,200 108,210 116,200" fill="#8b0000"/>
        <line x1="108" y1="175" x2="108" y2="195" stroke="#cc8800" stroke-width="1"/>
        <circle cx="108" cy="180" r="3" fill="#cc8800" opacity="0.6"/>
      </g>
      <g>
        <rect x="284" y="165" width="16" height="35" fill="#8b0000" rx="1"/>
        <polygon points="284,200 292,210 300,200" fill="#8b0000"/>
        <line x1="292" y1="175" x2="292" y2="195" stroke="#cc8800" stroke-width="1"/>
        <circle cx="292" cy="180" r="3" fill="#cc8800" opacity="0.6"/>
      </g>

      <!-- Stone texture -->
      ${[120, 150, 180, 210, 240].map(y => `<line x1="75" y1="${y}" x2="325" y2="${y}" stroke="#222240" stroke-width="0.5" opacity="0.3"/>`).join('')}

      <!-- Ground/courtyard -->
      <rect x="0" y="260" width="400" height="20" fill="#1a1a30"/>

      <!-- Fog at base -->
      <ellipse cx="200" cy="270" rx="200" ry="20" fill="#2a2a44" opacity="0.4"/>
      <ellipse cx="150" cy="275" rx="100" ry="12" fill="#333355" opacity="0.2"/>
    `, extraDefs);
  },

  // ============================================================
  // TAVERN — cozy warm interior with fireplace
  // ============================================================
  tavern() {
    const extraDefs = `
      <radialGradient id="fireGlow" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#e8a030" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#e8a030" stop-opacity="0"/>
      </radialGradient>
      <pattern id="woodPlank" width="55" height="80" patternUnits="userSpaceOnUse">
        <rect width="55" height="80" fill="#5a4a30"/>
        <line x1="0" y1="0" x2="0" y2="80" stroke="#4a3a28" stroke-width="0.5" opacity="0.4"/>
        <line x1="27" y1="0" x2="27" y2="80" stroke="#4a3a28" stroke-width="0.3" opacity="0.3"/>
      </pattern>
    `;
    return this.scene('#3a2a1a', '#4a3a28', `
      <!-- Walls (wooden panels) -->
      <rect x="0" y="0" width="400" height="280" fill="#4a3a28"/>
      ${[0, 80, 160, 240, 320].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="175" stroke="#3a2a18" stroke-width="1" opacity="0.3"/>`).join('')}

      <!-- Floor (wood planks) -->
      <rect x="0" y="175" width="400" height="105" fill="url(#woodPlank)"/>

      <!-- Ceiling beams -->
      <rect x="0" y="15" width="400" height="10" fill="#3a2510" rx="2"/>
      <rect x="0" y="50" width="400" height="8" fill="#3a2510" rx="2"/>

      <!-- Fireplace (detailed) -->
      <rect x="145" y="55" width="110" height="105" fill="#2a1a0a"/>
      <rect x="135" y="48" width="130" height="12" fill="#5a4a38" rx="2"/>
      <rect x="140" y="155" width="120" height="10" fill="#5a4a38" rx="2"/>
      <!-- Brick texture -->
      ${[65, 80, 95, 110, 125, 140].map(y => `
        <line x1="150" y1="${y}" x2="250" y2="${y}" stroke="#1a0a00" stroke-width="0.5" opacity="0.3"/>
      `).join('')}

      <!-- Animated fire -->
      <g>
        <ellipse cx="200" cy="142" rx="30" ry="18" fill="#882200" opacity="0.7">
          <animate attributeName="ry" values="18;20;16;19;18" dur="0.6s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="200" cy="136" rx="22" ry="14" fill="#cc4400" opacity="0.85">
          <animate attributeName="ry" values="14;16;12;15;14" dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="200" cy="130" rx="15" ry="12" fill="#ee6600" opacity="0.9">
          <animate attributeName="ry" values="12;14;10;13;12" dur="0.4s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="200" cy="124" rx="8" ry="10" fill="#ffaa00" opacity="0.9">
          <animate attributeName="ry" values="10;12;8;11;10" dur="0.35s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="200" cy="118" rx="4" ry="7" fill="#ffdd44">
          <animate attributeName="ry" values="7;9;6;8;7" dur="0.3s" repeatCount="indefinite"/>
        </ellipse>
        <!-- Logs -->
        <rect x="175" y="148" width="50" height="6" fill="#4a2a10" rx="3"/>
        <rect x="180" y="143" width="40" height="6" fill="#5a3a18" rx="3" transform="rotate(-10 200 146)"/>
      </g>

      <!-- Fireplace glow -->
      <circle cx="200" cy="130" r="80" fill="#e8a030" opacity="0.1">
        <animate attributeName="opacity" values="0.1;0.14;0.08;0.12;0.1" dur="1s" repeatCount="indefinite"/>
      </circle>

      <!-- Mantle decorations -->
      <rect x="148" y="42" width="8" height="8" fill="#aa4444" rx="1"/>
      <rect x="244" y="42" width="8" height="8" fill="#aa4444" rx="1"/>

      <!-- Table left (detailed) -->
      <g filter="url(#shadow)">
        <rect x="15" y="178" width="100" height="6" fill="#6a5a3a" rx="1"/>
        <rect x="25" y="184" width="6" height="35" fill="#5a4a2a"/>
        <rect x="99" y="184" width="6" height="35" fill="#5a4a2a"/>
        <!-- Mugs and food -->
        <rect x="40" y="170" width="9" height="10" fill="#8a7a5a" rx="1"/>
        <rect x="38" y="173" width="2" height="5" fill="#8a7a5a"/>
        <ellipse cx="44" cy="170" rx="4" ry="1.5" fill="#997a4a"/>
        <rect x="65" y="170" width="9" height="10" fill="#8a7a5a" rx="1"/>
        <rect x="63" y="173" width="2" height="5" fill="#8a7a5a"/>
        <circle cx="90" cy="175" r="6" fill="#7a5a30"/>
        <ellipse cx="90" cy="174" rx="5" ry="4" fill="#aa8844"/>
      </g>

      <!-- Table right -->
      <g filter="url(#shadow)">
        <rect x="285" y="183" width="100" height="6" fill="#6a5a3a" rx="1"/>
        <rect x="295" y="189" width="6" height="35" fill="#5a4a2a"/>
        <rect x="369" y="189" width="6" height="35" fill="#5a4a2a"/>
        <!-- Candle on table -->
        <rect x="330" y="168" width="4" height="16" fill="#e8d5b0"/>
        <ellipse cx="332" cy="165" rx="3" ry="5" fill="#e8a030" opacity="0.9">
          <animate attributeName="ry" values="5;7;4;6;5" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="332" cy="163" r="2" fill="#ffdd66"/>
      </g>

      <!-- Barrel in corner -->
      <ellipse cx="380" cy="155" rx="14" ry="18" fill="#5a3a18"/>
      <ellipse cx="380" cy="155" rx="12" ry="16" fill="#6a4a28"/>
      <line x1="368" y1="150" x2="392" y2="150" stroke="#4a2a10" stroke-width="1.5"/>
      <line x1="368" y1="160" x2="392" y2="160" stroke="#4a2a10" stroke-width="1.5"/>

      <!-- Chandelier -->
      <line x1="200" y1="0" x2="200" y2="25" stroke="#5a4a2a" stroke-width="2"/>
      <path d="M180,28 Q200,32 220,28" fill="none" stroke="#5a4a2a" stroke-width="2"/>
      ${[183, 195, 207, 219].map(x => `
        <rect x="${x - 1}" y="28" width="3" height="8" fill="#e8d5b0"/>
        <ellipse cx="${x}" cy="26" rx="2.5" ry="4" fill="#e8a030" opacity="0.7">
          <animate attributeName="ry" values="4;5;3;4" dur="${0.5 + (x % 3) * 0.2}s" repeatCount="indefinite"/>
        </ellipse>
      `).join('')}

      <!-- Weapons on wall -->
      <line x1="300" y1="70" x2="300" y2="120" stroke="#888" stroke-width="2.5"/>
      <line x1="290" y1="85" x2="310" y2="85" stroke="#888" stroke-width="2"/>
      <ellipse cx="20" cy="100" rx="12" ry="14" fill="none" stroke="#888" stroke-width="2"/>

      <!-- Warm light overlay -->
      <rect width="400" height="280" fill="url(#fireGlow)" transform="translate(0,-20)"/>
    `, extraDefs);
  },

  // ============================================================
  // RUINS — ancient crumbling structures with vines and mystery
  // ============================================================
  ruins() {
    const extraDefs = `
      <radialGradient id="ruinGlow" cx="68%" cy="55%" r="15%">
        <stop offset="0%" stop-color="#aa88ff" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#aa88ff" stop-opacity="0"/>
      </radialGradient>
    `;
    return this.scene('#3a5a3a', '#5a7a4a', `
      <!-- Sky -->
      <rect x="0" y="0" width="400" height="130" fill="#6a9aba" opacity="0.3"/>
      ${this._cloud(100, 30, 50)}
      ${this._cloud(300, 20, 40)}

      <!-- Distant tree line -->
      ${[0, 30, 55, 80, 110, 340, 365, 390].map(x => this._pine(x, 140, 60 + (x * 7) % 30, '#2a5a2a')).join('')}

      <!-- Broken columns (detailed) -->
      <g>
        <rect x="45" y="85" width="24" height="130" fill="#8a8a7a"/>
        <rect x="45" y="85" width="6" height="130" fill="#7a7a6a"/>
        <rect x="42" y="80" width="30" height="8" fill="#9a9a8a" rx="1"/>
        <rect x="42" y="210" width="30" height="8" fill="#9a9a8a" rx="1"/>
        <!-- Column fluting -->
        ${[50, 56, 62].map(x => `<line x1="${x}" y1="88" x2="${x}" y2="210" stroke="#7a7a6a" stroke-width="0.5" opacity="0.4"/>`).join('')}
      </g>

      <g>
        <rect x="115" y="105" width="22" height="110" fill="#8a8a7a"/>
        <rect x="115" y="105" width="5" height="110" fill="#7a7a6a"/>
        <rect x="112" y="100" width="28" height="8" fill="#9a9a8a" rx="1"/>
        <!-- Broken top -->
        <path d="M112,100 L118,88 L125,95 L132,85 L140,100" fill="#8a8a7a"/>
      </g>

      <!-- Broken wall (detailed) -->
      <path d="M200,75 L200,215 L360,215 L360,95 L340,85 L320,100 L300,80 L280,95 L260,78 L240,92 L220,75 Z" fill="#7a7a6a"/>
      <path d="M200,75 L200,215 L210,215 L210,80" fill="#6a6a5a"/>
      <!-- Window in wall -->
      <rect x="260" y="125" width="35" height="45" fill="#4a5a3a" rx="17" ry="12"/>
      <rect x="264" y="130" width="27" height="35" fill="#3a4a2a" rx="13" ry="9"/>
      <!-- Stone texture -->
      ${[100, 130, 160, 190].map(y => `<line x1="205" y1="${y}" x2="355" y2="${y}" stroke="#6a6a5a" stroke-width="0.5" opacity="0.3"/>`).join('')}

      <!-- Arch remains (detailed) -->
      <path d="M75,108 Q130,50 185,108" fill="none" stroke="#8a8a7a" stroke-width="12"/>
      <path d="M80,108 Q130,58 180,108" fill="none" stroke="#9a9a8a" stroke-width="6"/>

      <!-- Ground -->
      <path d="M0,215 Q100,208 200,215 Q300,210 400,218 L400,280 L0,280 Z" fill="#4a6a3a"/>
      <rect x="0" y="225" width="400" height="55" fill="#3a5a2a"/>

      <!-- Moss and vines on columns -->
      <path d="M50,85 Q46,110 52,135 Q48,160 55,185 Q50,200 54,215" fill="none" stroke="#2a7a2a" stroke-width="3" opacity="0.6"/>
      <path d="M120,100 Q116,125 122,150 Q118,170 124,190" fill="none" stroke="#2a7a2a" stroke-width="2.5" opacity="0.55"/>
      <!-- Vine on wall -->
      <path d="M210,80 Q220,100 215,120 Q225,140 220,160 Q230,180 225,200" fill="none" stroke="#1a6a1a" stroke-width="2" opacity="0.5"/>
      <!-- Leaf clusters -->
      ${[52, 118, 222].map((x, i) => {
        const y = [140, 150, 160][i];
        return `<circle cx="${x}" cy="${y}" r="4" fill="#3a8a3a" opacity="0.5"/>
                <circle cx="${x + 3}" cy="${y + 4}" r="3" fill="#2a7a2a" opacity="0.4"/>`;
      }).join('')}

      <!-- Fallen stones -->
      <ellipse cx="160" cy="218" rx="14" ry="8" fill="#7a7a6a"/>
      <ellipse cx="160" cy="215" rx="12" ry="6" fill="#8a8a7a"/>
      <rect x="310" y="215" width="18" height="12" fill="#7a7a6a" rx="2"/>

      <!-- Mysterious glowing rune -->
      <circle cx="277" cy="147" r="8" fill="#aa88ff" opacity="0.15" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.15;0.25;0.1;0.2;0.15" dur="3s" repeatCount="indefinite"/>
      </circle>
      <text x="273" y="151" font-size="10" fill="#aa88ff" opacity="0.4" font-family="serif">&#x2726;</text>

      <!-- Glow overlay -->
      <rect width="400" height="280" fill="url(#ruinGlow)"/>

      <!-- Floating particles (magic residue) -->
      ${this._particles(6, 200, 360, 90, 200, '#bb99ff', 1.5)}
    `, extraDefs);
  },

  // ============================================================
  // RIVER — flowing water with bridge and lush banks
  // ============================================================
  river() {
    const extraDefs = `
      <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a6aaa"/>
        <stop offset="100%" stop-color="#1a4a7a"/>
      </linearGradient>
    `;
    return this.scene('#5a9ace', '#7ab88a', `
      <!-- Sky elements -->
      ${this._cloud(90, 30, 55)}
      ${this._cloud(280, 22, 45)}

      <!-- Far bank with trees -->
      <ellipse cx="200" cy="115" rx="240" ry="30" fill="#4a8a3a"/>

      <!-- Trees on far bank -->
      ${this._tree(60, 110, 30, 18, '#4a3018', ['#2a7a2a', '#3a8a3a', '#1a6a1a'])}
      ${this._tree(150, 108, 25, 15, '#3a2810', ['#3a8a2a', '#4a9a3a', '#2a7a1a'])}
      ${this._pine(330, 108, 50, '#1a5a2a')}
      ${this._pine(360, 112, 40, '#2a6a3a')}

      <!-- River (flowing) -->
      <path d="M0,135 Q100,128 200,145 Q300,160 400,148 L400,210 Q300,205 200,218 Q100,225 0,212 Z" fill="url(#waterGrad)" opacity="0.75"/>

      <!-- Water surface highlights -->
      <path d="M30,155 Q55,150 80,156" fill="none" stroke="#5a9add" stroke-width="1.5" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.15;0.35" dur="2s" repeatCount="indefinite"/>
      </path>
      <path d="M130,172 Q160,167 190,173" fill="none" stroke="#5a9add" stroke-width="1.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
      </path>
      <path d="M250,162 Q285,157 320,163" fill="none" stroke="#5a9add" stroke-width="1.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.12;0.3" dur="2.2s" begin="1s" repeatCount="indefinite"/>
      </path>
      <path d="M100,190 Q130,185 160,191" fill="none" stroke="#5a9add" stroke-width="1" opacity="0.25">
        <animate attributeName="opacity" values="0.25;0.1;0.25" dur="3s" repeatCount="indefinite"/>
      </path>

      <!-- Stone bridge (detailed) -->
      <path d="M140,138 Q200,112 260,143" fill="none" stroke="#7a6a50" stroke-width="12"/>
      <path d="M140,138 Q200,115 260,143" fill="none" stroke="#8a7a60" stroke-width="6"/>
      <!-- Bridge rails -->
      <rect x="148" y="120" width="5" height="22" fill="#7a6a50" rx="1"/>
      <rect x="247" y="125" width="5" height="22" fill="#7a6a50" rx="1"/>
      <rect x="195" y="112" width="5" height="18" fill="#7a6a50" rx="1"/>
      <!-- Arch under bridge -->
      <path d="M155,145 Q200,165 245,148" fill="none" stroke="#5a4a38" stroke-width="3" opacity="0.6"/>

      <!-- Near bank -->
      <path d="M0,210 Q80,200 160,212 Q240,220 320,210 Q380,206 400,212 L400,280 L0,280 Z" fill="#4a8a3a"/>
      <path d="M0,225 Q100,218 200,225 Q300,230 400,222 L400,280 L0,280 Z" fill="#3a7a2a"/>

      <!-- Reeds (detailed) -->
      ${[25, 30, 35, 38].map(x => `
        <line x1="${x}" y1="212" x2="${x - 2}" y2="185" stroke="#3a6a2a" stroke-width="1.5"/>
        <ellipse cx="${x - 3}" cy="184" rx="2" ry="4" fill="#5a8a4a" opacity="0.6"/>
      `).join('')}
      ${[365, 370, 375, 378].map(x => `
        <line x1="${x}" y1="210" x2="${x + 2}" y2="186" stroke="#3a6a2a" stroke-width="1.5"/>
        <ellipse cx="${x + 3}" cy="185" rx="2" ry="4" fill="#5a8a4a" opacity="0.6"/>
      `).join('')}

      <!-- Rocks in water -->
      <ellipse cx="110" cy="185" rx="10" ry="6" fill="#5a6a7a"/>
      <ellipse cx="110" cy="183" rx="8" ry="4" fill="#6a7a8a"/>
      <ellipse cx="330" cy="178" rx="7" ry="4" fill="#5a6a7a"/>
      <ellipse cx="330" cy="176" rx="6" ry="3" fill="#6a7a8a"/>

      <!-- Fish jumping -->
      <path d="M280,175 Q282,168 286,172 Q284,170 280,175" fill="#7a8a9a" opacity="0.4"/>

      <!-- Wildflowers on bank -->
      ${[50, 90, 200, 260, 340].map((x, i) => {
        const colors = ['#ff88cc', '#ffcc44', '#88aaff', '#ffaa44', '#cc88ff'];
        const y = 218 + (i % 3) * 3;
        return `<circle cx="${x}" cy="${y}" r="2.5" fill="${colors[i]}"/>
                <line x1="${x}" y1="${y + 2}" x2="${x}" y2="${y + 8}" stroke="#3a6a2a" stroke-width="0.8"/>`;
      }).join('')}

      <!-- Dragonfly -->
      <g opacity="0.5">
        <line x1="180" y1="130" x2="190" y2="130" stroke="#44aadd" stroke-width="1"/>
        <line x1="183" y1="127" x2="187" y2="127" stroke="#88ccee" stroke-width="2" opacity="0.5"/>
        <line x1="183" y1="133" x2="187" y2="133" stroke="#88ccee" stroke-width="2" opacity="0.5"/>
      </g>
    `, extraDefs);
  },

  // ============================================================
  // LIBRARY — grand magical library with candles and books
  // ============================================================
  library() {
    const extraDefs = `
      <radialGradient id="candleLight" cx="50%" cy="55%" r="35%">
        <stop offset="0%" stop-color="#e8a030" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#e8a030" stop-opacity="0"/>
      </radialGradient>
    `;
    return this.scene('#1a1210', '#2a2018', `
      <!-- Back wall (warm wood) -->
      <rect x="0" y="0" width="400" height="280" fill="#3a2a1a"/>

      <!-- Grand bookshelf LEFT -->
      <rect x="5" y="15" width="130" height="215" fill="#4a3018"/>
      <rect x="5" y="15" width="5" height="215" fill="#3a2510"/>
      <rect x="130" y="15" width="5" height="215" fill="#3a2510"/>
      <!-- Shelf boards -->
      ${[0, 1, 2, 3, 4].map(i => `<rect x="10" y="${25 + i * 42}" width="120" height="3" fill="#5a4020"/>`).join('')}
      <!-- Books (varied heights, colors, styles) -->
      ${[
        [13, 28, 8, 32, '#8b0000'], [22, 30, 7, 30, '#00008b'], [30, 28, 9, 32, '#006400'],
        [40, 31, 6, 29, '#8b8000'], [47, 28, 8, 32, '#4a0082'], [56, 30, 7, 30, '#8b4513'],
        [64, 29, 10, 31, '#2f4f4f'], [75, 28, 6, 32, '#800080'], [82, 32, 8, 28, '#b22222'],
        [91, 28, 9, 32, '#006060'], [101, 30, 7, 30, '#555522'], [109, 28, 8, 32, '#882244'],
        [118, 31, 6, 29, '#224488'],
        [13, 70, 9, 32, '#4a0082'], [23, 72, 7, 30, '#8b0000'], [31, 68, 10, 34, '#006400'],
        [42, 73, 6, 29, '#b22222'], [49, 70, 8, 32, '#00008b'], [58, 72, 7, 30, '#884400'],
        [66, 69, 9, 33, '#226644'],
        [13, 112, 8, 32, '#800080'], [22, 114, 7, 30, '#006060'], [30, 112, 9, 32, '#8b4513'],
        [40, 115, 6, 29, '#8b8000'], [47, 112, 10, 32, '#4a0082'],
        [13, 154, 7, 30, '#8b0000'], [21, 152, 8, 32, '#006400'], [30, 155, 6, 29, '#00008b'],
        [37, 152, 9, 32, '#b22222'],
        [13, 196, 8, 28, '#2f4f4f'], [22, 194, 7, 30, '#800080'], [30, 197, 6, 27, '#8b8000'],
      ].map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" rx="0.5"/>`).join('')}

      <!-- Grand bookshelf RIGHT -->
      <rect x="265" y="15" width="130" height="215" fill="#4a3018"/>
      <rect x="265" y="15" width="5" height="215" fill="#3a2510"/>
      <rect x="390" y="15" width="5" height="215" fill="#3a2510"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="270" y="${25 + i * 42}" width="120" height="3" fill="#5a4020"/>`).join('')}
      ${[
        [273, 28, 8, 32, '#006400'], [282, 30, 7, 30, '#8b0000'], [290, 28, 9, 32, '#4a0082'],
        [300, 31, 7, 29, '#00008b'], [308, 28, 8, 32, '#b22222'], [317, 30, 10, 30, '#226644'],
        [328, 28, 6, 32, '#884400'], [335, 32, 8, 28, '#555522'],
        [273, 70, 8, 32, '#800080'], [282, 72, 7, 30, '#006060'], [290, 70, 9, 32, '#8b4513'],
        [300, 73, 7, 29, '#8b0000'], [308, 70, 8, 32, '#224488'],
        [273, 112, 7, 32, '#00008b'], [281, 114, 8, 30, '#006400'], [290, 112, 9, 32, '#b22222'],
        [273, 154, 8, 30, '#8b8000'], [282, 154, 7, 30, '#4a0082'], [290, 156, 9, 28, '#800080'],
        [273, 196, 8, 28, '#8b0000'], [282, 196, 7, 28, '#006400'],
      ].map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" rx="0.5"/>`).join('')}

      <!-- Reading desk (detailed) -->
      <g filter="url(#shadow)">
        <rect x="150" y="170" width="100" height="7" fill="#5a4a30" rx="1"/>
        <rect x="160" y="177" width="7" height="45" fill="#4a3a20"/>
        <rect x="233" y="177" width="7" height="45" fill="#4a3a20"/>
        <rect x="155" y="217" width="90" height="5" fill="#4a3a20" rx="1"/>
      </g>

      <!-- Open book on desk -->
      <g>
        <rect x="170" y="157" width="28" height="18" fill="#e8d5b0" rx="1"/>
        <rect x="198" y="157" width="28" height="18" fill="#dcc8a0" rx="1"/>
        <line x1="198" y1="157" x2="198" y2="175" stroke="#bbb" stroke-width="0.5"/>
        <!-- Text lines -->
        ${[160, 163, 166, 169].map(y => `<line x1="173" y1="${y}" x2="194" y2="${y}" stroke="#8a7a6a" stroke-width="0.5" opacity="0.4"/>`).join('')}
        ${[160, 163, 166, 169].map(y => `<line x1="201" y1="${y}" x2="222" y2="${y}" stroke="#8a7a6a" stroke-width="0.5" opacity="0.4"/>`).join('')}
      </g>

      <!-- Candelabras on desk -->
      <g>
        <rect x="155" y="148" width="3" height="14" fill="#c8b880"/>
        <rect x="153" y="160" width="7" height="3" fill="#aa9a70" rx="1"/>
        <ellipse cx="156" cy="145" rx="3" ry="5" fill="#e8a030" opacity="0.85">
          <animate attributeName="ry" values="5;7;4;6;5" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="156" cy="143" r="1.5" fill="#ffdd66"/>
      </g>
      <g>
        <rect x="240" y="148" width="3" height="14" fill="#c8b880"/>
        <rect x="238" y="160" width="7" height="3" fill="#aa9a70" rx="1"/>
        <ellipse cx="241" cy="145" rx="3" ry="5" fill="#e8a030" opacity="0.85">
          <animate attributeName="ry" values="5;6;4;5" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="241" cy="143" r="1.5" fill="#ffdd66"/>
      </g>

      <!-- Candle glow -->
      <circle cx="156" cy="150" r="30" fill="#e8a030" opacity="0.06">
        <animate attributeName="opacity" values="0.06;0.09;0.04;0.07;0.06" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="241" cy="150" r="30" fill="#e8a030" opacity="0.06">
        <animate attributeName="opacity" values="0.06;0.08;0.05;0.07;0.06" dur="1.1s" repeatCount="indefinite"/>
      </circle>

      <!-- Globe on pedestal -->
      <rect x="145" y="70" width="8" height="30" fill="#5a4a38"/>
      <circle cx="149" cy="65" r="12" fill="#2a4a6a" opacity="0.6"/>
      <circle cx="149" cy="65" r="10" fill="#3a5a7a" opacity="0.5"/>
      <path d="M140,65 Q149,58 158,65" fill="none" stroke="#5a7a9a" stroke-width="0.5" opacity="0.5"/>
      <line x1="149" y1="53" x2="149" y2="77" stroke="#5a7a9a" stroke-width="0.5" opacity="0.4"/>

      <!-- Floor -->
      <rect x="0" y="230" width="400" height="50" fill="#2a1a0a"/>

      <!-- Ornate rug -->
      <ellipse cx="200" cy="248" rx="80" ry="18" fill="#6a1a2a" opacity="0.5"/>
      <ellipse cx="200" cy="248" rx="65" ry="14" fill="#5a1020" opacity="0.3"/>
      <ellipse cx="200" cy="248" rx="50" ry="10" fill="#7a2a3a" opacity="0.2"/>

      <!-- Warm light overlay -->
      <rect width="400" height="280" fill="url(#candleLight)"/>

      <!-- Dust motes in candlelight -->
      ${this._particles(6, 140, 260, 100, 170, '#e8d0a0', 1)}
    `, extraDefs);
  },

  // Get environment by name
  get(name) {
    const envMap = {
      'village': this.village,
      'dungeon_corridor': this.dungeon_corridor,
      'dungeon': this.dungeon_corridor,
      'forest_clearing': this.forest_clearing,
      'forest': this.forest_clearing,
      'cave': this.cave,
      'mountain': this.mountain,
      'frozen_peaks': this.mountain,
      'castle': this.castle,
      'dragon_lair': this.castle,
      'tavern': this.tavern,
      'ruins': this.ruins,
      'river': this.river,
      'library': this.library
    };
    const fn = envMap[name] || envMap['village'];
    return fn.call(this);
  }
};

// ============================================================
// SCENE CHARACTER OVERLAYS
// ============================================================
// NPC figure generator — simple pixel-art figures for scene overlays
const SceneCharacters = {

  // Small NPC figure as SVG (10x16 pixel grid at given scale)
  npcFigure(type, scale = 2) {
    const presets = {
      elder:    { skin: '#f5c5a3', hair: '#cccccc', robe: '#5a4a8a', robeD: '#3a2a6a', hat: false, beard: '#bbbbbb' },
      brenna:   { skin: '#deb587', hair: '#8b4513', robe: '#8b5e3c', robeD: '#6a4a2c', hat: false, apron: '#e8d8c0' },
      tam:      { skin: '#f5c5a3', hair: '#8b4513', robe: '#5a7a3a', robeD: '#3a5a2a', hat: false, child: true },
      lysara:   { skin: '#f0dcc0', hair: '#daa520', robe: '#2a5a8a', robeD: '#1a3a6a', hat: false, ears: true },
      grik:     { skin: '#5a8a3a', hair: null,       robe: '#554433', robeD: '#443322', hat: false, goblin: true },
      nix:      { skin: '#5a8a3a', hair: null,       robe: '#443355', robeD: '#332244', hat: false, goblin: true },
      pip:      { fairy: true },
      merchant: { skin: '#c49a6c', hair: '#2c1810', robe: '#8a6a3a', robeD: '#6a4a2a', hat: true },
      willow:   { skin: '#8dc49a', hair: '#2a5a2a', robe: '#3a7a4a', robeD: '#2a5a3a', hat: false },
      helga:    { skin: '#f5c5a3', hair: '#c0392b', robe: '#7a5a3a', robeD: '#5a3a2a', hat: false, short: true },
      kael:     { skin: '#c49a6c', hair: '#2c1810', robe: '#4a6a4a', robeD: '#3a5a3a', hat: false, cloak: '#2a4a2a' },
      tormund:  { skin: '#aabbcc', hair: '#8899aa', robe: '#667788', robeD: '#556677', hat: false, ghost: true },
      morvina:  { skin: '#d0c0d0', hair: '#4a1a4a', robe: '#3a1a3a', robeD: '#2a0a2a', hat: true },
      villager: { skin: '#f5c5a3', hair: '#8b4513', robe: '#7a6a5a', robeD: '#5a4a3a', hat: false }
    };
    const p = presets[type] || presets.villager;

    // Fairy is special — just a glowing dot
    if (p.fairy) {
      const s = scale;
      return `<svg width="${8*s}" height="${8*s}" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="2" fill="#aaffaa" opacity="0.9"/>
        <circle cx="4" cy="4" r="3.5" fill="#aaffaa" opacity="0.25"/>
        <ellipse cx="2" cy="3" rx="1.5" ry="0.7" fill="#ccffcc" opacity="0.5" transform="rotate(-20 2 3)"/>
        <ellipse cx="6" cy="3" rx="1.5" ry="0.7" fill="#ccffcc" opacity="0.5" transform="rotate(20 6 3)"/>
      </svg>`;
    }

    const w = 10, h = p.child ? 12 : 16;
    const s = scale;
    let rects = '';
    const px = (x, y, c) => { rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`; };
    const row = (y, x, w2, c) => { rects += `<rect x="${x}" y="${y}" width="${w2}" height="1" fill="${c}"/>`; };

    const sk = p.skin, hr = p.hair, rb = p.robe, rd = p.robeD;
    const ghost = p.ghost ? ' opacity="0.6"' : '';

    // Head
    if (hr) { row(0, 3, 4, hr); }
    row(1, 3, 4, sk);
    px(4, 1, '#1a1a2e'); px(6, 1, '#1a1a2e'); // eyes
    row(2, 3, 4, sk);
    if (p.goblin) { px(2, 1, p.skin); px(8, 1, p.skin); } // ears
    if (p.ears) { px(2, 1, sk); px(8, 1, sk); } // elf ears
    if (p.beard) { row(3, 3, 4, p.beard); }

    // Hat
    if (p.hat) { row(0, 3, 4, rd); rects += `<rect x="4" y="-1" width="2" height="1" fill="${rd}"/>`; }

    // Body
    const bodyStart = p.child ? 3 : 3;
    row(bodyStart, 2, 6, rb);
    row(bodyStart + 1, 2, 6, rb);
    row(bodyStart + 2, 2, 6, rd);
    row(bodyStart + 3, 2, 6, rd);
    if (p.apron) { px(4, bodyStart + 1, p.apron); px(5, bodyStart + 1, p.apron); px(4, bodyStart + 2, p.apron); px(5, bodyStart + 2, p.apron); }

    // Arms
    px(1, bodyStart + 1, sk); px(8, bodyStart + 1, sk);
    px(1, bodyStart + 2, sk); px(8, bodyStart + 2, sk);

    if (!p.child) {
      // Legs
      row(bodyStart + 4, 3, 2, rd);
      row(bodyStart + 4, 5, 2, rd);
      row(bodyStart + 5, 3, 2, '#3a2518');
      row(bodyStart + 5, 5, 2, '#3a2518');
    }

    // Cloak
    if (p.cloak) {
      px(1, bodyStart, p.cloak); px(8, bodyStart, p.cloak);
      px(1, bodyStart + 1, p.cloak); px(8, bodyStart + 1, p.cloak);
    }

    return `<svg width="${w*s}" height="${h*s}" viewBox="0 0 ${w} ${h}"${ghost}>${rects}</svg>`;
  },

  // Determine which characters to show for a story node
  getCharacters(node, gameCharacter) {
    const chars = [];
    const narrative = (node.narrative || '').toLowerCase();

    // Always show the hero
    chars.push({ type: 'hero', position: 'center' });

    // Check for named NPCs in the narrative
    const npcChecks = [
      { name: 'elder',    keywords: ['the elder', 'elder strokes', 'elder warns', 'village elder', 'old man'] },
      { name: 'brenna',   keywords: ['brenna'] },
      { name: 'tam',      keywords: ['tam '] },  // space to avoid "master"
      { name: 'lysara',   keywords: ['lysara'] },
      { name: 'grik',     keywords: ['grik'] },
      { name: 'nix',      keywords: ['nix ','nix,','nix\''] },
      { name: 'pip',      keywords: ['pip ','pip,','pip\'','pip!','a fairy'] },
      { name: 'willow',   keywords: ['willow'] },
      { name: 'helga',    keywords: ['helga'] },
      { name: 'kael',     keywords: ['kael'] },
      { name: 'tormund',  keywords: ['tormund'] },
      { name: 'morvina',  keywords: ['morvina'] },
      { name: 'merchant', keywords: ['merchant'] }
    ];

    let npcCount = 0;
    const positions = ['left', 'right', 'far-left', 'far-right'];
    for (const npc of npcChecks) {
      if (npc.keywords.some(kw => narrative.includes(kw))) {
        chars.push({ type: npc.name, position: positions[npcCount % positions.length] });
        npcCount++;
        if (npcCount >= 3) break; // max 3 NPCs in scene
      }
    }

    // Check for encounter monsters
    if (node.encounter && node.encounter.monster) {
      chars.push({ type: 'monster', monsterSprite: node.encounter.monster.sprite, position: 'right' });
      // Shift any NPC on 'right' to 'far-right'
      chars.forEach(c => { if (c.type !== 'monster' && c.position === 'right') c.position = 'far-right'; });
    }

    return chars;
  },

  // Render the character overlay HTML (positioned divs over the scene)
  renderOverlay(characters, gameCharacter) {
    if (!characters || characters.length === 0) return '';

    // Position mapping (percentage from left, percentage from bottom)
    const posMap = {
      'far-left':  { left: '10%', bottom: '12%' },
      'left':      { left: '22%', bottom: '10%' },
      'center':    { left: '42%', bottom: '8%' },
      'right':     { left: '62%', bottom: '10%' },
      'far-right': { left: '78%', bottom: '12%' }
    };

    const spriteScale = 3;
    let html = '';
    for (const char of characters) {
      const pos = posMap[char.position] || posMap.center;
      let spriteHtml = '';

      if (char.type === 'hero' && gameCharacter) {
        spriteHtml = Sprites.player(gameCharacter.race, gameCharacter.class, gameCharacter.appearance, spriteScale, gameCharacter.equipment);
      } else if (char.type === 'monster' && char.monsterSprite) {
        spriteHtml = Sprites.monster(char.monsterSprite, spriteScale);
      } else {
        spriteHtml = this.npcFigure(char.type, spriteScale);
      }

      html += `<div class="scene-character" style="left:${pos.left};bottom:${pos.bottom};">${spriteHtml}</div>`;
    }

    return html;
  }
};

// --- Utility (module-level) ---
function _envDarken(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 30);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 30);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 30);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
