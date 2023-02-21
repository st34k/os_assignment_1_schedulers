// TODO - remove the priority column where unnecessary
// TODO - reset all calculations after displaying gantt
// TODO reset table when pressing "calculate", add reset button
// TODO: radio buttons?
// TODO: give every process its own color in gantt (instead of randoms)
// TODO: create a step-through functionality, show queues, etc
import createAndAppendElement from './appendHtml.js';
import FCFS from './src/schedulers/FCFS.js'
import PCB from './src/schedulers/PCB.js'
import RoundRobin from './src/schedulers/RoundRobin.js';
import { Priority, SJF } from './src/schedulers/prioritySchedulers.js';
import { calcAndDisplayAverageWT, correctIntervalTimers } from './helpers.js';
import { generateRandomColor, getProcessDivDef, getTimestampDivDef } from './common.js';
import { arrivalInput, burstInput, priorityInput, getQuantum, getSchedulerType } from './src/htmlEvents.js'

let processes = []

export function calculate() {
  const type = getSchedulerType()
  const quantum = Number(getQuantum())

  const schedulerAlgorithm = {
    fcfs: FCFS,
    sjf: SJF,
    priority: Priority,
    rr: RoundRobin
  }

  const scheduler = new schedulerAlgorithm[type](processes, quantum)

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

  processes.push(new PCB(processes.length, arrival, burst, priority))

  appendNewProcessToTable()
  clearInputs()
}

function clearInputs() {
  arrivalInput.value = ''
  burstInput.value = ''
  priorityInput.value = ''
}

function appendNewProcessToTable() {
  const currProc = processes.at(processes.length - 1)

  const table = document.querySelector('table')

  const tr = createAndAppendElement({ type: 'tr', parent: table, id: `p${ currProc.pid }` })

  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.pid }` }) // append pid
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.priority }` }) // append priority
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.arrival }` }) // append arrival
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.burst }` }) // append burst

  document.getElementById('calc').style.display = 'block' // once one proc was added, display the calculate button
}

function createGantt({ terminated }) {
  terminated.forEach(p => {
    correctIntervalTimers(p)

    const { pid, startInterval, endInterval } = p
    const processColor = generateRandomColor();

    for (let i = 0; i < startInterval.length; i++) {
      let [start, end] = [startInterval[i], endInterval[i]]

      createAndAppendElement(getProcessDivDef({ pid, start, end, bgcolor: processColor }))
      createAndAppendElement(getTimestampDivDef({ start }))
      createAndAppendElement(getTimestampDivDef({ end }))
    }
  })
}

export function appendCalculatedTimesToTable({ terminated }) {
  terminated.forEach(p => {
    const parent = document.getElementById(`p${ p.pid }`)
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.completion }` })
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.turnaround }` })
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.waiting }` })
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.response }` })
  })
}