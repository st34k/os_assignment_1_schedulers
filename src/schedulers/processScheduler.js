import CPU from '../components/cpu.js'

export default class ProcessScheduler {
  constructor(processes) {
    this.processes = processes
    this.processesAmount = processes.length
  }

  cpu = new CPU()
  ready = []
  terminated = []
  running = null

  start() {
    let next = this.processes[0]

    while (this.terminated.length < this.processesAmount) {
      if (this.processes.length) {

        while (next && next.arrival === this.cpu.time) {
          this.introduce()

          next = this.processes[0]
        }
      }

      this.execute()
    }
  }

  checkReadyQueue() {
    if (!this.running && this.ready.length) {
      this.dispatch()
    }
  }

  introduce() {
    this.ready.push(this.processes.shift())
  }

  dispatch() {
    this.running = this.cpu.running = this.ready.shift()

    this.running.stampIntervalStart(this.cpu.time)
  }

  terminate() {
    this.running.completion = this.cpu.time
    this.running.stampIntervalEnd(this.cpu.time)

    this.terminated.push(this.running)

    this.running = this.cpu.running = null
  }

  preempt() {
    this.running.stampIntervalEnd(this.cpu.time)

    this.ready.push(this.running)
  }

  execute() {
    this.cpu.clockTick()

    if (this.running) {
      this.running.burstTick()

      if (!this.running.remainingBurst) {
        this.terminate()
      }
    }
  }
}


