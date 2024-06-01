type queue<T> = {
  items: T[]
  enqueue: (item: T) => void
  dequeue: () => T | undefined
  peek: () => T | undefined
  size: () => number
  getQueue: () => T[]
}

export function Queue<T>(): queue<T> {
  const queue: T[] = []

  return {
    items: queue,
    enqueue: (item: T) => {
      queue.push(item)
    },
    dequeue: () => {
      return queue.shift()
    },
    peek: () => {
      return queue[0]
    },
    size: () => {
      return queue.length
    },
    getQueue: () => {
      return queue
    }
  }
}
