// challenges.js — Foxglove Hollow interactive challenge runtime.
//
// Public renderers (registered as keys on Challenges):
//   lineplotRead         — pre-made line plot, answer a question
//   lineplotBuild        — student stacks X's from raw data
//   fractionOpFromPlot   — plot stays visible, do a fraction operation
//   gridClick            — click a coord-grid point to plot it
//   identifyPoint        — read a marker's coordinates
//   distance             — type the gap between two grid points
//
// Each renderer takes (challenge, container, chapterMap) and returns
// { evaluate: () => { ok, message } }. The host (game.js) wires the
// Check / Continue buttons to evaluate().

const Challenges = {

  // ============================================================
  // 1. lineplotRead — show a fixed line plot, ask a question
  // ============================================================
  lineplotRead(challenge, container) {
    this._renderLinePlot(challenge.plot, container, { interactive: false });
    const inp = this._numberInput({ className: 'field-input', placeholder: 'answer' });
    container.appendChild(inp);
    return {
      evaluate: () => {
        if (!inp.value.trim()) return { ok: false, message: 'Type your answer.' };
        if (this._checkFractionAnswer(inp.value, challenge.answer)) {
          return { ok: true, message: 'Read precisely. Naturalist\'s eye.' };
        }
        return { ok: false, message: 'Not quite — count the X\'s on each tick again.' };
      }
    };
  },

  // ============================================================
  // 2. lineplotBuild — student stacks X's from raw data
  // ============================================================
  lineplotBuild(challenge, container) {
    const plot = challenge.plot;
    const raw = plot.raw || [];
    // Expected counts derived from raw measurements (one X per measurement)
    const expectedCounts = plot.ticks.map(t => {
      const tVal = this._parseFraction(t);
      return raw.filter(r => Math.abs(this._parseFraction(r) - tVal) < 0.0001).length;
    });

    // Show the raw data chips so the student can tick each measurement off
    const dataList = document.createElement('div');
    dataList.className = 'data-list';
    const dataLabel = document.createElement('div');
    dataLabel.style.cssText = 'width:100%;text-align:center;font-family:Special Elite,monospace;font-size:0.75rem;color:var(--parchment-dark);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px;';
    dataLabel.textContent = 'Raw measurements (' + raw.length + ' total)';
    dataList.appendChild(dataLabel);
    raw.forEach(r => {
      const chip = document.createElement('span');
      chip.className = 'data-chip';
      chip.textContent = r;
      dataList.appendChild(chip);
    });
    container.appendChild(dataList);

    const userCounts = plot.ticks.map(() => 0);
    const { update } = this._renderLinePlot({
      title: plot.title,
      xLabel: plot.xLabel,
      ticks: plot.ticks,
      counts: userCounts.slice()
    }, container, { interactive: true, onTickClick: (idx) => {
      userCounts[idx] += 1;
      update(userCounts);
    }, onXClick: (idx) => {
      if (userCounts[idx] > 0) userCounts[idx] -= 1;
      update(userCounts);
    }});

    const instr = document.createElement('div');
    instr.className = 'lineplot-instruction';
    instr.textContent = 'Click above a tick to add an X. Click an X to remove it.';
    container.appendChild(instr);

    return {
      evaluate: () => {
        for (let i = 0; i < expectedCounts.length; i++) {
          if (userCounts[i] !== expectedCounts[i]) {
            const totalUser = userCounts.reduce((a, b) => a + b, 0);
            const totalExp = expectedCounts.reduce((a, b) => a + b, 0);
            if (totalUser < totalExp) return { ok: false, message: 'Not every measurement is plotted yet — total ' + totalUser + ' of ' + totalExp + '.' };
            if (totalUser > totalExp) return { ok: false, message: 'Too many X\'s — total ' + totalUser + ' but only ' + totalExp + ' measurements were taken.' };
            return { ok: false, message: 'Some ticks have the wrong count — re-check the raw list.' };
          }
        }
        return { ok: true, message: 'Every measurement plotted in its place.' };
      }
    };
  },

  // ============================================================
  // 3. fractionOpFromPlot — show plot (if any) + numeric answer
  // ============================================================
  fractionOpFromPlot(challenge, container) {
    if (challenge.plot) {
      this._renderLinePlot(challenge.plot, container, { interactive: false });
    }
    const inp = this._numberInput({ className: 'field-input', placeholder: 'answer' });
    container.appendChild(inp);
    return {
      evaluate: () => {
        if (!inp.value.trim()) return { ok: false, message: 'Type your answer.' };
        if (this._checkFractionAnswer(inp.value, challenge.answer)) {
          return { ok: true, message: 'Calculated exactly.' };
        }
        return { ok: false, message: 'Not quite — re-read the plot and try the math again.' };
      }
    };
  },

  // ============================================================
  // 4. gridClick — click a coordinate-grid point to plot it
  // ============================================================
  gridClick(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const target = challenge.target;
    const { svgEl, getPoint } = this._buildGrid(size, container, true, chapterMap);
    let userPoint = null;
    svgEl.addEventListener('click', (e) => {
      const pt = getPoint(e);
      if (!pt) return;
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
  // 5. identifyPoint — read a marker's coordinates
  // ============================================================
  identifyPoint(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const marker = challenge.marker;
    const { svgEl } = this._buildGrid(size, container, false, chapterMap);
    this._renderUserMarker(svgEl, size, marker, 'target', { showLabel: false });

    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin-top:14px;display:flex;gap:8px;align-items:center;font-family:Special Elite,monospace;font-size:1.2rem;color:var(--sage-light);';
    const open = document.createElement('span'); open.textContent = '(';
    const comma = document.createElement('span'); comma.textContent = ',';
    const close = document.createElement('span'); close.textContent = ')';
    const style = 'width:54px;padding:6px;border:2px solid var(--sage);background:rgba(240,227,189,0.95);color:var(--ink);text-align:center;border-radius:3px;font:inherit;';
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
  // 6. distance — type the gap between two points
  // ============================================================
  distance(challenge, container, chapterMap) {
    const size = challenge.gridSize || 10;
    const { svgEl } = this._buildGrid(size, container, false, chapterMap);
    this._renderUserMarker(svgEl, size, { x: challenge.pointA[0], y: challenge.pointA[1] }, 'target', { label: challenge.endpointA || '', showLabel: !!challenge.endpointA });
    this._renderUserMarker(svgEl, size, { x: challenge.pointB[0], y: challenge.pointB[1] }, 'target', { label: challenge.endpointB || '', showLabel: !!challenge.endpointB });

    // Connecting line
    const ns = 'http://www.w3.org/2000/svg';
    const ax = (challenge.pointA[0] / size) * 320 + 30;
    const ay = 330 - (challenge.pointA[1] / size) * 320;
    const bx = (challenge.pointB[0] / size) * 320 + 30;
    const by = 330 - (challenge.pointB[1] / size) * 320;
    const ln = document.createElementNS(ns, 'line');
    ln.setAttribute('x1', ax); ln.setAttribute('y1', ay);
    ln.setAttribute('x2', bx); ln.setAttribute('y2', by);
    ln.setAttribute('stroke', '#9a2a48');
    ln.setAttribute('stroke-width', 2);
    ln.setAttribute('stroke-dasharray', '4 3');
    svgEl.appendChild(ln);

    const inp = this._numberInput({ className: 'field-input', placeholder: 'units' });
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
  // INTERNAL HELPERS
  // ============================================================

  // Create a number input with autofill off and select-on-focus.
  _numberInput(opts) {
    opts = opts || {};
    const inp = document.createElement('input');
    inp.type = 'text';  // text not number — allows fraction input like "1/2", "1 1/4"
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

  // Parse "1/4", "1 1/4", "1.25", "3", "5/8" into a number.
  _parseFraction(s) {
    if (typeof s === 'number') return s;
    s = String(s).trim().replace(/,/g, '').replace(/\s+/g, ' ');
    let m = s.match(/^(-?\d+)[\s-]+(\d+)\s*\/\s*(\d+)$/);
    if (m) {
      const whole = parseInt(m[1], 10);
      const num = parseInt(m[2], 10);
      const den = parseInt(m[3], 10);
      if (den === 0) return NaN;
      const sign = whole < 0 ? -1 : 1;
      return whole + sign * (num / den);
    }
    m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if (m) {
      const num = parseInt(m[1], 10);
      const den = parseInt(m[2], 10);
      if (den === 0) return NaN;
      return num / den;
    }
    const n = parseFloat(s);
    return isNaN(n) ? NaN : n;
  },

  _checkFractionAnswer(user, correct) {
    const u = this._parseFraction(user);
    const c = this._parseFraction(correct);
    if (isNaN(u) || isNaN(c)) return false;
    return Math.abs(u - c) < 0.001;
  },

  // ============================================================
  // LINE-PLOT RENDERER
  // plot: { title, xLabel, ticks: [...string], counts: [...int] (or omitted) }
  // opts: { interactive: bool, onTickClick(idx), onXClick(idx) }
  // Returns: { update(newCounts) }
  // ============================================================
  _renderLinePlot(plot, container, opts) {
    opts = opts || {};
    const wrap = document.createElement('div');
    wrap.className = 'lineplot-wrap';
    container.appendChild(wrap);
    // Title
    if (plot.title) {
      const t = document.createElement('div');
      t.className = 'lineplot-title';
      t.textContent = plot.title;
      wrap.appendChild(t);
    }
    const ns = 'http://www.w3.org/2000/svg';
    // Layout: viewBox 600x280. Axis baseline at y=200. Ticks evenly spaced.
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 600 280');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    wrap.appendChild(svg);

    const padL = 40, padR = 40, baseY = 200;
    const nTicks = plot.ticks.length;
    const xFor = (i) => padL + (i * (600 - padL - padR) / (nTicks - 1));

    // Axis baseline
    const axis = document.createElementNS(ns, 'line');
    axis.setAttribute('x1', padL - 10); axis.setAttribute('y1', baseY);
    axis.setAttribute('x2', 600 - padR + 10); axis.setAttribute('y2', baseY);
    axis.setAttribute('class', 'lp-axis');
    svg.appendChild(axis);
    // Arrowhead at right
    const arrow = document.createElementNS(ns, 'polygon');
    const ax = 600 - padR + 10;
    arrow.setAttribute('points', ax + ',' + baseY + ' ' + (ax - 8) + ',' + (baseY - 5) + ' ' + (ax - 8) + ',' + (baseY + 5));
    arrow.setAttribute('fill', 'var(--ink)');
    svg.appendChild(arrow);

    // Tick marks + labels
    plot.ticks.forEach((label, i) => {
      const x = xFor(i);
      // tick
      const t = document.createElementNS(ns, 'line');
      t.setAttribute('x1', x); t.setAttribute('y1', baseY - 5);
      t.setAttribute('x2', x); t.setAttribute('y2', baseY + 5);
      t.setAttribute('class', 'lp-tick');
      svg.appendChild(t);
      // label (parse mixed number for nicer display)
      this._renderFractionLabel(svg, ns, x, baseY + 22, label);
    });

    // X stacks — render the current counts
    const xLayer = document.createElementNS(ns, 'g');
    svg.appendChild(xLayer);
    const drawX = (counts) => {
      while (xLayer.firstChild) xLayer.removeChild(xLayer.firstChild);
      plot.ticks.forEach((_, i) => {
        const count = counts[i] || 0;
        const x = xFor(i);
        for (let k = 0; k < count; k++) {
          const y = baseY - 18 - k * 17;
          const x_el = document.createElementNS(ns, 'text');
          x_el.setAttribute('x', x); x_el.setAttribute('y', y);
          x_el.setAttribute('text-anchor', 'middle');
          x_el.setAttribute('class', opts.interactive ? 'lp-x-user' : 'lp-x');
          x_el.textContent = '×';
          if (opts.interactive && opts.onXClick) {
            x_el.addEventListener('click', (e) => { e.stopPropagation(); opts.onXClick(i); });
          }
          xLayer.appendChild(x_el);
        }
      });
    };
    drawX(plot.counts || []);

    // Click zones above each tick for adding X's
    if (opts.interactive && opts.onTickClick) {
      plot.ticks.forEach((_, i) => {
        const x = xFor(i);
        const z = document.createElementNS(ns, 'rect');
        const halfW = (600 - padL - padR) / (nTicks - 1) / 2;
        z.setAttribute('x', x - halfW + 2);
        z.setAttribute('y', 0);
        z.setAttribute('width', halfW * 2 - 4);
        z.setAttribute('height', baseY - 6);
        z.setAttribute('class', 'lp-click-zone');
        z.addEventListener('click', () => opts.onTickClick(i));
        svg.appendChild(z);
      });
    }

    // x-axis label (under)
    if (plot.xLabel) {
      const lbl = document.createElement('div');
      lbl.className = 'lineplot-xlabel';
      lbl.textContent = plot.xLabel;
      wrap.appendChild(lbl);
    }

    return { update: drawX };
  },

  // Render a fraction or mixed-number label centered at (x, y).
  // Handles "5/8", "1 3/8", "1", "0" with proper sizing.
  _renderFractionLabel(svg, ns, x, y, label) {
    label = String(label).trim();
    // Mixed number "1 3/8"?
    const mixed = label.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) {
      const whole = document.createElementNS(ns, 'text');
      whole.setAttribute('x', x - 8); whole.setAttribute('y', y);
      whole.setAttribute('text-anchor', 'middle');
      whole.setAttribute('class', 'lp-tick-label');
      whole.textContent = mixed[1];
      svg.appendChild(whole);
      // Fraction part as numerator over denominator
      const numEl = document.createElementNS(ns, 'text');
      numEl.setAttribute('x', x + 3); numEl.setAttribute('y', y - 3);
      numEl.setAttribute('text-anchor', 'middle');
      numEl.setAttribute('class', 'lp-tick-label');
      numEl.setAttribute('font-size', '11');
      numEl.textContent = mixed[2];
      svg.appendChild(numEl);
      const bar = document.createElementNS(ns, 'line');
      bar.setAttribute('x1', x - 2); bar.setAttribute('y1', y - 1);
      bar.setAttribute('x2', x + 8); bar.setAttribute('y2', y - 1);
      bar.setAttribute('stroke', '#2a1a08'); bar.setAttribute('stroke-width', '0.7');
      svg.appendChild(bar);
      const denEl = document.createElementNS(ns, 'text');
      denEl.setAttribute('x', x + 3); denEl.setAttribute('y', y + 9);
      denEl.setAttribute('text-anchor', 'middle');
      denEl.setAttribute('class', 'lp-tick-label');
      denEl.setAttribute('font-size', '11');
      denEl.textContent = mixed[3];
      svg.appendChild(denEl);
      return;
    }
    // Pure fraction "5/8"?
    const frac = label.match(/^(\d+)\/(\d+)$/);
    if (frac) {
      const numEl = document.createElementNS(ns, 'text');
      numEl.setAttribute('x', x); numEl.setAttribute('y', y - 3);
      numEl.setAttribute('text-anchor', 'middle');
      numEl.setAttribute('class', 'lp-tick-label');
      numEl.setAttribute('font-size', '11');
      numEl.textContent = frac[1];
      svg.appendChild(numEl);
      const bar = document.createElementNS(ns, 'line');
      bar.setAttribute('x1', x - 6); bar.setAttribute('y1', y - 1);
      bar.setAttribute('x2', x + 6); bar.setAttribute('y2', y - 1);
      bar.setAttribute('stroke', '#2a1a08'); bar.setAttribute('stroke-width', '0.7');
      svg.appendChild(bar);
      const denEl = document.createElementNS(ns, 'text');
      denEl.setAttribute('x', x); denEl.setAttribute('y', y + 9);
      denEl.setAttribute('text-anchor', 'middle');
      denEl.setAttribute('class', 'lp-tick-label');
      denEl.setAttribute('font-size', '11');
      denEl.textContent = frac[2];
      svg.appendChild(denEl);
      return;
    }
    // Plain integer/text
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y + 4);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('class', 'lp-tick-label');
    t.textContent = label;
    svg.appendChild(t);
  },

  // ============================================================
  // COORDINATE-GRID RENDERER (mirrors Atlas's _buildGrid)
  // Renders persistent chapterMap on each entry.
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
    // Grid lines
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
    // Axes
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
    // Labels
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
    // Persistent map (markers, paths)
    if (chapterMap) {
      (chapterMap.paths || []).forEach(p => {
        const ax = xToPx(p.from[0]), ay = yToPx(p.from[1]);
        const bx = xToPx(p.to[0]), by = yToPx(p.to[1]);
        const ln = document.createElementNS(ns, 'line');
        ln.setAttribute('x1', ax); ln.setAttribute('y1', ay);
        ln.setAttribute('x2', bx); ln.setAttribute('y2', by);
        ln.setAttribute('stroke', '#9a2a48'); ln.setAttribute('stroke-width', '1.6');
        ln.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(ln);
        if (p.label) {
          const t = document.createElementNS(ns, 'text');
          t.setAttribute('x', (ax + bx) / 2 + 6); t.setAttribute('y', (ay + by) / 2);
          t.setAttribute('class', 'landmark-label');
          t.textContent = p.label;
          svg.appendChild(t);
        }
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
