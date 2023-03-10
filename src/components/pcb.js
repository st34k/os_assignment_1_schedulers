export default class PCB {
  startInterval = []
  endInterval = []
  response
  turnaround
  waiting
  completion

  constructor(pid, arrival, burst, priority) {
    this.pid = pid
    this.arrival = arrival
    this.burst = this.remainingBurst = burst
    this.priority = priority || 0
  }

  burstTick() {
    this.remainingBurst--
  }

  stampIntervalStart(cpuTime) {
    this.startInterval.push(cpuTime)
  }

  stampIntervalEnd(cpuTime) {
    this.endInterval.push(cpuTime)
  }
}