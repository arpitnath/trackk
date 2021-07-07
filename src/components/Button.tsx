import React from 'react'
import { ButtonProps } from '../utils/types'

interface ButtonComposition {
  Wrapper: React.FC
  Title: React.FC
  Icon: React.FC
}

const ButtonContext = React.createContext({
  icon: '',
  title: '',
  _className: ''
})

const Button: React.FC<ButtonProps> & ButtonComposition = ({
  children,
  icon,
  title,
  onclickFunction,
  _className
}) => {
  const btnProps = { icon, title, _className }
  return (
    <ButtonContext.Provider value={btnProps}>
      <div
        aria-hidden
        role={'presentation'}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e: any) => onclickFunction(e)}
        className='button'>
        {children}
      </div>
    </ButtonContext.Provider>
  )
}

const Wrapper: React.FC = ({ children }) => {
  return <div className={`button-wrapper`}>{children}</div>
}

const Title: React.FC = () => {
  const { title } = React.useContext(ButtonContext)
  return <div className='button-title'>{title}</div>
}

const Icon: React.FC = () => {
  //icons from https://iconify.design/icon-sets/
  const { icon, _className } = React.useContext(ButtonContext)

  return (
    <span
      className={`iconify ${_className}`}
      data-icon={icon}
      data-inline='false'></span>
  )
}

Button.Wrapper = Wrapper
Button.Title = Title
Button.Icon = Icon

export default Button
