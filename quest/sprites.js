// sprites.js — Pixel art character/monster/NPC sprites as inline SVG pixel grids

const Sprites = {
  // Render a pixel grid to SVG
  // pixelData: 2D array of color strings (null = transparent)
  // scale: pixel size in SVG units
  render(pixelData, scale = 4) {
    const h = pixelData.length;
    const w = pixelData[0].length;
    let rects = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const c = pixelData[y][x];
        if (c) {
          rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${c}"/>`;
        }
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w * scale} ${h * scale}" width="${w * scale}" height="${h * scale}">${rects}</svg>`;
  },

  // Color palettes
  _palettes: {
    skin: {
      light: '#f5c5a3',
      medium: '#d4a373',
      tan: '#b07d56',
      brown: '#8b5e3c',
      dark: '#5c3a21',
      green: '#6b8e5a'  // dragonborn
    },
    hair: {
      black: '#1a1a2e',
      brown: '#5c3317',
      blonde: '#d4a017',
      red: '#8b2500',
      white: '#cccccc',
      blue: '#3a6ea5'
    }
  },

  // Generate player sprite
  // race: 'human','elf','dwarf','halfling','dragonborn'
  // classType: 'warrior','wizard','rogue','ranger'
  // appearance: { skinTone, hairColor, armorColor }
  // scale: pixel size
  player(race, classType, appearance = {}, scale = 4) {
    // Resolve colors — accept hex strings or numeric indices into palette arrays
    const _resolve = (val, palette, fallback) => {
      if (typeof val === 'string' && val.startsWith('#')) return val;
      if (typeof val === 'number' && palette && palette[val]) return palette[val];
      return fallback;
    };
    const skin = _resolve(appearance.skinTone, typeof SKIN_TONES !== 'undefined' ? SKIN_TONES : null, '#f5c5a3');
    const hair = _resolve(appearance.hairColor, typeof HAIR_COLORS !== 'undefined' ? HAIR_COLORS : null, '#5c3317');
    const armor = _resolve(appearance.armorColor, typeof ARMOR_COLORS !== 'undefined' ? ARMOR_COLORS : null, '#666688');
    const armorDark = _darken(armor);
    const armorLight = _lighten(armor);
    const eyes = race === 'dragonborn' ? '#ff6600' : '#1a1a2e';
    const boot = '#3a2518';

    // Base 12x16 pixel template
    const grid = _emptyGrid(12, 16);

    // --- Hair / Head top (rows 0-2) ---
    if (race === 'dwarf') {
      // Helmet-like hair
      _fillRow(grid, 0, 3, 8, hair);
      _fillRow(grid, 1, 2, 9, hair);
      _fillRow(grid, 2, 2, 9, hair);
    } else if (race === 'elf') {
      // Pointed ear hint
      _fillRow(grid, 0, 4, 7, hair);
      _fillRow(grid, 1, 3, 8, hair);
      _fillRow(grid, 2, 2, 9, hair);
      grid[2][1] = skin; // ear
      grid[2][9] = skin; // ear
    } else if (race === 'dragonborn') {
      _fillRow(grid, 0, 3, 8, skin);
      _fillRow(grid, 1, 3, 8, skin);
      _fillRow(grid, 2, 3, 8, skin);
      grid[0][3] = _darken(skin); // horn
      grid[0][7] = _darken(skin); // horn
    } else if (race === 'halfling') {
      _fillRow(grid, 0, 4, 7, hair);
      _fillRow(grid, 1, 3, 8, hair);
      _fillRow(grid, 2, 3, 8, hair);
    } else {
      // human
      _fillRow(grid, 0, 4, 7, hair);
      _fillRow(grid, 1, 3, 8, hair);
      _fillRow(grid, 2, 3, 8, hair);
    }

    // --- Face (rows 3-5) ---
    _fillRow(grid, 3, 3, 8, skin);
    _fillRow(grid, 4, 3, 8, skin);
    grid[4][4] = eyes; // left eye
    grid[4][6] = eyes; // right eye
    _fillRow(grid, 5, 4, 7, skin);
    grid[5][5] = '#cc6655'; // mouth

    // Dwarf beard
    if (race === 'dwarf') {
      _fillRow(grid, 5, 3, 8, hair);
      grid[5][5] = '#cc6655';
      _fillRow(grid, 6, 4, 7, hair);
    }

    // --- Neck (row 6) ---
    grid[6][5] = skin;

    // --- Torso (rows 7-10) ---
    _fillRow(grid, 7, 3, 8, armor);
    _fillRow(grid, 8, 3, 8, armor);
    _fillRow(grid, 9, 3, 8, armorDark);
    _fillRow(grid, 10, 4, 7, armorDark);

    // Class-specific torso detail
    if (classType === 'wizard') {
      grid[8][5] = '#9966cc'; // gem
      // Robe extends
      _fillRow(grid, 10, 3, 8, '#4a3a6e');
      _fillRow(grid, 11, 3, 8, '#4a3a6e');
    } else if (classType === 'warrior') {
      grid[7][5] = armorLight; // chest emblem
      grid[8][5] = armorLight;
    } else if (classType === 'rogue') {
      grid[7][5] = '#2a2a2a'; // dark stripe
      grid[8][5] = '#2a2a2a';
    }

    // --- Arms (rows 7-10) ---
    grid[7][2] = skin;
    grid[7][8] = skin;
    grid[8][2] = skin;
    grid[8][8] = skin;
    grid[9][2] = skin;
    grid[9][8] = skin;

    // Weapon in right hand
    if (classType === 'warrior') {
      grid[7][9] = '#aaaaaa'; // sword
      grid[8][9] = '#aaaaaa';
      grid[9][9] = '#aaaaaa';
      grid[6][9] = '#cccccc'; // blade tip
    } else if (classType === 'wizard') {
      grid[7][9] = '#7a5230'; // staff
      grid[8][9] = '#7a5230';
      grid[9][9] = '#7a5230';
      grid[6][9] = '#aa66ff'; // orb
    } else if (classType === 'rogue') {
      grid[8][9] = '#888888'; // dagger
      grid[9][9] = '#888888';
    } else if (classType === 'ranger') {
      grid[7][9] = '#7a5230'; // bow
      grid[8][9] = '#7a5230';
      grid[9][9] = '#5a3a18';
      grid[7][10] = '#b8860b'; // bowstring
      grid[8][10] = '#b8860b';
      grid[9][10] = '#b8860b';
    }

    // Shield for warrior in left hand
    if (classType === 'warrior') {
      grid[7][1] = '#8b7355';
      grid[8][1] = '#8b7355';
      grid[9][1] = '#8b7355';
      grid[8][0] = '#8b7355';
    }

    // --- Legs (rows 11-13) ---
    if (classType !== 'wizard') {
      grid[11][4] = armorDark;
      grid[11][6] = armorDark;
      grid[12][4] = armorDark;
      grid[12][6] = armorDark;
    }
    grid[13][4] = boot;
    grid[13][6] = boot;

    // --- Feet (rows 14-15) for non-halflings ---
    if (race === 'halfling') {
      grid[13][4] = skin; // barefoot
      grid[13][6] = skin;
    } else {
      grid[14][4] = boot;
      grid[14][6] = boot;
    }

    // Dwarf is shorter — shift down less
    // Dragonborn tail hint
    if (race === 'dragonborn') {
      grid[12][2] = _darken(skin);
      grid[13][1] = _darken(skin);
    }

    return this.render(grid, scale);
  },

  // Monster sprites
  monster(name, scale = 4) {
    const monsters = {
      goblin: () => {
        const grid = _emptyGrid(12, 12);
        const skin = '#5a8a3a';
        const dark = '#3a6a2a';
        // Head
        _fillRow(grid, 0, 3, 8, skin);
        _fillRow(grid, 1, 2, 9, skin);
        _fillRow(grid, 2, 2, 9, skin);
        grid[1][1] = skin; // ear
        grid[1][9] = skin; // ear
        grid[2][3] = '#ff0000'; // eyes
        grid[2][6] = '#ff0000';
        _fillRow(grid, 3, 3, 8, skin);
        grid[3][4] = '#ffffaa'; grid[3][5] = '#ffffaa'; grid[3][6] = '#ffffaa'; // teeth
        // Body
        _fillRow(grid, 4, 3, 8, '#554433');
        _fillRow(grid, 5, 3, 8, '#554433');
        _fillRow(grid, 6, 3, 8, '#554433');
        grid[5][2] = skin; grid[5][8] = skin; // arms
        grid[6][2] = skin; grid[6][8] = skin;
        // Weapon
        grid[4][9] = '#888888'; grid[5][9] = '#888888';
        // Legs
        grid[7][4] = dark; grid[7][6] = dark;
        grid[8][4] = dark; grid[8][6] = dark;
        return grid;
      },
      goblin_chief: () => {
        const grid = _emptyGrid(14, 14);
        const skin = '#4a7a2a';
        // Crown
        grid[0][4] = '#ffd700'; grid[0][6] = '#ffd700'; grid[0][8] = '#ffd700';
        _fillRow(grid, 1, 3, 10, '#ffd700');
        // Head
        _fillRow(grid, 2, 3, 10, skin);
        _fillRow(grid, 3, 2, 11, skin);
        grid[3][4] = '#ff0000'; grid[3][8] = '#ff0000'; // eyes
        _fillRow(grid, 4, 3, 10, skin);
        grid[4][5] = '#ffffaa'; grid[4][6] = '#ffffaa'; grid[4][7] = '#ffffaa';
        // Body (armored)
        _fillRow(grid, 5, 3, 10, '#777777');
        _fillRow(grid, 6, 2, 11, '#777777');
        _fillRow(grid, 7, 2, 11, '#666666');
        _fillRow(grid, 8, 3, 10, '#666666');
        grid[6][1] = skin; grid[6][11] = skin;
        grid[7][1] = skin; grid[7][11] = skin;
        // Big axe
        grid[5][12] = '#aaaaaa'; grid[6][12] = '#aaaaaa'; grid[7][12] = '#aaaaaa';
        grid[5][13] = '#aaaaaa';
        // Legs
        grid[9][4] = '#555555'; grid[9][8] = '#555555';
        grid[10][4] = '#555555'; grid[10][8] = '#555555';
        grid[11][4] = '#3a2518'; grid[11][8] = '#3a2518';
        return grid;
      },
      skeleton: () => {
        const grid = _emptyGrid(12, 14);
        const bone = '#e8e0d0';
        const dark = '#aaa89a';
        // Skull
        _fillRow(grid, 0, 3, 8, bone);
        _fillRow(grid, 1, 3, 8, bone);
        grid[1][4] = '#1a1a1a'; grid[1][6] = '#1a1a1a'; // eye sockets
        _fillRow(grid, 2, 4, 7, bone);
        grid[2][4] = dark; grid[2][5] = dark; grid[2][6] = dark; // teeth
        // Spine
        grid[3][5] = bone; grid[4][5] = bone;
        // Ribs
        _fillRow(grid, 5, 3, 8, bone);
        grid[5][5] = null;
        _fillRow(grid, 6, 3, 8, bone);
        grid[6][5] = null;
        grid[7][5] = bone; // spine
        // Arms
        grid[5][2] = bone; grid[5][8] = bone;
        grid[6][2] = bone; grid[6][8] = bone;
        grid[7][2] = bone; grid[7][8] = bone;
        // Pelvis
        _fillRow(grid, 8, 4, 7, bone);
        // Legs
        grid[9][4] = bone; grid[9][6] = bone;
        grid[10][4] = bone; grid[10][6] = bone;
        grid[11][4] = bone; grid[11][6] = bone;
        // Sword
        grid[4][9] = '#aaaaaa'; grid[5][9] = '#aaaaaa'; grid[6][9] = '#aaaaaa';
        grid[3][9] = '#cccccc';
        return grid;
      },
      skeleton_mage: () => {
        const grid = _emptyGrid(12, 14);
        const bone = '#e8e0d0';
        // Hat
        grid[0][5] = '#4a2a6e';
        _fillRow(grid, 1, 3, 8, '#4a2a6e');
        // Skull
        _fillRow(grid, 2, 3, 8, bone);
        grid[2][4] = '#ff00ff'; grid[2][6] = '#ff00ff'; // magic eyes
        _fillRow(grid, 3, 4, 7, bone);
        // Robe
        _fillRow(grid, 4, 3, 8, '#4a2a6e');
        _fillRow(grid, 5, 2, 9, '#4a2a6e');
        _fillRow(grid, 6, 2, 9, '#3a1a5e');
        _fillRow(grid, 7, 2, 9, '#3a1a5e');
        _fillRow(grid, 8, 3, 8, '#3a1a5e');
        // Staff with orb
        grid[1][9] = '#ff66ff'; // orb
        grid[2][9] = '#7a5230'; grid[3][9] = '#7a5230';
        grid[4][9] = '#7a5230'; grid[5][9] = '#7a5230';
        grid[6][9] = '#7a5230';
        // Bone hands
        grid[5][1] = bone; grid[5][9] = bone;
        // Legs peeking from robe
        grid[9][4] = bone; grid[9][6] = bone;
        grid[10][4] = bone; grid[10][6] = bone;
        return grid;
      },
      wolf: () => {
        const grid = _emptyGrid(14, 10);
        const fur = '#666666';
        const light = '#888888';
        // Ears
        grid[0][2] = fur; grid[0][4] = fur;
        // Head
        _fillRow(grid, 1, 1, 6, fur);
        _fillRow(grid, 2, 0, 7, fur);
        grid[2][2] = '#ffcc00'; grid[2][4] = '#ffcc00'; // eyes
        _fillRow(grid, 3, 0, 8, fur);
        grid[3][0] = light; grid[3][1] = light; // snout
        grid[3][0] = '#ff3333'; // mouth
        // Body
        _fillRow(grid, 4, 2, 10, fur);
        _fillRow(grid, 5, 2, 11, fur);
        _fillRow(grid, 6, 3, 11, light);
        _fillRow(grid, 7, 3, 10, fur);
        // Tail
        grid[4][10] = fur; grid[3][11] = fur; grid[2][12] = fur;
        // Legs
        grid[8][3] = fur; grid[8][5] = fur; grid[8][8] = fur; grid[8][10] = fur;
        grid[9][3] = fur; grid[9][5] = fur; grid[9][8] = fur; grid[9][10] = fur;
        return grid;
      },
      spider: () => {
        const grid = _emptyGrid(14, 10);
        const body = '#2a1a2a';
        const leg = '#3a2a3a';
        // Body
        _fillRow(grid, 2, 5, 8, body);
        _fillRow(grid, 3, 4, 9, body);
        _fillRow(grid, 4, 4, 9, body);
        _fillRow(grid, 5, 5, 8, body);
        // Eyes (many!)
        grid[3][5] = '#ff0000'; grid[3][7] = '#ff0000';
        grid[2][5] = '#ff0000'; grid[2][7] = '#ff0000';
        // Red marking
        grid[4][6] = '#cc0000';
        // Legs (4 per side)
        grid[3][3] = leg; grid[2][2] = leg; grid[1][1] = leg;
        grid[4][3] = leg; grid[4][2] = leg; grid[5][1] = leg;
        grid[3][9] = leg; grid[2][10] = leg; grid[1][11] = leg;
        grid[4][9] = leg; grid[4][10] = leg; grid[5][11] = leg;
        grid[5][3] = leg; grid[6][2] = leg;
        grid[5][9] = leg; grid[6][10] = leg;
        return grid;
      },
      troll: () => {
        const grid = _emptyGrid(14, 16);
        const skin = '#6a7a4a';
        const dark = '#4a5a2a';
        // Head
        _fillRow(grid, 0, 4, 9, skin);
        _fillRow(grid, 1, 3, 10, skin);
        _fillRow(grid, 2, 3, 10, skin);
        grid[1][4] = '#ffcc00'; grid[1][8] = '#ffcc00'; // eyes
        _fillRow(grid, 3, 4, 9, skin);
        grid[3][5] = '#553322'; grid[3][6] = '#553322'; grid[3][7] = '#553322'; // mouth
        // Massive body
        _fillRow(grid, 4, 2, 11, dark);
        _fillRow(grid, 5, 1, 12, dark);
        _fillRow(grid, 6, 1, 12, dark);
        _fillRow(grid, 7, 1, 12, skin);
        _fillRow(grid, 8, 2, 11, skin);
        _fillRow(grid, 9, 2, 11, dark);
        // Arms
        grid[5][0] = skin; grid[6][0] = skin; grid[7][0] = skin;
        grid[5][12] = skin; grid[6][12] = skin; grid[7][12] = skin;
        // Club
        grid[4][13] = '#5a3a18'; grid[5][13] = '#5a3a18'; grid[6][13] = '#5a3a18';
        grid[3][13] = '#7a5230'; grid[3][12] = '#7a5230';
        // Legs
        grid[10][4] = dark; grid[10][5] = dark; grid[10][8] = dark; grid[10][9] = dark;
        grid[11][4] = dark; grid[11][5] = dark; grid[11][8] = dark; grid[11][9] = dark;
        grid[12][4] = skin; grid[12][5] = skin; grid[12][8] = skin; grid[12][9] = skin;
        return grid;
      },
      dragon: () => {
        const grid = _emptyGrid(16, 16);
        const scale1 = '#8b0000';
        const scale2 = '#aa2200';
        const belly = '#dd8833';
        // Horns
        grid[0][3] = '#444'; grid[0][10] = '#444';
        grid[1][4] = '#444'; grid[1][9] = '#444';
        // Head
        _fillRow(grid, 2, 4, 9, scale1);
        _fillRow(grid, 3, 3, 10, scale1);
        grid[3][5] = '#ffcc00'; grid[3][8] = '#ffcc00'; // eyes
        _fillRow(grid, 4, 2, 11, scale1);
        grid[4][2] = '#ff6600'; grid[4][3] = '#ff6600'; // fire breath!
        grid[4][1] = '#ffaa00'; grid[4][0] = '#ffcc00';
        // Neck
        _fillRow(grid, 5, 5, 9, scale2);
        // Body
        _fillRow(grid, 6, 3, 12, scale1);
        _fillRow(grid, 7, 2, 13, scale1);
        _fillRow(grid, 8, 2, 13, scale2);
        _fillRow(grid, 9, 3, 12, scale2);
        // Belly
        grid[7][6] = belly; grid[7][7] = belly; grid[7][8] = belly;
        grid[8][6] = belly; grid[8][7] = belly; grid[8][8] = belly;
        // Wings
        grid[5][1] = scale2; grid[4][0] = null; // removed conflict
        grid[6][0] = scale2; grid[5][0] = scale2;
        grid[6][13] = scale2; grid[5][13] = scale2; grid[5][14] = scale2;
        grid[7][14] = scale2;
        // Tail
        grid[9][12] = scale1; grid[10][13] = scale1; grid[11][14] = scale1; grid[12][15] = scale2;
        // Legs
        grid[10][4] = scale1; grid[10][5] = scale1; grid[10][9] = scale1; grid[10][10] = scale1;
        grid[11][4] = scale1; grid[11][5] = scale1; grid[11][9] = scale1; grid[11][10] = scale1;
        grid[12][4] = '#333'; grid[12][5] = '#333'; grid[12][9] = '#333'; grid[12][10] = '#333';
        return grid;
      },
      ghost: () => {
        const grid = _emptyGrid(12, 14);
        const body = 'rgba(180,200,220,0.7)';
        const light = 'rgba(200,220,240,0.5)';
        // Head
        _fillRow(grid, 0, 3, 8, body);
        _fillRow(grid, 1, 2, 9, body);
        _fillRow(grid, 2, 2, 9, body);
        grid[2][4] = '#000033'; grid[2][6] = '#000033'; // hollow eyes
        _fillRow(grid, 3, 3, 8, body);
        grid[3][5] = '#000033'; // mouth
        // Body flowing
        _fillRow(grid, 4, 2, 9, body);
        _fillRow(grid, 5, 2, 9, light);
        _fillRow(grid, 6, 2, 9, body);
        _fillRow(grid, 7, 2, 9, body);
        _fillRow(grid, 8, 3, 8, light);
        // Wispy bottom
        grid[9][3] = body; grid[9][5] = body; grid[9][7] = body;
        grid[10][4] = light; grid[10][6] = light;
        grid[11][3] = light; grid[11][7] = light;
        // Arms reaching
        grid[5][1] = body; grid[5][0] = light;
        grid[5][9] = body; grid[5][10] = light;
        return grid;
      },
      forest_wraith: () => {
        const grid = _emptyGrid(14, 16);
        const cloak = '#1a3a1a';
        const glow = '#00ff66';
        const dark = '#0a2a0a';
        // Hood
        _fillRow(grid, 0, 4, 9, cloak);
        _fillRow(grid, 1, 3, 10, cloak);
        _fillRow(grid, 2, 3, 10, dark);
        grid[2][5] = glow; grid[2][7] = glow; // glowing eyes
        _fillRow(grid, 3, 3, 10, dark);
        // Body (robes)
        _fillRow(grid, 4, 3, 10, cloak);
        _fillRow(grid, 5, 2, 11, cloak);
        _fillRow(grid, 6, 2, 11, cloak);
        _fillRow(grid, 7, 2, 11, dark);
        _fillRow(grid, 8, 3, 10, dark);
        _fillRow(grid, 9, 3, 10, cloak);
        _fillRow(grid, 10, 4, 9, cloak);
        // Ghostly tendrils
        grid[11][3] = dark; grid[11][5] = dark; grid[11][7] = dark; grid[11][9] = dark;
        grid[12][4] = dark; grid[12][8] = dark;
        // Branch-like arms
        grid[5][1] = '#3a2a18'; grid[5][0] = '#3a2a18';
        grid[6][0] = '#3a2a18';
        grid[5][11] = '#3a2a18'; grid[5][12] = '#3a2a18';
        grid[6][12] = '#3a2a18';
        // Green magic particles
        grid[4][1] = glow; grid[7][12] = glow; grid[1][11] = glow;
        return grid;
      },
      bat: () => {
        const grid = _emptyGrid(12, 8);
        const body = '#2a1a2a';
        const wing = '#3a2a3a';
        // Head
        grid[1][5] = body; grid[1][6] = body;
        grid[2][5] = body; grid[2][6] = body;
        grid[2][5] = '#ff0000'; // eye
        // Ears
        grid[0][5] = body; grid[0][6] = body;
        // Body
        grid[3][5] = body; grid[3][6] = body;
        grid[4][5] = body; grid[4][6] = body;
        // Wings spread
        _fillRow(grid, 2, 1, 4, wing);
        _fillRow(grid, 2, 7, 10, wing);
        _fillRow(grid, 3, 0, 4, wing);
        _fillRow(grid, 3, 7, 11, wing);
        _fillRow(grid, 4, 1, 3, wing);
        _fillRow(grid, 4, 8, 10, wing);
        // Feet
        grid[5][5] = body; grid[5][6] = body;
        return grid;
      },
      stone_golem: () => {
        const grid = _emptyGrid(14, 16);
        const stone = '#777788';
        const dark = '#555566';
        const crack = '#444455';
        // Head
        _fillRow(grid, 0, 4, 9, stone);
        _fillRow(grid, 1, 3, 10, stone);
        _fillRow(grid, 2, 3, 10, dark);
        grid[1][5] = '#ffaa00'; grid[1][7] = '#ffaa00'; // glowing eyes
        grid[2][5] = crack; grid[2][6] = crack; // crack line
        // Massive body
        _fillRow(grid, 3, 2, 11, stone);
        _fillRow(grid, 4, 1, 12, stone);
        _fillRow(grid, 5, 1, 12, stone);
        _fillRow(grid, 6, 1, 12, dark);
        _fillRow(grid, 7, 1, 12, dark);
        _fillRow(grid, 8, 2, 11, stone);
        _fillRow(grid, 9, 2, 11, stone);
        // Crack details
        grid[5][6] = crack; grid[6][6] = crack; grid[7][5] = crack;
        grid[4][9] = crack; grid[5][9] = crack;
        // Massive arms
        grid[4][0] = stone; grid[5][0] = stone; grid[6][0] = dark;
        grid[4][12] = stone; grid[5][12] = stone; grid[6][12] = dark;
        grid[7][0] = dark; grid[7][12] = dark;
        // Fists
        grid[8][0] = stone; grid[8][12] = stone;
        // Legs
        _fillRow(grid, 10, 3, 6, dark); _fillRow(grid, 10, 7, 10, dark);
        _fillRow(grid, 11, 3, 6, stone); _fillRow(grid, 11, 7, 10, stone);
        _fillRow(grid, 12, 3, 6, dark); _fillRow(grid, 12, 7, 10, dark);
        return grid;
      }
    };

    // Alias mappings
    const aliases = {
      'Gruk': 'goblin_chief',
      'Goblin Raider': 'goblin',
      'Goblin Guard': 'goblin',
      'Goblin Chieftain': 'goblin_chief',
      'Cave Spider': 'spider',
      'Giant Spider': 'spider',
      'Skeleton Guard': 'skeleton',
      'Skeleton Mage': 'skeleton_mage',
      'Wolf Pack': 'wolf',
      'Forest Wolf': 'wolf',
      'Forest Wraith': 'forest_wraith',
      'Mountain Troll': 'troll',
      'Bat Swarm': 'bat',
      'Stone Golem': 'stone_golem',
      'Morvina': 'skeleton_mage',
      'Calcifex': 'dragon',
      'Calcifex the Number Drake': 'dragon'
    };

    const key = aliases[name] || name.toLowerCase().replace(/\s+/g, '_');
    const gen = monsters[key] || monsters.goblin;
    return this.render(gen(), scale);
  },

  // NPC sprites
  npc(name, scale = 4) {
    const npcs = {
      elder: () => {
        const grid = _emptyGrid(12, 16);
        const skin = '#d4a373';
        const robe = '#5a3a8a';
        const hair = '#cccccc';
        // Hair/head
        _fillRow(grid, 0, 4, 7, hair);
        _fillRow(grid, 1, 3, 8, hair);
        _fillRow(grid, 2, 3, 8, skin);
        grid[2][4] = '#1a1a2e'; grid[2][6] = '#1a1a2e'; // eyes
        _fillRow(grid, 3, 4, 7, skin);
        // Beard
        _fillRow(grid, 4, 4, 7, hair);
        _fillRow(grid, 5, 4, 7, hair);
        grid[6][5] = hair;
        // Robe
        _fillRow(grid, 5, 3, 8, robe);
        _fillRow(grid, 6, 3, 8, robe);
        _fillRow(grid, 7, 2, 9, robe);
        _fillRow(grid, 8, 2, 9, robe);
        _fillRow(grid, 9, 3, 8, robe);
        _fillRow(grid, 10, 3, 8, robe);
        // Staff
        grid[3][9] = '#aa66ff'; // orb
        grid[4][9] = '#7a5230'; grid[5][9] = '#7a5230';
        grid[6][9] = '#7a5230'; grid[7][9] = '#7a5230';
        grid[8][9] = '#7a5230';
        // Feet
        grid[11][4] = '#3a2518'; grid[11][6] = '#3a2518';
        return grid;
      },
      merchant: () => {
        const grid = _emptyGrid(12, 16);
        const skin = '#b07d56';
        const clothes = '#8b6914';
        const hat = '#5a4a2a';
        // Hat
        _fillRow(grid, 0, 3, 8, hat);
        _fillRow(grid, 1, 2, 9, hat);
        // Face
        _fillRow(grid, 2, 3, 8, skin);
        _fillRow(grid, 3, 3, 8, skin);
        grid[3][4] = '#1a1a2e'; grid[3][6] = '#1a1a2e';
        _fillRow(grid, 4, 4, 7, skin);
        grid[4][5] = '#cc6655'; // smile
        // Body
        _fillRow(grid, 5, 3, 8, clothes);
        _fillRow(grid, 6, 3, 8, clothes);
        _fillRow(grid, 7, 2, 9, clothes);
        _fillRow(grid, 8, 3, 8, '#7a5a10');
        grid[6][5] = '#ffd700'; // gold button
        // Arms
        grid[6][2] = skin; grid[7][1] = skin;
        grid[6][8] = skin; grid[7][9] = skin;
        // Bag
        grid[7][10] = '#8b7355'; grid[8][10] = '#8b7355'; grid[8][9] = '#8b7355';
        // Legs/feet
        grid[9][4] = '#554433'; grid[9][6] = '#554433';
        grid[10][4] = '#554433'; grid[10][6] = '#554433';
        grid[11][4] = '#3a2518'; grid[11][6] = '#3a2518';
        return grid;
      },
      fairy: () => {
        const grid = _emptyGrid(10, 12);
        const skin = '#ffe4d0';
        const wings = '#88ccff';
        const dress = '#ff88cc';
        // Wings
        grid[1][1] = wings; grid[1][2] = wings; grid[1][7] = wings; grid[1][8] = wings;
        grid[2][0] = wings; grid[2][1] = wings; grid[2][2] = wings;
        grid[2][7] = wings; grid[2][8] = wings; grid[2][9] = wings;
        grid[3][0] = wings; grid[3][1] = wings; grid[3][8] = wings; grid[3][9] = wings;
        grid[4][1] = wings; grid[4][8] = wings;
        // Head
        _fillRow(grid, 1, 3, 6, skin);
        _fillRow(grid, 2, 3, 6, skin);
        grid[2][4] = '#3366ff'; // eyes
        // Body
        _fillRow(grid, 3, 4, 5, dress);
        _fillRow(grid, 4, 3, 6, dress);
        _fillRow(grid, 5, 3, 6, dress);
        // Sparkle
        grid[0][3] = '#ffff00'; grid[0][6] = '#ffff00';
        grid[6][2] = '#ffff00'; grid[6][7] = '#ffff00';
        // Legs
        grid[6][4] = skin; grid[6][5] = skin;
        return grid;
      }
    };

    const aliases = {
      'Village Elder': 'elder',
      'Elder Theron': 'elder',
      'Merchant': 'merchant',
      'Pip': 'fairy',
      'Fairy': 'fairy'
    };

    const key = aliases[name] || name.toLowerCase().replace(/\s+/g, '_');
    const gen = npcs[key] || npcs.elder;
    return this.render(gen(), scale);
  }
};

// --- Utility functions (module-level) ---

function _emptyGrid(w, h) {
  return Array.from({ length: h }, () => Array(w).fill(null));
}

function _fillRow(grid, row, startCol, endCol, color) {
  if (row < 0 || row >= grid.length) return;
  for (let x = startCol; x < endCol && x < grid[row].length; x++) {
    grid[row][x] = color;
  }
}

function _darken(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function _lighten(hex) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 40);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 40);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
