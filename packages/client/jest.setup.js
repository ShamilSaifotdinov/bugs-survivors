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
      // eslint-disable-next-line no-undef
      frequency: { setValueAtTime: jest.fn() },
      // eslint-disable-next-line no-undef
      connect: jest.fn(),
      // eslint-disable-next-line no-undef
      start: jest.fn(),
      // eslint-disable-next-line no-undef
      stop: jest.fn(),
      // eslint-disable-next-line no-undef
      disconnect: jest.fn(),
    }
  }

  createGain() {
    return {
      // eslint-disable-next-line no-undef
      gain: { setValueAtTime: jest.fn() },
      // eslint-disable-next-line no-undef
      connect: jest.fn(),
    }
  }
}

global.AudioContext = MockAudioContext
global.alert = msg => {
  console.log(msg)
}
