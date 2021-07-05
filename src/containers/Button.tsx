import React from 'react'
import { Button } from '../components'

const ButtonContainer: React.FC<{ icon?: string; title?: string }> = ({
  icon = '',
  title = ''
}) => {
  return (
    <Button.Wrapper>
      <Button icon={icon} title={title}>
        <Button.Icon />
      </Button>
    </Button.Wrapper>
  )
}

export default ButtonContainer
