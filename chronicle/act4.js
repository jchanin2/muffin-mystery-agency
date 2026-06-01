// ======================================================
// act4.js — Act IV: "The Deep Vaults"
// Unit 5: decimal operations
// A descent beneath Numeria with a HOARD vs AUDIT branch.
// ======================================================

const Act4 = {

  beginOpening() {
    const hero = Game.hero;
    Game.hero.currentAct = 4;
    Cutscene.play([
      {
        illustrationId: 'lysaraStudy',
        speaker: 'Lysara',
        text: '<p>"The fourth page does something the others did not." Lysara holds the Codex over a candle; a faint line of light spills <em>downward</em> from its spine and pools on the floor, pointing into the earth. "It points <em>down</em>. Beneath Numeria, beneath even the old city, lie the <em>Deep Vaults</em> — where the merchant-princes of the first Numeria stored their fortunes, counted to the tenth and hundredth of a coin."</p>' +
              '<p>"Something down there has been... <em>skimming</em>. A tenth of a harvest. A hundredth of a wage. So small no one notices — until a whole town is quietly poor. The people call it <em>the Tithe</em>. I call it the thing sitting on our page."</p>'
      },
      {
        illustrationId: 'vaultDescent',
        speaker: 'Mira',
        text: '<p>Mira meets you at the old well in the market square, a coil of rope over one shoulder and a lantern already lit. "Aunt Gull always said there were tunnels under Numeria. Smuggler\'s talk, I thought." She peers down the shaft. "Guess not."</p>' +
              '<p>"Decimals this time, Lysara says. Tenths, hundredths, thousandths. The little pieces of a number that are easy to lose track of." She grins. "Lucky for you, I count cargo for a living. Down we go."</p>'
      },
      {
        illustrationId: 'undermarket',
        speaker: '',
        text: '<p>The shaft opens into a cavern lit by lantern and brazier — the <em>Undermarket</em>, a hidden bazaar grown up at the threshold of the vaults. Traders in dark wool weigh coins on tiny scales and murmur prices to the thousandth. Two stalls stand out: a keeper\'s counter stacked with strongbox keys, and an assayer\'s office with a great balance hung above the door.</p>' +
              '<p>Below it all, a wide stair spirals down into the dark, and from the dark comes a faint, endless sound — coins, counting themselves.</p>'
      }
    ], () => {
      Game.hero.questNode = 'undermarket_first';
      Game.hero.flags.branch4 = null;
      Game.save();
      Act4.openUndermarket();
    });
  },

  openUndermarket() {
    Game.hero.currentAct = 4;
    Game.refreshHubChrome();
    document.getElementById('hub-illustration').innerHTML = Art.undermarket();
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
    if (node === 'undermarket_first') return 'Stock up in the Undermarket, then take the stair down into the Vaults.';
    if (node === 'act4_complete') return 'Act IV complete. Return to Numeria to begin Act V.';
    if (node === 'va_converge') return 'The Vault-Heart is open. Face the Tithe-Master and take back the page.';
    return 'Descend through the Deep Vaults to their cold heart.';
  },

  _locations() {
    const node = Game.hero.questNode;
    const locs = [];
    locs.push({
      name: 'Keeper Sable\'s Stall',
      desc: 'Snacks, oil, sturdy vault-gear, priced to the penny.',
      action: () => Act4.enterKeeper()
    });
    locs.push({
      name: 'Assayer Fenn\'s Office',
      desc: 'Finely balanced weapons and reckoning-lenses.',
      action: () => Act4.enterAssayer()
    });
    locs.push({
      name: 'Lysara\'s Sending Stone',
      desc: 'Speak with Lysara above. She watches your weak spots.',
      action: () => Act4.sendingStone()
    });
    locs.push({
      name: 'The Counting House',
      desc: 'A quiet room of slates and coin-trays. Practice your weakest topic.',
      action: () => Act1.enterTraining()
    });
    locs.push({
      name: 'The Deep Stair',
      desc: node === 'act4_complete' ? 'Quiet now. The counting has stopped.' : 'Down into the Vaults. The page — and the Tithe — wait below.',
      badge: node === 'undermarket_first' ? 'QUEST' : null,
      disabled: node === 'act4_complete',
      action: () => Act4.enterVaults()
    });
    locs.push({
      name: 'Character Sheet',
      desc: 'Inspect your stats, equipment, inventory, and mastery.',
      action: () => Game.openCharacterSheet()
    });
    if (node === 'act4_complete') {
      locs.push({
        name: 'Climb back to Numeria',
        desc: 'Up the long stair into daylight, and on to Lysara. Act V awaits.',
        badge: 'ACT V',
        action: () => { Game.hero.currentAct = 1; Game.hero.questNode = 'act4_complete'; Game.save(); Act1.openTownHub(); }
      });
    }
    return locs;
  },

  enterKeeper() {
    Story.show({
      illustration: 'undermarket',
      speaker: 'Keeper Sable',
      text: '<p>Keeper Sable looks up from a ledger, half-moon spectacles catching the lantern-light. "A surface-dweller. How novel." She closes the book on one finger. "Down here, traveler, everything has its exact worth — to the thousandth. I sell fair and I sell true. What do you need?"</p>',
      choices: [
        { text: 'Browse the stall.', go: () => Shop.open('keeper_stall', () => Act4.enterKeeper()) },
        { text: 'Ask Sable about the Tithe.', go: () => Act4._sableLore() },
        { text: 'Leave.', go: () => Act4.openUndermarket() }
      ]
    });
  },

  _sableLore() {
    Story.show({
      illustration: 'undermarket',
      speaker: 'Keeper Sable',
      text: '<p>Her mouth thins. "The Tithe. Yes. A year ago the vault-counts started coming up <em>short</em> — never by much. A tenth of a coin here. Three hundredths there. We blamed bad scales, then bad clerks, then each other." She taps the ledger. "But the math doesn\'t lie. Something down there takes a small piece of everything, forever, and small pieces <em>add up</em>."</p>' +
            '<p>"When you go down, keep your decimals straight. That thing wins by hoping you\'ll lose track of the little places. The tenths. The hundredths. Don\'t."</p>',
      choices: [
        { text: 'Browse the stall.', go: () => Shop.open('keeper_stall', () => Act4.enterKeeper()) },
        { text: 'Leave.', go: () => Act4.openUndermarket() }
      ]
    });
  },

  enterAssayer() {
    Story.show({
      illustration: 'undermarket',
      speaker: 'Assayer Fenn',
      text: '<p>Assayer Fenn squints at you through a jeweler\'s loupe, one eye comically large. "Mm. Let me weigh you up." He turns the loupe over in his fingers. "I weigh things for a living, friend — coins, ore, the worth of a thing against the worth of another. Everything on my shelf is balanced <em>exactly</em>. No short measures, not from me. Have a look."</p>',
      choices: [
        { text: 'Browse the office.', go: () => Shop.open('assayer_office', () => Act4.enterAssayer()) },
        { text: 'Ask Fenn for advice.', go: () => Act4._fennLore() },
        { text: 'Leave.', go: () => Act4.openUndermarket() }
      ]
    });
  },

  _fennLore() {
    Story.show({
      illustration: 'undermarket',
      speaker: 'Assayer Fenn',
      text: '<p>"Advice? Free of charge, then, since you asked nicely." He sets down the loupe. "When you must compare two coins — two <em>decimals</em> — don\'t be fooled by length. <em>0.7</em> is worth more than <em>0.65</em>, even though 0.65 has more digits. Line up the points and read left to right: tenths first. The tenths decide it before the hundredths get a vote."</p>' +
            '<p>"The Loupe on my shelf there does the squinting for you — sharpens every comparison and rounding you make. Worth every penny. To the hundredth."</p>',
      choices: [
        { text: 'Browse the office.', go: () => Shop.open('assayer_office', () => Act4.enterAssayer()) },
        { text: 'Leave.', go: () => Act4.openUndermarket() }
      ]
    });
  },

  sendingStone() {
    const top = Engine.weakestTopics(Game.hero, 3)[0];
    let line;
    if (top) {
      const t = (TOPICS[top.topic] || {name: top.topic}).name;
      line = '<p>"Your shakiest reckoning right now is <em>' + t + '</em> — about ' + Math.round(top.pct) + '%. The Counting House will sharpen it before you go deeper."</p>';
    } else {
      line = '<p>"Not enough data yet to find your weak spot. Fight a little, and the stone will tell."</p>';
    }
    Story.show({
      illustration: 'lysaraStudy',
      speaker: 'Lysara (through the stone)',
      text: '<p>The river-stone warms; Lysara\'s voice rises faint and far from the surface world.</p>' + line +
            '<p>"Decimals are just whole numbers wearing a smaller coat. Line up the points. Mind the places. And remember — when the Tithe-Master tells you a loss is \'only a hundredth,\' that is exactly how it wins. Come home with the page."</p>',
      choices: [ { text: 'Pocket the stone.', go: () => Act4.openUndermarket() } ]
    });
  },

  // ---------- The Vault descent ----------
  enterVaults() {
    const node = Game.hero.questNode;
    if (node === 'va_converge') return Act4._heartApproach();
    if (node === 'va_route') {
      if (Game.hero.flags.branch4 === 'hoard') return Act4._hoardA();
      if (Game.hero.flags.branch4 === 'audit') return Act4._auditA();
    }
    return Act4._tenths();
  },

  _tenths() {
    Story.show({
      illustration: 'vaultHall',
      speaker: '',
      text: '<p>The first level — the <em>Vault of Tenths</em>. Rows of strongbox doors line the walls, most hanging open and empty. Coins lie scattered on the flagstones, each stamped with a value: 0.1, 0.3, 0.7. As you pass, a stray coin shivers, sprouts stubby legs, and turns to face you — a <em>Coin-Mite</em>, its stamped face scowling.</p>',
      choices: [
        { text: 'Flick it down!', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'coin_mite',
          onVictory: () => { Game.save(); Act4._tenthsB(); },
          onDefeat: () => Act4.openUndermarket()
        }) }
      ]
    });
  },

  _tenthsB() {
    Story.show({
      illustration: 'vaultHall',
      speaker: '',
      text: '<p>You descend to the <em>Vault of Hundredths</em>. The air grows colder and the lantern dimmer. A tattered cloak floats out of an open strongbox — a <em>Ledger-Shade</em>, an open account-book for a face, forever subtracting what it finds.</p>',
      choices: [
        { text: 'Banish it.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'ledger_shade',
          onVictory: () => { Game.hero.questNode = 'va_branch'; Game.save(); Act4._branchPoint(); },
          onDefeat: () => Act4.openUndermarket()
        }) },
        { text: 'Climb back to the Undermarket to prepare.', go: () => Act4.openUndermarket() }
      ]
    });
  },

  // ---------- Branch decision ----------
  _branchPoint() {
    Story.show({
      illustration: 'vaultHall',
      speaker: '',
      text: '<p>The stair forks around a dry fountain choked with tarnished coins.</p>' +
            '<p>The <em>left</em> passage leads to the <em>Hoarding Floor</em>, where the Tithe has piled everything it has stolen into glittering, guarded heaps. Cut through it and you face the <em>Coin-Hoard</em> — a creature of pure greed. (Decimal multiplication & dividing-by-decimals. Reward: the Tithe-Breaker.)</p>' +
            '<p>The <em>right</em> passage leads to the <em>Counting Office</em>, where the Tithe keeps its books. Slip through and you face <em>the Auditor</em>, who proves your worthlessness to the thousandth. (Place value, rounding & comparison. Reward: the Keeper\'s Ledger.)</p>' +
            '<p style="color:#c8b078;font-style:italic;">Mira: "Greed or paperwork. What a choice. I\'m with you whichever way."</p>',
      choices: [
        { text: 'Take the Hoarding Floor. (decimal × and ÷)', tag: 'HOARD', go: () => {
          Game.hero.flags.branch4 = 'hoard';
          Game.hero.questNode = 'va_route';
          Game.hero.gold += 40;
          UI.toast('You pocket 40 gold of loose coin on the way in.');
          Game.save();
          Act4._hoardA();
        } },
        { text: 'Take the Counting Office. (place value, rounding, comparing)', tag: 'AUDIT', go: () => {
          Game.hero.flags.branch4 = 'audit';
          Game.hero.questNode = 'va_route';
          Inventory.add(Game.hero, 'assayers_loupe', 1);
          UI.toast('Fenn lent you a spare Assayer\'s Loupe for the audit. (equip it!)');
          Game.save();
          Act4._auditA();
        } }
      ]
    });
  },

  // ---- HOARD route ----
  _hoardA() {
    Story.show({
      illustration: 'vaultHall',
      speaker: '',
      text: '<p>The Hoarding Floor glitters in the lantern-light — mountains of coin, cups, crowns, and candlesticks, all stolen a fraction at a time. Something moves wetly among the gold: a <em>Tarnish-Ooze</em>, half-dissolving the very coins it crawls over.</p>',
      choices: [
        { text: 'Strike it.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'tarnish_ooze',
          onVictory: () => { Game.save(); Act4._hoardBoss(); },
          onDefeat: () => Act4.openUndermarket()
        }) }
      ]
    });
  },

  _hoardBoss() {
    Story.show({
      illustration: 'vaultHeart',
      speaker: '',
      text: '<p>At the center of the hoard, the gold itself rises into a shape — a grasping mound with a greedy golden face and arms of grasping coin. The <em>Coin-Hoard</em>, the Tithe\'s appetite given form.</p>' +
            '<p style="color:#caa030;font-style:italic;">"MINE. ALL OF IT. EVEN THE PIECES YOU CANNOT SEE. ESPECIALLY THOSE."</p>',
      choices: [
        { text: 'Empty its coffers.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'coin_hoard',
          onVictory: () => { Game.hero.questNode = 'va_converge'; Game.save(); Act4._afterMini('hoard'); },
          onDefeat: () => Act4.openUndermarket()
        }) }
      ]
    });
  },

  // ---- AUDIT route ----
  _auditA() {
    Story.show({
      illustration: 'vaultHall',
      speaker: '',
      text: '<p>The Counting Office is a cathedral of paperwork — towers of ledgers, walls of pigeonholes, a floor inlaid with a vast place-value chart. A <em>Vault-Sentinel</em>, a great round vault-door grown legs and arms, rolls to block the aisle, its handle-face spinning to read you.</p>',
      choices: [
        { text: 'Crack it open.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'vault_sentinel',
          onVictory: () => { Game.save(); Act4._auditBoss(); },
          onDefeat: () => Act4.openUndermarket()
        }) }
      ]
    });
  },

  _auditBoss() {
    Story.show({
      illustration: 'vaultHeart',
      speaker: '',
      text: '<p>At the head of the office, behind a desk the size of a wagon, sits <em>the Auditor</em> — a narrow figure with an abacus for a spine and a monocle that magnifies your every flaw. It does not look up as you approach.</p>' +
            '<p style="color:#88c4d8;font-style:italic;">"Account number... none. Net worth... pending. Let us settle your books. To the thousandth."</p>',
      choices: [
        { text: 'Balance the ledger — your way.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'the_auditor',
          onVictory: () => { Game.hero.questNode = 'va_converge'; Game.save(); Act4._afterMini('audit'); },
          onDefeat: () => Act4.openUndermarket()
        }) }
      ]
    });
  },

  _afterMini(route) {
    const flavor = route === 'hoard'
      ? '<p>The Coin-Hoard collapses into an ordinary, harmless pile of gold. Half-buried in it you find a weapon forged from a single melted coin — the <em>Tithe-Breaker</em>. The stolen wealth around you begins, slowly, to roll back the way it came.</p>'
      : '<p>The Auditor\'s monocle cracks; its abacus-spine spills its beads across the floor. From its desk you take the great <em>Keeper\'s Ledger</em>, every coin in Numeria balanced at last to the thousandth.</p>';
    Story.show({
      illustration: 'vaultHeart',
      speaker: 'Mira',
      text: flavor + '<p>"There," Mira breathes, lifting her lantern toward a final doorway sealed with a coin-shaped lock. "The Vault-Heart. Whatever\'s been counting all this time... it\'s right through there."</p>',
      choices: [
        { text: 'Open the Vault-Heart.', tag: 'FINAL', go: () => Act4._heartApproach() },
        { text: 'Climb back up to resupply first.', go: () => Act4.openUndermarket() }
      ]
    });
  },

  _heartApproach() {
    Story.show({
      illustration: 'vaultHeart',
      speaker: '',
      text: '<p>The Vault-Heart is a perfect circle of a room, its far wall a single colossal vault-door. On a pedestal at its center rests the page of the Codex — and around the page, gathering coin and shadow into a towering cloaked shape, the <em>Tithe-Master</em> takes form. Where its face should be hangs a great hollow coin with nothing in the middle.</p>' +
            '<p style="color:#cc4878;font-style:italic;">"You came all this way for a single page. I came all this way for a single tenth. We are not so different — except that I will leave with both."</p>',
      choices: [
        { text: 'Settle the account in full.', tag: 'FINAL', go: () => Engine.startCombat({
          enemyId: 'tithe_master',
          onVictory: () => Act4._finishAct4(),
          onDefeat: () => Act4.openUndermarket()
        }) }
      ]
    });
  },

  _finishAct4() {
    Game.hero.questNode = 'act4_complete';
    UI.toast('Recovered: Page Four of the Numerian Codex');
    Game.hero.titles = Game.hero.titles || [];
    if (!Game.hero.titles.includes('Vault-Breaker')) Game.hero.titles.push('Vault-Breaker');
    Game.save();
    const route = Game.hero.flags.branch4;
    document.getElementById('act-stamp').textContent = 'ACT IV COMPLETE';
    document.getElementById('act-complete-illustration').innerHTML = Art.vaultTreasury();
    document.getElementById('act-complete-title').textContent = 'The Books Are Balanced';
    document.getElementById('act-complete-text').innerHTML =
      '<p>The hollow coin at the Tithe-Master\'s heart spins once, twice — and falls still. Its shadow unravels; its hoard sighs apart into a thousand small coins that roll, of their own accord, back up the stair and out into Numeria, a tenth and a hundredth at a time, until every short-counted purse in the city is quietly, exactly whole again.</p>' +
      '<p>You lift the fourth page from the cold pedestal.</p>' +
      (route === 'hoard'
        ? '<p>"Took its gold <em>and</em> its page," Mira says, pocketing one last coin with a wink. "Greedy. I like it."</p>'
        : '<p>"Balanced to the thousandth," Mira says, reading over the Keeper\'s Ledger. "Sable is going to weep with joy.")</p>') +
      '<p>Far above, a shaft of clean daylight finds its way down the open vault. <em>Four pages. Two to go.</em></p>';
    document.getElementById('act-complete-rewards').innerHTML =
      '<div class="reward-line">⚜ Page Four of the Numerian Codex (decimals)</div>' +
      '<div class="reward-line">⚜ Title earned: <em>Vault-Breaker</em></div>' +
      '<div class="reward-line">⚜ ' + (route === 'hoard' ? 'Claimed the Tithe-Breaker from the Hoarding Floor' : 'Claimed the Keeper\'s Ledger from the Counting Office') + '</div>' +
      '<div class="reward-line">⚜ The Hollow Coin is yours — powerful, and a little cold</div>' +
      '<div class="reward-line">⚜ Act V opens when you return to Lysara\'s Tower</div>';
    showScreen('act-complete');
  }
};

if (typeof window !== 'undefined') window.Act4 = Act4;
