// sprites.js — Higher-resolution pixel art sprites as inline SVG pixel grids

const Sprites = {
  // Render a pixel grid to SVG
  render(pixelData, scale = 3) {
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

  // Generate player sprite (20x28 grid)
  // equipment: optional { weapon: {bonus, type}, armor: {bonus}, accessory: {bonus} }
  player(race, classType, appearance = {}, scale = 3, equipment = null) {
    const _resolve = (val, palette, fallback) => {
      if (typeof val === 'string' && val.startsWith('#')) return val;
      if (typeof val === 'number' && palette && palette[val]) return palette[val];
      return fallback;
    };
    const skin = _resolve(appearance.skinTone, typeof SKIN_TONES !== 'undefined' ? SKIN_TONES : null, '#f5c5a3');
    const hair = _resolve(appearance.hairColor, typeof HAIR_COLORS !== 'undefined' ? HAIR_COLORS : null, '#5c3317');
    const armor = _resolve(appearance.armorColor, typeof ARMOR_COLORS !== 'undefined' ? ARMOR_COLORS : null, '#666688');
    const skinDark = _darken(skin);
    const hairDark = _darken(hair);
    const armorDark = _darken(armor);
    const armorLight = _lighten(armor);
    const eyes = race === 'dragonborn' ? '#ff6600' : race === 'tabaxi' ? '#44cc44' : '#1a1a2e';
    const boot = '#3a2518';
    const bootDark = '#2a1810';
    const belt = '#5a4030';

    const grid = _emptyGrid(20, 28);

    // --- HAIR / HEAD TOP (rows 0-4) ---
    if (race === 'dwarf') {
      _fillRect(grid, 0, 6, 8, 2, hair);
      _fillRect(grid, 1, 5, 10, 1, hair);
      _fillRect(grid, 2, 4, 12, 2, hair);
      _fillRect(grid, 4, 4, 12, 1, hairDark);
    } else if (race === 'elf') {
      _fillRect(grid, 0, 7, 6, 1, hair);
      _fillRect(grid, 1, 5, 10, 1, hair);
      _fillRect(grid, 2, 4, 12, 1, hair);
      _fillRect(grid, 3, 4, 12, 1, hair);
      _fillRect(grid, 4, 3, 14, 1, hair);
      // Pointed ears
      grid[5][3] = skin; grid[5][16] = skin;
      grid[6][2] = skin; grid[6][17] = skin;
    } else if (race === 'dragonborn') {
      _fillRect(grid, 0, 6, 8, 1, skinDark);
      _fillRect(grid, 1, 5, 10, 1, skin);
      _fillRect(grid, 2, 5, 10, 1, skin);
      _fillRect(grid, 3, 5, 10, 2, skin);
      // Horns
      grid[0][5] = _darken(skinDark); grid[0][14] = _darken(skinDark);
      grid[1][4] = _darken(skinDark); grid[1][15] = _darken(skinDark);
    } else if (race === 'tabaxi') {
      // Cat ears
      grid[0][5] = skin; grid[0][6] = skin;
      grid[0][13] = skin; grid[0][14] = skin;
      grid[1][5] = skin; grid[1][6] = skinDark;
      grid[1][13] = skinDark; grid[1][14] = skin;
      _fillRect(grid, 2, 5, 10, 1, hair);
      _fillRect(grid, 3, 5, 10, 1, hair);
      _fillRect(grid, 4, 5, 10, 1, hairDark);
    } else if (race === 'halfling') {
      _fillRect(grid, 1, 7, 6, 1, hair);
      _fillRect(grid, 2, 5, 10, 1, hair);
      _fillRect(grid, 3, 5, 10, 1, hair);
      _fillRect(grid, 4, 5, 10, 1, hairDark);
      // Curly side hair
      grid[3][4] = hair; grid[4][4] = hair;
      grid[3][15] = hair; grid[4][15] = hair;
    } else {
      // Human
      _fillRect(grid, 0, 7, 6, 1, hair);
      _fillRect(grid, 1, 5, 10, 1, hair);
      _fillRect(grid, 2, 5, 10, 1, hair);
      _fillRect(grid, 3, 5, 10, 1, hair);
      _fillRect(grid, 4, 5, 10, 1, hairDark);
    }

    // --- FACE (rows 5-9) ---
    _fillRect(grid, 5, 5, 10, 1, skin);
    _fillRect(grid, 6, 5, 10, 1, skin);
    _fillRect(grid, 7, 5, 10, 1, skin);
    _fillRect(grid, 8, 6, 8, 1, skin);
    _fillRect(grid, 9, 7, 6, 1, skin);
    // Eyes
    grid[6][7] = eyes; grid[6][8] = eyes;
    grid[6][11] = eyes; grid[6][12] = eyes;
    // Eye whites
    grid[6][6] = '#eee'; grid[6][13] = '#eee';
    // Nose
    grid[7][9] = skinDark; grid[7][10] = skinDark;
    // Mouth
    grid[8][8] = '#cc6655'; grid[8][9] = '#cc6655'; grid[8][10] = '#cc6655'; grid[8][11] = '#cc6655';

    // Tabaxi cat nose
    if (race === 'tabaxi') {
      grid[7][9] = '#ff9999'; grid[7][10] = '#ff9999';
      // Whisker hints
      grid[8][5] = skinDark; grid[8][14] = skinDark;
    }

    // Dwarf beard
    if (race === 'dwarf') {
      _fillRect(grid, 8, 5, 10, 1, hair);
      grid[8][8] = '#cc6655'; grid[8][9] = '#cc6655'; grid[8][10] = '#cc6655'; grid[8][11] = '#cc6655';
      _fillRect(grid, 9, 6, 8, 1, hair);
      _fillRect(grid, 10, 7, 6, 1, hairDark);
      grid[11][8] = hairDark; grid[11][9] = hairDark; grid[11][10] = hairDark; grid[11][11] = hairDark;
    }

    // --- NECK (row 10) ---
    grid[10][9] = skin; grid[10][10] = skin;

    // --- Equipment tier colors ---
    const wepBonus = equipment && equipment.weapon ? equipment.weapon.bonus : 0;
    const armBonus = equipment && equipment.armor ? equipment.armor.bonus : 0;
    const hasAccessory = equipment && equipment.accessory;

    // Weapon metal color by tier
    const wepMetal = wepBonus >= 5 ? '#e8d060' : wepBonus >= 4 ? '#70b8e8' : wepBonus >= 3 ? '#cccccc' : '#aaaaaa';
    const wepMetalDark = wepBonus >= 5 ? '#c8a030' : wepBonus >= 4 ? '#4888b8' : wepBonus >= 3 ? '#999999' : '#777777';
    const wepGlow = wepBonus >= 5 ? '#ffe888' : wepBonus >= 4 ? '#90d0ff' : null;

    // Armor overlay by tier (heavy armor gets extra details)
    const armorTier = armBonus >= 5 ? 'heavy' : armBonus >= 3 ? 'medium' : 'light';

    // --- SHOULDERS + TORSO (rows 11-17) ---
    _fillRect(grid, 11, 4, 12, 1, armor);
    _fillRect(grid, 12, 4, 12, 1, armor);
    _fillRect(grid, 13, 5, 10, 1, armor);
    _fillRect(grid, 14, 5, 10, 1, armorDark);
    _fillRect(grid, 15, 5, 10, 1, armorDark);
    // Belt
    _fillRect(grid, 16, 6, 8, 1, belt);
    grid[16][9] = '#c8a030'; grid[16][10] = '#c8a030'; // buckle

    // Heavy armor details (tier 5+)
    if (armorTier === 'heavy') {
      // Reinforced plate lines
      grid[12][6] = armorLight; grid[12][13] = armorLight;
      grid[13][6] = armorLight; grid[13][13] = armorLight;
      grid[14][6] = armorLight; grid[14][13] = armorLight;
    } else if (armorTier === 'medium') {
      // Chain links hint
      grid[13][7] = armorLight; grid[13][12] = armorLight;
    }

    // Class-specific torso detail
    if (classType === 'wizard') {
      grid[12][9] = '#9966cc'; grid[12][10] = '#9966cc'; // gem
      grid[13][9] = '#aa77dd'; // gem highlight
      _fillRect(grid, 15, 5, 10, 1, '#4a3a6e');
      _fillRect(grid, 16, 5, 10, 1, '#4a3a6e');
      _fillRect(grid, 17, 5, 10, 1, '#3a2a5e');
      _fillRect(grid, 18, 6, 8, 1, '#3a2a5e');
    } else if (classType === 'warrior') {
      grid[12][9] = armorLight; grid[12][10] = armorLight;
      grid[13][9] = armorLight; grid[13][10] = armorLight;
      // Pauldrons — bigger at higher armor tiers
      grid[11][3] = armorLight; grid[11][16] = armorLight;
      if (armorTier === 'heavy') {
        grid[10][3] = armorLight; grid[10][16] = armorLight;
        grid[11][2] = armor; grid[11][17] = armor;
      }
    } else if (classType === 'rogue') {
      // Dark vest stripe
      grid[12][9] = '#2a2a2a'; grid[12][10] = '#2a2a2a';
      grid[13][9] = '#2a2a2a'; grid[13][10] = '#2a2a2a';
      // Hood (if rogue)
      grid[4][5] = '#2a2a3e'; grid[4][14] = '#2a2a3e';
    } else if (classType === 'ranger') {
      // Cape/cloak hints
      grid[11][3] = '#2a5a2a'; grid[11][16] = '#2a5a2a';
      grid[12][3] = '#2a5a2a'; grid[12][16] = '#2a5a2a';
    }

    // --- ARMS (rows 12-16) ---
    grid[12][3] = skin; grid[12][16] = skin;
    grid[13][3] = skin; grid[13][16] = skin;
    grid[14][3] = skin; grid[14][16] = skin;
    grid[15][3] = skin; grid[15][16] = skin;
    grid[16][3] = skin; grid[16][16] = skin;

    // --- WEAPON (right hand, colored by tier) ---
    if (classType === 'warrior') {
      // Sword — color varies by weapon bonus
      if (wepGlow) { grid[9][17] = wepGlow; } // glow tip for high-tier
      grid[10][17] = wepMetal;
      grid[11][17] = wepMetal; grid[12][17] = wepMetalDark;
      grid[13][17] = wepMetalDark; grid[14][17] = wepMetalDark;
      grid[15][17] = wepMetalDark;
      grid[16][17] = '#7a5230'; // handle
      // Shield (left hand)
      const shieldColor = armorTier === 'heavy' ? armorLight : '#8b7355';
      const shieldEdge = armorTier === 'heavy' ? armor : '#7b6345';
      grid[12][1] = shieldColor; grid[12][2] = shieldColor;
      grid[13][1] = shieldColor; grid[13][2] = shieldColor;
      grid[14][1] = shieldColor; grid[14][2] = shieldColor;
      grid[13][0] = shieldEdge;
    } else if (classType === 'wizard') {
      // Staff with orb — orb color varies by tier
      const orbColor = wepBonus >= 5 ? '#ff6600' : wepBonus >= 4 ? '#44ddff' : '#aa66ff';
      const orbGlow = wepBonus >= 5 ? '#ff9944' : wepBonus >= 4 ? '#88eeff' : '#cc88ff';
      grid[9][17] = orbColor; grid[9][18] = orbGlow;
      if (wepBonus >= 5) { grid[8][17] = orbGlow; } // extra glow
      grid[10][17] = '#7a5230';
      grid[11][17] = '#7a5230'; grid[12][17] = '#7a5230';
      grid[13][17] = '#7a5230'; grid[14][17] = '#7a5230';
      grid[15][17] = '#6a4220'; grid[16][17] = '#6a4220';
    } else if (classType === 'rogue') {
      // Daggers — color by tier
      grid[14][17] = wepMetalDark; grid[15][17] = wepMetal;
      grid[14][2] = wepMetalDark; grid[15][2] = wepMetal;
      if (wepGlow) { grid[13][17] = wepGlow; grid[13][2] = wepGlow; }
    } else if (classType === 'ranger') {
      // Bow — wood darkens with tier
      const bowColor = wepBonus >= 5 ? '#5a3a1a' : '#7a5230';
      const bowDark = wepBonus >= 5 ? '#4a2a10' : '#6a4220';
      grid[11][17] = bowColor; grid[12][17] = bowColor;
      grid[13][17] = bowDark; grid[14][17] = bowDark;
      grid[15][17] = bowColor;
      // Bowstring — glows at high tier
      const stringColor = wepBonus >= 5 ? '#ffd700' : wepBonus >= 4 ? '#d0a030' : '#b8860b';
      grid[11][18] = stringColor; grid[12][18] = stringColor;
      grid[13][18] = stringColor; grid[14][18] = stringColor;
      grid[15][18] = stringColor;
    }

    // --- ACCESSORY glow (ring on left hand) ---
    if (hasAccessory) {
      grid[16][3] = '#ffd700'; // gold ring on hand
      grid[15][3] = '#ffe844'; // sparkle
    }

    // --- LEGS (rows 17-23) ---
    if (classType !== 'wizard') {
      _fillRect(grid, 17, 6, 3, 1, armorDark);
      _fillRect(grid, 17, 11, 3, 1, armorDark);
      _fillRect(grid, 18, 6, 3, 1, armorDark);
      _fillRect(grid, 18, 11, 3, 1, armorDark);
      _fillRect(grid, 19, 6, 3, 1, armorDark);
      _fillRect(grid, 19, 11, 3, 1, armorDark);
      _fillRect(grid, 20, 6, 3, 1, armorDark);
      _fillRect(grid, 20, 11, 3, 1, armorDark);
    }

    // --- BOOTS (rows 21-24) ---
    _fillRect(grid, 21, 5, 4, 1, boot);
    _fillRect(grid, 21, 11, 4, 1, boot);
    _fillRect(grid, 22, 5, 4, 1, boot);
    _fillRect(grid, 22, 11, 4, 1, boot);
    _fillRect(grid, 23, 5, 4, 1, bootDark);
    _fillRect(grid, 23, 11, 4, 1, bootDark);
    _fillRect(grid, 24, 4, 5, 1, bootDark);
    _fillRect(grid, 24, 11, 5, 1, bootDark);

    if (race === 'halfling') {
      // Barefoot
      _fillRect(grid, 21, 5, 4, 1, skin);
      _fillRect(grid, 21, 11, 4, 1, skin);
      _fillRect(grid, 22, 5, 4, 1, skin);
      _fillRect(grid, 22, 11, 4, 1, skin);
      _fillRect(grid, 23, 5, 4, 1, skinDark);
      _fillRect(grid, 23, 11, 4, 1, skinDark);
      _fillRect(grid, 24, 4, 5, 1, skinDark);
      _fillRect(grid, 24, 11, 5, 1, skinDark);
    }

    // --- RACE-SPECIFIC BODY DETAILS ---
    if (race === 'dragonborn') {
      grid[19][4] = _darken(skinDark);
      grid[20][3] = _darken(skinDark);
      grid[21][2] = skinDark;
      grid[22][1] = skinDark;
    } else if (race === 'tabaxi') {
      // Tail
      grid[18][15] = hair; grid[18][16] = hair;
      grid[19][16] = hair; grid[19][17] = hair;
      grid[20][17] = hair; grid[20][18] = hair;
      grid[21][18] = hairDark;
    }

    return this.render(grid, scale);
  },

  // Monster sprites — higher resolution
  monster(name, scale = 3) {
    const monsters = {
      goblin: () => {
        const grid = _emptyGrid(18, 18);
        const skin = '#5a8a3a';
        const dark = '#3a6a2a';
        const leather = '#554433';
        const leatherDark = '#443322';
        // Ears
        grid[1][2] = skin; grid[1][3] = skin;
        grid[1][14] = skin; grid[1][15] = skin;
        // Head
        _fillRect(grid, 0, 5, 8, 1, skin);
        _fillRect(grid, 1, 4, 10, 1, skin);
        _fillRect(grid, 2, 4, 10, 1, skin);
        _fillRect(grid, 3, 4, 10, 1, skin);
        _fillRect(grid, 4, 5, 8, 1, dark);
        // Eyes (menacing red)
        grid[2][5] = '#ff0000'; grid[2][6] = '#ff2200';
        grid[2][11] = '#ff2200'; grid[2][12] = '#ff0000';
        // Brow ridge
        grid[1][5] = dark; grid[1][6] = dark;
        grid[1][11] = dark; grid[1][12] = dark;
        // Fangs/teeth
        grid[4][6] = '#ffffaa'; grid[4][7] = '#ffffcc'; grid[4][8] = '#ffffaa';
        grid[4][9] = '#ffffcc'; grid[4][10] = '#ffffaa'; grid[4][11] = '#ffffaa';
        grid[3][7] = '#553322'; grid[3][8] = '#553322'; grid[3][9] = '#553322'; grid[3][10] = '#553322';
        // Neck
        grid[5][7] = dark; grid[5][8] = dark; grid[5][9] = dark; grid[5][10] = dark;
        // Body (leather armor)
        _fillRect(grid, 6, 4, 10, 1, leather);
        _fillRect(grid, 7, 4, 10, 1, leather);
        _fillRect(grid, 8, 5, 8, 1, leather);
        _fillRect(grid, 9, 5, 8, 1, leatherDark);
        _fillRect(grid, 10, 5, 8, 1, leatherDark);
        // Belt
        _fillRect(grid, 10, 5, 8, 1, '#444');
        grid[10][8] = '#888'; grid[10][9] = '#888';
        // Arms
        grid[7][3] = skin; grid[8][3] = skin; grid[9][3] = skin; grid[10][3] = skin;
        grid[7][14] = skin; grid[8][14] = skin; grid[9][14] = skin; grid[10][14] = skin;
        grid[7][2] = dark; grid[8][2] = dark;
        grid[7][15] = dark; grid[8][15] = dark;
        // Weapon (crude sword)
        grid[5][15] = '#aaaaaa'; grid[6][15] = '#999999'; grid[7][15] = '#888888';
        grid[8][15] = '#777777'; grid[4][15] = '#bbbbbb';
        grid[9][15] = '#6a4a2a'; // handle
        // Legs
        grid[11][6] = dark; grid[11][7] = dark; grid[11][10] = dark; grid[11][11] = dark;
        grid[12][6] = dark; grid[12][7] = dark; grid[12][10] = dark; grid[12][11] = dark;
        grid[13][6] = dark; grid[13][7] = dark; grid[13][10] = dark; grid[13][11] = dark;
        // Feet
        grid[14][5] = '#3a2518'; grid[14][6] = '#3a2518'; grid[14][7] = '#3a2518';
        grid[14][10] = '#3a2518'; grid[14][11] = '#3a2518'; grid[14][12] = '#3a2518';
        return grid;
      },

      goblin_chief: () => {
        const grid = _emptyGrid(22, 22);
        const skin = '#4a7a2a';
        const dark = '#2a5a1a';
        const armorG = '#777777';
        const armorD = '#555555';
        // Crown
        grid[0][7] = '#ffd700'; grid[0][9] = '#ffd700'; grid[0][11] = '#ffd700'; grid[0][13] = '#ffd700';
        _fillRect(grid, 1, 5, 12, 1, '#ffd700');
        _fillRect(grid, 2, 6, 10, 1, '#ddaa00');
        grid[1][8] = '#ff4444'; grid[1][12] = '#4444ff'; // gems
        // Head (bigger)
        _fillRect(grid, 3, 5, 12, 1, skin);
        _fillRect(grid, 4, 4, 14, 1, skin);
        _fillRect(grid, 5, 4, 14, 1, skin);
        _fillRect(grid, 6, 5, 12, 1, skin);
        // Ears
        grid[3][3] = skin; grid[3][4] = dark;
        grid[3][17] = dark; grid[3][18] = skin;
        grid[4][3] = skin; grid[4][18] = skin;
        // Eyes
        grid[4][7] = '#ff0000'; grid[4][8] = '#ff2200';
        grid[4][13] = '#ff2200'; grid[4][14] = '#ff0000';
        // Scar
        grid[5][7] = dark; grid[5][8] = dark;
        // Mouth/fangs
        grid[6][8] = '#ffffaa'; grid[6][9] = '#553322'; grid[6][10] = '#553322';
        grid[6][11] = '#553322'; grid[6][12] = '#553322'; grid[6][13] = '#ffffaa';
        // Neck
        _fillRect(grid, 7, 7, 8, 1, dark);
        // Armored body
        _fillRect(grid, 8, 4, 14, 1, armorG);
        _fillRect(grid, 9, 3, 16, 1, armorG);
        _fillRect(grid, 10, 3, 16, 1, armorD);
        _fillRect(grid, 11, 4, 14, 1, armorD);
        _fillRect(grid, 12, 4, 14, 1, armorG);
        _fillRect(grid, 13, 5, 12, 1, armorD);
        // Chest emblem
        grid[10][10] = '#ffd700'; grid[10][11] = '#ffd700';
        grid[11][10] = '#ffd700'; grid[11][11] = '#ffd700';
        // Arms
        grid[9][2] = skin; grid[10][2] = skin; grid[11][2] = skin; grid[12][2] = skin;
        grid[9][19] = skin; grid[10][19] = skin; grid[11][19] = skin; grid[12][19] = skin;
        grid[9][1] = dark; grid[10][1] = dark;
        // BIG axe
        grid[6][20] = '#aaaaaa'; grid[7][20] = '#aaaaaa'; grid[8][20] = '#bbbbbb';
        grid[6][21] = '#999999'; grid[7][21] = '#999999';
        grid[9][20] = '#6a4a2a'; grid[10][20] = '#6a4a2a'; grid[11][20] = '#6a4a2a';
        grid[12][20] = '#5a3a1a';
        // Legs
        _fillRect(grid, 14, 6, 4, 1, armorD);
        _fillRect(grid, 14, 12, 4, 1, armorD);
        _fillRect(grid, 15, 6, 4, 1, armorD);
        _fillRect(grid, 15, 12, 4, 1, armorD);
        _fillRect(grid, 16, 6, 4, 1, dark);
        _fillRect(grid, 16, 12, 4, 1, dark);
        // Boots
        _fillRect(grid, 17, 5, 5, 1, '#3a2518');
        _fillRect(grid, 17, 12, 5, 1, '#3a2518');
        return grid;
      },

      skeleton: () => {
        const grid = _emptyGrid(18, 22);
        const bone = '#e8e0d0';
        const boneD = '#c8c0b0';
        const dark = '#1a1a2e';
        // Skull
        _fillRect(grid, 0, 5, 8, 1, bone);
        _fillRect(grid, 1, 4, 10, 1, bone);
        _fillRect(grid, 2, 4, 10, 1, bone);
        _fillRect(grid, 3, 5, 8, 1, boneD);
        // Eye sockets
        grid[1][6] = dark; grid[1][7] = dark;
        grid[1][10] = dark; grid[1][11] = dark;
        grid[2][6] = dark; grid[2][7] = dark;
        grid[2][10] = dark; grid[2][11] = dark;
        // Nose hole
        grid[2][8] = boneD; grid[2][9] = boneD;
        // Jaw/teeth
        grid[3][6] = boneD; grid[3][7] = '#aaa'; grid[3][8] = boneD; grid[3][9] = '#aaa';
        grid[3][10] = boneD; grid[3][11] = '#aaa';
        // Spine
        grid[4][8] = bone; grid[4][9] = bone;
        grid[5][8] = boneD; grid[5][9] = boneD;
        // Ribs
        _fillRect(grid, 6, 5, 8, 1, bone);
        grid[6][8] = null; grid[6][9] = null;
        _fillRect(grid, 7, 5, 8, 1, boneD);
        grid[7][8] = null; grid[7][9] = null;
        _fillRect(grid, 8, 5, 8, 1, bone);
        grid[8][8] = null; grid[8][9] = null;
        grid[9][8] = bone; grid[9][9] = bone; // spine
        // Arms
        grid[6][4] = bone; grid[7][3] = bone; grid[8][3] = boneD;
        grid[9][3] = boneD; grid[10][3] = bone;
        grid[6][13] = bone; grid[7][14] = bone; grid[8][14] = boneD;
        grid[9][14] = boneD; grid[10][14] = bone;
        // Pelvis
        _fillRect(grid, 10, 6, 6, 1, bone);
        _fillRect(grid, 11, 7, 4, 1, boneD);
        // Legs
        grid[12][7] = bone; grid[12][8] = bone; grid[12][10] = bone; grid[12][11] = bone;
        grid[13][7] = boneD; grid[13][8] = boneD; grid[13][10] = boneD; grid[13][11] = boneD;
        grid[14][7] = bone; grid[14][8] = bone; grid[14][10] = bone; grid[14][11] = bone;
        grid[15][7] = boneD; grid[15][10] = boneD;
        // Feet
        grid[16][6] = bone; grid[16][7] = bone; grid[16][8] = bone;
        grid[16][10] = bone; grid[16][11] = bone; grid[16][12] = bone;
        // Rusty sword
        grid[3][15] = '#cccccc'; grid[4][15] = '#bbbbbb';
        grid[5][15] = '#aaaaaa'; grid[6][15] = '#999999';
        grid[7][15] = '#888888'; grid[8][15] = '#777777';
        grid[9][15] = '#6a4a2a'; // handle
        return grid;
      },

      skeleton_mage: () => {
        const grid = _emptyGrid(18, 22);
        const bone = '#e8e0d0';
        const boneD = '#c8c0b0';
        const robe = '#4a2a6e';
        const robeD = '#3a1a5e';
        // Wizard hat
        grid[0][8] = robe; grid[0][9] = robe;
        _fillRect(grid, 1, 6, 6, 1, robe);
        _fillRect(grid, 2, 4, 10, 1, robeD);
        // Skull
        _fillRect(grid, 3, 5, 8, 1, bone);
        _fillRect(grid, 4, 5, 8, 1, bone);
        _fillRect(grid, 5, 6, 6, 1, boneD);
        // Magic eyes
        grid[3][6] = '#ff00ff'; grid[3][7] = '#ff44ff';
        grid[3][10] = '#ff44ff'; grid[3][11] = '#ff00ff';
        // Teeth
        grid[5][7] = '#aaa'; grid[5][8] = boneD; grid[5][9] = '#aaa'; grid[5][10] = boneD;
        // Robes
        _fillRect(grid, 6, 5, 8, 1, robe);
        _fillRect(grid, 7, 4, 10, 1, robe);
        _fillRect(grid, 8, 3, 12, 1, robe);
        _fillRect(grid, 9, 3, 12, 1, robeD);
        _fillRect(grid, 10, 4, 10, 1, robeD);
        _fillRect(grid, 11, 4, 10, 1, robe);
        _fillRect(grid, 12, 5, 8, 1, robe);
        _fillRect(grid, 13, 5, 8, 1, robeD);
        _fillRect(grid, 14, 6, 6, 1, robeD);
        // Magic rune on robe
        grid[9][8] = '#ff66ff'; grid[9][9] = '#ff66ff';
        grid[10][8] = '#cc44cc'; grid[10][9] = '#cc44cc';
        // Bone hands
        grid[8][2] = bone; grid[9][2] = bone;
        grid[8][15] = bone; grid[9][15] = bone;
        // Staff with orb
        grid[1][16] = '#ff66ff'; grid[2][16] = '#dd44dd'; // magic orb
        grid[3][16] = '#7a5230'; grid[4][16] = '#7a5230';
        grid[5][16] = '#7a5230'; grid[6][16] = '#7a5230';
        grid[7][16] = '#7a5230'; grid[8][16] = '#6a4220';
        // Orb glow
        grid[0][16] = '#ff88ff'; grid[1][15] = '#ff88ff'; grid[1][17] = '#ff88ff';
        // Legs peeking
        grid[15][7] = bone; grid[15][11] = bone;
        grid[16][7] = bone; grid[16][11] = bone;
        // Magic particles
        grid[6][2] = '#ff66ff'; grid[4][1] = '#cc44cc';
        grid[10][16] = '#ff66ff';
        return grid;
      },

      wolf: () => {
        const grid = _emptyGrid(22, 14);
        const fur = '#555555';
        const furL = '#777777';
        const furD = '#333333';
        const belly = '#888888';
        // Ears
        grid[0][4] = fur; grid[0][5] = fur;
        grid[0][7] = fur; grid[0][8] = fur;
        // Head
        _fillRect(grid, 1, 3, 8, 1, fur);
        _fillRect(grid, 2, 2, 10, 1, fur);
        _fillRect(grid, 3, 1, 12, 1, fur);
        _fillRect(grid, 4, 0, 12, 1, furL);
        // Eyes
        grid[2][4] = '#ffcc00'; grid[2][5] = '#ffcc00';
        grid[2][7] = '#ffcc00'; grid[2][8] = '#ffcc00';
        // Snout
        grid[3][1] = furL; grid[3][2] = furL; grid[3][3] = furL;
        grid[4][0] = '#ff3333'; grid[4][1] = furL; grid[4][2] = furL;
        grid[3][0] = '#222'; // nose
        // Body
        _fillRect(grid, 4, 4, 12, 1, fur);
        _fillRect(grid, 5, 4, 14, 1, fur);
        _fillRect(grid, 6, 4, 15, 1, furD);
        _fillRect(grid, 7, 5, 14, 1, fur);
        _fillRect(grid, 8, 5, 12, 1, furL);
        // Belly
        grid[7][8] = belly; grid[7][9] = belly; grid[7][10] = belly; grid[7][11] = belly;
        grid[8][8] = belly; grid[8][9] = belly; grid[8][10] = belly;
        // Tail (bushy)
        grid[4][16] = fur; grid[3][17] = fur; grid[3][18] = fur;
        grid[2][18] = furD; grid[2][19] = furL;
        grid[4][17] = furD;
        // Legs (4)
        grid[9][5] = furD; grid[9][6] = furD; grid[9][9] = furD; grid[9][10] = furD;
        grid[9][13] = furD; grid[9][14] = furD; grid[9][16] = furD; grid[9][17] = furD;
        grid[10][5] = furD; grid[10][6] = furD; grid[10][9] = furD; grid[10][10] = furD;
        grid[10][13] = furD; grid[10][14] = furD; grid[10][16] = furD; grid[10][17] = furD;
        grid[11][5] = furD; grid[11][6] = furD; grid[11][13] = furD; grid[11][14] = furD;
        // Paws
        grid[11][4] = '#222'; grid[11][7] = '#222';
        grid[11][9] = '#222'; grid[11][10] = '#222';
        grid[11][12] = '#222'; grid[11][15] = '#222';
        grid[11][16] = '#222'; grid[11][17] = '#222';
        return grid;
      },

      spider: () => {
        const grid = _emptyGrid(22, 14);
        const body = '#2a1a2a';
        const bodyL = '#3a2a3a';
        const leg = '#4a3a4a';
        const legD = '#2a1a2a';
        // Head section
        _fillRect(grid, 3, 8, 5, 1, bodyL);
        _fillRect(grid, 4, 7, 7, 1, body);
        _fillRect(grid, 5, 7, 7, 1, bodyL);
        // Eyes (cluster of red)
        grid[3][9] = '#ff0000'; grid[3][11] = '#ff0000';
        grid[4][8] = '#ff2200'; grid[4][10] = '#ff0000'; grid[4][12] = '#ff2200';
        // Fangs
        grid[5][9] = '#ffffaa'; grid[5][11] = '#ffffaa';
        // Abdomen
        _fillRect(grid, 6, 7, 7, 1, body);
        _fillRect(grid, 7, 6, 9, 1, body);
        _fillRect(grid, 8, 6, 9, 1, bodyL);
        _fillRect(grid, 9, 7, 7, 1, body);
        // Red marking (hourglass)
        grid[7][9] = '#cc0000'; grid[7][10] = '#cc0000'; grid[7][11] = '#cc0000';
        grid[8][10] = '#cc0000';
        grid[9][9] = '#cc0000'; grid[9][10] = '#cc0000'; grid[9][11] = '#cc0000';
        // Legs (8, detailed jointed)
        // Left legs
        grid[4][6] = leg; grid[3][5] = leg; grid[2][4] = leg; grid[1][3] = legD; grid[0][2] = legD;
        grid[5][6] = leg; grid[5][5] = leg; grid[6][4] = leg; grid[7][3] = legD;
        grid[7][6] = leg; grid[8][5] = leg; grid[9][4] = legD; grid[10][3] = legD;
        grid[8][6] = leg; grid[9][5] = leg; grid[10][4] = legD; grid[11][3] = legD;
        // Right legs
        grid[4][14] = leg; grid[3][15] = leg; grid[2][16] = leg; grid[1][17] = legD; grid[0][18] = legD;
        grid[5][14] = leg; grid[5][15] = leg; grid[6][16] = leg; grid[7][17] = legD;
        grid[7][14] = leg; grid[8][15] = leg; grid[9][16] = legD; grid[10][17] = legD;
        grid[8][14] = leg; grid[9][15] = leg; grid[10][16] = legD; grid[11][17] = legD;
        // Web strand hint
        grid[0][10] = '#888'; grid[1][10] = '#888';
        return grid;
      },

      troll: () => {
        const grid = _emptyGrid(22, 24);
        const skin = '#6a7a4a';
        const skinD = '#4a5a2a';
        const skinL = '#8a9a6a';
        // Head
        _fillRect(grid, 0, 6, 10, 1, skin);
        _fillRect(grid, 1, 5, 12, 1, skin);
        _fillRect(grid, 2, 5, 12, 1, skinL);
        _fillRect(grid, 3, 5, 12, 1, skin);
        _fillRect(grid, 4, 6, 10, 1, skinD);
        // Brow
        grid[1][6] = skinD; grid[1][7] = skinD;
        grid[1][14] = skinD; grid[1][15] = skinD;
        // Eyes
        grid[2][7] = '#ffcc00'; grid[2][8] = '#ffcc00';
        grid[2][13] = '#ffcc00'; grid[2][14] = '#ffcc00';
        // Nose (big)
        grid[3][9] = skinD; grid[3][10] = skinD; grid[3][11] = skinD; grid[3][12] = skinD;
        // Mouth
        grid[4][7] = '#553322'; grid[4][8] = '#553322'; grid[4][9] = '#553322';
        grid[4][10] = '#553322'; grid[4][11] = '#553322'; grid[4][12] = '#553322'; grid[4][13] = '#553322';
        grid[4][7] = '#ffffaa'; grid[4][14] = '#ffffaa'; // tusks
        // Massive body
        _fillRect(grid, 5, 3, 16, 1, skinD);
        _fillRect(grid, 6, 2, 18, 1, skinD);
        _fillRect(grid, 7, 2, 18, 1, skin);
        _fillRect(grid, 8, 2, 18, 1, skin);
        _fillRect(grid, 9, 2, 18, 1, skinL);
        _fillRect(grid, 10, 3, 16, 1, skin);
        _fillRect(grid, 11, 3, 16, 1, skinD);
        _fillRect(grid, 12, 4, 14, 1, skinD);
        // Belly
        grid[8][8] = skinL; grid[8][9] = skinL; grid[8][10] = skinL; grid[8][11] = skinL; grid[8][12] = skinL; grid[8][13] = skinL;
        grid[9][7] = skinL; grid[9][8] = skinL; grid[9][9] = skinL; grid[9][10] = skinL; grid[9][11] = skinL; grid[9][12] = skinL; grid[9][13] = skinL; grid[9][14] = skinL;
        // Loincloth
        _fillRect(grid, 12, 6, 10, 1, '#554433');
        _fillRect(grid, 13, 7, 8, 1, '#443322');
        // Arms (huge)
        grid[6][1] = skin; grid[7][0] = skin; grid[8][0] = skinL;
        grid[9][0] = skinD; grid[10][0] = skinD; grid[11][0] = skin;
        grid[6][20] = skin; grid[7][21] = skin; grid[8][21] = skinL;
        grid[9][21] = skinD; grid[10][21] = skinD; grid[11][21] = skin;
        // Fists
        grid[12][0] = skinL; grid[12][1] = skinL;
        grid[12][20] = skinL; grid[12][21] = skinL;
        // Club
        grid[4][21] = '#7a5230'; grid[5][21] = '#5a3a18'; grid[6][21] = '#5a3a18';
        grid[3][20] = '#7a5230'; grid[3][21] = '#7a5230'; grid[3][19] = '#7a5230';
        grid[2][20] = '#6a4a28'; grid[2][21] = '#6a4a28';
        // Legs
        _fillRect(grid, 14, 6, 4, 1, skinD); _fillRect(grid, 14, 12, 4, 1, skinD);
        _fillRect(grid, 15, 6, 4, 1, skin); _fillRect(grid, 15, 12, 4, 1, skin);
        _fillRect(grid, 16, 6, 4, 1, skinD); _fillRect(grid, 16, 12, 4, 1, skinD);
        _fillRect(grid, 17, 6, 4, 1, skin); _fillRect(grid, 17, 12, 4, 1, skin);
        // Big feet
        _fillRect(grid, 18, 5, 6, 1, skinD); _fillRect(grid, 18, 11, 6, 1, skinD);
        return grid;
      },

      dragon: () => {
        const grid = _emptyGrid(26, 24);
        const sc1 = '#8b0000';
        const sc2 = '#aa2200';
        const sc3 = '#660000';
        const belly = '#dd8833';
        const bellyL = '#eeaa44';
        // Horns
        grid[0][6] = '#555'; grid[0][7] = '#444';
        grid[0][16] = '#444'; grid[0][17] = '#555';
        grid[1][7] = '#555'; grid[1][8] = '#444';
        grid[1][15] = '#444'; grid[1][16] = '#555';
        // Head
        _fillRect(grid, 2, 7, 10, 1, sc1);
        _fillRect(grid, 3, 6, 12, 1, sc1);
        _fillRect(grid, 4, 5, 14, 1, sc2);
        _fillRect(grid, 5, 5, 14, 1, sc1);
        _fillRect(grid, 6, 6, 12, 1, sc3);
        // Eyes
        grid[3][8] = '#ffcc00'; grid[3][9] = '#ffee00';
        grid[3][14] = '#ffee00'; grid[3][15] = '#ffcc00';
        // Nostrils
        grid[5][8] = '#440000'; grid[5][9] = '#440000';
        // Mouth/jaw
        grid[6][7] = '#ffeecc'; grid[6][8] = sc3; grid[6][9] = '#ffeecc';
        grid[6][14] = '#ffeecc'; grid[6][15] = sc3; grid[6][16] = '#ffeecc';
        // Fire breath!
        grid[5][3] = '#ff6600'; grid[5][4] = '#ff8800';
        grid[4][2] = '#ffaa00'; grid[4][3] = '#ffcc00';
        grid[6][3] = '#ff4400'; grid[6][4] = '#ff6600';
        grid[5][2] = '#ffcc44'; grid[4][1] = '#ffee66';
        // Neck
        _fillRect(grid, 7, 8, 8, 1, sc2);
        _fillRect(grid, 8, 8, 8, 1, sc1);
        // Wings (spread)
        // Left wing
        grid[6][4] = sc2; grid[5][3] = null; // clear fire overlap
        grid[7][4] = sc2; grid[7][3] = sc2; grid[7][2] = sc1;
        grid[8][3] = sc2; grid[8][2] = sc1; grid[8][1] = sc3;
        grid[9][2] = sc2; grid[9][1] = sc3; grid[9][0] = sc1;
        grid[10][1] = sc2;
        // Right wing
        grid[7][19] = sc2; grid[7][20] = sc2; grid[7][21] = sc1;
        grid[8][20] = sc2; grid[8][21] = sc1; grid[8][22] = sc3;
        grid[9][21] = sc2; grid[9][22] = sc3; grid[9][23] = sc1;
        grid[10][22] = sc2;
        // Wing membrane hints
        grid[8][4] = sc3; grid[9][3] = sc3; grid[10][2] = sc3;
        grid[8][19] = sc3; grid[9][20] = sc3; grid[10][21] = sc3;
        // Body (massive)
        _fillRect(grid, 9, 5, 14, 1, sc1);
        _fillRect(grid, 10, 4, 16, 1, sc2);
        _fillRect(grid, 11, 4, 16, 1, sc1);
        _fillRect(grid, 12, 4, 16, 1, sc2);
        _fillRect(grid, 13, 5, 14, 1, sc1);
        // Belly scales
        _fillRect(grid, 10, 8, 8, 1, belly);
        _fillRect(grid, 11, 8, 8, 1, bellyL);
        _fillRect(grid, 12, 9, 6, 1, belly);
        // Tail
        grid[13][18] = sc1; grid[13][19] = sc1;
        grid[14][19] = sc2; grid[14][20] = sc2;
        grid[15][20] = sc1; grid[15][21] = sc1;
        grid[16][21] = sc3; grid[16][22] = sc3;
        grid[17][22] = sc2; grid[17][23] = sc1;
        // Tail spade
        grid[18][23] = sc3; grid[18][24] = sc3;
        grid[17][24] = sc3;
        // Legs (powerful)
        _fillRect(grid, 14, 6, 4, 1, sc1); _fillRect(grid, 14, 14, 4, 1, sc1);
        _fillRect(grid, 15, 6, 4, 1, sc2); _fillRect(grid, 15, 14, 4, 1, sc2);
        _fillRect(grid, 16, 6, 4, 1, sc1); _fillRect(grid, 16, 14, 4, 1, sc1);
        // Claws
        grid[17][5] = '#333'; grid[17][6] = '#333'; grid[17][10] = '#333';
        grid[17][13] = '#333'; grid[17][14] = '#333'; grid[17][18] = '#333';
        _fillRect(grid, 17, 5, 6, 1, '#333');
        _fillRect(grid, 17, 13, 6, 1, '#333');
        return grid;
      },

      ghost: () => {
        const grid = _emptyGrid(18, 22);
        const body = 'rgba(180,200,220,0.65)';
        const bodyL = 'rgba(200,220,240,0.45)';
        const bodyD = 'rgba(160,180,200,0.55)';
        // Head
        _fillRect(grid, 0, 5, 8, 1, body);
        _fillRect(grid, 1, 4, 10, 1, body);
        _fillRect(grid, 2, 3, 12, 1, bodyL);
        _fillRect(grid, 3, 3, 12, 1, body);
        _fillRect(grid, 4, 4, 10, 1, body);
        // Hollow eyes
        grid[2][5] = '#000044'; grid[2][6] = '#000033'; grid[2][7] = '#000044';
        grid[2][10] = '#000044'; grid[2][11] = '#000033'; grid[2][12] = '#000044';
        grid[3][6] = '#000022'; grid[3][11] = '#000022';
        // Mouth (wailing)
        grid[4][7] = '#000033'; grid[4][8] = '#000033'; grid[4][9] = '#000033'; grid[4][10] = '#000033';
        // Body (flowing)
        _fillRect(grid, 5, 3, 12, 1, body);
        _fillRect(grid, 6, 3, 12, 1, bodyL);
        _fillRect(grid, 7, 3, 12, 1, body);
        _fillRect(grid, 8, 3, 12, 1, bodyD);
        _fillRect(grid, 9, 4, 10, 1, body);
        _fillRect(grid, 10, 4, 10, 1, bodyL);
        _fillRect(grid, 11, 4, 10, 1, body);
        _fillRect(grid, 12, 5, 8, 1, bodyD);
        // Wispy tendrils
        grid[13][5] = body; grid[13][7] = bodyL; grid[13][9] = body; grid[13][12] = bodyL;
        grid[14][6] = bodyD; grid[14][8] = body; grid[14][11] = bodyD;
        grid[15][5] = bodyL; grid[15][10] = bodyL; grid[15][12] = body;
        grid[16][7] = bodyD; grid[16][11] = bodyD;
        // Reaching arms
        grid[6][2] = body; grid[7][1] = bodyL; grid[8][0] = bodyD;
        grid[6][15] = body; grid[7][16] = bodyL; grid[8][17] = bodyD;
        return grid;
      },

      forest_wraith: () => {
        const grid = _emptyGrid(22, 24);
        const cloak = '#1a3a1a';
        const cloakD = '#0a2a0a';
        const glow = '#00ff66';
        const glowD = '#00cc44';
        // Hood
        _fillRect(grid, 0, 7, 8, 1, cloak);
        _fillRect(grid, 1, 5, 12, 1, cloak);
        _fillRect(grid, 2, 5, 12, 1, cloakD);
        _fillRect(grid, 3, 5, 12, 1, cloakD);
        _fillRect(grid, 4, 6, 10, 1, cloakD);
        // Glowing eyes
        grid[2][7] = glow; grid[2][8] = glow;
        grid[2][13] = glow; grid[2][14] = glow;
        grid[3][7] = glowD; grid[3][14] = glowD;
        // Body (tattered robes)
        _fillRect(grid, 5, 5, 12, 1, cloak);
        _fillRect(grid, 6, 4, 14, 1, cloak);
        _fillRect(grid, 7, 3, 16, 1, cloak);
        _fillRect(grid, 8, 3, 16, 1, cloakD);
        _fillRect(grid, 9, 3, 16, 1, cloak);
        _fillRect(grid, 10, 4, 14, 1, cloakD);
        _fillRect(grid, 11, 4, 14, 1, cloak);
        _fillRect(grid, 12, 5, 12, 1, cloak);
        _fillRect(grid, 13, 5, 12, 1, cloakD);
        _fillRect(grid, 14, 6, 10, 1, cloakD);
        // Tattered edges
        grid[15][5] = cloak; grid[15][7] = cloakD; grid[15][9] = cloak; grid[15][11] = cloakD; grid[15][14] = cloak; grid[15][16] = cloakD;
        grid[16][6] = cloakD; grid[16][10] = cloak; grid[16][13] = cloakD;
        grid[17][7] = cloak; grid[17][12] = cloak;
        // Branch-like arms
        grid[7][2] = '#3a2a18'; grid[7][1] = '#3a2a18'; grid[8][0] = '#3a2a18';
        grid[6][1] = '#4a3a28'; grid[8][1] = '#2a1a08';
        grid[7][19] = '#3a2a18'; grid[7][20] = '#3a2a18'; grid[8][21] = '#3a2a18';
        grid[6][20] = '#4a3a28'; grid[8][20] = '#2a1a08';
        // Twig fingers
        grid[9][0] = '#2a1a08'; grid[8][21] = '#2a1a08';
        // Magic particles
        grid[5][2] = glow; grid[3][19] = glow; grid[9][20] = glowD;
        grid[1][3] = glowD; grid[11][19] = glow; grid[14][2] = glowD;
        return grid;
      },

      bat: () => {
        const grid = _emptyGrid(20, 12);
        const body = '#2a1a2a';
        const bodyL = '#3a2a3a';
        const wing = '#3a2a3a';
        const wingD = '#1a0a1a';
        // Ears
        grid[0][8] = body; grid[0][9] = body;
        grid[0][11] = body; grid[0][12] = body;
        // Head
        _fillRect(grid, 1, 8, 4, 1, body);
        _fillRect(grid, 2, 8, 4, 1, bodyL);
        grid[1][9] = '#ff0000'; grid[1][11] = '#ff0000'; // eyes
        // Fangs
        grid[2][9] = '#fff'; grid[2][11] = '#fff';
        // Body
        _fillRect(grid, 3, 8, 4, 1, body);
        _fillRect(grid, 4, 8, 4, 1, bodyL);
        _fillRect(grid, 5, 9, 2, 1, body);
        // Wings spread (left)
        _fillRect(grid, 2, 2, 6, 1, wing);
        _fillRect(grid, 3, 1, 7, 1, wing);
        _fillRect(grid, 4, 0, 8, 1, wingD);
        _fillRect(grid, 5, 1, 7, 1, wing);
        _fillRect(grid, 6, 2, 5, 1, wingD);
        // Wings spread (right)
        _fillRect(grid, 2, 12, 6, 1, wing);
        _fillRect(grid, 3, 12, 7, 1, wing);
        _fillRect(grid, 4, 12, 8, 1, wingD);
        _fillRect(grid, 5, 12, 7, 1, wing);
        _fillRect(grid, 6, 13, 5, 1, wingD);
        // Wing bones
        grid[3][2] = body; grid[4][1] = body;
        grid[3][17] = body; grid[4][18] = body;
        // Feet
        grid[6][9] = body; grid[6][10] = body; grid[6][11] = body;
        return grid;
      },

      stone_golem: () => {
        const grid = _emptyGrid(22, 24);
        const stone = '#777788';
        const stoneL = '#8888aa';
        const stoneD = '#555566';
        const crack = '#444455';
        const glow = '#ffaa00';
        // Head
        _fillRect(grid, 0, 7, 8, 1, stone);
        _fillRect(grid, 1, 6, 10, 1, stone);
        _fillRect(grid, 2, 5, 12, 1, stoneL);
        _fillRect(grid, 3, 5, 12, 1, stoneD);
        _fillRect(grid, 4, 6, 10, 1, stoneD);
        // Glowing eyes
        grid[1][8] = glow; grid[1][9] = glow;
        grid[1][12] = glow; grid[1][13] = glow;
        grid[2][8] = '#ffcc44'; grid[2][13] = '#ffcc44';
        // Mouth crack
        grid[3][8] = crack; grid[3][9] = crack; grid[3][10] = crack;
        grid[3][11] = crack; grid[3][12] = crack; grid[3][13] = crack;
        // Massive body
        _fillRect(grid, 5, 3, 16, 1, stone);
        _fillRect(grid, 6, 2, 18, 1, stone);
        _fillRect(grid, 7, 2, 18, 1, stoneL);
        _fillRect(grid, 8, 2, 18, 1, stone);
        _fillRect(grid, 9, 2, 18, 1, stoneD);
        _fillRect(grid, 10, 3, 16, 1, stoneD);
        _fillRect(grid, 11, 3, 16, 1, stone);
        _fillRect(grid, 12, 4, 14, 1, stone);
        _fillRect(grid, 13, 4, 14, 1, stoneD);
        // Crack details
        grid[7][9] = crack; grid[8][9] = crack; grid[9][8] = crack; grid[10][8] = crack;
        grid[6][14] = crack; grid[7][14] = crack; grid[8][15] = crack;
        grid[11][6] = crack; grid[12][7] = crack;
        // Rune glow
        grid[8][10] = glow; grid[8][11] = glow;
        grid[9][10] = '#ffcc44'; grid[9][11] = '#ffcc44';
        // Massive arms
        grid[6][1] = stone; grid[7][0] = stoneL; grid[8][0] = stone;
        grid[9][0] = stoneD; grid[10][0] = stoneD; grid[11][0] = stone;
        grid[6][20] = stone; grid[7][21] = stoneL; grid[8][21] = stone;
        grid[9][21] = stoneD; grid[10][21] = stoneD; grid[11][21] = stone;
        // Fists
        grid[12][0] = stoneL; grid[12][1] = stoneL;
        grid[12][20] = stoneL; grid[12][21] = stoneL;
        grid[13][0] = stone; grid[13][21] = stone;
        // Legs
        _fillRect(grid, 14, 5, 5, 1, stoneD); _fillRect(grid, 14, 12, 5, 1, stoneD);
        _fillRect(grid, 15, 5, 5, 1, stone); _fillRect(grid, 15, 12, 5, 1, stone);
        _fillRect(grid, 16, 5, 5, 1, stoneD); _fillRect(grid, 16, 12, 5, 1, stoneD);
        _fillRect(grid, 17, 5, 5, 1, stone); _fillRect(grid, 17, 12, 5, 1, stone);
        // Feet
        _fillRect(grid, 18, 4, 7, 1, stoneD); _fillRect(grid, 18, 11, 7, 1, stoneD);
        return grid;
      }
    };

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

  // NPC sprites — higher resolution
  npc(name, scale = 3) {
    const npcs = {
      elder: () => {
        const grid = _emptyGrid(18, 26);
        const skin = '#d4a373';
        const skinD = _darken(skin);
        const robe = '#5a3a8a';
        const robeD = '#4a2a7a';
        const hair = '#cccccc';
        const hairD = '#aaaaaa';
        // Hair
        _fillRect(grid, 0, 7, 4, 1, hair);
        _fillRect(grid, 1, 5, 8, 1, hair);
        _fillRect(grid, 2, 5, 8, 1, hair);
        _fillRect(grid, 3, 5, 8, 1, hairD);
        // Face
        _fillRect(grid, 4, 5, 8, 1, skin);
        _fillRect(grid, 5, 5, 8, 1, skin);
        _fillRect(grid, 6, 6, 6, 1, skin);
        grid[4][6] = '#1a1a2e'; grid[4][7] = '#eee'; grid[4][10] = '#eee'; grid[4][11] = '#1a1a2e';
        // Beard
        _fillRect(grid, 6, 5, 8, 1, hair);
        _fillRect(grid, 7, 6, 6, 1, hair);
        _fillRect(grid, 8, 7, 4, 1, hairD);
        grid[9][8] = hairD; grid[9][9] = hairD;
        // Robe
        _fillRect(grid, 8, 5, 8, 1, robe);
        _fillRect(grid, 9, 4, 10, 1, robe);
        _fillRect(grid, 10, 4, 10, 1, robe);
        _fillRect(grid, 11, 3, 12, 1, robe);
        _fillRect(grid, 12, 3, 12, 1, robeD);
        _fillRect(grid, 13, 4, 10, 1, robeD);
        _fillRect(grid, 14, 4, 10, 1, robe);
        _fillRect(grid, 15, 5, 8, 1, robe);
        _fillRect(grid, 16, 5, 8, 1, robeD);
        _fillRect(grid, 17, 5, 8, 1, robeD);
        // Robe trim
        grid[11][4] = '#c8a030'; grid[11][14] = '#c8a030';
        grid[12][4] = '#c8a030'; grid[12][14] = '#c8a030';
        // Staff
        grid[3][15] = '#aa66ff'; grid[3][16] = '#cc88ff'; // orb
        grid[4][15] = '#7a5230';
        grid[5][15] = '#7a5230'; grid[6][15] = '#7a5230';
        grid[7][15] = '#7a5230'; grid[8][15] = '#7a5230';
        grid[9][15] = '#7a5230'; grid[10][15] = '#6a4220';
        // Feet
        grid[18][6] = '#3a2518'; grid[18][7] = '#3a2518';
        grid[18][10] = '#3a2518'; grid[18][11] = '#3a2518';
        return grid;
      },

      merchant: () => {
        const grid = _emptyGrid(18, 26);
        const skin = '#b07d56';
        const skinD = _darken(skin);
        const clothes = '#8b6914';
        const clothesD = '#7a5a10';
        const hat = '#5a4a2a';
        // Hat
        _fillRect(grid, 0, 6, 6, 1, hat);
        _fillRect(grid, 1, 4, 10, 1, hat);
        _fillRect(grid, 2, 3, 12, 1, _darken(hat));
        // Face
        _fillRect(grid, 3, 5, 8, 1, skin);
        _fillRect(grid, 4, 5, 8, 1, skin);
        _fillRect(grid, 5, 6, 6, 1, skin);
        grid[4][6] = '#1a1a2e'; grid[4][7] = '#eee'; grid[4][10] = '#eee'; grid[4][11] = '#1a1a2e';
        grid[5][8] = '#cc6655'; grid[5][9] = '#cc6655'; // smile
        // Mustache
        grid[5][6] = '#4a3018'; grid[5][7] = '#4a3018'; grid[5][10] = '#4a3018'; grid[5][11] = '#4a3018';
        // Body
        _fillRect(grid, 7, 4, 10, 1, clothes);
        _fillRect(grid, 8, 4, 10, 1, clothes);
        _fillRect(grid, 9, 3, 12, 1, clothes);
        _fillRect(grid, 10, 3, 12, 1, clothesD);
        _fillRect(grid, 11, 4, 10, 1, clothesD);
        _fillRect(grid, 12, 4, 10, 1, clothes);
        // Buttons
        grid[8][9] = '#ffd700'; grid[9][9] = '#ffd700'; grid[10][9] = '#ffd700';
        // Arms
        grid[8][3] = skin; grid[9][2] = skin; grid[10][2] = skin;
        grid[8][14] = skin; grid[9][15] = skin; grid[10][15] = skin;
        // Bag
        grid[9][16] = '#8b7355'; grid[10][16] = '#8b7355'; grid[10][17] = '#8b7355';
        grid[11][16] = '#7b6345'; grid[11][17] = '#7b6345';
        grid[9][17] = '#9b8365';
        // Belt
        _fillRect(grid, 12, 5, 8, 1, '#4a3018');
        grid[12][8] = '#c8a030'; grid[12][9] = '#c8a030';
        // Legs
        grid[13][6] = '#554433'; grid[13][7] = '#554433'; grid[13][10] = '#554433'; grid[13][11] = '#554433';
        grid[14][6] = '#554433'; grid[14][7] = '#554433'; grid[14][10] = '#554433'; grid[14][11] = '#554433';
        grid[15][6] = '#443322'; grid[15][7] = '#443322'; grid[15][10] = '#443322'; grid[15][11] = '#443322';
        // Boots
        grid[16][5] = '#3a2518'; grid[16][6] = '#3a2518'; grid[16][7] = '#3a2518';
        grid[16][10] = '#3a2518'; grid[16][11] = '#3a2518'; grid[16][12] = '#3a2518';
        return grid;
      },

      fairy: () => {
        const grid = _emptyGrid(16, 16);
        const skin = '#ffe4d0';
        const wings = '#88ccff';
        const wingsL = '#aaddff';
        const dress = '#ff88cc';
        const dressD = '#dd66aa';
        // Wings (translucent)
        _fillRect(grid, 2, 1, 3, 1, wingsL);
        _fillRect(grid, 3, 0, 4, 1, wings);
        _fillRect(grid, 4, 0, 4, 1, wingsL);
        _fillRect(grid, 5, 1, 3, 1, wings);
        _fillRect(grid, 6, 2, 2, 1, wingsL);
        _fillRect(grid, 2, 12, 3, 1, wingsL);
        _fillRect(grid, 3, 12, 4, 1, wings);
        _fillRect(grid, 4, 12, 4, 1, wingsL);
        _fillRect(grid, 5, 12, 3, 1, wings);
        _fillRect(grid, 6, 13, 2, 1, wingsL);
        // Head
        _fillRect(grid, 1, 5, 6, 1, skin);
        _fillRect(grid, 2, 5, 6, 1, skin);
        _fillRect(grid, 3, 5, 6, 1, skin);
        // Hair
        _fillRect(grid, 0, 5, 6, 1, '#ffd700');
        grid[1][5] = '#ffd700'; grid[1][10] = '#ffd700';
        // Eyes
        grid[2][6] = '#3366ff'; grid[2][7] = '#3366ff';
        grid[2][9] = '#3366ff';
        // Smile
        grid[3][7] = '#ff8888'; grid[3][8] = '#ff8888';
        // Body (dress)
        _fillRect(grid, 4, 6, 4, 1, dress);
        _fillRect(grid, 5, 5, 6, 1, dress);
        _fillRect(grid, 6, 5, 6, 1, dressD);
        _fillRect(grid, 7, 5, 6, 1, dress);
        _fillRect(grid, 8, 6, 4, 1, dressD);
        // Arms
        grid[5][4] = skin; grid[5][11] = skin;
        // Legs
        grid[9][6] = skin; grid[9][7] = skin; grid[9][9] = skin; grid[9][10] = skin;
        // Sparkles
        grid[0][3] = '#ffff00'; grid[0][12] = '#ffff00';
        grid[7][3] = '#ffff00'; grid[7][13] = '#ffff00';
        grid[1][1] = '#ffff88'; grid[10][14] = '#ffff88';
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

function _fillRect(grid, row, col, w, h, color) {
  for (let r = row; r < row + h && r < grid.length; r++) {
    for (let c = col; c < col + w && c < grid[r].length; c++) {
      grid[r][c] = color;
    }
  }
}

function _darken(hex) {
  if (!hex || !hex.startsWith('#')) return '#000000';
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function _lighten(hex) {
  if (!hex || !hex.startsWith('#')) return '#ffffff';
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 40);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 40);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
