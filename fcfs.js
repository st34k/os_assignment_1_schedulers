import { appendCalculatedTimesToTable, getProcessesList } from './gantt.js';
import { calcAndDisplayAverageWT, sortByArrivalTime } from './helpers.js';
import { createAndAppendElement } from './appendHtml.js';
import { getProcessDivDef, getTimestampDivDef } from './common.js';

let processes = []
let terminated = []
let ready = []
let cpuTime = 0
let running = null;


function checkReadyQueue() {
  if (ready.length && !running) {
    dispatch()
  }
}

function dispatch() {
  running = ready.shift()

  running.start = running.response = cpuTime
}

export function calculateFCFS() {
  processes = getProcessesList()
  let totalProcessesIntroduced = processes.length

  sortByArrivalTime(processes)

  while (terminated.length < totalProcessesIntroduced) {
    if (processes.length) {
      let next = processes[0]

      if (next.arrival === cpuTime) {
        ready.push(processes.shift())

        checkReadyQueue()
      }
    }

    execute()
  }

  calculateTimes()
  createGanttTimeline()
  calcAndDisplayAverageWT(terminated)
  appendCalculatedTimesToTable()
}

function execute() {
  tick()

  if (running) {
    running.remainingBurst--

    if (!running.remainingBurst) {
      terminate() // terminate current running
      checkReadyQueue() // check if ready has another process awaiting dispatch
    }
  }
}

function tick() {
  cpuTime++
}

function calculateTimes() {
  terminated.forEach(p => {
    p.turnaround = p.completion - p.arrival
    p.response = p.waiting = p.turnaround - p.burst
  })
}

function terminate() {
  running.end = running.completion = cpuTime
  terminated.push(running)

  running = null
}

function createGanttTimeline() {
  terminated.forEach(p => {
    const { pid, start, end } = p

    createAndAppendElement(getProcessDivDef({ pid, start, end }))
    createAndAppendElement(getTimestampDivDef({ start }))
    createAndAppendElement(getTimestampDivDef({ end }))
  })
}