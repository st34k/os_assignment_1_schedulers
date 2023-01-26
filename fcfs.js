// input from user
// 1. no of processes
// 2. arrival time
// 3. burst time

const prompt = require('prompt-sync')();

const procAmt = prompt('input amount of processes: ')
let processes = []
let prev = 0

for (let i = 0; i < procAmt; i++) {
  try {
    let at = prompt(`input arrival time for pid ${ i }: `)
    let bt = prompt(`input burst time for pid ${ i }: `)

    processes.push({
      pid: i,
      at: Number(at),
      bt: Number(bt)
    })

    prev += bt
  } catch (err) {
    console.log('an error has occurred, check input is only numeric')
  }
}


processes.sort((a, b) => {
  if (a.at < b.at) return -1
  if (a.at > b.at) return 1
  return 0
})

for (let i = 0; i < procAmt; i++) {
  let p = processes[i]

  if (i === 0) {
    p.finishTime = p.at + p.bt
    p.tat = p.finishTime - p.at
    p.wt = p.tat - p.bt
  } else {
    p.finishTime = p.bt + processes[i - 1].finishTime
    p.tat = p.finishTime - p.at
    p.wt = p.tat - processes[i-1].bt
  }
}

console.log(1)

