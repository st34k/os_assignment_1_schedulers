import { appendCalculatedTimesToTable, getProcessesList } from './gantt.js';
import {
  correctIntervalTimers,
  sortByArrivalAndBurst,
  sortByRemainingBurst,
  calcAndDisplayAverageWT
} from './helpers.js';
import { createAndAppendElement } from './appendHtml.js';
import { getProcessDivDef, getTimestampDivDef } from './common.js';

let cpuTime = 0
let running = null
let ready = []
let terminated = []
let totalProcessesIntroduced = null
let processes = null

export function calculateSJF() {
  processes = getProcessesList()

  totalProcessesIntroduced = processes.length

  sortByArrivalAndBurst(processes) // introduced processes are sorted by arrival first and by burst time second

  while (terminated.length < totalProcessesIntroduced) { // while terminated processes =/= introduces processes, keep working
    if (processes.length) {
      let nextProcess = processes[0] // next process to be introduced

      if (nextProcess.arrival === cpuTime) {
        ready.push(processes.shift()) // introduce

        checkReadyQueue()
      } else {
        execute()
      }
    } else {
      execute()
    }
  }

  calculateTimes()
}

function checkReadyQueue() {
  if (ready.length) { // if there are processes in ready
    sortByRemainingBurst(ready) // sort by remaining burst time

    if (!running) {
      dispatch() // if cpu is free dispatch next

    } else if (shouldPreempt()) { // if cpu busy - check if current proc should be preempted
      running.endInterval.push(cpuTime) // log the time of preemption for the current executing process
      ready.push(running) // place currently running back in ready Q

      dispatch() // dispatch next process in ready Q
    }
  }
}

function shouldPreempt() {
  // processes in ready are sorted by remaining burst time
  const runningRemainingTime = running.remainingBurst // get remaining burst for currently executing proc
  const nextShortestInReady = ready[0] // get the next shortest process

  // if next proc in ready has less burst time than currently running - return true
  return nextShortestInReady.remainingBurst < runningRemainingTime
}

function dispatch() {
  running = ready.shift() // get the next shortest job from ready into running

  running.startInterval.push(cpuTime) // log processing start time
}

function terminate() {
  running.completion = cpuTime
  running.endInterval.push(cpuTime)
  terminated.push(running)

  running = null
}

function execute() {
  tick()

  if (running) {
    running.remainingBurst--

    if (!running.remainingBurst) {
      terminate()
      checkReadyQueue()
    }
  }
}

function tick() {
  cpuTime++
}

function calculateTimes() {
  terminated.forEach(p => {
    correctIntervalTimers(p)
    const { arrival, burst, startInterval, completion } = p

    p.turnaround = completion - arrival
    p.waiting = p.turnaround - burst
    p.response = startInterval[0] - arrival
  })

  appendCalculatedTimesToTable()
  createGanttTimeline()
  calcAndDisplayAverageWT(terminated)
}

function createGanttTimeline() {
  terminated.forEach(p => {
    const { pid, startInterval, endInterval } = p

    for (let i = 0; i < startInterval.length; i++) {
      let [start, end] = [startInterval[i], endInterval[i]]
      createAndAppendElement(getProcessDivDef({ pid, start, end }))

      createAndAppendElement(getTimestampDivDef({ start }))

      createAndAppendElement(getTimestampDivDef({ end }))
    }
  })
}



