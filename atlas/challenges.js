// challenges.js — Interactive challenge runtime.
// Each renderer takes (challenge, container, callback) and:
//   1. Mounts its UI inside `container`
//   2. Returns an evaluator that, when called, returns
//      { ok: bool, message: string }
// The host (game.js) wires "Check" / "Continue" buttons to the evaluator.

const Challenges = {

  // ============================================================
  // 1. gridClick — click a point on a coord grid to plot it
  // ============================================================
  gridClick(challenge, container) {
    const size = challenge.gridSize || 10;
    const target = challenge.target;
    const { svgEl, getPoint } = this._buildGrid(size, container, true);
    let userPoint = null;

    svgEl.addEventListener('click', (e) => {
      const pt = getPoint(e);
      if (!pt) return;
      userPoint = pt;
      this._renderUserMarker(svgEl, size, pt, 'user');
    });

    return {
      evaluate: () => {
        if (!userPoint) return { ok: false, message: 'Click a point on the grid first.' };
        if (userPoint.x === target.x && userPoint.y === target.y) {
          this._renderUserMarker(svgEl, size, target, 'plotted');
          return { ok: true, message: 'Plotted exactly. Well done, cartographer.' };
        }
        return { ok: false, message: 'Not quite — check the x and y values and try again.' };
      }
    };
  },

  // ============================================================
  // 2. identifyPoint — read a marked point's coordinates
  // ============================================================
  identifyPoint(challenge, container) {
    const size = challenge.gridSize || 10;
    const marker = challenge.marker;
    const { svgEl } = this._buildGrid(size, container, false);
    this._renderUserMarker(svgEl, size, marker, 'target');

    const wrap = document.createElement('div');
    wrap.style.marginTop = '14px';
    wrap.style.display = 'flex';
    wrap.style.gap = '8px';
    wrap.style.alignItems = 'center';
    wrap.style.fontFamily = 'Special Elite, monospace';
    wrap.style.fontSize = '1.2rem';
    wrap.style.color = 'var(--brass-glow)';
    wrap.innerHTML =
      '<span>(</span>' +
      '<input id="cx" type="number" min="0" max="' + size + '" style="width:50px;padding:6px;border:2px solid var(--brass-light);background:rgba(0,0,0,0.3);color:var(--parchment-light);text-align:center;border-radius:3px;font:inherit;">' +
      '<span>,</span>' +
      '<input id="cy" type="number" min="0" max="' + size + '" style="width:50px;padding:6px;border:2px solid var(--brass-light);background:rgba(0,0,0,0.3);color:var(--parchment-light);text-align:center;border-radius:3px;font:inherit;">' +
      '<span>)</span>';
    container.appendChild(wrap);

    return {
      evaluate: () => {
        const xv = parseInt(wrap.querySelector('#cx').value, 10);
        const yv = parseInt(wrap.querySelector('#cy').value, 10);
        if (Number.isNaN(xv) || Number.isNaN(yv)) return { ok: false, message: 'Type both coordinates.' };
        if (xv === marker.x && yv === marker.y) return { ok: true, message: 'Read precisely. Cartographer\'s eye.' };
        return { ok: false, message: 'Not quite — read the grid carefully.' };
      }
    };
  },

  // ============================================================
  // 3. plotShape — plot N points in order, then identify the shape
  // ============================================================
  plotShape(challenge, container) {
    const size = challenge.gridSize || 10;
    const targets = challenge.points; // [[x,y],...]
    const { svgEl, getPoint, ns } = this._buildGrid(size, container, true);
    let plotted = []; // points the user has clicked
    let selectedOption = null;

    const wrapMsg = document.createElement('div');
    wrapMsg.style.cssText = 'font-family:Special Elite,monospace;font-size:0.85rem;color:var(--brass-glow);margin-top:8px;text-align:center;';
    wrapMsg.textContent = 'Click point 1: (' + targets[0][0] + ', ' + targets[0][1] + ')';
    container.appendChild(wrapMsg);

    // Multiple choice options below
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
        wrapMsg.textContent = 'That isn\'t (' + expected[0] + ', ' + expected[1] + '). Try again.';
        wrapMsg.style.color = 'var(--crimson)';
        return;
      }
      plotted.push(pt);
      // Add point + line to previous point (or close polygon if last)
      const px = (pt.x / size) * 320 + 30;
      const py = 330 - (pt.y / size) * 320;
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('r', 5);
      dot.setAttribute('class', 'plotted-point');
      svgEl.appendChild(dot);
      const lbl = document.createElementNS(ns, 'text');
      lbl.setAttribute('x', px + 8); lbl.setAttribute('y', py - 6);
      lbl.setAttribute('class', 'point-label');
      lbl.textContent = '(' + pt.x + ',' + pt.y + ')';
      svgEl.appendChild(lbl);

      if (plotted.length > 1) {
        const prev = plotted[plotted.length - 2];
        const ppx = (prev.x / size) * 320 + 30;
        const ppy = 330 - (prev.y / size) * 320;
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', ppx); line.setAttribute('y1', ppy);
        line.setAttribute('x2', px); line.setAttribute('y2', py);
        line.setAttribute('class', 'plot-line');
        svgEl.appendChild(line);
      }

      if (plotted.length === targets.length) {
        // Close the shape if it's a polygon (more than 2 points & not 'connect: line')
        if (challenge.connect !== 'line' && targets.length > 2) {
          const first = plotted[0];
          const fpx = (first.x / size) * 320 + 30;
          const fpy = 330 - (first.y / size) * 320;
          const closeLine = document.createElementNS(ns, 'line');
          closeLine.setAttribute('x1', px); closeLine.setAttribute('y1', py);
          closeLine.setAttribute('x2', fpx); closeLine.setAttribute('y2', fpy);
          closeLine.setAttribute('class', 'plot-line');
          svgEl.appendChild(closeLine);
        }
        wrapMsg.textContent = 'Now: what shape did the captain draw?';
        wrapMsg.style.color = 'var(--brass-glow)';
        opts.style.display = 'flex';
      } else {
        const next = targets[plotted.length];
        wrapMsg.textContent = 'Click point ' + (plotted.length + 1) + ': (' + next[0] + ', ' + next[1] + ')';
        wrapMsg.style.color = 'var(--brass-glow)';
      }
    });

    return {
      evaluate: () => {
        if (plotted.length < targets.length) return { ok: false, message: 'Plot all the points first.' };
        if (!selectedOption) return { ok: false, message: 'Choose what shape it is.' };
        if (selectedOption === challenge.answer) return { ok: true, message: 'Correct — ' + selectedOption + '.' };
        return { ok: false, message: 'Not that one. Look at the lines you drew.' };
      }
    };
  },

  // ============================================================
  // 4. sortShapes — click all shapes matching a criterion
  // ============================================================
  sortShapes(challenge, container) {
    const grid = document.createElement('div');
    grid.className = 'shape-grid';
    container.appendChild(grid);

    const criterion = challenge.criterion;
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
        const correct = challenge.shapes.filter(n => shapeHasTag(n, criterion));
        const expected = new Set(correct);
        const ok = (expected.size === selected.size) && [...expected].every(s => selected.has(s));
        if (ok) return { ok: true, message: 'Every one identified.' };
        if (selected.size === 0) return { ok: false, message: 'Click on the shapes you think match.' };
        return { ok: false, message: 'Not quite — check each shape\'s definition again.' };
      }
    };
  },

  // ============================================================
  // 5. dragClassify — sort shapes into their named bins
  // ============================================================
  dragClassify(challenge, container) {
    const layout = document.createElement('div');
    layout.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:14px;align-items:center;';
    container.appendChild(layout);

    // Top: shapes to sort
    const tray = document.createElement('div');
    tray.className = 'shape-grid';
    tray.style.maxWidth = '500px';
    layout.appendChild(tray);

    // Status line
    const status = document.createElement('div');
    status.className = 'classify-instruction';
    status.textContent = 'Click a shape, then click the bin where it belongs.';
    layout.appendChild(status);

    // Bins
    const binsRow = document.createElement('div');
    binsRow.className = 'classify-bins';
    layout.appendChild(binsRow);

    let activeShape = null;
    const placement = {}; // shapeName → binCategory

    challenge.shapes.forEach(name => {
      const tile = document.createElement('div');
      tile.className = 'shape-tile';
      tile.dataset.shape = name;
      tile.innerHTML = renderShape(name);
      tile.addEventListener('click', () => {
        if (tile.classList.contains('placed')) return;
        tray.querySelectorAll('.shape-tile').forEach(t => t.classList.remove('selected'));
        if (activeShape === name) {
          activeShape = null;
        } else {
          activeShape = name;
          tile.classList.add('selected');
        }
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
      bin.addEventListener('click', () => {
        if (!activeShape) {
          status.textContent = 'Click a shape first, then a bin.';
          return;
        }
        // Drop active shape into this bin
        placement[activeShape] = binCat;
        const tile = tray.querySelector('[data-shape="' + activeShape + '"]');
        tile.classList.remove('selected');
        tile.classList.add('placed');
        const mini = document.createElement('div');
        mini.className = 'mini-shape';
        mini.dataset.shape = activeShape;
        mini.innerHTML = renderShapeMini(activeShape);
        // Allow click-to-remove from bin
        mini.addEventListener('click', (e) => {
          e.stopPropagation();
          delete placement[activeShape];
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
        if (Object.keys(placement).length < challenge.shapes.length) {
          return { ok: false, message: 'Place every shape in a bin.' };
        }
        for (const name of challenge.shapes) {
          const cat = placement[name];
          const expected = SHAPES[name].category;
          if (cat !== expected) {
            return { ok: false, message: 'Not all in the right bin yet — check the most specific category for each shape.' };
          }
        }
        return { ok: true, message: 'Catalogued perfectly.' };
      }
    };
  },

  // ============================================================
  // 6. patternTable — fill in missing cells of a rules-based table
  // ============================================================
  patternTable(challenge, container) {
    const table = document.createElement('table');
    table.className = 'pattern-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    challenge.headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const inputs = [];
    challenge.rows.forEach((row, ri) => {
      const tr = document.createElement('tr');
      row.forEach((cell, ci) => {
        const td = document.createElement('td');
        if (cell === '?') {
          const inp = document.createElement('input');
          inp.type = 'number';
          inp.dataset.row = ri;
          inp.dataset.col = ci;
          inputs.push(inp);
          td.appendChild(inp);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);

    return {
      evaluate: () => {
        const expected = challenge.answers.slice();
        for (let i = 0; i < inputs.length; i++) {
          const v = parseFloat(inputs[i].value);
          if (Number.isNaN(v)) return { ok: false, message: 'Fill in every blank.' };
          if (v !== expected[i]) return { ok: false, message: 'Not all cells match — check the rule.' };
        }
        return { ok: true, message: 'Every cell follows the captain\'s rule.' };
      }
    };
  },

  // ============================================================
  // 7. expression — type the result of a parenthesised expression
  // ============================================================
  expression(challenge, container) {
    const display = document.createElement('div');
    display.className = 'expression-display';
    display.textContent = challenge.expression + ' = ?';
    container.appendChild(display);

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.className = 'expression-input';
    inp.placeholder = '?';
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
  // 8. distance — calculate the gap between two points (Q1, integer)
  // ============================================================
  distance(challenge, container) {
    const size = challenge.gridSize || 10;
    const { svgEl } = this._buildGrid(size, container, false);
    this._renderUserMarker(svgEl, size, { x: challenge.pointA[0], y: challenge.pointA[1] }, 'target');
    this._renderUserMarker(svgEl, size, { x: challenge.pointB[0], y: challenge.pointB[1] }, 'target');

    // Draw a connecting line
    const ns = 'http://www.w3.org/2000/svg';
    const ax = (challenge.pointA[0] / size) * 320 + 30;
    const ay = 330 - (challenge.pointA[1] / size) * 320;
    const bx = (challenge.pointB[0] / size) * 320 + 30;
    const by = 330 - (challenge.pointB[1] / size) * 320;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', ax); line.setAttribute('y1', ay);
    line.setAttribute('x2', bx); line.setAttribute('y2', by);
    line.setAttribute('stroke', '#aa2222');
    line.setAttribute('stroke-width', 2);
    line.setAttribute('stroke-dasharray', '4 3');
    svgEl.appendChild(line);

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.className = 'expression-input';
    inp.style.marginTop = '14px';
    inp.placeholder = 'units';
    container.appendChild(inp);

    return {
      evaluate: () => {
        const v = parseFloat(inp.value);
        if (Number.isNaN(v)) return { ok: false, message: 'Type the distance in grid units.' };
        if (v === challenge.answer) return { ok: true, message: 'Distance read precisely.' };
        return { ok: false, message: 'Not quite — count the grid spaces between the two points.' };
      }
    };
  },

  // ============================================================
  // 9. perimeterArea — compute perimeter or area of a rectangle
  // ============================================================
  perimeterArea(challenge, container) {
    // Display the rectangle visually
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 300 200');
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '200');
    svg.style.background = 'var(--parchment-light)';
    svg.style.borderRadius = '6px';
    svg.style.padding = '8px';
    const w = challenge.width;
    const h = challenge.height;
    const scale = Math.min(220 / w, 140 / h);
    const rectW = w * scale;
    const rectH = h * scale;
    const x0 = (300 - rectW) / 2;
    const y0 = (200 - rectH) / 2;
    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', x0); rect.setAttribute('y', y0);
    rect.setAttribute('width', rectW); rect.setAttribute('height', rectH);
    rect.setAttribute('fill', '#aa8838'); rect.setAttribute('stroke', '#3a2010'); rect.setAttribute('stroke-width', 2);
    svg.appendChild(rect);
    // Width label
    const wLabel = document.createElementNS(ns, 'text');
    wLabel.setAttribute('x', x0 + rectW / 2); wLabel.setAttribute('y', y0 + rectH + 18);
    wLabel.setAttribute('text-anchor', 'middle');
    wLabel.setAttribute('font-family', 'Special Elite, monospace');
    wLabel.setAttribute('font-size', '12');
    wLabel.setAttribute('fill', '#3a2010');
    wLabel.textContent = w + ' paces';
    svg.appendChild(wLabel);
    // Height label
    const hLabel = document.createElementNS(ns, 'text');
    hLabel.setAttribute('x', x0 - 8); hLabel.setAttribute('y', y0 + rectH / 2);
    hLabel.setAttribute('text-anchor', 'end');
    hLabel.setAttribute('font-family', 'Special Elite, monospace');
    hLabel.setAttribute('font-size', '12');
    hLabel.setAttribute('fill', '#3a2010');
    hLabel.textContent = h + ' paces';
    svg.appendChild(hLabel);
    container.appendChild(svg);

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.className = 'expression-input';
    inp.style.marginTop = '14px';
    inp.placeholder = challenge.mode === 'area' ? 'square paces' : 'paces';
    container.appendChild(inp);

    return {
      evaluate: () => {
        const v = parseFloat(inp.value);
        if (Number.isNaN(v)) return { ok: false, message: 'Type your answer.' };
        if (v === challenge.answer) {
          return { ok: true, message: challenge.mode === 'area' ? 'Area measured.' : 'Perimeter measured.' };
        }
        return { ok: false, message: challenge.mode === 'area' ? 'Not quite — area = width × height.' : 'Not quite — perimeter is around the outside.' };
      }
    };
  },

  // ============================================================
  // 10. sequence — type the next N terms of a numerical pattern
  // ============================================================
  sequence(challenge, container) {
    const display = document.createElement('div');
    display.className = 'expression-display';
    display.textContent = challenge.sequence.join(', ') + ', ?, ?, ?';
    container.appendChild(display);

    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:8px;margin-top:12px;';
    const inputs = [];
    for (let i = 0; i < challenge.next.length; i++) {
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.className = 'expression-input';
      inp.style.width = '80px';
      inp.style.fontSize = '1.2rem';
      inp.placeholder = '?';
      wrap.appendChild(inp);
      inputs.push(inp);
    }
    container.appendChild(wrap);

    return {
      evaluate: () => {
        for (let i = 0; i < inputs.length; i++) {
          const v = parseFloat(inputs[i].value);
          if (Number.isNaN(v)) return { ok: false, message: 'Type all the next terms.' };
          if (v !== challenge.next[i]) return { ok: false, message: 'Not all match — re-check the pattern\'s rule.' };
        }
        return { ok: true, message: 'Pattern continued perfectly.' };
      }
    };
  },

  // ============================================================
  // INTERNAL: build a coordinate grid SVG and helpers
  // ============================================================
  _buildGrid(size, container, clickable) {
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

    // Grid lines
    for (let i = 0; i <= size; i++) {
      const x = xToPx(i);
      const yStart = yToPx(0);
      const yEnd = yToPx(size);
      const ln = document.createElementNS(ns, 'line');
      ln.setAttribute('x1', x); ln.setAttribute('y1', yStart);
      ln.setAttribute('x2', x); ln.setAttribute('y2', yEnd);
      ln.setAttribute('class', 'grid-line');
      svg.appendChild(ln);
      const lh = document.createElementNS(ns, 'line');
      lh.setAttribute('x1', xToPx(0)); lh.setAttribute('y1', yToPx(i));
      lh.setAttribute('x2', xToPx(size)); lh.setAttribute('y2', yToPx(i));
      lh.setAttribute('class', 'grid-line');
      svg.appendChild(lh);
    }
    // Axes
    const xAxis = document.createElementNS(ns, 'line');
    xAxis.setAttribute('x1', xToPx(0)); xAxis.setAttribute('y1', yToPx(0));
    xAxis.setAttribute('x2', xToPx(size)); xAxis.setAttribute('y2', yToPx(0));
    xAxis.setAttribute('class', 'grid-axis');
    svg.appendChild(xAxis);
    const yAxis = document.createElementNS(ns, 'line');
    yAxis.setAttribute('x1', xToPx(0)); yAxis.setAttribute('y1', yToPx(0));
    yAxis.setAttribute('x2', xToPx(0)); yAxis.setAttribute('y2', yToPx(size));
    yAxis.setAttribute('class', 'grid-axis');
    svg.appendChild(yAxis);
    // Labels
    for (let i = 0; i <= size; i++) {
      const xLbl = document.createElementNS(ns, 'text');
      xLbl.setAttribute('x', xToPx(i)); xLbl.setAttribute('y', yToPx(0) + 14);
      xLbl.setAttribute('text-anchor', 'middle'); xLbl.setAttribute('class', 'axis-label');
      xLbl.textContent = i;
      svg.appendChild(xLbl);
      if (i > 0) {
        const yLbl = document.createElementNS(ns, 'text');
        yLbl.setAttribute('x', xToPx(0) - 8); yLbl.setAttribute('y', yToPx(i) + 4);
        yLbl.setAttribute('text-anchor', 'end'); yLbl.setAttribute('class', 'axis-label');
        yLbl.textContent = i;
        svg.appendChild(yLbl);
      }
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

  _renderUserMarker(svgEl, size, pt, kind) {
    const ns = 'http://www.w3.org/2000/svg';
    // Remove existing user marker (only one allowed at a time for gridClick)
    if (kind === 'user') {
      svgEl.querySelectorAll('.user-marker, .user-label').forEach(el => el.remove());
    }
    const px = (pt.x / size) * 320 + 30;
    const py = 330 - (pt.y / size) * 320;
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('r', 6);
    if (kind === 'plotted') dot.setAttribute('class', 'plotted-point');
    else if (kind === 'target') dot.setAttribute('class', 'target-marker');
    else dot.setAttribute('class', 'user-marker');
    if (kind === 'user') dot.classList.add('user-marker');
    svgEl.appendChild(dot);
    const lbl = document.createElementNS(ns, 'text');
    lbl.setAttribute('x', px + 8); lbl.setAttribute('y', py - 6);
    lbl.setAttribute('class', 'point-label');
    if (kind === 'user') lbl.classList.add('user-label');
    lbl.textContent = '(' + pt.x + ',' + pt.y + ')';
    svgEl.appendChild(lbl);
  }
};

if (typeof window !== 'undefined') window.Challenges = Challenges;
