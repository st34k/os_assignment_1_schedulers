export class ProcessScheduler {
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

          this.checkReadyQueue()
          next = this.processes[0]
        }
      }

      this.execute()
    }
  }

  checkReadyQueue() {
  } // empty declaration - will be overridden in child classes

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
    this.cpu.tick()

    if (this.running) {
      this.running.tickBurst()

      if (!this.running.remainingBurst) {
        this.terminate()
        this.checkReadyQueue()
      }
    }
  }
}

class CPU {
  time = 0

  tick() {
    this.time++
  }
}

