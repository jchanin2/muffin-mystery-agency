// environments.js — Procedural SVG fantasy environments for Realms of Mathematica

const Environments = {
  // Wrapper: creates an SVG scene with gradient sky and content
  scene(bgColor1, bgColor2, content) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bgColor1}"/>
          <stop offset="100%" stop-color="${bgColor2}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#sky)"/>
      ${content}
    </svg>`;
  },

  // Village — warm, peaceful town with houses and a path
  village() {
    return this.scene('#6ba3d6', '#a8d5a2', `
      <!-- Sun -->
      <circle cx="340" cy="50" r="30" fill="#ffd700" opacity="0.8"/>
      <!-- Distant hills -->
      <ellipse cx="200" cy="200" rx="250" ry="60" fill="#7ab856"/>
      <ellipse cx="80" cy="210" rx="120" ry="50" fill="#6aaa46"/>
      <!-- Path -->
      <path d="M180,250 Q190,220 200,200 Q220,170 250,160 Q280,155 320,160" fill="none" stroke="#c4a56a" stroke-width="12" stroke-linecap="round"/>
      <!-- House 1 -->
      <rect x="40" y="140" width="55" height="45" fill="#b07040" stroke="#7a4a28" stroke-width="1"/>
      <polygon points="30,140 67,110 105,140" fill="#8b3030"/>
      <rect x="55" y="160" width="14" height="25" fill="#5a3018"/>
      <rect x="80" y="150" width="10" height="10" fill="#aad4ff"/>
      <!-- House 2 -->
      <rect x="120" y="145" width="50" height="40" fill="#b88050" stroke="#7a5030" stroke-width="1"/>
      <polygon points="112,145 145,118 178,145" fill="#994422"/>
      <rect x="135" y="162" width="12" height="23" fill="#5a3018"/>
      <!-- Tree -->
      <rect x="290" y="155" width="8" height="30" fill="#6a4a2a"/>
      <circle cx="294" cy="145" r="20" fill="#3a8a2a"/>
      <circle cx="280" cy="150" r="15" fill="#4a9a3a"/>
      <circle cx="308" cy="148" r="16" fill="#3a8a2a"/>
      <!-- Well -->
      <rect x="220" y="170" width="25" height="18" fill="#888" stroke="#666" stroke-width="1" rx="2"/>
      <line x1="232" y1="160" x2="232" y2="170" stroke="#7a5230" stroke-width="2"/>
      <line x1="226" y1="160" x2="238" y2="160" stroke="#7a5230" stroke-width="2"/>
      <!-- Ground -->
      <rect x="0" y="200" width="400" height="50" fill="#5a9a36" opacity="0.5"/>
      <!-- Fence -->
      <line x1="0" y1="195" x2="35" y2="195" stroke="#8b7355" stroke-width="2"/>
      <rect x="10" y="188" width="3" height="15" fill="#8b7355"/>
      <rect x="25" y="188" width="3" height="15" fill="#8b7355"/>
    `);
  },

  // Dungeon corridor — dark stone walls with torches
  dungeon_corridor() {
    return this.scene('#1a1a2e', '#2a2a3e', `
      <!-- Floor -->
      <rect x="60" y="150" width="280" height="100" fill="#3a3a4e"/>
      <!-- Left wall -->
      <polygon points="0,0 60,60 60,250 0,250" fill="#2a2a3e" stroke="#222238" stroke-width="1"/>
      <!-- Right wall -->
      <polygon points="400,0 340,60 340,250 400,250" fill="#2a2a3e" stroke="#222238" stroke-width="1"/>
      <!-- Ceiling -->
      <polygon points="0,0 400,0 340,60 60,60" fill="#1a1a28"/>
      <!-- Floor tiles -->
      ${[0,1,2,3,4].map(i => `<rect x="${80 + i * 50}" y="155" width="45" height="40" fill="#333348" stroke="#2a2a3e" stroke-width="1" rx="1"/>`).join('')}
      ${[0,1,2,3,4].map(i => `<rect x="${80 + i * 50}" y="200" width="45" height="40" fill="#303045" stroke="#2a2a3e" stroke-width="1" rx="1"/>`).join('')}
      <!-- Left torch -->
      <rect x="45" y="90" width="6" height="20" fill="#7a5230"/>
      <ellipse cx="48" cy="85" rx="6" ry="10" fill="#e8a030" opacity="0.9"/>
      <ellipse cx="48" cy="82" rx="4" ry="7" fill="#ffcc44" opacity="0.8"/>
      <circle cx="48" cy="80" r="3" fill="#fff4cc" opacity="0.6"/>
      <!-- Right torch -->
      <rect x="349" y="90" width="6" height="20" fill="#7a5230"/>
      <ellipse cx="352" cy="85" rx="6" ry="10" fill="#e8a030" opacity="0.9"/>
      <ellipse cx="352" cy="82" rx="4" ry="7" fill="#ffcc44" opacity="0.8"/>
      <circle cx="352" cy="80" r="3" fill="#fff4cc" opacity="0.6"/>
      <!-- Torch glow -->
      <circle cx="48" cy="90" r="40" fill="#e8a030" opacity="0.08"/>
      <circle cx="352" cy="90" r="40" fill="#e8a030" opacity="0.08"/>
      <!-- Cobwebs -->
      <path d="M60,60 Q70,70 60,80" fill="none" stroke="#666" stroke-width="0.5" opacity="0.4"/>
      <path d="M340,60 Q330,70 340,80" fill="none" stroke="#666" stroke-width="0.5" opacity="0.4"/>
      <!-- Distant archway -->
      <rect x="150" y="65" width="100" height="85" fill="#111122" rx="50" ry="30"/>
    `);
  },

  // Forest clearing — trees, dappled light, flowers
  forest_clearing() {
    return this.scene('#2a5a2a', '#4a8a3a', `
      <!-- Sky through canopy -->
      <ellipse cx="200" cy="30" rx="100" ry="40" fill="#5a9adf" opacity="0.3"/>
      <!-- Canopy -->
      <circle cx="30" cy="20" r="60" fill="#1a5a1a"/>
      <circle cx="130" cy="0" r="70" fill="#2a6a2a"/>
      <circle cx="370" cy="10" r="65" fill="#1a5a1a"/>
      <circle cx="280" cy="-10" r="70" fill="#2a6a2a"/>
      <!-- Tree trunks -->
      <rect x="10" y="30" width="18" height="220" fill="#4a3018"/>
      <rect x="375" y="20" width="16" height="230" fill="#3a2810"/>
      <rect x="115" y="0" width="14" height="100" fill="#4a3018"/>
      <rect x="290" y="0" width="15" height="90" fill="#3a2810"/>
      <!-- Ground -->
      <ellipse cx="200" cy="220" rx="180" ry="40" fill="#3a7a2a"/>
      <rect x="0" y="220" width="400" height="30" fill="#2a6a1a"/>
      <!-- Mushrooms -->
      <circle cx="100" cy="205" r="6" fill="#cc3333"/>
      <rect x="98" y="205" width="4" height="8" fill="#ddd"/>
      <circle cx="300" cy="210" r="5" fill="#cc3333"/>
      <rect x="298" y="210" width="4" height="7" fill="#ddd"/>
      <!-- Flowers -->
      ${[140,180,220,260].map(x => `<circle cx="${x}" cy="${208 + Math.sin(x) * 3}" r="3" fill="${['#ff88cc','#ffcc44','#88ccff','#ff88cc'][Math.floor(x/60)%4]}"/>`).join('')}
      <!-- Light rays -->
      <polygon points="180,30 160,200 200,200" fill="#ffff88" opacity="0.06"/>
      <polygon points="240,20 230,200 260,200" fill="#ffff88" opacity="0.05"/>
      <!-- Butterfly -->
      <ellipse cx="250" cy="100" rx="5" ry="3" fill="#ff88cc" opacity="0.7"/>
      <ellipse cx="260" cy="100" rx="5" ry="3" fill="#ff88cc" opacity="0.7"/>
    `);
  },

  // Cave — dark, rocky, stalactites
  cave() {
    return this.scene('#0a0a1a', '#1a1a2e', `
      <!-- Cave walls -->
      <path d="M0,0 Q50,30 80,0 Q120,40 160,10 Q200,50 240,5 Q280,35 320,0 Q360,30 400,0 L400,60 Q350,80 300,70 Q250,90 200,75 Q150,85 100,70 Q50,80 0,65 Z" fill="#222238"/>
      <!-- Stalactites -->
      <polygon points="80,65 85,100 75,65" fill="#333348"/>
      <polygon points="150,70 155,110 145,70" fill="#2a2a40"/>
      <polygon points="250,75 255,108 245,75" fill="#333348"/>
      <polygon points="320,68 325,95 315,68" fill="#2a2a40"/>
      <!-- Floor -->
      <path d="M0,200 Q40,190 80,195 Q120,185 160,200 Q200,188 240,195 Q280,190 320,200 Q360,192 400,198 L400,250 L0,250 Z" fill="#222238"/>
      <!-- Stalagmites -->
      <polygon points="100,200 105,170 110,200" fill="#2a2a40"/>
      <polygon points="280,195 285,160 290,195" fill="#333348"/>
      <!-- Glowing crystals -->
      <polygon points="50,190 55,170 60,190" fill="#4488ff" opacity="0.6"/>
      <polygon points="52,190 55,175 58,190" fill="#66aaff" opacity="0.8"/>
      <polygon points="330,192 335,175 340,192" fill="#44ff88" opacity="0.6"/>
      <polygon points="332,192 335,180 338,192" fill="#66ffaa" opacity="0.8"/>
      <!-- Ambient glow from crystals -->
      <circle cx="55" cy="185" r="20" fill="#4488ff" opacity="0.06"/>
      <circle cx="335" cy="188" r="20" fill="#44ff88" opacity="0.06"/>
      <!-- Cave floor detail -->
      <circle cx="180" cy="210" r="8" fill="#1a1a2e"/>
      <circle cx="220" cy="215" r="5" fill="#1a1a28"/>
      <!-- Water puddle -->
      <ellipse cx="200" cy="220" rx="40" ry="8" fill="#223366" opacity="0.4"/>
    `);
  },

  // Mountain — snowy peaks, wind, cold
  mountain() {
    return this.scene('#4a6a8a', '#8aaabe', `
      <!-- Distant mountains -->
      <polygon points="0,180 60,80 120,180" fill="#6a7a8a"/>
      <polygon points="80,180 160,50 240,180" fill="#7a8a9a"/>
      <polygon points="200,180 300,30 400,180" fill="#6a7a8a"/>
      <!-- Snow caps -->
      <polygon points="60,80 45,105 75,105" fill="#eef4ff"/>
      <polygon points="160,50 140,80 180,80" fill="#eef4ff"/>
      <polygon points="300,30 275,65 325,65" fill="#eef4ff"/>
      <!-- Foreground rocky ground -->
      <path d="M0,200 Q50,185 100,195 Q150,180 200,190 Q250,185 300,195 Q350,188 400,200 L400,250 L0,250 Z" fill="#5a6a7a"/>
      <!-- Snow patches -->
      <ellipse cx="100" cy="195" rx="30" ry="5" fill="#dde8f0" opacity="0.5"/>
      <ellipse cx="300" cy="197" rx="25" ry="4" fill="#dde8f0" opacity="0.5"/>
      <!-- Rocks -->
      <ellipse cx="150" cy="200" rx="15" ry="10" fill="#4a5a6a"/>
      <ellipse cx="250" cy="205" rx="12" ry="8" fill="#4a5a6a"/>
      <ellipse cx="60" cy="210" rx="20" ry="10" fill="#3a4a5a"/>
      <!-- Path -->
      <path d="M180,250 Q190,230 200,210 Q220,195 260,190" fill="none" stroke="#7a8a7a" stroke-width="8" opacity="0.4" stroke-linecap="round"/>
      <!-- Wind lines -->
      <line x1="50" y1="100" x2="120" y2="95" stroke="#dde8f0" stroke-width="1" opacity="0.3"/>
      <line x1="250" y1="80" x2="340" y2="75" stroke="#dde8f0" stroke-width="1" opacity="0.3"/>
      <line x1="100" y1="120" x2="180" y2="115" stroke="#dde8f0" stroke-width="1" opacity="0.25"/>
      <!-- Snowflakes -->
      ${[30,90,150,210,270,330,370].map(x => `<circle cx="${x}" cy="${60 + (x * 37) % 100}" r="1.5" fill="white" opacity="0.5"/>`).join('')}
    `);
  },

  // Castle — dark fortress interior or exterior
  castle() {
    return this.scene('#1a1a2e', '#2a2a4e', `
      <!-- Castle wall -->
      <rect x="0" y="80" width="400" height="170" fill="#3a3a5a"/>
      <!-- Battlements -->
      ${[0,1,2,3,4,5,6,7].map(i => `<rect x="${i * 55}" y="65" width="35" height="20" fill="#3a3a5a"/>`).join('')}
      <!-- Large window/doorway -->
      <rect x="140" y="100" width="120" height="150" fill="#111128" rx="60" ry="40"/>
      <!-- Window glow -->
      <rect x="155" y="120" width="90" height="110" fill="#2a2a4e" rx="45" ry="30" opacity="0.5"/>
      <!-- Torches flanking -->
      <rect x="115" y="120" width="5" height="18" fill="#7a5230"/>
      <ellipse cx="117" cy="115" rx="5" ry="8" fill="#e8a030" opacity="0.9"/>
      <circle cx="117" cy="112" r="3" fill="#ffdd66" opacity="0.7"/>
      <rect x="280" y="120" width="5" height="18" fill="#7a5230"/>
      <ellipse cx="282" cy="115" rx="5" ry="8" fill="#e8a030" opacity="0.9"/>
      <circle cx="282" cy="112" r="3" fill="#ffdd66" opacity="0.7"/>
      <!-- Torch glow -->
      <circle cx="117" cy="120" r="30" fill="#e8a030" opacity="0.06"/>
      <circle cx="282" cy="120" r="30" fill="#e8a030" opacity="0.06"/>
      <!-- Stone texture lines -->
      ${[100,130,160,190,220].map(y => `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#2a2a48" stroke-width="1" opacity="0.3"/>`).join('')}
      <!-- Banner -->
      <rect x="50" y="90" width="20" height="40" fill="#8b0000"/>
      <polygon points="50,130 60,140 70,130" fill="#8b0000"/>
      <rect x="330" y="90" width="20" height="40" fill="#8b0000"/>
      <polygon points="330,130 340,140 350,130" fill="#8b0000"/>
      <!-- Floor -->
      <rect x="0" y="230" width="400" height="20" fill="#2a2a48"/>
    `);
  },

  // Tavern — warm interior with tables and fireplace
  tavern() {
    return this.scene('#3a2a1a', '#5a4a3a', `
      <!-- Walls -->
      <rect x="0" y="0" width="400" height="250" fill="#4a3a28"/>
      <!-- Floor (wood planks) -->
      <rect x="0" y="170" width="400" height="80" fill="#5a4a30"/>
      ${[0,1,2,3,4,5,6,7].map(i => `<line x1="${i * 55}" y1="170" x2="${i * 55}" y2="250" stroke="#4a3a28" stroke-width="1" opacity="0.4"/>`).join('')}
      <!-- Ceiling beams -->
      <rect x="0" y="20" width="400" height="8" fill="#3a2a18"/>
      <rect x="0" y="50" width="400" height="6" fill="#3a2a18"/>
      <!-- Fireplace -->
      <rect x="160" y="60" width="80" height="90" fill="#2a1a0a"/>
      <rect x="150" y="55" width="100" height="10" fill="#5a4a38"/>
      <rect x="155" y="145" width="90" height="8" fill="#5a4a38"/>
      <!-- Fire -->
      <ellipse cx="200" cy="130" rx="25" ry="15" fill="#cc4400" opacity="0.8"/>
      <ellipse cx="200" cy="125" rx="18" ry="12" fill="#ee6600" opacity="0.8"/>
      <ellipse cx="200" cy="120" rx="10" ry="10" fill="#ffaa00" opacity="0.9"/>
      <ellipse cx="200" cy="115" rx="5" ry="8" fill="#ffdd44"/>
      <!-- Fire glow -->
      <circle cx="200" cy="120" r="60" fill="#e8a030" opacity="0.08"/>
      <!-- Table left -->
      <rect x="20" y="170" width="90" height="6" fill="#6a5a3a"/>
      <rect x="30" y="176" width="5" height="30" fill="#5a4a2a"/>
      <rect x="95" y="176" width="5" height="30" fill="#5a4a2a"/>
      <!-- Mugs on table -->
      <rect x="45" y="162" width="8" height="10" fill="#8a7a5a" rx="1"/>
      <rect x="65" y="162" width="8" height="10" fill="#8a7a5a" rx="1"/>
      <!-- Table right -->
      <rect x="290" y="175" width="90" height="6" fill="#6a5a3a"/>
      <rect x="300" y="181" width="5" height="30" fill="#5a4a2a"/>
      <rect x="365" y="181" width="5" height="30" fill="#5a4a2a"/>
      <!-- Chandelier -->
      <line x1="200" y1="0" x2="200" y2="30" stroke="#5a4a2a" stroke-width="2"/>
      <circle cx="190" cy="35" r="3" fill="#e8a030" opacity="0.8"/>
      <circle cx="200" cy="33" r="3" fill="#e8a030" opacity="0.8"/>
      <circle cx="210" cy="35" r="3" fill="#e8a030" opacity="0.8"/>
    `);
  },

  // Ruins — crumbling stone structures, vines
  ruins() {
    return this.scene('#3a5a3a', '#5a7a4a', `
      <!-- Sky -->
      <rect x="0" y="0" width="400" height="120" fill="#6a9aba" opacity="0.3"/>
      <!-- Broken columns -->
      <rect x="50" y="80" width="20" height="120" fill="#8a8a7a"/>
      <rect x="50" y="75" width="25" height="8" fill="#9a9a8a"/>
      <rect x="120" y="100" width="20" height="100" fill="#8a8a7a"/>
      <rect x="118" y="95" width="25" height="8" fill="#9a9a8a"/>
      <!-- Broken wall -->
      <path d="M200,70 L200,200 L350,200 L350,90 L320,80 L300,100 L280,75 L260,95 L240,70 Z" fill="#7a7a6a"/>
      <rect x="250" y="120" width="30" height="40" fill="#4a5a3a" rx="15" ry="10"/>
      <!-- Arch remains -->
      <path d="M80,100 Q130,50 180,100" fill="none" stroke="#8a8a7a" stroke-width="10"/>
      <!-- Ground -->
      <rect x="0" y="200" width="400" height="50" fill="#4a6a3a"/>
      <!-- Moss/vines on columns -->
      <path d="M55,80 Q52,100 58,120 Q54,140 60,160" fill="none" stroke="#2a6a2a" stroke-width="3" opacity="0.6"/>
      <path d="M125,100 Q122,120 128,140 Q124,160 130,180" fill="none" stroke="#2a6a2a" stroke-width="3" opacity="0.6"/>
      <!-- Vine on wall -->
      <path d="M210,70 Q220,90 215,110 Q225,130 220,150 Q230,170 225,190" fill="none" stroke="#2a6a2a" stroke-width="2" opacity="0.5"/>
      <!-- Fallen stones -->
      <ellipse cx="160" cy="205" rx="12" ry="8" fill="#7a7a6a"/>
      <ellipse cx="100" cy="210" rx="10" ry="6" fill="#8a8a7a"/>
      <rect x="300" y="200" width="15" height="10" fill="#7a7a6a" rx="2"/>
      <!-- Mysterious glow -->
      <circle cx="270" cy="140" r="15" fill="#aa88ff" opacity="0.15"/>
      <circle cx="270" cy="140" r="8" fill="#aa88ff" opacity="0.1"/>
    `);
  },

  // River — flowing water, banks, bridge
  river() {
    return this.scene('#5a8aba', '#7aaa7a', `
      <!-- Sky -->
      <rect x="0" y="0" width="400" height="100" fill="#6ab4de" opacity="0.4"/>
      <!-- Far bank -->
      <ellipse cx="200" cy="110" rx="220" ry="30" fill="#4a8a3a"/>
      <!-- Trees on far bank -->
      <rect x="80" y="80" width="6" height="30" fill="#4a3018"/>
      <circle cx="83" cy="72" r="14" fill="#3a7a2a"/>
      <rect x="300" y="85" width="6" height="25" fill="#4a3018"/>
      <circle cx="303" cy="78" r="12" fill="#3a7a2a"/>
      <!-- River -->
      <path d="M0,130 Q100,125 200,140 Q300,155 400,145 L400,200 Q300,195 200,205 Q100,210 0,200 Z" fill="#2a6aaa" opacity="0.7"/>
      <!-- Water ripples -->
      <path d="M50,155 Q70,150 90,155" fill="none" stroke="#4a8acc" stroke-width="1.5" opacity="0.4"/>
      <path d="M150,170 Q175,165 200,170" fill="none" stroke="#4a8acc" stroke-width="1.5" opacity="0.4"/>
      <path d="M280,160 Q310,155 340,160" fill="none" stroke="#4a8acc" stroke-width="1.5" opacity="0.4"/>
      <!-- Bridge -->
      <path d="M150,135 Q200,115 250,140" fill="none" stroke="#7a5a30" stroke-width="8"/>
      <rect x="148" y="125" width="6" height="25" fill="#7a5a30"/>
      <rect x="246" y="130" width="6" height="25" fill="#7a5a30"/>
      <!-- Near bank -->
      <path d="M0,200 Q100,190 200,200 Q300,210 400,200 L400,250 L0,250 Z" fill="#4a8a3a"/>
      <!-- Reeds -->
      <line x1="30" y1="200" x2="28" y2="175" stroke="#3a6a2a" stroke-width="2"/>
      <line x1="35" y1="200" x2="37" y2="178" stroke="#3a6a2a" stroke-width="2"/>
      <line x1="370" y1="200" x2="368" y2="180" stroke="#3a6a2a" stroke-width="2"/>
      <line x1="375" y1="200" x2="378" y2="178" stroke="#3a6a2a" stroke-width="2"/>
      <!-- Rocks in water -->
      <ellipse cx="120" cy="175" rx="8" ry="5" fill="#5a6a7a"/>
      <ellipse cx="320" cy="170" rx="6" ry="4" fill="#5a6a7a"/>
    `);
  },

  // Library — bookshelves, reading desk, candles
  library() {
    return this.scene('#2a1a1a', '#3a2a2a', `
      <!-- Back wall -->
      <rect x="0" y="0" width="400" height="250" fill="#3a2a1a"/>
      <!-- Bookshelf left -->
      <rect x="10" y="20" width="120" height="200" fill="#4a3018"/>
      ${[0,1,2,3,4].map(i => `<rect x="15" y="${30 + i * 40}" width="110" height="30" fill="#3a2510"/>`).join('')}
      <!-- Books (colorful spines) -->
      ${[
        [18, 32, '#8b0000'], [28, 32, '#00008b'], [38, 32, '#006400'], [48, 32, '#8b8000'], [58, 32, '#4a0082'],
        [68, 32, '#8b4513'], [78, 32, '#2f4f4f'], [88, 32, '#800080'], [98, 32, '#b22222'], [108, 32, '#006060'],
        [18, 72, '#4a0082'], [30, 72, '#8b0000'], [42, 72, '#006400'], [54, 72, '#b22222'], [66, 72, '#00008b'],
        [18, 112, '#800080'], [30, 112, '#006060'], [42, 112, '#8b4513'], [54, 112, '#8b8000'], [66, 112, '#4a0082'],
        [18, 152, '#8b0000'], [28, 152, '#006400'], [38, 152, '#00008b'], [48, 152, '#b22222'],
        [18, 192, '#2f4f4f'], [30, 192, '#800080'], [42, 192, '#8b8000'],
      ].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="8" height="26" fill="${c}" rx="1"/>`).join('')}
      <!-- Bookshelf right -->
      <rect x="270" y="20" width="120" height="200" fill="#4a3018"/>
      ${[0,1,2,3,4].map(i => `<rect x="275" y="${30 + i * 40}" width="110" height="30" fill="#3a2510"/>`).join('')}
      ${[
        [278, 32, '#006400'], [288, 32, '#8b0000'], [298, 32, '#4a0082'], [308, 32, '#00008b'], [318, 32, '#b22222'],
        [278, 72, '#800080'], [290, 72, '#006060'], [302, 72, '#8b4513'], [314, 72, '#8b0000'],
        [278, 112, '#00008b'], [290, 112, '#006400'], [302, 112, '#b22222'],
        [278, 152, '#8b8000'], [288, 152, '#4a0082'], [298, 152, '#800080'],
        [278, 192, '#8b0000'], [290, 192, '#006400'],
      ].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="8" height="26" fill="${c}" rx="1"/>`).join('')}
      <!-- Reading desk -->
      <rect x="155" y="160" width="90" height="6" fill="#5a4a30"/>
      <rect x="165" y="166" width="6" height="40" fill="#4a3a20"/>
      <rect x="229" y="166" width="6" height="40" fill="#4a3a20"/>
      <!-- Open book on desk -->
      <rect x="175" y="148" width="25" height="16" fill="#e8d5b0" rx="1"/>
      <rect x="200" y="148" width="25" height="16" fill="#dcc8a0" rx="1"/>
      <line x1="200" y1="148" x2="200" y2="164" stroke="#aaa" stroke-width="0.5"/>
      <!-- Candles -->
      <rect x="163" y="145" width="4" height="15" fill="#e8d5b0"/>
      <ellipse cx="165" cy="142" rx="3" ry="5" fill="#e8a030" opacity="0.9"/>
      <circle cx="165" cy="140" r="2" fill="#ffdd66"/>
      <rect x="233" y="145" width="4" height="15" fill="#e8d5b0"/>
      <ellipse cx="235" cy="142" rx="3" ry="5" fill="#e8a030" opacity="0.9"/>
      <circle cx="235" cy="140" r="2" fill="#ffdd66"/>
      <!-- Candle glow -->
      <circle cx="165" cy="145" r="25" fill="#e8a030" opacity="0.06"/>
      <circle cx="235" cy="145" r="25" fill="#e8a030" opacity="0.06"/>
      <!-- Floor -->
      <rect x="0" y="210" width="400" height="40" fill="#2a1a0a"/>
      <!-- Rug -->
      <ellipse cx="200" cy="230" rx="70" ry="15" fill="#6a1a2a" opacity="0.5"/>
    `);
  },

  // Get environment by name (matches story.js environment field)
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
