// story.js — Pre-written branching story chapters for Realms of Mathematica
// Each node: { id, chapter, environment, narrative, choices[], encounter?, shop?, reward?, nextChapter? }

const STORY = {

  // ============================================================
  // CHAPTER 1: THE VILLAGE OF NUMERIA
  // ============================================================
  ch1_start: {
    chapter: 1, environment: 'village',
    narrative: 'You arrive at the village of Numeria just as the sun begins to set. Smoke rises from chimneys, but the village square is unusually empty. An old man hurries toward you, worry etched into his face. "Adventurer! Thank the stars you\'ve come! Goblins have been raiding our supply wagons every night. We\'re running out of food and medicine."',
    choices: [
      { id: 'a', text: 'I\'ll help defend the village tonight.', next: 'ch1_defend' },
      { id: 'b', text: 'Tell me more about these goblins. Where do they come from?', next: 'ch1_info' },
      { id: 'c', text: 'Show me the last wagon they attacked. I want to look for clues.', next: 'ch1_clues' },
      { id: 'd', text: 'I need supplies first. Is there a tavern nearby?', next: 'ch1_tavern' }
    ]
  },

  ch1_tavern: {
    chapter: 1, environment: 'tavern',
    narrative: 'The Rusty Compass tavern is warm and dim, its wooden walls hung with old maps and adventuring gear. A few nervous villagers nurse their drinks. The barkeeper, a stout woman named Brenna, slides you a bowl of stew. "On the house, adventurer. We need all the help we can get." In the corner, a hooded traveler catches your eye — they\'re studying a strange map covered in numbers.',
    choices: [
      { id: 'a', text: 'Talk to the hooded traveler.', next: 'ch1_traveler' },
      { id: 'b', text: 'Ask Brenna what she knows about the goblin raids.', next: 'ch1_brenna' },
      { id: 'c', text: 'Finish your stew and go help the elder.', next: 'ch1_info' }
    ]
  },

  ch1_traveler: {
    chapter: 1, environment: 'tavern',
    narrative: 'The traveler lowers their hood — an elf with sharp, intelligent eyes. "I\'m Lysara, a scholar of the old roads. I\'ve been tracking something... unusual. These goblin raids aren\'t random. They\'re taking very specific supplies — alchemical ingredients, measuring tools, mathematical texts." She pushes her map toward you. "I found coded markings on the road. Help me decode them, and I\'ll share what I know."',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'frac_to_decimal', difficulty: 'easy',
      intro: 'Help Lysara decode the strange mathematical markings.',
      success: '"Fascinating!" Lysara\'s eyes widen. "These markings lead to the goblin tunnels, but they also show the goblins are working for someone — someone who understands advanced mathematics. This is no ordinary raid." She hands you a small vial. "Take this. You\'ll need it."',
      failure: '"These symbols are tricky. Let\'s try a different approach."' },
    reward: { xp: 30, gold: 10, items: [{ id: 'health_potion', name: 'Health Potion', quantity: 1 }] },
    choicesAfter: [
      { id: 'a', text: 'Follow Lysara\'s map to scout the goblin trail.', next: 'ch1_river' },
      { id: 'b', text: 'Share this information with the village elder.', next: 'ch1_info' }
    ]
  },

  ch1_brenna: {
    chapter: 1, environment: 'tavern',
    narrative: 'Brenna leans over the bar, her voice low. "I\'ll tell you something the elder won\'t. My boy Tam snuck out three nights ago to follow the goblins. He came back white as a sheet, babbling about \'glowing eyes in the dark\' and \'a voice that counts.\' Whatever\'s commanding those goblins — it ain\'t another goblin." She grips your arm. "Bring my boy some peace of mind, adventurer. End this."',
    choices: [
      { id: 'a', text: 'I\'ll find out what\'s really going on. Where do the goblins come from?', next: 'ch1_info' },
      { id: 'b', text: 'Can I talk to Tam?', next: 'ch1_tam' }
    ]
  },

  ch1_tam: {
    chapter: 1, environment: 'tavern',
    narrative: 'Brenna calls her son down from upstairs. Tam is a wide-eyed boy, maybe 12, still visibly shaken. "I followed them to the river," he whispers. "They have a secret crossing — stones hidden just below the water. But you need to figure out the pattern to cross safely. I... I was too scared to try." He sketches the river crossing in the dirt on the floor.',
    choices: [
      { id: 'a', text: 'Thanks, Tam. I\'ll try the river crossing.', next: 'ch1_river' },
      { id: 'b', text: 'I\'d rather follow the main road. Show me where the wagons were hit.', next: 'ch1_clues' }
    ]
  },

  ch1_info: {
    chapter: 1, environment: 'village',
    narrative: 'The elder strokes his beard. "They come from the tunnels in the eastern hills. Used to be peaceful, but a new chieftain has riled them up. They attack at dusk, take what they can carry, and vanish before we can stop them." He pauses. "We tried counting how much they\'ve taken, but the numbers are... confusing. Fractions and such."',
    choices: [
      { id: 'a', text: 'Let me help you figure out the supplies situation.', next: 'ch1_supplies' },
      { id: 'b', text: 'I\'ll go scout the eastern hills now.', next: 'ch1_scout' }
    ]
  },

  ch1_clues: {
    chapter: 1, environment: 'village',
    narrative: 'You examine the wrecked wagon at the edge of town. The wood is scratched by small claws, and you spot tiny footprints in the mud — definitely goblins, and lots of them. Among the debris, you find a torn piece of parchment with strange markings. It looks like a supply manifest, but some numbers are smudged.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_by_whole', difficulty: 'easy',
      intro: 'You study the torn manifest to figure out how much was stolen.',
      success: 'The numbers click into place! You now know exactly what was taken. The supplies were split across multiple sacks, but now you have the full picture. This is valuable information.',
      failure: 'The numbers blur together. You\'ll need to try again.' },
    choicesAfter: [
      { id: 'a', text: 'Share what you found with the elder.', next: 'ch1_defend' },
      { id: 'b', text: 'Follow the goblin tracks into the hills.', next: 'ch1_scout' }
    ]
  },

  ch1_supplies: {
    chapter: 1, environment: 'village',
    narrative: 'The elder spreads out the village ledger on a table. "We had enough supplies for the whole season, but the goblins have taken so much... I can\'t figure out how much is left." He looks at you hopefully.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_by_decimal', difficulty: 'easy',
      intro: 'Help the elder calculate the remaining supplies.',
      success: 'You work through the numbers and determine exactly what\'s left. The elder nods gratefully. "With your help, we can ration properly. But we need to stop these raids!"',
      failure: 'The calculations are tricky, but don\'t give up!' },
    choicesAfter: [
      { id: 'a', text: 'I\'ll defend the village tonight.', next: 'ch1_defend' },
      { id: 'b', text: 'I\'ll track the goblins to their camp.', next: 'ch1_scout' }
    ]
  },

  ch1_defend: {
    chapter: 1, environment: 'village',
    narrative: 'Night falls. You take position behind the village wall with a handful of brave villagers. The torches flicker in the wind. Then you hear them — the chittering of goblins in the darkness. Three small figures scramble over the wall!',
    encounter: { type: 'combat', monster: { name: 'Goblin Raider', hp: 15, maxHp: 15, attack: 4, sprite: 'goblin' }, problemTopic: 'decimal_by_whole', difficulty: 'easy',
      intro: 'A goblin raider leaps at you with a rusty blade!',
      success: 'Your attack lands true! The goblin stumbles backward.',
      failure: 'You miss, and the goblin takes a swing at you!' },
    reward: { xp: 40, gold: 15 },
    choicesAfter: [
      { id: 'a', text: 'Chase the retreating goblins to find their hideout.', next: 'ch1_chase' },
      { id: 'b', text: 'Rest and prepare to track them at dawn.', next: 'ch1_dawn' }
    ]
  },

  ch1_river: {
    chapter: 1, environment: 'river',
    narrative: 'You find the river Tam described — a wide, shallow stretch where stepping stones hide just beneath the surface. The water is clear but fast-moving, and you can see the stones are spaced in a mathematical pattern. One wrong step and you\'ll be swept downstream. Goblin footprints line both banks.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'place_value', difficulty: 'easy',
      intro: 'Calculate the safe stepping stone pattern to cross the river.',
      success: 'You hop across the stones with confidence! On the far bank, you find fresh goblin tracks leading into the hills — and something else: a small cage with a goblin trapped inside!',
      failure: 'You slip on a stone and get soaked, but manage to climb back to shore. Try again!' },
    choicesAfter: [
      { id: 'a', text: 'Investigate the trapped goblin.', next: 'ch1_trapped_goblin' },
      { id: 'b', text: 'Ignore it and follow the tracks to the cave.', next: 'ch1_cave_enter' }
    ]
  },

  ch1_trapped_goblin: {
    chapter: 1, environment: 'forest_clearing',
    narrative: 'The goblin is small and terrified, caught in a hunter\'s snare. Unlike the raiders, this one wears no armor and carries no weapons. It whimpers when it sees you. "Please! Grik not bad goblin! Grik try to run away from Chieftain Gruk, but Gruk\'s hunters set trap!" It looks at you with wide, pleading eyes. "Grik know secret way into tunnels. Grik help if you let Grik go!"',
    choices: [
      { id: 'a', text: 'Free the goblin and accept its help.', next: 'ch1_mercy' },
      { id: 'b', text: 'Leave it. You can\'t trust a goblin.', next: 'ch1_scout' },
      { id: 'c', text: 'Free it but don\'t accept help. "Just go. Be free."', next: 'ch1_free_grik' }
    ]
  },

  ch1_mercy: {
    chapter: 1, environment: 'forest_clearing',
    narrative: 'You cut the snare. Grik tumbles free, rubbing its wrists gratefully. "Kind adventurer! Grik keeps promise. Back entrance to tunnels — behind the waterfall. Gruk never guards it because goblins afraid of water." Grik pauses. "Also... Gruk has magic thing. Glowing bones gave it to him. Makes Gruk angry and strong. Be careful!" Grik scurries off into the bushes.',
    reward: { xp: 25 },
    choices: [
      { id: 'a', text: 'Use Grik\'s tip — find the waterfall entrance.', next: 'ch1_waterfall' },
      { id: 'b', text: 'Go to the main cave entrance instead.', next: 'ch1_cave_enter' }
    ]
  },

  ch1_free_grik: {
    chapter: 1, environment: 'forest_clearing',
    narrative: 'You cut the snare. Grik stumbles to its feet, stunned that you expect nothing in return. "You... you nice. Grik remember." It hesitates, then whispers: "Waterfall. Back way in." Then it vanishes into the underbrush.',
    reward: { xp: 15 },
    choices: [
      { id: 'a', text: 'Head toward the waterfall.', next: 'ch1_waterfall' },
      { id: 'b', text: 'Find the main cave entrance.', next: 'ch1_cave_enter' }
    ]
  },

  ch1_waterfall: {
    chapter: 1, environment: 'river',
    narrative: 'You follow the river upstream to a small but beautiful waterfall. Behind the curtain of water, just as Grik described, a narrow cave opening leads into the hillside. The sound of the falls masks your approach perfectly. Inside, you emerge behind the goblin supply room — crates of stolen goods stacked floor to ceiling. And just ahead, you can hear Gruk bellowing orders.',
    reward: { xp: 20 },
    choices: [
      { id: 'a', text: 'Count the stolen supplies before confronting Gruk.', next: 'ch1_count' },
      { id: 'b', text: 'Sneak straight to the chieftain\'s chamber.', next: 'ch1_chieftain' }
    ]
  },

  ch1_scout: {
    chapter: 1, environment: 'forest_clearing',
    narrative: 'You follow the tracks through the twilight woods. The trail leads to a rocky hillside where you can see the faint glow of torchlight from a cave entrance. But a lone goblin guard stands watch, its beady eyes scanning the forest.',
    encounter: { type: 'combat', monster: { name: 'Goblin Scout', hp: 12, maxHp: 12, attack: 3, sprite: 'goblin' }, problemTopic: 'whole_by_decimal', difficulty: 'easy',
      intro: 'The goblin scout spots you and charges!',
      success: 'You strike the scout down before it can alert the others!',
      failure: 'The goblin dodges and slashes at you!' },
    reward: { xp: 35, gold: 10 },
    choicesAfter: [
      { id: 'a', text: 'Sneak into the cave.', next: 'ch1_cave_enter' },
      { id: 'b', text: 'Return to the village to report what you found.', next: 'ch1_dawn' }
    ]
  },

  ch1_chase: {
    chapter: 1, environment: 'forest_clearing',
    narrative: 'You sprint after the fleeing goblins through the moonlit forest. Branches whip past your face as you follow the sound of their panicked chatter. You come to a fork — the main goblin trail heads uphill, but you notice smaller tracks leading down to a river.',
    choices: [
      { id: 'a', text: 'Follow the main trail uphill to the cave.', next: 'ch1_cave_enter' },
      { id: 'b', text: 'Follow the smaller tracks to the river.', next: 'ch1_river' }
    ]
  },

  ch1_dawn: {
    chapter: 1, environment: 'village',
    narrative: 'You rest at the village inn and wake refreshed. The elder provides you with a health potion and directions to the goblin tunnels. "End this, adventurer. Our village depends on you."',
    reward: { xp: 10, items: [{ id: 'health_potion', name: 'Health Potion', quantity: 1 }] },
    choices: [
      { id: 'a', text: 'Head to the goblin tunnels.', next: 'ch1_cave_enter' }
    ]
  },

  ch1_cave_enter: {
    chapter: 1, environment: 'cave',
    narrative: 'The cave entrance yawns before you like a dark mouth. Inside, crude torches cast dancing shadows on the stone walls. You can hear goblins deeper in, arguing in their guttural language. Stolen supplies are piled along the walls — sacks of grain, bottles of medicine, tools.',
    choices: [
      { id: 'a', text: 'Sneak past the supplies to find the chieftain.', next: 'ch1_chieftain' },
      { id: 'b', text: 'Count the stolen supplies to report back to the elder.', next: 'ch1_count' }
    ]
  },

  ch1_count: {
    chapter: 1, environment: 'cave',
    narrative: 'You quickly examine the stolen goods. There are sacks of grain, crates of medicine, and barrels of water — but they\'re split into uneven piles. You need to figure out the totals.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_by_decimal', difficulty: 'easy',
      intro: 'Calculate the total stolen supplies from the goblin hoard.',
      success: 'Perfect! You note down the exact totals. The villagers will be relieved to get this back.',
      failure: 'These numbers are tricky — try again!' },
    choicesAfter: [
      { id: 'a', text: 'Now find the chieftain.', next: 'ch1_chieftain' }
    ]
  },

  ch1_chieftain: {
    chapter: 1, environment: 'cave',
    narrative: 'Deep in the cave, you find a larger chamber lit by a fire pit. A goblin bigger than the rest sits on a throne made of stolen furniture. He wears a dented crown and carries an oversized club. "WHO DARES ENTER GRUK\'S DOMAIN?" he bellows. The Goblin Chieftain stands and advances!',
    encounter: { type: 'combat', monster: { name: 'Gruk the Goblin Chieftain', hp: 30, maxHp: 30, attack: 6, sprite: 'goblin_chief' }, problemTopic: 'whole_by_decimal', difficulty: 'easy',
      intro: 'Gruk the Goblin Chieftain swings his massive club!',
      success: 'Your attack connects! Gruk roars in pain!',
      failure: 'Gruk smashes his club down — you barely dodge!' },
    reward: { xp: 100, gold: 30, items: [{ id: 'health_potion', name: 'Health Potion', quantity: 1 }] },
    nextChapter: true,
    choicesAfter: [
      { id: 'a', text: 'Claim victory and return to Numeria!', next: 'ch1_complete' }
    ]
  },

  ch1_complete: {
    chapter: 1, environment: 'village', chapterComplete: true,
    chapterTitle: 'Chapter 1 Complete: The Village of Numeria',
    chapterSummary: 'You defeated Gruk the Goblin Chieftain and saved the village of Numeria! The stolen supplies have been recovered, and the villagers can rest easy tonight. But the elder warns you — Gruk mentioned a "dark master" in the deep tunnels who commanded the raids. Your quest continues...',
    chapterReward: 'A grateful villager gives you a shining new piece of equipment!',
    chapterRewardItem: { slot: 'weapon', name: 'Village Hero\'s Blade', bonus: 4, type: 'melee' }
  },

  // ============================================================
  // CHAPTER 2: THE GOBLIN TUNNELS
  // ============================================================
  ch2_start: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'The village elder has given you a map sketched by an old miner. It shows a network of tunnels beneath the eastern hills — far deeper than Gruk\'s cave. "If there truly is a \'dark master\' down there," says the elder, "we\'ll never be safe until you find them." You descend into the tunnels. The air grows cold and damp.',
    choices: [
      { id: 'a', text: 'Follow the main tunnel deeper.', next: 'ch2_main_tunnel' },
      { id: 'b', text: 'Take the narrow side passage marked with strange runes.', next: 'ch2_rune_passage' },
      { id: 'c', text: 'Listen carefully for sounds before choosing a path.', next: 'ch2_listen' }
    ]
  },

  ch2_listen: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'You press your ear against the cold stone. From the main tunnel, you hear goblin chatter and the clink of metal. From the side passage, you hear... nothing. Silence. Which is somehow more unsettling. But wait — from far below, you catch the faintest sound of running water.',
    choices: [
      { id: 'a', text: 'Go toward the goblin sounds — face them head-on.', next: 'ch2_main_tunnel' },
      { id: 'b', text: 'Take the silent passage — the unknown calls to you.', next: 'ch2_rune_passage' },
      { id: 'c', text: 'Follow the sound of water downward.', next: 'ch2_underground_river' }
    ]
  },

  ch2_main_tunnel: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'The tunnel opens into a guard post. Two goblin warriors patrol between crude barricades. They haven\'t noticed you yet. On a table nearby, you spot a map of the tunnel network with markings you could decipher.',
    choices: [
      { id: 'a', text: 'Attack the guards before they can raise the alarm!', next: 'ch2_guard_fight' },
      { id: 'b', text: 'Try to sneak past and grab the map.', next: 'ch2_sneak' }
    ]
  },

  ch2_guard_fight: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'You charge into the guard post. A muscular goblin warrior sits sharpening its spear by a small fire. It leaps to its feet, snarling. Behind it you notice a crude map pinned to the wall — it could show the tunnels deeper inside.',
    encounter: { type: 'combat', monster: { name: 'Goblin Warrior', hp: 20, maxHp: 20, attack: 5, sprite: 'goblin' }, problemTopic: 'place_value', difficulty: 'easy',
      intro: 'The goblin warrior raises its spear!',
      success: 'Your blow sends the goblin sprawling!',
      failure: 'The goblin jabs its spear at you!' },
    reward: { xp: 45, gold: 12 },
    choicesAfter: [
      { id: 'a', text: 'Study the map on the table.', next: 'ch2_map' },
      { id: 'b', text: 'Press deeper into the tunnels.', next: 'ch2_deep' }
    ]
  },

  ch2_sneak: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'You creep along the shadows, timing your movements to the guards\' patrol pattern. Your fingers close around the map just as one guard turns. You freeze. He sniffs the air... then turns back. Safe!',
    reward: { xp: 30 },
    choices: [
      { id: 'a', text: 'Study the map you grabbed.', next: 'ch2_map' },
      { id: 'b', text: 'Slip past into the deeper tunnels.', next: 'ch2_deep' }
    ]
  },

  ch2_rune_passage: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'The narrow passage is lined with ancient runes that glow faintly blue. This was clearly built by someone — or something — far older than goblins. The runes seem to be a mathematical puzzle, perhaps a lock of some kind.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_by_decimal', difficulty: 'medium',
      intro: 'Decipher the ancient rune puzzle to unlock the passage.',
      success: 'The runes flare bright blue, and a hidden door slides open, revealing a shortcut deeper into the tunnels!',
      failure: 'The runes flicker and fade. Try a different approach!' },
    choicesAfter: [
      { id: 'a', text: 'Enter the hidden passage.', next: 'ch2_archive' },
      { id: 'b', text: 'Go back and take the main tunnel instead.', next: 'ch2_main_tunnel' }
    ]
  },

  ch2_archive: {
    chapter: 2, environment: 'library',
    narrative: 'The hidden passage opens into an ancient archive — shelves of stone tablets and crumbling scrolls fill a vaulted chamber. Dust motes float in the light of glowing crystals. This must have been a dwarven library, long before the goblins arrived. Most texts are too old to read, but one stone tablet near the door still has legible inscriptions. It describes something called the "Numeral Crown" — an artifact of immense mathematical power, hidden deep in the mountains.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_forms', difficulty: 'medium',
      intro: 'Decipher the ancient dwarven mathematical inscriptions.',
      success: 'You piece together the text: "The Crown amplifies the power of numbers. In the wrong hands, it could reshape reality itself." A chill runs down your spine. Is this what the dark master is after?',
      failure: 'The ancient notation is different from what you\'re used to. Try again!' },
    reward: { xp: 40, gold: 20 },
    choicesAfter: [
      { id: 'a', text: 'Continue deeper into the tunnels.', next: 'ch2_deep' },
      { id: 'b', text: 'Search the archive for useful items.', next: 'ch2_archive_search' }
    ]
  },

  ch2_archive_search: {
    chapter: 2, environment: 'library',
    narrative: 'You carefully search the ancient shelves. Behind a loose stone, you find a small chest containing a vial of shimmering blue liquid and a handful of old coins that are still valuable. The vial hums with magical energy.',
    reward: { xp: 15, gold: 20, items: [{ id: 'health_potion', name: 'Health Potion', quantity: 1 }] },
    choices: [
      { id: 'a', text: 'Continue deeper into the tunnels.', next: 'ch2_deep' }
    ]
  },

  ch2_underground_river: {
    chapter: 2, environment: 'river',
    narrative: 'You descend a winding staircase carved into the rock and emerge into a vast underground cavern. A river flows through it, black and swift, lit by clusters of bioluminescent mushrooms on the ceiling. A narrow stone bridge arches over the water — but something large is lurking beneath the surface. You can see ripples.',
    choices: [
      { id: 'a', text: 'Cross the bridge carefully.', next: 'ch2_bridge_cross' },
      { id: 'b', text: 'Search for another way around.', next: 'ch2_mushroom_path' }
    ]
  },

  ch2_bridge_cross: {
    chapter: 2, environment: 'river',
    narrative: 'Halfway across the bridge, the water erupts! A cave troll — massive, grey-skinned, dripping with river slime — hauls itself up and blocks your path. It snarls, baring teeth like broken stalactites!',
    encounter: { type: 'combat', monster: { name: 'River Troll', hp: 28, maxHp: 28, attack: 6, sprite: 'troll' }, problemTopic: 'whole_by_decimal', difficulty: 'medium',
      intro: 'The river troll swings its massive fists!',
      success: 'You land a solid hit! The troll bellows in pain!',
      failure: 'The troll\'s fist sends you skidding across the wet stone!' },
    reward: { xp: 60, gold: 20 },
    choicesAfter: [
      { id: 'a', text: 'Continue past the bridge to the deeper tunnels.', next: 'ch2_deep' }
    ]
  },

  ch2_mushroom_path: {
    chapter: 2, environment: 'cave',
    narrative: 'You follow the riverbank, picking your way between glowing mushrooms. The mushrooms pulse with soft light — blue, then green, then purple — in a mathematical sequence. If you can figure out the pattern, the next pulse will light your way to a safe crossing point.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'regroup_decimals', difficulty: 'easy',
      intro: 'Decode the mushroom light pattern to find the safe path.',
      success: 'The mushrooms pulse in unison, lighting a shallow ford across the river. You cross safely and find a small pouch of gems left by some long-dead traveler!',
      failure: 'The pattern resets. Watch the sequence more carefully!' },
    reward: { xp: 35, gold: 15 },
    choicesAfter: [
      { id: 'a', text: 'Continue to the deeper tunnels.', next: 'ch2_deep' }
    ]
  },

  ch2_map: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'The map reveals the full tunnel network. There\'s a large chamber at the deepest point marked with a skull symbol — that must be where the "dark master" resides. But to get there, you need to calculate the shortest route through the twisting passages.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_div_decimal_quot', difficulty: 'easy',
      intro: 'Calculate the distances to find the shortest route.',
      success: 'You trace the optimal path on the map. It leads through a crystal cavern and past an underground river.',
      failure: 'The distances are confusing — try recalculating!' },
    choicesAfter: [
      { id: 'a', text: 'Follow the shortest route.', next: 'ch2_deep' }
    ]
  },

  ch2_deep: {
    chapter: 2, environment: 'cave',
    narrative: 'The tunnels grow darker and colder as you descend. Strange crystals jut from the walls, casting an eerie purple glow. You hear the skittering of something large ahead — and then a massive spider drops from the ceiling!',
    encounter: { type: 'combat', monster: { name: 'Tunnel Spider', hp: 22, maxHp: 22, attack: 5, sprite: 'spider' }, problemTopic: 'estimate_divide', difficulty: 'easy',
      intro: 'A giant spider blocks your path, venom dripping from its fangs!',
      success: 'You strike the spider! It hisses and recoils!',
      failure: 'The spider lunges and bites!' },
    reward: { xp: 50, gold: 8 },
    choicesAfter: [
      { id: 'a', text: 'Continue to the deepest chamber.', next: 'ch2_skeleton' },
      { id: 'b', text: 'Search the spider\'s nest for treasure.', next: 'ch2_nest' },
      { id: 'c', text: 'Investigate the strange purple crystals.', next: 'ch2_crystals' }
    ]
  },

  ch2_crystals: {
    chapter: 2, environment: 'cave',
    narrative: 'You examine the crystals more closely. They\'re warm to the touch and pulse with energy. Touching one, images flash in your mind: a robed figure performing dark rituals, goblin armies marching, and a crown of pure light. These crystals are memory stones — they\'re recording what happens in these tunnels. Someone powerful placed them here.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'estimate_multiply', difficulty: 'easy',
      intro: 'Focus on the crystal to decode the magical memory fragment.',
      success: 'The vision clears: you see a sorceress commanding the Skeleton Mage, ordering it to "guard the tunnels until the Crown is found." The sorceress fled north — into an enchanted forest. Now you know who you\'re really up against.',
      failure: 'The images are blurry. Concentrate harder!' },
    reward: { xp: 35 },
    choicesAfter: [
      { id: 'a', text: 'Continue to the deepest chamber.', next: 'ch2_skeleton' },
      { id: 'b', text: 'Check the spider\'s nest first.', next: 'ch2_nest' }
    ]
  },

  ch2_nest: {
    chapter: 2, environment: 'cave',
    narrative: 'In the spider\'s nest, tangled in sticky webs, you find the remains of an unfortunate adventurer. Among their belongings: a pouch of gold coins and a gleaming potion.',
    reward: { xp: 15, gold: 25, items: [{ id: 'great_health_potion', name: 'Great Health Potion', quantity: 1 }] },
    choices: [
      { id: 'a', text: 'Press on to the deepest chamber.', next: 'ch2_skeleton' }
    ]
  },

  ch2_goblin_prisoner: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'In a side cell, you find a goblin chained to the wall. Unlike the warriors, this one is small and sickly. It looks up at you with frightened eyes. "Please... Nix tried to tell Chieftain that dark master was bad for goblins. Dark master locked Nix up." It coughs. "Nix knows about the dark master\'s weakness. Magic numbers on the floor — step on wrong ones and boom! But Nix knows the safe pattern."',
    choices: [
      { id: 'a', text: 'Free Nix and learn the safe pattern.', next: 'ch2_nix_help' },
      { id: 'b', text: 'Leave it. Could be a trap.', next: 'ch2_skeleton' }
    ]
  },

  ch2_nix_help: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'You break Nix\'s chains. The goblin stretches gratefully and draws a pattern on the floor in chalk. "Safe numbers: step on ones that match this pattern!" It draws a sequence of decimal calculations. "Get them right and walk safe. Get wrong... zap!" Nix waves goodbye. "Nix go now. Nix find goblins who want peace. Good luck, kind one!"',
    reward: { xp: 30 },
    encounter: { type: 'puzzle', monster: null, problemTopic: 'frac_to_decimal', difficulty: 'medium',
      intro: 'Use Nix\'s pattern to navigate the trapped floor safely.',
      success: 'You step carefully along the safe path. The magical traps spark and fizzle around you but never touch you. Safe!',
      failure: 'ZAP! A trap stings you. Nix\'s pattern is helpful — try again with it in mind!' },
    choicesAfter: [
      { id: 'a', text: 'Confront the dark master.', next: 'ch2_skeleton' }
    ]
  },

  ch2_skeleton: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'You reach a vast underground hall. Pillars carved with mathematical symbols line the sides. At the far end, a figure in tattered robes stands motionless — a Skeleton Mage! Its empty eye sockets flare with green fire as it raises a bony hand. "You seek the master? I AM the guardian of these depths! You will go no further!" Bones rattle as skeletal warriors rise from the ground!',
    encounter: { type: 'combat', monster: { name: 'Skeleton Mage', hp: 35, maxHp: 35, attack: 7, sprite: 'skeleton' }, problemTopic: 'decimal_by_whole', difficulty: 'medium',
      intro: 'The Skeleton Mage hurls a bolt of green fire!',
      success: 'Your attack shatters bone! The Skeleton Mage staggers!',
      failure: 'Green flames sear you as the skeleton cackles!' },
    reward: { xp: 120, gold: 40 },
    nextChapter: true,
    choicesAfter: [
      { id: 'a', text: 'Search the chamber for answers about the "dark master."', next: 'ch2_complete' }
    ]
  },

  ch2_complete: {
    chapter: 2, environment: 'dungeon_corridor', chapterComplete: true,
    chapterTitle: 'Chapter 2 Complete: The Goblin Tunnels',
    chapterSummary: 'You defeated the Skeleton Mage and discovered a journal among the bones. It speaks of a powerful sorceress who fled into the Enchanted Forest long ago, taking forbidden mathematical knowledge with her. The goblins were merely her puppets. To truly end the threat, you must find her in the forest. The journal also mentions a village of forest folk who might help you — if you can find them.',
    chapterReward: 'You found the Skeleton Mage\'s enchanted ring!',
    chapterRewardItem: { slot: 'accessory', name: 'Skeleton Mage\'s Ring', bonus: 2, effect: 'Boosts all damage by 2' }
  },

  // ============================================================
  // CHAPTER 3: THE ENCHANTED FOREST
  // ============================================================
  ch3_start: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'You emerge from the tunnels into a dense, ancient forest. Sunlight filters through the canopy in golden shafts. Strange flowers glow softly, and you can hear birdsong mixed with an odd, musical humming. A tiny voice calls out: "Hey! Over here! Are you the adventurer from Numeria?"',
    choices: [
      { id: 'a', text: 'Look for the source of the voice.', next: 'ch3_fairy' },
      { id: 'b', text: 'Call out: "Who\'s there? Show yourself!"', next: 'ch3_fairy' },
      { id: 'c', text: 'Ignore it and follow the path deeper into the forest.', next: 'ch3_path' },
      { id: 'd', text: 'Ready your weapon. This could be a trap.', next: 'ch3_cautious' }
    ]
  },

  ch3_cautious: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'You draw your weapon and scan the treeline. A tiny fairy with shimmering wings darts back behind a flower, squeaking in alarm. "Don\'t hurt me! I\'m friendly! The forest folk sent me to find you!" She peeks out cautiously. "My name is Pip. Are you... always this scary?"',
    choices: [
      { id: 'a', text: 'Put your weapon away. "Sorry, Pip. I\'ve been in tunnels full of goblins."', next: 'ch3_fairy' },
      { id: 'b', text: 'Keep your guard up. "Prove you\'re friendly. What do the forest folk want?"', next: 'ch3_pip_prove' }
    ]
  },

  ch3_pip_prove: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'Pip puffs up indignantly. "Fine! The sorceress\'s name is Morvina. She was once the greatest mathematician in the realm. She came to the forest three years ago and started corrupting everything with dark equations. The trees twist, the animals turn aggressive, and the forest folk are trapped in their village. THAT\'S why they sent me. Happy now?" She crosses her tiny arms.',
    choices: [
      { id: 'a', text: 'Alright, I believe you. Lead the way.', next: 'ch3_fairy_lead' },
      { id: 'b', text: 'Tell me more about Morvina first.', next: 'ch3_pip_story' }
    ]
  },

  ch3_pip_story: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'Pip settles on a branch, her glow dimming slightly. "Morvina wasn\'t always evil. She was a brilliant scholar — used math to help people, build bridges, cure diseases. But she discovered something called the Numeral Crown in old texts. She became obsessed. Said she could \'perfect\' the world with it. But the math she uses now... it\'s wrong. Twisted. It hurts everything it touches." Pip looks sad. "I think she forgot that math is supposed to help, not control."',
    reward: { xp: 15 },
    choices: [
      { id: 'a', text: 'We\'ll stop her. Take me to the forest folk.', next: 'ch3_fairy_lead' },
      { id: 'b', text: 'Where is she now?', next: 'ch3_morvina_location' }
    ]
  },

  ch3_morvina_location: {
    chapter: 3, environment: 'forest_clearing',
    narrative: '"Her tower is on the far side of the forest, past the Whispering Ravine," says Pip. "But you can\'t just walk there — the corrupted zone is like a maze. The paths change, the trees move. The forest folk know the way, though. That\'s why we should go to their village first." She thinks. "Unless you want to try the river route? It flows straight through, and the corruption can\'t touch running water."',
    choices: [
      { id: 'a', text: 'Let\'s go to the forest folk village.', next: 'ch3_fairy_lead' },
      { id: 'b', text: 'I\'ll take the river route. Faster.', next: 'ch3_river_route' }
    ]
  },

  ch3_fairy: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'A tiny fairy with shimmering wings flutters down to eye level. She\'s no bigger than your hand. "I\'m Pip! The forest folk sent me to find you. The sorceress — her name is Morvina — she\'s been corrupting the forest with dark magic. But I got lost on the way and can\'t figure out the distance back to our village. Can you help?"',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'frac_to_decimal', difficulty: 'easy',
      intro: 'Help Pip calculate the distance to the forest folk village.',
      success: '"That\'s it!" Pip squeals happily. "Follow me, I know the way now!" She leads you along a hidden path.',
      failure: '"Hmm, that doesn\'t seem right. Let\'s try again!"' },
    choicesAfter: [
      { id: 'a', text: 'Follow Pip to the forest folk village.', next: 'ch3_fairy_lead' }
    ]
  },

  ch3_fairy_lead: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'Pip leads you through a sun-dappled grove. Butterflies with equation-patterned wings flutter around you. "Almost there!" Pip chirps. But suddenly, the trees ahead darken and twist. A corrupted wolf — its fur matted with dark, swirling symbols — slinks out of the shadows, growling.',
    encounter: { type: 'combat', monster: { name: 'Corrupted Wolf', hp: 20, maxHp: 20, attack: 5, sprite: 'wolf' }, problemTopic: 'estimate_multiply', difficulty: 'easy',
      intro: 'The corrupted wolf lunges with unnatural speed!',
      success: 'You drive back the wolf! The dark symbols on its fur fade as it flees.',
      failure: 'The wolf snaps at you with glowing fangs!' },
    reward: { xp: 40, gold: 8 },
    choicesAfter: [
      { id: 'a', text: 'Continue to the forest folk village.', next: 'ch3_village' },
      { id: 'b', text: 'Investigate where the corruption is coming from.', next: 'ch3_corrupted_grove' }
    ]
  },

  ch3_path: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'The forest path twists and turns between ancient trees. You spot a wolf prowling between the shadows, its yellow eyes fixed on you. Dark symbols seem to swim across its fur. It snarls and leaps!',
    encounter: { type: 'combat', monster: { name: 'Forest Wolf', hp: 18, maxHp: 18, attack: 5, sprite: 'wolf' }, problemTopic: 'estimate_multiply', difficulty: 'easy',
      intro: 'A wild wolf attacks!',
      success: 'You strike the wolf! It yelps and staggers!',
      failure: 'The wolf bites at you!' },
    reward: { xp: 40, gold: 5 },
    choicesAfter: [
      { id: 'a', text: 'Continue deeper into the forest.', next: 'ch3_crossroads' },
      { id: 'b', text: 'Explore the strange ruins nearby.', next: 'ch3_ruins' }
    ]
  },

  ch3_crossroads: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'You reach a crossroads marked by a mossy stone pillar. Carved arrows point in three directions, each labeled in faded text: "Village of the Green Folk," "The Whispering River," and "The Old Ruins." A tiny voice from above says, "Oh! THERE you are! I\'ve been looking everywhere!" A fairy flutters down, looking relieved.',
    choices: [
      { id: 'a', text: 'Follow the fairy to the village.', next: 'ch3_village' },
      { id: 'b', text: 'Head to the Whispering River.', next: 'ch3_river_route' },
      { id: 'c', text: 'Explore the Old Ruins.', next: 'ch3_ruins' }
    ]
  },

  ch3_river_route: {
    chapter: 3, environment: 'river',
    narrative: 'You follow a winding trail down to a wide, shimmering river. The water is crystal clear and seems to glow from within. Pip (who\'s been following you whether you noticed or not) lands on your shoulder. "The river IS safe from corruption, but there\'s a guardian — the River Serpent. It only lets you pass if you prove your worth!"',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_by_whole', difficulty: 'medium',
      intro: 'The River Serpent rises from the water and poses its mathematical challenge!',
      success: 'The serpent nods its massive head and parts the water, revealing a dry path along the riverbed. "You may pass, number-wise one." On the riverbed, you spot something glinting...',
      failure: 'The serpent shakes its head. "Incorrect. Try again, young one."' },
    reward: { xp: 50, gold: 25 },
    choicesAfter: [
      { id: 'a', text: 'Follow the riverbed path toward the tower.', next: 'ch3_tower_approach' },
      { id: 'b', text: 'Detour to the forest folk village first.', next: 'ch3_village' }
    ]
  },

  ch3_corrupted_grove: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'You push through the darkened trees to a grove where the corruption is strongest. The ground is covered in glowing mathematical symbols that pulse with dark energy. At the center, a crystal obelisk crackles with power — one of Morvina\'s corruption anchors! If you can solve the equation binding it, you might be able to shatter it and heal this part of the forest.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_by_decimal', difficulty: 'medium',
      intro: 'Unravel the dark equation powering the corruption anchor!',
      success: 'The obelisk cracks and shatters! A wave of golden light spreads outward. Trees straighten, flowers bloom, and the dark symbols dissolve. The forest is healing! "You did it!" Pip cheers, doing loops in the air.',
      failure: 'The equation resists you. The corruption pulses back. Try again!' },
    reward: { xp: 60, gold: 15 },
    choicesAfter: [
      { id: 'a', text: 'Head to the forest folk village.', next: 'ch3_village' },
      { id: 'b', text: 'Press toward Morvina\'s tower.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_village: {
    chapter: 3, environment: 'village',
    narrative: 'You arrive at a small village nestled in the trees — homes built into massive trunks, connected by rope bridges. The forest folk are small, friendly people with leaf-green skin. Their elder approaches. "Welcome, adventurer. Morvina\'s corruption grows stronger each day. But first — you look weary. Rest, trade, and prepare yourself."',
    shop: true,
    choices: [
      { id: 'a', text: 'Ask the elder about Morvina.', next: 'ch3_morvina_info' },
      { id: 'b', text: 'Explore the forest folk village.', next: 'ch3_explore_village' },
      { id: 'c', text: 'Visit the village potion maker.', next: 'ch3_potion_maker' },
      { id: 'd', text: 'Head straight for Morvina\'s tower.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_explore_village: {
    chapter: 3, environment: 'village',
    narrative: 'The village is charming. Children play on the rope bridges, and a merchant has set up a colorful stall. You notice a puzzle board in the village square — a popular game among the forest folk.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_to_frac', difficulty: 'easy',
      intro: 'The forest folk challenge you to their number puzzle!',
      success: 'The forest folk cheer! "You\'re clever for a tall one!" They give you a small gift.',
      failure: 'Not quite! The forest folk encourage you to try again.' },
    reward: { xp: 25, gold: 15 },
    choicesAfter: [
      { id: 'a', text: 'Ask about Morvina.', next: 'ch3_morvina_info' },
      { id: 'b', text: 'Visit the potion maker.', next: 'ch3_potion_maker' },
      { id: 'c', text: 'Head for Morvina\'s tower.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_potion_maker: {
    chapter: 3, environment: 'village',
    narrative: 'A wizened forest folk woman tends a bubbling cauldron of glowing green liquid. "Ah, the adventurer! I am Willow, keeper of remedies." She gestures at her shelves. "I can brew you something special — but I need help measuring the ingredients. My old eyes aren\'t what they used to be." She holds up a recipe card with precise decimal measurements.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_by_decimal', difficulty: 'medium',
      intro: 'Help Willow measure the precise potion ingredients!',
      success: '"Perfect measurements!" Willow cackles happily. The potion glows bright green, then settles to a warm amber. "This will serve you well against Morvina\'s dark magic."',
      failure: '"Oh dear, that\'s too much firebloom. Let\'s try again carefully."' },
    reward: { xp: 35, items: [{ id: 'great_health_potion', name: 'Great Health Potion', quantity: 1 }] },
    choicesAfter: [
      { id: 'a', text: 'Thank Willow and head for Morvina\'s tower.', next: 'ch3_tower_approach' },
      { id: 'b', text: 'Ask Willow about Morvina.', next: 'ch3_willow_morvina' }
    ]
  },

  ch3_willow_morvina: {
    chapter: 3, environment: 'village',
    narrative: 'Willow\'s face grows somber. "I knew Morvina, once. She came to the forest as a young scholar, full of wonder. She\'d spend hours calculating the growth patterns of trees, the spiral of fern fronds, the mathematics of nature itself." She sighs. "Then she found references to the Numeral Crown. She became... different. Obsessed. She said nature\'s math was \'imperfect\' and she could \'correct\' it." Willow shakes her head. "You can\'t correct a forest. You can only listen to it."',
    reward: { xp: 15 },
    choices: [
      { id: 'a', text: 'I\'ll stop her. Where is her tower?', next: 'ch3_tower_approach' }
    ]
  },

  ch3_morvina_info: {
    chapter: 3, environment: 'village',
    narrative: 'The elder speaks gravely. "Morvina was once a great mathematician and scholar. But she grew obsessed with using numbers to control nature itself. Her tower lies beyond the Whispering Ravine. But beware — the forest around her tower is twisted by dark magic. Nothing there is what it seems." He pauses. "There are two paths: through the ravine, or through the old ruins. The ruins are dangerous, but they contain ancient protections against dark magic."',
    choices: [
      { id: 'a', text: 'I\'ll take the ravine path. Direct is best.', next: 'ch3_tower_approach' },
      { id: 'b', text: 'I\'ll go through the ruins for the extra protection.', next: 'ch3_ruins' }
    ]
  },

  ch3_ruins: {
    chapter: 3, environment: 'ruins',
    narrative: 'Ancient stone ruins rise from the forest floor, covered in moss and vines. Among the crumbling walls, you find a stone tablet with mathematical inscriptions — an ancient puzzle that might reveal a hidden treasure!',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'regroup_decimals', difficulty: 'medium',
      intro: 'Decode the ancient tablet to find the hidden treasure.',
      success: 'A hidden compartment opens in the stone, revealing a stash of gold and a mysterious amulet! The amulet glows with protective energy — it will help shield you from Morvina\'s dark magic.',
      failure: 'The inscriptions are tricky. Keep trying!' },
    reward: { xp: 40, gold: 35 },
    choicesAfter: [
      { id: 'a', text: 'Continue to Morvina\'s tower.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_tower_approach: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'The forest grows darker and more twisted. Trees bend at unnatural angles, and ghostly lights float between the branches. Then you see it — a tall stone tower wreathed in purple mist. But a spectral guardian blocks the entrance, its form shifting and translucent. Pip ducks behind your collar. "That\'s a Forest Wraith! Morvina created it from corrupted forest spirits!"',
    encounter: { type: 'combat', monster: { name: 'Forest Wraith', hp: 28, maxHp: 28, attack: 6, sprite: 'ghost' }, problemTopic: 'decimal_forms', difficulty: 'medium',
      intro: 'The Forest Wraith wails and reaches for you with ghostly hands!',
      success: 'Your attack disrupts the wraith\'s form! It shrieks!',
      failure: 'Spectral claws rake through you — ice cold!' },
    reward: { xp: 80, gold: 20 },
    choicesAfter: [
      { id: 'a', text: 'Search the tower before moving on.', next: 'ch3_tower_interior' },
      { id: 'b', text: 'The wraith is down — press onward!', next: 'ch3_complete' }
    ]
  },

  ch3_tower_interior: {
    chapter: 3, environment: 'library',
    narrative: 'Inside Morvina\'s tower, you find her study — books and papers everywhere, equations scrawled on every wall. Pip examines the notes. "She was trying to calculate a path to the Numeral Crown! It\'s hidden in a dwarven fortress in the Frozen Peaks." You find Morvina\'s personal journal. The early entries are hopeful and kind. The later ones grow darker, more obsessive, the handwriting jagged and desperate. One entry reads: "The Crown will fix everything. It MUST."',
    reward: { xp: 30, gold: 15 },
    choices: [
      { id: 'a', text: 'Take the journal and leave for the Frozen Peaks.', next: 'ch3_complete' }
    ]
  },

  ch3_complete: {
    chapter: 3, environment: 'forest_clearing', chapterComplete: true,
    chapterTitle: 'Chapter 3 Complete: The Enchanted Forest',
    chapterSummary: 'You fought through the corrupted forest and defeated the Forest Wraith guarding Morvina\'s tower. Inside, you found Morvina\'s journal — she has fled north to the Frozen Peaks, seeking an ancient artifact called the Numeral Crown that would amplify her power over mathematics itself. The forest folk are already beginning to heal now that the wraith is gone. But Morvina must be stopped before she reaches the crown!',
    chapterReward: 'Pip gives you an enchanted forest charm for your journey!',
    chapterRewardItem: { slot: 'accessory', name: 'Forest Charm', bonus: 3, effect: 'Boosts all damage by 3' }
  },

  // ============================================================
  // CHAPTER 4: THE FROZEN PEAKS
  // ============================================================
  ch4_start: {
    chapter: 4, environment: 'mountain',
    narrative: 'The wind howls as you climb the mountain path. Snow swirls around you, and ice clings to the rocks. Pip (who insists on coming along, despite the cold, hiding in your collar for warmth) spots something below: a small tavern perched on a cliff, smoke curling from its chimney. "We could warm up and ask for directions," she chatters through frozen wings. Far above, you can see the entrance to an ancient dwarven fortress carved into the peak.',
    choices: [
      { id: 'a', text: 'Stop at the tavern first.', next: 'ch4_tavern' },
      { id: 'b', text: 'Scale the cliff — no time to waste.', next: 'ch4_cliff' },
      { id: 'c', text: 'Investigate the camp in the valley.', next: 'ch4_camp' },
      { id: 'd', text: 'Look for a hidden passage in the rocks.', next: 'ch4_hidden' }
    ]
  },

  ch4_tavern: {
    chapter: 4, environment: 'tavern',
    narrative: 'The Frostbite Inn is a rugged stone building, its walls thick against the mountain wind. Inside, a roaring fire and the smell of spiced cider greet you. The innkeeper, a burly dwarven woman named Helga, eyes you appraisingly. "Another one chasing the fortress, eh? Morvina passed through yesterday — bought every torch and rope we had." A grizzled mountain guide sits by the fire, sipping ale. He looks like he knows these peaks well.',
    choices: [
      { id: 'a', text: 'Talk to the mountain guide.', next: 'ch4_guide' },
      { id: 'b', text: 'Ask Helga about the dwarven fortress.', next: 'ch4_helga' },
      { id: 'c', text: 'Warm up and head out. Time is short.', next: 'ch4_cliff' }
    ]
  },

  ch4_guide: {
    chapter: 4, environment: 'tavern',
    narrative: 'The guide, a weathered man named Kael, nods when you mention the fortress. "Aye, I know three ways up. The cliff face is fastest but dangerous — ice and wind. The hidden tunnel behind the waterfall is safer but longer. And there\'s Bouldar\'s pass — a mountain troll charges a toll, but he\'s fair. Solve his riddle and you go free." He leans forward. "But I\'ll warn you — someone set new traps on the cliff yesterday. Magical ones."',
    reward: { xp: 15 },
    choices: [
      { id: 'a', text: 'Take the cliff face. I\'ll watch for traps.', next: 'ch4_cliff' },
      { id: 'b', text: 'Try Bouldar\'s pass.', next: 'ch4_camp' },
      { id: 'c', text: 'Find the hidden tunnel.', next: 'ch4_hidden' }
    ]
  },

  ch4_helga: {
    chapter: 4, environment: 'tavern',
    narrative: 'Helga polishes a mug thoughtfully. "My ancestors built that fortress a thousand years ago, to guard something precious. The Numeral Crown, they called it — a circlet that could make any calculation perfect, any equation true." She frowns. "But the last dwarven king sealed it away. Said it was too dangerous. \'Numbers should serve the people, not rule them,\' he wrote." She slides you a mug of cider. "Whatever you do up there, adventurer — don\'t let that woman get the Crown."',
    reward: { xp: 20, items: [{ id: 'health_potion', name: 'Health Potion', quantity: 1 }] },
    choices: [
      { id: 'a', text: 'I won\'t. How do I get up there?', next: 'ch4_cliff' },
      { id: 'b', text: 'Is there a safe route?', next: 'ch4_camp' }
    ]
  },

  ch4_cliff: {
    chapter: 4, environment: 'mountain',
    narrative: 'The cliff is treacherous — ice-slicked handholds and howling wind. You need to calculate the right path up, figuring out distances between stable ledges to avoid falling. Morvina has left magical traps on some of the ledges — equations that spark with energy if you step on them wrong.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_div_decimal_quot', difficulty: 'medium',
      intro: 'Calculate the safest climbing route up the frozen cliff.',
      success: 'You find the perfect sequence of handholds, dodging Morvina\'s traps, and pull yourself to the top! The fortress entrance is just ahead.',
      failure: 'Your foot slips! The ice cuts your hands as you catch yourself.' },
    choicesAfter: [
      { id: 'a', text: 'Enter the dwarven fortress.', next: 'ch4_fortress_entrance' }
    ]
  },

  ch4_camp: {
    chapter: 4, environment: 'mountain',
    narrative: 'The camp belongs to a gruff mountain troll named Bouldar. He\'s not hostile — just hungry and cold. "I guard this pass," he rumbles. "Pay the toll or solve my riddle, and I\'ll let you through and tell you a shortcut."',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'estimate_multiply', difficulty: 'medium',
      intro: 'Bouldar the troll poses his riddle — a mathematical challenge!',
      success: '"HAH! Smart little creature!" Bouldar laughs, shaking the snow from the trees. "The shortcut is through the ice cave behind my camp. And here — take this." He tosses you a pouch of gold.',
      failure: '"WRONG! But Bouldar is patient. Try again, little one."' },
    reward: { xp: 45, gold: 30 },
    choicesAfter: [
      { id: 'a', text: 'Take the shortcut through the ice cave.', next: 'ch4_ice_cave' },
      { id: 'b', text: 'Climb the cliff instead.', next: 'ch4_cliff' }
    ]
  },

  ch4_ice_cave: {
    chapter: 4, environment: 'cave',
    narrative: 'The ice cave is breathtaking — walls of translucent blue ice, frozen waterfalls, and icicles that chime like bells in the draft. But the beauty hides danger: the floor is slick, and deep crevasses split the ice. You need to calculate the safe path across a frozen lake where the ice thickness varies.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_by_decimal', difficulty: 'medium',
      intro: 'Calculate which path across the frozen lake is safe — the ice must be thick enough to hold you!',
      success: 'You cross carefully along the thickest ice. On the far side, a tunnel leads straight up into the dwarven fortress!',
      failure: 'CRACK! You step on thin ice and barely jump back in time! Try a different calculation.' },
    choicesAfter: [
      { id: 'a', text: 'Climb up into the fortress.', next: 'ch4_fortress_entrance' }
    ]
  },

  ch4_hidden: {
    chapter: 4, environment: 'cave',
    narrative: 'You spot scratch marks on the rock wall — a hidden door! Inside, a narrow tunnel winds upward. But swarms of bats erupt from the darkness!',
    encounter: { type: 'combat', monster: { name: 'Bat Swarm', hp: 16, maxHp: 16, attack: 4, sprite: 'bat' }, problemTopic: 'regroup_decimals', difficulty: 'medium',
      intro: 'Bats swirl around you in a frenzy!',
      success: 'You drive off the bats with a well-placed strike!',
      failure: 'The bats scratch and bite!' },
    reward: { xp: 35, gold: 10 },
    choicesAfter: [
      { id: 'a', text: 'Continue through the hidden tunnel.', next: 'ch4_fortress_entrance' }
    ]
  },

  ch4_fortress_entrance: {
    chapter: 4, environment: 'castle',
    narrative: 'The ancient dwarven fortress is magnificent even in ruins. Massive stone doors hang ajar, and inside you see halls carved with intricate geometric patterns. Snow has drifted in through cracks in the ceiling. Morvina\'s magical marks glow on the walls — she\'s been here, and recently. You hear echoes from two directions: heavy mechanical grinding to the left, and eerie silence to the right.',
    choices: [
      { id: 'a', text: 'Go left toward the mechanical sounds.', next: 'ch4_armory' },
      { id: 'b', text: 'Go right into the silence.', next: 'ch4_dwarf_ghost' },
      { id: 'c', text: 'Go straight ahead — follow Morvina\'s marks.', next: 'ch4_fortress' }
    ]
  },

  ch4_armory: {
    chapter: 4, environment: 'castle',
    narrative: 'You enter a vast armory. Ancient dwarven war machines line the walls — catapults, crossbows, and strange calculating devices. Most have rusted beyond use, but one device still works: a mechanical equation solver, clicking and whirring. If you can operate it correctly, it might reveal something useful. Beside it, a rack of weapons still gleams despite the centuries.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'place_value', difficulty: 'medium',
      intro: 'Operate the ancient dwarven calculating machine!',
      success: 'The machine clicks to life! It prints out a map showing the Crown\'s vault deep in the mountain — and a shortcut to get there. You also grab a well-preserved dwarven shield from the rack.',
      failure: 'The machine grinds and stalls. Adjust the inputs and try again!' },
    reward: { xp: 45, gold: 20 },
    choicesAfter: [
      { id: 'a', text: 'Follow the map to the vault.', next: 'ch4_fortress' },
      { id: 'b', text: 'Explore more of the fortress.', next: 'ch4_dwarf_ghost' }
    ]
  },

  ch4_dwarf_ghost: {
    chapter: 4, environment: 'castle',
    narrative: 'In a quiet chamber, you find a shimmering blue figure — the ghost of a dwarven smith! He doesn\'t attack. Instead, he looks at you with ancient, weary eyes. "Another living soul. I am Tormund, last smith of Ironhold. I have waited centuries for someone worthy." He gestures to a forge that still glows with spectral fire. "Morvina passed through. She could not answer my challenge, so I barred her from the fastest route. Perhaps you can do better."',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'frac_to_decimal', difficulty: 'medium',
      intro: 'Answer Tormund\'s mathematical challenge to prove your worth!',
      success: 'Tormund smiles — a strange sight on a ghost. "Well done! You understand the beauty of numbers, not just their power." He opens a hidden passage. "This leads directly to the vault. And take this —" He gestures to the forge, where a weapon materializes. "Dwarven steel, the finest ever made."',
      failure: '"Not quite, young one. The dwarves valued precision above all. Try again."' },
    reward: { xp: 55, gold: 25 },
    choicesAfter: [
      { id: 'a', text: 'Take the shortcut to the vault.', next: 'ch4_fortress' },
      { id: 'b', text: 'Check the armory first.', next: 'ch4_armory' }
    ]
  },

  ch4_fortress: {
    chapter: 4, environment: 'castle',
    narrative: 'Deep in the fortress, you reach the Crown vault. Morvina has been here — her dark equations are etched into the vault door, which hangs open. But she\'s left a guardian behind: a massive Stone Golem animated by dark mathematics! Its eyes glow red and equations crawl across its stone body like living things.',
    encounter: { type: 'combat', monster: { name: 'Stone Golem', hp: 40, maxHp: 40, attack: 8, sprite: 'troll' }, problemTopic: 'decimal_by_decimal', difficulty: 'medium',
      intro: 'The Stone Golem\'s eyes glow red as it swings a massive fist!',
      success: 'Cracks spread across the golem\'s stone body! The equations on its surface flicker!',
      failure: 'The golem\'s fist slams into you like a boulder!' },
    reward: { xp: 150, gold: 50 },
    nextChapter: true,
    choicesAfter: [
      { id: 'a', text: 'Search the vault for the Numeral Crown.', next: 'ch4_complete' }
    ]
  },

  ch4_complete: {
    chapter: 4, environment: 'castle', chapterComplete: true,
    chapterTitle: 'Chapter 4 Complete: The Frozen Peaks',
    chapterSummary: 'You destroyed Morvina\'s Stone Golem and explored the dwarven fortress. The Numeral Crown is gone — Morvina took it deeper into the mountain, to a place the dwarves called the Dragon\'s Lair. Ancient texts warn that a young dragon has made its home there, drawn by the Crown\'s power. You must venture into the depths before Morvina uses the Crown to bend all of mathematics to her will!',
    chapterReward: 'You found ancient dwarven armor in the fortress!',
    chapterRewardItem: { slot: 'armor', name: 'Dwarven Plate Armor', bonus: 5 }
  },

  // ============================================================
  // CHAPTER 5: THE DRAGON'S LAIR
  // ============================================================
  ch5_start: {
    chapter: 5, environment: 'dungeon_corridor',
    narrative: 'The deepest passages of the mountain are lit by veins of glowing crystal. The air is hot — dragon-hot. You can feel the power of the Numeral Crown pulsing somewhere ahead. Pip emerges from your collar, her glow flickering nervously. "This is it, isn\'t it? The final challenge." She straightens up bravely. "Let\'s go." Down a long stairway, you hear two sounds: Morvina\'s chanting... and the deep, rumbling breath of a dragon.',
    choices: [
      { id: 'a', text: 'Charge down the stairs — no time to waste!', next: 'ch5_charge' },
      { id: 'b', text: 'Move carefully, checking for traps.', next: 'ch5_careful' },
      { id: 'c', text: 'Search for another way into the lair.', next: 'ch5_alternate' },
      { id: 'd', text: 'Stop and think. What do we know about Morvina and the dragon?', next: 'ch5_plan' }
    ]
  },

  ch5_plan: {
    chapter: 5, environment: 'dungeon_corridor',
    narrative: 'You take a moment to think. Pip counts off what you know: "Morvina is a scholar, not a warrior. The Crown amplifies mathematical power. The dragon, Calcifex, has lived here for centuries — he\'s ancient and intelligent." She pauses. "What if... Morvina can\'t actually CONTROL the dragon? What if the Crown just lets her COMMUNICATE with it?" That changes things. Maybe the dragon can be reasoned with.',
    reward: { xp: 20 },
    choices: [
      { id: 'a', text: 'Good thinking. Let\'s still be careful going in.', next: 'ch5_careful' },
      { id: 'b', text: 'Even better reason to hurry — stop Morvina before she convinces the dragon.', next: 'ch5_charge' },
      { id: 'c', text: 'Find a back way in so we can observe before acting.', next: 'ch5_alternate' }
    ]
  },

  ch5_charge: {
    chapter: 5, environment: 'dungeon_corridor',
    narrative: 'You rush down the stairs — and a magical trap springs! Runes on the floor blaze with energy! Morvina has been laying defenses.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'place_value', difficulty: 'hard',
      intro: 'Solve the rune trap before it explodes!',
      success: 'You crack the rune code and the trap fizzles out! Morvina\'s defenses are weakening!',
      failure: 'The trap zaps you with a bolt of magical energy!' },
    choicesAfter: [
      { id: 'a', text: 'Continue toward the lair.', next: 'ch5_antechamber' }
    ]
  },

  ch5_careful: {
    chapter: 5, environment: 'dungeon_corridor',
    narrative: 'Your caution pays off — you spot a magical trap on the third step and carefully disarm it. Past the trap, you find a skeleton clutching a powerful health potion and a tattered journal. The journal belongs to another adventurer who came here decades ago. Their last entry reads: "The dragon is not evil. It guards the Crown because it UNDERSTANDS mathematics. It chose to protect the Crown from those who would misuse it."',
    reward: { xp: 20, items: [{ id: 'great_health_potion', name: 'Great Health Potion', quantity: 1 }] },
    choices: [
      { id: 'a', text: 'Interesting. The dragon might be an ally. Proceed to the lair.', next: 'ch5_antechamber' },
      { id: 'b', text: 'Check for more useful information nearby.', next: 'ch5_crown_history' }
    ]
  },

  ch5_crown_history: {
    chapter: 5, environment: 'library',
    narrative: 'Near the skeleton, you find a small chamber carved with the history of the Numeral Crown. Ancient murals show dwarven mathematicians creating the Crown to solve impossible problems. But the Crown became addictive — those who wore it couldn\'t stop calculating, couldn\'t stop optimizing, couldn\'t stop "fixing" the world. The dwarves sealed it away and entrusted Calcifex, the wisest creature they knew, to guard it.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'decimal_to_frac', difficulty: 'hard',
      intro: 'Decipher the ancient mathematical murals to learn the Crown\'s weakness.',
      success: 'You understand now: the Crown can be neutralized by solving its core equation — the mathematical proof at its heart. If you can do that, the Crown becomes inert. Knowledge is your greatest weapon here.',
      failure: 'The ancient notation is complex. Study it more carefully.' },
    reward: { xp: 50 },
    choicesAfter: [
      { id: 'a', text: 'Armed with knowledge, enter the lair.', next: 'ch5_antechamber' }
    ]
  },

  ch5_alternate: {
    chapter: 5, environment: 'cave',
    narrative: 'You find a narrow ventilation shaft that leads into the lair from above. But a nest of fire bats guards the passage!',
    encounter: { type: 'combat', monster: { name: 'Fire Bat Colony', hp: 20, maxHp: 20, attack: 5, sprite: 'bat' }, problemTopic: 'estimate_divide', difficulty: 'medium',
      intro: 'Fire bats swoop at you with flaming wings!',
      success: 'You swat the bats aside and clear the passage!',
      failure: 'Searing heat scorches you!' },
    reward: { xp: 45, gold: 15 },
    choicesAfter: [
      { id: 'a', text: 'Drop down into the lair from above.', next: 'ch5_above' }
    ]
  },

  ch5_above: {
    chapter: 5, environment: 'cave',
    narrative: 'From your elevated position, you can see the entire lair below. The cavern is vast and filled with gold. Morvina stands before the dragon, the Numeral Crown floating between them. She\'s arguing with Calcifex! "Give me the Crown\'s power willingly, beast, or I will TAKE it!" The dragon rumbles: "You do not understand what you ask." This is your chance to intervene — from a position of advantage.',
    choices: [
      { id: 'a', text: 'Drop down and confront Morvina directly.', next: 'ch5_antechamber' },
      { id: 'b', text: 'Call out to the dragon — try to warn it.', next: 'ch5_dragon_parley' }
    ]
  },

  ch5_antechamber: {
    chapter: 5, environment: 'dungeon_corridor',
    narrative: 'You enter a grand antechamber. Morvina stands at the far end, the Numeral Crown hovering above her outstretched hands. Purple energy crackles between her and the crown. "Fool!" she hisses. "You\'re too late! With this crown, I can rewrite the rules of mathematics itself — I will control ALL numbers!" She sends a wave of dark energy at you!',
    encounter: { type: 'combat', monster: { name: 'Morvina the Sorceress', hp: 35, maxHp: 35, attack: 7, sprite: 'ghost' }, problemTopic: 'frac_to_decimal', difficulty: 'hard',
      intro: 'Morvina hurls bolts of mathematical chaos at you!',
      success: 'Your attack breaks through her shield! She staggers back!',
      failure: 'Dark equations swirl and strike you!' },
    reward: { xp: 100, gold: 30 },
    choicesAfter: [
      { id: 'a', text: 'Press forward to the dragon\'s chamber!', next: 'ch5_dragon_choice' }
    ]
  },

  ch5_dragon_choice: {
    chapter: 5, environment: 'cave',
    narrative: 'Morvina stumbles backward into the final chamber — a vast cavern filled with gold and gems. And there, coiled atop the treasure hoard, is the dragon: CALCIFEX, the Number Drake! Its scales shimmer with embedded numerals, and mathematical equations float in its breath like embers. Morvina scrambles behind the dragon. "Destroy the adventurer!" she screams. But Calcifex ignores her, fixing its ancient, intelligent eyes on YOU. "I have guarded the Crown for a thousand years," it rumbles. "I have a question for you, small one. Will you answer — or will you fight?"',
    choices: [
      { id: 'a', text: 'I\'ll answer your question, Calcifex.', next: 'ch5_dragon_parley' },
      { id: 'b', text: 'Draw your weapon. You can\'t trust a dragon.', next: 'ch5_dragon' }
    ]
  },

  ch5_dragon_parley: {
    chapter: 5, environment: 'cave',
    narrative: 'Calcifex lowers its massive head to your level. Its breath is warm but not hostile. "I have watched mortals come for the Crown for centuries. They all want its power. So tell me: if the Crown can make any equation true, and you could change one mathematical truth about the world — what would you change?" Pip whispers from your collar: "I think this is a trick question..." Morvina screams: "Don\'t listen to it! FIGHT!"',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_by_decimal', difficulty: 'hard',
      intro: 'Calcifex poses a final mathematical challenge to test your wisdom.',
      success: 'Calcifex stares at you for a long moment, then slowly nods. "You understand. Mathematics is not a tool for control — it is a language for understanding." The dragon turns to Morvina. "THIS one is worthy. You are not." Morvina screams in fury and attacks — but Calcifex swats her aside with one massive wing. She crashes against the wall, the dark energy leaving her.',
      failure: 'Calcifex rumbles. "Think more carefully. Numbers are not about power."' },
    reward: { xp: 200, gold: 75 },
    choicesAfter: [
      { id: 'a', text: 'Approach the Numeral Crown.', next: 'ch5_crown' }
    ]
  },

  ch5_dragon: {
    chapter: 5, environment: 'cave',
    narrative: 'You draw your weapon. Calcifex sighs — a sound like a furnace door opening. "So be it. Another who chooses force over understanding." The dragon rears back, and mathematical equations blaze to life across its scales. "If you cannot prove your worth with wisdom, you will prove it with strength!" Morvina cackles as Calcifex attacks!',
    encounter: { type: 'combat', monster: { name: 'Calcifex the Number Drake', hp: 60, maxHp: 60, attack: 10, sprite: 'dragon' }, problemTopic: 'decimal_by_decimal', difficulty: 'hard',
      intro: 'Calcifex rears back and breathes a stream of mathematical fire!',
      success: 'Your attack hits the dragon! Numbers scatter from its scales like sparks!',
      failure: 'The dragon\'s tail sweeps you off your feet!' },
    reward: { xp: 250, gold: 100 },
    choicesAfter: [
      { id: 'a', text: 'Claim the Numeral Crown!', next: 'ch5_crown' }
    ]
  },

  ch5_crown: {
    chapter: 5, environment: 'cave',
    narrative: 'The Numeral Crown hovers before you, pulsing with pure mathematical energy. You can feel its pull — the promise of perfect calculation, absolute precision, total control over numbers. Morvina, weakened, watches from the corner. "Put it on," she whispers. "You\'ve earned it. Feel its power." Pip tugs your ear. "Don\'t! Remember what it did to her — what it did to the dwarves!"',
    choices: [
      { id: 'a', text: 'Put on the Crown. I\'m strong enough to control it.', next: 'ch5_crown_wear' },
      { id: 'b', text: 'Destroy the Crown. It\'s too dangerous for anyone.', next: 'ch5_crown_destroy' },
      { id: 'c', text: 'Give the Crown back to Calcifex. He\'s guarded it well.', next: 'ch5_crown_return' }
    ]
  },

  ch5_crown_wear: {
    chapter: 5, environment: 'cave',
    narrative: 'You place the Crown on your head. Power floods through you — equations spiral through your mind, patterns emerge in everything, the mathematical structure of reality itself becomes visible. It\'s... overwhelming. Beautiful. Terrifying. You could do anything. Fix anything. Control anything. Then you hear Pip\'s voice, very small: "Please. Come back." You look at your hands — dark equations are crawling up your arms, just like Morvina\'s. You understand now. The Crown doesn\'t give you power over math. Math takes power over YOU.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_div_decimal_quot', difficulty: 'hard',
      intro: 'Fight the Crown\'s control! Solve the equation at the heart of its power to break free!',
      success: 'With a tremendous effort of will, you tear the Crown from your head! It clatters to the ground, its glow fading. You stood at the edge of the abyss and stepped back. That takes more strength than any battle.',
      failure: 'The Crown tightens its grip on your mind. Focus! You are more than numbers!' },
    choicesAfter: [
      { id: 'a', text: 'Destroy the Crown. No one should have this power.', next: 'ch5_crown_destroy' },
      { id: 'b', text: 'Give it to Calcifex for safekeeping.', next: 'ch5_crown_return' }
    ]
  },

  ch5_crown_destroy: {
    chapter: 5, environment: 'cave',
    narrative: 'You raise the Crown high and bring it down against the stone floor. It shatters in a burst of golden light! Mathematical equations swirl through the air like fireflies, then dissolve. Calcifex rumbles approvingly. "Wise choice, small one. Some tools are too dangerous to exist." Morvina sobs quietly — not for the Crown, but for the person she used to be. "I\'m sorry," she whispers. "I got so lost in the numbers, I forgot what they were for." Pip pats Morvina\'s hand gently.',
    reward: { xp: 150, gold: 50 },
    choices: [
      { id: 'a', text: 'It\'s over. Time to go home.', next: 'ch5_complete' }
    ]
  },

  ch5_crown_return: {
    chapter: 5, environment: 'cave',
    narrative: 'You hold the Crown up to Calcifex. The dragon carefully takes it in one massive claw. "You are the first in a thousand years to come this far and choose wisdom over power." His eyes glow warmly. "I will guard it for another thousand years. And I will remember your name." He places a single scale in your hand — it shimmers with faint equations. "A gift. Not power — just a reminder that you earned a dragon\'s respect." Morvina watches, tears in her eyes. "I wanted to be like you," she says quietly. "I wanted to be the one who chose right."',
    reward: { xp: 200, gold: 75 },
    choices: [
      { id: 'a', text: 'Offer Morvina a second chance.', next: 'ch5_morvina_redemption' },
      { id: 'b', text: 'Head home. Your quest is complete.', next: 'ch5_complete' }
    ]
  },

  ch5_morvina_redemption: {
    chapter: 5, environment: 'cave',
    narrative: '"You could use your brilliance to help people again," you tell Morvina. "The forest folk need a mathematician. The village of Numeria could use a teacher." Morvina stares at you, stunned. Then, slowly, she nods. "I... I would like that. I remember when numbers made people smile, not tremble." Pip cheers. Even Calcifex rumbles something that might be a laugh. "Take her," the dragon says. "Perhaps she will prove worthy of a second chance."',
    reward: { xp: 50 },
    choices: [
      { id: 'a', text: 'Lead Morvina home. The quest is truly complete.', next: 'ch5_complete' }
    ]
  },

  ch5_complete: {
    chapter: 5, environment: 'village', chapterComplete: true,
    chapterTitle: 'Chapter 5 Complete: The Dragon\'s Lair',
    chapterSummary: 'Your quest is complete! You journeyed from the humble village of Numeria through goblin tunnels, enchanted forests, and frozen peaks to confront the power of the Numeral Crown. Along the way, you proved that true mathematical mastery isn\'t about controlling numbers — it\'s about understanding them. The village celebrates your return. The forest heals. And somewhere deep in the mountains, Calcifex the Number Drake smiles. But whispers tell of new realms beyond the horizon, where even greater mathematical adventures await...',
    chapterReward: 'You earned the title: Champion of Mathematica! Your legend has only just begun...'
  }
};

// Get the starting node for a chapter
function getChapterStart(chapterNum) {
  return 'ch' + chapterNum + '_start';
}

// Get all nodes for a chapter
function getChapterNodes(chapterNum) {
  const prefix = 'ch' + chapterNum + '_';
  return Object.keys(STORY).filter(k => k.startsWith(prefix));
}
