import ProcessScheduler from './processScheduler.js';

export default class PreemptiveScheduler extends ProcessScheduler {
  constructor(processes) {
    super(processes);
  }

  checkReadyQueue() {
    if (this.running && this.shouldPreempt()) {
      this.preempt()

      this.dispatch()
    }

    super.checkReadyQueue()
  }

  calculateTimes() {
    this.terminated.forEach(p => {
      const { arrival, burst, startInterval, completion } = p

      p.turnaround = completion - arrival
      p.waiting = p.turnaround - burst
      p.response = startInterval[0] - arrival
    })
  }

  shouldPreempt() {
  } // empty func, overriden by child classes
}
