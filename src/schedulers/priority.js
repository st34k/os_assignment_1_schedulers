// Priority scheduler
// preemptive - tasks are prioritized according to given priority
// every time a new task is introduced or a task is done and terminated the
// scheduler will check the ready queue for preemption conditions on running task
import { sortByPriority, sortPrioritySchedulerQueue } from '../common/sorting.js';
import PreemptiveScheduler from './preemptiveScheduler.js';

export default class Priority extends PreemptiveScheduler {
  constructor(processes) {
    sortPrioritySchedulerQueue(processes, 'priority')

    super(processes);
  }

  introduce() {
    super.introduce()

    sortByPriority(this.ready) // sort by priority

    this.checkReadyQueue() // check the ready queue when a new process is introduced
  }

  terminate() {
    super.terminate()

    this.checkReadyQueue()
  }

  shouldPreempt() {
    if (!this.ready.length) return false // if ready q empty

    const currentPriority = this.running.priority
    const nextPriority = this.ready[0].priority

    return nextPriority < currentPriority
  }
}