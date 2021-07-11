import React, { useRef, useState } from 'react'
import { Button } from '../containers'
import { debounce, editList } from '../utils/helpers'
import { ChangeTarget, Data } from '../utils/types'
import { Location } from './Groups'

interface ModalComposition {
  Container: React.FC
  Header: React.FC
  Options: React.FC<{ close: (arg: boolean) => void }>
  HeaderBody: React.FC<{
    title: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateTitle: any
    location: Location
  }>
  HeaderOptions: React.FC
  Content: React.FC
  TextArea: React.FC<{
    location: Location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateContent: any
    content: string
  }>
}

type Props = {
  callback: React.Dispatch<React.SetStateAction<boolean>>
}

//main entry point
const Modal: React.FC<Props> & ModalComposition = ({ children, callback }) => {
  const modalNodeRef = useRef<HTMLDivElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalNodeRef.current === e.target) {
      console.log('modal clicked outside')

      callback(false)
    }
  }

  return (
    <div
      aria-hidden={true}
      ref={modalNodeRef}
      className='modal-wrapper'
      role='button'
      onClick={(e) => handleClick(e)}>
      <div className='modal-data-container'>{children}</div>
    </div>
  )
}
//entry point
const ModalContainer: React.FC = ({ children }) => {
  return <div className='modal-container'>{children}</div>
}

const ModalHeader: React.FC = ({ children }) => {
  return <div className='header-section modal-section-wrapper'>{children}</div>
}

const ModalOptions: React.FC<{ close: (arg: boolean) => void }> = ({
  close
}) => {
  return (
    <div className='modal-option'>
      {/* top navbar with optional features */}

      <Button
        ClassName='close-modal-min '
        onclickFunction={() => close(false)}
        icon={'el:eye-close'}
      />
    </div>
  )
}

const ModalHeaderBody: React.FC<{
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTitle: any
  location: Location
}> = ({ children, title, updateTitle, location }) => {
  const [headTitle, setHeadTitle] = useState(() => title)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeTask = (event: any) => {
    setHeadTitle(event.target.value)
    debouncedUpdaterCall(event.target.value)
  }

  const updaterCall = (value: string) => {
    console.log(`%c --DEBOUNCED UPDATE-- => ${value}`, 'color: #5dffc1')
    updateTitle((prevState: Data) => {
      const copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      const newState = editList(
        copyOfPrevState,
        location.groupIndex,
        location.itemIndex,
        value,
        ChangeTarget.HEADING
      )
      return newState
    })
  }
  /**
   * @Important
   * Without using `useCallback Hook debounce function do not work as how we want to`
   * Because whenever we are calling updaterCall we are creating a fresh
   * debounce function that is being invoked on every keystroke and since we are
   * calling the fresh debounce function every time, we are loosing the reference
   * to the older debounce function and that is why it will loose its value.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdaterCall = React.useCallback(
    debounce((nextVal) => updaterCall(nextVal), 700),
    []
  )

  return (
    <div className='header-container'>
      <div aria-hidden={true} className='header-body'>
        <input
          onChange={(e) => handleChangeTask(e)}
          // onKeyUp={(e) => processChange(e)}
          value={headTitle}
        />
        {children}
      </div>
    </div>
  )
}
//act as each property
const ModalHeaderOptions: React.FC = ({ children }) => {
  return <div className='modal-headopt-container'>{children}</div>
}
const ModalContent: React.FC = ({ children }) => {
  return <div className='content-section modal-section-wrapper'>{children}</div>
}

const ModalTextArea: React.FC<{
  content: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateContent: any
  location: Location
}> = ({ content, updateContent, location }) => {
  const [text, setText] = useState(() => content)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeTaskContent = (event: any) => {
    setText(event.target.value)
    debouncedUpdaterCall(event.target.value)
  }

  const updaterCall = (value: string) => {
    console.log(`%c --DEBOUNCED UPDATE-- => ${value}`, 'color: #5dffc1')
    updateContent((prevState: Data) => {
      const copyOfPrevState = JSON.parse(JSON.stringify(prevState))
      const newState = editList(
        copyOfPrevState,
        location.groupIndex,
        location.itemIndex,
        value,
        ChangeTarget.BODY
      )
      return newState
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdaterCall = React.useCallback(
    debounce((nextVal) => updaterCall(nextVal), 700),
    []
  )
  return (
    <div className='modal-textarea'>
      <textarea onChange={handleChangeTaskContent} value={text} />{' '}
    </div>
  )
}

Modal.Container = ModalContainer
Modal.Header = ModalHeader
Modal.Options = ModalOptions
Modal.HeaderBody = ModalHeaderBody
Modal.HeaderOptions = ModalHeaderOptions
Modal.Content = ModalContent
Modal.TextArea = ModalTextArea

export default Modal
