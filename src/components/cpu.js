import { getQuantum } from '../controllers/htmlEvents.js';

export default class CPU {
  quantum = getQuantum()
  quantumTick = 0
  time = 0

  clockTick() {
    this.time++
    this.quantumTick++ // only RR scheduler will use/reset this value
  }

  resetQuantumCounter() {
    this.quantumTick = 0
  }
}