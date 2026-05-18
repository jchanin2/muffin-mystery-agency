// challenges.js — The Clockmaker's Workshop runtime
//
// Each renderer takes (challenge, container, chapterMap) and returns
// { evaluate: () => { ok, message } }.

const Challenges = {

  // ============================================================
  // ruleFromTable — full table given, multiple-choice rule
  // ============================================================
  ruleFromTable(challenge, container) {
    this._renderRuleTable(challenge.table, container);
    const list = document.createElement('div');
    list.className = 'option-list';
    let selected = null;
    challenge.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        list.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = opt;
      });
      list.appendChild(btn);
    });
    container.appendChild(list);
    return {
      evaluate: () => {
        if (!selected) return { ok: false, message: 'Pick the rule that fits the table.' };
        if (selected === challenge.answer) return { ok: true, message: 'That\'s the rule.' };
        return { ok: false, message: 'Not that one. Plug each input into the rule and check the output.' };
      }
    };
  },

  // ============================================================
  // patternTable — student fills blanks ('?') in a rule-based table
  // ============================================================
  patternTable(challenge, container) {
    const inputs = this._renderInputTable(challenge.headers, challenge.rows, container);
    return {
      evaluate: () => {
        const expected = challenge.answers.slice();
        for (let i = 0; i < inputs.length; i++) {
          const v = parseFloat(inputs[i].value);
          if (Number.isNaN(v)) return { ok: false, message: 'Fill in every blank.' };
          if (v !== expected[i]) return { ok: false, message: 'Not all cells match the rule — check each row.' };
        }
        return { ok: true, message: 'Every cell follows the rule.' };
      }
    };
  },

  // ============================================================
  // sequence — extend a numerical pattern (N more terms)
  // ============================================================
  sequence(challenge, container) {
    const display = document.createElement('div');
    display.style.cssText = 'font-family:Special Elite,monospace;font-size:1.6rem;color:var(--brass-glow);background:rgba(0,0,0,0.3);padding:14px 22px;border-radius:6px;border:1px solid rgba(184,144,42,0.3);margin-bottom:12px;letter-spacing:0.05em;';
    display.textContent = challenge.sequence.join(', ') + ', ?, ?, ?';
    container.appendChild(display);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:10px;';
    const inputs = [];
    for (let i = 0; i < challenge.next.length; i++) {
      const inp = this._numberInput({ className: 'field-input', placeholder: '?' });
      inp.style.width = '90px';
      inp.style.fontSize = '1.2rem';
      wrap.appendChild(inp);
      inputs.push(inp);
    }
    container.appendChild(wrap);
    return {
      evaluate: () => {
        for (let i = 0; i < inputs.length; i++) {
          const v = parseFloat(inputs[i].value);
          if (Number.isNaN(v)) return { ok: false, message: 'Type the next three terms.' };
          if (v !== challenge.next[i]) return { ok: false, message: 'One of those isn\'t right — check the rule.' };
        }
        return { ok: true, message: 'Pattern continued cleanly.' };
      }
    };
  },

  // ============================================================
  // twoPatternCompare — two patterns side by side, pick the rule
  // ============================================================
  twoPatternCompare(challenge, container) {
    // Render a single 3-column table that shows both patterns
    this._renderRuleTable({ headers: challenge.headers, rows: challenge.rows }, container);
    const list = document.createElement('div');
    list.className = 'option-list';
    let selected = null;
    challenge.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        list.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = opt;
      });
      list.appendChild(btn);
    });
    container.appendChild(list);
    return {
      evaluate: () => {
        if (!selected) return { ok: false, message: 'Pick the statement that describes how the two patterns relate.' };
        if (selected === challenge.answer) return { ok: true, message: 'Patterns related.' };
        return { ok: false, message: 'Not that one. Check the relationship at every step.' };
      }
    };
  },

  // ============================================================
  // graphRule — plot N ordered pairs that follow a rule
  // ============================================================
  graphRule(challenge, container, chapterMap) {
    return Challenges.plotShape(challenge, container, chapterMap);
  },

  // ============================================================
  // plotShape — plot points in order, then identify the shape
  // ============================================================
  plotShape(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const targets = challenge.points;
    const { svgEl, getPoint, ns } = this._buildGrid(size, container, true, chapterMap);
    const plotted = [];
    let selectedOption = null;

    const msg = document.createElement('div');
    msg.style.cssText = 'font-family:Special Elite,monospace;font-size:0.85rem;color:var(--brass-glow);margin-top:8px;text-align:center;';
    msg.textContent = 'Click point 1: (' + targets[0][0] + ', ' + targets[0][1] + ')';
    container.appendChild(msg);

    const opts = document.createElement('div');
    opts.className = 'option-list';
    opts.style.display = 'none';
    challenge.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        opts.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = opt;
      });
      opts.appendChild(btn);
    });
    container.appendChild(opts);

    svgEl.addEventListener('click', (e) => {
      if (plotted.length >= targets.length) return;
      const pt = getPoint(e);
      if (!pt) return;
      const expected = targets[plotted.length];
      if (pt.x !== expected[0] || pt.y !== expected[1]) {
        msg.textContent = 'Not (' + expected[0] + ', ' + expected[1] + '). Try again.';
        return;
      }
      plotted.push(pt);
      const px = (pt.x / size) * 320 + 30;
      const py = 330 - (pt.y / size) * 320;
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('r', 5);
      dot.setAttribute('class', 'plotted-point');
      svgEl.appendChild(dot);
      const lbl = document.createElementNS(ns, 'text');
      lbl.setAttribute('x', px + 8); lbl.setAttribute('y', py - 6);
      lbl.setAttribute('class', 'landmark-label');
      lbl.textContent = '(' + pt.x + ',' + pt.y + ')';
      svgEl.appendChild(lbl);
      if (plotted.length > 1) {
        const prev = plotted[plotted.length - 2];
        const ppx = (prev.x / size) * 320 + 30;
        const ppy = 330 - (prev.y / size) * 320;
        const ln = document.createElementNS(ns, 'line');
        ln.setAttribute('x1', ppx); ln.setAttribute('y1', ppy);
        ln.setAttribute('x2', px); ln.setAttribute('y2', py);
        ln.setAttribute('class', 'plot-line');
        svgEl.appendChild(ln);
      }
      if (plotted.length === targets.length) {
        msg.textContent = 'Now — what do the points trace?';
        opts.style.display = 'flex';
      } else {
        const n = targets[plotted.length];
        msg.textContent = 'Click point ' + (plotted.length + 1) + ': (' + n[0] + ', ' + n[1] + ')';
      }
    });

    return {
      evaluate: () => {
        if (plotted.length < targets.length) return { ok: false, message: 'Plot all the points first.' };
        if (!selectedOption) return { ok: false, message: 'Pick what the points trace.' };
        if (selectedOption === challenge.answer) return { ok: true, message: 'Correct.' };
        return { ok: false, message: 'Look at the line you drew and try again.' };
      }
    };
  },

  // ============================================================
  // sortShapes — click matching shapes
  // ============================================================
  sortShapes(challenge, container) {
    const grid = document.createElement('div');
    grid.className = 'shape-grid';
    container.appendChild(grid);
    const selected = new Set();
    challenge.shapes.forEach(name => {
      const tile = document.createElement('div');
      tile.className = 'shape-tile';
      tile.dataset.shape = name;
      tile.innerHTML = renderShape(name);
      tile.addEventListener('click', () => {
        if (tile.classList.toggle('selected')) selected.add(name);
        else selected.delete(name);
      });
      grid.appendChild(tile);
    });
    return {
      evaluate: () => {
        const correct = challenge.shapes.filter(n => shapeHasTag(n, challenge.criterion));
        const exp = new Set(correct);
        const ok = (exp.size === selected.size) && [...exp].every(s => selected.has(s));
        if (ok) return { ok: true, message: 'Every one identified.' };
        if (selected.size === 0) return { ok: false, message: 'Click each shape you think matches.' };
        return { ok: false, message: 'Not quite — re-check what counts as a ' + challenge.criterion + '.' };
      }
    };
  },

  // ============================================================
  // dragClassify — click-to-bin shapes
  // ============================================================
  dragClassify(challenge, container) {
    const layout = document.createElement('div');
    layout.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:14px;align-items:center;';
    container.appendChild(layout);
    const tray = document.createElement('div');
    tray.className = 'shape-grid';
    tray.style.maxWidth = '520px';
    layout.appendChild(tray);
    const status = document.createElement('div');
    status.className = 'classify-instruction';
    status.textContent = 'Click a shape, then click the bin where it belongs.';
    layout.appendChild(status);
    const binsRow = document.createElement('div');
    binsRow.className = 'classify-bins';
    layout.appendChild(binsRow);

    let activeShape = null;
    const placement = {};

    challenge.shapes.forEach(name => {
      const tile = document.createElement('div');
      tile.className = 'shape-tile';
      tile.dataset.shape = name;
      tile.innerHTML = renderShape(name);
      tile.addEventListener('click', () => {
        if (tile.classList.contains('placed')) return;
        tray.querySelectorAll('.shape-tile').forEach(t => t.classList.remove('selected'));
        if (activeShape === name) { activeShape = null; }
        else { activeShape = name; tile.classList.add('selected'); }
      });
      tray.appendChild(tile);
    });

    challenge.bins.forEach(binCat => {
      const bin = document.createElement('div');
      bin.className = 'classify-bin';
      bin.dataset.cat = binCat;
      bin.innerHTML =
        '<div class="classify-bin-label">' + (CATEGORY_LABELS[binCat] || binCat) + '</div>' +
        '<div class="classify-bin-contents"></div>';
      bin.addEventListener('click', (e) => {
        if (e.target.closest('.mini-shape')) return;
        if (!activeShape) { status.textContent = 'Click a shape first, then a bin.'; return; }
        const placedShape = activeShape;
        placement[placedShape] = binCat;
        const tile = tray.querySelector('[data-shape="' + placedShape + '"]');
        tile.classList.remove('selected'); tile.classList.add('placed');
        const mini = document.createElement('div');
        mini.className = 'mini-shape';
        mini.title = 'Click to remove';
        mini.innerHTML = renderShape(placedShape);
        mini.addEventListener('click', (ev) => {
          ev.stopPropagation();
          delete placement[placedShape];
          mini.remove();
          tile.classList.remove('placed');
          status.textContent = 'Click a shape, then click the bin where it belongs.';
        });
        bin.querySelector('.classify-bin-contents').appendChild(mini);
        activeShape = null;
        status.textContent = 'Click a shape, then click the bin where it belongs.';
      });
      binsRow.appendChild(bin);
    });

    return {
      evaluate: () => {
        if (Object.keys(placement).length < challenge.shapes.length)
          return { ok: false, message: 'Place every shape in a bin.' };
        for (const name of challenge.shapes) {
          if (placement[name] !== SHAPES[name].category)
            return { ok: false, message: 'Not all in the right bin — check each shape\'s most specific category.' };
        }
        return { ok: true, message: 'Catalogued perfectly.' };
      }
    };
  },

  // ============================================================
  // shapeTrueFalse — true/false statement about hierarchy
  // ============================================================
  shapeTrueFalse(challenge, container) {
    const stmt = document.createElement('div');
    stmt.style.cssText = 'font-family:Cormorant Garamond,serif;font-style:italic;font-size:1.3rem;color:var(--ivory);background:rgba(0,0,0,0.25);padding:14px 20px;border-radius:6px;text-align:center;margin-bottom:14px;border-left:3px solid var(--brass);';
    stmt.textContent = '"' + challenge.statement + '"';
    container.appendChild(stmt);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:14px;';
    let selected = null;
    ['TRUE', 'FALSE'].forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.style.cssText = 'min-width:120px;text-align:center;font-family:Special Elite,monospace;letter-spacing:0.1em;';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = (label === 'TRUE');
      });
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
    return {
      evaluate: () => {
        if (selected === null) return { ok: false, message: 'Pick TRUE or FALSE.' };
        if (selected === challenge.answer) {
          return { ok: true, message: challenge.explanation || 'Correct.' };
        }
        return { ok: false, message: 'Not quite — think about the definitions.' };
      }
    };
  },

  // ============================================================
  // perimeterArea — labeled rectangle, compute P or A
  // ============================================================
  perimeterArea(challenge, container) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 300 200');
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '200');
    svg.style.background = 'var(--ivory-light)';
    svg.style.borderRadius = '6px';
    svg.style.padding = '8px';
    const w = challenge.width, h = challenge.height;
    const scale = Math.min(200 / w, 130 / h);
    const rectW = w * scale, rectH = h * scale;
    const x0 = (300 - rectW) / 2, y0 = (200 - rectH) / 2;
    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', x0); rect.setAttribute('y', y0);
    rect.setAttribute('width', rectW); rect.setAttribute('height', rectH);
    rect.setAttribute('fill', '#b8902a'); rect.setAttribute('stroke', '#1a1208'); rect.setAttribute('stroke-width', 2);
    svg.appendChild(rect);
    const wL = document.createElementNS(ns, 'text');
    wL.setAttribute('x', x0 + rectW / 2); wL.setAttribute('y', y0 + rectH + 18);
    wL.setAttribute('text-anchor', 'middle'); wL.setAttribute('font-family', 'Special Elite, monospace');
    wL.setAttribute('font-size', '13'); wL.setAttribute('fill', '#1a1208');
    wL.textContent = w + ' in';
    svg.appendChild(wL);
    const hL = document.createElementNS(ns, 'text');
    hL.setAttribute('x', x0 - 8); hL.setAttribute('y', y0 + rectH / 2);
    hL.setAttribute('text-anchor', 'end'); hL.setAttribute('font-family', 'Special Elite, monospace');
    hL.setAttribute('font-size', '13'); hL.setAttribute('fill', '#1a1208');
    hL.textContent = h + ' in';
    svg.appendChild(hL);
    container.appendChild(svg);

    const inp = this._numberInput({ className: 'field-input', placeholder: challenge.mode === 'area' ? 'sq in' : 'in' });
    container.appendChild(inp);
    return {
      evaluate: () => {
        const v = parseFloat(inp.value);
        if (Number.isNaN(v)) return { ok: false, message: 'Type your answer.' };
        if (v === challenge.answer) return { ok: true, message: challenge.mode === 'area' ? 'Area measured.' : 'Perimeter measured.' };
        return { ok: false, message: challenge.mode === 'area' ? 'Not quite — area = width × height.' : 'Not quite — perimeter is around the outside.' };
      }
    };
  },

  // ============================================================
  // gridClick — click a coord-grid point
  // ============================================================
  gridClick(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const target = challenge.target;
    const { svgEl, getPoint } = this._buildGrid(size, container, true, chapterMap);
    let userPoint = null;
    svgEl.addEventListener('click', (e) => {
      const pt = getPoint(e); if (!pt) return;
      userPoint = pt;
      this._renderUserMarker(svgEl, size, pt, 'user', { showLabel: false });
    });
    return {
      evaluate: () => {
        if (!userPoint) return { ok: false, message: 'Click a point on the grid first.' };
        if (userPoint.x === target.x && userPoint.y === target.y) {
          this._renderUserMarker(svgEl, size, target, 'plotted', { label: challenge.landmark });
          return { ok: true, message: 'Plotted exactly.' };
        }
        return { ok: false, message: 'Not quite — check the x and y values.' };
      }
    };
  },

  // ============================================================
  // identifyPoint — read a marker's coords
  // ============================================================
  identifyPoint(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const marker = challenge.marker;
    const { svgEl } = this._buildGrid(size, container, false, chapterMap);
    this._renderUserMarker(svgEl, size, marker, 'target', { showLabel: false });
    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin-top:14px;display:flex;gap:8px;align-items:center;font-family:Special Elite,monospace;font-size:1.2rem;color:var(--brass-glow);';
    const open = document.createElement('span'); open.textContent = '(';
    const comma = document.createElement('span'); comma.textContent = ',';
    const close = document.createElement('span'); close.textContent = ')';
    const style = 'width:54px;padding:6px;border:2px solid var(--brass);background:var(--ivory);color:var(--ink);text-align:center;border-radius:3px;font:inherit;';
    const cx = this._numberInput({ id: 'cx', min: 0, max: size, style });
    const cy = this._numberInput({ id: 'cy', min: 0, max: size, style });
    wrap.appendChild(open); wrap.appendChild(cx); wrap.appendChild(comma); wrap.appendChild(cy); wrap.appendChild(close);
    container.appendChild(wrap);
    return {
      evaluate: () => {
        const xv = parseInt(cx.value, 10);
        const yv = parseInt(cy.value, 10);
        if (Number.isNaN(xv) || Number.isNaN(yv)) return { ok: false, message: 'Type both coordinates.' };
        if (xv === marker.x && yv === marker.y) {
          this._renderUserMarker(svgEl, size, marker, 'plotted', { label: challenge.landmark });
          return { ok: true, message: 'Read precisely.' };
        }
        return { ok: false, message: 'Not quite — read the grid carefully.' };
      }
    };
  },

  // ============================================================
  // distance — gap between two grid points
  // ============================================================
  distance(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const { svgEl } = this._buildGrid(size, container, false, chapterMap);
    this._renderUserMarker(svgEl, size, { x: challenge.pointA[0], y: challenge.pointA[1] }, 'target', { label: challenge.endpointA || '', showLabel: !!challenge.endpointA });
    this._renderUserMarker(svgEl, size, { x: challenge.pointB[0], y: challenge.pointB[1] }, 'target', { label: challenge.endpointB || '', showLabel: !!challenge.endpointB });
    const ns = 'http://www.w3.org/2000/svg';
    const ax = (challenge.pointA[0] / size) * 320 + 30;
    const ay = 330 - (challenge.pointA[1] / size) * 320;
    const bx = (challenge.pointB[0] / size) * 320 + 30;
    const by = 330 - (challenge.pointB[1] / size) * 320;
    const ln = document.createElementNS(ns, 'line');
    ln.setAttribute('x1', ax); ln.setAttribute('y1', ay);
    ln.setAttribute('x2', bx); ln.setAttribute('y2', by);
    ln.setAttribute('stroke', '#9a2828'); ln.setAttribute('stroke-width', 2);
    ln.setAttribute('stroke-dasharray', '4 3');
    svgEl.appendChild(ln);
    const inp = this._numberInput({ className: 'field-input', placeholder: 'steps' });
    container.appendChild(inp);
    return {
      evaluate: () => {
        const v = parseFloat(inp.value);
        if (Number.isNaN(v)) return { ok: false, message: 'Type the distance in grid steps.' };
        if (v === challenge.answer) return { ok: true, message: 'Distance read.' };
        return { ok: false, message: 'Not quite — count the grid steps east and north.' };
      }
    };
  },

  // ============================================================
  // coordWord — start at (x,y), walk N east, M north, click result
  // ============================================================
  coordWord(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const target = challenge.target;
    const { svgEl, getPoint } = this._buildGrid(size, container, true, chapterMap);
    if (challenge.start) {
      this._renderUserMarker(svgEl, size, { x: challenge.start[0], y: challenge.start[1] }, 'target', { label: 'Start', showLabel: true });
    }
    let userPoint = null;
    svgEl.addEventListener('click', (e) => {
      const pt = getPoint(e); if (!pt) return;
      userPoint = pt;
      this._renderUserMarker(svgEl, size, pt, 'user', { showLabel: false });
    });
    return {
      evaluate: () => {
        if (!userPoint) return { ok: false, message: 'Click where you end up.' };
        if (userPoint.x === target.x && userPoint.y === target.y) {
          this._renderUserMarker(svgEl, size, target, 'plotted', { label: challenge.landmark });
          return { ok: true, message: 'You\'ve arrived.' };
        }
        return { ok: false, message: 'Not quite — count the steps again from the start.' };
      }
    };
  },

  // ============================================================
  // expression — type the result of a parenthesised expression
  // ============================================================
  expression(challenge, container) {
    const display = document.createElement('div');
    display.style.cssText = 'font-family:Special Elite,monospace;font-size:2rem;color:var(--brass-glow);letter-spacing:0.05em;background:rgba(0,0,0,0.25);padding:14px 28px;border-radius:6px;border:1px solid rgba(184,144,42,0.3);margin-bottom:14px;';
    display.textContent = challenge.expression + ' = ?';
    container.appendChild(display);
    const inp = this._numberInput({ className: 'field-input', placeholder: '?' });
    container.appendChild(inp);
    return {
      evaluate: () => {
        const v = parseFloat(inp.value);
        if (Number.isNaN(v)) return { ok: false, message: 'Type your answer.' };
        if (v === challenge.answer) return { ok: true, message: 'Tumbler clicks into place.' };
        return { ok: false, message: 'Not quite — remember, parentheses come first.' };
      }
    };
  },

  // ============================================================
  // expressionTranslate — pick the expression that matches a phrase
  // ============================================================
  expressionTranslate(challenge, container) {
    const phrase = document.createElement('div');
    phrase.style.cssText = 'font-family:Cormorant Garamond,serif;font-style:italic;font-size:1.3rem;color:var(--ivory);background:rgba(0,0,0,0.25);padding:14px 22px;border-radius:6px;text-align:center;margin-bottom:14px;border-left:3px solid var(--brass);max-width:520px;';
    phrase.textContent = '"' + challenge.phrase + '"';
    container.appendChild(phrase);
    const list = document.createElement('div');
    list.className = 'option-list';
    let selected = null;
    challenge.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.style.cssText = 'font-family:Special Elite,monospace;font-size:1.1rem;text-align:center;letter-spacing:0.03em;';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        list.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = opt;
      });
      list.appendChild(btn);
    });
    container.appendChild(list);
    return {
      evaluate: () => {
        if (!selected) return { ok: false, message: 'Pick the matching expression.' };
        if (selected === challenge.answer) return { ok: true, message: 'Translated cleanly.' };
        return { ok: false, message: 'Not that one — read the phrase part by part.' };
      }
    };
  },

  // ============================================================
  // INTERNAL HELPERS
  // ============================================================
  _numberInput(opts) {
    opts = opts || {};
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('autocorrect', 'off');
    inp.setAttribute('spellcheck', 'false');
    inp.setAttribute('inputmode', 'decimal');
    if (opts.className) inp.className = opts.className;
    if (opts.placeholder) inp.placeholder = opts.placeholder;
    if (opts.min !== undefined) inp.setAttribute('min', opts.min);
    if (opts.max !== undefined) inp.setAttribute('max', opts.max);
    if (opts.id) inp.id = opts.id;
    if (opts.style) inp.style.cssText = opts.style;
    inp.addEventListener('focus', function () { this.select(); });
    return inp;
  },

  _renderRuleTable(table, container) {
    const tbl = document.createElement('table');
    tbl.className = 'rule-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    table.headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    tbl.appendChild(thead);
    const tbody = document.createElement('tbody');
    table.rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    container.appendChild(tbl);
    return tbl;
  },

  _renderInputTable(headers, rows, container) {
    const tbl = document.createElement('table');
    tbl.className = 'rule-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headers.forEach(h => { const th = document.createElement('th'); th.textContent = h; headRow.appendChild(th); });
    thead.appendChild(headRow);
    tbl.appendChild(thead);
    const tbody = document.createElement('tbody');
    const inputs = [];
    rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        if (cell === '?') {
          const inp = this._numberInput({});
          td.appendChild(inp);
          inputs.push(inp);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    container.appendChild(tbl);
    return inputs;
  },

  // ============================================================
  // Coordinate-grid renderer (mirrors Atlas / Naturalist)
  // ============================================================
  _buildGrid(size, container, clickable, chapterMap) {
    const ns = 'http://www.w3.org/2000/svg';
    const wrap = document.createElement('div');
    wrap.className = 'coord-grid';
    container.appendChild(wrap);
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 360 360');
    svg.setAttribute('width', '360');
    svg.setAttribute('height', '360');
    if (clickable) svg.style.cursor = 'crosshair';
    wrap.appendChild(svg);
    const xToPx = (x) => (x / size) * 320 + 30;
    const yToPx = (y) => 330 - (y / size) * 320;
    for (let i = 0; i <= size; i++) {
      const x = xToPx(i);
      const ln = document.createElementNS(ns, 'line');
      ln.setAttribute('x1', x); ln.setAttribute('y1', yToPx(0));
      ln.setAttribute('x2', x); ln.setAttribute('y2', yToPx(size));
      ln.setAttribute('class', 'grid-line');
      svg.appendChild(ln);
      const lh = document.createElementNS(ns, 'line');
      lh.setAttribute('x1', xToPx(0)); lh.setAttribute('y1', yToPx(i));
      lh.setAttribute('x2', xToPx(size)); lh.setAttribute('y2', yToPx(i));
      lh.setAttribute('class', 'grid-line');
      svg.appendChild(lh);
    }
    const xa = document.createElementNS(ns, 'line');
    xa.setAttribute('x1', xToPx(0)); xa.setAttribute('y1', yToPx(0));
    xa.setAttribute('x2', xToPx(size)); xa.setAttribute('y2', yToPx(0));
    xa.setAttribute('class', 'grid-axis');
    svg.appendChild(xa);
    const ya = document.createElementNS(ns, 'line');
    ya.setAttribute('x1', xToPx(0)); ya.setAttribute('y1', yToPx(0));
    ya.setAttribute('x2', xToPx(0)); ya.setAttribute('y2', yToPx(size));
    ya.setAttribute('class', 'grid-axis');
    svg.appendChild(ya);
    for (let i = 0; i <= size; i++) {
      const xl = document.createElementNS(ns, 'text');
      xl.setAttribute('x', xToPx(i)); xl.setAttribute('y', yToPx(0) + 14);
      xl.setAttribute('text-anchor', 'middle'); xl.setAttribute('class', 'axis-label');
      xl.textContent = i;
      svg.appendChild(xl);
      if (i > 0) {
        const yl = document.createElementNS(ns, 'text');
        yl.setAttribute('x', xToPx(0) - 8); yl.setAttribute('y', yToPx(i) + 4);
        yl.setAttribute('text-anchor', 'end'); yl.setAttribute('class', 'axis-label');
        yl.textContent = i;
        svg.appendChild(yl);
      }
    }
    if (chapterMap) {
      (chapterMap.paths || []).forEach(p => {
        const ax = xToPx(p.from[0]), ay = yToPx(p.from[1]);
        const bx = xToPx(p.to[0]), by = yToPx(p.to[1]);
        const ln = document.createElementNS(ns, 'line');
        ln.setAttribute('x1', ax); ln.setAttribute('y1', ay);
        ln.setAttribute('x2', bx); ln.setAttribute('y2', by);
        ln.setAttribute('stroke', '#9a2828'); ln.setAttribute('stroke-width', '1.6');
        ln.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(ln);
      });
      (chapterMap.markers || []).forEach(m => {
        const px = xToPx(m.x), py = yToPx(m.y);
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', px); c.setAttribute('cy', py); c.setAttribute('r', 5);
        c.setAttribute('class', 'plotted-point');
        svg.appendChild(c);
        if (m.label) {
          const t = document.createElementNS(ns, 'text');
          t.setAttribute('x', px + 8); t.setAttribute('y', py - 6);
          t.setAttribute('class', 'landmark-label');
          t.textContent = m.label;
          svg.appendChild(t);
        }
      });
    }
    const getPoint = (e) => {
      const rect = svg.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 360;
      const py = ((e.clientY - rect.top) / rect.height) * 360;
      const gx = Math.round(((px - 30) / 320) * size);
      const gy = Math.round(((330 - py) / 320) * size);
      if (gx < 0 || gx > size || gy < 0 || gy > size) return null;
      return { x: gx, y: gy };
    };
    return { svgEl: svg, getPoint, ns };
  },

  _renderUserMarker(svgEl, size, pt, kind, opts) {
    opts = opts || {};
    const showLabel = (typeof opts.showLabel === 'boolean') ? opts.showLabel : true;
    const ns = 'http://www.w3.org/2000/svg';
    if (kind === 'user') {
      svgEl.querySelectorAll('.user-marker, .user-label').forEach(el => el.remove());
    }
    const px = (pt.x / size) * 320 + 30;
    const py = 330 - (pt.y / size) * 320;
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', px); c.setAttribute('cy', py); c.setAttribute('r', 6);
    if (kind === 'plotted') c.setAttribute('class', 'plotted-point');
    else if (kind === 'target') c.setAttribute('class', 'target-marker');
    else c.setAttribute('class', 'user-marker');
    svgEl.appendChild(c);
    if (showLabel && opts.label) {
      const t = document.createElementNS(ns, 'text');
      t.setAttribute('x', px + 10); t.setAttribute('y', py - 7);
      t.setAttribute('class', 'landmark-label');
      if (kind === 'user') t.classList.add('user-label');
      t.textContent = opts.label;
      svgEl.appendChild(t);
    }
  }
};

if (typeof window !== 'undefined') window.Challenges = Challenges;
