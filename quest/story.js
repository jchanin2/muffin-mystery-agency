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
      { id: 'c', text: 'Show me the last wagon they attacked. I want to look for clues.', next: 'ch1_clues' }
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
    narrative: 'You sprint after the fleeing goblins through the moonlit forest. Branches whip past your face as you follow the sound of their panicked chatter. The trail leads to a hillside cave — their hideout!',
    choices: [
      { id: 'a', text: 'Charge straight in.', next: 'ch1_cave_enter' },
      { id: 'b', text: 'Scout around for another entrance.', next: 'ch1_cave_enter' }
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
    narrative: 'You press your ear against the cold stone. From the main tunnel, you hear goblin chatter and the clink of metal. From the side passage, you hear... nothing. Silence. Which is somehow more unsettling.',
    choices: [
      { id: 'a', text: 'Go toward the goblin sounds — face them head-on.', next: 'ch2_main_tunnel' },
      { id: 'b', text: 'Take the silent passage — the unknown calls to you.', next: 'ch2_rune_passage' }
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
      { id: 'a', text: 'Enter the hidden passage.', next: 'ch2_deep' }
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
      { id: 'b', text: 'Search the spider\'s nest for treasure.', next: 'ch2_nest' }
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

  ch2_skeleton: {
    chapter: 2, environment: 'dungeon_corridor',
    narrative: 'You reach a vast underground hall. Pillars carved with mathematical symbols line the sides. At the far end, a figure in tattered robes stands motionless — a Skeleton Mage! Its empty eye sockets flare with green fire as it raises a bony hand. "You seek the master? You must prove your worth first!" Bones rattle as skeletal warriors rise from the ground!',
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
      { id: 'c', text: 'Ignore it and follow the path deeper into the forest.', next: 'ch3_path' }
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
      { id: 'a', text: 'Follow Pip to the forest folk village.', next: 'ch3_village' }
    ]
  },

  ch3_path: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'The forest path twists and turns between ancient trees. You spot a wolf prowling between the shadows, its yellow eyes fixed on you. It snarls and leaps!',
    encounter: { type: 'combat', monster: { name: 'Forest Wolf', hp: 18, maxHp: 18, attack: 5, sprite: 'wolf' }, problemTopic: 'estimate_multiply', difficulty: 'easy',
      intro: 'A wild wolf attacks!',
      success: 'You strike the wolf! It yelps and staggers!',
      failure: 'The wolf bites at you!' },
    reward: { xp: 40, gold: 5 },
    choicesAfter: [
      { id: 'a', text: 'Continue deeper into the forest.', next: 'ch3_village' },
      { id: 'b', text: 'Explore the strange ruins nearby.', next: 'ch3_ruins' }
    ]
  },

  ch3_village: {
    chapter: 3, environment: 'village',
    narrative: 'You arrive at a small village nestled in the trees — homes built into massive trunks, connected by rope bridges. The forest folk are small, friendly people with leaf-green skin. Their elder approaches. "Welcome, adventurer. Morvina\'s corruption grows stronger each day. But first — you look weary. Rest, trade, and prepare yourself."',
    shop: true,
    choices: [
      { id: 'a', text: 'Ask the elder about Morvina.', next: 'ch3_morvina_info' },
      { id: 'b', text: 'Explore the forest folk village.', next: 'ch3_explore_village' },
      { id: 'c', text: 'Head straight for Morvina\'s tower.', next: 'ch3_tower_approach' }
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
      { id: 'b', text: 'Head for Morvina\'s tower.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_morvina_info: {
    chapter: 3, environment: 'village',
    narrative: 'The elder speaks gravely. "Morvina was once a great mathematician and scholar. But she grew obsessed with using numbers to control nature itself. Her tower lies beyond the Whispering Ravine. But beware — the forest around her tower is twisted by dark magic. Nothing there is what it seems."',
    choices: [
      { id: 'a', text: 'I\'m ready. Lead me to the ravine.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_ruins: {
    chapter: 3, environment: 'ruins',
    narrative: 'Ancient stone ruins rise from the forest floor, covered in moss and vines. Among the crumbling walls, you find a stone tablet with mathematical inscriptions — an ancient puzzle that might reveal a hidden treasure!',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'regroup_decimals', difficulty: 'medium',
      intro: 'Decode the ancient tablet to find the hidden treasure.',
      success: 'A hidden compartment opens in the stone, revealing a stash of gold and a mysterious amulet!',
      failure: 'The inscriptions are tricky. Keep trying!' },
    reward: { xp: 40, gold: 35 },
    choicesAfter: [
      { id: 'a', text: 'Head toward Morvina\'s tower.', next: 'ch3_tower_approach' }
    ]
  },

  ch3_tower_approach: {
    chapter: 3, environment: 'forest_clearing',
    narrative: 'The forest grows darker and more twisted. Trees bend at unnatural angles, and ghostly lights float between the branches. Then you see it — a tall stone tower wreathed in purple mist. But a spectral guardian blocks the entrance, its form shifting and translucent.',
    encounter: { type: 'combat', monster: { name: 'Forest Wraith', hp: 28, maxHp: 28, attack: 6, sprite: 'ghost' }, problemTopic: 'decimal_forms', difficulty: 'medium',
      intro: 'The Forest Wraith wails and reaches for you with ghostly hands!',
      success: 'Your attack disrupts the wraith\'s form! It shrieks!',
      failure: 'Spectral claws rake through you — ice cold!' },
    reward: { xp: 80, gold: 20 },
    nextChapter: true,
    choicesAfter: [
      { id: 'a', text: 'Enter Morvina\'s tower.', next: 'ch3_complete' }
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
    narrative: 'The wind howls as you climb the mountain path. Snow swirls around you, and ice clings to the rocks. Far above, you can see the entrance to an ancient dwarven fortress carved into the peak — where the Numeral Crown is said to be hidden. But the path forks: one way climbs a treacherous cliff face, the other descends into a valley where smoke rises from what might be a camp.',
    choices: [
      { id: 'a', text: 'Scale the cliff — the direct route.', next: 'ch4_cliff' },
      { id: 'b', text: 'Investigate the camp in the valley.', next: 'ch4_camp' },
      { id: 'c', text: 'Look for a hidden passage in the rocks.', next: 'ch4_hidden' }
    ]
  },

  ch4_cliff: {
    chapter: 4, environment: 'mountain',
    narrative: 'The cliff is treacherous — ice-slicked handholds and howling wind. You need to calculate the right path up, figuring out distances between stable ledges to avoid falling.',
    encounter: { type: 'puzzle', monster: null, problemTopic: 'whole_div_decimal_quot', difficulty: 'medium',
      intro: 'Calculate the safest climbing route up the frozen cliff.',
      success: 'You find the perfect sequence of handholds and pull yourself to the top! The fortress entrance is just ahead.',
      failure: 'Your foot slips! The ice cuts your hands as you catch yourself.' },
    choicesAfter: [
      { id: 'a', text: 'Enter the dwarven fortress.', next: 'ch4_fortress' }
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
      { id: 'a', text: 'Take the shortcut through the ice cave.', next: 'ch4_fortress' },
      { id: 'b', text: 'Climb the cliff instead.', next: 'ch4_cliff' }
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
      { id: 'a', text: 'Continue through the hidden tunnel.', next: 'ch4_fortress' }
    ]
  },

  ch4_fortress: {
    chapter: 4, environment: 'castle',
    narrative: 'The ancient dwarven fortress is magnificent even in ruins. Massive stone doors hang ajar, and inside you see halls carved with intricate geometric patterns. Morvina has been here — you see her magical marks on the walls. But she\'s left a guardian behind: a massive Stone Golem animated by dark mathematics!',
    encounter: { type: 'combat', monster: { name: 'Stone Golem', hp: 40, maxHp: 40, attack: 8, sprite: 'troll' }, problemTopic: 'decimal_by_decimal', difficulty: 'medium',
      intro: 'The Stone Golem\'s eyes glow red as it swings a massive fist!',
      success: 'Cracks spread across the golem\'s stone body! It\'s weakening!',
      failure: 'The golem\'s fist slams into you like a boulder!' },
    reward: { xp: 150, gold: 50 },
    nextChapter: true,
    choicesAfter: [
      { id: 'a', text: 'Search the fortress for the Numeral Crown.', next: 'ch4_complete' }
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
    narrative: 'The deepest passages of the mountain are lit by veins of glowing crystal. The air is hot — dragon-hot. You can feel the power of the Numeral Crown pulsing somewhere ahead. This is it. The final challenge. Down a long stairway, you hear two sounds: Morvina\'s chanting... and the deep, rumbling breath of a dragon.',
    choices: [
      { id: 'a', text: 'Charge down the stairs — no time to waste!', next: 'ch5_charge' },
      { id: 'b', text: 'Move carefully, checking for traps.', next: 'ch5_careful' },
      { id: 'c', text: 'Search for another way into the lair.', next: 'ch5_alternate' }
    ]
  },

  ch5_charge: {
    chapter: 5, environment: 'dungeon_corridor',
    narrative: 'You rush down the stairs — and a magical trap springs! Runes on the floor blaze with energy!',
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
    narrative: 'Your caution pays off — you spot a magical trap on the third step and carefully disarm it. Past the trap, you find a skeleton clutching a powerful health potion. Lucky find!',
    reward: { xp: 20, items: [{ id: 'great_health_potion', name: 'Great Health Potion', quantity: 1 }] },
    choices: [
      { id: 'a', text: 'Proceed to the lair.', next: 'ch5_antechamber' }
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
      { id: 'a', text: 'Drop down into the lair from above.', next: 'ch5_antechamber' }
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
      { id: 'a', text: 'Press forward before she can use the Crown!', next: 'ch5_dragon' }
    ]
  },

  ch5_dragon: {
    chapter: 5, environment: 'cave',
    narrative: 'Morvina stumbles backward into the final chamber — a vast cavern filled with gold and gems. And there, coiled atop the treasure hoard, is the dragon: CALCIFEX, the Number Drake! Its scales shimmer with embedded numerals, and mathematical equations float in its breath like embers. Morvina screams and flees as the dragon rises, fixing its ancient eyes on YOU. "Another seeker of the Crown," it rumbles. "Prove your mastery of numbers, or become ash."',
    encounter: { type: 'combat', monster: { name: 'Calcifex the Number Drake', hp: 60, maxHp: 60, attack: 10, sprite: 'dragon' }, problemTopic: 'decimal_by_decimal', difficulty: 'hard',
      intro: 'Calcifex rears back and breathes a stream of mathematical fire!',
      success: 'Your attack hits the dragon! Numbers scatter from its scales like sparks!',
      failure: 'The dragon\'s tail sweeps you off your feet!' },
    reward: { xp: 250, gold: 100 },
    choicesAfter: [
      { id: 'a', text: 'Claim the Numeral Crown!', next: 'ch5_complete' }
    ]
  },

  ch5_complete: {
    chapter: 5, environment: 'cave', chapterComplete: true,
    chapterTitle: 'Chapter 5 Complete: The Dragon\'s Lair',
    chapterSummary: 'You defeated Calcifex the Number Drake and claimed the Numeral Crown! With its power contained, the dark mathematics that corrupted the forest and empowered the goblins fades away. Morvina, stripped of her stolen power, surrenders and promises to use her knowledge for good. You return to Numeria as a legendary hero — the one who mastered the Realms of Mathematica! But whispers tell of new realms beyond the mountains, where greater mathematical challenges await...',
    chapterReward: 'You earned the legendary Numeral Crown! Your quest is complete — for now...'
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
