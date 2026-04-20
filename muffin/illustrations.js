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
  // ============================================================
  // Mini Muffin helper — reusable small detective capybara
  // ============================================================
  _miniMuffin(x, y, scale = 0.55, flipX = false) {
    const flip = flipX ? `translate(${x + 40 * scale}, ${y}) scale(-${scale}, ${scale})` : `translate(${x}, ${y}) scale(${scale})`;
    return `<g transform="${flip}">
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
    </g>`;
  },

  // ============================================================
  // CASE 4: Poisoned Potion Master scenes
  // ============================================================

  // Scene 1: The potion laboratory crime scene
  potion_lab() {
    return this.scene('#1a0a2e', '#0e0620', `
      <!-- Stone floor -->
      <rect x="0" y="175" width="400" height="75" fill="#2a2040"/>
      <rect x="0" y="175" width="400" height="4" fill="#3a2a55"/>
      <!-- Stone floor tiles -->
      ${[0,65,130,195,260,325].map(x => `<rect x="${x}" y="179" width="63" height="35" fill="#251a3a" stroke="#1a1030" stroke-width="1" rx="1"/>`).join('')}
      ${[30,95,160,225,290,355].map(x => `<rect x="${x}" y="214" width="63" height="36" fill="#221838" stroke="#1a1030" stroke-width="1" rx="1"/>`).join('')}

      <!-- Back wall with shelves -->
      <rect x="0" y="0" width="400" height="175" fill="#1e1030"/>

      <!-- Shelf 1 (top) -->
      <rect x="20" y="30" width="160" height="6" fill="#4a3520"/>
      <!-- Potion bottles on top shelf -->
      <rect x="35" y="10" width="12" height="20" fill="#8844cc" rx="3"/><circle cx="41" cy="8" r="5" fill="#9955dd"/>
      <rect x="55" y="14" width="10" height="16" fill="#44aa88" rx="2"/><circle cx="60" cy="12" r="4" fill="#55bb99"/>
      <rect x="80" y="8" width="14" height="22" fill="#cc4466" rx="3"/><circle cx="87" cy="6" r="5" fill="#dd5577"/>
      <rect x="105" y="12" width="10" height="18" fill="#4488cc" rx="2"/><circle cx="110" cy="10" r="4" fill="#5599dd"/>
      <rect x="125" y="10" width="12" height="20" fill="#ccaa22" rx="3"/><circle cx="131" cy="8" r="5" fill="#ddbb33"/>
      <rect x="150" y="14" width="10" height="16" fill="#66cc66" rx="2"/><circle cx="155" cy="12" r="4" fill="#77dd77"/>

      <!-- Shelf 2 (middle) -->
      <rect x="20" y="75" width="160" height="6" fill="#4a3520"/>
      <rect x="30" y="58" width="14" height="17" fill="#cc6644" rx="3"/><circle cx="37" cy="56" r="5" fill="#dd7755"/>
      <rect x="55" y="55" width="10" height="20" fill="#8866cc" rx="2"/><circle cx="60" cy="53" r="4" fill="#9977dd"/>
      <rect x="80" y="60" width="12" height="15" fill="#44ccaa" rx="3"/><circle cx="86" cy="58" r="5" fill="#55ddbb"/>
      <rect x="110" y="57" width="10" height="18" fill="#cc44aa" rx="2"/><circle cx="115" cy="55" r="4" fill="#dd55bb"/>
      <rect x="140" y="60" width="14" height="15" fill="#88cc44" rx="3"/><circle cx="147" cy="58" r="5" fill="#99dd55"/>

      <!-- Large cauldron (center-right) -->
      <ellipse cx="280" cy="155" rx="55" ry="20" fill="#333"/>
      <path d="M225,155 Q225,100 280,95 Q335,100 335,155" fill="#444" stroke="#555" stroke-width="2"/>
      <ellipse cx="280" cy="155" rx="50" ry="17" fill="#1a3a2a"/>
      <!-- Bubbling potion in cauldron -->
      <ellipse cx="280" cy="152" rx="45" ry="14" fill="#22cc66" opacity="0.6"/>
      <circle cx="265" cy="148" r="4" fill="#33dd77" opacity="0.5">
        <animate attributeName="cy" values="148;140;148" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="290" cy="146" r="3" fill="#44ee88" opacity="0.4">
        <animate attributeName="cy" values="146;136;146" dur="2s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="275" cy="145" r="2.5" fill="#33dd77" opacity="0.6">
        <animate attributeName="cy" values="145;133;145" dur="1.8s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      <!-- Eerie glow from cauldron -->
      <ellipse cx="280" cy="140" rx="60" ry="40" fill="#22cc66" opacity="0.06"/>

      <!-- Knocked-over stool -->
      <rect x="190" y="185" width="35" height="5" fill="#6a4520" rx="2" transform="rotate(25 207 187)"/>
      <line x1="195" y1="190" x2="188" y2="210" stroke="#5a3818" stroke-width="3"/>
      <line x1="220" y1="195" x2="228" y2="215" stroke="#5a3818" stroke-width="3"/>

      <!-- Scattered papers on floor -->
      <rect x="140" y="195" width="20" height="15" fill="#f0e8d0" rx="1" transform="rotate(-15 150 202)"/>
      <rect x="165" y="200" width="18" height="12" fill="#e8e0c8" rx="1" transform="rotate(8 174 206)"/>

      <!-- Professor Elixworth unconscious — lower body visible, extends off-screen left -->
      <rect x="-18" y="187" width="92" height="34" fill="#4a2288" rx="7" transform="rotate(-11 46 204)"/>
      <rect x="-10" y="194" width="76" height="11" fill="#5c35a0" rx="4" transform="rotate(-11 46 204)"/>
      <!-- Boot (far foot) -->
      <ellipse cx="64" cy="212" rx="15" ry="9" fill="#28180a" transform="rotate(-11 64 212)"/>
      <ellipse cx="60" cy="209" rx="9" ry="5" fill="#3a2412" transform="rotate(-11 60 209)"/>
      <!-- Boot (near foot, slightly overlapping) -->
      <ellipse cx="53" cy="221" rx="16" ry="9" fill="#221408" transform="rotate(-8 53 221)"/>
      <ellipse cx="49" cy="218" rx="9" ry="5" fill="#3a2412" transform="rotate(-8 49 218)"/>

      <!-- Open dosage logbook -->
      <rect x="30" y="100" width="45" height="30" fill="#f0e8d0" rx="2" stroke="#8a6a40" stroke-width="1"/>
      <line x1="52" y1="100" x2="52" y2="130" stroke="#8a6a40" stroke-width="1"/>
      <line x1="35" y1="108" x2="50" y2="108" stroke="#666" stroke-width="0.5"/>
      <line x1="35" y1="114" x2="48" y2="114" stroke="#666" stroke-width="0.5"/>
      <line x1="55" y1="108" x2="72" y2="108" stroke="#666" stroke-width="0.5"/>
      <line x1="55" y1="114" x2="70" y2="114" stroke="#666" stroke-width="0.5"/>
      <text x="55" y="122" fill="#cc4444" font-size="5" font-weight="bold">6.3×10<tspan dy="-3" font-size="3.5">3</tspan></text>

      <!-- Muffin investigating -->
      ${this._miniMuffin(50, 130)}
    `);
  },

  // Scene 2: Ingredient shelves
  potion_ingredients() {
    return this.scene('#2a1a10', '#1a1008', `
      <!-- Wooden back wall -->
      <rect x="0" y="0" width="400" height="250" fill="#3a2818"/>

      <!-- Large shelf unit -->
      ${[35, 90, 145, 200].map(y => `<rect x="10" y="${y}" width="380" height="8" fill="#5a3a20" stroke="#4a2a18" stroke-width="1"/>`).join('')}

      <!-- Jars on shelf 1 (y=35) -->
      <rect x="25" y="10" width="22" height="25" fill="#8844cc" rx="4" opacity="0.8"/><text x="36" y="50" text-anchor="middle" fill="#ddd" font-size="5">Dragon</text>
      <rect x="60" y="8" width="25" height="27" fill="#44aa88" rx="4" opacity="0.8"/><text x="72" y="50" text-anchor="middle" fill="#ddd" font-size="5">Moon</text>
      <rect x="100" y="12" width="20" height="23" fill="#cc6644" rx="4" opacity="0.8"/><text x="110" y="50" text-anchor="middle" fill="#ddd" font-size="5">Fire</text>
      <rect x="135" y="6" width="28" height="29" fill="#ccaa22" rx="4" opacity="0.8"/><text x="149" y="50" text-anchor="middle" fill="#ddd" font-size="5">Amber</text>
      <rect x="180" y="10" width="22" height="25" fill="#66cc66" rx="4" opacity="0.8"/><text x="191" y="50" text-anchor="middle" fill="#ddd" font-size="5">Sage</text>

      <!-- NIGHTSHADE JAR - notably emptier, highlighted -->
      <rect x="230" y="5" width="30" height="30" fill="#661133" rx="4" stroke="#ff4466" stroke-width="2" opacity="0.9"/>
      <rect x="232" y="20" width="26" height="13" fill="#441122" rx="2" opacity="0.6"/>
      <text x="245" y="50" text-anchor="middle" fill="#ff6688" font-size="5" font-weight="bold">Nightshade!</text>
      <!-- Measurement line on Nightshade jar showing it's half empty -->
      <line x1="262" y1="8" x2="262" y2="33" stroke="#ff8899" stroke-width="0.5" stroke-dasharray="2,2"/>
      <line x1="259" y1="19" x2="265" y2="19" stroke="#ff8899" stroke-width="0.5"/>
      <text x="268" y="21" fill="#ff8899" font-size="4">50%</text>

      <rect x="280" y="10" width="22" height="25" fill="#4488cc" rx="4" opacity="0.8"/><text x="291" y="50" text-anchor="middle" fill="#ddd" font-size="5">Frost</text>
      <rect x="320" y="8" width="25" height="27" fill="#cc44aa" rx="4" opacity="0.8"/><text x="332" y="50" text-anchor="middle" fill="#ddd" font-size="5">Rose</text>
      <rect x="358" y="12" width="22" height="23" fill="#88cc44" rx="4" opacity="0.8"/><text x="369" y="50" text-anchor="middle" fill="#ddd" font-size="5">Vine</text>

      <!-- Jars on shelf 2 (y=90) -->
      ${[[30,65],[60,68],[95,62],[130,67],[170,64],[210,66],[250,63],[290,68],[330,65],[365,67]].map(([x,y]) => {
        const colors = ['#7755aa','#55aa77','#aa7744','#aaaa33','#5577cc','#aa5588','#77aa55','#5588aa','#aa5555','#55aaaa'];
        const i = Math.floor(x/40);
        return `<rect x="${x}" y="${y}" width="18" height="22" fill="${colors[i % colors.length]}" rx="3" opacity="0.7"/>`;
      }).join('')}

      <!-- Jars on shelf 3 (y=145) -->
      ${[[25,120],[65,118],[110,122],[155,119],[200,121],[245,118],[290,120],[340,119]].map(([x,y]) => {
        const colors = ['#9966cc','#66cc99','#cc9966','#99cc66','#6699cc','#cc6699','#66cccc','#cccc66'];
        const i = Math.floor(x/50);
        return `<rect x="${x}" y="${y}" width="22" height="24" fill="${colors[i % colors.length]}" rx="3" opacity="0.6"/>`;
      }).join('')}

      <!-- Wooden floor -->
      <rect x="0" y="208" width="400" height="42" fill="#2a1a08"/>
      ${[0,55,110,165,220,275,330].map(x => `<rect x="${x}" y="208" width="53" height="42" fill="#2a1a0a" stroke="#1e1206" stroke-width="1"/>`).join('')}

      <!-- Muffin on stepladder examining Nightshade jar -->
      <rect x="215" y="175" width="20" height="33" fill="#6a4a28" rx="1"/>
      <rect x="218" y="182" width="14" height="3" fill="#5a3a18"/>
      <rect x="218" y="192" width="14" height="3" fill="#5a3a18"/>
      ${this._miniMuffin(220, 138, 0.45)}

      <!-- Warm lantern glow -->
      <circle cx="200" cy="60" r="80" fill="#ffaa44" opacity="0.03"/>
    `);
  },

  // Scene 3: Delivery logbook
  potion_delivery_log() {
    return this.scene('#3a2818', '#2a1a0e', `
      <!-- Wooden desk -->
      <rect x="30" y="100" width="340" height="120" fill="#5a3a1e" rx="4"/>
      <rect x="30" y="100" width="340" height="8" fill="#6a4a28" rx="4"/>
      <!-- Desk edge detail -->
      <rect x="30" y="220" width="340" height="5" fill="#4a2a14" rx="2"/>

      <!-- Open logbook -->
      <rect x="80" y="108" width="110" height="80" fill="#f0e8d0" rx="3" stroke="#8a6a40" stroke-width="1.5"/>
      <rect x="195" y="108" width="110" height="80" fill="#ece4cc" rx="3" stroke="#8a6a40" stroke-width="1.5"/>
      <!-- Spine -->
      <rect x="188" y="106" width="10" height="84" fill="#8a6a40" rx="2"/>
      <!-- Log entries (left page) -->
      <text x="90" y="122" fill="#444" font-size="5" font-weight="bold">Delivery Log</text>
      <line x1="90" y1="125" x2="180" y2="125" stroke="#aaa" stroke-width="0.5"/>
      <text x="90" y="134" fill="#555" font-size="4.5">Mar 12 - Starwell - 0.5kg Frostberry</text>
      <text x="90" y="143" fill="#555" font-size="4.5">Mar 15 - Thornwick - 2kg Ironwood</text>
      <text x="90" y="152" fill="#555" font-size="4.5">Mar 18 - Starwell - 1.2kg Silverleaf</text>
      <!-- Right page - highlighted entry -->
      <text x="205" y="122" fill="#444" font-size="5" font-weight="bold">Recent Entries</text>
      <line x1="205" y1="125" x2="295" y2="125" stroke="#aaa" stroke-width="0.5"/>
      <rect x="203" y="128" width="97" height="14" fill="#ffeecc" rx="1"/>
      <text x="205" y="138" fill="#cc4444" font-size="4.5" font-weight="bold">Mar 22 - Luna S. - 0.75kg Moon.</text>
      <text x="205" y="152" fill="#555" font-size="4.5">Mar 20 - Guild - 3.0kg Crystal</text>
      <text x="205" y="161" fill="#555" font-size="4.5">Mar 19 - Thornwick - "Gift"</text>

      <!-- Quill pen and ink pot -->
      <circle cx="330" cy="125" r="8" fill="#222"/><circle cx="330" cy="122" r="6" fill="#111"/>
      <line x1="328" y1="118" x2="340" y2="90" stroke="#8a6a40" stroke-width="1.5"/>
      <path d="M340,90 L343,82 L337,88" fill="#ddd" stroke="#aaa" stroke-width="0.5"/>

      <!-- Stack of receipts -->
      <rect x="55" y="115" width="18" height="12" fill="#e8e0c8" rx="1" transform="rotate(-8 64 121)"/>
      <rect x="53" y="113" width="18" height="12" fill="#ece4cc" rx="1" transform="rotate(-5 62 119)"/>
      <rect x="51" y="111" width="18" height="12" fill="#f0e8d0" rx="1" transform="rotate(-2 60 117)"/>

      <!-- Warm lantern -->
      <rect x="340" y="60" width="15" height="25" fill="#333" rx="3" stroke="#555" stroke-width="1"/>
      <ellipse cx="347" cy="68" rx="5" ry="8" fill="#ffaa44" opacity="0.7">
        <animate attributeName="ry" values="8;9;7;8" dur="1s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="347" cy="68" r="25" fill="#ffaa44" opacity="0.05"/>

      <!-- Wall behind -->
      <rect x="0" y="0" width="400" height="100" fill="#2a1a0e"/>

      <!-- Muffin reading the logbook -->
      ${this._miniMuffin(140, 70, 0.5)}
    `);
  },

  // Scene 4: Interview with Vera Vex (apprentice)
  potion_interview_vera() {
    return this.scene('#1e1838', '#141028', `
      <!-- Lab workspace background -->
      <rect x="0" y="160" width="400" height="90" fill="#221a3a"/>
      <rect x="0" y="160" width="400" height="4" fill="#2a2245"/>

      <!-- Workbench -->
      <rect x="120" y="110" width="260" height="55" fill="#4a3520" rx="3"/>
      <rect x="120" y="110" width="260" height="6" fill="#5a4528" rx="3"/>

      <!-- Beakers and equipment on workbench -->
      <!-- Graduated cylinder -->
      <rect x="160" y="70" width="12" height="40" fill="rgba(180,220,255,0.3)" stroke="rgba(180,220,255,0.5)" stroke-width="1" rx="2"/>
      <rect x="162" y="85" width="8" height="23" fill="rgba(100,180,255,0.3)" rx="1"/>
      <text x="175" y="100" fill="#aaccff" font-size="4">3200 mL</text>
      <!-- Beaker 1 -->
      <path d="M200,80 L195,105 L225,105 L220,80 Z" fill="rgba(180,220,255,0.2)" stroke="rgba(180,220,255,0.4)" stroke-width="1"/>
      <rect x="197" y="92" width="26" height="13" fill="rgba(100,200,150,0.3)" rx="1"/>
      <!-- Beaker 2 -->
      <path d="M240,85 L237,105 L260,105 L257,85 Z" fill="rgba(180,220,255,0.2)" stroke="rgba(180,220,255,0.4)" stroke-width="1"/>
      <rect x="239" y="95" width="19" height="10" fill="rgba(200,100,200,0.3)" rx="1"/>
      <!-- Measuring spoons -->
      <ellipse cx="290" cy="102" rx="8" ry="4" fill="#888" stroke="#666" stroke-width="1"/>
      <line x1="298" y1="102" x2="320" y2="98" stroke="#888" stroke-width="1.5"/>
      <ellipse cx="310" cy="100" rx="6" ry="3" fill="#888" stroke="#666" stroke-width="1"/>

      <!-- Vera Vex (apprentice) — young woman with goggles -->
      <g transform="translate(40, 85)">
        <!-- Body with purple apron -->
        <rect x="5" y="30" width="35" height="50" fill="#5544aa" rx="5"/>
        <!-- Apron -->
        <rect x="10" y="35" width="25" height="40" fill="#7766cc" rx="3"/>
        <!-- Head -->
        <circle cx="22" cy="18" r="14" fill="#F5CBA7"/>
        <!-- Hair (dark, tied back) -->
        <path d="M8,18 Q8,2 22,2 Q36,2 36,18" fill="#3a1a08"/>
        <ellipse cx="22" cy="5" rx="14" ry="6" fill="#3a1a08"/>
        <!-- Goggles pushed up on forehead -->
        <ellipse cx="15" cy="10" rx="6" ry="4" fill="none" stroke="#888" stroke-width="1.5"/>
        <ellipse cx="29" cy="10" rx="6" ry="4" fill="none" stroke="#888" stroke-width="1.5"/>
        <circle cx="15" cy="10" r="4" fill="rgba(150,200,255,0.2)"/>
        <circle cx="29" cy="10" r="4" fill="rgba(150,200,255,0.2)"/>
        <!-- Eyes -->
        <circle cx="17" cy="18" r="2" fill="#2C1810"/>
        <circle cx="27" cy="18" r="2" fill="#2C1810"/>
        <!-- Mouth (nervous) -->
        <path d="M 17 24 Q 22 26 27 24" fill="none" stroke="#8a6a4a" stroke-width="1"/>
      </g>

      <!-- Muffin facing Vera -->
      ${this._miniMuffin(290, 115, 0.5, true)}

      <!-- Wall details -->
      <rect x="300" y="20" width="70" height="50" fill="#2a1a3a" rx="2" stroke="#3a2a4a" stroke-width="1"/>
      <text x="335" y="40" text-anchor="middle" fill="#776699" font-size="6">Recipe</text>
      <text x="335" y="50" text-anchor="middle" fill="#776699" font-size="6">Board</text>
    `);
  },

  // Scene 5: Interview with Barnaby Thornwick (rival)
  potion_interview_barnaby() {
    return this.scene('#0e1a0e', '#081208', `
      <!-- Dark, shadowy shop interior -->
      <rect x="0" y="165" width="400" height="85" fill="#1a2a1a"/>
      <rect x="0" y="0" width="400" height="165" fill="#0e1a0e"/>

      <!-- Cluttered counter/desk -->
      <rect x="100" y="120" width="200" height="45" fill="#3a3020" rx="3"/>
      <rect x="100" y="120" width="200" height="6" fill="#4a4028" rx="3"/>

      <!-- Gold coins scattered on desk -->
      ${[[120,130],[135,133],[125,140],[150,128],[145,138],[165,135],[175,130]].map(([x,y]) =>
        `<circle cx="${x}" cy="${y}" r="4" fill="#daa520" stroke="#b8860b" stroke-width="0.5"/><text x="${x}" y="${y+2}" text-anchor="middle" fill="#8a6a20" font-size="4">G</text>`
      ).join('')}

      <!-- Order forms / receipts -->
      <rect x="200" y="125" width="25" height="18" fill="#f0e8d0" rx="1" transform="rotate(5 212 134)"/>
      <rect x="230" y="128" width="25" height="18" fill="#e8e0c8" rx="1" transform="rotate(-3 242 137)"/>
      <rect x="260" y="126" width="25" height="18" fill="#f0e8d0" rx="1"/>
      <text x="272" y="136" text-anchor="middle" fill="#cc4444" font-size="4">10^3 vials</text>

      <!-- Locked cabinet (suspicious) -->
      <rect x="330" y="60" width="50" height="60" fill="#2a2018" rx="3" stroke="#3a3020" stroke-width="2"/>
      <circle cx="355" cy="90" r="3" fill="#888"/>
      <rect x="352" y="90" width="6" height="8" fill="#666" rx="1"/>

      <!-- Barnaby Thornwick — shady rival with pointed hat -->
      <g transform="translate(120, 55)">
        <!-- Body (dark green robe) -->
        <rect x="5" y="30" width="35" height="55" fill="#2a4a2a" rx="5"/>
        <!-- Head -->
        <circle cx="22" cy="18" r="14" fill="#E8C99B"/>
        <!-- Pointed hat -->
        <polygon points="22,-10 5,22 39,22" fill="#1a3a1a"/>
        <rect x="5" y="18" width="34" height="6" fill="#1a3a1a" rx="2"/>
        <!-- Narrow eyes (shifty) -->
        <line x1="14" y1="17" x2="22" y2="17" stroke="#2C1810" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="25" y1="17" x2="33" y2="17" stroke="#2C1810" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Thin mustache -->
        <path d="M 16 24 Q 22 22 28 24" fill="none" stroke="#3a2a1a" stroke-width="1"/>
        <!-- Nervous sweat drop -->
        <ellipse cx="38" cy="12" rx="2" ry="3" fill="#88ccff" opacity="0.6"/>
      </g>

      <!-- Muffin questioning him -->
      ${this._miniMuffin(260, 120, 0.5, true)}

      <!-- Dim green lamp -->
      <circle cx="200" cy="40" r="30" fill="#44aa44" opacity="0.04"/>
      <rect x="195" y="30" width="10" height="15" fill="#333" rx="2"/>
      <ellipse cx="200" cy="35" rx="4" ry="5" fill="#44aa44" opacity="0.3"/>
    `);
  },

  // Scene 6: Interview with Luna Starwell (courier)
  potion_interview_luna() {
    return this.scene('#4a6a8a', '#2a4a6a', `
      <!-- Interior with window showing sky -->
      <rect x="0" y="160" width="400" height="90" fill="#3a2818"/>
      <rect x="0" y="0" width="400" height="160" fill="#4a3828"/>

      <!-- Window showing blue sky -->
      <rect x="250" y="20" width="120" height="80" fill="#6aaadd" rx="3" stroke="#5a3818" stroke-width="4"/>
      <line x1="310" y1="20" x2="310" y2="100" stroke="#5a3818" stroke-width="2"/>
      <line x1="250" y1="60" x2="370" y2="60" stroke="#5a3818" stroke-width="2"/>
      <!-- Cloud in window -->
      <ellipse cx="290" cy="40" rx="15" ry="6" fill="white" opacity="0.7"/>
      <ellipse cx="330" cy="50" rx="12" ry="5" fill="white" opacity="0.5"/>

      <!-- Route map on wall -->
      <rect x="30" y="20" width="100" height="70" fill="#f0e8d0" rx="2" stroke="#8a6a40" stroke-width="2"/>
      <text x="80" y="35" text-anchor="middle" fill="#444" font-size="6" font-weight="bold">Route Map</text>
      <!-- Route line with distance markers -->
      <circle cx="45" cy="55" r="4" fill="#4488cc"/><text x="45" y="72" text-anchor="middle" fill="#444" font-size="4">Harbor</text>
      <line x1="49" y1="55" x2="80" y2="50" stroke="#cc4444" stroke-width="1.5" stroke-dasharray="3,2"/>
      <circle cx="80" cy="50" r="3" fill="#44aa88"/><text x="80" y="72" text-anchor="middle" fill="#444" font-size="4">Market</text>
      <text x="63" y="47" fill="#cc4444" font-size="4">2.5 km</text>
      <line x1="83" y1="50" x2="115" y2="55" stroke="#cc4444" stroke-width="1.5" stroke-dasharray="3,2"/>
      <circle cx="115" cy="55" r="4" fill="#cc6644"/><text x="115" y="72" text-anchor="middle" fill="#444" font-size="4">Lab</text>
      <text x="100" y="47" fill="#cc4444" font-size="4">1800 m</text>

      <!-- Horse and small cart in background (by window) -->
      <g transform="translate(260, 105) scale(0.8)">
        <!-- Cart -->
        <rect x="0" y="20" width="40" height="20" fill="#5a3a18" rx="2"/>
        <circle cx="8" cy="42" r="6" fill="#3a2a18" stroke="#2a1a08" stroke-width="1"/>
        <circle cx="32" cy="42" r="6" fill="#3a2a18" stroke="#2a1a08" stroke-width="1"/>
        <!-- Horse (simplified) -->
        <ellipse cx="60" cy="20" rx="18" ry="12" fill="#8a6a44"/>
        <ellipse cx="78" cy="10" rx="8" ry="10" fill="#8a6a44"/>
        <ellipse cx="82" cy="8" rx="4" ry="3" fill="#7a5a34"/>
        <line x1="50" y1="30" x2="50" y2="45" stroke="#7a5a34" stroke-width="2"/>
        <line x1="70" y1="30" x2="70" y2="45" stroke="#7a5a34" stroke-width="2"/>
      </g>

      <!-- Luna Starwell — friendly courier with satchel -->
      <g transform="translate(150, 80)">
        <!-- Body (warm brown outfit) -->
        <rect x="5" y="30" width="35" height="50" fill="#8a5a3a" rx="5"/>
        <!-- Satchel strap -->
        <line x1="10" y1="30" x2="35" y2="55" stroke="#5a3a1a" stroke-width="3"/>
        <rect x="28" y="50" width="18" height="14" fill="#6a4a2a" rx="2"/>
        <!-- Head -->
        <circle cx="22" cy="18" r="14" fill="#D4A76A"/>
        <!-- Hair (warm auburn, ponytail) -->
        <path d="M8,18 Q8,4 22,3 Q36,4 36,18" fill="#A0522D"/>
        <ellipse cx="36" cy="14" rx="5" ry="8" fill="#A0522D"/>
        <!-- Friendly eyes -->
        <circle cx="17" cy="17" r="2.5" fill="#2C1810"/>
        <circle cx="27" cy="17" r="2.5" fill="#2C1810"/>
        <circle cx="18" cy="16" r="1" fill="white"/>
        <circle cx="28" cy="16" r="1" fill="white"/>
        <!-- Warm smile -->
        <path d="M 16 24 Q 22 28 28 24" fill="none" stroke="#8a5a3a" stroke-width="1.2"/>
      </g>

      <!-- Muffin checking route -->
      ${this._miniMuffin(50, 100, 0.5)}
    `);
  },

  // Scene 7: Professor's private study
  potion_study() {
    return this.scene('#1a1008', '#100a04', `
      <!-- Dark wood paneled walls -->
      <rect x="0" y="0" width="400" height="250" fill="#2a1a0a"/>
      ${[0,55,110,165,220,275,330].map(x => `<rect x="${x}" y="0" width="53" height="250" fill="#2a1a0c" stroke="#221608" stroke-width="1"/>`).join('')}

      <!-- Floor -->
      <rect x="0" y="200" width="400" height="50" fill="#1a1008"/>

      <!-- Heavy wooden desk -->
      <rect x="80" y="130" width="240" height="70" fill="#4a3018" rx="4"/>
      <rect x="80" y="130" width="240" height="8" fill="#5a4020" rx="4"/>
      <!-- Desk drawers -->
      <rect x="90" y="160" width="50" height="30" fill="#3a2010" rx="2" stroke="#2a1808" stroke-width="1"/>
      <circle cx="115" cy="175" r="2" fill="#888"/>
      <rect x="260" y="160" width="50" height="30" fill="#3a2010" rx="2" stroke="#2a1808" stroke-width="1"/>
      <circle cx="285" cy="175" r="2" fill="#888"/>

      <!-- Stacked ancient books -->
      <rect x="95" y="110" width="40" height="20" fill="#8a3030" rx="2"/>
      <rect x="100" y="100" width="35" height="12" fill="#305a8a" rx="2"/>
      <rect x="97" y="90" width="38" height="12" fill="#3a6a2a" rx="2"/>
      <rect x="102" y="82" width="30" height="10" fill="#6a4a20" rx="2"/>

      <!-- Glowing formula parchment (the key discovery!) -->
      <rect x="170" y="115" width="60" height="40" fill="#f0e0b0" rx="2" stroke="#daa520" stroke-width="1.5"/>
      <!-- Golden glow around parchment -->
      <rect x="165" y="110" width="70" height="50" fill="none" stroke="#daa520" stroke-width="1" opacity="0.4" rx="4"/>
      <rect x="160" y="105" width="80" height="60" fill="#ffcc44" opacity="0.03" rx="6"/>
      <!-- Formula text -->
      <text x="200" y="128" text-anchor="middle" fill="#8a4a1a" font-size="5" font-weight="bold">Universal Antidote</text>
      <text x="200" y="138" text-anchor="middle" fill="#6a3a0a" font-size="4.5">1/3 Starlight Essence</text>
      <text x="200" y="147" text-anchor="middle" fill="#6a3a0a" font-size="4.5">1/4 Dragon Tear</text>

      <!-- Candle with flickering light -->
      <rect x="280" y="110" width="8" height="20" fill="#eee8d0" rx="2"/>
      <ellipse cx="284" cy="108" rx="3" ry="5" fill="#ffaa33" opacity="0.8">
        <animate attributeName="ry" values="5;6;4;5" dur="0.8s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="284" cy="106" rx="2" ry="3" fill="#ffdd66" opacity="0.9">
        <animate attributeName="ry" values="3;4;2;3" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="284" cy="108" r="30" fill="#ffaa33" opacity="0.04"/>

      <!-- Muffin discovering the formula -->
      ${this._miniMuffin(185, 80, 0.45)}
    `);
  },

  // Scene 8: Potion analysis room
  potion_analysis() {
    return this.scene('#1a1a2e', '#101020', `
      <!-- Clean lab environment -->
      <rect x="0" y="170" width="400" height="80" fill="#181830"/>
      <rect x="0" y="0" width="400" height="170" fill="#1e1e38"/>

      <!-- Analysis bench (white/clean) -->
      <rect x="40" y="120" width="320" height="50" fill="#ddd" rx="3"/>
      <rect x="40" y="120" width="320" height="5" fill="#eee" rx="3"/>

      <!-- Precision scale -->
      <g transform="translate(70, 80)">
        <rect x="5" y="30" width="50" height="10" fill="#888" rx="2"/>
        <rect x="27" y="10" width="6" height="22" fill="#999"/>
        <line x1="5" y1="12" x2="55" y2="12" stroke="#aaa" stroke-width="2"/>
        <polygon points="10,12 20,2 0,2" fill="#bbb"/>
        <polygon points="50,12 60,2 40,2" fill="#bbb"/>
        <!-- Scale pans -->
        <path d="M5,12 Q0,20 -5,14 Q0,16 5,14" fill="#999"/>
        <path d="M55,12 Q60,20 65,14 Q60,16 55,14" fill="#999"/>
      </g>

      <!-- Test vial rack -->
      <rect x="180" y="100" width="80" height="8" fill="#666" rx="1"/>
      <rect x="178" y="100" width="4" height="20" fill="#555"/>
      <rect x="258" y="100" width="4" height="20" fill="#555"/>
      <!-- Color-coded vials -->
      ${[[190,80],[202,82],[214,78],[226,81],[238,79],[250,83]].map(([x,y], i) => {
        const colors = ['#cc4466','#44aa88','#8844cc','#ccaa22','#4488cc','#cc6644'];
        return `<rect x="${x}" y="${y}" width="8" height="${100-y+8}" fill="${colors[i]}" rx="2" opacity="0.7"/>
                <circle cx="${x+4}" cy="${y-2}" r="3" fill="${colors[i]}" opacity="0.9"/>`;
      }).join('')}

      <!-- Magnified droplet view (the key analysis) -->
      <circle cx="320" cy="70" r="40" fill="#111" stroke="#4488cc" stroke-width="2"/>
      <circle cx="320" cy="70" r="38" fill="#0a0a1a"/>
      <!-- Droplet inside magnified view -->
      <ellipse cx="320" cy="75" rx="15" ry="18" fill="#22cc66" opacity="0.3"/>
      <ellipse cx="320" cy="72" rx="12" ry="15" fill="#33dd77" opacity="0.2"/>
      <!-- Concentration reading -->
      <text x="320" y="62" text-anchor="middle" fill="#44ee88" font-size="5" font-weight="bold">0.045 g</text>
      <text x="320" y="72" text-anchor="middle" fill="#aaa" font-size="4">per dose</text>
      <!-- Crosshairs -->
      <line x1="280" y1="70" x2="360" y2="70" stroke="#4488cc" stroke-width="0.5" opacity="0.5"/>
      <line x1="320" y1="30" x2="320" y2="110" stroke="#4488cc" stroke-width="0.5" opacity="0.5"/>

      <!-- Notebook with calculations -->
      <rect x="40" y="128" width="40" height="30" fill="#f0e8d0" rx="1"/>
      <text x="60" y="140" text-anchor="middle" fill="#444" font-size="4">45 mg/dose</text>
      <text x="60" y="148" text-anchor="middle" fill="#cc4444" font-size="4">x10 doses</text>
      <text x="60" y="156" text-anchor="middle" fill="#cc4444" font-size="4" font-weight="bold">= 450 mg!</text>

      <!-- Muffin at the analysis station -->
      ${this._miniMuffin(140, 78, 0.45)}
    `);
  },

  // Scene 9: The dramatic confrontation
  potion_confrontation() {
    return this.scene('#1a0a0a', '#100505', `
      <!-- Dramatic dark room with spotlight effect -->
      <rect x="0" y="170" width="400" height="80" fill="#1a1010"/>
      <rect x="0" y="0" width="400" height="170" fill="#140808"/>

      <!-- Spotlight on Barnaby -->
      <ellipse cx="300" cy="170" rx="60" ry="15" fill="#ffaa33" opacity="0.08"/>
      <polygon points="270,0 250,170 350,170 330,0" fill="#ffaa33" opacity="0.03"/>

      <!-- Evidence board behind Muffin -->
      <rect x="30" y="20" width="130" height="90" fill="#2a2020" rx="3" stroke="#4a3030" stroke-width="2"/>
      <text x="95" y="36" text-anchor="middle" fill="#cc8844" font-size="6" font-weight="bold">EVIDENCE</text>
      <!-- Clue cards pinned to board -->
      <rect x="40" y="42" width="25" height="18" fill="#f0e8d0" rx="1" transform="rotate(-3 52 51)"/>
      <text x="52" y="53" text-anchor="middle" fill="#444" font-size="3.5">450mg</text>
      <rect x="75" y="40" width="25" height="18" fill="#f0e8d0" rx="1" transform="rotate(2 87 49)"/>
      <text x="87" y="51" text-anchor="middle" fill="#444" font-size="3.5">0.75kg</text>
      <rect x="110" y="43" width="25" height="18" fill="#f0e8d0" rx="1" transform="rotate(-1 122 52)"/>
      <text x="122" y="54" text-anchor="middle" fill="#444" font-size="3.5">Gift</text>
      <!-- Red string connecting clues -->
      <line x1="55" y1="55" x2="85" y2="52" stroke="#cc4444" stroke-width="0.8"/>
      <line x1="85" y1="52" x2="120" y2="54" stroke="#cc4444" stroke-width="0.8"/>
      <!-- More evidence -->
      <rect x="50" y="68" width="25" height="18" fill="#ffe8cc" rx="1"/>
      <text x="62" y="79" text-anchor="middle" fill="#444" font-size="3.5">10^3</text>
      <rect x="90" y="70" width="25" height="18" fill="#ffe8cc" rx="1"/>
      <text x="102" y="81" text-anchor="middle" fill="#cc4444" font-size="3.5">MATCH!</text>
      <line x1="62" y1="80" x2="100" y2="82" stroke="#cc4444" stroke-width="0.8"/>

      <!-- Professor Elixworth recovering (background, in chair) -->
      <g transform="translate(170, 100)">
        <!-- Chair -->
        <rect x="0" y="20" width="40" height="45" fill="#4a3020" rx="3"/>
        <rect x="-3" y="5" width="46" height="20" fill="#4a3020" rx="3"/>
        <!-- Professor (elderly, recovering) -->
        <circle cx="20" cy="15" r="10" fill="#E8C99B"/>
        <path d="M10,15 Q10,3 20,2 Q30,3 30,15" fill="#cccccc"/>
        <circle cx="16" cy="15" r="1.5" fill="#2C1810"/>
        <circle cx="24" cy="15" r="1.5" fill="#2C1810"/>
        <path d="M 15 20 Q 20 23 25 20" fill="none" stroke="#8a6a4a" stroke-width="0.8"/>
        <rect x="5" y="25" width="30" height="35" fill="#5a4a8a" rx="3"/>
      </g>

      <!-- Barnaby cornered and nervous -->
      <g transform="translate(280, 60)">
        <rect x="5" y="30" width="35" height="55" fill="#2a4a2a" rx="5"/>
        <circle cx="22" cy="18" r="14" fill="#E8C99B"/>
        <polygon points="22,-10 5,22 39,22" fill="#1a3a1a"/>
        <rect x="5" y="18" width="34" height="6" fill="#1a3a1a" rx="2"/>
        <!-- Wide scared eyes -->
        <circle cx="15" cy="16" r="3.5" fill="white"/>
        <circle cx="29" cy="16" r="3.5" fill="white"/>
        <circle cx="15" cy="16" r="2" fill="#2C1810"/>
        <circle cx="29" cy="16" r="2" fill="#2C1810"/>
        <!-- Open mouth (shocked) -->
        <ellipse cx="22" cy="26" rx="4" ry="3" fill="#3a1a0a"/>
        <!-- Sweat drops -->
        <ellipse cx="40" cy="10" rx="2" ry="3" fill="#88ccff" opacity="0.5"/>
        <ellipse cx="3" cy="14" rx="1.5" ry="2.5" fill="#88ccff" opacity="0.4"/>
      </g>

      <!-- Muffin in hero pose, presenting evidence -->
      ${this._miniMuffin(80, 110, 0.6)}
    `);
  },

  // Scene: Professor's research notes (Powers of 10 divide)
  potion_notes() {
    return this.scene('#100e03', '#0c0a02', `
      <!-- Warm candlelit study — wood-panelled walls -->
      <rect x="0" y="0" width="400" height="250" fill="#1a1408"/>
      ${[0,32,64,96,128,160,192,224,256,288,320,352,384].map(x => `<rect x="${x}" y="0" width="30" height="175" fill="${x%64===0?'#1e1608':'#1c1508'}" stroke="#14100a" stroke-width="1"/>`).join('')}
      <!-- Floor boards -->
      <rect x="0" y="175" width="400" height="75" fill="#18120a"/>
      ${[0,48,96].map(i => `<rect x="0" y="${175+i}" width="400" height="48" fill="${i===48?'#160f08':'#18120a'}" stroke="#100c06" stroke-width="0.5"/>`).join('')}

      <!-- Chalkboard on back wall (safety protocol) -->
      <rect x="210" y="12" width="170" height="108" fill="#172212" rx="4" stroke="#5a3c18" stroke-width="3"/>
      <rect x="215" y="17" width="160" height="98" fill="#1a2814" rx="2"/>
      <text x="295" y="34" text-anchor="middle" fill="#b8d4b0" font-size="7" font-weight="bold">Safety Protocol</text>
      <line x1="218" y1="38" x2="372" y2="38" stroke="#6a9060" stroke-width="0.6" opacity="0.6"/>
      <text x="295" y="52" text-anchor="middle" fill="#9cc890" font-size="5.5">Lethal dose threshold:</text>
      <text x="295" y="66" text-anchor="middle" fill="#ddffd8" font-size="6.5">6,300 ÷ 10² mg/hr</text>
      <text x="295" y="82" text-anchor="middle" fill="#ffee88" font-size="8" font-weight="bold">= 63 mg/hr</text>
      <text x="295" y="98" text-anchor="middle" fill="#ff8888" font-size="5.5">⚠ DO NOT EXCEED ⚠</text>
      <!-- chalk ledge -->
      <rect x="215" y="108" width="160" height="6" fill="#172212" rx="1"/>
      <rect x="222" y="107" width="18" height="5" fill="#ccddbb" rx="1" opacity="0.6"/>
      <rect x="248" y="107" width="12" height="5" fill="#ccddbb" rx="1" opacity="0.5"/>

      <!-- Oak desk -->
      <rect x="20" y="132" width="185" height="48" fill="#4a2e10" rx="4" stroke="#3a2008" stroke-width="2"/>
      <rect x="20" y="132" width="185" height="10" fill="#5c3c18" rx="2"/>
      <rect x="25" y="178" width="12" height="22" fill="#3a2008"/>
      <rect x="185" y="178" width="12" height="22" fill="#3a2008"/>

      <!-- Stack of reference books (left of desk) -->
      <rect x="28" y="110" width="40" height="11" fill="#7a2222" rx="1" stroke="#5a1a1a" stroke-width="0.5"/>
      <rect x="30" y="100" width="36" height="11" fill="#224a88" rx="1" stroke="#1a3a6a" stroke-width="0.5"/>
      <rect x="32" y="91" width="32" height="10" fill="#226633" rx="1" stroke="#1a5522" stroke-width="0.5"/>

      <!-- Open research notebook (center of desk) -->
      <rect x="82" y="110" width="108" height="26" fill="#f4eedc" rx="2" stroke="#8a6a40" stroke-width="1.5"/>
      <line x1="136" y1="110" x2="136" y2="136" stroke="#c4a468" stroke-width="1"/>
      <!-- Left page lines -->
      ${[116,121,126,131].map(y=>`<line x1="85" y1="${y}" x2="134" y2="${y}" stroke="#ccc" stroke-width="0.4"/>`).join('')}
      <text x="100" y="119" text-anchor="middle" fill="#2a1800" font-size="4.5" font-style="italic">Max safe dose:</text>
      <text x="96" y="127" fill="#cc2222" font-size="5.5" font-weight="bold">6,300÷10²=63</text>
      <!-- Right page -->
      ${[116,121,126,131].map(y=>`<line x1="138" y1="${y}" x2="186" y2="${y}" stroke="#ccc" stroke-width="0.4"/>`).join('')}
      <text x="162" y="119" text-anchor="middle" fill="#333" font-size="4">Nightshade</text>
      <text x="162" y="125" text-anchor="middle" fill="#cc2222" font-size="5" font-weight="bold">THRESHOLD</text>
      <text x="162" y="132" text-anchor="middle" fill="#cc2222" font-size="4.5">63 mg/hr !</text>

      <!-- Candle with animated flame -->
      <rect x="56" y="110" width="11" height="24" fill="#ede0c0" rx="1"/>
      <rect x="58" y="108" width="7" height="4" fill="#ede0c0"/>
      <ellipse cx="62" cy="106" rx="4" ry="6" fill="#ff7722" opacity="0.85">
        <animate attributeName="rx" values="4;3.2;4.5;4" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="62" cy="105" rx="2.5" ry="3.5" fill="#ffcc22" opacity="0.9"/>
      <ellipse cx="62" cy="118" rx="24" ry="18" fill="#ff8833" opacity="0.05"/>

      <!-- Quill pen and inkwell -->
      <ellipse cx="198" cy="130" rx="9" ry="11" fill="#0d0d0d"/>
      <ellipse cx="198" cy="123" rx="5.5" ry="5" fill="#1a1a8a" opacity="0.9"/>
      <line x1="198" y1="113" x2="208" y2="100" stroke="#d4c896" stroke-width="1.5"/>
      <ellipse cx="209" cy="99" rx="5" ry="2.5" fill="#e8dca8"/>

      <!-- Muffin reading the notebook intently -->
      ${this._miniMuffin(148, 132, 0.48, true)}
    `);
  },

  // Scene: Storage closet — forced entry, tipped Starfire Crystal
  potion_storage() {
    return this.scene('#060610', '#030308', `
      <!-- Narrow stone storage room -->
      <rect x="0" y="0" width="400" height="250" fill="#0a0a16"/>
      <!-- Stone blocks left wall -->
      ${[[0,0,118,55],[118,0,162,40],[280,0,120,48],[0,55,98,52],[98,55,182,45],[280,55,120,52],[0,107,138,50],[138,107,122,55],[260,107,140,50],[0,157,110,48],[110,157,160,44],[270,157,130,48]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0e0e1a" stroke="#08080e" stroke-width="1.5"/>`).join('')}
      <!-- Floor -->
      <rect x="0" y="180" width="400" height="70" fill="#0c0c14"/>
      ${[0,80,160,240,320].map(x=>`<rect x="${x}" y="183" width="78" height="32" fill="#0a0a12" stroke="#06060c" stroke-width="1"/>`).join('')}

      <!-- Left shelving unit -->
      <rect x="8" y="18" width="9" height="165" fill="#3a2616" rx="1"/>
      <rect x="148" y="18" width="9" height="165" fill="#3a2616" rx="1"/>
      ${[32,72,112,152].map(y=>`<rect x="8" y="${y}" width="149" height="7" fill="#4a3420" stroke="#3a2816" stroke-width="1"/>`).join('')}

      <!-- Shelf contents — organized containers -->
      <!-- Top shelf: large sealed canisters -->
      <rect x="16" y="13" width="30" height="19" fill="#4a6677" rx="2" stroke="#3a5566" stroke-width="1"/>
      <rect x="50" y="15" width="24" height="17" fill="#556644" rx="2" stroke="#445533" stroke-width="1"/>
      <rect x="78" y="12" width="32" height="20" fill="#664433" rx="2" stroke="#553322" stroke-width="1"/>
      <rect x="114" y="14" width="22" height="18" fill="#445566" rx="2" stroke="#334455" stroke-width="1"/>
      <!-- Second shelf: glass jars -->
      ${[[18,52],[38,54],[58,52],[78,55],[98,53],[118,52],[138,54]].map(([x,y])=>`<ellipse cx="${x+8}" cy="${y}" rx="10" ry="12" fill="#7a8a9a" opacity="0.7" stroke="#5a6a7a" stroke-width="0.5"/><ellipse cx="${x+8}" cy="${y-8}" rx="7" ry="3.5" fill="#8a9aaa" opacity="0.6"/>`).join('')}
      <!-- Third shelf: small vials (mostly intact) -->
      ${[14,24,34,44,54,64,74,84,102,112].map(x=>`<rect x="${x}" y="97" width="8" height="16" fill="#aaccee" rx="2" stroke="#88aacc" stroke-width="0.5" opacity="0.8"/><circle cx="${x+4}" cy="96" r="3" fill="#bbddf0" opacity="0.7"/>`).join('')}
      <!-- TIPPED Starfire Crystal container — glittering crystals spilled -->
      <rect x="92" y="108" width="28" height="18" fill="#e8d890" rx="3" transform="rotate(82 106 117)" stroke="#d4c470" stroke-width="1"/>
      <text x="76" y="126" fill="#cc8800" font-size="4.5" font-style="italic" font-weight="bold">Starfire</text>
      <!-- Spilled crystals (scattered sparkles) -->
      ${[[96,152,0.7],[108,158,0.9],[88,161,0.6],[122,155,0.8],[114,163,0.75],[102,167,0.65],[84,155,0.85],[128,162,0.7],[118,170,0.6],[94,169,0.8]].map(([x,y,op])=>`<polygon points="${x},${y} ${x+3},${y-5} ${x+6},${y} ${x+3},${y+2}" fill="#f0e060" opacity="${op}"/>`).join('')}

      <!-- Broken lock on floor (forced entry) -->
      <rect x="220" y="194" width="22" height="13" fill="#777" rx="2"/>
      <path d="M224,193 Q231,184 238,193" fill="none" stroke="#999" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Broken shackle -->
      <path d="M228,191 Q231,186 234,191" fill="none" stroke="#bbb" stroke-width="2" opacity="0.5" stroke-dasharray="2,1"/>

      <!-- Right shelving unit (some items disturbed) -->
      <rect x="248" y="18" width="9" height="165" fill="#3a2616" rx="1"/>
      <rect x="383" y="18" width="9" height="165" fill="#3a2616" rx="1"/>
      ${[32,72,112,152].map(y=>`<rect x="248" y="${y}" width="144" height="7" fill="#4a3420"/>`).join('')}
      <rect x="256" y="14" width="28" height="18" fill="#556644" rx="2"/>
      <rect x="288" y="16" width="22" height="16" fill="#774433" rx="2" transform="rotate(9 299 24)"/>
      <rect x="316" y="13" width="30" height="19" fill="#4a5566" rx="2"/>
      <rect x="352" y="15" width="24" height="17" fill="#665544" rx="2"/>

      <!-- Muffin with torch/light investigating -->
      ${this._miniMuffin(195, 135, 0.55)}
      <!-- Torch glow (soft cone of light) -->
      <polygon points="228,155 320,128 320,182" fill="#ffee88" opacity="0.05"/>
      <ellipse cx="240" cy="155" rx="30" ry="20" fill="#ffee88" opacity="0.04"/>
    `);
  },

  // Scene: Barnaby's hidden back room — sinister inventory
  potion_barnaby_shop() {
    return this.scene('#060508', '#030304', `
      <!-- Dark wood-panelled back room -->
      <rect x="0" y="0" width="400" height="250" fill="#0a0810"/>
      <!-- Vertical wood planks -->
      ${[0,28,56,84,112,140,168,196,224,252,280,308,336,364,392].map((x,i)=>`<rect x="${x}" y="0" width="26" height="175" fill="${i%3===0?'#14100a':'i%3===1?#120e08:#100c06'}" stroke="#0a0806" stroke-width="1"/>`).join('')}
      <!-- Floor boards -->
      <rect x="0" y="175" width="400" height="75" fill="#100e08"/>
      ${[0,50,100,150].map(i=>`<rect x="0" y="${175+i}" width="400" height="50" fill="${i%100===0?'#120f08':'#0e0c06'}" stroke="#080604" stroke-width="0.5"/>`).join('')}

      <!-- Stacked wooden crates (right side) -->
      ${[[228,115,75,55],[238,65,65,50],[248,22,55,43]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2e1c0a" rx="2" stroke="#221408" stroke-width="2"/><line x1="${x+10}" y1="${y}" x2="${x+10}" y2="${y+h}" stroke="#1e1206" stroke-width="1"/><line x1="${x+w-10}" y1="${y}" x2="${x+w-10}" y2="${y+h}" stroke="#1e1206" stroke-width="1"/><line x1="${x}" y1="${y+Math.floor(h/2)}" x2="${x+w}" y2="${y+Math.floor(h/2)}" stroke="#1e1206" stroke-width="1"/>`).join('')}
      <!-- More crates far right -->
      <rect x="318" y="122" width="72" height="53" fill="#281a08" rx="2" stroke="#1e1206" stroke-width="2"/>
      <rect x="328" y="75" width="62" height="47" fill="#241608" rx="2" stroke="#1c1005" stroke-width="2"/>
      <rect x="338" y="35" width="52" height="40" fill="#201408" rx="2" stroke="#1a0e04" stroke-width="2"/>

      <!-- Suspicious glowing cabinet (left wall) — Shadowmoss inside -->
      <rect x="18" y="25" width="74" height="138" fill="#261808" rx="4" stroke="#3a2a12" stroke-width="3"/>
      <line x1="55" y1="25" x2="55" y2="163" stroke="#3a2a12" stroke-width="2"/>
      <rect x="22" y="30" width="30" height="96" fill="#1e1408" rx="2"/>
      <rect x="56" y="30" width="30" height="96" fill="#1e1408" rx="2"/>
      <!-- Lock -->
      <rect x="47" y="76" width="16" height="10" fill="#887733" rx="2"/>
      <path d="M49,75 Q55,67 61,75" fill="none" stroke="#aa9944" stroke-width="2.5"/>
      <!-- Eerie green glow seeping from seams -->
      <rect x="18" y="25" width="74" height="138" fill="none" stroke="#33bb33" stroke-width="1.5" opacity="0.45" rx="4"/>
      <rect x="20" y="27" width="70" height="134" fill="none" stroke="#22dd22" stroke-width="0.7" opacity="0.2" rx="3"/>
      <ellipse cx="55" cy="170" rx="34" ry="10" fill="#22cc22" opacity="0.09"/>
      <!-- Glow pulse animation -->
      <rect x="18" y="25" width="74" height="138" fill="#22aa22" opacity="0.03" rx="4">
        <animate attributeName="opacity" values="0.03;0.07;0.03" dur="2s" repeatCount="indefinite"/>
      </rect>

      <!-- Table with open ledger (center) -->
      <rect x="110" y="143" width="130" height="22" fill="#261808" rx="3"/>
      <rect x="108" y="138" width="134" height="22" fill="#1e1208" rx="2"/>
      <!-- Open ledger (damning evidence) -->
      <rect x="115" y="116" width="118" height="24" fill="#eee8d0" rx="2" stroke="#aa8844" stroke-width="1.5"/>
      <line x1="174" y1="116" x2="174" y2="140" stroke="#c4a458" stroke-width="1"/>
      <!-- Ledger text left page -->
      <text x="122" y="126" fill="#1a0c00" font-size="4.5">10² btl × 0.85g</text>
      <text x="120" y="134" fill="#bb1111" font-size="5" font-weight="bold">= 85g Shadowmoss</text>
      <!-- Ledger text right page -->
      <text x="178" y="123" fill="#1a0c00" font-size="4">SECRET STOCK</text>
      <text x="178" y="130" fill="#993300" font-size="4" font-weight="bold">DO NOT REGISTER</text>
      <text x="178" y="137" fill="#663300" font-size="3.5">(carrier agent)</text>

      <!-- Single dim candle on table -->
      <rect x="243" y="120" width="9" height="20" fill="#e8ddb8" rx="1"/>
      <ellipse cx="248" cy="117" rx="3.5" ry="5" fill="#ff6600" opacity="0.75">
        <animate attributeName="opacity" values="0.75;0.55;0.8;0.7;0.75" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="248" cy="116" rx="2" ry="3" fill="#ffaa00" opacity="0.9"/>

      <!-- Muffin sneaking — smaller, peeking around crate -->
      ${this._miniMuffin(258, 134, 0.44, true)}
    `);
  },

  // Scene: Mixing the antidote — measuring fractions with precision
  potion_antidote_mix() {
    return this.scene('#141208', '#0e0c06', `
      <!-- Warm alchemist workspace — hopeful golden atmosphere -->
      <rect x="0" y="175" width="400" height="75" fill="#2a2210"/>
      ${[0,70,140,210,280,350].map(x=>`<rect x="${x}" y="178" width="68" height="35" fill="#241c0c" stroke="#1a1408" stroke-width="1" rx="1"/>`).join('')}
      <rect x="0" y="0" width="400" height="175" fill="#1c1a0a"/>
      <!-- Clean workbench surface -->
      <rect x="0" y="148" width="400" height="32" fill="#3c3218"/>
      <rect x="0" y="148" width="400" height="6" fill="#4c4220"/>
      <!-- Warm ambient glow -->
      <ellipse cx="255" cy="140" rx="100" ry="50" fill="#cc9922" opacity="0.04"/>

      <!-- Open recipe book (left side) -->
      <rect x="18" y="92" width="102" height="60" fill="#f2ecdc" rx="3" stroke="#8a6a3a" stroke-width="2"/>
      <line x1="69" y1="92" x2="69" y2="152" stroke="#c0a058" stroke-width="1.2"/>
      <text x="43" y="106" text-anchor="middle" fill="#3a1808" font-size="5.5" font-weight="bold">Antidote</text>
      <text x="43" y="114" text-anchor="middle" fill="#3a1808" font-size="5.5" font-weight="bold">Recipe</text>
      <line x1="21" y1="117" x2="67" y2="117" stroke="#8a6a3a" stroke-width="0.5"/>
      <!-- Left page fractions -->
      <text x="43" y="128" text-anchor="middle" fill="#553312" font-size="5">1/3 Starlight</text>
      <text x="43" y="136" text-anchor="middle" fill="#553312" font-size="5">+ 1/4 Dragon</text>
      <text x="43" y="144" text-anchor="middle" fill="#553312" font-size="5">Tear</text>
      <!-- Right page (working with LCD) -->
      <text x="86" y="103" text-anchor="middle" fill="#226622" font-size="5" font-weight="bold">LCD = 12</text>
      <line x1="72" y1="107" x2="117" y2="107" stroke="#226622" stroke-width="0.6"/>
      <text x="86" y="117" text-anchor="middle" fill="#226622" font-size="5">4/12 + 3/12</text>
      <line x1="75" y1="122" x2="116" y2="122" stroke="#226622" stroke-width="1.2"/>
      <text x="86" y="133" text-anchor="middle" fill="#226622" font-size="9" font-weight="bold">7/12</text>
      <text x="86" y="146" text-anchor="middle" fill="#226622" font-size="4.5">✓ measured</text>

      <!-- Small measuring cylinder 1 — Starlight Essence (blue, 1/3 full) -->
      <rect x="148" y="86" width="24" height="68" fill="none" stroke="#7799cc" stroke-width="1.5" rx="3"/>
      <rect x="150" y="88" width="20" height="64" fill="#cce4ff" opacity="0.1" rx="2"/>
      <!-- liquid fills bottom 1/3 -->
      <rect x="150" y="130" width="20" height="22" fill="#5588cc" opacity="0.55" rx="2"/>
      <ellipse cx="160" cy="129" rx="10" ry="3" fill="#6699dd" opacity="0.5"/>
      <text x="160" y="83" text-anchor="middle" fill="#7799cc" font-size="4.5">1/3</text>
      <!-- tick marks -->
      ${[0,1,2,3].map(i=>`<line x1="148" y1="${108+i*16}" x2="154" y2="${108+i*16}" stroke="#7799cc" stroke-width="0.6"/>`).join('')}

      <!-- Small measuring cylinder 2 — Dragon Tear (amber, 1/4 full) -->
      <rect x="182" y="86" width="24" height="68" fill="none" stroke="#cc9944" stroke-width="1.5" rx="3"/>
      <rect x="184" y="88" width="20" height="64" fill="#fff4cc" opacity="0.1" rx="2"/>
      <!-- liquid fills bottom 1/4 -->
      <rect x="184" y="137" width="20" height="17" fill="#cc8822" opacity="0.55" rx="2"/>
      <ellipse cx="194" cy="136" rx="10" ry="3" fill="#dd9933" opacity="0.5"/>
      <text x="194" y="83" text-anchor="middle" fill="#cc9944" font-size="4.5">1/4</text>
      ${[0,1,2,3].map(i=>`<line x1="182" y1="${108+i*16}" x2="188" y2="${108+i*16}" stroke="#cc9944" stroke-width="0.6"/>`).join('')}

      <!-- Large central beaker — combined antidote shimmering gold (7/12 full) -->
      <rect x="222" y="72" width="74" height="84" fill="#32280e" rx="5" stroke="#aa8833" stroke-width="2"/>
      <rect x="225" y="75" width="68" height="78" fill="#28200c" rx="3"/>
      <!-- Golden antidote (7/12 of beaker height ≈ 46px of 78px) -->
      <rect x="225" y="107" width="68" height="46" fill="#bb8811" opacity="0.45" rx="2"/>
      <ellipse cx="259" cy="106" rx="34" ry="6" fill="#ddaa33" opacity="0.4"/>
      <!-- Shimmer sparkles animating -->
      <circle cx="238" cy="120" r="2.2" fill="#ffdd44" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="120;116;120" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="268" cy="132" r="1.6" fill="#ffee66" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.95;0.5" dur="1.4s" begin="0.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="250" cy="126" r="1.8" fill="#ffe844" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="0.9s" begin="0.7s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="126;121;126" dur="0.9s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="242" cy="138" r="1.4" fill="#ffcc33" opacity="0.55">
        <animate attributeName="opacity" values="0.55;0.9;0.55" dur="1.6s" begin="0.2s" repeatCount="indefinite"/>
      </circle>
      <!-- Beaker label -->
      <text x="259" y="68" text-anchor="middle" fill="#cc9933" font-size="5.5" font-weight="bold">7/12 vial</text>

      <!-- Muffin carefully pouring, precise and focused -->
      ${this._miniMuffin(313, 112, 0.54, true)}
    `);
  },

  // ============================================================
  // CASE 5: The Case of the Crooked Coin scenes
  // Palette: candlelit gold + warm stone + parchment + red wax
  // ============================================================

  // Scene 1: Royal Mint crime scene — tampered scales, Mint Master
  mint_crime_scene() {
    return this.scene('#2a1d0a', '#140c03', `
      <!-- Stone floor -->
      <rect x="0" y="180" width="400" height="70" fill="#3a2a1a"/>
      ${[0,70,140,210,280,350].map(x => `<rect x="${x}" y="182" width="68" height="32" fill="#2e2012" stroke="#1a1008" stroke-width="1"/>`).join('')}
      ${[35,105,175,245,315].map(x => `<rect x="${x}" y="214" width="68" height="36" fill="#2a1d10" stroke="#1a1008" stroke-width="1"/>`).join('')}

      <!-- Back stone wall -->
      <rect x="0" y="0" width="400" height="180" fill="#3d2c18"/>
      ${[0,80,160,240,320].map(x => `<rect x="${x}" y="30" width="78" height="30" fill="#4a3522" stroke="#2a1c10" stroke-width="0.7"/>`).join('')}
      ${[40,120,200,280].map(x => `<rect x="${x}" y="60" width="78" height="30" fill="#44301e" stroke="#2a1c10" stroke-width="0.7"/>`).join('')}
      ${[0,80,160,240,320].map(x => `<rect x="${x}" y="90" width="78" height="30" fill="#3e2c18" stroke="#2a1c10" stroke-width="0.7"/>`).join('')}
      ${[40,120,200,280].map(x => `<rect x="${x}" y="120" width="78" height="30" fill="#3a281a" stroke="#2a1c10" stroke-width="0.7"/>`).join('')}

      <!-- Wall torch (right) -->
      <rect x="355" y="35" width="4" height="22" fill="#4a2e14"/>
      <ellipse cx="357" cy="35" rx="10" ry="14" fill="#ffaa33" opacity="0.9">
        <animate attributeName="ry" values="14;16;14" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="357" cy="32" rx="6" ry="10" fill="#ffdd66" opacity="0.95"/>
      <circle cx="357" cy="40" r="42" fill="#ffaa33" opacity="0.08"/>

      <!-- Wooden counter / workbench -->
      <rect x="60" y="155" width="280" height="28" fill="#6a4824" stroke="#3a2410" stroke-width="1.5" rx="2"/>
      <rect x="60" y="155" width="280" height="5" fill="#8a6438"/>

      <!-- Balance scale on counter -->
      <rect x="192" y="110" width="4" height="48" fill="#6a5022"/>
      <line x1="148" y1="115" x2="244" y2="115" stroke="#b8902a" stroke-width="3"/>
      <!-- Left pan (heavier, tilted down) -->
      <line x1="152" y1="115" x2="150" y2="128" stroke="#8a6a18" stroke-width="1"/>
      <line x1="172" y1="115" x2="174" y2="128" stroke="#8a6a18" stroke-width="1"/>
      <ellipse cx="162" cy="132" rx="18" ry="5" fill="#aa7a1a"/>
      <ellipse cx="162" cy="130" rx="18" ry="4" fill="#d4a624"/>
      <!-- Right pan (lighter, tilted up) -->
      <line x1="220" y1="115" x2="218" y2="122" stroke="#8a6a18" stroke-width="1"/>
      <line x1="240" y1="115" x2="242" y2="122" stroke="#8a6a18" stroke-width="1"/>
      <ellipse cx="230" cy="126" rx="18" ry="5" fill="#aa7a1a"/>
      <ellipse cx="230" cy="124" rx="18" ry="4" fill="#d4a624"/>

      <!-- Gold coins on left pan -->
      <ellipse cx="158" cy="126" rx="6" ry="2" fill="#e8c45a"/>
      <ellipse cx="166" cy="124" rx="6" ry="2" fill="#ddb444"/>
      <ellipse cx="162" cy="121" rx="6" ry="2" fill="#e8c45a"/>
      <!-- Gold coin single on right pan -->
      <ellipse cx="230" cy="121" rx="6" ry="2" fill="#bb8822"/>

      <!-- Scattered coins on counter -->
      <ellipse cx="95" cy="168" rx="8" ry="3" fill="#d4a624" stroke="#8a6018" stroke-width="0.5"/>
      <text x="95" y="170" text-anchor="middle" fill="#6a4810" font-size="5" font-weight="bold">4.572</text>
      <ellipse cx="115" cy="172" rx="8" ry="3" fill="#c49820" stroke="#8a6018" stroke-width="0.5"/>
      <ellipse cx="135" cy="168" rx="8" ry="3" fill="#d4a624" stroke="#8a6018" stroke-width="0.5"/>
      <ellipse cx="282" cy="170" rx="8" ry="3" fill="#d4a624" stroke="#8a6018" stroke-width="0.5"/>
      <ellipse cx="302" cy="168" rx="8" ry="3" fill="#c49820" stroke="#8a6018" stroke-width="0.5"/>

      <!-- Mint Master (behind counter, far right), robed figure -->
      <path d="M 330 95 L 320 155 L 350 155 L 340 95 Z" fill="#4a2818"/>
      <rect x="322" y="95" width="26" height="30" fill="#5a3420" rx="2"/>
      <circle cx="335" cy="82" r="12" fill="#c9a979"/>
      <path d="M 325 75 Q 335 68 345 75 Q 346 82 345 84 L 325 84 Q 324 82 325 75 Z" fill="#c4c4c4"/>
      <circle cx="331" cy="82" r="1.2" fill="#2a1a10"/>
      <circle cx="339" cy="82" r="1.2" fill="#2a1a10"/>
      <path d="M 330 88 Q 335 85 340 88" fill="none" stroke="#5a3020" stroke-width="1" stroke-linecap="round"/>

      <!-- Muffin examining the tampered scale (left side, on floor) -->
      ${this._miniMuffin(215, 155, 0.55)}
    `);
  },

  // Scene 2: Inflated payment receipt — Muffin scrutinizing
  mint_scales() {
    return this.scene('#241808', '#120a03', `
      <!-- Stone floor -->
      <rect x="0" y="190" width="400" height="60" fill="#3a2a1a"/>
      <rect x="0" y="0" width="400" height="190" fill="#2e2012"/>

      <!-- Wooden desk -->
      <rect x="40" y="155" width="320" height="40" fill="#6a4824" stroke="#3a2410" stroke-width="1.5" rx="2"/>
      <rect x="40" y="155" width="320" height="5" fill="#8a6438"/>
      <rect x="48" y="195" width="8" height="45" fill="#4a3218"/>
      <rect x="344" y="195" width="8" height="45" fill="#4a3218"/>

      <!-- Candle -->
      <rect x="340" y="130" width="8" height="25" fill="#eee5c8"/>
      <path d="M 340 155 L 348 155 L 350 140 L 338 140 Z" fill="#f0e6c8" opacity="0.4"/>
      <ellipse cx="344" cy="126" rx="4" ry="7" fill="#ffcc55">
        <animate attributeName="ry" values="7;9;7" dur="1.3s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="344" cy="124" rx="2" ry="4" fill="#fff5aa"/>
      <circle cx="344" cy="135" r="34" fill="#ffaa33" opacity="0.06"/>

      <!-- Large receipt / parchment -->
      <rect x="75" y="50" width="230" height="130" fill="#eadba0" stroke="#8a6838" stroke-width="1.5" rx="2" transform="rotate(-2 190 115)"/>
      <rect x="80" y="55" width="220" height="120" fill="#f0e0a8" rx="1" transform="rotate(-2 190 115)"/>

      <!-- Receipt header -->
      <text x="188" y="72" text-anchor="middle" fill="#6a3818" font-size="10" font-weight="bold" font-family="serif" transform="rotate(-2 188 72)">PAYMENT RECEIPT</text>
      <line x1="90" y1="80" x2="290" y2="80" stroke="#8a6838" stroke-width="1" transform="rotate(-2 190 80)"/>

      <!-- Receipt lines -->
      <text x="95" y="96" fill="#3a2010" font-size="7.5" font-family="serif" transform="rotate(-2 95 96)">Weight of gold:</text>
      <text x="280" y="96" text-anchor="end" fill="#3a2010" font-size="8" font-weight="bold" font-family="serif" transform="rotate(-2 280 96)">3.8 lb</text>

      <text x="95" y="110" fill="#3a2010" font-size="7.5" font-family="serif" transform="rotate(-2 95 110)">Rate per pound:</text>
      <text x="280" y="110" text-anchor="end" fill="#3a2010" font-size="8" font-weight="bold" font-family="serif" transform="rotate(-2 280 110)">4.9 ducats</text>

      <line x1="95" y1="118" x2="285" y2="118" stroke="#8a6838" stroke-width="0.8" transform="rotate(-2 190 118)"/>

      <text x="95" y="134" fill="#3a2010" font-size="8" font-weight="bold" font-family="serif" transform="rotate(-2 95 134)">TOTAL DUE:</text>
      <text x="280" y="134" text-anchor="end" fill="#aa2222" font-size="11" font-weight="bold" font-family="serif" transform="rotate(-2 280 134)">186.2 ducats</text>

      <!-- Red circle around total (Muffin's suspicion) -->
      <ellipse cx="260" cy="132" rx="46" ry="13" fill="none" stroke="#cc2222" stroke-width="2" transform="rotate(-2 260 132)"/>
      <line x1="220" y1="140" x2="295" y2="126" stroke="#cc2222" stroke-width="2" stroke-linecap="round" transform="rotate(-2 257 133)"/>

      <!-- Wax seal -->
      <circle cx="268" cy="158" r="12" fill="#aa2222" stroke="#6a1010" stroke-width="1" transform="rotate(-2 268 158)"/>
      <text x="268" y="162" text-anchor="middle" fill="#6a0808" font-size="6" font-weight="bold" transform="rotate(-2 268 162)">RM</text>

      <!-- Muffin with magnifier examining receipt -->
      ${this._miniMuffin(40, 110, 0.6)}
    `);
  },

  // Scene 3: Handwritten 3/4 receipt slip
  mint_receipt() {
    return this.scene('#1e1608', '#0c0702', `
      <!-- Wood table -->
      <rect x="0" y="140" width="400" height="110" fill="#5a3e1e"/>
      <rect x="0" y="140" width="400" height="6" fill="#7a5a30"/>
      ${[0,80,160,240,320].map(x => `<line x1="${x}" y1="146" x2="${x+80}" y2="250" stroke="#4a2e14" stroke-width="0.5" opacity="0.5"/>`).join('')}

      <!-- Dim back -->
      <rect x="0" y="0" width="400" height="140" fill="#2a1e10"/>

      <!-- Candle on left -->
      <rect x="34" y="90" width="7" height="22" fill="#eee5c8"/>
      <ellipse cx="37.5" cy="86" rx="3.5" ry="6" fill="#ffcc55">
        <animate attributeName="ry" values="6;8;6" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="37.5" cy="95" r="34" fill="#ffaa33" opacity="0.07"/>

      <!-- Handwritten slip of paper -->
      <rect x="110" y="120" width="190" height="110" fill="#f0e0a8" stroke="#8a6838" stroke-width="1.2" rx="1" transform="rotate(4 205 175)"/>
      <rect x="114" y="124" width="182" height="102" fill="#f5e6b4" rx="1" transform="rotate(4 205 175)"/>

      <!-- Handwritten cursive text -->
      <text x="128" y="148" fill="#3a2010" font-size="11" font-family="serif" font-style="italic" transform="rotate(4 128 148)">paid </text>
      <text x="160" y="152" fill="#aa2222" font-size="18" font-weight="bold" font-family="serif" font-style="italic" transform="rotate(4 160 152)">3/4</text>
      <text x="192" y="150" fill="#3a2010" font-size="11" font-family="serif" font-style="italic" transform="rotate(4 192 150)">ounce of</text>
      <text x="128" y="172" fill="#3a2010" font-size="11" font-family="serif" font-style="italic" transform="rotate(4 128 172)">gold dust </text>
      <text x="128" y="195" fill="#3a2010" font-size="9" font-family="serif" font-style="italic" transform="rotate(4 128 195)">~ unsigned</text>

      <!-- Decorative flourish -->
      <path d="M 220 200 Q 240 195 250 210 Q 240 215 235 205" fill="none" stroke="#3a2010" stroke-width="0.8" transform="rotate(4 235 205)"/>

      <!-- Small stack of decimal ledger pages in background -->
      <rect x="300" y="135" width="70" height="50" fill="#e8d5a0" stroke="#8a6838" stroke-width="1" rx="1"/>
      <rect x="302" y="133" width="70" height="50" fill="#eadba0" stroke="#8a6838" stroke-width="1" rx="1"/>
      <text x="337" y="150" text-anchor="middle" fill="#6a3818" font-size="6" font-weight="bold">LEDGER</text>
      <line x1="310" y1="156" x2="364" y2="156" stroke="#8a6838" stroke-width="0.5"/>
      <text x="315" y="165" fill="#3a2010" font-size="5">0.75 oz ✓</text>
      <text x="315" y="173" fill="#3a2010" font-size="5">0.50 oz</text>
      <text x="315" y="181" fill="#3a2010" font-size="5">1.25 oz</text>

      <!-- Muffin holding magnifier, studying the cursive slip -->
      ${this._miniMuffin(55, 155, 0.58)}
    `);
  },

  // Scene 4: Hidden cipher note in expanded form
  mint_cipher() {
    return this.scene('#1a1208', '#0a0502', `
      <!-- Dark book interior -->
      <rect x="0" y="0" width="400" height="250" fill="#2a1e10"/>

      <!-- Open ledger spread (binding in center) -->
      <rect x="30" y="25" width="340" height="210" fill="#5a3a1c" stroke="#2a1a08" stroke-width="2" rx="3"/>
      <rect x="40" y="35" width="320" height="190" fill="#eadba0" rx="1"/>
      <line x1="200" y1="35" x2="200" y2="225" stroke="#8a6a38" stroke-width="2"/>

      <!-- Left page — Mint ledger entries (normal) -->
      <text x="120" y="55" text-anchor="middle" fill="#3a2010" font-size="9" font-weight="bold" font-family="serif">MINT LEDGER</text>
      ${[0,1,2,3,4,5,6].map(i => `<line x1="50" y1="${75 + i*20}" x2="190" y2="${75 + i*20}" stroke="#8a6a38" stroke-width="0.3"/>`).join('')}
      <text x="55" y="72" fill="#3a2010" font-size="6">Date</text>
      <text x="160" y="72" fill="#3a2010" font-size="6">Ounces</text>
      <text x="55" y="88" fill="#3a2010" font-size="7">14 Frostmoon</text>
      <text x="165" y="88" fill="#3a2010" font-size="7">0.75</text>
      <text x="55" y="108" fill="#3a2010" font-size="7">15 Frostmoon</text>
      <text x="165" y="108" fill="#3a2010" font-size="7">1.20</text>
      <text x="55" y="128" fill="#3a2010" font-size="7">16 Frostmoon</text>
      <text x="165" y="128" fill="#3a2010" font-size="7">0.50</text>

      <!-- Right page — THE CIPHER NOTE tucked in -->
      <rect x="216" y="60" width="138" height="140" fill="#f5e8b8" stroke="#aa6a22" stroke-width="1.2" rx="2" transform="rotate(-3 285 130)"/>
      <text x="285" y="78" text-anchor="middle" fill="#aa2222" font-size="8" font-weight="bold" font-family="serif" transform="rotate(-3 285 78)">— CIPHER —</text>
      <line x1="226" y1="86" x2="344" y2="86" stroke="#aa6a22" stroke-width="0.6" transform="rotate(-3 285 86)"/>

      <!-- Expanded form equation -->
      <text x="285" y="118" text-anchor="middle" fill="#3a2010" font-size="14" font-weight="bold" font-family="serif" transform="rotate(-3 285 118)">3 + 2/10</text>
      <text x="285" y="140" text-anchor="middle" fill="#3a2010" font-size="14" font-weight="bold" font-family="serif" transform="rotate(-3 285 140)">+ 5/100</text>
      <text x="285" y="162" text-anchor="middle" fill="#3a2010" font-size="14" font-weight="bold" font-family="serif" transform="rotate(-3 285 162)">+ 7/1000</text>
      <text x="285" y="186" text-anchor="middle" fill="#aa2222" font-size="13" font-weight="bold" font-family="serif" transform="rotate(-3 285 186)">= ?</text>

      <!-- Candle cast soft glow -->
      <circle cx="200" cy="130" r="80" fill="#ffaa33" opacity="0.05"/>

      <!-- Muffin peering at the cipher with magnifier -->
      ${this._miniMuffin(310, 175, 0.45)}
    `);
  },

  // Scene 5: Tampered ledger — regrouping mistake
  mint_ledger_tampered() {
    return this.scene('#22180a', '#0e0802', `
      <rect x="0" y="0" width="400" height="250" fill="#2a1e10"/>

      <!-- Open ledger book -->
      <rect x="20" y="20" width="360" height="220" fill="#4a2e14" stroke="#2a180a" stroke-width="2" rx="4"/>
      <rect x="32" y="32" width="336" height="196" fill="#eadba0" rx="2"/>

      <!-- Page header -->
      <text x="200" y="55" text-anchor="middle" fill="#3a2010" font-size="12" font-weight="bold" font-family="serif">DELIVERY LEDGER — Frostmoon 17</text>
      <line x1="50" y1="62" x2="350" y2="62" stroke="#8a6838" stroke-width="0.8"/>

      <!-- Column headers -->
      <text x="72" y="78" fill="#3a2010" font-size="8" font-weight="bold">ITEM</text>
      <text x="220" y="78" fill="#3a2010" font-size="8" font-weight="bold">WEIGHT (lb)</text>
      <text x="320" y="78" fill="#3a2010" font-size="8" font-weight="bold">REGROUP</text>

      <!-- Row 1: normal -->
      <line x1="50" y1="84" x2="350" y2="84" stroke="#8a6838" stroke-width="0.3"/>
      <text x="60" y="100" fill="#3a2010" font-size="8">Gold dust</text>
      <text x="240" y="100" fill="#3a2010" font-size="8">1.45</text>
      <text x="320" y="100" fill="#3a2010" font-size="7">1 + 4t + 5h</text>

      <line x1="50" y1="110" x2="350" y2="110" stroke="#8a6838" stroke-width="0.3"/>

      <!-- Row 2: THE TAMPERED ROW -->
      <rect x="46" y="114" width="308" height="32" fill="#ffcc66" opacity="0.25"/>
      <text x="60" y="132" fill="#3a2010" font-size="8">Ore (raw)</text>

      <!-- Original "2.13" with strikethrough, replaced with "2.33" -->
      <text x="218" y="132" fill="#888" font-size="9" text-decoration="line-through">2.13</text>
      <text x="250" y="132" fill="#aa2222" font-size="11" font-weight="bold">2.33</text>

      <!-- Tampered regrouping -->
      <text x="310" y="132" fill="#aa2222" font-size="7" font-weight="bold">2 + 3t + 3h</text>
      <text x="310" y="141" fill="#3a2010" font-size="6" font-style="italic">(should be: 2 + ?t + 3h)</text>

      <line x1="50" y1="150" x2="350" y2="150" stroke="#8a6838" stroke-width="0.3"/>

      <!-- Row 3: normal -->
      <text x="60" y="166" fill="#3a2010" font-size="8">Ingots</text>
      <text x="240" y="166" fill="#3a2010" font-size="8">5.02</text>
      <text x="320" y="166" fill="#3a2010" font-size="7">5 + 0t + 2h</text>

      <line x1="50" y1="176" x2="350" y2="176" stroke="#8a6838" stroke-width="0.3"/>

      <!-- Muffin's "TAMPERED" scrawl in margin -->
      <text x="60" y="200" fill="#cc2222" font-size="14" font-weight="bold" font-family="serif" font-style="italic" transform="rotate(-3 60 200)">TAMPERED!</text>
      <line x1="130" y1="195" x2="215" y2="135" stroke="#cc2222" stroke-width="2" stroke-linecap="round"/>
      <polygon points="210,130 217,132 214,138" fill="#cc2222"/>

      <!-- Quill pen near muffin -->
      <line x1="346" y1="210" x2="370" y2="186" stroke="#6a4a22" stroke-width="1.5"/>
      <path d="M 368 186 L 378 174 L 370 186 Z" fill="#6a4a22"/>

      <!-- Muffin with magnifier -->
      ${this._miniMuffin(295, 190, 0.45)}
    `);
  },

  // Scene 6: Interview with Master Scribe Cora
  mint_interview_cora() {
    return this.scene('#1e1408', '#0a0502', `
      <!-- Stone floor -->
      <rect x="0" y="190" width="400" height="60" fill="#3a2a1a"/>

      <!-- Back stone wall with shelves of scrolls -->
      <rect x="0" y="0" width="400" height="190" fill="#2e2012"/>
      <rect x="10" y="35" width="180" height="6" fill="#4a3218"/>
      <rect x="10" y="90" width="180" height="6" fill="#4a3218"/>
      <!-- Scrolls on shelves -->
      ${[18,38,58,78,98,118,138,158].map(x => `<rect x="${x}" y="22" width="12" height="13" fill="#eadba0" stroke="#8a6838" stroke-width="0.6"/><rect x="${x-1}" y="22" width="14" height="2" fill="#aa8838"/>`).join('')}
      ${[18,38,58,78,98,118,138,158].map(x => `<rect x="${x}" y="77" width="12" height="13" fill="#eadba0" stroke="#8a6838" stroke-width="0.6"/><rect x="${x-1}" y="77" width="14" height="2" fill="#aa8838"/>`).join('')}

      <!-- Candle on wall sconce -->
      <rect x="360" y="35" width="4" height="18" fill="#6a4a22"/>
      <ellipse cx="362" cy="32" rx="5" ry="8" fill="#ffcc55">
        <animate attributeName="ry" values="8;10;8" dur="1.3s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="362" cy="40" r="36" fill="#ffaa33" opacity="0.08"/>

      <!-- Writing desk -->
      <rect x="180" y="160" width="200" height="30" fill="#6a4824" stroke="#3a2410" stroke-width="1.5" rx="2"/>
      <rect x="180" y="160" width="200" height="4" fill="#8a6438"/>
      <rect x="188" y="190" width="6" height="40" fill="#4a3218"/>
      <rect x="370" y="190" width="6" height="40" fill="#4a3218"/>

      <!-- Open ledger on desk -->
      <rect x="230" y="145" width="110" height="20" fill="#eadba0" stroke="#8a6838" stroke-width="1" transform="rotate(-4 285 155)"/>
      <line x1="285" y1="145" x2="285" y2="165" stroke="#8a6838" stroke-width="1" transform="rotate(-4 285 155)"/>

      <!-- Inkwell and quill -->
      <rect x="348" y="148" width="10" height="14" fill="#2a1a0a" rx="2"/>
      <ellipse cx="353" cy="148" rx="5" ry="2" fill="#1a1008"/>
      <line x1="355" y1="148" x2="375" y2="125" stroke="#6a4a22" stroke-width="1.5"/>
      <path d="M 373 125 L 380 116 L 375 125 Z" fill="#e8dcc0"/>

      <!-- Master Scribe Cora standing behind desk, concerned -->
      <!-- body (long robe with sash) -->
      <path d="M 278 100 L 262 160 L 312 160 L 300 100 Z" fill="#2a4a5a"/>
      <rect x="278" y="100" width="22" height="48" fill="#3a5a6a"/>
      <!-- sash -->
      <rect x="275" y="123" width="28" height="5" fill="#aa8838"/>
      <!-- head -->
      <circle cx="289" cy="88" r="11" fill="#d4b098"/>
      <!-- hair bun -->
      <ellipse cx="289" cy="78" rx="10" ry="5" fill="#3a2818"/>
      <circle cx="289" cy="73" r="5" fill="#3a2818"/>
      <!-- face -->
      <circle cx="285" cy="88" r="1" fill="#2a1a10"/>
      <circle cx="293" cy="88" r="1" fill="#2a1a10"/>
      <path d="M 285 93 Q 289 94 293 93" fill="none" stroke="#5a2018" stroke-width="0.8" stroke-linecap="round"/>
      <!-- worried brow -->
      <line x1="283" y1="84" x2="287" y2="85" stroke="#2a1a10" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="291" y1="85" x2="295" y2="84" stroke="#2a1a10" stroke-width="0.8" stroke-linecap="round"/>
      <!-- arm holding out memo -->
      <rect x="248" y="115" width="32" height="7" fill="#3a5a6a" rx="3" transform="rotate(15 264 118)"/>
      <rect x="242" y="112" width="14" height="18" fill="#eadba0" stroke="#aa2222" stroke-width="0.8" transform="rotate(15 249 121)"/>
      <text x="249" y="122" text-anchor="middle" fill="#aa2222" font-size="5" font-weight="bold" transform="rotate(15 249 122)">0.25</text>

      <!-- Muffin (left side of desk) looking up at Cora -->
      ${this._miniMuffin(70, 170, 0.6)}
    `);
  },

  // Scene 7: Vault interior — 78 coins in 12 stacks
  mint_vault() {
    return this.scene('#1a1208', '#0a0502', `
      <!-- Heavy stone floor with iron tiles -->
      <rect x="0" y="175" width="400" height="75" fill="#3a2a1a"/>
      ${[0,50,100,150,200,250,300,350].map(x => `<rect x="${x}" y="177" width="48" height="35" fill="#2e2012" stroke="#1a1008" stroke-width="1"/>`).join('')}
      ${[25,75,125,175,225,275,325].map(x => `<rect x="${x}" y="212" width="48" height="38" fill="#2a1d10" stroke="#1a1008" stroke-width="1"/>`).join('')}

      <!-- Back wall -->
      <rect x="0" y="0" width="400" height="175" fill="#2a1e10"/>

      <!-- Vault door ajar at right edge -->
      <rect x="340" y="30" width="60" height="150" fill="#5a3a1c" stroke="#2a180a" stroke-width="2"/>
      <circle cx="355" cy="105" r="10" fill="#8a6a22" stroke="#5a3810" stroke-width="2"/>
      <circle cx="355" cy="105" r="4" fill="#3a2410"/>
      ${[0,1,2,3].map(i => `<line x1="${355+Math.cos(i*1.57)*10}" y1="${105+Math.sin(i*1.57)*10}" x2="${355+Math.cos(i*1.57)*16}" y2="${105+Math.sin(i*1.57)*16}" stroke="#5a3810" stroke-width="2"/>`).join('')}

      <!-- Torch casting light -->
      <rect x="28" y="32" width="4" height="22" fill="#4a2e14"/>
      <ellipse cx="30" cy="30" rx="8" ry="12" fill="#ffaa33">
        <animate attributeName="ry" values="12;15;12" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="30" cy="40" r="60" fill="#ffaa33" opacity="0.08"/>

      <!-- Open ledger/chalkboard on wall showing "78 ÷ 12" -->
      <rect x="90" y="35" width="130" height="80" fill="#1a0e04" stroke="#8a6838" stroke-width="2" rx="3"/>
      <text x="155" y="60" text-anchor="middle" fill="#f5e6b4" font-size="8" font-weight="bold" font-family="serif">DIVERSION LOG</text>
      <line x1="100" y1="68" x2="210" y2="68" stroke="#aa8838" stroke-width="0.8"/>
      <text x="155" y="88" text-anchor="middle" fill="#ffdd66" font-size="18" font-weight="bold" font-family="serif">78 ÷ 12</text>
      <text x="155" y="107" text-anchor="middle" fill="#cc6644" font-size="10" font-family="serif">= ? per batch</text>

      <!-- Stacks of gold coins on the floor -->
      ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        const x = 70 + col * 40;
        const y = 150 + row * 18;
        return `<ellipse cx="${x}" cy="${y+8}" rx="11" ry="3" fill="#8a6018"/>
                <rect x="${x-11}" y="${y}" width="22" height="8" fill="#d4a624" stroke="#8a6018" stroke-width="0.5"/>
                <rect x="${x-11}" y="${y-3}" width="22" height="4" fill="#e8c45a"/>
                <ellipse cx="${x}" cy="${y-3}" rx="11" ry="2" fill="#f0d880"/>`;
      }).join('')}

      <!-- "12 stacks" label -->
      <text x="200" y="145" text-anchor="middle" fill="#f5e6b4" font-size="7" font-style="italic">12 "test batches"</text>

      <!-- Muffin observing the stacks -->
      ${this._miniMuffin(290, 160, 0.55)}
    `);
  },

  // Scene 8: Courier delivery log chart
  mint_delivery_log() {
    return this.scene('#1e1408', '#0a0502', `
      <rect x="0" y="0" width="400" height="250" fill="#2e2012"/>

      <!-- Wall-mounted delivery chart -->
      <rect x="40" y="25" width="320" height="195" fill="#eadba0" stroke="#6a4824" stroke-width="3" rx="2"/>
      <rect x="44" y="29" width="312" height="187" fill="#f0e0a8" rx="1"/>

      <!-- Chart title -->
      <text x="200" y="50" text-anchor="middle" fill="#3a2010" font-size="11" font-weight="bold" font-family="serif">COURIER — GOLD DELIVERY LOG</text>
      <line x1="55" y1="58" x2="345" y2="58" stroke="#8a6838" stroke-width="1"/>

      <!-- Summary box -->
      <rect x="60" y="68" width="280" height="46" fill="#fffae0" stroke="#aa8838" stroke-width="1" rx="2"/>
      <text x="75" y="84" fill="#3a2010" font-size="9" font-family="serif">Total sacks delivered:</text>
      <text x="325" y="84" text-anchor="end" fill="#aa2222" font-size="11" font-weight="bold" font-family="serif">148.6</text>
      <text x="75" y="100" fill="#3a2010" font-size="9" font-family="serif">Over a span of:</text>
      <text x="325" y="100" text-anchor="end" fill="#aa2222" font-size="11" font-weight="bold" font-family="serif">28.9 weeks</text>

      <!-- Rate question -->
      <rect x="60" y="124" width="280" height="34" fill="#ffcc66" opacity="0.3" stroke="#cc8822" stroke-width="1" rx="2"/>
      <text x="200" y="146" text-anchor="middle" fill="#aa2222" font-size="14" font-weight="bold" font-family="serif">Rate = 148.6 ÷ 28.9 per week</text>

      <!-- Comparison bar / mismatch warning -->
      <text x="75" y="175" fill="#3a2010" font-size="8" font-family="serif">Mint's own weekly intake:</text>
      <text x="325" y="175" text-anchor="end" fill="#226622" font-size="10" font-weight="bold" font-family="serif">12 sacks / week</text>

      <!-- Little weekly tick chart at bottom -->
      ${[0,1,2,3,4,5,6,7,8,9].map(i => `<rect x="${70 + i*26}" y="${195 - (i%3==2 ? 16 : i%4==1 ? 10 : 14)}" width="16" height="${i%3==2 ? 16 : i%4==1 ? 10 : 14}" fill="#aa8838"/>`).join('')}
      <line x1="65" y1="196" x2="335" y2="196" stroke="#3a2010" stroke-width="0.8"/>

      <!-- Red question mark on chart -->
      <text x="360" y="100" fill="#cc2222" font-size="28" font-weight="bold" font-family="serif" transform="rotate(10 360 100)">?</text>

      <!-- Muffin pointing at chart -->
      ${this._miniMuffin(0, 150, 0.55)}
    `);
  },

  // Scene 9: Interview with Apprentice Pip holding the year-end ledger
  mint_interview_pip() {
    return this.scene('#1a1006', '#090501', `
      <!-- Vault corner -->
      <rect x="0" y="185" width="400" height="65" fill="#3a2a1a"/>
      <rect x="0" y="0" width="400" height="185" fill="#2a1e10"/>

      <!-- Heavy vault door partly visible at left -->
      <rect x="0" y="0" width="50" height="250" fill="#5a3a1c" stroke="#2a180a" stroke-width="2"/>
      <circle cx="25" cy="120" r="14" fill="#8a6a22" stroke="#5a3810" stroke-width="2"/>
      <circle cx="25" cy="120" r="5" fill="#3a2410"/>

      <!-- Hanging lantern for light -->
      <line x1="320" y1="0" x2="320" y2="30" stroke="#3a2410" stroke-width="1.5"/>
      <rect x="310" y="28" width="20" height="26" fill="#4a3218" stroke="#6a4a22" stroke-width="1" rx="1"/>
      <rect x="312" y="30" width="16" height="22" fill="#ffcc55" opacity="0.7"/>
      <ellipse cx="320" cy="40" rx="4" ry="6" fill="#fff5aa">
        <animate attributeName="ry" values="6;8;6" dur="1.3s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="320" cy="40" r="60" fill="#ffcc55" opacity="0.07"/>

      <!-- Apprentice Pip — nervous young figure, stood against wall -->
      <!-- body (apron over tunic) -->
      <path d="M 210 110 L 195 195 L 250 195 L 238 110 Z" fill="#5a4018"/>
      <rect x="210" y="110" width="30" height="60" fill="#6a5022"/>
      <rect x="208" y="135" width="34" height="30" fill="#e8d5a0" stroke="#aa8838" stroke-width="0.6"/>
      <!-- head -->
      <circle cx="223" cy="98" r="12" fill="#e0c0a0"/>
      <!-- messy hair -->
      <path d="M 211 93 Q 215 80 223 80 Q 230 80 234 92 Q 238 88 235 95 Q 232 91 228 93 Q 225 86 221 93 Q 215 91 213 98 Q 210 93 211 93 Z" fill="#8a5a20"/>
      <circle cx="219" cy="98" r="1.2" fill="#2a1a10"/>
      <circle cx="227" cy="98" r="1.2" fill="#2a1a10"/>
      <path d="M 219 105 Q 223 104 227 105" fill="none" stroke="#5a2018" stroke-width="0.7"/>
      <!-- Nervous sweat drop -->
      <path d="M 212 99 Q 211 104 213 105 Q 215 104 214 99 Z" fill="#88bbee" opacity="0.7"/>

      <!-- Pip clutching a large year-end ledger -->
      <rect x="190" y="145" width="60" height="46" fill="#4a2e14" stroke="#2a1a08" stroke-width="1.5" rx="2"/>
      <rect x="194" y="149" width="52" height="38" fill="#eadba0"/>
      <text x="220" y="162" text-anchor="middle" fill="#3a2010" font-size="5" font-weight="bold">YEAR-END</text>
      <text x="220" y="171" text-anchor="middle" fill="#aa2222" font-size="8" font-weight="bold">63,472.85</text>
      <text x="220" y="181" text-anchor="middle" fill="#3a2010" font-size="5">ounces</text>
      <!-- arms cradling book -->
      <rect x="185" y="150" width="22" height="6" fill="#6a5022" rx="3" transform="rotate(-10 196 153)"/>
      <rect x="236" y="150" width="22" height="6" fill="#6a5022" rx="3" transform="rotate(10 247 153)"/>

      <!-- red circle around the "7" in 63,472.85 -->
      <ellipse cx="228" cy="170" rx="5" ry="7" fill="none" stroke="#cc2222" stroke-width="1.5"/>

      <!-- Muffin comforting, looking up -->
      ${this._miniMuffin(90, 165, 0.6)}
    `);
  },

  // Scene 10: Torn "3/8" note from Ambrose's coat
  mint_hidden_note() {
    return this.scene('#1a1006', '#080401', `
      <rect x="0" y="0" width="400" height="250" fill="#281c10"/>

      <!-- Wooden tabletop -->
      <rect x="0" y="160" width="400" height="90" fill="#5a3e1e"/>
      <rect x="0" y="160" width="400" height="6" fill="#7a5a30"/>
      ${[40,120,200,280,360].map(x => `<line x1="${x}" y1="166" x2="${x}" y2="250" stroke="#4a2e14" stroke-width="0.7" opacity="0.5"/>`).join('')}

      <!-- Coat hanging in background -->
      <path d="M 300 20 L 260 95 L 280 100 L 305 45 Z" fill="#2a2218"/>
      <path d="M 305 20 L 345 95 L 325 100 L 300 45 Z" fill="#352a1c"/>
      <rect x="298" y="15" width="14" height="8" fill="#1a1208"/>

      <!-- Candle -->
      <rect x="40" y="100" width="7" height="20" fill="#eee5c8"/>
      <ellipse cx="43.5" cy="96" rx="3.5" ry="6" fill="#ffcc55">
        <animate attributeName="ry" values="6;8;6" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="43.5" cy="110" r="42" fill="#ffaa33" opacity="0.08"/>

      <!-- Torn scrap of parchment (irregular edges) -->
      <path d="M 110 130 L 290 125 L 310 160 L 300 205 L 120 210 L 95 175 Z" fill="#eadba0" stroke="#8a6838" stroke-width="1.2"/>
      <path d="M 115 135 L 285 130 L 303 160 L 294 200 L 125 205 L 103 175 Z" fill="#f0e0a8"/>
      <!-- ragged tear lines at top -->
      <path d="M 110 130 L 115 122 L 130 132 L 145 120 L 160 130 L 180 122 L 200 132 L 220 122 L 245 130 L 270 120 L 290 128" fill="none" stroke="#8a6838" stroke-width="0.7"/>

      <!-- Writing on the scrap — rushed cursive -->
      <text x="200" y="158" text-anchor="middle" fill="#3a2010" font-size="11" font-family="serif" font-style="italic">Divert</text>
      <text x="200" y="182" text-anchor="middle" fill="#aa2222" font-size="26" font-weight="bold" font-family="serif" font-style="italic">3/8</text>
      <text x="200" y="199" text-anchor="middle" fill="#3a2010" font-size="9" font-family="serif" font-style="italic">of daily intake</text>
      <text x="200" y="210" text-anchor="middle" fill="#3a2010" font-size="9" font-family="serif" font-style="italic">→ east cellar</text>

      <!-- Small signature mark -->
      <text x="280" y="200" fill="#3a2010" font-size="7" font-family="serif" font-style="italic">— A.</text>

      <!-- Muffin holding magnifier, peering down -->
      ${this._miniMuffin(310, 170, 0.55, true)}
    `);
  },

  // Scene 11: Final confrontation — crate in east cellar
  mint_confrontation() {
    return this.scene('#1a0e04', '#070401', `
      <!-- Damp cellar floor -->
      <rect x="0" y="185" width="400" height="65" fill="#2a1d10"/>
      ${[0,60,120,180,240,300,360].map(x => `<rect x="${x}" y="187" width="58" height="32" fill="#22180a" stroke="#1a1008" stroke-width="1"/>`).join('')}
      ${[30,90,150,210,270,330].map(x => `<rect x="${x}" y="219" width="58" height="31" fill="#1e1608" stroke="#1a1008" stroke-width="1"/>`).join('')}

      <!-- Low brick arch ceiling -->
      <rect x="0" y="0" width="400" height="185" fill="#1e1608"/>
      <path d="M 0 0 L 0 50 Q 200 -30 400 50 L 400 0 Z" fill="#120c03"/>
      ${[0,1,2,3,4].map(i => `<line x1="${i*80}" y1="0" x2="${i*80+20}" y2="50" stroke="#3a2818" stroke-width="1" opacity="0.5"/>`).join('')}

      <!-- Wall torch -->
      <rect x="352" y="40" width="4" height="22" fill="#4a2e14"/>
      <ellipse cx="354" cy="36" rx="9" ry="13" fill="#ffaa33">
        <animate attributeName="ry" values="13;16;13" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="354" cy="33" rx="5" ry="9" fill="#ffdd66"/>
      <circle cx="354" cy="45" r="60" fill="#ffaa33" opacity="0.1"/>

      <!-- Large wooden crate in middle -->
      <rect x="130" y="115" width="140" height="90" fill="#6a4824" stroke="#2a180a" stroke-width="2.5"/>
      <rect x="130" y="115" width="140" height="10" fill="#8a6438"/>
      <line x1="130" y1="160" x2="270" y2="160" stroke="#2a180a" stroke-width="1.5"/>
      <!-- vertical planks -->
      <line x1="165" y1="115" x2="165" y2="205" stroke="#3a2410" stroke-width="0.8"/>
      <line x1="200" y1="115" x2="200" y2="205" stroke="#3a2410" stroke-width="0.8"/>
      <line x1="235" y1="115" x2="235" y2="205" stroke="#3a2410" stroke-width="0.8"/>

      <!-- Label "PERSONAL — DO NOT OPEN" -->
      <rect x="144" y="135" width="112" height="20" fill="#eadba0" stroke="#6a3818" stroke-width="1"/>
      <text x="200" y="148" text-anchor="middle" fill="#aa2222" font-size="7" font-weight="bold" font-family="serif">PERSONAL — DO NOT OPEN</text>

      <!-- Weight stamp below -->
      <rect x="160" y="170" width="80" height="24" fill="#fffae0" stroke="#aa2222" stroke-width="1.5" transform="rotate(-4 200 182)"/>
      <text x="200" y="183" text-anchor="middle" fill="#6a3818" font-size="6.5" font-weight="bold" transform="rotate(-4 200 183)">WEIGHT</text>
      <text x="200" y="192" text-anchor="middle" fill="#aa2222" font-size="10" font-weight="bold" font-family="serif" transform="rotate(-4 200 192)">450 oz</text>

      <!-- Spilled gold coins peeking from crate top -->
      <ellipse cx="160" cy="113" rx="5" ry="2" fill="#d4a624"/>
      <ellipse cx="175" cy="111" rx="5" ry="2" fill="#e8c45a"/>
      <ellipse cx="245" cy="112" rx="5" ry="2" fill="#d4a624"/>
      <ellipse cx="260" cy="110" rx="5" ry="2" fill="#bb8822"/>

      <!-- Appraiser Ambrose caught, arms raised in defeat (far right) -->
      <!-- robe -->
      <path d="M 340 105 L 325 195 L 380 195 L 368 105 Z" fill="#4a2818"/>
      <rect x="340" y="105" width="24" height="55" fill="#5a3420"/>
      <!-- head -->
      <circle cx="352" cy="93" r="11" fill="#c9a979"/>
      <!-- receding hair -->
      <path d="M 344 85 Q 350 82 360 85 Q 360 89 358 90 L 346 90 Q 344 87 344 85 Z" fill="#6a4a28"/>
      <!-- goatee -->
      <path d="M 350 102 Q 352 108 354 102" fill="#6a4a28"/>
      <circle cx="348" cy="92" r="1" fill="#2a1a10"/>
      <circle cx="356" cy="92" r="1" fill="#2a1a10"/>
      <path d="M 348 100 Q 352 97 356 100" fill="none" stroke="#5a2018" stroke-width="0.8" stroke-linecap="round"/>
      <!-- hands raised -->
      <rect x="325" y="80" width="14" height="30" fill="#5a3420" rx="4" transform="rotate(-20 332 95)"/>
      <rect x="365" y="80" width="14" height="30" fill="#5a3420" rx="4" transform="rotate(20 372 95)"/>
      <circle cx="327" cy="75" r="5" fill="#c9a979"/>
      <circle cx="377" cy="75" r="5" fill="#c9a979"/>

      <!-- Muffin pointing accusingly, proud pose (left) -->
      ${this._miniMuffin(55, 145, 0.65)}
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
  ],
  poisoned_potion: [
    'potion_lab',           // 1: Crime scene
    'potion_notes',         // 2: Safety protocol
    'potion_ingredients',   // 3: Ingredient shelves
    'potion_storage',       // 4: Storage closet
    'potion_delivery_log',  // 5: Delivery log
    'potion_interview_vera',      // 6: Vera interview
    'potion_interview_barnaby',   // 7: Barnaby interview
    'potion_barnaby_shop',        // 8: Barnaby's back room
    'potion_interview_luna',      // 9: Luna interview
    'potion_study',               // 10: Professor's study
    'potion_antidote_mix',        // 11: Mixing antidote
    'potion_analysis',            // 12: Analysis room
    'potion_confrontation'        // 13: Final confrontation
  ],
  crooked_coin: [
    'mint_crime_scene',       // 1: Place value (4 in 4.572)
    'mint_scales',            // 2: Estimate multiply (3.8 × 4.9)
    'mint_receipt',           // 3: Fraction → decimal (3/4)
    'mint_cipher',            // 4: Decimal expanded form
    'mint_ledger_tampered',   // 5: Regrouping decimals
    'mint_interview_cora',    // 6: Decimal → fraction (0.25)
    'mint_vault',             // 7: Whole ÷ whole decimal quotient (78 ÷ 12)
    'mint_delivery_log',      // 8: Estimate divide (148.6 ÷ 28.9)
    'mint_interview_pip',     // 9: Place value (7 in 63,472.85)
    'mint_hidden_note',       // 10: Fraction → decimal (3/8)
    'mint_confrontation'      // 11: Final proof (0.375 × 1,200)
  ]
};
