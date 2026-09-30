// Web Audio API Sound Engine for MK King: Free Fire Battle Royale
// 100% Client-side synthetic sound generation - Zero external asset latency, instant response

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // Lazy init on first user interaction
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Gunshots
  public playGunshot(weaponCategory: string, isEnemy = false) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const vol = isEnemy ? 0.35 : 0.8;

    if (weaponCategory === 'SMG') {
      // MP40: Crisp high-speed crackle
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noise = this.createNoiseBuffer();
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noise;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(3, t);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);

      gain.gain.setValueAtTime(vol * 0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      noiseNode.start(t);
      osc.stop(t + 0.09);
      noiseNode.stop(t + 0.09);

    } else if (weaponCategory === 'AR') {
      // AK47: Heavy, resonant punch
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noise = this.createNoiseBuffer();
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noise;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, t);
      filter.frequency.exponentialRampToValueAtTime(300, t + 0.15);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.16);

      gain.gain.setValueAtTime(vol * 1.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      noiseNode.start(t);
      osc.stop(t + 0.18);
      noiseNode.stop(t + 0.18);

    } else if (weaponCategory === 'SNIPER') {
      // AWM: Thunderous distant crack with massive low-end boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noise = this.createNoiseBuffer();
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noise;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.45);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3500, t);
      filter.frequency.exponentialRampToValueAtTime(100, t + 0.5);

      gain.gain.setValueAtTime(vol * 1.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

      osc.connect(gain);
      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      noiseNode.start(t);
      osc.stop(t + 0.55);
      noiseNode.stop(t + 0.55);

    } else if (weaponCategory === 'SHOTGUN') {
      // M1887: Double barrel cannon boom
      const noise = this.createNoiseBuffer();
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noise;
      const gain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(150, t + 0.25);

      gain.gain.setValueAtTime(vol * 1.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noiseNode.start(t);
      noiseNode.stop(t + 0.28);
    } else {
      // Pistol / Default
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

      gain.gain.setValueAtTime(vol * 0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  }

  // Hitmarker (body shot)
  public playHitMarker() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.setValueAtTime(1600, t + 0.02);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Headshot DING (High pitched iconic Free Fire red headshot bell)
  public playHeadshot() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Bell harmonic
    [2400, 3600, 4800].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      const amp = (0.5 / (idx + 1));
      gain.gain.setValueAtTime(amp, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.35);
    });
  }

  // Gloo Wall Deploy (Crystal ice freeze & thump)
  public playGlooWallDeploy() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Low ice thump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
    gain.gain.setValueAtTime(0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.3);

    // Crystalline chime
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(800, t);
    osc2.frequency.linearRampToValueAtTime(1800, t + 0.15);
    gain2.gain.setValueAtTime(0.4, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(t);
    osc2.stop(t + 0.25);
  }

  // Gloo Wall Hit
  public playGlooWallHit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.08);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Elimination / Kill Sound
  public playKillSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const freqs = [587.33, 880, 1174.66]; // D5, A5, D6
    freqs.forEach((f, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t + i * 0.06);
      gain.gain.setValueAtTime(0.3, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.25);
    });
  }

  // Alok / Character Skill Activate (Techno electro pulse)
  public playSkillActivate() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.3);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Medkit / Healing
  public playMedkit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(660, t + 0.2);
    osc.frequency.linearRampToValueAtTime(880, t + 0.4);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Reload weapon
  public playReload() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Mag out click
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(500, t);
    gain1.gain.setValueAtTime(0.2, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(t);
    osc1.stop(t + 0.05);

    // Mag in click
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(750, t + 0.4);
    gain2.gain.setValueAtTime(0.3, t + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.46);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(t + 0.4);
    osc2.stop(t + 0.46);
  }

  // Safe Zone Warning Siren
  public playZoneWarning() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.linearRampToValueAtTime(400, t + 0.4);
    osc.frequency.linearRampToValueAtTime(600, t + 0.8);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.9);
  }

  // Parachute open sound
  public playParachuteOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const noise = this.createNoiseBuffer();
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noise;
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, t);
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noiseNode.start(t);
    noiseNode.stop(t + 0.8);
  }

  // Triumphant BOOYAH! Fanfare
  public playBooyah() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const notes = [
      { f: 523.25, time: 0, dur: 0.25 },   // C5
      { f: 659.25, time: 0.2, dur: 0.25 },  // E5
      { f: 783.99, time: 0.4, dur: 0.25 },  // G5
      { f: 1046.50, time: 0.6, dur: 0.8 }, // C6
    ];

    const t = this.ctx.currentTime;
    notes.forEach(note => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t + note.time);

      gain.gain.setValueAtTime(0.5, t + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.time + note.dur);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + note.time);
      osc.stop(t + note.time + note.dur);
    });
  }

  // UI Click
  public playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  private createNoiseBuffer(): AudioBuffer {
    if (!this.ctx) {
      throw new Error('AudioContext not ready');
    }
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const soundEngine = new SoundEngine();
