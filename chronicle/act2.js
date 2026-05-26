// ======================================================
// act2.js — Act II: "The Fractured Isles"
// ======================================================

const Act2 = {

  // ---------- Opening cutscene ----------
  beginOpening() {
    const hero = Game.hero;
    Cutscene.play([
      {
        illustrationId: 'lysaraStudy',
        speaker: 'Lysara',
        text: '<p>"The next page is somewhere very wet." Lysara unrolls a sea-chart over the desk, and a small painted ship slides three inches south. "Whitehaven. A fishing port. From there you sail to the <em>Fractured Isles</em> — an archipelago that has, in the last three months, begun to <em>come apart</em>."</p>' +
              '<p>"Fishermen who go out come back with half their catch — and I mean literally <em>halves</em> of fish. A boy from Whitehaven brought home a third of his shoe. The mayor sent for me a week ago. I have a hunch the page fell into the deepest channel, and woke up something old."</p>'
      },
      {
        illustrationId: 'lysaraStudy',
        speaker: 'Lysara',
        text: '<p>"You will need a sailor. I have already sent for one. Her name is <em>Mira Wavekeel</em> — half-elf, raised on the docks, missing a crew she will not speak of. She is at the port now, on a small ship called the <em>Codex-Wake</em>. She will know you on sight."</p>' +
              '<p>"Bring me the page, ' + hero.name + '. And try to bring back the sea while you are at it."</p>'
      },
      {
        illustrationId: 'portWhitehaven',
        speaker: '',
        text: '<p>Two days south on the King\'s Road, then a half-day on a mule-cart, and the smell of salt finds you first. Whitehaven\'s harbor opens beneath you — a narrow crescent of pale stone and warm light, a lighthouse on a cliff, fishing boats bobbing in the swell.</p>' +
              '<p>At the end of the pier, a small two-mast ship is being readied for sea. Painted on its hull, in bold red: <em>Codex-Wake</em>.</p>'
      },
      {
        illustrationId: 'codexWake',
        speaker: 'Mira Wavekeel',
        text: '<p>A wiry half-elf in a salt-streaked leather jacket leaps down from the rigging and lands beside you. Red bandana, sea-green eyes, a brass sextant on a cord around her neck.</p>' +
              '<p>"You\'re ' + hero.name + '. Lysara wrote ahead. Welcome aboard the Codex-Wake — she\'s small but she\'s mine. The Isles are five hours sail south. Three of them: <em>Halves, Thirds, Pieces</em>. We can hit any of them first, in any order. The page is at the bottom of the Reef beyond, but we can\'t reach it until we\'ve cleared the way."</p>' +
              '<p>"I lost half my old crew to the Isles. I want them back, or I want the thing that took them. Either way works. Are you in?"</p>'
      }
    ], () => {
      Game.hero.questNode = 'port_hub_first';
      Game.hero.flags.miraBound = true;
      Game.hero.currentAct = 2;
      // Mira appears as a companion — record her flags
      Game.hero.flags.islesCompleted = { halves: false, thirds: false, pieces: false };
      Inventory.add(Game.hero, 'minor_potion', 2);
      Inventory.add(Game.hero, 'smoked_kipper', 1);
      UI.toast('Mira joins your crew. (+1 Insight while she is with you.)');
      Game.save();
      Act2.openPortHub();
    });
  },

  // ---------- Port Hub ----------
  openPortHub() {
    const hero = Game.hero;
    Game.refreshHubChrome();
    document.getElementById('hub-illustration').innerHTML = Art.portWhitehaven();
    const list = document.getElementById('hub-locations');
    list.innerHTML = '';
    this._currentLocations().forEach(loc => {
      const btn = document.createElement('button');
      btn.className = 'hub-location-btn';
      btn.innerHTML = '<span class="hub-location-name">' + loc.name + '</span>' +
                      '<span class="hub-location-desc">' + loc.desc + '</span>' +
                      (loc.badge ? '<span class="hub-location-badge">' + loc.badge + '</span>' : '');
      btn.disabled = !!loc.disabled;
      btn.addEventListener('click', loc.action);
      list.appendChild(btn);
    });
    document.getElementById('hub-quest-text').textContent = this._currentQuestText();
    showScreen('hub');
    Game.save();
  },

  _currentQuestText() {
    const node = Game.hero.questNode;
    const isles = Game.hero.flags.islesCompleted || {};
    const done = (isles.halves ? 1 : 0) + (isles.thirds ? 1 : 0) + (isles.pieces ? 1 : 0);
    if (node === 'port_hub_first') return 'Board the Codex-Wake when you\'re ready — choose an island to investigate.';
    if (node === 'act2_complete') return 'Act II complete. Return to Lysara to begin Act III.';
    if (done >= 3) return 'All three isles cleared. Sail to the Sunken Reef and face the Half-King.';
    return 'Islands cleared: ' + done + ' of 3. Pick the next island to investigate.';
  },

  _currentLocations() {
    const hero = Game.hero;
    const node = hero.questNode;
    const locs = [];
    locs.push({
      name: 'The Salt-Worn Sign',
      desc: 'Goren\'s tavern. Smoked kipper, gossip, supplies.',
      action: () => Act2.enterTavern()
    });
    locs.push({
      name: 'Net-Mender\'s Shed',
      desc: 'Aunt Gull\'s shop. Sea-charms, jerkins, and pearled wonders.',
      action: () => Act2.enterShed()
    });
    locs.push({
      name: 'Mira\'s Boat — Codex-Wake',
      desc: 'The deck of your ship. Sail to one of the Fractured Isles.',
      badge: node === 'port_hub_first' ? 'SAIL' : null,
      action: () => Act2.openIsleMap()
    });
    locs.push({
      name: 'Lysara\'s Sending Stone',
      desc: 'A river-stone Lysara enchanted. Speak with her remotely.',
      action: () => Act2.sendingStone()
    });
    locs.push({
      name: 'Training Tide-Pool',
      desc: 'A still pool behind the lighthouse. Practice your weakest topic.',
      action: () => Act1.enterTraining()
    });
    locs.push({
      name: 'Character Sheet',
      desc: 'Inspect your stats, equipment, inventory, and mastery.',
      action: () => Game.openCharacterSheet()
    });
    if (node === 'act2_complete') {
      locs.push({
        name: 'Return to Numeria (King\'s Road)',
        desc: 'Two days north, back to Lysara\'s Tower. Time to begin Act III.',
        badge: 'ACT III',
        action: () => { Game.hero.currentAct = 1; Game.hero.questNode = 'act2_complete'; Game.save(); Act1.openTownHub(); }
      });
    }
    return locs;
  },

  enterTavern() {
    Story.show({
      illustration: 'saltWornInterior',
      speaker: 'Goren Saltbeard',
      text: '<p>The Salt-Worn Sign is warm with the smell of pipe-smoke and brine-fish. Goren leans on the bar — a barrel-chested human with weather-cracked hands and a beard the color of a dirty seagull.</p>' +
            '<p>"Word travels fast in a port like this. You\'re the one Mira\'s taking out to the Isles. Brave or stupid, can\'t tell yet. Sit down. Have a kipper. I\'ll sell you what you need."</p>',
      choices: [
        { text: 'Browse Goren\'s shelf.', go: () => Shop.open('goren_salt_worn', () => Act2.enterTavern()) },
        { text: 'Ask Goren about the Isles.', go: () => Act2._gorenLore() },
        { text: 'Leave.', go: () => Act2.openPortHub() }
      ]
    });
  },

  _gorenLore() {
    Story.show({
      illustration: 'saltWornInterior',
      speaker: 'Goren Saltbeard',
      text: '<p>He scratches his beard. "Three islands out there. Used to be one, when I was a boy — one big island we called The Whole. Now there\'s Halves, Thirds, and Pieces, and the channels between them get wider every spring tide."</p>' +
            '<p>"Mira lost her crew to the Pieces — they sailed there four months back. She doesn\'t talk about it. Don\'t ask her about it on the boat. Wait till she brings it up."</p>' +
            '<p>"As for the <em>Half-King</em> — well. He\'s in the channel, in the deep dark. He takes a piece of everything he sees. A piece of a sail. A piece of a man. A piece of a song. He gives back nothing. So go down with your numbers sharp."</p>',
      choices: [
        { text: 'Browse Goren\'s shelf.', go: () => Shop.open('goren_salt_worn', () => Act2.enterTavern()) },
        { text: 'Leave.', go: () => Act2.openPortHub() }
      ]
    });
  },

  enterShed() {
    Story.show({
      illustration: 'portWhitehaven',
      speaker: 'Aunt Gull',
      text: '<p>The net-mender\'s shed smells of tar and seaweed. Aunt Gull, Mira\'s great-aunt, sits on a stool surrounded by drying nets, mending with hands that have been doing this for sixty years.</p>' +
            '<p>"My grand-niece picked a fierce road. You watch out for her on those rocks, hear? Now. What do you need? I keep what the sea sends back."</p>',
      choices: [
        { text: 'Browse Gull\'s shelf.', go: () => Shop.open('netmender_shed', () => Act2.enterShed()) },
        { text: 'Leave.', go: () => Act2.openPortHub() }
      ]
    });
  },

  sendingStone() {
    const top = Engine.weakestTopics(Game.hero, 3)[0];
    let line;
    if (top) {
      const t = (TOPICS[top.topic] || {name: top.topic}).name;
      line = '<p>"You are getting tested, friend. Your <em>' + t + '</em> is the shakiest of your skills — about ' + Math.round(top.pct) + '%. Pop over to the tide-pool when you can. Five drills, and I think you\'ll see it."</p>';
    } else {
      line = '<p>"You haven\'t given the math enough swings yet for me to tell. Keep at it."</p>';
    }
    Story.show({
      illustration: 'lysaraStudy',
      speaker: 'Lysara (through the stone)',
      text: '<p>The river-stone in your palm warms, and Lysara\'s voice rises out of it like a faint whisper from very far away. The image of her study trembles in the back of your mind.</p>' + line + '<p>"Be careful around the Half-King when you get to him. He is a multiplier and a divider both. Bring the page back."</p>',
      choices: [
        { text: 'Pocket the stone.', go: () => Act2.openPortHub() }
      ]
    });
  },

  // ---------- Isle map (world map of 3 isles) ----------
  openIsleMap() {
    const hero = Game.hero;
    const isles = hero.flags.islesCompleted || {};
    const allDone = isles.halves && isles.thirds && isles.pieces;
    const choices = [];
    if (!isles.halves) choices.push({ text: 'Sail to the <em>Isle of Halves</em>. (Recommended first — easiest)', go: () => Act2._enterIsleHalves() });
    else choices.push({ text: '<em>Isle of Halves — cleared</em>', go: () => UI.toast('Already cleared.'), locked: true });
    if (!isles.thirds) choices.push({ text: 'Sail to the <em>Isle of Thirds</em>. (Medium — fractions of fractions)', go: () => Act2._enterIsleThirds() });
    else choices.push({ text: '<em>Isle of Thirds — cleared</em>', go: () => UI.toast('Already cleared.'), locked: true });
    if (!isles.pieces) choices.push({ text: 'Sail to the <em>Isle of Pieces</em>. (Hardest — many fragments, full ops)', go: () => Act2._enterIslePieces() });
    else choices.push({ text: '<em>Isle of Pieces — cleared</em>', go: () => UI.toast('Already cleared.'), locked: true });
    if (allDone) {
      choices.push({ text: 'Dive to the <em>Sunken Reef</em> and face <em>The Half-King</em>. <span class="story-choice-tag">FINAL</span>', go: () => Act2._enterReef() });
    }
    choices.push({ text: 'Return to the port.', go: () => Act2.openPortHub() });
    Story.show({
      illustration: 'codexWake',
      speaker: 'Mira',
      text: '<p>The Codex-Wake heels in the wind. Mira stands at the wheel, pointing south. Three small smudges sit on the horizon — Halves to port, Thirds dead ahead, Pieces to starboard.</p>' +
            '<p>"Choose one. Or all three, in any order — but the Reef won\'t open to us until we clear all three of the islands first. The Half-King draws strength from them."</p>',
      choices: choices
    });
  },

  // ---------- Isle of Halves ----------
  _enterIsleHalves() {
    Story.show({
      illustration: 'isleHalves',
      speaker: 'Mira',
      text: '<p>The Codex-Wake glides between the two halves of the island. The water in the middle is too still — too perfectly halved. Mira drops the anchor at the leftmost beach.</p>' +
            '<p>"This is where the Halving started. The Warden\'s up the cliff, in what used to be a temple. We\'ll meet him soon enough. First — well. They saw us coming."</p>' +
            '<p>From the underbrush emerges a <em>Brine Sprite</em>, glowing pale blue.</p>',
      choices: [
        { text: 'Strike!', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'brine_sprite',
          onVictory: () => { Game.save(); Act2._islandHalvesB(); },
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandHalvesB() {
    Story.show({
      illustration: 'isleHalves',
      speaker: '',
      text: '<p>The sprite dissolves into a fine salty mist. You climb the path between the two halves. Halfway up, a hunched <em>Splitwhelk</em> scuttles out of the long grass — a giant shell, split lengthwise, dragging a soft body between the halves.</p>',
      choices: [
        { text: 'Engage.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'splitwhelk',
          onVictory: () => { Game.save(); Act2._islandHalvesBoss(); },
          onDefeat: () => Act2.openPortHub()
        }) },
        { text: 'Retreat to the boat to prepare.', go: () => Act2.openPortHub() }
      ]
    });
  },

  _islandHalvesBoss() {
    Story.show({
      illustration: 'isleHalves',
      speaker: '',
      text: '<p>You reach the cliff-top temple. Half of it lies in rubble; the other half stands perfect, every column intact. Inside, a tall figure waits — armoured on the left in pitted iron, on the right in pale coral.</p>' +
            '<p style="color:#88c4d8;font-style:italic;">"You came in whole. You will leave in pieces."</p> The <em>Warden of Halves</em> raises its halberd.</p>',
      choices: [
        { text: 'Accept the challenge.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'halves_warden',
          onVictory: () => { Act2._islandHalvesEnd(); },
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandHalvesEnd() {
    Game.hero.flags.islesCompleted.halves = true;
    Game.hero.flags.actsDone = Math.max(Game.hero.flags.actsDone || 0, 1);
    Game.save();
    Story.show({
      illustration: 'isleHalves',
      speaker: 'Mira',
      text: '<p>The Warden\'s halberd clatters in two pieces, then dissolves. You look down — the two halves of the island are visibly drifting back toward each other. The water in the middle is no longer so still.</p>' +
            '<p>"That\'s one." Mira hands you a small carved coral fragment. "Piece of the Sextant. We\'ll need three to face the Half-King."</p>',
      choices: [
        { text: 'Sail to another island.', go: () => Act2.openIsleMap() },
        { text: 'Return to port to rest and resupply.', go: () => Act2.openPortHub() }
      ]
    });
  },

  // ---------- Isle of Thirds ----------
  _enterIsleThirds() {
    Story.show({
      illustration: 'isleThirds',
      speaker: 'Mira',
      text: '<p>The Codex-Wake noses up to a black-sand beach. The island ahead rises in three terraces — three perfect thirds — each carved with its own ruined tower. The seams between them glow faintly gold.</p>' +
            '<p>"They built three towers, once. Then the island split them. Tide-imps live in the wet between."</p>',
      choices: [
        { text: 'Climb the lower third.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'tide_imp',
          onVictory: () => { Game.save(); Act2._islandThirdsB(); },
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandThirdsB() {
    Story.show({
      illustration: 'isleThirds',
      speaker: '',
      text: '<p>The imp slips back into the sea. You crest the lower third onto the middle terrace. Another tide-imp lunges from the rocks.</p>',
      choices: [
        { text: 'Strike.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'tide_imp',
          onVictory: () => { Game.save(); Act2._islandThirdsRest(); },
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandThirdsRest() {
    Story.show({
      illustration: 'isleThirds',
      speaker: '',
      text: '<p>You climb to the second tower. Inside the broken arch, a fresh-water spring still trickles into a chipped bowl. You drink, and the salt rinses from your throat.</p>',
      choices: [
        { text: 'Rest. (+25 HP, +1 MP)', go: () => {
          const d = Engine.effectiveDerived(Game.hero);
          Game.hero.hp = Math.min(d.maxHp, (Game.hero.hp || 0) + 25);
          Game.hero.mp = Math.min(d.maxMp, (Game.hero.mp || 0) + 1);
          UI.toast('Rested.');
          Game.save();
          Act2._islandThirdsBoss();
        } }
      ]
    });
  },

  _islandThirdsBoss() {
    Story.show({
      illustration: 'isleThirds',
      speaker: '',
      text: '<p>On the top third — the highest terrace — a hooded figure waits in front of a broken altar. Three eyes glow inside its hood. In its hands floats a triangular sigil, slowly rotating.</p>' +
            '<p style="color:#7a6878;font-style:italic;">"A third of a third of a third of you... we will see how much of you is left when we have finished."</p>' +
            '<p>The <em>Seer of Thirds</em> raises its hand.</p>',
      choices: [
        { text: 'Take the trial.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'thirds_seer',
          onVictory: () => Act2._islandThirdsEnd(),
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandThirdsEnd() {
    Game.hero.flags.islesCompleted.thirds = true;
    Game.save();
    Story.show({
      illustration: 'isleThirds',
      speaker: 'Mira',
      text: '<p>The Seer\'s hood collapses inward. The three terraces shudder, then settle slightly closer together. The seams between them dim from gold to a quiet bronze.</p>' +
            '<p>"That\'s two. One more, and we can dive." Mira presses a second coral fragment into your hand. "The Pieces are the worst, by the way. Brace yourself."</p>',
      choices: [
        { text: 'Sail to another island.', go: () => Act2.openIsleMap() },
        { text: 'Return to port to rest.', go: () => Act2.openPortHub() }
      ]
    });
  },

  // ---------- Isle of Pieces ----------
  _enterIslePieces() {
    Story.show({
      illustration: 'islePieces',
      speaker: 'Mira',
      text: '<p>The Codex-Wake circles a chaos of rock. The Isle of Pieces is no longer a single island — it is a constellation of floating chunks orbiting a central platform, joined by thin pink chains of light that hum like a struck wire.</p>' +
            '<p>"Jump on the chunk. Don\'t look down. The chains carry you across — as long as the chunks don\'t move while you\'re jumping."</p>',
      choices: [
        { text: 'Leap across.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'coral_golem',
          onVictory: () => { Game.save(); Act2._islandPiecesB(); },
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandPiecesB() {
    Story.show({
      illustration: 'islePieces',
      speaker: '',
      text: '<p>The golem shatters in a spray of pink shards. You leap to the next chunk — and almost into the jaws of another <em>Coral Golem</em>, this one with one whole and one half-arm.</p>',
      choices: [
        { text: 'Engage.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'coral_golem',
          onVictory: () => { Game.save(); Act2._islandPiecesBoss(); },
          onDefeat: () => Act2.openPortHub()
        }) },
        { text: 'Retreat to the boat.', go: () => Act2.openPortHub() }
      ]
    });
  },

  _islandPiecesBoss() {
    Story.show({
      illustration: 'islePieces',
      speaker: '',
      text: '<p>You leap to the central platform — and stop.</p>' +
            '<p>The figure waiting for you is made of <em>parts</em>. A jaw from a fisher, a hand from a sailor, an eye from a girl Mira recognises with a sharp inhale. The <em>Pieces-Collector</em>. It speaks in a chorus of voices that don\'t agree:</p>' +
            '<p style="color:#cc4878;font-style:italic;">"How many pieces of you are there? Tell me. I want them all."</p>',
      choices: [
        { text: 'Strike now — before Mira sees more.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'pieces_collector',
          onVictory: () => Act2._islandPiecesEnd(),
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _islandPiecesEnd() {
    Game.hero.flags.islesCompleted.pieces = true;
    Game.save();
    Story.show({
      illustration: 'islePieces',
      speaker: 'Mira',
      text: '<p>The Collector falls in a heap of mismatched stones, and the parts it carried float gently away on the wind — back to wherever they came from. Mira does not speak for a long time.</p>' +
            '<p>Finally: "That was my second mate\'s eye. Thank you, ' + Game.hero.name + '. For letting them rest."</p>' +
            '<p>She presses the third coral fragment into your hand. "The Sextant is whole. We can dive."</p>',
      choices: [
        { text: 'Sail to the Sunken Reef.', tag: 'FINAL', go: () => Act2._enterReef() },
        { text: 'Return to port first to prepare.', go: () => Act2.openPortHub() }
      ]
    });
  },

  _enterReef() {
    // Award the reforged sextant
    if (!Inventory.has(Game.hero, 'sextant_of_wholeness')) {
      Inventory.add(Game.hero, 'sextant_of_wholeness', 1);
      UI.toast('Reforged: Sextant of Wholeness');
    }
    Story.show({
      illustration: 'sunkenReef',
      speaker: 'Mira',
      text: '<p>The Codex-Wake drops anchor. The Sextant of Wholeness, reforged from three coral fragments, glows in your hand — and points down. Mira hands you a spell-leaf and a knot of kelp. "Breathing charm. Lasts as long as you need it. Go."</p>' +
            '<p>You dive. The water is cold, then warm, then darkly cold again. Sun-rays slant through the water like ribbons. The reef opens beneath you, and at its center, on a coral throne, sits the Half-King — half a man, half a great gathering of sea, crowned in jagged gold.</p>' +
            '<p style="color:#cc4878;font-style:italic;">"Little hero. Little measure. Show me how much of you you can spare. I will take it slowly, if you ask politely."</p>',
      choices: [
        { text: 'Refuse politely. Strike instead.', tag: 'FINAL', go: () => Engine.startCombat({
          enemyId: 'half_king',
          onVictory: () => Act2._finishAct2(),
          onDefeat: () => Act2.openPortHub()
        }) }
      ]
    });
  },

  _finishAct2() {
    Game.hero.questNode = 'act2_complete';
    Game.hero.currentAct = 2;
    // Award the page
    UI.toast('Recovered: Page Two of the Numerian Codex');
    Game.hero.titles = Game.hero.titles || [];
    if (!Game.hero.titles.includes('Tide-Breaker')) Game.hero.titles.push('Tide-Breaker');
    Game.save();
    // Show act complete screen
    document.getElementById('act-stamp').textContent = 'ACT II COMPLETE';
    document.getElementById('act-complete-illustration').innerHTML = Art.sunkenReef();
    document.getElementById('act-complete-title').textContent = 'The Sea Returns Its Pieces';
    document.getElementById('act-complete-text').innerHTML =
      '<p>The Half-King breaks apart into a hundred small waves and is carried away by the current, gentle for the first time in months. The page rises slowly from the reef floor, salt-wet and unharmed, and you catch it.</p>' +
      '<p>Surfacing, you find Mira standing at the bow of the Codex-Wake, watching three small fishing boats sail home with full nets for the first time in a season. She does not turn around. "Thank you," she says, very softly, to the sea.</p>' +
      '<p><em>Four pages to go.</em></p>';
    document.getElementById('act-complete-rewards').innerHTML =
      '<div class="reward-line">⚜ Page Two of the Numerian Codex (fractions)</div>' +
      '<div class="reward-line">⚜ Title earned: <em>Tide-Breaker</em></div>' +
      '<div class="reward-line">⚜ Mira remains your companion (+1 Insight while she travels with you)</div>' +
      '<div class="reward-line">⚜ Act III will open when you return to Lysara\'s Tower</div>';
    showScreen('act-complete');
  }
};

if (typeof window !== 'undefined') window.Act2 = Act2;
