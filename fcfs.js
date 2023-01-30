import { createAndAppendElement } from './appendHtml.js'
import { appendCalculatedAlgorithmTimes, processes } from './gantt.js';

function sortByArrivalTime() {
  // sort the processes by arrival time
  processes.sort((a, b) => {
    if (a.arrival < b.arrival) return -1
    if (a.arrival > b.arrival) return 1
    return 0
  })
}

export function calculateFCFS() {
  sortByArrivalTime()

  // first process in line
  let p = processes[0]
  p.completion = p.arrival + p.burst
  p.turnaround = p.completion - p.arrival
  p.response = p.waiting = p.turnaround - p.burst
  p.startExec = 0 // consistency

  for (let i = 1; i < processes.length; i++) {
    p = processes[i]

    const cpuLastReleased = processes[i - 1].completion; // last process completed and cpu released time
    p.startExec = cpuLastReleased < p.arrival ? p.arrival : cpuLastReleased; // determine when started executing (cpu release / arrival time)
    p.completion = p.startExec + p.burst
    p.turnaround = p.completion - p.arrival
    p.response = p.waiting = p.turnaround - p.burst
  }

  appendCalculatedTimesToTable()
  createAndAppendGantt()
  calcAndDisplayAverageWT()
}

function calcAndDisplayAverageWT() {
  document.getElementById('averageWt').textContent = `${ processes.reduce((acc, p) => acc + p.waiting, 0) / processes.length }ms`
}

function createAndAppendGantt() {
  const procDiv = document.getElementById('processes')
  const timestamps = document.getElementById('timestamps')

  processes.forEach(p => {
    const px = 15; // multiply every pixel by 15
    const start = p.startExec * px
    const end = p.completion * px

    const width = `${ end - start }px`

    createAndAppendElement({
      type: 'div',
      parent: procDiv,
      innerText: `P${ p.pid }`,
      width,
      bgcolor: 'lightgreen',
      textAlign: 'center',
      border: '1px solid black',
      pos: 'absolute',
      left: start
    })

    createAndAppendElement({
      type: 'div',
      parent: timestamps,
      innerText: `${ p.startExec }`,
      left: start,
      top: '20px',
      pos: 'absolute'
    })

    createAndAppendElement({
      type: 'div',
      parent: timestamps,
      innerText: `${ p.completion }`,
      left: end,
      top: '20px',
      pos: 'absolute'
    })
  })
}



