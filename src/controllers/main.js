// export everything needed for main.js from here (avoid importing from a gazillion files in main)

import PCB from '../components/pcb.js';
import { calcAndDisplayAverageWT } from '../common/appendHtmlDefs.js';
import {
  arrivalInput,
  burstInput,
  priorityInput,
  getSchedulerType,
  clearInputs,
  displayCalculateBtn
} from './htmlEvents.js'
import createAndAppendElement from './appendHtml.js';
import { appendCalculatedTimesToTable, createGantt, appendNewProcessToTable } from './tableController.js'

export {
  PCB,
  calcAndDisplayAverageWT, arrivalInput,
  burstInput,
  priorityInput,
  getSchedulerType,
  clearInputs,
  displayCalculateBtn,
  createAndAppendElement, appendCalculatedTimesToTable, createGantt, appendNewProcessToTable
}