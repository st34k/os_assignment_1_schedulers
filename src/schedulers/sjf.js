// SJF scheduler
// preemptive - tasks are prioritized according to remaining burst
// every time a new task is introduced or a task is done and terminated the
// scheduler will check the ready queue for preemption conditions on running task

import { sortByRemainingBurst, sortPrioritySchedulerQueue } from '../common/sorting.js';
import PreemptiveScheduler from './preemptiveScheduler.js';

export default class SJF extends PreemptiveScheduler {
  constructor(processes) {
    sortPrioritySchedulerQueue(processes, 'burst')

    super(processes);
  }

  introduce() {
    super.introduce()

    sortByRemainingBurst(this.ready) // sort by shortest burst

    // check the ready queue when a new process is introduced
    this.checkReadyQueue()
  }

  terminate() {
    super.terminate()

    this.checkReadyQueue()
  }

  preempt() {
    super.preempt()

    sortByRemainingBurst(this.ready) // sort by shortest burst
  }

  shouldPreempt() {
    if (!this.ready.length) return false // if ready q empty

    const nextShortestReady = this.ready[0].remainingBurst
    const currentRemaining = this.running.remainingBurst

    return nextShortestReady < currentRemaining
  }
}