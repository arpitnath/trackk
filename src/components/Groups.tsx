import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocalStorgeState } from '../hooks/localStorageState'
import {
  addToList,
  deletetask,
  editList,
  moveInsideCurrentList,
  moveToDifferentGroup
} from '../utils/helpers'
import { ChangeTarget, Data, Group, Task } from '../utils/types'
import { Button, Modal as ModalContainer } from '../containers'
import { Modal } from './'

interface GroupComposition {
  Container: React.FC
  List: React.FC<GroupList>
  ListTitle: React.FC<{ title: string }>
  Block: React.FC<BlockProps>
}

type Props = {
  data: Data
}

type GroupList = {
  group: Group
  title: string
  dragging: boolean
  grpI: number
  getStyles: (_params: { grpI: number; itemI: number }) => string
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    params: { grpI: number; itemI: number }
  ) => void
  handleDragEnd: () => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, grpI: number) => void
  handleDragDrop: (
    e: React.DragEvent<HTMLElement>,
    _params: { grpI: number; itemI: number }
  ) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (e: any) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GroupContext: React.Context<any> = React.createContext(null)

const Groups: React.FC<Props> & GroupComposition = ({ data }) => {
  const [state, setState] = useLocalStorgeState('board', data)

  const [dragging, setDragging] = useState(false)
  const dragItem: React.MutableRefObject<unknown> = useRef({
    grpI: null,
    itemI: null
  })
  const dragNode: React.MutableRefObject<unknown> = useRef({
    grpI: null,
    itemI: null
  })

  const handleDragStart = (
    e: React.DragEvent,
    params: { grpI: number; itemI: number }
  ) => {
    console.log('%c ------DRAG START--------', 'color: #0f7aa5')

    dragItem.current = params
    dragNode.current = e.target

    setTimeout(() => {
      setDragging(true)
    }, 0)
  }

  const handleDragEnter = (
    e: React.DragEvent<{
      classList: typeof classList
      parentElement: typeof parentElement
    }>,
    grpI: number
  ) => {
    console.log(`%c ------drag enters------`, 'color: #ba3be0')

    const { classList, parentElement } = e.target as HTMLDivElement

    if (!classList.value.includes('current')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (dragItem.current.grpI === grpI) {
        return
      }

      if (parentElement) {
        parentElement.style.background = 'hsl(212, 33%, 89%)'
      }
    }
  }

  const handleDragEnd = () => {
    console.log('%c ------DRAG ENDs--------', 'color: #e9f729')
    setDragging(false)
    dragItem.current = null
    dragNode.current = null
  }

  const handleDragDrop = (
    e: React.DragEvent<HTMLElement>,
    _params: { grpI: number; itemI: number }
  ) => {
    console.log('%c ------DROPPED--------', 'color: #f51ad8')

    const currentItem = dragItem.current as { grpI: number; itemI: number }
    const currentGroupRef = currentItem.grpI
    const currentTaskRef = currentItem.itemI
    const targetGroupRef = _params.grpI
    const targetIndexRef = _params.itemI
    // console.log(`%c currentGroupRef: ${currentGroupRef}`, 'color: #07dee6')
    // console.log(`%c currentItemRef: ${currentTaskRef}`, 'color: #bde607')
    // console.log('%c ------------------', 'color: red')
    // console.log(`%c targetGroupRef: ${targetGroupRef}`, 'color: #07dee6')
    // console.log(`%c targetIndexRef: ${targetIndexRef}`, 'color: #bde607')

    if (currentGroupRef !== targetGroupRef) {
      setState((prevState: Data) => {
        const copyOfPrevState = JSON.parse(JSON.stringify(prevState))

        const newState = moveToDifferentGroup(
          copyOfPrevState,
          currentGroupRef,
          currentTaskRef,
          targetGroupRef
        )

        return newState
      })
    }

    if (currentGroupRef === targetGroupRef) {
      setState((prevState: Data) => {
        const copyOfPrevState = JSON.parse(JSON.stringify(prevState))

        const newState = moveInsideCurrentList(
          copyOfPrevState,
          currentGroupRef,
          currentTaskRef,
          targetIndexRef
        )

        return newState
      })
    }

    const { classList, parentElement } = e.target as HTMLDivElement

    if (!classList.value.includes('current')) {
      if (parentElement) {
        parentElement.style.background = 'none'
      }
    }
    if (dragging) {
      setDragging(false)
    }
  }

  const getStyles = (_params: { grpI: number; itemI: number }) => {
    const currentItem = dragItem.current as { grpI: number; itemI: number }

    if (
      currentItem.grpI === _params.grpI &&
      currentItem.itemI === _params.itemI
    ) {
      return 'current list-item'
    }

    return 'list-item'
  }

  const updateTaskList = (groupIndex: number) => {
    setState((prevState: Data) => {
      const copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      const newState = addToList(copyOfPrevState, groupIndex)

      return newState
    })
  }

  const taskContext = { setState }

  return (
    <GroupContext.Provider value={taskContext}>
      <div className='group-wrapper'>
        {state?.map((group: Group, grpI: number) => (
          <Groups.List
            key={group.id}
            group={group}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDragEnd={handleDragEnd}
            handleDragDrop={handleDragDrop}
            dragging={dragging}
            getStyles={getStyles}
            grpI={grpI}
            title={group.title}
            update={updateTaskList}
          />
        ))}
      </div>
    </GroupContext.Provider>
  )
}

const GroupLists: React.FC<GroupList> = ({
  group,
  dragging,
  grpI,
  getStyles,
  handleDragStart,
  handleDragEnd,
  handleDragEnter,
  handleDragDrop,
  title,
  update
}) => {
  const _node: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  useEffect(() => {
    const currentRef = _node.current

    if (group.tasks.length === 0 && _node.current) {
      _node.current.addEventListener('dragenter', (e) => {
        const { classList } = e.target as HTMLDivElement

        if (classList.value.includes('grp-list')) {
          _node.current?.addEventListener('dragover', (event) => {
            event.preventDefault()
            event.stopPropagation()

            const { style } = event.target as HTMLDivElement

            style.background = 'hsl(212, 33%, 89%)'
            style.height = '100px'

            setTimeout(() => {
              style.background = 'none'
              style.height = ''
            }, 200)
          })
        }
      })

      _node.current.addEventListener('drop', (e) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleDragDrop(e, { grpI, itemI: 0 })
      )
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('drop', () => {
          return
        })
        currentRef.removeEventListener('dragenter', () => {
          return
        })
        currentRef.removeEventListener('drgaover', () => {
          return
        })
      }
    }
    // eslint-disable-next-line
  }, [group])

  return (
    <div ref={_node} className='grp-list'>
      <div className='group-heading'>
        <Groups.ListTitle title={title} />
        <Button onclickFunction={() => update(grpI)} icon={'carbon:add'} />
      </div>
      {group.tasks.map((item, itemI) => (
        <Groups.Block
          key={item.id}
          item={item}
          dragging={dragging}
          getStyles={getStyles}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragEnter={handleDragEnter}
          handleDragDrop={handleDragDrop}
          grpI={grpI}
          itemI={itemI}
        />
      ))}
    </div>
  )
}

export type Location = {
  groupIndex: number
  itemIndex: number
}

type BlockProps = {
  item: Task
  dragging: boolean
  getStyles: (_params: { grpI: number; itemI: number }) => string
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    params: { grpI: number; itemI: number }
  ) => void
  grpI: number
  itemI: number
  handleDragEnd: () => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, grpI: number) => void
  handleDragDrop: (
    e: React.DragEvent<HTMLElement>,
    _params: { grpI: number; itemI: number }
  ) => void
}

const Block: React.FC<BlockProps> = ({
  item,
  dragging,
  getStyles,
  handleDragStart,
  grpI,
  itemI,
  handleDragEnd,
  handleDragEnter,
  handleDragDrop
}) => {
  const { setState } = useContext(GroupContext)

  const [newTask, setNewTask] = useState(item.heading)

  const [taskState, setTaskState] = useState<boolean>(false)

  const [elementLocation, setElementLocation] = useState<Location>({
    groupIndex: grpI,
    itemIndex: itemI
  })
  const [showModal, setShowModal] = useState<boolean>(false)

  const openModal = () => {
    setShowModal((prev) => !prev)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeTask = (event: any) => {
    setNewTask(event.target.value)
  }
  const handleClick = (groupIndex: number, itemIndex: number) => {
    setTaskState(true)
    setElementLocation({
      groupIndex: groupIndex,
      itemIndex: itemIndex
    })
  }
  const handleUpdateTask = (modalFlag: boolean) => {
    setTaskState(false)

    console.log(`%c --MODAL FLAG-- => ${modalFlag}`, 'color: #fffb00')
    const { groupIndex, itemIndex } = elementLocation

    console.log(`%c --TASK-STATE-- => ${taskState}`, 'color: red')
    console.log(`%c --groupIndex-- => ${groupIndex}`, 'color: #ff9292')
    console.log(`%c --itemIndex-- => ${itemIndex}`, 'color: #92ddff')
    setState((prevState: Data) => {
      const _target = !modalFlag ? ChangeTarget.HEADING : ChangeTarget.BODY
      const copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      const newState = editList(
        copyOfPrevState,
        groupIndex,
        itemIndex,
        newTask,
        _target
      )

      return newState
    })
  }

  const handleDeleteTask = (groupIndex: number, taskIndex: number) => {
    setState((prevState: Data) => {
      const copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      const newState = deletetask(copyOfPrevState, groupIndex, taskIndex)

      return newState
    })
  }

  // Event handlers

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`%c ----- drag leave ------`, 'color: orange')

    const { parentElement } = e.target as HTMLDivElement

    if (parentElement) {
      parentElement.style.background = 'none'
    }
  }

  React.useEffect(() => {
    setNewTask(() => item.heading)
  }, [item])

  React.useEffect(() => {
    const doc = document.body
    if (doc) {
      doc.style.overflowY = showModal ? 'hidden' : 'scroll'
    }

    return () => {
      doc.style.overflowY = 'scroll'
    }
  }, [showModal])

  return (
    <>
      {!taskState ? (
        <div
          className={dragging ? getStyles({ grpI, itemI }) : 'list-item'}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
          onDragEnter={(e) => handleDragEnter(e, grpI)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDragDrop(e, { grpI: grpI, itemI: itemI })}
          onDragEnd={handleDragEnd}
          onDragLeave={(e) => handleDragLeave(e)}
          role={'none'}>
          {item.heading !== 'untitled' ? (
            <span>{item.heading}</span>
          ) : (
            <span style={{ opacity: '0.3' }}>{newTask}</span>
          )}

          {showModal && (
            <Modal callback={setShowModal}>
              <ModalContainer elementLocation={elementLocation} data={item} />
            </Modal>
          )}
          <div className='btn-container'>
            <Button
              onclickFunction={() => handleClick(grpI, itemI)}
              icon={'mdi:fountain-pen-tip'}
            />
            <Button
              onclickFunction={() => handleDeleteTask(grpI, itemI)}
              icon={'fluent:delete-off-20-filled'}
            />
            <Button onclickFunction={openModal} icon={'cil:options'} />
          </div>
        </div>
      ) : (
        //
        <div className='list-item'>
          <input value={newTask} onChange={handleChangeTask} />

          <Button
            ClassName='check-btn'
            onclickFunction={() => handleUpdateTask(false)}
            icon={'ant-design:check-outlined'}
          />
        </div>
      )}
    </>
  )
}

const GroupContainer: React.FC = ({ children }) => {
  return <div className='group-container'>{children}</div>
}

const ListTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <p className='grp-title'>
      {title}
      <span role='img' aria-label='rocket'>
        🚀
      </span>
    </p>
  )
}

Groups.Container = GroupContainer
Groups.List = GroupLists
Groups.ListTitle = ListTitle
Groups.Block = Block

export default Groups
