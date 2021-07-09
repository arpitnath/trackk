import React, { useEffect, useState } from 'react'
import { debounce } from '../utils/helpers'
import { Color } from '../utils/labels'

type HeadProps = {
  title: string
  grpI: number
  update: (groupIndex: number, edit: string) => void
  labelColor: string
}

type CountProps = {
  count: number
  update: () => void
  labelColor: {
    color: {
      backgroundColor: string
    }
  }
}
interface TitleComposition {
  Wrapper: React.FC
  Head: React.FC<HeadProps>
  Count: React.FC<CountProps>
  ColorSelector: React.FC<{
    update: (arg: string) => void
    colors: Color[]
  }>
}

const Title: React.FC & TitleComposition = ({ children }) => {
  return <div className='title-container'>{children}</div>
}

const Wrapper: React.FC = ({ children }) => {
  return <div className='title-wrapper'>{children}</div>
}

const Head: React.FC<HeadProps> = ({ title, update, grpI, labelColor }) => {
  const [state, setState] = useState(() => title)
  const [width, setWidth] = useState(65)

  const styled = {
    styles: {
      width: `${width}px`,
      backgroundColor: labelColor
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setState(e.target.value)
    debouncedUpdaterCall(e.target.value)
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
    if (state.length > 6) {
      setWidth((prev) => prev + state.length + (state.length - 8) * 5)
    }
  }, [state])

  return (
    <div style={styled.styles} className='grp-label'>
      <div className='grp-title'>
        <input onChange={handleChange} value={state} />
      </div>
    </div>
  )
}

const Count: React.FC<CountProps> = ({ count, update, labelColor }) => {
  return (
    <div className='grp-counter-wrapper'>
      <span className='group-length'>{count}</span>

      <div
        style={labelColor.color}
        role='none'
        onClick={update}
        className='label-color'></div>
    </div>
  )
}

const ColorSelector: React.FC<{
  update: (arg: string) => void
  colors: Color[]
}> = ({ update, colors }) => {
  return (
    <div className='color-selector'>
      {colors.map((color) => (
        <div
          role='none'
          onClick={() => update(color.style.backgroundColor)}
          key={color.id}
          className='color-select'>
          <div style={color.style} className='label-color'></div>
          <span>{color.color}</span>
        </div>
      ))}
    </div>
  )
}

Title.Wrapper = Wrapper
Title.Head = Head
Title.Count = Count
Title.ColorSelector = ColorSelector

export default Title
