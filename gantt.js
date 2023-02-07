import { createAndAppendElement } from './appendHtml.js';
import { calculateFCFS } from './fcfs.js';
import { calculateSJF } from './sjf.js';
import { calculatePriority } from './priority.js';

let processes = []

export function getProcessesList() {
  return [...processes]
}


document.getElementById('submit').addEventListener('click', () => addProcess())
document.getElementById('calc').addEventListener('click', () => calculate())

function calculate() {
  const schedulerType = document.getElementById('schedulers').value

  const schedulerAlgorithm = {
    'fcfs': calculateFCFS,
    'sjf': calculateSJF,
    'priority': calculatePriority
  }

  schedulerAlgorithm[schedulerType]()
}


export function addProcess() {
  // TODO: don't allow negative values
  // TODO 2: Don't allow same priority if user enters it
  // TODO 3: export html handling
  // TODO 4: radio buttons
  const arrivalInput = document.getElementById('arrivalTime')
  const burstInput = document.getElementById('burstTime')
  const priorityInput = document.getElementById('priority')

  processes.push({
    pid: processes.length,
    arrival: Number(arrivalInput.value),
    burst: Number(burstInput.value),
    remainingBurst: Number(burstInput.value),
    priority: Number(priorityInput.value) || 0,
    startInterval: [],
    endInterval: []
  })

  arrivalInput.value = '' // clear input
  burstInput.value = ''
  priorityInput.value = ''

  appendNewProcessToTable()
}

function appendNewProcessToTable() {
  let currProc = processes.at(processes.length - 1)

  const table = document.querySelector('table')

  const tr = createAndAppendElement({ type: 'tr', parent: table, id: `p${ currProc.pid }` })

  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.pid }` }) // append pid
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.priority }` }) // append priority
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.arrival }` }) // append arrival
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ currProc.burst }` }) // append burst

  document.getElementById('calc').style.display = 'block' // once one proc was added, display the calculate button
}

export function appendCalculatedTimesToTable() {
  processes.forEach(p => {
    const parent = document.getElementById(`p${ p.pid }`)
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.completion }` })
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.turnaround }` })
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.waiting }` })
    createAndAppendElement({ type: 'td', parent, innerText: `${ p.response }` })
  })
}