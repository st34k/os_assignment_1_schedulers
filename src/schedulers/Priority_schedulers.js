import {
  sortByPriority,
  sortByRemainingBurst, sortPrioritySchedulerQueue
} from '../../helpers.js';
import { ProcessScheduler } from './ProcessScheduler.js';

export class PriorityScheduler extends ProcessScheduler {
  constructor(processes) {
    super(processes);
  }

  checkReadyQueue() {
    if (this.ready.length) {
      if (!this.running) {
        this.dispatch()
      } else if (this.shouldPreempt()) {
        this.preempt()

        this.dispatch()
      }
    }
  }

  calculateTimes() {
    this.terminated.forEach(p => {
      // correctIntervalTimers(p)
      // TODO: check if still need correction
      const { arrival, burst, startInterval, completion } = p

      p.turnaround = completion - arrival
      p.waiting = p.turnaround - burst
      p.response = startInterval[0] - arrival
    })
  }

  shouldPreempt() {
  } // empty func, overriden by child classes
}

// SJF is a type of priority scheduler
export class SJF extends PriorityScheduler {
  constructor(processes) {
    sortPrioritySchedulerQueue(processes, 'burst')

    super(processes);
  }

  checkReadyQueue() {
    sortByRemainingBurst(this.ready) // sort by shortest burst

    super.checkReadyQueue()
  }

  shouldPreempt() {
    const nextShortestReady = this.ready[0].remainingBurst
    const currentRemaining = this.running.remainingBurst

    return nextShortestReady < currentRemaining
  }
}

// schedule by priority
export class Priority extends PriorityScheduler {
  constructor(processes) {
    sortPrioritySchedulerQueue(processes, 'priority')

    super(processes);
  }

  checkReadyQueue() {
    sortByPriority(this.ready)

    super.checkReadyQueue();
  }

  shouldPreempt() {
    const currentPriority = this.running.priority
    const nextPriority = this.ready[0].priority

    return nextPriority < currentPriority
  }
}