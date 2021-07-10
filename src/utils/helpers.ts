/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeTarget, Data, Group, Tag } from './types'
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
    content: 'Please enter a text',
    tags: [{ id: uuid(), tag: '🔥 urgent' }]
  }

  const targetList = _list[index].tasks
  targetList.unshift(newElement)

  return _list
}

export const editGroupTitle = (
  _list: Data,
  groupIndex: number,
  payload: string
) => {
  _list[groupIndex].title = payload

  return _list
}

export const updateLabel = (
  _list: Data,
  groupIndex: number,
  payload: string
) => {
  _list[groupIndex].label = payload

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
    // console.log('function call -- body --')

    targetTask.content = edited
  } else if (change === ChangeTarget.HEADING) {
    // console.log('function call -- head --')
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

export const addNewGroup = (_list: Data) => {
  const task = {
    id: uuid(),
    heading: 'untitled',
    content: 'Please enter a text',
    tags: [{ id: uuid(), tag: '🔥 urgent' }]
  }
  const newGroup: Group = {
    id: uuid(),
    title: 'new',
    label: 'hsl(205, 59%, 80%)',
    tasks: [task]
  }

  _list.push(newGroup)

  return _list
}

export const deleteGroup = (_list: Data, groupIndex: number) => {
  _list.splice(groupIndex, 1)

  return _list
}

export const addTag = (
  _list: Data,
  groupIndex: number,
  taskIndex: number,
  payload: string
) => {
  const targetList = _list[groupIndex].tasks[taskIndex].tags

  const flag = checkTagExits(targetList, payload)
  if (flag) {
    const newTag = {
      id: uuid(),
      tag: payload
    }

    if (targetList.length >= 5) {
      targetList.shift()
    }

    targetList.push(newTag)
  }

  return _list
}
export const deleteTag = (
  _list: Data,
  groupIndex: number,
  taskIndex: number,
  tagId: string
) => {
  const targetTaskTags = _list[groupIndex].tasks[taskIndex].tags

  let index: undefined | number = undefined

  const toRemoveTag = targetTaskTags.find((tag) => tag.id === tagId)

  if (toRemoveTag) {
    index = targetTaskTags.indexOf(toRemoveTag)

    targetTaskTags.splice(index, 1)
  }

  return _list
}

export const addToSavetags = (arr: Tag[], payload: string) => {
  const flag = checkTagExits(arr, payload)

  if (flag) {
    const newTag: Tag = {
      id: uuid(),
      tag: payload
    }

    if (arr.length >= 5) {
      arr.shift()
    }
    arr.push(newTag)
  }

  return arr
}

export const checkTagExits = (arr: Tag[], tag: string) => {
  let flag = true

  for (let i = 0; i < arr.length; i++) {
    const tagInArr = arr[i].tag

    if (tagInArr === tag) {
      flag = false
    }
  }
  return flag
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
