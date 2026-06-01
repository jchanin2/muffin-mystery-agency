// ======================================================
// act5.js — Act V: "Concord, the Measureless City"
// Unit 6: unlike fractions, mixed numbers, powers of 10, conversions
// Choose-order: three guild districts, then the Babel-Engine.
// ======================================================

const Act5 = {

  beginOpening() {
    const hero = Game.hero;
    Game.hero.currentAct = 5;
    Cutscene.play([
      {
        illustrationId: 'lysaraStudy',
        speaker: 'Lysara',
        text: '<p>"The fifth page went <em>abroad</em>." Lysara spreads a map of the border lands. "To <em>Concord</em> — the free trade-city where a dozen guilds, a dozen coinages, and a dozen systems of measure once lived in careful balance. <em>Concord</em> means agreement. It was the most agreeable city in the world."</p>' +
              '<p>"Was. Since the page fell, every guild measures differently and insists it\'s right. A baker\'s dozen is thirteen in one street and three-fifths in the next. The markets are at war over arithmetic. If it spreads, every treaty in the realm collapses."</p>'
      },
      {
        illustrationId: 'concordCity',
        speaker: 'Mira',
        text: '<p>Concord rises before you — a glorious jumble of guild-towers, each a different height and hue, strung with a hundred clashing banners. The noise is incredible: criers shouting prices that change mid-sentence, merchants brawling over whether a half is bigger than a third.</p>' +
              '<p>Mira whistles. "I have sold cargo in forty ports and I have never seen a market this <em>angry</em>." She cracks her knuckles. "Unlike fractions, conversions, powers of ten. This is literally my whole job, ' + hero.name + '. Stay close."</p>'
      },
      {
        illustrationId: 'concordCity',
        speaker: '',
        text: '<p>At the heart of the plaza stands the old Concord Monument — a great public balance-scale, now hanging crooked and still. Three guild-districts spread out around it: the <em>District of Scales</em>, the <em>District of Halves</em>, and the <em>District of Powers</em>. From each comes the sound of argument. And from far below the monument, something vast and patient hums, reckoning everything wrong on purpose.</p>'
      }
    ], () => {
      Game.hero.questNode = 'concord_first';
      Game.hero.flags.districts5 = { scales: false, halves: false, powers: false };
      Game.save();
      Act5.openConcord();
    });
  },

  openConcord() {
    Game.hero.currentAct = 5;
    Game.refreshHubChrome();
    document.getElementById('hub-illustration').innerHTML = Art.concordCity();
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

  _districtsDone() {
    const d = Game.hero.flags.districts5 || {};
    return (d.scales ? 1 : 0) + (d.halves ? 1 : 0) + (d.powers ? 1 : 0);
  },

  _questText() {
    const node = Game.hero.questNode;
    if (node === 'concord_first') return 'Calm the three guild-districts in any order, then face what lies beneath the Monument.';
    if (node === 'act5_complete') return 'Act V complete. Return to Numeria to begin the final act.';
    const done = this._districtsDone();
    if (done >= 3) return 'All three districts are at peace. Descend beneath the Monument to face the Babel-Engine.';
    return 'Districts calmed: ' + done + ' of 3. Choose the next district to set right.';
  },

  _locations() {
    const node = Game.hero.questNode;
    const locs = [];
    locs.push({
      name: 'Concord Market',
      desc: 'Marketer Quill\'s stall. Spiced wine, glaives, tabards.',
      action: () => Act5.enterMarket()
    });
    locs.push({
      name: 'Guild Outfitter',
      desc: 'Outfitter Bex\'s shop. Reckoning-rings and fine armor.',
      action: () => Act5.enterOutfitter()
    });
    locs.push({
      name: 'Lysara\'s Sending Stone',
      desc: 'Speak with Lysara. She watches your weak spots.',
      action: () => Act5.sendingStone()
    });
    locs.push({
      name: 'The Reckoning School',
      desc: 'A guild classroom open to all. Practice your weakest topic.',
      action: () => Act1.enterTraining()
    });
    locs.push({
      name: 'The Three Districts',
      desc: node === 'act5_complete' ? 'Peaceful now — one city, one set of measures.' : 'Scales, Halves, and Powers. Set each right, in any order.',
      badge: node === 'concord_first' ? 'QUEST' : null,
      disabled: node === 'act5_complete',
      action: () => Act5.openDistrictMap()
    });
    locs.push({
      name: 'Character Sheet',
      desc: 'Inspect your stats, equipment, inventory, and mastery.',
      action: () => Game.openCharacterSheet()
    });
    if (node === 'act5_complete') {
      locs.push({
        name: 'Ride home to Numeria',
        desc: 'The long road back to Lysara\'s Tower — and the last page.',
        badge: 'ACT VI',
        action: () => { Game.hero.currentAct = 1; Game.hero.questNode = 'act5_complete'; Game.save(); Act1.openTownHub(); }
      });
    }
    return locs;
  },

  enterMarket() {
    Story.show({
      illustration: 'concordCity',
      speaker: 'Marketer Quill',
      text: '<p>Marketer Quill sweeps off his feathered cap with a flourish. "Welcome, welcome! Best prices in the free cities — assuming we can agree what a price <em>is</em> this hour!" His grin falters. "It\'s bad, friend. I sold a man three apples for half a coin, and by the time he paid, half a coin had become five coins, then a fifth of one. Help us, and my stall is yours."</p>',
      choices: [
        { text: 'Browse the market.', go: () => Shop.open('concord_market', () => Act5.enterMarket()) },
        { text: 'Leave.', go: () => Act5.openConcord() }
      ]
    });
  },

  enterOutfitter() {
    Story.show({
      illustration: 'concordCity',
      speaker: 'Outfitter Bex',
      text: '<p>Outfitter Bex talks around a row of pins held in her teeth, a measuring-tape coiled in her hair. "Mm — hold still." She measures your shoulders, frowns, measures again. "See? Tape says one thing, then another. Can\'t cut a coat if I can\'t trust a number." She spits out the pins. "Put the measures back in order and I\'ll outfit you like royalty. Meanwhile — here\'s what I\'ve got."</p>',
      choices: [
        { text: 'Browse the outfitter.', go: () => Shop.open('guild_outfitter', () => Act5.enterOutfitter()) },
        { text: 'Ask Bex about unlike fractions.', go: () => Act5._bexLore() },
        { text: 'Leave.', go: () => Act5.openConcord() }
      ]
    });
  },

  _bexLore() {
    Story.show({
      illustration: 'concordCity',
      speaker: 'Outfitter Bex',
      text: '<p>"Adding fractions with different bottoms? It\'s just like my fabric. You can\'t add a half-yard to a third-yard until you cut them into the <em>same</em> size pieces — sixths, in that case. Three sixths plus two sixths is five sixths. Easy, once they match." She taps the Common-Denominator Ring on her shelf. "That little thing does the cutting for you. Finds the common bottom every time."</p>',
      choices: [
        { text: 'Browse the outfitter.', go: () => Shop.open('guild_outfitter', () => Act5.enterOutfitter()) },
        { text: 'Leave.', go: () => Act5.openConcord() }
      ]
    });
  },

  sendingStone() {
    const top = Engine.weakestTopics(Game.hero, 3)[0];
    let line;
    if (top) {
      const t = (TOPICS[top.topic] || {name: top.topic}).name;
      line = '<p>"Your shakiest skill right now is <em>' + t + '</em> — about ' + Math.round(top.pct) + '%. The Reckoning School here will sharpen it."</p>';
    } else {
      line = '<p>"Not enough data yet to find your weak spot. Fight a little, and the stone will tell."</p>';
    }
    Story.show({
      illustration: 'lysaraStudy',
      speaker: 'Lysara (through the stone)',
      text: '<p>The stone warms; Lysara\'s voice arrives faint across the leagues.</p>' + line +
            '<p>"Concord taught the realm that different measures can still <em>agree</em> — a yard and a meter describe the same cloth. Find the common ground: the common denominator, the common unit, the common power of ten. That is how you win here. That is how you bring the page home."</p>',
      choices: [ { text: 'Pocket the stone.', go: () => Act5.openConcord() } ]
    });
  },

  // ---------- District map (choose order) ----------
  openDistrictMap() {
    const d = Game.hero.flags.districts5 || {};
    const all = d.scales && d.halves && d.powers;
    const choices = [];
    if (!d.scales) choices.push({ text: 'The <em>District of Scales</em> — weights & measures. (conversions, powers of 10)', tag: 'SCALES', go: () => Act5._scalesA() });
    else choices.push({ text: '<em>District of Scales — at peace</em>', locked: true });
    if (!d.halves) choices.push({ text: 'The <em>District of Halves</em> — the Fraction Exchange. (unlike fractions, mixed numbers)', tag: 'HALVES', go: () => Act5._halvesA() });
    else choices.push({ text: '<em>District of Halves — at peace</em>', locked: true });
    if (!d.powers) choices.push({ text: 'The <em>District of Powers</em> — the ×10 guild. (powers of 10, conversions)', tag: 'POWERS', go: () => Act5._powersA() });
    else choices.push({ text: '<em>District of Powers — at peace</em>', locked: true });
    if (all) choices.push({ text: 'Descend beneath the Monument to face <em>the Babel-Engine</em>. <span class="story-choice-tag">FINAL</span>', go: () => Act5._babelApproach() });
    choices.push({ text: 'Back to the plaza.', go: () => Act5.openConcord() });
    Story.show({
      illustration: 'concordCity',
      speaker: 'Mira',
      text: '<p>You stand at the crooked Monument. The three districts spread around you, each louder than the last. "Any order works," Mira says. "But the thing under the Monument won\'t show itself until all three are quiet. Where to first?"</p>',
      choices: choices
    });
  },

  // ---- Scales district ----
  _scalesA() {
    Story.show({
      illustration: 'districtScales',
      speaker: '',
      text: '<p>The District of Scales is a forest of hanging balances, every one tilted wrong. Merchants shout that a gram is a kilogram, that an hour holds six minutes. A shimmering <em>Tare-Wisp</em> — a balance-scale spirit with crooked pans — drifts down to "weigh" you.</p>',
      choices: [
        { text: 'Set the scales right.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'tare_wisp',
          onVictory: () => { Game.save(); Act5._scalesBoss(); },
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  _scalesBoss() {
    Story.show({
      illustration: 'districtScales',
      speaker: '',
      text: '<p>At the district\'s heart looms <em>the Misweigher</em>, a hunched construct with a rigged balance for a head, holding a one-gram weight in one hand and a "nine-kilogram" weight (that is clearly also one gram) in the other.</p>' +
            '<p style="color:#caa84a;font-style:italic;">"Step onto my scale, hero. I promise to weigh you fairly. I am, after all, incapable of it."</p>',
      choices: [
        { text: 'Weigh in.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'the_misweigher',
          onVictory: () => Act5._districtDone('scales', 'the Accord-Blade'),
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  // ---- Halves district ----
  _halvesA() {
    Story.show({
      illustration: 'districtHalves',
      speaker: '',
      text: '<p>The District of Halves is the grand Fraction Exchange, its walls inlaid with pie-charts and number-lines. Traders scream that one-half plus one-third equals two-fifths (it does not). A papery <em>Tally-Gremlin</em> scuttles out, covered in mismatched tally-marks.</p>',
      choices: [
        { text: 'Correct its sums.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'tally_gremlin',
          onVictory: () => { Game.save(); Act5._halvesBoss(); },
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  _halvesBoss() {
    Story.show({
      illustration: 'districtHalves',
      speaker: '',
      text: '<p>On the Exchange floor waits <em>the Sunderer</em> — a clerk split perfectly down the middle, one half marked "1/3" and the other "1/4," forever refusing to find common ground.</p>' +
            '<p style="color:#cc8aa0;font-style:italic;">"Thirds on the left. Quarters on the right. They will NEVER agree. And neither, hero, will we."</p>',
      choices: [
        { text: 'Find the common denominator.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'the_sunderer',
          onVictory: () => Act5._districtDone('halves', 'the Common-Denominator Ring'),
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  // ---- Powers district ----
  _powersA() {
    Story.show({
      illustration: 'districtPowers',
      speaker: '',
      text: '<p>The District of Powers rises in stepped towers, each ten times taller than the last, lit by a great turning ×10 wheel. Here the guild multiplies and divides prices by tens and hundreds at random. A chain of glowing <em>Zero-Sprites</em> coils toward you, multiplying as it comes.</p>',
      choices: [
        { text: 'Cancel the zeros.', tag: 'COMBAT', go: () => Engine.startCombat({
          enemyId: 'zero_sprite',
          onVictory: () => { Game.save(); Act5._powersBoss(); },
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  _powersBoss() {
    Story.show({
      illustration: 'districtPowers',
      speaker: '',
      text: '<p>Atop the tallest tower stands <em>the Decimator</em>, draped in strands of zeros, a glowing "10ⁿ" where its face should be. With a flick it shifts every decimal point in the district one place the wrong way.</p>' +
            '<p style="color:#88c4d8;font-style:italic;">"Times ten. Divide by a hundred. Watch the zeros come and go. Can you still tell what anything is WORTH?"</p>',
      choices: [
        { text: 'Hold the place values steady.', tag: 'BOSS', go: () => Engine.startCombat({
          enemyId: 'the_decimator',
          onVictory: () => Act5._districtDone('powers', 'the Loop of Powers'),
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  _districtDone(key, lootName) {
    Game.hero.flags.districts5[key] = true;
    Game.hero.flags.actsDone = Math.max(Game.hero.flags.actsDone || 0, 1);
    Game.save();
    const done = this._districtsDone();
    Story.show({
      illustration: 'concordCity',
      speaker: 'Mira',
      text: '<p>The district falls quiet. Merchants blink, look at their own scales, and begin — sheepishly — to agree again. You pocket <em>' + lootName + '</em>.</p>' +
            (done >= 3
              ? '<p>"That\'s all three," Mira breathes. The crooked Monument shudders; a stair grinds open beneath it. "Whatever\'s been doing this... it\'s right down there."</p>'
              : '<p>"' + done + ' down, ' + (3 - done) + ' to go," Mira says. "Where next?"</p>'),
      choices: done >= 3
        ? [ { text: 'Descend beneath the Monument.', tag: 'FINAL', go: () => Act5._babelApproach() },
            { text: 'Resupply in the plaza first.', go: () => Act5.openConcord() } ]
        : [ { text: 'Choose the next district.', go: () => Act5.openDistrictMap() },
            { text: 'Resupply in the plaza first.', go: () => Act5.openConcord() } ]
    });
  },

  _babelApproach() {
    Story.show({
      illustration: 'babelChamber',
      speaker: '',
      text: '<p>The stair winds down into a vast round hall whose walls are scrawled with every measure ever invented — halves and kilometers and powers of ten, all shouting over one another. At its center, on a ruined tower of mismatched machinery, the page of the Codex turns slowly in the air. Around it, the <em>Babel-Engine</em> assembles itself from a thousand broken instruments: a balance here, an abacus there, a clock face, a measuring wheel.</p>' +
            '<p style="color:#f0a838;font-style:italic;">"I AM EVERY MEASURE AND THEREFORE NONE. I MAKE ALL NUMBERS DISAGREE. AGREE WITH ME, LITTLE HERO — OR PROVE ME WRONG."</p>',
      choices: [
        { text: 'Prove it wrong.', tag: 'FINAL', go: () => Engine.startCombat({
          enemyId: 'babel_engine',
          onVictory: () => Act5._finishAct5(),
          onDefeat: () => Act5.openConcord()
        }) }
      ]
    });
  },

  _finishAct5() {
    Game.hero.questNode = 'act5_complete';
    UI.toast('Recovered: Page Five of the Numerian Codex');
    Game.hero.titles = Game.hero.titles || [];
    if (!Game.hero.titles.includes('Concord-Keeper')) Game.hero.titles.push('Concord-Keeper');
    Game.save();
    document.getElementById('act-stamp').textContent = 'ACT V COMPLETE';
    document.getElementById('act-complete-illustration').innerHTML = Art.concordAccord();
    document.getElementById('act-complete-title').textContent = 'The City Agrees Again';
    document.getElementById('act-complete-text').innerHTML =
      '<p>The Babel-Engine seizes, shudders, and falls silent — and as it does, every scale in Concord swings level, every measuring-tape reads true, and a thousand arguments end mid-word as merchants realise, all at once, that a half really is bigger than a third and always was.</p>' +
      '<p>You lift the fifth page from the air. Above, the great Monument-balance rights itself with a deep, satisfied <em>clang</em>, and the city erupts in cheering. For the first time in months, every guild flies the same gold banner.</p>' +
      '<p>"Concord means agreement," Mira says, grinning at the celebration. "Suits you." <em>Five pages. One to go.</em></p>';
    document.getElementById('act-complete-rewards').innerHTML =
      '<div class="reward-line">⚜ Page Five of the Numerian Codex (fractions &amp; conversions)</div>' +
      '<div class="reward-line">⚜ Title earned: <em>Concord-Keeper</em></div>' +
      '<div class="reward-line">⚜ The Babel-Key &amp; Medal of Concord are yours</div>' +
      '<div class="reward-line">⚜ The final act opens when you return to Lysara\'s Tower</div>';
    showScreen('act-complete');
  }
};

if (typeof window !== 'undefined') window.Act5 = Act5;
