// ======================================================
// data.js — Static data for Realms of Mathematica II
// Classes, heritages, feats, items, abilities, topics
// ======================================================

// ------------------------------------------------------
// STATS
// ------------------------------------------------------
const STAT_DEFS = [
  { id: 'precision', name: 'Precision', blurb: 'Damage when your answer is right', icon: '⚔', base: 8, max: 16 },
  { id: 'insight',   name: 'Insight',   blurb: 'Free hints per battle',           icon: '✦', base: 1, max: 5  },
  { id: 'speed',     name: 'Speed',     blurb: 'Extra seconds on the timer',      icon: '⌁', base: 8, max: 16 },
  { id: 'stamina',   name: 'Stamina',   blurb: 'Max HP (Stamina × 5 + 40)',       icon: '❤', base: 8, max: 16 },
  { id: 'wisdom',    name: 'Wisdom',    blurb: 'Max spell slots (Wisdom ÷ 3)',    icon: '✧', base: 8, max: 16 },
  { id: 'luck',      name: 'Luck',      blurb: 'Critical-hit chance (Luck × 2%)', icon: '☘', base: 8, max: 16 }
];

const STAT_DEFAULT = { precision: 8, insight: 1, speed: 8, stamina: 8, wisdom: 8, luck: 8 };
const STAT_POINTS_AT_CREATION = 5;
const STAT_POINTS_PER_LEVEL = 2;

function maxHpFor(stats)    { return 40 + (stats.stamina || 0) * 5; }
function maxMpFor(stats)    { return Math.floor((stats.wisdom || 0) / 3); }
function critPctFor(stats)  { return Math.min(50, (stats.luck || 0) * 2); }
function baseDmgFor(stats)  { return 4 + Math.floor((stats.precision || 0) * 1.2); }
function timerSecFor(stats) { return 12 + Math.floor((stats.speed || 0) * 0.6); }
function hintsFor(stats)    { return stats.insight || 0; }

// ------------------------------------------------------
// CLASSES — each grants starting equipment + a signature ability
// ------------------------------------------------------
const CLASSES = {
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    flavor: 'Steel and shield. Built to absorb punishment.',
    statBonus: { stamina: 2, precision: 1 },
    startWeapon: 'iron_longsword',
    startArmor: 'leather_hauberk',
    abilities: ['cleave'],
    iconColor: '#8a3e22',
    portraitTraits: { hairColor: '#3a2820', skinTone: '#d9b48b', weaponColor: '#b8c0c8' }
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    flavor: 'Mind sharper than any blade. Speaks the language of numbers.',
    statBonus: { wisdom: 2, insight: 1 },
    startWeapon: 'oak_staff',
    startArmor: 'scholars_robe',
    abilities: ['arcane_burst', 'sight'],
    iconColor: '#3a3e8a',
    portraitTraits: { hairColor: '#5a3a78', skinTone: '#e8d5b5', weaponColor: '#7a5a28' }
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
    flavor: 'Lightning hands, light feet. Strikes where it counts.',
    statBonus: { speed: 2, luck: 1 },
    startWeapon: 'pair_of_daggers',
    startArmor: 'shadowed_jerkin',
    abilities: ['quick_step'],
    iconColor: '#2a3a2a',
    portraitTraits: { hairColor: '#2a1a10', skinTone: '#c8a878', weaponColor: '#888888' }
  },
  ranger: {
    id: 'ranger',
    name: 'Ranger',
    flavor: 'Calm, watchful, deadly at distance. Reads the land like a map.',
    statBonus: { precision: 1, speed: 1, luck: 1 },
    startWeapon: 'yew_shortbow',
    startArmor: 'ranger_cloak',
    abilities: ['true_shot'],
    iconColor: '#3a5a2a',
    portraitTraits: { hairColor: '#4a3010', skinTone: '#d0a878', weaponColor: '#6a4818' }
  }
};

// ------------------------------------------------------
// HERITAGES
// ------------------------------------------------------
const HERITAGES = {
  human: {
    id: 'human',
    name: 'Human',
    flavor: 'Adaptable, ambitious, plentiful in Numeria and beyond.',
    statBonus: { precision: 1 },
    feat: 'Versatile (+1 stat point at creation)',
    extraPoints: 1,
    skinTone: '#d9b48b'
  },
  elf: {
    id: 'elf',
    name: 'Elf',
    flavor: 'Long-lived, keen-eyed, raised on poetry and patient calculation.',
    statBonus: { insight: 1 },
    feat: 'Trained Eye (+1 second to every timer)',
    extraTimer: 1,
    skinTone: '#e8d5b5'
  },
  dwarf: {
    id: 'dwarf',
    name: 'Dwarf',
    flavor: 'Mountain-born, stubborn, masters of stone and weight.',
    statBonus: { stamina: 1 },
    feat: 'Stout (resist the first critical hit per battle)',
    resistFirstCrit: true,
    skinTone: '#c8a878'
  },
  halfling: {
    id: 'halfling',
    name: 'Halfling',
    flavor: 'Small in stature, large in luck. Likes second breakfast.',
    statBonus: { luck: 1 },
    feat: 'Lucky Penny (+10% gold from every source)',
    goldBonus: 0.10,
    skinTone: '#e0c4a0'
  }
};

// ------------------------------------------------------
// FEATS (chosen at creation, in addition to heritage feat)
// ------------------------------------------------------
const FEATS = {
  lucky: {
    id: 'lucky',
    name: 'Lucky',
    desc: '+5% critical-hit chance.',
    effect: { critPct: 5 }
  },
  tough: {
    id: 'tough',
    name: 'Tough',
    desc: '+10 maximum HP.',
    effect: { bonusHp: 10 }
  },
  sharp_minded: {
    id: 'sharp_minded',
    name: 'Sharp-Minded',
    desc: '+1 Insight (extra hint per battle).',
    effect: { bonusInsight: 1 }
  },
  swift: {
    id: 'swift',
    name: 'Swift',
    desc: '+2 seconds to every problem timer.',
    effect: { bonusTimer: 2 }
  }
};

// ------------------------------------------------------
// ABILITIES (class spells / signature moves)
// MP cost in spell slots; effect resolved by engine
// ------------------------------------------------------
const ABILITIES = {
  cleave: {
    id: 'cleave',
    name: 'Cleave',
    type: 'attack',
    cost: 0,
    cooldown: 3,
    desc: 'Strike twice in one turn. Damage is half on each hit but two chances to crit.',
    effect: { doubleStrike: true, halfDamage: true }
  },
  arcane_burst: {
    id: 'arcane_burst',
    name: 'Arcane Burst',
    type: 'spell',
    cost: 1,
    desc: 'A flare of pure number-energy. Hits even on a wrong answer (half damage).',
    effect: { magicDamage: 14, partialOnFail: true }
  },
  sight: {
    id: 'sight',
    name: 'Sight',
    type: 'spell',
    cost: 1,
    desc: 'See the next answer before you act. Reveals the answer for one problem.',
    effect: { reveal: true }
  },
  quick_step: {
    id: 'quick_step',
    name: 'Quick Step',
    type: 'attack',
    cost: 0,
    cooldown: 4,
    desc: 'Vanish and reposition. Guaranteed dodge of the next enemy attack.',
    effect: { dodgeNext: true }
  },
  true_shot: {
    id: 'true_shot',
    name: 'True Shot',
    type: 'attack',
    cost: 0,
    cooldown: 3,
    desc: 'A patient, perfect arrow. Guaranteed critical on a correct answer.',
    effect: { guaranteedCrit: true }
  }
};

// ------------------------------------------------------
// EQUIPMENT — weapons / armor / accessories
// slot: weapon | armor | accessory
// effect: stat bonuses & modifiers
// ------------------------------------------------------
const ITEMS = {
  // ---------- starter weapons ----------
  iron_longsword:   { id: 'iron_longsword',   name: 'Iron Longsword',   slot: 'weapon', desc: 'Honest steel, well balanced.',         effect: { precision: 2 } },
  oak_staff:        { id: 'oak_staff',        name: 'Oak Staff',        slot: 'weapon', desc: 'Carved with simple sigils.',            effect: { wisdom: 1, insight: 1 } },
  pair_of_daggers:  { id: 'pair_of_daggers',  name: 'Pair of Daggers',  slot: 'weapon', desc: 'Quick to draw, quicker still to strike.',effect: { speed: 2, luck: 1 } },
  yew_shortbow:     { id: 'yew_shortbow',     name: 'Yew Shortbow',     slot: 'weapon', desc: 'Springy yew, waxed string.',             effect: { precision: 1, luck: 1 } },

  // ---------- starter armor ----------
  leather_hauberk:  { id: 'leather_hauberk',  name: 'Leather Hauberk',  slot: 'armor', desc: 'Boiled leather, riveted.',           effect: { stamina: 2 } },
  scholars_robe:    { id: 'scholars_robe',    name: 'Scholar\'s Robe',  slot: 'armor', desc: 'Deep blue, hemmed with silver runes.', effect: { wisdom: 1, insight: 1 } },
  shadowed_jerkin:  { id: 'shadowed_jerkin',  name: 'Shadowed Jerkin',  slot: 'armor', desc: 'Soundless leather, dyed forest-black.', effect: { speed: 1, luck: 1 } },
  ranger_cloak:     { id: 'ranger_cloak',     name: 'Ranger\'s Cloak',  slot: 'armor', desc: 'Camouflaged in greens and greys.',     effect: { stamina: 1, speed: 1 } },

  // ---------- act I shop ----------
  measuring_chain:  { id: 'measuring_chain',  name: 'Measuring Chain',  slot: 'accessory', desc: 'A brass chain marked in inches — measure twice, strike once.', effect: { precision: 1, insight: 1 } },
  cubits_amulet:    { id: 'cubits_amulet',    name: 'Cubit\'s Amulet',  slot: 'accessory', desc: 'Glyphs of length and breadth. Grants insight in confined spaces.', effect: { wisdom: 1, stamina: 1 } },
  quarrymans_belt:  { id: 'quarrymans_belt',  name: 'Quarryman\'s Belt',slot: 'accessory', desc: 'Stout leather, loops for chisels. +10 HP.', effect: { bonusHp: 10 } },
  hourglass_charm:  { id: 'hourglass_charm',  name: 'Hourglass Charm',  slot: 'accessory', desc: 'A sliver of red sand drifts upward in defiance. +3s timer.', effect: { bonusTimer: 3 } },

  // ---------- act I loot drops ----------
  hollowed_blade:   { id: 'hollowed_blade',   name: 'Hollowed Blade',   slot: 'weapon', desc: 'Carved with cubic glyphs. Devours volume-warped foes.', effect: { precision: 3, bonusVsTopic: { volume_rect_prism: 4 } } },
  apprentices_grimoire: { id: 'apprentices_grimoire', name: 'Apprentice\'s Grimoire', slot: 'accessory', desc: 'Lysara\'s old field-book. +1 spell slot.', effect: { wisdom: 3 } },
  ironwood_circlet: { id: 'ironwood_circlet', name: 'Ironwood Circlet', slot: 'accessory', desc: 'Cool against the brow. +1 Insight.', effect: { insight: 1 } },
  golems_core:      { id: 'golems_core',      name: 'Golem\'s Core',    slot: 'accessory', desc: 'A pulsing cube of crystal pulled from a fallen golem. +5 HP, +1 Precision.', effect: { stamina: 1, precision: 1 } },

  // ---------- act II shop (port + net-mender) ----------
  brass_sextant:    { id: 'brass_sextant',    name: 'Brass Sextant',    slot: 'accessory', desc: 'Mira\'s spare. Lets you measure the angles between answers.', effect: { precision: 2, insight: 1 } },
  pearled_circlet:  { id: 'pearled_circlet',  name: 'Pearled Circlet',  slot: 'accessory', desc: 'Three small pearls set in driftwood. Calms the racing heart.', effect: { wisdom: 2, stamina: 1 } },
  kelp_charm:       { id: 'kelp_charm',       name: 'Knot of Kelp',     slot: 'accessory', desc: 'Knotted in fractions: 1/2, 1/4, 1/8. Each knot is a small luck.', effect: { luck: 2, speed: 1 } },
  saltskin_jerkin:  { id: 'saltskin_jerkin',  name: 'Saltskin Jerkin',  slot: 'armor', desc: 'Cured in brine. Resists strike and stain alike.', effect: { stamina: 3, speed: 1 } },
  netcaster_cloak:  { id: 'netcaster_cloak',  name: 'Netcaster\'s Cloak', slot: 'armor', desc: 'Threaded with fisher-knots. +5 HP, +1 Insight.', effect: { stamina: 1, insight: 1, bonusHp: 5 } },

  // ---------- act II loot drops ----------
  tide_blade:       { id: 'tide_blade',       name: 'Tide-Blade',       slot: 'weapon', desc: 'Curved, blue-edged, whispers like surf. Bites fraction-warped foes.', effect: { precision: 3, bonusVsTopic: { fraction_times_fraction: 4, fraction_times_whole: 3 } } },
  coral_staff:      { id: 'coral_staff',      name: 'Coral Staff',      slot: 'weapon', desc: 'Pale pink coral, still cool from the sea.', effect: { wisdom: 2, insight: 1, bonusVsTopic: { divide_whole_by_unit_fraction: 4 } } },
  half_kings_horn:  { id: 'half_kings_horn',  name: 'The Half-King\'s Horn', slot: 'accessory', desc: 'A spiral of bone. Calls a wave when blown. +2 to every stat (lightly).', effect: { precision: 2, stamina: 2, wisdom: 1, luck: 1, bonusHp: 10 } },
  sextant_of_wholeness: { id: 'sextant_of_wholeness', name: 'Sextant of Wholeness', slot: 'accessory', desc: 'Reforged from three island-pieces. The needle always finds the whole.', effect: { precision: 2, insight: 2, bonusTimer: 2 } },
  navigators_locket: { id: 'navigators_locket', name: 'Navigator\'s Locket', slot: 'accessory', desc: 'A small portrait of someone far away. A reminder.', effect: { wisdom: 1, stamina: 2, luck: 1 } },

  // ---------- consumables ----------
  minor_potion:     { id: 'minor_potion',     name: 'Minor Healing Draught', slot: 'consumable', desc: 'Restores 15 HP.',              effect: { heal: 15 } },
  greater_potion:   { id: 'greater_potion',   name: 'Greater Healing Draught', slot: 'consumable', desc: 'Restores 35 HP.',            effect: { heal: 35 } },
  mana_phial:       { id: 'mana_phial',       name: 'Mana Phial',           slot: 'consumable', desc: 'Restores 2 spell slots.',       effect: { restoreMp: 2 } },
  scroll_of_sight:  { id: 'scroll_of_sight',  name: 'Scroll of Sight',      slot: 'consumable', desc: 'One-time use: reveals the answer to the next problem.', effect: { reveal: true } },
  scroll_of_clemency: { id: 'scroll_of_clemency', name: 'Scroll of Clemency', slot: 'consumable', desc: 'Skip the current problem, no damage to either side.', effect: { skip: true } },
  smoked_kipper:    { id: 'smoked_kipper',    name: 'Smoked Kipper', slot: 'consumable', desc: 'A salty snack from the docks. Restores 20 HP.', effect: { heal: 20 } },
  brine_phial:      { id: 'brine_phial',      name: 'Brine Phial', slot: 'consumable', desc: 'Stinging blue brew. Restores 3 spell slots.', effect: { restoreMp: 3 } }
};

// ------------------------------------------------------
// PROBLEM TOPICS — IDs aligned with the IM curriculum
// Used for both adaptive tracking and problem generators
// ------------------------------------------------------
const TOPICS = {
  // ---------- Unit 1: Volume ----------
  volume_rect_prism:    { unit: 1, name: 'Volume of rectangular prisms' },
  volume_unit_cubes:    { unit: 1, name: 'Volume with unit cubes' },
  volume_decomposed:    { unit: 1, name: 'Volume by decomposition' },
  volume_word:          { unit: 1, name: 'Volume word problems' },
  volume_expression:    { unit: 1, name: 'Volume expressions' },
  volume_side_length:   { unit: 1, name: 'Missing side length' },

  // ---------- Units 2 & 3: Fractions ----------
  fractions_multiply:           { unit: 2, name: 'Multiplying fractions' },
  fractions_divide:             { unit: 3, name: 'Dividing fractions' },
  fractions_as_division:        { unit: 2, name: 'Fractions as division' },
  fraction_times_whole:         { unit: 2, name: 'Fraction × whole' },
  fraction_times_fraction:      { unit: 3, name: 'Fraction × fraction' },
  mixed_number_multiply:        { unit: 2, name: 'Mixed number × whole' },
  area_fractional_sides:        { unit: 2, name: 'Area with fractional sides' },
  divide_unit_fraction_by_whole:{ unit: 3, name: 'Unit fraction ÷ whole' },
  divide_whole_by_unit_fraction:{ unit: 3, name: 'Whole ÷ unit fraction' },
  compare_products_scaling:     { unit: 3, name: 'Compare products (scaling)' },

  // ---------- Unit 4: Multi-digit ----------
  multidigit_multiply:  { unit: 4, name: 'Multi-digit multiplication' },
  multidigit_divide:    { unit: 4, name: 'Multi-digit division' },

  // ---------- Unit 5: Decimals ----------
  decimals_add:         { unit: 5, name: 'Adding decimals' },
  decimals_subtract:    { unit: 5, name: 'Subtracting decimals' },
  decimals_multiply:    { unit: 5, name: 'Multiplying decimals' },
  decimals_divide:      { unit: 5, name: 'Dividing decimals' },

  // ---------- Unit 6 & 7 ----------
  powers_of_10:         { unit: 6, name: 'Powers of 10' },
  coords_q1:            { unit: 7, name: 'Coordinates (Q1)' }
};

// ------------------------------------------------------
// SHOPS — keyed lists of item IDs for each act-I vendor
// ------------------------------------------------------
const SHOPS = {
  brenna_tavern: {
    keeperId: 'brenna',
    keeperName: 'Brenna',
    keeperLine: '"Sit down, adventurer. The world\'s nasty out there, but my stew is hot and my prices are fair."',
    stock: [
      { itemId: 'minor_potion',    price: 12 },
      { itemId: 'greater_potion',  price: 30 },
      { itemId: 'scroll_of_sight', price: 22 },
      { itemId: 'scroll_of_clemency', price: 18 }
    ]
  },
  smith_dorrick: {
    keeperId: 'dorrick',
    keeperName: 'Dorrick the Blacksmith',
    keeperLine: '"You came to the right anvil. Steel that sings, leather that holds, charms that mean something."',
    stock: [
      { itemId: 'measuring_chain', price: 45 },
      { itemId: 'cubits_amulet',   price: 55 },
      { itemId: 'quarrymans_belt', price: 60 },
      { itemId: 'hourglass_charm', price: 70 }
    ]
  },
  goren_salt_worn: {
    keeperId: 'goren',
    keeperName: 'Goren Saltbeard',
    keeperLine: '"A sailor without supplies is a sailor lost. Take what you need, pay what\'s fair."',
    stock: [
      { itemId: 'smoked_kipper',   price: 14 },
      { itemId: 'greater_potion',  price: 32 },
      { itemId: 'brine_phial',     price: 38 },
      { itemId: 'scroll_of_sight', price: 22 }
    ]
  },
  netmender_shed: {
    keeperId: 'gull',
    keeperName: 'Aunt Gull',
    keeperLine: '"Mira\'s little one is back, I see. Bring me anything that needs mending — or buy. I keep what the sea returns."',
    stock: [
      { itemId: 'kelp_charm',      price: 50 },
      { itemId: 'pearled_circlet', price: 65 },
      { itemId: 'saltskin_jerkin', price: 80 },
      { itemId: 'netcaster_cloak', price: 95 },
      { itemId: 'brass_sextant',   price: 110 }
    ]
  }
};

// ------------------------------------------------------
// ENEMIES — used in encounters
// ------------------------------------------------------
const ENEMIES = {
  rubble_imp: {
    id: 'rubble_imp', name: 'Rubble Imp',
    hp: 28, attack: 7, spriteId: 'rubble_imp',
    topic: 'volume_unit_cubes', difficulty: 'easy',
    goldDrop: [4, 8], xpDrop: 20
  },
  stone_grub: {
    id: 'stone_grub', name: 'Stone Grub',
    hp: 36, attack: 8, spriteId: 'stone_grub',
    topic: 'volume_rect_prism', difficulty: 'easy',
    goldDrop: [6, 10], xpDrop: 25
  },
  quarry_brute: {
    id: 'quarry_brute', name: 'Quarry Brute',
    hp: 48, attack: 10, spriteId: 'quarry_brute',
    topic: 'volume_expression', difficulty: 'medium',
    goldDrop: [10, 16], xpDrop: 40
  },
  // Mini-boss
  quarry_foreman: {
    id: 'quarry_foreman', name: 'The Quarry Foreman',
    hp: 90, attack: 12, spriteId: 'quarry_foreman',
    isBoss: true,
    phases: [
      { topic: 'volume_rect_prism',  difficulty: 'medium', say: '"Try my count, little ant."' },
      { topic: 'volume_decomposed',  difficulty: 'medium', say: '"Break it apart if you can."' },
      { topic: 'volume_word',        difficulty: 'medium', say: '"Numbers won\'t save you."' }
    ],
    goldDrop: [40, 55], xpDrop: 120,
    guaranteedLoot: ['hollowed_blade']
  },
  // ---------- Act II — Fractured Isles ----------
  brine_sprite: {
    id: 'brine_sprite', name: 'Brine Sprite',
    hp: 32, attack: 8, spriteId: 'brine_sprite',
    topic: 'fraction_times_whole', difficulty: 'easy',
    goldDrop: [5, 10], xpDrop: 28
  },
  splitwhelk: {
    id: 'splitwhelk', name: 'Splitwhelk',
    hp: 44, attack: 9, spriteId: 'splitwhelk',
    topic: 'fractions_as_division', difficulty: 'easy',
    goldDrop: [7, 12], xpDrop: 34
  },
  tide_imp: {
    id: 'tide_imp', name: 'Tide-Imp',
    hp: 50, attack: 10, spriteId: 'tide_imp',
    topic: 'fraction_times_fraction', difficulty: 'medium',
    goldDrop: [9, 14], xpDrop: 42
  },
  coral_golem: {
    id: 'coral_golem', name: 'Coral Golem',
    hp: 64, attack: 11, spriteId: 'coral_golem',
    topic: 'area_fractional_sides', difficulty: 'medium',
    goldDrop: [12, 18], xpDrop: 52
  },
  // Mini-bosses on each island
  halves_warden: {
    id: 'halves_warden', name: 'Warden of Halves',
    hp: 110, attack: 13, spriteId: 'halves_warden',
    isBoss: true,
    phases: [
      { topic: 'fraction_times_whole',  difficulty: 'medium', say: '"Half of you. Half again. Until nothing."' },
      { topic: 'fractions_as_division', difficulty: 'medium', say: '"Show me what one piece looks like."' },
      { topic: 'compare_products_scaling', difficulty: 'medium', say: '"Less than the whole. Always less."' }
    ],
    goldDrop: [40, 55], xpDrop: 110,
    guaranteedLoot: ['tide_blade']
  },
  thirds_seer: {
    id: 'thirds_seer', name: 'Seer of Thirds',
    hp: 120, attack: 13, spriteId: 'thirds_seer',
    isBoss: true,
    phases: [
      { topic: 'divide_unit_fraction_by_whole', difficulty: 'medium', say: '"A third of a third of a third. Do you still know yourself?"' },
      { topic: 'fraction_times_fraction', difficulty: 'medium', say: '"Multiply. Then multiply again. Smaller. Smaller."' },
      { topic: 'mixed_number_multiply',  difficulty: 'medium', say: '"Mix it with the whole. Lose the line."' }
    ],
    goldDrop: [45, 60], xpDrop: 120,
    guaranteedLoot: ['coral_staff']
  },
  pieces_collector: {
    id: 'pieces_collector', name: 'The Pieces-Collector',
    hp: 130, attack: 14, spriteId: 'pieces_collector',
    isBoss: true,
    phases: [
      { topic: 'divide_whole_by_unit_fraction', difficulty: 'medium', say: '"How many pieces of you are there? Tell me. I want them all."' },
      { topic: 'area_fractional_sides', difficulty: 'medium', say: '"A piece this wide. A piece this tall. Multiply."' },
      { topic: 'compare_products_scaling', difficulty: 'hard',   say: '"Larger, smaller, the same. Choose."' }
    ],
    goldDrop: [50, 65], xpDrop: 130,
    guaranteedLoot: ['navigators_locket']
  },
  // Final Act II boss
  half_king: {
    id: 'half_king', name: 'The Half-King',
    hp: 200, attack: 16, spriteId: 'half_king',
    isBoss: true,
    phases: [
      { topic: 'fraction_times_whole',  difficulty: 'easy',   say: '"You walked here on water. Now walk in halves."' },
      { topic: 'fraction_times_fraction', difficulty: 'medium', say: '"A piece of a piece. That is all anything ever was."' },
      { topic: 'divide_whole_by_unit_fraction', difficulty: 'medium', say: '"How many of me. Tell me — how many of ME!"' },
      { topic: 'mixed_number_multiply', difficulty: 'hard',   say: '"You count badly when you are afraid."' },
      { topic: 'area_fractional_sides', difficulty: 'hard',   say: '"One last piece. Mine, or yours. Choose."' }
    ],
    goldDrop: [100, 150], xpDrop: 360,
    guaranteedLoot: ['half_kings_horn', 'sextant_of_wholeness']
  },
  // Act I final boss
  hollowed_one: {
    id: 'hollowed_one', name: 'The Hollowed One',
    hp: 160, attack: 14, spriteId: 'hollowed_one',
    isBoss: true,
    phases: [
      { topic: 'volume_unit_cubes', difficulty: 'easy',   say: '"You see only the surface, child."' },
      { topic: 'volume_rect_prism', difficulty: 'medium', say: '"Then count my edges."' },
      { topic: 'volume_decomposed', difficulty: 'medium', say: '"Tear me apart, then. Try."' },
      { topic: 'volume_expression', difficulty: 'hard',   say: '"Now write me an expression worthy of an end."' },
      { topic: 'volume_word',       difficulty: 'hard',   say: '"One last reckoning. Make it count."' }
    ],
    goldDrop: [80, 120], xpDrop: 300,
    guaranteedLoot: ['apprentices_grimoire', 'golems_core']
  }
};

// ------------------------------------------------------
// XP / LEVELS
// ------------------------------------------------------
const XP_PER_LEVEL = [0, 100, 240, 420, 650, 930, 1260, 1640]; // index = level
function levelFromXp(xp) {
  for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
    if (xp >= XP_PER_LEVEL[i]) return i + 1;
  }
  return 1;
}

// ------------------------------------------------------
// EXPORTS (for non-module access)
// ------------------------------------------------------
if (typeof window !== 'undefined') {
  window.STAT_DEFS = STAT_DEFS;
  window.STAT_DEFAULT = STAT_DEFAULT;
  window.STAT_POINTS_AT_CREATION = STAT_POINTS_AT_CREATION;
  window.STAT_POINTS_PER_LEVEL = STAT_POINTS_PER_LEVEL;
  window.maxHpFor = maxHpFor; window.maxMpFor = maxMpFor;
  window.critPctFor = critPctFor; window.baseDmgFor = baseDmgFor;
  window.timerSecFor = timerSecFor; window.hintsFor = hintsFor;
  window.CLASSES = CLASSES; window.HERITAGES = HERITAGES;
  window.FEATS = FEATS; window.ABILITIES = ABILITIES;
  window.ITEMS = ITEMS; window.TOPICS = TOPICS;
  window.SHOPS = SHOPS; window.ENEMIES = ENEMIES;
  window.XP_PER_LEVEL = XP_PER_LEVEL; window.levelFromXp = levelFromXp;
}
