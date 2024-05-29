type stack<T> = {
  items: T[]
  push: (item: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  size: () => number
  getStack: () => T[]
}

export function Stack<T>(): stack<T> {
  const stack: T[] = []

  return {
    items: stack,
    push: (item: T) => {
      stack.push(item)
    },
    pop: () => {
      return stack.pop()
    },
    peek: () => {
      return stack[stack.length - 1]
    },
    size: () => {
      return stack.length
    },
    getStack: () => {
      return stack
    }
  }
}
