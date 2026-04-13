// whiteboard.js — In-game scratch pad for working out math problems

const Whiteboard = {
  canvas: null,
  ctx: null,
  drawing: false,
  tool: 'pen',       // 'pen' or 'eraser'
  color: '#ffffff',
  lineWidth: 2.5,
  lastX: 0,
  lastY: 0,
  open: false,

  init() {
    this.canvas = document.getElementById('whiteboard-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();

    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.startDraw(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDraw());
    this.canvas.addEventListener('mouseleave', () => this.stopDraw());

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startDraw(e.touches[0]);
    }, { passive: false });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(e.touches[0]);
    }, { passive: false });
    this.canvas.addEventListener('touchend', () => this.stopDraw());

    // Toolbar
    document.getElementById('wb-pen').onclick = () => this.setTool('pen');
    document.getElementById('wb-eraser').onclick = () => this.setTool('eraser');
    document.getElementById('wb-clear').onclick = () => this.clear();

    // Color swatches
    document.querySelectorAll('.wb-color').forEach(swatch => {
      swatch.onclick = () => {
        this.color = swatch.dataset.color;
        this.setTool('pen');
        document.querySelectorAll('.wb-color').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      };
    });

    // Toggle button
    document.getElementById('btn-whiteboard-toggle').onclick = () => this.toggle();
  },

  resize() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();
    if (rect.width === 0) return; // Panel not visible yet
    // Save current drawing
    const oldW = this.canvas.width;
    const oldH = this.canvas.height;
    let imageData = null;
    if (oldW > 0 && oldH > 0) {
      imageData = this.ctx.getImageData(0, 0, oldW, oldH);
    }
    this.canvas.width = rect.width;
    this.canvas.height = 200;
    // Restore drawing
    if (imageData) {
      this.ctx.putImageData(imageData, 0, 0);
    }
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
      y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
    };
  },

  startDraw(e) {
    this.drawing = true;
    const pos = this.getPos(e);
    this.lastX = pos.x;
    this.lastY = pos.y;
    // Draw a dot for single clicks
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, this.tool === 'eraser' ? 10 : this.lineWidth / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.tool === 'eraser' ? '#1a1a2e' : this.color;
    this.ctx.fill();
  },

  draw(e) {
    if (!this.drawing) return;
    const pos = this.getPos(e);
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.strokeStyle = this.tool === 'eraser' ? '#1a1a2e' : this.color;
    this.ctx.lineWidth = this.tool === 'eraser' ? 20 : this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
    this.lastX = pos.x;
    this.lastY = pos.y;
  },

  stopDraw() {
    this.drawing = false;
  },

  setTool(tool) {
    this.tool = tool;
    document.getElementById('wb-pen').classList.toggle('active', tool === 'pen');
    document.getElementById('wb-eraser').classList.toggle('active', tool === 'eraser');
    this.canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
  },

  clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  toggle() {
    this.open = !this.open;
    const panel = document.getElementById('whiteboard-panel');
    const btn = document.getElementById('btn-whiteboard-toggle');
    panel.style.display = this.open ? '' : 'none';
    btn.textContent = this.open ? 'Hide Scratch Pad' : 'Scratch Pad';
    if (this.open) {
      this.resize();
    }
  },

  // Called when a new encounter starts
  show() {
    const btn = document.getElementById('btn-whiteboard-toggle');
    btn.style.display = '';
    // Start closed — player opens if they want
    this.open = false;
    document.getElementById('whiteboard-panel').style.display = 'none';
    btn.textContent = 'Scratch Pad';
    this.clear();
  },

  // Called when encounter ends
  hide() {
    this.open = false;
    document.getElementById('whiteboard-panel').style.display = 'none';
    document.getElementById('btn-whiteboard-toggle').style.display = 'none';
    this.clear();
  }
};
