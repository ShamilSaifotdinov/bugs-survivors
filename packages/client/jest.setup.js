require('@testing-library/jest-dom')

class MockAudioContext {
  constructor() {
    this.sampleRate = 44100
    this.currentTime = 0
    this.destination = {}
  }

  createOscillator() {
    return {
      type: '',
      frequency: { setValueAtTime: jest.fn() },
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      disconnect: jest.fn(),
    }
  }

  createGain() {
    return {
      gain: { setValueAtTime: jest.fn() },
      connect: jest.fn(),
    }
  }
}

global.AudioContext = MockAudioContext
global.alert = msg => {
  console.log(msg)
}
