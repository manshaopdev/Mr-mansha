/**
 * Synesthetic Harmonic Audio Engine
 * Procedural Web Audio API sound synthesis with Solfeggio tuning,
 * Tibetan bowl overtones, reactive wind chimes, and microphone acoustic resonance.
 */

class SynestheticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneSub: OscillatorNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private isInitialized = false;
  private isMuted = false;
  private currentBaseFreq = 432;
  private activeChimes = 0;

  // Pentatonic scale multipliers relative to fundamental
  private pentatonicScale = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3];

  constructor() {
    // Lazy initialized on first user interaction
  }

  public init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Delay / Space reverberator loop
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.value = 0.38;

      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.value = 0.42;

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 2400;

      this.delayNode.connect(delayFilter);
      delayFilter.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);
      delayFilter.connect(this.masterGain);

      // Analyser for visual sync
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.masterGain.connect(this.analyser);

      // Drone bus
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);

      this.startAmbientDrone(this.currentBaseFreq);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  }

  public setMasterVolume(val: number) {
    if (!this.masterGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, val));
    this.masterGain.gain.linearRampToValueAtTime(clamped * (this.isMuted ? 0 : 0.45), this.ctx.currentTime + 0.05);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime + 0.1);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setDimensionFrequency(freq: number) {
    this.currentBaseFreq = freq;
    if (!this.ctx || !this.droneOsc1 || !this.droneOsc2 || !this.droneSub) return;
    const now = this.ctx.currentTime;
    this.droneOsc1.frequency.exponentialRampToValueAtTime(freq / 4, now + 1.2);
    this.droneOsc2.frequency.exponentialRampToValueAtTime((freq / 4) * 1.004, now + 1.2); // Binaural beating
    this.droneSub.frequency.exponentialRampToValueAtTime(freq / 8, now + 1.5);
  }

  private startAmbientDrone(fundamental: number) {
    if (!this.ctx || !this.droneGain) return;

    // Oscillator 1: Fundamental Sine
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(fundamental / 4, this.ctx.currentTime);

    // Oscillator 2: Slightly detuned for celestial binaural interference
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime((fundamental / 4) * 1.005, this.ctx.currentTime);

    // Sub Bass: Deep 55Hz foundation
    this.droneSub = this.ctx.createOscillator();
    this.droneSub.type = 'triangle';
    this.droneSub.frequency.setValueAtTime(fundamental / 8, this.ctx.currentTime);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 120;

    this.droneSub.connect(subFilter);
    subFilter.connect(this.droneGain);

    this.droneOsc1.connect(this.droneGain);
    this.droneOsc2.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
    this.droneSub.start();
  }

  /**
   * Plays a celestial pentatonic chime on interaction / particle resonance
   */
  public playCelestialChime(pitchIndex = 0, intensity = 0.5) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.activeChimes > 12) return; // Cap simultaneous voices

    this.activeChimes++;
    const now = this.ctx.currentTime;

    const baseNote = this.currentBaseFreq;
    const ratio = this.pentatonicScale[Math.abs(pitchIndex) % this.pentatonicScale.length];
    const octave = Math.floor(Math.abs(pitchIndex) / this.pentatonicScale.length) + 1;
    const freq = baseNote * ratio * octave * 0.5;

    // Harmonic bell with physical modeling envelope
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Overtone shimmer
    const overtone = this.ctx.createOscillator();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.76, now); // Metallic partial

    const gain = this.ctx.createGain();
    const duration = 1.2 + Math.random() * 0.8;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08 * intensity, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.02 * intensity, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);

    gain.connect(this.masterGain);
    if (this.delayNode) {
      gain.connect(this.delayNode);
    }

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);

    setTimeout(() => {
      this.activeChimes = Math.max(0, this.activeChimes - 1);
    }, duration * 1000);
  }

  /**
   * Plays a deep Tibetan singing bowl resonance
   */
  public playTibetanBowl(fundamental = this.currentBaseFreq) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const partials = [1, 2.76, 5.4, 8.93];
    const partialGains = [0.15, 0.08, 0.04, 0.015];

    partials.forEach((p, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * p * 0.5, now);

      // Add gentle vibrato
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.value = 3.5;
      vibratoGain.gain.value = 2.0;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibrato.start(now);
      vibrato.stop(now + 4.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(partialGains[idx], now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      if (this.delayNode) gain.connect(this.delayNode);

      osc.start(now);
      osc.stop(now + 4.5);
    });
  }

  /**
   * Sound of Cosmic Big Bang / Singularity Ignition
   */
  public playBigBangIgnition() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Sub rumble that explodes outwards
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(30, now);
    sub.frequency.exponentialRampToValueAtTime(120, now + 1.2);
    sub.frequency.exponentialRampToValueAtTime(40, now + 3.0);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.01, now);
    subGain.gain.linearRampToValueAtTime(0.35, now + 0.2);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    sub.connect(subGain);
    subGain.connect(this.masterGain);
    sub.start(now);
    sub.stop(now + 3.2);

    // Cosmic shimmer ascending sweep
    const sweep = this.ctx.createOscillator();
    sweep.type = 'triangle';
    sweep.frequency.setValueAtTime(150, now);
    sweep.frequency.exponentialRampToValueAtTime(1400, now + 1.5);

    const sweepGain = this.ctx.createGain();
    sweepGain.gain.setValueAtTime(0.001, now);
    sweepGain.gain.linearRampToValueAtTime(0.12, now + 0.6);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    sweep.connect(sweepGain);
    sweepGain.connect(this.masterGain);
    if (this.delayNode) sweepGain.connect(this.delayNode);

    sweep.start(now);
    sweep.stop(now + 2.8);
  }

  /**
   * Black hole gravitational tear sound
   */
  public playSingularityPlaced() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 1.2);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 1.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  /**
   * White fountain matter eruption sound
   */
  public playFountainBurst() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

    osc.connect(gain);
    gain.connect(this.masterGain);
    if (this.delayNode) gain.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + 1.0);
  }

  /**
   * Living Creature Call
   */
  public playCreatureCall(species: string) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (species === 'manta') {
      // Ethereal whale-like glide
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.6);
      osc.frequency.exponentialRampToValueAtTime(140, now + 1.8);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    } else if (species === 'phoenix') {
      // Radiant solar chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.4);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    } else {
      // Stardust bubble chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.5);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    if (this.delayNode) gain.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  /**
   * Hardware Microphone integration to drive canvas cymatics
   */
  public async toggleMicrophone(onAudioData: (energy: number, centroid: number) => void): Promise<boolean> {
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
      return false;
    }

    try {
      this.init();
      if (!this.ctx) return false;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micStream = stream;
      this.micSource = this.ctx.createMediaStreamSource(stream);

      const micAnalyser = this.ctx.createAnalyser();
      micAnalyser.fftSize = 256;
      this.micSource.connect(micAnalyser);

      const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);

      const checkMic = () => {
        if (!this.micStream) return;
        micAnalyser.getByteFrequencyData(dataArray);

        let sum = 0;
        let weightedSum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
          weightedSum += dataArray[i] * i;
        }

        const avgEnergy = sum / dataArray.length;
        const centroid = sum > 0 ? weightedSum / sum : 0;

        onAudioData(avgEnergy, centroid);
        requestAnimationFrame(checkMic);
      };

      requestAnimationFrame(checkMic);
      return true;
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      return false;
    }
  }

  /**
   * Speak Oracle Wisdom in ethereal whisper via SpeechSynthesis
   */
  public speakOracleWisdom(text: string, lang = 'ur-PK') {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.85; // Deep philosophical tone
      utterance.rate = 0.9;  // Measured cosmic cadence

      // Find Urdu or Hindi voice for authentic resonance, fallback to English
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)) || v.name.includes('Urdu') || v.name.includes('Hindi'));
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }
}

export const synestheticAudio = new SynestheticAudioEngine();
