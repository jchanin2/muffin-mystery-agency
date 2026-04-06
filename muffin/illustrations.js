// illustrations.js — SVG illustrations for Muffin's Mystery Agency

const Illustrations = {

  // ============================================================
  // MUFFIN THE CAPYBARA — Detective character SVG
  // ============================================================
  muffin(size = 150, mood = 'happy', showMagnifier = true) {
    const s = size / 150; // scale factor
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="75" cy="100" rx="45" ry="32" fill="#8B6914"/>
      <ellipse cx="75" cy="98" rx="43" ry="30" fill="#A0794C"/>
      <!-- Belly highlight -->
      <ellipse cx="75" cy="105" rx="30" ry="18" fill="#C4A265"/>
      <!-- Front legs -->
      <ellipse cx="55" cy="126" rx="10" ry="8" fill="#8B6914"/>
      <ellipse cx="95" cy="126" rx="10" ry="8" fill="#8B6914"/>
      <!-- Back legs (behind body) -->
      <ellipse cx="45" cy="122" rx="8" ry="7" fill="#7A5C10"/>
      <ellipse cx="105" cy="122" rx="8" ry="7" fill="#7A5C10"/>
      <!-- Head -->
      <ellipse cx="75" cy="68" rx="30" ry="25" fill="#A0794C"/>
      <!-- Snout/nose area - capybaras have big blunt noses -->
      <ellipse cx="75" cy="78" rx="18" ry="12" fill="#B8935A"/>
      <!-- Big capybara nose -->
      <ellipse cx="75" cy="73" rx="8" ry="5" fill="#5C3D1E"/>
      <!-- Nostrils -->
      <ellipse cx="72" cy="73" rx="2" ry="1.5" fill="#3E2712"/>
      <ellipse cx="78" cy="73" rx="2" ry="1.5" fill="#3E2712"/>
      <!-- Eyes -->
      ${mood === 'happy' ? `
        <circle cx="63" cy="60" r="4" fill="#2C1810"/>
        <circle cx="87" cy="60" r="4" fill="#2C1810"/>
        <circle cx="64" cy="59" r="1.5" fill="white"/>
        <circle cx="88" cy="59" r="1.5" fill="white"/>
      ` : mood === 'hurt' ? `
        <line x1="58" y1="58" x2="68" y2="62" stroke="#2C1810" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="58" y1="62" x2="68" y2="58" stroke="#2C1810" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="82" y1="58" x2="92" y2="62" stroke="#2C1810" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="82" y1="62" x2="92" y2="58" stroke="#2C1810" stroke-width="2.5" stroke-linecap="round"/>
      ` : `
        <circle cx="63" cy="60" r="4" fill="#2C1810"/>
        <circle cx="87" cy="60" r="4" fill="#2C1810"/>
        <circle cx="64.5" cy="59" r="1.5" fill="white"/>
        <circle cx="88.5" cy="59" r="1.5" fill="white"/>
      `}
      <!-- Mouth -->
      ${mood === 'happy' ? `
        <path d="M 68 82 Q 75 88 82 82" fill="none" stroke="#5C3D1E" stroke-width="1.5" stroke-linecap="round"/>
      ` : mood === 'hurt' ? `
        <path d="M 68 86 Q 75 80 82 86" fill="none" stroke="#5C3D1E" stroke-width="1.5" stroke-linecap="round"/>
      ` : `
        <line x1="70" y1="83" x2="80" y2="83" stroke="#5C3D1E" stroke-width="1.5" stroke-linecap="round"/>
      `}
      <!-- Ears - small round capybara ears -->
      <ellipse cx="52" cy="48" rx="7" ry="5" fill="#8B6914" transform="rotate(-15 52 48)"/>
      <ellipse cx="52" cy="48" rx="4" ry="3" fill="#C4A265" transform="rotate(-15 52 48)"/>
      <ellipse cx="98" cy="48" rx="7" ry="5" fill="#8B6914" transform="rotate(15 98 48)"/>
      <ellipse cx="98" cy="48" rx="4" ry="3" fill="#C4A265" transform="rotate(15 98 48)"/>
      <!-- Whiskers -->
      <line x1="50" y1="75" x2="35" y2="72" stroke="#5C3D1E" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="78" x2="34" y2="79" stroke="#5C3D1E" stroke-width="0.8" opacity="0.5"/>
      <line x1="100" y1="75" x2="115" y2="72" stroke="#5C3D1E" stroke-width="0.8" opacity="0.5"/>
      <line x1="100" y1="78" x2="116" y2="79" stroke="#5C3D1E" stroke-width="0.8" opacity="0.5"/>
      <!-- Detective Hat (deerstalker) -->
      <path d="M 45 52 Q 50 30 75 28 Q 100 30 105 52 L 100 50 Q 75 40 50 50 Z" fill="#5C3D1E"/>
      <path d="M 45 52 Q 50 32 75 30 Q 100 32 105 52 L 100 48 Q 75 38 50 48 Z" fill="#7A5C30"/>
      <!-- Hat brim front -->
      <path d="M 48 52 Q 55 56 75 56 Q 95 56 102 52 Q 95 58 75 58 Q 55 58 48 52" fill="#5C3D1E"/>
      <!-- Hat band -->
      <rect x="50" y="46" width="50" height="4" rx="2" fill="#3E2712"/>
      ${showMagnifier ? `
        <!-- Magnifying glass -->
        <circle cx="125" cy="95" r="14" fill="none" stroke="#E2B714" stroke-width="3"/>
        <circle cx="125" cy="95" r="11" fill="rgba(200,220,255,0.15)"/>
        <line x1="115" y1="105" x2="105" y2="118" stroke="#E2B714" stroke-width="4" stroke-linecap="round"/>
        <!-- Glass shine -->
        <path d="M 120 87 Q 122 85 126 86" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
      ` : ''}
    </svg>`;
  },

  // ============================================================
  // SCENE ILLUSTRATIONS — Storybook-style scene for each clue
  // ============================================================

  // Scene wrapper with background
  scene(bgColor1, bgColor2, content) {
    return `
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" class="scene-svg">
      <defs>
        <linearGradient id="sceneBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bgColor1}"/>
          <stop offset="100%" stop-color="${bgColor2}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#sceneBg)" rx="12"/>
      ${content}
    </svg>`;
  },

  // --- CASE 1: Bakery scenes ---
  bakery_counter() {
    return this.scene('#FFF5E6', '#F5DEB3', `
      <!-- Bakery interior -->
      <rect x="0" y="160" width="400" height="90" fill="#DEB887" rx="0"/>
      <rect x="0" y="155" width="400" height="10" fill="#C4956A"/>
      <!-- Counter -->
      <rect x="20" y="100" width="360" height="60" fill="#8B4513" rx="4"/>
      <rect x="20" y="100" width="360" height="8" fill="#A0522D" rx="4"/>
      <!-- Two display trays -->
      <rect x="50" y="90" width="120" height="12" fill="#D4A76A" rx="3" stroke="#B8860B" stroke-width="1"/>
      <text x="110" y="86" text-anchor="middle" fill="#8B4513" font-size="9" font-weight="bold">TRAY 1</text>
      <circle cx="75" cy="85" r="10" fill="#FF69B4"/>
      <circle cx="75" cy="79" r="5" fill="#FFB6C1"/>
      <circle cx="100" cy="85" r="10" fill="#87CEEB"/>
      <circle cx="100" cy="79" r="5" fill="#B0E0E6"/>
      <circle cx="125" cy="85" r="10" fill="#98FB98"/>
      <circle cx="125" cy="79" r="5" fill="#90EE90"/>
      <rect x="220" y="90" width="120" height="12" fill="#D4A76A" rx="3" stroke="#B8860B" stroke-width="1"/>
      <text x="280" y="86" text-anchor="middle" fill="#8B4513" font-size="9" font-weight="bold">TRAY 2</text>
      <circle cx="245" cy="85" r="10" fill="#FFD700"/>
      <circle cx="245" cy="79" r="5" fill="#FFE44D"/>
      <circle cx="270" cy="85" r="10" fill="#FF8C69"/>
      <circle cx="270" cy="79" r="5" fill="#FFA07A"/>
      <circle cx="295" cy="85" r="10" fill="#DDA0DD"/>
      <circle cx="295" cy="79" r="5" fill="#E6B0E6"/>
      <!-- Muffin investigating -->
      <g transform="translate(290, 110) scale(0.55)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="53" rx="23" ry="16" fill="#B8935A"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
        <circle cx="70" cy="45" r="10" fill="none" stroke="#E2B714" stroke-width="2"/>
        <line x1="63" y1="52" x2="57" y2="60" stroke="#E2B714" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- Clipboard -->
      <rect x="30" y="120" width="30" height="35" fill="#F5DEB3" rx="2" stroke="#8B4513" stroke-width="1"/>
      <line x1="36" y1="130" x2="54" y2="130" stroke="#666" stroke-width="1"/>
      <line x1="36" y1="136" x2="54" y2="136" stroke="#666" stroke-width="1"/>
      <line x1="36" y1="142" x2="50" y2="142" stroke="#666" stroke-width="1"/>
      <!-- Window -->
      <rect x="300" y="20" width="70" height="60" fill="#87CEEB" rx="4" stroke="#8B4513" stroke-width="3"/>
      <line x1="335" y1="20" x2="335" y2="80" stroke="#8B4513" stroke-width="2"/>
      <line x1="300" y1="50" x2="370" y2="50" stroke="#8B4513" stroke-width="2"/>
    `);
  },

  bakery_footprints() {
    return this.scene('#F5E6D3', '#E8D5B7', `
      <!-- Floor -->
      <rect x="0" y="140" width="400" height="110" fill="#DEB887"/>
      <rect x="0" y="140" width="400" height="5" fill="#C4956A"/>
      <!-- Floor tiles -->
      ${[0,80,160,240,320].map(x => `<rect x="${x}" y="145" width="78" height="50" fill="#D4A76A" stroke="#C4956A" stroke-width="1" rx="1"/>`).join('')}
      ${[40,120,200,280,360].map(x => `<rect x="${x}" y="195" width="78" height="55" fill="#D4A76A" stroke="#C4956A" stroke-width="1" rx="1"/>`).join('')}
      <!-- Tiny flour footprints trail -->
      ${[[60,170],[90,180],[120,168],[150,178],[180,165],[210,175],[240,162],[270,172]].map(([x,y]) =>
        `<ellipse cx="${x}" cy="${y}" rx="4" ry="6" fill="rgba(255,255,255,0.7)" transform="rotate(${Math.random()*20-10} ${x} ${y})"/>
         <ellipse cx="${x+2}" cy="${y-7}" rx="2" ry="2.5" fill="rgba(255,255,255,0.5)"/>`
      ).join('')}
      <!-- Back wall -->
      <rect x="0" y="0" width="400" height="140" fill="#F5DEB3"/>
      <!-- Air vent on wall -->
      <rect x="290" y="100" width="50" height="35" fill="#888" rx="2" stroke="#666" stroke-width="2"/>
      <line x1="295" y1="100" x2="295" y2="135" stroke="#666" stroke-width="1"/>
      <line x1="305" y1="100" x2="305" y2="135" stroke="#666" stroke-width="1"/>
      <line x1="315" y1="100" x2="315" y2="135" stroke="#666" stroke-width="1"/>
      <line x1="325" y1="100" x2="325" y2="135" stroke="#666" stroke-width="1"/>
      <line x1="335" y1="100" x2="335" y2="135" stroke="#666" stroke-width="1"/>
      <!-- Muffin crouching and looking at footprints -->
      <g transform="translate(170, 130) scale(0.5)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
        <circle cx="70" cy="55" r="10" fill="none" stroke="#E2B714" stroke-width="2"/>
        <line x1="63" y1="62" x2="57" y2="70" stroke="#E2B714" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- Magnified footprint -->
      <circle cx="100" cy="60" r="35" fill="white" stroke="#E2B714" stroke-width="2"/>
      <ellipse cx="100" cy="55" rx="12" ry="18" fill="rgba(255,255,255,0.9)" stroke="#999" stroke-width="1"/>
      <ellipse cx="95" cy="38" rx="5" ry="6" fill="rgba(255,255,255,0.9)" stroke="#999" stroke-width="1"/>
      <ellipse cx="105" cy="38" rx="5" ry="6" fill="rgba(255,255,255,0.9)" stroke="#999" stroke-width="1"/>
      <text x="100" y="90" text-anchor="middle" fill="#666" font-size="8" font-style="italic">Too small for human!</text>
    `);
  },

  bakery_vent() {
    return this.scene('#E8D5B7', '#D4BE9C', `
      <!-- Wall close-up -->
      <rect x="0" y="0" width="400" height="250" fill="#F5DEB3"/>
      <!-- Large vent close-up -->
      <rect x="100" y="60" width="200" height="130" fill="#777" rx="5" stroke="#555" stroke-width="3"/>
      ${[115,145,175,205,235,265].map(x => `<rect x="${x}" y="65" width="8" height="120" fill="#888" rx="1"/>`).join('')}
      <!-- Scratch marks around vent -->
      ${[[95,70],[95,90],[95,110],[305,75],[305,95],[305,115]].map(([x,y]) =>
        `<line x1="${x-5}" y1="${y}" x2="${x+5}" y2="${y+3}" stroke="#8B4513" stroke-width="1.5" opacity="0.6"/>
         <line x1="${x-3}" y1="${y+5}" x2="${x+7}" y2="${y+7}" stroke="#8B4513" stroke-width="1" opacity="0.4"/>`
      ).join('')}
      <!-- Frosting smears inside vent -->
      <ellipse cx="160" cy="120" rx="8" ry="4" fill="#FF69B4" opacity="0.6"/>
      <ellipse cx="220" cy="100" rx="6" ry="3" fill="#87CEEB" opacity="0.5"/>
      <ellipse cx="190" cy="140" rx="7" ry="3" fill="#98FB98" opacity="0.5"/>
      <!-- Measurement arrows -->
      <line x1="100" y1="205" x2="300" y2="205" stroke="#E2B714" stroke-width="2"/>
      <line x1="100" y1="200" x2="100" y2="210" stroke="#E2B714" stroke-width="2"/>
      <line x1="300" y1="200" x2="300" y2="210" stroke="#E2B714" stroke-width="2"/>
      <text x="200" y="225" text-anchor="middle" fill="#E2B714" font-size="14" font-weight="bold">1.5 m</text>
      <!-- Muffin peeking in -->
      <g transform="translate(320, 130) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  bakery_camera() {
    return this.scene('#1a1a2e', '#0f0f20', `
      <!-- Security monitor screen -->
      <rect x="30" y="20" width="250" height="180" fill="#111" rx="6" stroke="#444" stroke-width="3"/>
      <rect x="38" y="28" width="234" height="148" fill="#1a2a1a" rx="2"/>
      <!-- Timestamp -->
      <text x="48" y="46" fill="#0F0" font-family="monospace" font-size="10" opacity="0.8">CAM 03 - 02:30 AM</text>
      <!-- Three shadowy figures on screen -->
      <g opacity="0.7">
        <ellipse cx="100" cy="140" rx="20" ry="15" fill="#333"/>
        <ellipse cx="100" cy="125" rx="12" ry="10" fill="#333"/>
        <circle cx="95" cy="122" r="2" fill="#6F6"/>
        <circle cx="105" cy="122" r="2" fill="#6F6"/>
        <ellipse cx="160" cy="145" rx="18" ry="13" fill="#333"/>
        <ellipse cx="160" cy="132" rx="11" ry="9" fill="#333"/>
        <circle cx="155" cy="129" r="2" fill="#6F6"/>
        <circle cx="165" cy="129" r="2" fill="#6F6"/>
        <ellipse cx="210" cy="148" rx="15" ry="11" fill="#333"/>
        <ellipse cx="210" cy="138" rx="9" ry="8" fill="#333"/>
        <circle cx="206" cy="135" r="2" fill="#6F6"/>
        <circle cx="214" cy="135" r="2" fill="#6F6"/>
      </g>
      <!-- Bushy tails -->
      <path d="M 120 135 Q 135 120 125 140" fill="#444" opacity="0.6"/>
      <path d="M 178 138 Q 190 125 182 143" fill="#444" opacity="0.6"/>
      <path d="M 225 140 Q 235 128 228 145" fill="#444" opacity="0.6"/>
      <!-- Scan lines -->
      ${[40,60,80,100,120,140,160].map(y => `<line x1="38" y1="${y}" x2="272" y2="${y}" stroke="#0F0" stroke-width="0.3" opacity="0.15"/>`).join('')}
      <!-- REC indicator -->
      <circle cx="258" cy="40" r="4" fill="red"/>
      <text x="248" y="56" fill="red" font-family="monospace" font-size="8">REC</text>
      <!-- Muffin watching monitor -->
      <g transform="translate(300, 100) scale(0.5)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
        <path d="M 32 43 Q 40 48 48 43" fill="none" stroke="#5C3D1E" stroke-width="1"/>
      </g>
    `);
  },

  bakery_trap() {
    return this.scene('#2a1a0a', '#1a1008', `
      <!-- Dark bakery at night -->
      <rect x="0" y="170" width="400" height="80" fill="#3a2a1a"/>
      <!-- Moonlight beam -->
      <polygon points="180,0 140,170 220,170" fill="rgba(200,220,255,0.05)"/>
      <!-- Cupcake on pressure plate (trap) -->
      <rect x="165" y="150" width="70" height="5" fill="#888" rx="2"/>
      <circle cx="200" cy="145" r="15" fill="#FF69B4"/>
      <circle cx="200" cy="135" r="8" fill="#FFB6C1"/>
      <!-- Cherry on top -->
      <circle cx="200" cy="128" r="4" fill="red"/>
      <!-- Sparkle/glow around trap -->
      <circle cx="200" cy="145" r="30" fill="none" stroke="#E2B714" stroke-width="1" stroke-dasharray="4" opacity="0.5"/>
      <!-- Three raccoons approaching! -->
      <g transform="translate(50, 140) scale(0.4)">
        <ellipse cx="40" cy="40" rx="22" ry="16" fill="#555"/>
        <ellipse cx="40" cy="25" rx="14" ry="12" fill="#555"/>
        <ellipse cx="40" cy="28" rx="8" ry="5" fill="#333"/>
        <circle cx="34" cy="22" r="3" fill="white"/>
        <circle cx="46" cy="22" r="3" fill="white"/>
        <circle cx="34" cy="22" r="1.5" fill="#111"/>
        <circle cx="46" cy="22" r="1.5" fill="#111"/>
        <path d="M 62 35 Q 75 15 68 40" fill="#555" stroke="#444" stroke-width="1"/>
      </g>
      <g transform="translate(80, 135) scale(0.35)">
        <ellipse cx="40" cy="40" rx="22" ry="16" fill="#666"/>
        <ellipse cx="40" cy="25" rx="14" ry="12" fill="#666"/>
        <ellipse cx="40" cy="28" rx="8" ry="5" fill="#444"/>
        <circle cx="34" cy="22" r="3" fill="white"/>
        <circle cx="46" cy="22" r="3" fill="white"/>
        <circle cx="34" cy="22" r="1.5" fill="#111"/>
        <circle cx="46" cy="22" r="1.5" fill="#111"/>
      </g>
      <!-- Muffin hiding behind counter -->
      <rect x="280" y="120" width="100" height="60" fill="#5C3D1E" rx="3"/>
      <g transform="translate(310, 90) scale(0.4)">
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
      <!-- Camera flash ready -->
      <polygon points="370,100 375,90 380,100" fill="#E2B714" opacity="0.8"/>
      <rect x="365" y="100" width="20" height="15" fill="#333" rx="2"/>
    `);
  },

  // --- CASE 2: Library scenes ---
  library_shelves() {
    return this.scene('#F5F0E8', '#E8E0D0', `
      <!-- Bookshelves -->
      ${[0, 1, 2].map(row => {
        const y = 20 + row * 70;
        return `
          <rect x="20" y="${y}" width="360" height="60" fill="#8B4513" rx="3"/>
          <rect x="20" y="${y}" width="360" height="5" fill="#A0522D" rx="2"/>
          ${Array.from({length: 14}, (_, i) => {
            const bx = 28 + i * 25;
            const bh = 30 + Math.random() * 20;
            const colors = ['#C0392B','#2980B9','#27AE60','#8E44AD','#D35400','#2C3E50','#16A085','#F39C12'];
            return `<rect x="${bx}" y="${y + 55 - bh}" width="18" height="${bh}" fill="${colors[i % colors.length]}" rx="1"/>`;
          }).join('')}
        `;
      }).join('')}
      <!-- Arrows showing books being moved -->
      <path d="M 100 75 Q 150 60 200 75" fill="none" stroke="#E2B714" stroke-width="2" stroke-dasharray="5"/>
      <polygon points="200,72 206,75 200,78" fill="#E2B714"/>
      <!-- Muffin with catalog -->
      <g transform="translate(160, 180) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
      <!-- Catalog card -->
      <rect x="220" y="200" width="50" height="35" fill="white" rx="2" stroke="#999" stroke-width="1"/>
      <line x1="225" y1="210" x2="265" y2="210" stroke="#999" stroke-width="0.5"/>
      <line x1="225" y1="216" x2="260" y2="216" stroke="#999" stroke-width="0.5"/>
      <line x1="225" y1="222" x2="255" y2="222" stroke="#999" stroke-width="0.5"/>
    `);
  },

  library_bookmarks() {
    return this.scene('#FFF8E7', '#F0E8D4', `
      <!-- Open book -->
      <path d="M 100 60 Q 200 50 200 180 Q 200 50 300 60 L 300 200 Q 200 190 200 200 Q 200 190 100 200 Z" fill="white" stroke="#8B4513" stroke-width="2"/>
      <line x1="200" y1="55" x2="200" y2="200" stroke="#DDD" stroke-width="1"/>
      <!-- Text lines -->
      ${[80,90,100,110,120,130,140,150].map(y => `
        <line x1="115" y1="${y}" x2="190" y2="${y}" stroke="#CCC" stroke-width="1"/>
        <line x1="210" y1="${y}" x2="285" y2="${y}" stroke="#CCC" stroke-width="1"/>
      `).join('')}
      <!-- Handmade bookmarks sticking out -->
      <rect x="165" y="40" width="20" height="50" fill="#FF6B6B" rx="2" transform="rotate(-5 175 65)"/>
      <text x="175" y="70" text-anchor="middle" fill="white" font-size="8" font-weight="bold" transform="rotate(-5 175 70)">3.14</text>
      <rect x="250" y="35" width="20" height="50" fill="#4ECDC4" rx="2" transform="rotate(8 260 60)"/>
      <text x="260" y="65" text-anchor="middle" fill="white" font-size="8" font-weight="bold" transform="rotate(8 260 65)">7.21</text>
      <rect x="130" y="38" width="20" height="45" fill="#FFE66D" rx="2" transform="rotate(-10 140 60)"/>
      <text x="140" y="65" text-anchor="middle" fill="#333" font-size="8" font-weight="bold" transform="rotate(-10 140 65)">2.05</text>
      <!-- Muffin examining bookmark -->
      <g transform="translate(20, 140) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
        <circle cx="70" cy="40" r="10" fill="none" stroke="#E2B714" stroke-width="2"/>
        <line x1="63" y1="47" x2="57" y2="55" stroke="#E2B714" stroke-width="3" stroke-linecap="round"/>
      </g>
    `);
  },

  library_records() {
    return this.scene('#F0EBE3', '#E0D8CC', `
      <!-- Library desk -->
      <rect x="0" y="140" width="400" height="110" fill="#8B4513"/>
      <rect x="0" y="140" width="400" height="8" fill="#A0522D"/>
      <!-- Computer/tablet screen -->
      <rect x="100" y="40" width="200" height="120" fill="#333" rx="6" stroke="#222" stroke-width="3"/>
      <rect x="108" y="48" width="184" height="100" fill="#1a1a2e" rx="2"/>
      <!-- Borrowing records on screen -->
      <text x="120" y="65" fill="#E2B714" font-size="9" font-family="monospace">BORROWING RECORDS</text>
      <text x="120" y="80" fill="#0F0" font-size="8" font-family="monospace">Sam T. - 14 books</text>
      <text x="120" y="92" fill="#888" font-size="8" font-family="monospace">Alex M. - 3 books</text>
      <text x="120" y="104" fill="#888" font-size="8" font-family="monospace">Jordan K. - 2 books</text>
      <text x="120" y="116" fill="#888" font-size="8" font-family="monospace">Riley P. - 5 books</text>
      <!-- Highlight bar -->
      <rect x="115" y="72" width="170" height="12" fill="rgba(226,183,20,0.2)" rx="1"/>
      <!-- Keyboard -->
      <rect x="140" y="165" width="120" height="30" fill="#444" rx="3"/>
      <!-- Muffin -->
      <g transform="translate(320, 130) scale(0.4)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  library_store() {
    return this.scene('#FFF5E6', '#F0E5D0', `
      <!-- School store counter -->
      <rect x="0" y="130" width="400" height="120" fill="#D4A76A"/>
      <rect x="0" y="130" width="400" height="8" fill="#C4956A"/>
      <!-- Items on counter -->
      <rect x="60" y="100" width="40" height="30" fill="#FF6B6B" rx="2"/>
      <text x="80" y="120" text-anchor="middle" fill="white" font-size="7">BOOK</text>
      <text x="80" y="128" text-anchor="middle" fill="white" font-size="7">MARKS</text>
      <rect x="120" y="105" width="35" height="25" fill="#4ECDC4" rx="2"/>
      <text x="137" y="122" text-anchor="middle" fill="white" font-size="7">LABELS</text>
      <!-- Coins scattered -->
      ${[[200,115],[215,120],[230,112],[245,118]].map(([x,y]) =>
        `<circle cx="${x}" cy="${y}" r="7" fill="#E2B714" stroke="#B8960F" stroke-width="1"/>
         <text x="${x}" y="${y+3}" text-anchor="middle" fill="#8B6914" font-size="6">25</text>`
      ).join('')}
      <!-- Receipt -->
      <rect x="280" y="90" width="60" height="45" fill="white" rx="1"/>
      <text x="310" y="103" text-anchor="middle" fill="#333" font-size="7">RECEIPT</text>
      <line x1="285" y1="108" x2="335" y2="108" stroke="#999" stroke-width="0.5"/>
      <text x="290" y="117" fill="#333" font-size="6">Bookmarks x3</text>
      <text x="290" y="125" fill="#333" font-size="6">Labels x2</text>
      <text x="290" y="133" fill="#333" font-size="6" font-weight="bold">Tues lunch</text>
      <!-- Muffin examining receipt -->
      <g transform="translate(10, 140) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  library_security() {
    return this.scene('#E8E0D0', '#D4CDB8', `
      <!-- Hallway -->
      <rect x="0" y="0" width="400" height="250" fill="#F0EBE3"/>
      <!-- Floor -->
      <rect x="0" y="180" width="400" height="70" fill="#D4A76A"/>
      <!-- Door with code panel -->
      <rect x="150" y="40" width="100" height="140" fill="#8B4513" rx="3"/>
      <rect x="155" y="45" width="90" height="130" fill="#A0522D" rx="2"/>
      <circle cx="230" cy="110" r="5" fill="#E2B714"/>
      <!-- Keypad -->
      <rect x="240" y="80" width="35" height="50" fill="#333" rx="3" stroke="#555" stroke-width="1"/>
      ${[0,1,2].map(row => [0,1,2].map(col =>
        `<rect x="${246+col*10}" y="${86+row*14}" width="8" height="10" fill="#555" rx="1"/>`
      ).join('')).join('')}
      <!-- Green light -->
      <circle cx="257" cy="130" r="3" fill="#2ECC71"/>
      <!-- Clock showing 4:15 -->
      <circle cx="60" cy="60" r="25" fill="white" stroke="#333" stroke-width="2"/>
      <line x1="60" y1="60" x2="60" y2="42" stroke="#333" stroke-width="2"/>
      <line x1="60" y1="60" x2="70" y2="63" stroke="#333" stroke-width="1.5"/>
      <text x="60" y="100" text-anchor="middle" fill="#666" font-size="10">4:15 PM</text>
      <!-- Muffin watching from around corner -->
      <g transform="translate(320, 140) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  library_reveal() {
    return this.scene('#F5F0E8', '#E8E0D0', `
      <!-- Library interior -->
      <rect x="0" y="0" width="400" height="250" fill="#F0EBE3"/>
      <!-- Bookshelf background -->
      <rect x="0" y="0" width="400" height="120" fill="#8B4513" opacity="0.3"/>
      <!-- Sam - kid with round glasses and backpack -->
      <g transform="translate(180, 80)">
        <!-- Body -->
        <rect x="0" y="30" width="40" height="50" fill="#4ECDC4" rx="5"/>
        <!-- Head -->
        <circle cx="20" cy="20" r="18" fill="#F5CBA7"/>
        <!-- Hair -->
        <path d="M 5 15 Q 10 0 20 2 Q 30 0 35 15" fill="#5C3D1E"/>
        <!-- Round glasses -->
        <circle cx="13" cy="18" r="6" fill="none" stroke="#333" stroke-width="1.5"/>
        <circle cx="27" cy="18" r="6" fill="none" stroke="#333" stroke-width="1.5"/>
        <line x1="19" y1="18" x2="21" y2="18" stroke="#333" stroke-width="1.5"/>
        <!-- Eyes behind glasses -->
        <circle cx="13" cy="18" r="2" fill="#2C1810"/>
        <circle cx="27" cy="18" r="2" fill="#2C1810"/>
        <!-- Surprised mouth -->
        <ellipse cx="20" cy="28" rx="4" ry="3" fill="#C0392B"/>
        <!-- Backpack -->
        <rect x="35" y="30" width="15" height="35" fill="#3498DB" rx="3"/>
        <!-- Bookmark in hand -->
        <rect x="-5" y="55" width="12" height="30" fill="#FF6B6B" rx="1" transform="rotate(-10 1 70)"/>
      </g>
      <!-- Muffin facing Sam -->
      <g transform="translate(60, 140) scale(0.5)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
      <!-- Exclamation/discovery -->
      <text x="150" y="70" fill="#E2B714" font-size="28" font-weight="bold">!</text>
    `);
  },

  // --- CASE 3: Museum scenes ---
  museum_display() {
    return this.scene('#2C2C3E', '#1a1a2e', `
      <!-- Museum floor -->
      <rect x="0" y="180" width="400" height="70" fill="#3E3E50"/>
      <!-- Display case -->
      <rect x="140" y="80" width="120" height="100" fill="rgba(200,220,255,0.1)" stroke="#88AACC" stroke-width="2" rx="3"/>
      <!-- Pedestal -->
      <rect x="170" y="160" width="60" height="20" fill="#555" rx="2"/>
      <!-- Fake acorn (wooden) -->
      <ellipse cx="200" cy="140" rx="15" ry="20" fill="#C4956A" stroke="#A0794C" stroke-width="1"/>
      <path d="M 190 125 Q 200 115 210 125" fill="#8B6914"/>
      <!-- "FAKE?" label -->
      <text x="200" y="105" text-anchor="middle" fill="#E74C3C" font-size="12" font-weight="bold">FAKE?</text>
      <!-- Scale -->
      <rect x="30" y="160" width="80" height="25" fill="#666" rx="3"/>
      <rect x="40" y="140" width="60" height="20" fill="#888" rx="2"/>
      <text x="70" y="155" text-anchor="middle" fill="#0F0" font-family="monospace" font-size="10">12.4g</text>
      <!-- Muffin examining -->
      <g transform="translate(280, 140) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
        <circle cx="70" cy="40" r="10" fill="none" stroke="#E2B714" stroke-width="2"/>
        <line x1="63" y1="47" x2="57" y2="55" stroke="#E2B714" stroke-width="3" stroke-linecap="round"/>
      </g>
    `);
  },

  museum_visitors() {
    return this.scene('#2C2C3E', '#1a1a2e', `
      <!-- Visitor log -->
      <rect x="50" y="30" width="300" height="190" fill="#F5DEB3" rx="4" stroke="#8B4513" stroke-width="2"/>
      <text x="200" y="55" text-anchor="middle" fill="#5C3D1E" font-size="14" font-weight="bold">VISITOR LOG</text>
      <line x1="70" y1="62" x2="330" y2="62" stroke="#8B4513" stroke-width="1"/>
      <!-- Three suspects highlighted -->
      <rect x="65" y="70" width="270" height="25" fill="rgba(231,76,60,0.15)" rx="2"/>
      <text x="75" y="87" fill="#333" font-size="10">Frank (Security) .. 8:00 AM - 6:00 PM</text>
      <rect x="65" y="100" width="270" height="25" fill="rgba(231,76,60,0.15)" rx="2"/>
      <text x="75" y="117" fill="#333" font-size="10">Dr. Elm (Professor) .. 1:00 PM - 4:30 PM</text>
      <rect x="65" y="130" width="270" height="25" fill="rgba(231,76,60,0.15)" rx="2"/>
      <text x="75" y="147" fill="#333" font-size="10">Hazel (Restorer) .. 9:00 AM - 5:00 PM</text>
      <!-- Other visitors -->
      <text x="75" y="172" fill="#999" font-size="9">Maria S. .. 10:00 AM - 11:30 AM</text>
      <text x="75" y="187" fill="#999" font-size="9">Tour Group .. 11:00 AM - 12:00 PM</text>
      <text x="75" y="202" fill="#999" font-size="9">James R. .. 2:00 PM - 2:45 PM</text>
      <!-- Blackout time marker -->
      <rect x="260" y="60" width="70" height="18" fill="#E74C3C" rx="2"/>
      <text x="295" y="73" text-anchor="middle" fill="white" font-size="8" font-weight="bold">3:12-3:19 PM</text>
    `);
  },

  museum_battery() {
    return this.scene('#1a1a2e', '#0f0f20', `
      <!-- Security room -->
      <rect x="0" y="180" width="400" height="70" fill="#2C2C3E"/>
      <!-- Battery/UPS unit -->
      <rect x="60" y="80" width="120" height="100" fill="#444" rx="5" stroke="#555" stroke-width="2"/>
      <text x="120" y="105" text-anchor="middle" fill="#888" font-size="10" font-family="monospace">BACKUP UPS</text>
      <!-- Battery bars (depleted) -->
      ${[0,1,2,3].map(i => `<rect x="${80+i*22}" y="115" width="18" height="30" fill="${i < 1 ? '#E74C3C' : '#333'}" rx="2" stroke="#555" stroke-width="1"/>`).join('')}
      <!-- Warning light -->
      <circle cx="120" cy="170" r="5" fill="#E74C3C">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
      </circle>
      <!-- Disconnected cable -->
      <path d="M 180 130 Q 220 140 240 120 Q 260 100 280 130" fill="none" stroke="#E2B714" stroke-width="3" stroke-dasharray="8"/>
      <text x="250" y="115" fill="#E74C3C" font-size="10" font-weight="bold">DISCONNECTED!</text>
      <!-- Muffin investigating -->
      <g transform="translate(300, 130) scale(0.45)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  museum_supplies() {
    return this.scene('#F5F0E8', '#E8E0D0', `
      <!-- Workshop table -->
      <rect x="0" y="140" width="400" height="110" fill="#8B4513"/>
      <rect x="0" y="140" width="400" height="8" fill="#A0522D"/>
      <!-- Gold paint can -->
      <rect x="50" y="100" width="40" height="45" fill="#E2B714" rx="3"/>
      <rect x="48" y="100" width="44" height="8" fill="#B8960F" rx="2"/>
      <text x="70" y="132" text-anchor="middle" fill="#5C3D1E" font-size="7">GOLD</text>
      <!-- Carving tools -->
      <line x1="130" y1="90" x2="130" y2="140" stroke="#888" stroke-width="3"/>
      <polygon points="125,90 130,75 135,90" fill="#CCC"/>
      <line x1="150" y1="95" x2="150" y2="140" stroke="#888" stroke-width="3"/>
      <circle cx="150" cy="92" r="5" fill="#CCC"/>
      <line x1="170" y1="88" x2="170" y2="140" stroke="#888" stroke-width="3"/>
      <rect x="166" y="82" width="8" height="8" fill="#CCC" rx="1"/>
      <!-- Measuring calipers -->
      <g transform="translate(220, 90)">
        <line x1="0" y1="0" x2="0" y2="50" stroke="#888" stroke-width="2"/>
        <line x1="40" y1="0" x2="40" y2="50" stroke="#888" stroke-width="2"/>
        <line x1="0" y1="0" x2="40" y2="0" stroke="#888" stroke-width="3"/>
        <line x1="0" y1="50" x2="15" y2="35" stroke="#888" stroke-width="2"/>
        <line x1="40" y1="50" x2="25" y2="35" stroke="#888" stroke-width="2"/>
      </g>
      <!-- Receipt/order form -->
      <rect x="290" y="90" width="80" height="55" fill="white" rx="2"/>
      <text x="330" y="103" text-anchor="middle" fill="#333" font-size="7" font-weight="bold">ORDER FORM</text>
      <text x="295" y="115" fill="#333" font-size="6">Ordered by: Hazel</text>
      <text x="295" y="125" fill="#333" font-size="6">Gold paint x2</text>
      <text x="295" y="135" fill="#333" font-size="6">Carving set x1</text>
      <rect x="295" y="112" width="70" height="30" fill="none" stroke="#E74C3C" stroke-width="1.5" rx="2"/>
      <!-- Muffin -->
      <g transform="translate(10, 150) scale(0.4)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  museum_logbook() {
    return this.scene('#3E3E2C', '#2C2C1A', `
      <!-- Workshop interior dark -->
      <rect x="0" y="0" width="400" height="250" fill="#3E3E2C"/>
      <!-- Desk lamp light cone -->
      <polygon points="200,20 100,180 300,180" fill="rgba(255,220,150,0.08)"/>
      <!-- Hidden logbook open on desk -->
      <rect x="80" y="80" width="240" height="150" fill="#F5DEB3" rx="4"/>
      <line x1="200" y1="80" x2="200" y2="230" stroke="#DDD" stroke-width="1"/>
      <!-- Humidity readings -->
      <text x="95" y="100" fill="#333" font-size="8" font-weight="bold">HUMIDITY LOG</text>
      <text x="95" y="115" fill="#E74C3C" font-size="7">Jan: 78% - DANGER</text>
      <text x="95" y="127" fill="#E74C3C" font-size="7">Feb: 82% - CRITICAL</text>
      <text x="95" y="139" fill="#E74C3C" font-size="7">Mar: 85% - EMERGENCY</text>
      <!-- Temperature readings -->
      <text x="210" y="100" fill="#333" font-size="8" font-weight="bold">TEMP LOG</text>
      <text x="210" y="115" fill="#E74C3C" font-size="7">Fluctuation: +/- 8°</text>
      <text x="210" y="127" fill="#E74C3C" font-size="7">Max safe: +/- 2°</text>
      <!-- Filed reports -->
      <text x="95" y="165" fill="#333" font-size="7" font-style="italic">Report filed: IGNORED</text>
      <text x="95" y="177" fill="#333" font-size="7" font-style="italic">Report filed: IGNORED</text>
      <text x="95" y="189" fill="#333" font-size="7" font-style="italic">Report filed: IGNORED</text>
      <!-- Desk lamp -->
      <rect x="185" y="10" width="30" height="8" fill="#8B4513" rx="2"/>
      <line x1="200" y1="18" x2="200" y2="35" stroke="#666" stroke-width="3"/>
      <path d="M 180 35 Q 200 25 220 35" fill="#E2B714"/>
      <!-- Muffin reading -->
      <g transform="translate(310, 140) scale(0.4)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
    `);
  },

  museum_safe() {
    return this.scene('#1a1a2e', '#0f0f20', `
      <!-- Basement -->
      <rect x="0" y="180" width="400" height="70" fill="#2C2C3E"/>
      <!-- Large safe -->
      <rect x="120" y="50" width="160" height="140" fill="#555" rx="8" stroke="#444" stroke-width="4"/>
      <rect x="130" y="60" width="140" height="120" fill="#666" rx="4"/>
      <!-- Safe dial -->
      <circle cx="200" cy="120" r="25" fill="#777" stroke="#888" stroke-width="2"/>
      <circle cx="200" cy="120" r="20" fill="#888"/>
      <line x1="200" y1="100" x2="200" y2="108" stroke="#333" stroke-width="2"/>
      <!-- Handle -->
      <rect x="240" y="105" width="25" height="8" fill="#888" rx="3"/>
      <!-- Golden glow from inside -->
      <rect x="155" y="75" width="90" height="50" fill="rgba(226,183,20,0.15)" rx="4"/>
      <!-- Real Golden Acorn inside (glowing) -->
      <ellipse cx="200" cy="95" rx="12" ry="16" fill="#E2B714" stroke="#B8960F" stroke-width="1"/>
      <path d="M 192 82 Q 200 74 208 82" fill="#8B6914"/>
      <!-- Sparkles -->
      ${[[175,80],[225,85],[195,75],[210,100]].map(([x,y]) =>
        `<text x="${x}" y="${y}" fill="#E2B714" font-size="10">*</text>`
      ).join('')}
      <!-- Muffin and Hazel -->
      <g transform="translate(30, 130) scale(0.4)">
        <ellipse cx="40" cy="55" rx="25" ry="18" fill="#A0794C"/>
        <ellipse cx="40" cy="35" rx="16" ry="14" fill="#A0794C"/>
        <circle cx="34" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="46" cy="30" r="2.5" fill="#2C1810"/>
        <circle cx="35" cy="29" r="1" fill="white"/>
        <circle cx="47" cy="29" r="1" fill="white"/>
        <ellipse cx="40" cy="38" rx="5" ry="3" fill="#5C3D1E"/>
        <path d="M 25 23 Q 30 10 40 8 Q 50 10 55 23" fill="#5C3D1E"/>
      </g>
      <!-- Hazel (woman with bun) -->
      <g transform="translate(310, 100)">
        <rect x="0" y="30" width="35" height="45" fill="#8E44AD" rx="5"/>
        <circle cx="17" cy="18" r="14" fill="#F5CBA7"/>
        <circle cx="17" cy="6" r="8" fill="#5C3D1E"/>
        <circle cx="11" cy="17" r="2" fill="#2C1810"/>
        <circle cx="23" cy="17" r="2" fill="#2C1810"/>
      </g>
    `);
  },
};

// Map scene names to problem indices per case
const SCENE_MAP = {
  vanishing_cupcakes: [
    'bakery_counter',
    'bakery_footprints',
    'bakery_vent',
    'bakery_camera',
    'bakery_trap'
  ],
  phantom_library: [
    'library_shelves',
    'library_bookmarks',
    'library_records',
    'library_store',
    'library_security',
    'library_reveal'
  ],
  golden_acorn: [
    'museum_display',
    'museum_visitors',
    'museum_battery',
    'museum_supplies',
    'museum_logbook',
    'museum_safe'
  ]
};
