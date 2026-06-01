// ======================================================
// act3.js — Act III: "The Iron Foundries"
// Unit 4: multi-digit multiplication & division
// Linear war campaign with a mid-act SABOTAGE vs ASSAULT branch.
// ======================================================

const Act3 = {

  // ---------- Opening cutscene ----------
  beginOpening() {
    const hero = Game.hero;
    Game.hero.currentAct = 3;
    Cutscene.play([
      {
        illustrationId: 'warMarchRoad',
        speaker: 'The King\'s Road, going north',
        text: '<p>The green country falls behind you. The road turns to mud, then to cinders. Broken war-machines rust in the ditches — siege-rams with their wheels stoved in, automatons half-sunk in the mire, all of them stamped with the same maker\'s mark: a gear inside a gear.</p>' +
              '<p>On the horizon, a forest of black chimneys breathes orange smoke into a bruised sky. The <em>Iron Foundries</em> of Cinderforge.</p>'
      },
      {
        illustrationId: 'warMarchRoad',
        speaker: 'Mira',
        text: '<p>Mira walks beside you, hood up against the ash. "I traded the Codex-Wake for a wagon and two mules to get us this far. Don\'t look at me like that — the sea isn\'t going anywhere, and neither am I." She nudges you. "Someone has to keep your hint-count up."</p>' +
              '<p>"Lysara says the foundries used to be the pride of the war-march. Then, three months back, they started building on their own. No workers. No orders. Just <em>more</em> — multiplying out an army for a war nobody declared."</p>'
      },
      {
        illustrationId: 'cinderforgeTown',
        speaker: '',
        text: '<p>Cinderforge clings to the foundry\'s flank like a barnacle — a frontier garrison of soot-stained timber and a palisade wall, its one square lit by a great communal forge-fire. Soldiers in mismatched armour nod at you as you pass. They have the look of people who have been losing for a long time.</p>' +
              '<p>A broad-shouldered serjeant and a goggled tinker are arguing by the depot. They both stop when they see you coming.</p>'
      }
    ], () => {
      Game.hero.questNode = 'foundry_town_first';
      Game.hero.flags.branch3 = null;
      Game.save();
      Act3.openFoundryTown();
    });
  },

  // ---------- Foundry-town hub ----------
  openFoundryTown() {
    Game.hero.currentAct = 3;
    Game.refreshHubChrome();
    document.getElementById('hub-illustration').innerHTML = Art.cinderforgeTown();
    const list = document.getElementById('hub-locations');
    list.innerHTML = '';
    this._locations().forEach(loc => {
      const btn = document.createElement('button');
      btn.className = 'hub-location-btn';
      btn.innerHTML = '<span class="hub-location-name">' + loc.name + '</span>' +
                      '<span class="hub-location-desc">' + loc.desc + '</span>' +
                      (loc.badge ? '<span class="hub-location-badge">' + loc.badge + '</span>' : '');
      btn.disabled = !!loc.disabled;
      btn.addEventListener('click', loc.action);
      list.appendChild(btn);
    });
    document.getElementById('hub-quest-text').textContent = this._questText();
    showScreen('hub');
    Game.save();
  },

  _questText() {
    const node = Game.hero.questNode;
    if (node === 'foundry_town_first') return 'Gear up in Cinderforge, then enter the Foundry when you are ready.';
    if (node === 'act3_complete') return 'Act III complete. Return to Numeria to begin Act IV.';
    if (node === 'fo_converge') return 'The way to the Foundry-Mind is open. End this.';
    return 'Fight your way through the Iron Foundry to its burning heart.';
  },

  _locations() {
    const node = Game.hero.questNode;
    const locs = [];
    locs.push({
      name: 'The Depot',
      desc: 'Serjeant Vol\'s supply store. Rations, oil, heavy gear.',
      action: () => Act3.enterDepot()
    });
    locs.push({
      name: 'Artificer\'s Workshop',
      desc: 'Tinker Pell\'s shop. Clever charms and reckoning-rings.',
      action: () => Act3.enterWorkshop()
    });
    locs.push({
      name: 'Lysara\'s Sending Stone',
      desc: 'Speak with Lysara across the leagues. She watches your weak spots.',
      action: () => Act3.sendingStone()
    });
    locs.push({
      name: 'Drill Square',
      desc: 'Soldiers drill here at dawn. Practice your weakest topic.',
      action: () => Act1.enterTraining()
    });
    locs.push({
      name: 'The Iron Foundry',
      desc: node === 'act3_complete' ? 'Cold and silent now. The war-machines sleep.' : 'The great gate yawns, breathing fire. The page is somewhere inside.',
      badge: node === 'foundry_town_first' ? 'QUEST' : null,
      disabled: node === 'act3_complete',
      action: () => Act3.enterFoundry()
    });
    locs.push({
      name: 'Character Sheet',
      desc: 'Inspect your stats, equipment, inventory, and mastery.',
      action: () => Game.openCharacterSheet()
    });
    if (node === 'act3_complete') {
      locs.push({
        name: 'Return to Numeria (King\'s Road)',
        desc: 'South again, to Lysara\'s Tower. Time to begin Act IV.',
        badge: 'ACT IV',
        action: () => { Game.hero.currentAct = 1; Game.hero.questNode = 'act3_complete'; Game.save(); Act1.openTownHub(); }
      });
    }
    return locs;
  },

  // ---------- Shops ----------
  enterDepot() {
    Story.show({
      illustration: 'quartermasterDepot',
      speaker: 'Serjeant Vol',
      text: '<p>The depot smells of oil, leather, and old smoke. Serjeant Vol stands at a counter stacked with ledgers, a scar pulling one eyebrow into a permanent question. "You\'re the one Lysara\'s stone keeps buzzing about. Good. We need someone who can <em>count</em>." He taps a crate marked <em>×</em>. "Every shipment that monster makes, it doubles. Triples. We can\'t keep up. Buy what you need and go put a stop to it."</p>',
      choices: [
        { text: 'Browse the depot.', go: () => Shop.open('quartermaster_depot', () => Act3.enterDepot()) },
        { text: 'Ask Vol about the Foundry-Mind.', go: () => Act3._volLore() },
        { text: 'Leave.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  _volLore() {
    Story.show({
      illustration: 'quartermasterDepot',
      speaker: 'Serjeant Vol',
      text: '<p>"The thing in the deep furnace? We call it the <em>Foundry-Mind</em>. It was a reckoning-engine once — built to calculate supply lines, how many rivets per ram, how many rams per legion. Multiply, divide, estimate, repeat." He grimaces. "Then a strange page drifted down the chimney and lodged in its core, and it started reckoning a war that doesn\'t exist. Now it just... <em>makes</em>. Forever."</p>' +
            '<p>"When you get inside, you\'ll reach a fork. Left is the sabotage-run through the coolant works — quieter, division-work. Right is the assault ramp through the casting floor — loud, and you\'ll be multiplying your way through a lot of iron. Pick whichever suits your hand."</p>',
      choices: [
        { text: 'Browse the depot.', go: () => Shop.open('quartermaster_depot', () => Act3.enterDepot()) },
        { text: 'Leave.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  enterWorkshop() {
    Story.show({
      illustration: 'artificerWorkshop',
      speaker: 'Tinker Pell',
      text: '<p>Tinker Pell\'s workshop is a happy chaos of half-built gadgets, blueprints, and ticking things. She pushes her goggles up onto her wild hair and beams. "Oh, <em>finally</em>, someone interesting! Vol thinks the answer is hitting the Mind harder. I think the answer is hitting it <em>smarter</em>." She gestures at her shelves. "Numbers are just machines, friend. Wind them right and they do the work for you. Here — take a look at my reckoning-gear."</p>',
      choices: [
        { text: 'Browse the workshop.', go: () => Shop.open('artificer_workshop', () => Act3.enterWorkshop()) },
        { text: 'Ask Pell about partial products.', go: () => Act3._pellLore() },
        { text: 'Leave.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  _pellLore() {
    Story.show({
      illustration: 'artificerWorkshop',
      speaker: 'Tinker Pell',
      text: '<p>"Big multiplication scaring you? Don\'t let it. Break it into <em>pieces</em>. Twenty-four times thirteen looks mean — but it\'s just (twenty-four × ten) plus (twenty-four × three). Two easy sums you already know, added together." She sketches a little rectangle, splits it into parts, labels each. "That\'s the whole secret of the Foundry. It builds in parts. So you take it apart in parts. The Abacus Ring on the shelf there does the bookkeeping for you — sharpens every product you land."</p>',
      choices: [
        { text: 'Browse the workshop.', go: () => Shop.open('artificer_workshop', () => Act3.enterWorkshop()) },
        { text: 'Leave.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  sendingStone() {
    const top = Engine.weakestTopics(Game.hero, 3)[0];
    let line;
    if (top) {
      const t = (TOPICS[top.topic] || {name: top.topic}).name;
      line = '<p>"Your weakest reckoning right now is <em>' + t + '</em> — about ' + Math.round(top.pct) + '%. The Drill Square will sharpen it. Go a few rounds before you face the Mind."</p>';
    } else {
      line = '<p>"Not enough data yet to find your weak spot. Fight a little, and the stone will tell you where to drill."</p>';
    }
    Story.show({
      illustration: 'lysaraStudy',
      speaker: 'Lysara (through the stone)',
      text: '<p>The river-stone warms in your palm and Lysara\'s voice rises out of it, threadbare with distance.</p>' + line +
            '<p>"The Foundry-Mind is a calculator that forgot how to stop. You will not out-build it — but you can out-<em>think</em> it. Estimate when you cannot be exact. Be exact when it counts. I am proud of you. Now go."</p>',
      choices: [
        { text: 'Pocket the stone.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  // ---------- Foundry dungeon ----------
  enterFoundry() {
    const node = Game.hero.questNode;
    if (node === 'fo_converge') return Act3._coreApproach();
    if (Game.hero.flags.branch3 === 'sabotage' && node === 'fo_route') return Act3._sabotageA();
    if (Game.hero.flags.branch3 === 'assault' && node === 'fo_route') return Act3._assaultA();
    return Act3._foundryEntry();
  },

  _foundryEntry() {
    Story.show({
      illustration: 'foundryExterior',
      speaker: '',
      text: '<p>The great gate stands open, breathing heat like a living throat. Inside, the noise is enormous — hammers, gears, the roar of molten metal. Mira touches your arm. "I\'ll hold the gate so it can\'t lock us in. Go. I\'ll be right here." (Her Insight stays with you.)</p>' +
            '<p>A small thing detaches from the wall and floats toward you on a whirring gear — a <em>Cog-Sprite</em>, one orange eye blinking.</p>',
      choices: [
        { text: 'Swat it down!', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'cog_sprite',
          onVictory: () => { Game.save(); Act3._foundryYard(); },
          onDefeat: () => Act3.openFoundryTown()
        }) }
      ]
    });
  },

  _foundryYard() {
    Story.show({
      illustration: 'foundryInterior',
      speaker: '',
      text: '<p>You step onto a gantry above a river of molten iron. Conveyor belts carry half-built war-machines past in an endless parade. A four-legged <em>Bolt-Hound</em> drops from a catwalk and lands snarling between you and the way forward.</p>',
      choices: [
        { text: 'Stand and fight.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'bolt_hound',
          onVictory: () => { Game.hero.questNode = 'fo_branch'; Game.save(); Act3._branchPoint(); },
          onDefeat: () => Act3.openFoundryTown()
        }) },
        { text: 'Retreat to Cinderforge to prepare.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  // ---------- The trajectory-altering decision ----------
  _branchPoint() {
    Story.show({
      illustration: 'foundryInterior',
      speaker: '',
      text: '<p>The gantry splits in two.</p>' +
            '<p>To the <em>left</em>, a narrow catwalk descends into the <em>coolant works</em> — dim, dripping, quiet. A saboteur could slip through, shutting valves and dividing the Mind\'s power before it ever knew you were there. (Division-focused. Mini-boss: the Quartermaster-Construct.)</p>' +
            '<p>To the <em>right</em>, a broad ramp climbs to the <em>casting floor</em> — roaring, blazing, packed with fresh-made war-machines. A frontal assault: loud, dangerous, and you will be multiplying your way through a legion. (Multiplication-focused. Mini-boss: the Siege-Breaker.)</p>' +
            '<p style="color:#c8b078;font-style:italic;">Mira: "Your call. I\'ve got your back either way."</p>',
      choices: [
        { text: 'Take the coolant works — sabotage. (division)', tag: 'SABOTAGE', go: () => {
          Game.hero.flags.branch3 = 'sabotage';
          Game.hero.questNode = 'fo_route';
          Inventory.add(Game.hero, 'sabotage_kit', 1);
          UI.toast('Mira slips you a Saboteur\'s Kit. (+2 Speed, +1 Luck when equipped)');
          Game.save();
          Act3._sabotageA();
        } },
        { text: 'Take the casting floor — assault. (multiplication)', tag: 'ASSAULT', go: () => {
          Game.hero.flags.branch3 = 'assault';
          Game.hero.questNode = 'fo_route';
          Game.hero.gold += 30;
          Inventory.add(Game.hero, 'oil_flask', 1);
          UI.toast('Vol\'s soldiers cover your charge — found 30 gold and a Flask of Quenching Oil.');
          Game.save();
          Act3._assaultA();
        } }
      ]
    });
  },

  // ---- SABOTAGE route (division) ----
  _sabotageA() {
    Story.show({
      illustration: 'foundryInterior',
      speaker: '',
      text: '<p>You drop into the coolant works. Steam hisses from a hundred valves; the floor is slick with condensation. You move quietly, turning wheels, splitting the Mind\'s power between dead-end pipes. A low <em>Slag-Crawler</em> uncoils from a drainage channel, molten cracks glowing along its back.</p>',
      choices: [
        { text: 'Silence it.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'slag_crawler',
          onVictory: () => { Game.save(); Act3._sabotageBoss(); },
          onDefeat: () => Act3.openFoundryTown()
        }) }
      ]
    });
  },

  _sabotageBoss() {
    Story.show({
      illustration: 'foundryInterior',
      speaker: '',
      text: '<p>At the heart of the coolant works stands the <em>Quartermaster-Construct</em> — a tall, narrow automaton with an open ledger for a chest and an abacus for each arm, endlessly dividing the foundry\'s output into ration after ration after ration.</p>' +
            '<p style="color:#88c4d8;font-style:italic;">"UNAUTHORIZED. UNCOUNTED. YOU WILL BE DIVIDED AND FILED."</p>',
      choices: [
        { text: 'Cut its count short.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'quartermaster_construct',
          onVictory: () => { Game.hero.questNode = 'fo_converge'; Game.save(); Act3._afterMiniBoss('sabotage'); },
          onDefeat: () => Act3.openFoundryTown()
        }) }
      ]
    });
  },

  // ---- ASSAULT route (multiplication) ----
  _assaultA() {
    Story.show({
      illustration: 'foundryInterior',
      speaker: '',
      text: '<p>You charge up the casting ramp into chaos and heat. Fresh war-machines roll off the line in their dozens. A hulking <em>Forge-Sentinel</em> turns from the molten cauldron it tends, hammer already swinging.</p>',
      choices: [
        { text: 'Meet it head-on.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'forge_sentinel',
          onVictory: () => { Game.save(); Act3._assaultBoss(); },
          onDefeat: () => Act3.openFoundryTown()
        }) }
      ]
    });
  },

  _assaultBoss() {
    Story.show({
      illustration: 'foundryInterior',
      speaker: '',
      text: '<p>The casting floor opens onto the muster-yard, and there it waits: the <em>Siege-Breaker</em>, a tracked colossus with a battering ram for one arm and a cannon for the other, smokestacks roaring as it builds copies of itself from the iron around it.</p>' +
            '<p style="color:#cc8838;font-style:italic;">"MORE. ALWAYS MORE. I AM AN ARMY OF ONE, MULTIPLIED."</p>',
      choices: [
        { text: 'Break the breaker.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'siege_breaker',
          onVictory: () => { Game.hero.questNode = 'fo_converge'; Game.save(); Act3._afterMiniBoss('assault'); },
          onDefeat: () => Act3.openFoundryTown()
        }) }
      ]
    });
  },

  _afterMiniBoss(route) {
    const flavor = route === 'sabotage'
      ? '<p>The Quartermaster-Construct folds in on itself like a closed book. The coolant works fall silent — and far above, you hear the great furnace stutter, starved of half its power. From the wreck you pry a glowing brass <em>Dividing Engine</em>.</p>'
      : '<p>The Siege-Breaker topples with a crash that shakes the whole foundry, its copies collapsing into scrap around it. From the ruin you wrench free the still-warm <em>Multiplier\'s Edge</em>.</p>';
    Story.show({
      illustration: 'foundryInterior',
      speaker: 'Mira',
      text: flavor + '<p>"That\'s the way clear," Mira calls from somewhere behind you. "The core\'s straight ahead. Whatever that thing is — finish it."</p>',
      choices: [
        { text: 'Press on to the core.', tag: 'FINAL', go: () => Act3._coreApproach() },
        { text: 'Fall back to Cinderforge first.', go: () => Act3.openFoundryTown() }
      ]
    });
  },

  _coreApproach() {
    Story.show({
      illustration: 'foundryMindCore',
      speaker: '',
      text: '<p>The tunnel opens into a cathedral of machinery. Pipes the width of oak trees converge on a single vast furnace-face, its grate glowing like a captive sun. Numerals drift up from the heat — <em>× ÷ × ÷</em> — and in the fire, two eyes find you.</p>' +
            '<p style="color:#f0a838;font-style:italic;">"A VARIABLE. UNSOLVED. I WILL REDUCE YOU TO ZERO."</p>' +
            '<p>The <em>Foundry-Mind</em> wakes fully, and the whole foundry becomes its body.</p>',
      choices: [
        { text: 'Solve it down to nothing.', tag: 'FINAL', go: () => Engine.startCombat({
          enemyId: 'foundry_mind',
          onVictory: () => Act3._finishAct3(),
          onDefeat: () => Act3.openFoundryTown()
        }) }
      ]
    });
  },

  _finishAct3() {
    Game.hero.questNode = 'act3_complete';
    UI.toast('Recovered: Page Three of the Numerian Codex');
    Game.hero.titles = Game.hero.titles || [];
    if (!Game.hero.titles.includes('Foundry-Breaker')) Game.hero.titles.push('Foundry-Breaker');
    Game.save();
    const route = Game.hero.flags.branch3;
    document.getElementById('act-stamp').textContent = 'ACT III COMPLETE';
    document.getElementById('act-complete-illustration').innerHTML = Art.foundryDawn();
    document.getElementById('act-complete-title').textContent = 'The Foundry Falls Silent';
    document.getElementById('act-complete-text').innerHTML =
      '<p>The Foundry-Mind\'s fire gutters, shrinks, and goes out. The grate cools from white to orange to a dull, dead grey. One by one the great chimneys stop breathing smoke, and for the first time in three months, Cinderforge hears <em>quiet</em>.</p>' +
      '<p>From the cold core you lift the third page of the Numerian Codex, its edges still warm.</p>' +
      (route === 'sabotage'
        ? '<p>"Out-thought it," Mira says, surveying the silent works. "Vol\'s going to be insufferable about you proving him wrong."</p>'
        : '<p>"Out-fought it," Mira says, surveying the scrap. "Pell\'s going to be insufferable about you doing it the loud way."</p>') +
      '<p>Dawn comes up grey and clean over the war-march. <em>Three pages. Three to go.</em></p>';
    document.getElementById('act-complete-rewards').innerHTML =
      '<div class="reward-line">⚜ Page Three of the Numerian Codex (multiplication & division)</div>' +
      '<div class="reward-line">⚜ Title earned: <em>Foundry-Breaker</em></div>' +
      '<div class="reward-line">⚜ ' + (route === 'sabotage' ? 'Kept the Dividing Engine from the coolant works' : 'Kept the Multiplier\'s Edge from the casting floor') + '</div>' +
      '<div class="reward-line">⚜ Act IV opens when you return to Lysara\'s Tower</div>';
    showScreen('act-complete');
  }
};

if (typeof window !== 'undefined') window.Act3 = Act3;
