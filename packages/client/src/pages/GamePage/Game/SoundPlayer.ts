export class SoundPlayer {
  private oscillator: OscillatorNode | null
  private gainNode: GainNode

  constructor(private audioContext: AudioContext) {
    this.oscillator = null
    this.gainNode = this.audioContext.createGain()
    this.gainNode.connect(this.audioContext.destination)
  }

  playSound(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine'
  ): void {
    if (this.oscillator) {
      this.oscillator.stop()
    }

    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = type
    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    )
    this.oscillator.connect(this.gainNode)

    this.oscillator.start()
    this.oscillator.stop(this.audioContext.currentTime + duration)
  }

  setVolume(volume: number): void {
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
  }

  stopSound(): void {
    if (this.oscillator) {
      this.oscillator.stop()
      this.oscillator.disconnect()
      this.oscillator = null
    }
  }
}
