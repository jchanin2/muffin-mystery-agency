// ======================================================
// creation.js — 5-step hero creation flow
// Steps: 1 Name → 2 Class → 3 Heritage → 4 Stats → 5 Feat → 6 Summary
// ======================================================

const Creation = {
  step: 1,
  draft: null,

  start() {
    this.step = 1;
    this.draft = {
      name: '',
      classId: null,
      heritageId: null,
      stats: Object.assign({}, STAT_DEFAULT),
      feat: null,
      pointsToSpend: STAT_POINTS_AT_CREATION,
      maxPoints: STAT_POINTS_AT_CREATION
    };
    this.render();
    showScreen('creation');
  },

  render() {
    // step pips
    document.querySelectorAll('.step-pip').forEach(pip => {
      const s = parseInt(pip.getAttribute('data-step'), 10);
      pip.classList.remove('active', 'done');
      if (s === this.step) pip.classList.add('active');
      else if (s < this.step) pip.classList.add('done');
    });
    const body = document.getElementById('creation-body');
    body.innerHTML = '';
    const stepFn = this['_step' + this.step];
    if (stepFn) stepFn.call(this, body);
    // controls
    document.getElementById('btn-create-back').disabled = (this.step === 1);
    const nextBtn = document.getElementById('btn-create-next');
    if (this.step === 6) {
      nextBtn.textContent = 'Begin the Adventure ⚜';
    } else {
      nextBtn.textContent = 'Next →';
    }
    nextBtn.disabled = !this._canAdvance();
  },

  _canAdvance() {
    if (this.step === 1) return this.draft.name && this.draft.name.trim().length >= 2;
    if (this.step === 2) return !!this.draft.classId;
    if (this.step === 3) return !!this.draft.heritageId;
    if (this.step === 4) return this.draft.pointsToSpend === 0;
    if (this.step === 5) return !!this.draft.feat;
    return true;
  },

  next() {
    if (!this._canAdvance()) return;
    if (this.step === 6) {
      this._finish();
      return;
    }
    this.step++;
    // when reaching stats step, recompute starting stats from class+heritage
    if (this.step === 4) {
      const base = Object.assign({}, STAT_DEFAULT);
      // (heritage and class bonuses are added in effectiveStats automatically — base stays)
      const her = HERITAGES[this.draft.heritageId];
      this.draft.maxPoints = STAT_POINTS_AT_CREATION + (her && her.extraPoints ? her.extraPoints : 0);
      this.draft.pointsToSpend = this.draft.maxPoints - (this._spentPoints());
      this.draft.stats = base; // user spends pointsToSpend on top of base
    }
    this.render();
  },

  back() {
    if (this.step > 1) { this.step--; this.render(); }
  },

  _spentPoints() {
    let spent = 0;
    Object.keys(STAT_DEFAULT).forEach(k => {
      spent += Math.max(0, (this.draft.stats[k] || 0) - STAT_DEFAULT[k]);
    });
    return spent;
  },

  // ----------- STEP 1 — NAME -----------
  _step1(body) {
    body.innerHTML =
      '<div class="creation-step-title">What name will the world remember?</div>' +
      '<div class="creation-step-blurb">A hero is half their deeds and half their name.</div>';
    const inp = document.createElement('input');
    inp.className = 'name-input';
    inp.type = 'text';
    inp.placeholder = 'Enter your hero\'s name';
    inp.maxLength = 24;
    inp.value = this.draft.name || '';
    inp.setAttribute('autocomplete', 'off');
    inp.addEventListener('input', () => {
      this.draft.name = inp.value;
      document.getElementById('btn-create-next').disabled = !this._canAdvance();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.next(); }
    });
    body.appendChild(inp);
    setTimeout(() => inp.focus(), 50);
  },

  // ----------- STEP 2 — CLASS -----------
  _step2(body) {
    body.innerHTML =
      '<div class="creation-step-title">Choose your calling</div>' +
      '<div class="creation-step-blurb">Each class brings a unique signature ability and starting kit.</div>';
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    Object.values(CLASSES).forEach(cls => {
      const card = document.createElement('div');
      card.className = 'choice-card' + (this.draft.classId === cls.id ? ' selected' : '');
      const ability = (cls.abilities || []).map(aid => ABILITIES[aid]).filter(Boolean).map(a => a.name).join(', ');
      const bonusBlurb = Object.entries(cls.statBonus || {}).map(([k, v]) =>
        '+' + v + ' ' + STAT_DEFS.find(s => s.id === k).name
      ).join(' · ');
      card.innerHTML =
        '<div class="choice-icon">' + Art.classThumb(cls.id) + '</div>' +
        '<div class="choice-title">' + cls.name + '</div>' +
        '<div class="choice-flavor">' + cls.flavor + '</div>' +
        '<div class="choice-stat"><strong>' + bonusBlurb + '</strong><br/>Signature: ' + ability + '</div>';
      card.addEventListener('click', () => {
        this.draft.classId = cls.id;
        this.render();
      });
      grid.appendChild(card);
    });
    body.appendChild(grid);
  },

  // ----------- STEP 3 — HERITAGE -----------
  _step3(body) {
    body.innerHTML =
      '<div class="creation-step-title">Choose your heritage</div>' +
      '<div class="creation-step-blurb">Where you came from shapes what you became.</div>';
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    Object.values(HERITAGES).forEach(her => {
      const card = document.createElement('div');
      card.className = 'choice-card' + (this.draft.heritageId === her.id ? ' selected' : '');
      const bonusBlurb = Object.entries(her.statBonus || {}).map(([k, v]) =>
        '+' + v + ' ' + STAT_DEFS.find(s => s.id === k).name
      ).join(' · ');
      card.innerHTML =
        '<div class="choice-icon">' + Art.heritageThumb(her.id) + '</div>' +
        '<div class="choice-title">' + her.name + '</div>' +
        '<div class="choice-flavor">' + her.flavor + '</div>' +
        '<div class="choice-stat"><strong>' + bonusBlurb + '</strong><br/>' + her.feat + '</div>';
      card.addEventListener('click', () => {
        this.draft.heritageId = her.id;
        // default a fur color the first time Tabaxi is chosen
        if (her.id === 'tabaxi' && !this.draft.furColor) {
          this.draft.furColor = HERITAGES.tabaxi.defaultFur || 'tabby';
        }
        this.render();
      });
      grid.appendChild(card);
    });
    body.appendChild(grid);

    // Tabaxi fur-color sub-picker (only when Tabaxi is the selected heritage)
    if (this.draft.heritageId === 'tabaxi') {
      const furWrap = document.createElement('div');
      furWrap.className = 'fur-picker';
      furWrap.innerHTML = '<div class="fur-picker-label">Choose your coat</div>';
      const furRow = document.createElement('div');
      furRow.className = 'fur-row';
      Object.values(FUR_COLORS).forEach(f => {
        const swatch = document.createElement('button');
        swatch.className = 'fur-swatch' + (this.draft.furColor === f.id ? ' selected' : '');
        swatch.type = 'button';
        const stripe = f.striped
          ? '<line x1="20" y1="6" x2="20" y2="14" stroke="' + f.marking + '" stroke-width="3"/><line x1="13" y1="8" x2="12" y2="15" stroke="' + f.marking + '" stroke-width="2"/><line x1="27" y1="8" x2="28" y2="15" stroke="' + f.marking + '" stroke-width="2"/>'
          : (f.patched ? '<path d="M 10 10 Q 18 4 24 14 Q 16 18 10 14 Z" fill="' + f.marking + '"/><path d="M 26 22 Q 32 18 32 26 Q 27 28 24 24 Z" fill="' + (f.patch || f.marking) + '"/>' : '');
        swatch.innerHTML =
          '<svg width="40" height="40" viewBox="0 0 40 40">' +
            '<circle cx="20" cy="22" r="14" fill="' + f.base + '"/>' +
            '<polygon points="12,12 8,2 18,9" fill="' + f.base + '"/>' +
            '<polygon points="28,12 32,2 22,9" fill="' + f.base + '"/>' +
            stripe +
            '<ellipse cx="15" cy="22" rx="1.6" ry="2.4" fill="' + f.eye + '"/>' +
            '<ellipse cx="25" cy="22" rx="1.6" ry="2.4" fill="' + f.eye + '"/>' +
          '</svg>' +
          '<span class="fur-name">' + f.name + '</span>';
        swatch.addEventListener('click', () => { this.draft.furColor = f.id; this.render(); });
        furRow.appendChild(swatch);
      });
      furWrap.appendChild(furRow);
      body.appendChild(furWrap);
    }
  },

  // ----------- STEP 4 — STATS -----------
  _step4(body) {
    const cls = CLASSES[this.draft.classId];
    const her = HERITAGES[this.draft.heritageId];
    body.innerHTML =
      '<div class="creation-step-title">Allocate your stats</div>' +
      '<div class="creation-step-blurb">Spend your points carefully. Some you can change later; the starting balance shapes your earliest battles.</div>';
    const alloc = document.createElement('div');
    alloc.className = 'stat-allocator';
    const header = document.createElement('div');
    header.className = 'stat-allocator-header';
    header.innerHTML =
      '<div class="points-remaining">Points to spend: <strong id="points-remaining">' + this.draft.pointsToSpend + '</strong> / ' + this.draft.maxPoints + '</div>' +
      '<div style="color:#c8b078;font-style:italic;font-size:0.9em;">Bonuses from class &amp; heritage are applied automatically.</div>';
    alloc.appendChild(header);

    const rows = document.createElement('div');
    rows.className = 'stat-rows';
    STAT_DEFS.forEach(stat => {
      const row = document.createElement('div');
      row.className = 'stat-row';
      const classBonus = (cls.statBonus && cls.statBonus[stat.id]) || 0;
      const heritageBonus = (her.statBonus && her.statBonus[stat.id]) || 0;
      const totalBonus = classBonus + heritageBonus;
      const bonusLabel = totalBonus > 0 ? ' <span style="color:#aab87c;font-size:0.8em;">(+' + totalBonus + ')</span>' : '';
      row.innerHTML =
        '<div><div class="stat-row-name">' + stat.name + bonusLabel + '</div>' +
          '<div class="stat-row-blurb">' + stat.blurb + '</div></div>' +
        '<div></div>' +
        '<div class="stat-row-value" data-stat="' + stat.id + '">' + this.draft.stats[stat.id] + '</div>' +
        '<div class="stat-row-controls">' +
          '<button class="stat-btn" data-stat="' + stat.id + '" data-dir="-1">−</button>' +
          '<button class="stat-btn" data-stat="' + stat.id + '" data-dir="+1">+</button>' +
        '</div>';
      rows.appendChild(row);
    });
    alloc.appendChild(rows);
    body.appendChild(alloc);

    alloc.querySelectorAll('.stat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-stat');
        const dir = parseInt(btn.getAttribute('data-dir'), 10);
        const cur = this.draft.stats[sid];
        const stat = STAT_DEFS.find(s => s.id === sid);
        if (dir > 0) {
          if (this.draft.pointsToSpend <= 0) return;
          if (cur >= stat.max) return;
          this.draft.stats[sid]++;
          this.draft.pointsToSpend--;
        } else {
          if (cur <= STAT_DEFAULT[sid]) return;
          this.draft.stats[sid]--;
          this.draft.pointsToSpend++;
        }
        document.getElementById('points-remaining').textContent = this.draft.pointsToSpend;
        alloc.querySelector('[data-stat="' + sid + '"].stat-row-value').textContent = this.draft.stats[sid];
        document.getElementById('btn-create-next').disabled = !this._canAdvance();
        // refresh disabled state on buttons
        alloc.querySelectorAll('.stat-btn').forEach(b => {
          const s = b.getAttribute('data-stat');
          const d = parseInt(b.getAttribute('data-dir'), 10);
          const c = this.draft.stats[s];
          const sd = STAT_DEFS.find(x => x.id === s);
          if (d > 0) b.disabled = (this.draft.pointsToSpend <= 0) || (c >= sd.max);
          else b.disabled = (c <= STAT_DEFAULT[s]);
        });
      });
    });
    // initial disabled state
    alloc.querySelectorAll('.stat-btn').forEach(b => {
      const s = b.getAttribute('data-stat');
      const d = parseInt(b.getAttribute('data-dir'), 10);
      const c = this.draft.stats[s];
      const sd = STAT_DEFS.find(x => x.id === s);
      if (d > 0) b.disabled = (this.draft.pointsToSpend <= 0) || (c >= sd.max);
      else b.disabled = (c <= STAT_DEFAULT[s]);
    });
  },

  // ----------- STEP 5 — FEAT -----------
  _step5(body) {
    body.innerHTML =
      '<div class="creation-step-title">Choose a starting feat</div>' +
      '<div class="creation-step-blurb">A small but lasting edge that defines your earliest legend.</div>';
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    Object.values(FEATS).forEach(feat => {
      const card = document.createElement('div');
      card.className = 'choice-card' + (this.draft.feat === feat.id ? ' selected' : '');
      let iconSvg = '';
      if (feat.id === 'lucky') iconSvg = '<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="rgba(212,166,36,0.15)" stroke="#d4a624" stroke-width="2"/><text x="48" y="62" text-anchor="middle" font-family="Cinzel" font-size="50" fill="#d4a624">☘</text></svg>';
      else if (feat.id === 'tough') iconSvg = '<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="rgba(154,40,40,0.18)" stroke="#cc3030" stroke-width="2"/><path d="M 48 24 L 70 36 L 70 56 Q 70 72 48 80 Q 26 72 26 56 L 26 36 Z" fill="#7a2828" stroke="#5a1818" stroke-width="2"/></svg>';
      else if (feat.id === 'sharp_minded') iconSvg = '<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="rgba(58,62,138,0.18)" stroke="#a0c0ff" stroke-width="2"/><polygon points="48,18 56,42 80,42 60,56 68,80 48,66 28,80 36,56 16,42 40,42" fill="#a0c0ff"/></svg>';
      else if (feat.id === 'swift') iconSvg = '<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="rgba(58,138,72,0.15)" stroke="#aab87c" stroke-width="2"/><path d="M 30 30 L 60 50 L 36 50 L 66 70" fill="none" stroke="#aab87c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      card.innerHTML =
        '<div class="choice-icon">' + iconSvg + '</div>' +
        '<div class="choice-title">' + feat.name + '</div>' +
        '<div class="choice-flavor">' + feat.desc + '</div>';
      card.addEventListener('click', () => {
        this.draft.feat = feat.id;
        this.render();
      });
      grid.appendChild(card);
    });
    body.appendChild(grid);
  },

  // ----------- STEP 6 — SUMMARY -----------
  _step6(body) {
    const d = this.draft;
    const cls = CLASSES[d.classId];
    const her = HERITAGES[d.heritageId];
    const feat = FEATS[d.feat];
    body.innerHTML = '<div class="creation-step-title">Behold, your hero</div><div class="creation-step-blurb">Confirm to step into the world.</div>';
    const card = document.createElement('div');
    card.className = 'summary-card';
    const portraitHtml = Art.heroPortrait({ classId: d.classId, heritageId: d.heritageId, furColor: d.furColor }, 'full');
    const abilities = (cls.abilities || []).map(aid => ABILITIES[aid]).filter(Boolean).map(a => a.name).join(', ');
    // build effective stats preview
    const previewHero = { classId: d.classId, heritageId: d.heritageId, stats: d.stats, feat: d.feat, equipped: {} };
    const eff = Engine.effectiveStats(previewHero);
    const der = Engine.effectiveDerived(previewHero);
    const statsHtml = STAT_DEFS.map(s =>
      '<div style="display:flex;justify-content:space-between;font-size:0.9em;padding:2px 0;"><span>' + s.name + '</span><strong>' + (eff[s.id] || 0) + '</strong></div>'
    ).join('');
    card.innerHTML =
      '<div class="summary-portrait">' + portraitHtml + '</div>' +
      '<div class="summary-text">' +
        '<h3>' + d.name + '</h3>' +
        '<div class="subtitle">' + (d.heritageId === 'tabaxi' && FUR_COLORS[d.furColor] ? FUR_COLORS[d.furColor].name + ' ' : '') + her.name + ' ' + cls.name + '</div>' +
        '<div class="summary-section">' + statsHtml + '</div>' +
        '<div class="summary-section">' +
          '<strong>HP:</strong> ' + der.maxHp + ' &nbsp; <strong>MP:</strong> ' + der.maxMp + ' &nbsp; <strong>Timer:</strong> ' + der.timerSec + 's &nbsp; <strong>Crit:</strong> ' + der.critPct + '% &nbsp; <strong>Hints:</strong> ' + der.hints +
        '</div>' +
        '<div class="summary-section"><strong>Class:</strong> ' + cls.name + ' — ' + cls.flavor + '</div>' +
        '<div class="summary-section"><strong>Abilities:</strong> ' + abilities + '</div>' +
        '<div class="summary-section"><strong>Heritage feat:</strong> ' + her.feat + '</div>' +
        '<div class="summary-section"><strong>Chosen feat:</strong> ' + feat.name + ' — ' + feat.desc + '</div>' +
        '<div class="summary-section"><strong>Starting kit:</strong> ' + (ITEMS[cls.startWeapon] || {name:'?'}).name + ', ' + (ITEMS[cls.startArmor] || {name:'?'}).name + '</div>' +
      '</div>';
    body.appendChild(card);
  },

  _finish() {
    const d = this.draft;
    const cls = CLASSES[d.classId];
    const hero = {
      name: d.name.trim(),
      classId: d.classId,
      heritageId: d.heritageId,
      furColor: d.heritageId === 'tabaxi' ? (d.furColor || HERITAGES.tabaxi.defaultFur) : null,
      stats: Object.assign({}, d.stats),
      feat: d.feat,
      xp: 0,
      gold: 25,
      hp: null, mp: null, // will be set on first combat
      unspentPoints: 0,
      inventory: [],
      equipped: { weapon: cls.startWeapon, armor: cls.startArmor },
      mastery: {},
      flags: {},
      questNode: 'opening_cutscene',
      currentAct: 1,
      createdAt: Date.now()
    };
    // add a couple of starter potions
    Inventory.add(hero, 'minor_potion', 2);
    // Compute initial hp/mp
    const der = Engine.effectiveDerived(hero);
    hero.hp = der.maxHp;
    hero.mp = der.maxMp;
    Game.hero = hero;
    Slots.commitNewHero(hero);
    // begin the opening cutscene
    Act1.beginOpening();
  }
};

if (typeof window !== 'undefined') window.Creation = Creation;
