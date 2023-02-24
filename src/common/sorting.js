export function sortByArrivalTime(queue) {
  // sort the processes by arrival time
  queue.sort((a, b) => {
    if (a.arrival < b.arrival) return -1
    if (a.arrival > b.arrival) return 1
    return 0
  })
}

export function sortByRemainingBurst(queue) {
  queue.sort((a, b) => {
    if (a.remainingBurst < b.remainingBurst) return -1
    if (a.remainingBurst > b.remainingBurst) return 1

    return 0
  })
}

export function sortByPriority(queue) {
  queue.sort((a, b) => {
    if (a.priority < b.priority) return -1
    if (a.priority > b.priority) return 1

    return 0
  })
}

// priority queues are sorted by some type (like burst or given priority)
// pass the type here to sort accordingly
export function sortPrioritySchedulerQueue(queue, priorityType) {
  queue.sort((a, b) => {
    if (a.arrival < b.arrival) return -1
    if (a.arrival > b.arrival) return 1

    if (a.arrival === b.arrival) {
      if (a[priorityType] < b[priorityType]) return -1
      if (a[priorityType] > b[priorityType]) return 1
    }

    return 0
  })
}
