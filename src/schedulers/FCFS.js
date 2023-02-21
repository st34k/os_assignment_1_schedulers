import { sortByArrivalTime } from '../../helpers.js';
import { ProcessScheduler } from './ProcessScheduler.js'

export default class FCFS extends ProcessScheduler {
  constructor(processes) {
    sortByArrivalTime(processes)

    super(processes)
  }

  checkReadyQueue() {
    if (this.ready.length && !this.running) {
      this.dispatch()
    }
  }
  
  calculateTimes() {
    this.terminated.forEach(p => {
      p.turnaround = p.completion - p.arrival
      p.response = p.waiting = p.turnaround - p.burst
    })
  }
}