import { generateRandomColor, getProcessDivDef, getTimestampDivDef } from '../common/appendHtmlDefs.js';
import createAndAppendElement from './appendHtml.js';
import { displayCalculateBtn } from './htmlEvents.js';

export function createGantt({ terminated }) {
  terminated.forEach(p => {
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

export function appendNewProcessToTable(pcb) {
  const table = document.querySelector('table')

  const tr = createAndAppendElement({ type: 'tr', parent: table, id: `p${ pcb.pid }` })

  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ pcb.pid }` }) // append pid
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ pcb.priority }` }) // append priority
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ pcb.arrival }` }) // append arrival
  createAndAppendElement({ type: 'td', parent: tr, innerText: `${ pcb.burst }` }) // append burst

  displayCalculateBtn() // once a process has been added - display calculate btn
}
