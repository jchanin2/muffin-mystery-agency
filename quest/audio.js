// audio.js — Web Audio API RPG sound effects for Realms of Mathematica

const Audio = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playTone(freq, duration, type = 'sine', volume = 0.3, delay = 0) {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  },

  // Correct answer — heroic ascending chord
  correct() {
    this.playTone(523, 0.15, 'sine', 0.25, 0);     // C5
    this.playTone(659, 0.15, 'sine', 0.25, 0.1);    // E5
    this.playTone(784, 0.25, 'sine', 0.3, 0.2);     // G5
    this.playTone(1047, 0.3, 'sine', 0.2, 0.3);     // C6
  },

  // Wrong answer — damage buzz
  wrong() {
    this.playTone(200, 0.3, 'sawtooth', 0.15, 0);
    this.playTone(150, 0.4, 'sawtooth', 0.12, 0.1);
  },

  // Sword slash
  slash() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  },

  // Spell cast
  spell() {
    this.playTone(440, 0.1, 'sine', 0.2, 0);
    this.playTone(660, 0.1, 'sine', 0.2, 0.08);
    this.playTone(880, 0.15, 'sine', 0.25, 0.16);
    this.playTone(1100, 0.2, 'sine', 0.15, 0.24);
  },

  // Level up fanfare
  levelUp() {
    const notes = [523, 659, 784, 1047, 784, 1047, 1319];
    notes.forEach((f, i) => this.playTone(f, 0.2, 'sine', 0.25, i * 0.12));
  },

  // Monster hit / damage taken
  hit() {
    this.playTone(120, 0.2, 'square', 0.12, 0);
    this.playTone(80, 0.3, 'square', 0.1, 0.05);
  },

  // Treasure found
  treasure() {
    this.playTone(784, 0.12, 'sine', 0.2, 0);
    this.playTone(988, 0.12, 'sine', 0.2, 0.1);
    this.playTone(1175, 0.12, 'sine', 0.2, 0.2);
    this.playTone(1568, 0.3, 'sine', 0.25, 0.3);
  },

  // Dice roll (quick rattle)
  dice() {
    for (let i = 0; i < 6; i++) {
      this.playTone(300 + Math.random() * 400, 0.05, 'triangle', 0.1, i * 0.04);
    }
  },

  // Defeat / game over
  defeat() {
    this.playTone(400, 0.3, 'sawtooth', 0.12, 0);
    this.playTone(350, 0.3, 'sawtooth', 0.1, 0.25);
    this.playTone(300, 0.3, 'sawtooth', 0.08, 0.5);
    this.playTone(200, 0.6, 'sawtooth', 0.1, 0.75);
  },

  // Chapter complete
  victory() {
    const fanfare = [523, 659, 784, 1047, 784, 1047, 1319, 1568];
    fanfare.forEach((f, i) => this.playTone(f, 0.25, 'sine', 0.2, i * 0.15));
  }
};
