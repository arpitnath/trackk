import React, { useRef, useState } from 'react'
import { moveInsideCurrentList, moveToDifferentGroup } from '../utils/helpers'
import { Data, Group } from '../utils/types'

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
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, params: any) => void
  handleDragEnd: () => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragDrop: (
    e: React.DragEvent<HTMLElement>,
    _params: { grpI: number; itemI: number }
  ) => void
}

const Groups: React.FC<Props> & GroupComposition = ({ data }) => {
  const [list, setList] = useState(() => data)
  //   context value

  //   console.log('data: ', list)
  const [dragging, setDragging] = useState(false)
  const dragItem: React.MutableRefObject<unknown> = useRef({
    grpI: null,
    itemI: null
  })
  const dragNode: React.MutableRefObject<unknown> = useRef({
    grpI: null,
    itemI: null
  })

  //   handelDragStart
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
  //handleDragEnter
  const handleDragEnter = (
    e: React.DragEvent<{
      classList: typeof classList
      parentElement: typeof parentElement
    }>
  ) => {
    console.log(`%c ------drag enters------`, 'color: #ba3be0')

    const { classList, parentElement } = e.target as HTMLDivElement

    console.log(
      `%c CLASSLIST TARGET: ${classList} | ${typeof classList}`,
      'color: #09eec8'
    )

    if (!classList.value.includes('current')) {
      if (parentElement) {
        parentElement.style.background = 'red'
      }
    }
  }
  //handleDragEnd
  const handleDragEnd = () => {
    console.log('%c ------DRAG ENDs--------', 'color: #e9f729')
    setDragging(false)
    dragItem.current = null
    dragNode.current = null
  }
  //handleDragDrop
  const handleDragDrop = (
    e: React.DragEvent<HTMLElement>,
    _params: { grpI: number; itemI: number }
  ) => {
    console.log('%c ------DROPPED--------', 'color: #f51ad8')
    console.log('event: ', e.target)
    console.log('params: ', _params)
    //logic
    const currentItem = dragItem.current as { grpI: number; itemI: number }
    const currentGroupRef = currentItem.grpI
    const currentTaskRef = currentItem.itemI
    const targetGroupRef = _params.grpI
    const targetIndexRef = _params.itemI
    console.log(`%c currentGroupRef: ${currentGroupRef}`, 'color: #07dee6')
    console.log(`%c currentItemRef: ${currentTaskRef}`, 'color: #bde607')
    console.log('%c ------------------', 'color: red')
    console.log(`%c targetGroupRef: ${targetGroupRef}`, 'color: #07dee6')
    console.log(`%c targetIndexRef: ${targetIndexRef}`, 'color: #bde607')

    if (currentGroupRef !== targetGroupRef) {
      console.log(`%c MOVE`, 'color: #ff1d1d')
      setList((prevState) => {
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
      console.log(`%c MOVE_IN_SAME_ARRAY`, 'color: #2affd1')
      setList((prevState) => {
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
  }
  //getStyles
  const getStyles = (_params: { grpI: number; itemI: number }) => {
    const currentItem = dragItem.current as { grpI: number; itemI: number }

    if (
      currentItem.grpI === _params.grpI &&
      currentItem.itemI === _params.itemI
    ) {
      console.log('%c PIkkuuuuuuuu', 'color: #8bd1ff')

      return 'current list-item'
    }

    return 'list-item'
  }

  //   React.useEffect(() => {
  //     console.log(`%c dragItem: ${dragItem.current.grpI}`, 'color: red')
  //   })

  return (
    <div className='group-wrapper'>
      {list.map((group) => (
        <Groups.List
          key={group.id}
          group={group}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
          handleDragDrop={handleDragDrop}
          dragging={dragging}
          getStyles={getStyles}
          grpI={group.id}
          title={group.title}
        />
      ))}
    </div>
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
  title
}) => {
  console.log('group list: ', group)
  console.log('group list id: ', grpI)

  return (
    <div className='grp-list'>
      <Groups.ListTitle title={title} />
      {group.tasks.map((item, itemI) => (
        <Groups.Block
          key={item}
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

type BlockProps = {
  item: string
  dragging: boolean
  getStyles: (_params: { grpI: number; itemI: number }) => string
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, params: any) => void
  grpI: number
  itemI: number
  handleDragEnd: () => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void
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
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('on drag over')
  }

  //modal
  console.log(`%c grpI: ${grpI} | itemI: ${itemI}`, 'color: orange')

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const { parentElement } = e.target as HTMLDivElement

    if (parentElement) {
      parentElement.style.background = 'none'
    }
  }

  return (
    <div
      className={dragging ? getStyles({ grpI, itemI }) : 'list-item'}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDragDrop(e, { grpI: grpI, itemI: itemI })}
      onDragEnd={handleDragEnd}
      onDragLeave={(e) => handleDragLeave(e)}
      role={'none'}>
      {item}
    </div>
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
