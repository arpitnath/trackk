import { Data } from './types'

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

export const addToList = (_list: Data, index: number, elementToAdd: string) => {
  const newElement = elementToAdd

  const targetList = _list[index].tasks
  targetList.unshift(newElement)

  return _list
}

export const editList = (
  array: Data,
  groupIndex: number,
  elementIndex: number,
  editedElement: string
) => {
  const targetList = array[groupIndex].tasks

  targetList.splice(elementIndex, 1, editedElement)

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
