import createAndAppendElement from './appendHtml.js';
import FCFS from './src/schedulers/FCFS.js'
import Process from './src/schedulers/Process.js'
import { Priority, SJF } from './src/schedulers/Priority_schedulers.js';
import { calcAndDisplayAverageWT, correctIntervalTimers } from './helpers.js';
import { getProcessDivDef, getTimestampDivDef } from './common.js';

let processes = []

document.getElementById('submit').addEventListener('click', () => addProcess())
document.getElementById('calc').addEventListener('click', () => calculate())
const arrivalInput = document.getElementById('arrivalTime')
const burstInput = document.getElementById('burstTime')
const priorityInput = document.getElementById('priority')

function getSchedulerType() {
  return document.getElementById('schedulers').value
}

function calculate() {
  const type = getSchedulerType()

  const schedulerAlgorithm = {
    fcfs: FCFS,
    sjf: SJF,
    priority: Priority
  }

  const scheduler = new schedulerAlgorithm[type](processes)

  scheduler.start()
  scheduler.calculateTimes()

  appendCalculatedTimesToTable(scheduler)
  createGantt(scheduler)
  calcAndDisplayAverageWT(scheduler)
}


export function addProcess() {
  // TODO - reset all calculations after displaying gantt
  // reset table when pressing "calculate"
  // TODO 3: export html handling
  // TODO 4: radio buttons?

  const arrival = Number(arrivalInput.value)
  const burst = Number(burstInput.value)
  const priority = Number(priorityInput.value) || 0

  processes.push(new Process(processes.length, arrival, burst, priority))

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

    for (let i = 0; i < startInterval.length; i++) {
      let [start, end] = [startInterval[i], endInterval[i]]

      createAndAppendElement(getProcessDivDef({ pid, start, end }))
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