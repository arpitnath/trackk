/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeTarget, Data } from './types'
import { v4 as uuid } from 'uuid'

export const moveToDifferentGroup = (
  _list: Data,
  currentGroupRef: number,
  currentItemRef: number,
  targetGroupRef: number
) => {
  const currentGroup = _list[currentGroupRef]
  const currentList = currentGroup.tasks

  const targetGroup = _list[targetGroupRef]
  const targetList = targetGroup.tasks

  const draggedElementIndex = currentItemRef
  const draggedElement = currentList[draggedElementIndex]

  currentList.splice(draggedElementIndex, 1)
  targetList.push(draggedElement)

  return _list
}

export const moveInsideCurrentList = (
  _list: Data,
  groupRef: number,
  fromIndex: number,
  targetIndex: number
) => {
  const taskList = _list[groupRef].tasks
  const draggedElement = taskList[fromIndex]

  taskList.splice(fromIndex, 1)
  taskList.splice(targetIndex, 0, draggedElement)

  return _list
}

export const addToList = (_list: Data, index: number) => {
  const newElement = {
    id: uuid(),
    heading: 'untitled',
    content: 'Please enter a text'
  }

  const targetList = _list[index].tasks
  targetList.unshift(newElement)

  return _list
}

export const editList = (
  array: Data,
  groupIndex: number,
  elementIndex: number,
  edited: string,
  change: ChangeTarget
) => {
  const targetList = array[groupIndex].tasks
  const targetTask = targetList[elementIndex]

  if (change === ChangeTarget.BODY) {
    targetTask.content = edited
  } else if (change === ChangeTarget.HEADING) {
    targetTask.heading = edited
  } else {
    return array
  }

  targetList.splice(elementIndex, 1, targetTask)

  return array
}

export const deletetask = (
  array: Data,
  groupIndex: number,
  taskIndex: number
) => {
  const targetList = array[groupIndex].tasks

  targetList.splice(taskIndex, 1)

  return array
}

export const debounce = (
  fn: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let timer: any = undefined

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
