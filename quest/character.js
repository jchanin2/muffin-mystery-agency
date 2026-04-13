// character.js — Character creation, stats, leveling, equipment

let activeSlot = 1; // 1, 2, or 3

const RACES = {
  human:      { name: 'Human',      bonus: { strength: 1, dexterity: 1, intelligence: 1, wisdom: 1, charisma: 1, constitution: 1 }, desc: 'Versatile and adaptable. +1 to all stats.' },
  elf:        { name: 'Elf',        bonus: { intelligence: 2, wisdom: 1 }, desc: 'Wise and perceptive. +2 INT, +1 WIS.' },
  dwarf:      { name: 'Dwarf',      bonus: { constitution: 2, strength: 1 }, desc: 'Tough and sturdy. +2 CON, +1 STR.' },
  halfling:   { name: 'Halfling',   bonus: { dexterity: 2, charisma: 1 }, desc: 'Quick and charming. +2 DEX, +1 CHA.' },
  dragonborn: { name: 'Dragonborn', bonus: { strength: 2, constitution: 1 }, desc: 'Powerful and fearless. +2 STR, +1 CON.' },
  tabaxi:     { name: 'Tabaxi',     bonus: { dexterity: 2, wisdom: 1 }, desc: 'Swift and curious cat-folk. +2 DEX, +1 WIS.' }
};

const CLASSES = {
  warrior: {
    name: 'Warrior',
    primaryStat: 'strength',
    desc: 'A mighty fighter who excels in melee combat. Uses STR to deal bonus damage.',
    startEquip: { weapon: { name: 'Iron Sword', bonus: 3, type: 'melee' }, armor: { name: 'Chain Mail', bonus: 2 } },
    ability: 'Power Strike: Get 2+ correct in a row for double damage'
  },
  wizard: {
    name: 'Wizard',
    primaryStat: 'intelligence',
    desc: 'A master of arcane magic. Uses INT to get hints on tough problems.',
    startEquip: { weapon: { name: 'Oak Staff', bonus: 2, type: 'magic' }, armor: { name: 'Cloth Robe', bonus: 1 } },
    ability: 'Arcane Insight: Hints narrow the answer range on hard problems'
  },
  rogue: {
    name: 'Rogue',
    primaryStat: 'dexterity',
    desc: 'A stealthy trickster. Uses DEX for a chance to dodge damage on wrong answers.',
    startEquip: { weapon: { name: 'Twin Daggers', bonus: 2, type: 'melee' }, armor: { name: 'Leather Armor', bonus: 1 } },
    ability: 'Evasion: DEX% chance to avoid damage when wrong'
  },
  ranger: {
    name: 'Ranger',
    primaryStat: 'wisdom',
    desc: 'A keen-eyed tracker. Uses WIS to reveal which choices might be dangerous.',
    startEquip: { weapon: { name: 'Longbow', bonus: 2, type: 'ranged' }, armor: { name: 'Hide Armor', bonus: 1 } },
    ability: 'Nature Sense: Reveals risky choices before you pick'
  }
};

const SKIN_TONES = ['#f5d0a9', '#deb587', '#c49a6c', '#8d5524', '#613318'];
const HAIR_COLORS = ['#2c1810', '#8b4513', '#daa520', '#c0392b', '#ecf0f1'];
const ARMOR_COLORS = ['#7f8c8d', '#2980b9', '#8e44ad', '#27ae60', '#c0392b'];

const SHOP_ITEMS = [
  { id: 'health_potion', name: 'Health Potion', desc: 'Restores 15 HP', price: 20, type: 'consumable', effect: { hp: 15 } },
  { id: 'great_health_potion', name: 'Great Health Potion', desc: 'Restores 30 HP', price: 45, type: 'consumable', effect: { hp: 30 } },
  { id: 'iron_shield', name: 'Iron Shield', desc: 'Armor +3', price: 60, type: 'armor', bonus: 3 },
  { id: 'steel_sword', name: 'Steel Sword', desc: 'Weapon +5', price: 80, type: 'weapon', bonus: 5, weaponType: 'melee' },
  { id: 'enchanted_staff', name: 'Enchanted Staff', desc: 'Weapon +5 (magic)', price: 80, type: 'weapon', bonus: 5, weaponType: 'magic' },
  { id: 'fine_bow', name: 'Fine Bow', desc: 'Weapon +5 (ranged)', price: 80, type: 'weapon', bonus: 5, weaponType: 'ranged' }
];

const Character = {

  // Create new character
  create(name, race, classType, appearance) {
    const raceData = RACES[race];
    const classData = CLASSES[classType];

    // Roll base stats: 8 + random 0-6 for each
    const baseStats = {
      strength: 8 + Math.floor(Math.random() * 7),
      dexterity: 8 + Math.floor(Math.random() * 7),
      intelligence: 8 + Math.floor(Math.random() * 7),
      wisdom: 8 + Math.floor(Math.random() * 7),
      charisma: 8 + Math.floor(Math.random() * 7),
      constitution: 8 + Math.floor(Math.random() * 7)
    };

    // Apply race bonuses
    for (const [stat, val] of Object.entries(raceData.bonus)) {
      baseStats[stat] += val;
    }

    const conMod = Math.floor((baseStats.constitution - 10) / 2);
    const maxHp = 20 + Math.max(0, conMod * 3);

    const character = {
      name,
      race,
      class: classType,
      appearance: appearance || { skinTone: 0, hairColor: 0, armorColor: 0 },
      level: 1,
      xp: 0,
      xpToNext: 500,
      hp: maxHp,
      maxHp,
      stats: baseStats,
      equipment: {
        weapon: classData.startEquip.weapon,
        armor: classData.startEquip.armor,
        accessory: null
      },
      inventory: [
        { id: 'health_potion', name: 'Health Potion', quantity: 2 }
      ],
      gold: 30
    };

    return character;
  },

  // Get stat modifier (D&D style: (stat - 10) / 2)
  modifier(statValue) {
    return Math.floor((statValue - 10) / 2);
  },

  // Calculate attack damage
  // Primary stat gives the main bonus; STR gives a small bonus to all classes
  attackDamage(character) {
    const classData = CLASSES[character.class];
    const primaryStat = character.stats[classData.primaryStat];
    const primaryMod = this.modifier(primaryStat);
    const weaponBonus = character.equipment.weapon ? character.equipment.weapon.bonus : 0;

    // STR gives +1 damage per 2 modifier points for non-warrior classes
    let strBonus = 0;
    if (classData.primaryStat !== 'strength') {
      strBonus = Math.max(0, Math.floor(this.modifier(character.stats.strength) / 2));
    }

    // Accessory bonus (e.g., Skeleton Mage's Ring, Forest Charm)
    const accessoryBonus = character.equipment.accessory ? character.equipment.accessory.bonus : 0;

    return Math.max(1, 5 + primaryMod + strBonus + weaponBonus + accessoryBonus);
  },

  // Calculate defense — armor + CON gives damage reduction
  defense(character) {
    const armorBonus = character.equipment.armor ? character.equipment.armor.bonus : 0;
    const conMod = this.modifier(character.stats.constitution);
    return armorBonus + Math.max(0, Math.floor(conMod / 2));
  },

  // Take damage (returns actual damage taken, accounting for dodge)
  // All classes get a small dodge chance from DEX; rogues get much more
  takeDamage(character, rawDamage) {
    const dexMod = this.modifier(character.stats.dexterity);
    let dodgeChance;
    if (character.class === 'rogue') {
      // Rogues: high dodge chance (15-45%)
      dodgeChance = Math.min(45, 15 + dexMod * 6);
    } else {
      // Others: small dodge chance from DEX (0-15%)
      dodgeChance = Math.min(15, Math.max(0, dexMod * 5));
    }

    if (dodgeChance > 0 && Math.random() * 100 < dodgeChance) {
      return 0; // Dodged!
    }

    const def = this.defense(character);
    const damage = Math.max(1, rawDamage - def);
    character.hp = Math.max(0, character.hp - damage);
    return damage;
  },

  // Heal
  heal(character, amount) {
    character.hp = Math.min(character.maxHp, character.hp + amount);
  },

  // Add XP and check for level up (returns true if leveled up)
  addXP(character, amount) {
    character.xp += amount;
    if (character.xp >= character.xpToNext) {
      return true; // Level up pending
    }
    return false;
  },

  // Apply level up with chosen stat
  levelUp(character, chosenStat) {
    character.xp -= character.xpToNext;
    character.level++;
    character.xpToNext = 500 * character.level;

    // Increase chosen stat
    character.stats[chosenStat]++;

    // Increase max HP
    const conMod = this.modifier(character.stats.constitution);
    const hpGain = 5 + Math.max(0, conMod);
    character.maxHp += hpGain;
    character.hp = character.maxHp; // Full heal on level up

    return hpGain;
  },

  // Use an item from inventory
  useItem(character, itemId) {
    const idx = character.inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return false;

    const item = character.inventory[idx];

    if (itemId === 'health_potion') {
      this.heal(character, 15);
    } else if (itemId === 'great_health_potion') {
      this.heal(character, 30);
    }

    item.quantity--;
    if (item.quantity <= 0) {
      character.inventory.splice(idx, 1);
    }
    return true;
  },

  // Buy item from shop
  buyItem(character, shopItem) {
    if (character.gold < shopItem.price) return false;

    character.gold -= shopItem.price;

    if (shopItem.type === 'consumable') {
      const existing = character.inventory.find(i => i.id === shopItem.id);
      if (existing) {
        existing.quantity++;
      } else {
        character.inventory.push({ id: shopItem.id, name: shopItem.name, quantity: 1 });
      }
    } else if (shopItem.type === 'weapon') {
      character.equipment.weapon = { name: shopItem.name, bonus: shopItem.bonus, type: shopItem.weaponType };
    } else if (shopItem.type === 'armor') {
      character.equipment.armor = { name: shopItem.name, bonus: shopItem.bonus };
    }

    return true;
  },

  // Get hint based on intelligence
  // Wizards: always get hints at INT 12+, range narrows with INT
  // Others: need INT 14+ to get hints, range is wider
  getHint(character, correctAnswer) {
    const intMod = this.modifier(character.stats.intelligence);
    const isWizard = character.class === 'wizard';
    const threshold = isWizard ? 1 : 2; // Wizards need mod 1 (INT 12), others need mod 2 (INT 14)
    if (intMod < threshold) return null;

    const numAnswer = parseFloat(correctAnswer);
    if (isNaN(numAnswer)) return null;

    // Wizards get tighter range
    const baseRange = isWizard ? 10 : 14;
    const range = Math.max(2, baseRange - intMod * 2);
    const low = Math.round((numAnswer - range / 2) * 10) / 10;
    const high = Math.round((numAnswer + range / 2) * 10) / 10;
    const flavor = isWizard
      ? `Your arcane senses tell you the answer is between ${low} and ${high}.`
      : `You have a hunch the answer is between ${low} and ${high}.`;
    return flavor;
  },

  // Check if wisdom reveals danger in choices
  // Rangers: high chance, scales with WIS
  // Others: need WIS 14+ for a small chance
  wisdomReveal(character) {
    const wisMod = this.modifier(character.stats.wisdom);
    const isRanger = character.class === 'ranger';

    if (isRanger) {
      return Math.random() * 100 < (30 + wisMod * 10);
    } else {
      // Others need WIS modifier of 2+ (WIS 14+)
      if (wisMod < 2) return false;
      return Math.random() * 100 < (wisMod * 8);
    }
  },

  // Save to localStorage
  save(character) {
    localStorage.setItem(`rom_character_${activeSlot}`, JSON.stringify(character));
  },

  // Load from localStorage
  load() {
    const data = localStorage.getItem(`rom_character_${activeSlot}`);
    return data ? JSON.parse(data) : null;
  },

  // Delete save
  deleteSave() {
    localStorage.removeItem(`rom_character_${activeSlot}`);
  },

  // Peek at a slot without changing activeSlot
  peekSlot(slotNum) {
    const data = localStorage.getItem(`rom_character_${slotNum}`);
    return data ? JSON.parse(data) : null;
  }
};

// ============================================================
// ACADEMICS TRACKING
// ============================================================
const Academics = {
  load() {
    const data = localStorage.getItem(`rom_academics_${activeSlot}`);
    return data ? JSON.parse(data) : {};
  },

  save(academics) {
    localStorage.setItem(`rom_academics_${activeSlot}`, JSON.stringify(academics));
  },

  record(topicId, wasCorrect) {
    const academics = this.load();
    if (!academics[topicId]) {
      academics[topicId] = { attempts: 0, correct: 0, streak: 0 };
    }
    const t = academics[topicId];
    t.attempts++;
    if (wasCorrect) {
      t.correct++;
      t.streak++;
    } else {
      t.streak = 0;
    }
    this.save(academics);
    return t;
  },

  getAccuracy(topicId) {
    const academics = this.load();
    const t = academics[topicId];
    if (!t || t.attempts === 0) return null;
    return Math.round((t.correct / t.attempts) * 100);
  },

  getAll() {
    return this.load();
  },

  reset() {
    localStorage.removeItem(`rom_academics_${activeSlot}`);
  }
};

// ============================================================
// PROGRESS TRACKING
// ============================================================
const Progress = {
  load() {
    const data = localStorage.getItem(`rom_progress_${activeSlot}`);
    return data ? JSON.parse(data) : {
      currentChapter: 1,
      currentNodeId: 'ch1_start',
      nodesVisited: [],
      monstersDefeated: 0,
      chaptersCompleted: []
    };
  },

  save(progress) {
    localStorage.setItem(`rom_progress_${activeSlot}`, JSON.stringify(progress));
  },

  reset() {
    localStorage.removeItem(`rom_progress_${activeSlot}`);
  },

  peekSlot(slotNum) {
    const data = localStorage.getItem(`rom_progress_${slotNum}`);
    return data ? JSON.parse(data) : null;
  }
};

// Delete all data for a specific slot
function deleteSlot(slotNum) {
  localStorage.removeItem(`rom_character_${slotNum}`);
  localStorage.removeItem(`rom_progress_${slotNum}`);
  localStorage.removeItem(`rom_academics_${slotNum}`);
}

// One-time migration: move old un-suffixed keys to slot 1
(function migrateOldSave() {
  const old = localStorage.getItem('rom_character');
  if (old && !localStorage.getItem('rom_character_1')) {
    localStorage.setItem('rom_character_1', old);
    const prog = localStorage.getItem('rom_progress');
    if (prog) localStorage.setItem('rom_progress_1', prog);
    const acad = localStorage.getItem('rom_academics');
    if (acad) localStorage.setItem('rom_academics_1', acad);
  }
  localStorage.removeItem('rom_character');
  localStorage.removeItem('rom_progress');
  localStorage.removeItem('rom_academics');
})();
