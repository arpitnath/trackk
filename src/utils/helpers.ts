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
