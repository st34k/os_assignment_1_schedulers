// TODO - remove the priority column where unnecessary
// TODO reset table when pressing "calculate", add reset button
// TODO: radio buttons?
// TODO: create a step-through functionality, show queues, etc
import {
  PCB,
  calcAndDisplayAverageWT, arrivalInput,
  burstInput,
  priorityInput,
  getSchedulerType,
  clearInputs,
  appendCalculatedTimesToTable,
  createGantt,
  appendNewProcessToTable
} from './src/controllers/main.js'

import { SCHEDULER_TYPES } from './src/schedulers/schedulerTypes.js';

let processes = []

export function calculate() {
  const type = getSchedulerType()

  const scheduler = new SCHEDULER_TYPES[type](processes)

  scheduler.start()
  scheduler.calculateTimes()

  appendCalculatedTimesToTable(scheduler)
  createGantt(scheduler)
  calcAndDisplayAverageWT(scheduler)
}

export function addProcess() {
  const arrival = Number(arrivalInput.value)
  const burst = Number(burstInput.value)
  const priority = Number(priorityInput.value) || 0

  if (!burst) {
    return alert('Burst time cannot be 0')
  }

  const pcb = new PCB(processes.length, arrival, burst, priority)

  processes.push(pcb)
  appendNewProcessToTable(pcb) // processes.length = pid
  clearInputs()
}




