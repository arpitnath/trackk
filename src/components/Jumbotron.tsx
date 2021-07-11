import React, { useState } from 'react'
import { useLocalStorgeState } from '../hooks/localStorageState'
import { debounce } from '../utils/helpers'

interface JumbotronComposition {
  Container: React.FC
  Pane: React.FC
  Title: React.FC
  Content: React.FC
}

const Jumbotron: React.FC & JumbotronComposition = ({ children }) => {
  return (
    <div className='jumbo-item'>
      <div className='jumbo-wrapper'>{children}</div>
    </div>
  )
}

const JumboContainer: React.FC = ({ children }) => {
  return <div className='jumbo-container'>{children}</div>
}

const JumboPane: React.FC = ({ children }) => {
  return <div className='jumbo-pane'>{children}</div>
}

const JumboTitle: React.FC = () => {
  const defaultTitle = 'Trackk-Board'
  const [state, setState] = useLocalStorgeState('jumbo-title', defaultTitle)

  const [title, setTitle] = useState(state)

  const handleChange = (event: any) => {
    debouncedUpdaterCall(event.target.value)
    // setState(event.target.value)
    setTitle(event.target.value)
  }

  const updaterCall = (value: string) => {
    console.log(`%c --DEBOUNCED UPDATE-- => ${value}`, 'color: #5dffc1')

    setState(value)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdaterCall = React.useCallback(
    debounce((nextVal) => updaterCall(nextVal), 700),
    []
  )

  return (
    <div aria-hidden={true} className='jumbo-title'>
      <input value={title} onChange={(e) => handleChange(e)} />
    </div>
  )
}

const JumboContent: React.FC = () => {
  const defaultContent = `⛰ Epics are large overarching initiatives.
🏃‍♂️ Sprints are time-bounded pushes to complete a set of tasks.
🔨 Tasks are the actions that make up epics.
🐞 Bugs are tasks to fix things.
  `

  const [state, setState] = useLocalStorgeState('jumbo-content', defaultContent)

  const [content, setContent] = useState(state)

  const handleChangeContent = (event: any) => {
    debouncedUpdaterCall(event.target.value)
    // setState(event.target.value)
    setContent(event.target.value)
  }

  const updaterCall = (value: string) => {
    console.log(`%c --DEBOUNCED UPDATE-- => ${value}`, 'color: #5dffc1')

    setState(value)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdaterCall = React.useCallback(
    debounce((nextVal) => updaterCall(nextVal), 700),
    []
  )

  return (
    <div className='jumbo-content'>
      <div className='jumbo-textarea'>
        <textarea onChange={(e) => handleChangeContent(e)} value={content} />{' '}
      </div>
    </div>
  )
}

Jumbotron.Container = JumboContainer
Jumbotron.Pane = JumboPane
Jumbotron.Title = JumboTitle
Jumbotron.Content = JumboContent

export default Jumbotron
