import { data } from '../../src/utils/defData'
import {
  addNewGroup,
  addToList,
  deleteGroup,
  deletetask,
  editGroupTitle,
  editList,
  moveInsideCurrentList,
  moveToDifferentGroup,
  updateLabel
} from '../../src/utils/helpers'
import { expect } from 'chai'
import { ChangeTarget, Data, Group, Task } from '../../src/utils/types'

describe('MOVE TASK TO A DIFFERENT GROUP', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  it('should be a copy of the original imported data', () => {
    const lengthOfOrginalData = data.length
    const lengthOfCopiedData = listOfTask.length

    expect(lengthOfCopiedData).to.be.eql(lengthOfOrginalData)
  })

  describe('should move a task from a given index to a target group end of the task list', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let currentGroupRef: undefined | number = undefined
    let currentTaskRef: undefined | number = undefined
    let targetGroupRef: undefined | number = undefined

    let currentGroup: undefined | Group = undefined
    let currentTasks: undefined | Task[] = undefined
    let targetGroup: undefined | Group = undefined

    let newcurrentGroup: undefined | Group
    let newcurrentTasks: undefined | Task[]
    let newtargetGroup: undefined | Group

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(listOfTask))

      currentGroupRef = 1
      currentTaskRef = 2
      targetGroupRef = 2

      currentGroup = prevState[currentGroupRef]
      currentTasks = currentGroup.tasks
      targetGroup = prevState[targetGroupRef]

      const newState = moveToDifferentGroup(
        copyOfPrevState,
        currentGroupRef,
        currentTaskRef,
        targetGroupRef
      )

      newcurrentGroup = newState[currentGroupRef]
      newcurrentTasks = newcurrentGroup.tasks
      newtargetGroup = newState[targetGroupRef]
    })

    after(() => {
      prevState = undefined
    })

    it('New State should have same length after moving the task to a new group', () => {
      const lengthPrevState = prevState.length
      const lengthNewState = copyOfPrevState.length

      expect(lengthPrevState).to.be.eql(lengthNewState)
    })

    it('current item should be removed from current group', () => {
      const currentTask = currentTasks[currentTaskRef]
      const taskIds = newcurrentTasks.map((task) => {
        return task.id
      })
      expect(newcurrentGroup.tasks.length).to.be.eql(
        currentGroup.tasks.length - 1
      )

      expect(taskIds.includes(currentTask.id)).to.be.false
    })

    it('current item should be added to target group', () => {
      const newTragetTaskList = newtargetGroup.tasks
      const currentTask = currentGroup.tasks[currentTaskRef]
      const prevTargetTaskListLength = targetGroup.tasks.length
      const newTargetTaskListLength = newTragetTaskList.length

      const taskIds = newtargetGroup.tasks.map((task) => {
        return task.id
      })
      expect(newTargetTaskListLength).to.be.eql(prevTargetTaskListLength + 1)

      expect(taskIds.includes(currentTask.id)).to.be.true
    })

    it('current task should be at last index of the new task list', () => {
      const newTragetTaskList = newtargetGroup.tasks
      const currentTaskId = currentGroup.tasks[currentTaskRef].id
      const lastTaskInTargetTaskList =
        newTragetTaskList[newTragetTaskList.length - 1].id

      expect(lastTaskInTargetTaskList).to.be.eql(currentTaskId)
    })
  })
})

describe('MOVE TASK IN THE SAME GROUP', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  describe('should move a task from a current index to a target index in the same group ', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let newState: undefined | Data = undefined

    let groupRef: undefined | number = undefined
    let fromIndex: undefined | number = undefined
    let targetIndex: undefined | number = undefined

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(listOfTask))

      groupRef = 1
      fromIndex = 2
      targetIndex = 0

      newState = moveInsideCurrentList(
        copyOfPrevState,
        groupRef,
        fromIndex,
        targetIndex
      )
    })

    after(() => {
      prevState = undefined
    })

    it('new list should be of same length of the target group list', () => {
      const prevStateTargetGroupList = prevState[groupRef].tasks
      const newStateTargetGroupList = newState[groupRef].tasks

      expect(prevStateTargetGroupList.length).to.be.eql(
        newStateTargetGroupList.length
      )
    })

    it('target task should be at target index of the list', () => {
      const newStateTargetGroupList = newState[groupRef].tasks
      const currentTaskId = prevState[groupRef].tasks[fromIndex].id
      const taskAtTargetIndexId = newStateTargetGroupList[targetIndex].id

      expect(taskAtTargetIndexId).to.be.eq(currentTaskId)
    })
  })
})

describe('Add TASK IN THE TARGET GROUP LIST', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  describe('should add a new task in a target group ', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let newState: undefined | Data = undefined

    let groupRef: undefined | number = undefined

    let newTaskItem: undefined | Task = undefined

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(listOfTask))
      groupRef = 1

      newState = addToList(copyOfPrevState, groupRef)
      newTaskItem = newState[groupRef].tasks[0]
    })

    after(() => {
      prevState = undefined
    })

    it('length of the list should be increased', () => {
      const prevStateTargetGroupList = prevState[groupRef].tasks
      const newStateTargetGroupList = newState[groupRef].tasks

      expect(newStateTargetGroupList.length).to.be.eql(
        prevStateTargetGroupList.length + 1
      )
    })

    it('should add new task at the top of the list', () => {
      const newStateTargetGroupList = newState[groupRef].tasks

      expect(newTaskItem.id).to.be.eql(newStateTargetGroupList[0].id)
    })
  })
})

describe('Edit A TASK ', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  describe('should add a new task in a target group ', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let newState: undefined | Data = undefined

    let groupRef: undefined | number = undefined
    let taskRef: undefined | number = undefined

    let editedTaskItem: undefined | Task = undefined

    let edit: undefined | string = undefined

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      groupRef = 1
      taskRef = 0
    })

    it('should edit body of the task', () => {
      edit = 'new task body'
      const change = ChangeTarget.BODY
      newState = editList(copyOfPrevState, groupRef, taskRef, edit, change)
      editedTaskItem = newState[groupRef].tasks[taskRef]

      expect(editedTaskItem.content).to.be.eq(edit)
    })

    it('should edit body of the task', () => {
      edit = 'new task title'
      const change = ChangeTarget.HEADING
      newState = editList(copyOfPrevState, groupRef, taskRef, edit, change)
      editedTaskItem = newState[groupRef].tasks[taskRef]

      expect(editedTaskItem.heading).to.be.eq(edit)
    })
  })
})

describe('DELETE A TASK ', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  describe('should remove the task ', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let newState: undefined | Data = undefined

    let groupRef: undefined | number = undefined
    let taskRef: undefined | number = undefined

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      groupRef = 1
      taskRef = 0
    })

    it('should delete the task', () => {
      newState = deletetask(copyOfPrevState, groupRef, taskRef)
      const deletedTask = prevState[groupRef].tasks[taskRef]
      const prevStateListLength = prevState[groupRef].tasks.length
      const newStateListLength = newState[groupRef].tasks.length

      const checkItemRemoved = newState[groupRef].tasks.indexOf(deletedTask)

      expect(newStateListLength).to.be.eql(prevStateListLength - 1)
      expect(checkItemRemoved).to.be.eql(-1)
    })
  })
})

describe('EDIT A GROUP TITLE ', () => {
  let listOfTask: undefined | Data = undefined
  let prevState: undefined | Data = undefined
  let copyOfPrevState: undefined | Data = undefined
  let newState: undefined | Data = undefined

  let groupRef: undefined | number = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
    prevState = listOfTask
    copyOfPrevState = JSON.parse(JSON.stringify(prevState))
    groupRef = 1
  })

  it('should update the group title', () => {
    const payload = 'To Do'
    newState = editGroupTitle(copyOfPrevState, groupRef, payload)

    expect(newState[groupRef].title).to.be.eq(payload)
  })
})

describe('UPDATE A GROUP LABEL ', () => {
  let listOfTask: undefined | Data = undefined
  let prevState: undefined | Data = undefined
  let copyOfPrevState: undefined | Data = undefined
  let newState: undefined | Data = undefined

  let groupRef: undefined | number = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
    prevState = listOfTask
    copyOfPrevState = JSON.parse(JSON.stringify(prevState))
    groupRef = 1
  })

  it('should update the group title', () => {
    const payload = 'red'
    newState = updateLabel(copyOfPrevState, groupRef, payload)

    expect(newState[groupRef].label).to.be.eq(payload)
  })
})

describe('Add A NEW GROUP ', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  describe('should add a new group ', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let newState: undefined | Data = undefined
    let newGroupId: undefined | string

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      newState = addNewGroup(copyOfPrevState)
      newGroupId = newState[newState.length - 1].id
    })

    after(() => {
      prevState = undefined
    })

    it('length of the data should be increased', () => {
      const prevData = prevState

      const newData = newState

      expect(newData.length).to.be.eql(prevData.length + 1)
    })

    it('should add new group at the bottom of the list', () => {
      const newData = newState

      expect(newGroupId).to.be.eql(newData[newData.length - 1].id)
    })
  })
})

describe('DELETE GROUP ', () => {
  let listOfTask: undefined | Data = undefined
  before(() => {
    listOfTask = JSON.parse(JSON.stringify(data))
  })

  describe('should add a delete group with a group index ', () => {
    let prevState: undefined | Data = undefined
    let copyOfPrevState: undefined | Data = undefined
    let newState: undefined | Data = undefined
    let groupIndex: undefined | number = undefined

    before(() => {
      prevState = listOfTask
      copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      groupIndex = 0
      newState = deleteGroup(copyOfPrevState, groupIndex)
    })

    after(() => {
      prevState = undefined
    })

    it('should delete group from the list', () => {
      const deleteGroup = prevState[0]
      const newData = newState
      const checkItemRemoved = newState.indexOf(deleteGroup)

      expect(newData.length).to.be.eql(prevState.length - 1)
      expect(checkItemRemoved).to.be.eql(-1)
    })
  })
})
