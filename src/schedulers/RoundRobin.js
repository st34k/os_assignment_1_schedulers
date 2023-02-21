import { ProcessScheduler } from './ProcessScheduler.js';
import { sortByArrivalTime } from '../../helpers.js';

// TODO: make a preemptive scheduler class that all preemptive algos will inherit from

// TODO: in general, clean it up here. my eyes hurt.
export default class RoundRobin extends ProcessScheduler {
  constructor(processes, q) {
    sortByArrivalTime(processes)

    super(processes)
    this.quantum = q
    this.clockCount = 0 // for preemption logic
  }

  checkReadyQueue() {
    if (this.ready.length) {
      if (!this.running) {
        this.dispatch()
      }
    }
  }

  execute() {
    this.cpu.tick()
    this.clockCount++ // count 1 on every cpu cycle to monitor quantum preemption

    if (this.running) {
      this.running.tickBurst()

      if (!this.running.remainingBurst) {
        this.terminate()
        this.checkReadyQueue()
      } else if (this.shouldPreempt()) {
        this.preempt()
        this.dispatch()
      }
    }
  }

  terminate() {
    super.terminate()

    this.clockCount = 0;
  }

  dispatch() {
    super.dispatch()

    this.clockCount = 0; // reset clock when dispatching
  }

  preempt() {
    super.preempt()
  }

  shouldPreempt() {
    return (this.clockCount % this.quantum) === 0
  }

  calculateTimes() {
    this.terminated.forEach(p => {
      const { arrival, burst, startInterval, completion } = p

      p.turnaround = completion - arrival
      p.waiting = p.turnaround - burst
      p.response = startInterval[0] - arrival
    })
  }
}