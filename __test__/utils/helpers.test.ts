import { data } from '../../src/utils/defData'
import { moveToDifferentGroup } from '../../src/utils/helpers'
import { expect } from 'chai'
import { Data, Group, Task } from '../../src/utils/types'

// const dummyTasks: Task[] = [
//   {
//     id: 'demo_dummy#1',
//     heading: 'dummy task',
//     content: 'dummy content'
//   }
// ]
// const dummyGroup: Group = {
//   id: 'group_id#dummy',
//   title: 'group 3',
//   tasks: dummyTasks
// }

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
