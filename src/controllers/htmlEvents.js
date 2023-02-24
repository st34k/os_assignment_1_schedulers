import { addProcess, calculate } from '../../main.js';

const schedulerSelection = document.getElementById('schedulers')
const arrivalInput = document.getElementById('arrivalTime')
const burstInput = document.getElementById('burstTime')
const priorityInput = document.getElementById('priority')

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
  return Number(document.getElementById('tq').value || 2)
}

export function displayCalculateBtn() {
  document.getElementById('calc').style.display = 'block' // once one proc was added, display the calculate button
}

export function clearInputs() {
  arrivalInput.value = ''
  burstInput.value = ''
  priorityInput.value = ''
}

export { arrivalInput, burstInput, priorityInput }
