import { addProcess, calculate } from '../gantt.js';

const schedulerSelection = document.getElementById('schedulers')

document.getElementById('submit').addEventListener('click', () => addProcess())
document.getElementById('calc').addEventListener('click', () => calculate())

schedulerSelection.addEventListener('change', (e) => {
  if (schedulerSelection.selectedIndex === 2) {
    document.getElementById('priority_div').style.display = 'block';
    document.getElementById('quantum_div').style.display = 'none';
  } else if (schedulerSelection.selectedIndex === 3) {
    document.getElementById('quantum_div').style.display = 'block';
    document.getElementById('priority_div').style.display = 'none';
  } else {
    document.getElementById('priority_div').style.display = 'none';
    document.getElementById('quantum_div').style.display = 'none';
  }
})

export function getSchedulerType() {
  return document.getElementById('schedulers').value
}

export function getQuantum() {
  return document.getElementById('tq').value || 2
}

const arrivalInput = document.getElementById('arrivalTime')
const burstInput = document.getElementById('burstTime')
const priorityInput = document.getElementById('priority')

export { arrivalInput, burstInput, priorityInput }