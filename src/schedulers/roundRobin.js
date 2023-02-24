// Round Robin
// Quantum time is set on the CPU. Default = 2.
// on each execution cycle check if current task should be preempted (quantumtick % quantum = 0)
// reset quantum tick on task termination and dispatch
import { sortByArrivalTime } from '../common/sorting.js';
import PreemptiveScheduler from './preemptiveScheduler.js';

export default class RoundRobin extends PreemptiveScheduler {
  constructor(processes) {
    sortByArrivalTime(processes)

    super(processes)
  }

  execute() {
    super.checkReadyQueue()

    super.execute();
  }

  terminate() {
    super.terminate()

    this.cpu.resetQuantumCounter() // reset clock when terminating
  }

  dispatch() {
    super.dispatch()

    this.cpu.resetQuantumCounter() // reset clock when dispatching
  }

  shouldPreempt() {
    return this.running && (this.cpu.quantumTick % this.cpu.quantum) === 0
  }
}