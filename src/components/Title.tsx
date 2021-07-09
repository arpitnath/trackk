import React, { useEffect, useState } from 'react'
import { debounce } from '../utils/helpers'

interface TitleComposition {
  Wrapper: React.FC
  Head: React.FC<{
    title: string
    grpI: number
    update: (groupIndex: number, edit: string) => void
  }>
  Count: React.FC<{ count: number }>
}

const Title: React.FC & TitleComposition = ({ children }) => {
  return <div className='title-container'>{children}</div>
}

const Wrapper: React.FC = ({ children }) => {
  return <div className='title-wrapper'>{children}</div>
}

const Head: React.FC<{
  title: string
  grpI: number
  update: (groupIndex: number, edit: string) => void
}> = ({ title, update, grpI }) => {
  const [state, setState] = useState(() => title)

  const [width, setWidth] = useState(65)

  const styled = {
    width: `${width}px`
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setState(e.target.value)
    debouncedUpdaterCall(e.target.value)

    // if (state.length > 7) {
    //   console.log('> 7')

    //   setWidth((prev) => prev + 8)
    // } else if (state.length < 5) {
    //   console.log('< 7')
    //   setWidth(50)
    // }
  }

  const updaterCall = (value: string) => {
    console.log(`%c --DEBOUNCED UPDATE-- => ${value}`, 'color: #5dffc1')
    update(grpI, value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdaterCall = React.useCallback(
    debounce((nextVal) => updaterCall(nextVal), 700),
    []
  )

  useEffect(() => {
    if (state.length > 7) {
      setWidth((prev) => prev + state.length + 10)
    } else {
      setWidth(65)
    }
  }, [state])

  return (
    <div style={styled} className='grp-label'>
      <div className='grp-title'>
        <input onChange={handleChange} value={state} />
      </div>
    </div>
  )
}

const Count: React.FC<{ count: number }> = ({ count }) => {
  return <span className='group-length'>{count}</span>
}

Title.Wrapper = Wrapper
Title.Head = Head
Title.Count = Count

export default Title
