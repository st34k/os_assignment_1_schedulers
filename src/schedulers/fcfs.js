// First come first serve scheduler
// check ready queue in every execution cycle - if no task is running and there are tasks in
// ready - dispatch next task

import { sortByArrivalTime } from '../common/sorting.js';
import ProcessScheduler from './processScheduler.js'

export default class FCFS extends ProcessScheduler {
  constructor(processes) {
    sortByArrivalTime(processes) // sort by arrival times

    super(processes)
  }

  execute() {
    this.checkReadyQueue()
    super.execute()
  }

  calculateTimes() {
    this.terminated.forEach(p => {
      p.turnaround = p.completion - p.arrival
      p.response = p.waiting = p.turnaround - p.burst
    })
  }
}