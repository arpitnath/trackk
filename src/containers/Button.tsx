import React from 'react'
import { Button } from '../components'

const ButtonContainer: React.FC<{
  icon?: string
  title?: string
  ClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onclickFunction: (e: any) => void
}> = ({ icon = '', title = '', onclickFunction, ClassName = '' }) => {
  return (
    <Button.Wrapper>
      <Button
        _className={ClassName}
        onclickFunction={onclickFunction}
        icon={icon}
        title={title}>
        <Button.Icon />
      </Button>
    </Button.Wrapper>
  )
}

export default ButtonContainer
