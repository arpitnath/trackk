import React, { useState } from 'react'
import { Title } from '../components'
import { lableColors } from '../utils/labels'
type Props = {
  title: string
  numberOfTasks: number
  grpI: number
  update: (groupIndex: number, edit: string) => void
}

const TitleContainer: React.FC<Props> = ({
  title,
  numberOfTasks,
  update,
  grpI
}) => {
  const [labelColor, setLabelColor] = useState('hsl(205, 59%, 80%)')
  const [openSelector, setOpenSelector] = useState(false)

  const updateColor = (arg: string) => {
    console.log('update color', arg)
    setLabelColor(arg)
    setOpenSelector(false)
  }

  const handleUpdateSelector = () => {
    console.log(
      `%c selector state => ${openSelector}`,
      'color: hsl(205, 89%, 70%)'
    )

    setOpenSelector(true)
  }

  const styled = {
    color: {
      backgroundColor: labelColor
    }
  }

  return (
    <Title.Wrapper>
      <Title>
        <Title.Head
          labelColor={labelColor}
          grpI={grpI}
          title={title}
          update={update}
        />
        <Title.Count
          labelColor={styled}
          update={handleUpdateSelector}
          count={numberOfTasks}
        />
        {openSelector && (
          <Title.ColorSelector colors={lableColors} update={updateColor} />
        )}
      </Title>
    </Title.Wrapper>
  )
}

export default TitleContainer
