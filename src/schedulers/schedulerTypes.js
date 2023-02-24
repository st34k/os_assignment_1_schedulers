import SJF from './sjf.js'
import FCFS from './fcfs.js'
import Priority from './priority.js';
import RoundRobin from './roundRobin.js';

export const SCHEDULER_TYPES = {
  fcfs: FCFS,
  sjf: SJF,
  priority: Priority,
  rr: RoundRobin
}