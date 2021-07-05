import React, { useEffect, useRef, useState } from 'react'
import { useLocalStorgeState } from '../hooks/localStorageState'
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
}

const Groups: React.FC<Props> & GroupComposition = ({ data }) => {
  const [list, setList] = useLocalStorgeState('board', data)
  //   context value

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

  useEffect(() => {
    list.forEach((group) => {
      group.tasks.forEach((arr) => {
        if (arr === undefined) {
          setList((prevState) => {
            const copyPrev = JSON.parse(JSON.stringify(prevState))
            const newState = copyPrev.tasks.splice(group.tasks.indexOf(arr), 1)
            return newState
          })
        }
      })
    })
  }, [list])

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
  const _node: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  //Button to add a new Block task

  useEffect(() => {
    const currentRef = _node.current

    if (group.tasks.length === 0 && _node.current) {
      console.log('%c currentRef fromUEF =', _node.current, 'color: orange')
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
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  //modal

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`%c ----- drag leave ------`, 'color: orange')

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
      onDragEnter={(e) => handleDragEnter(e, grpI)}
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
