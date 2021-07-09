import React, { useContext, useEffect, useState } from 'react'
import { Title } from '../components'
import { GroupContext } from '../components/Groups'
import { lableColors } from '../utils/labels'
type Props = {
  title: string
  numberOfTasks: number
  grpI: number
  label: string
  update: (groupIndex: number, edit: string) => void
  deleteGroup: (groupIndex: number) => void
}

const TitleContainer: React.FC<Props> = ({
  title,
  numberOfTasks,
  update,
  grpI,
  label,
  deleteGroup
}) => {
  const { updateGroupLabel } = useContext(GroupContext)

  const [labelColor, setLabelColor] = useState(label)
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

  useEffect(() => {
    updateGroupLabel(grpI, labelColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelColor, grpI])

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
          grp={grpI}
          labelColor={styled}
          update={handleUpdateSelector}
          deleteGroup={deleteGroup}
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
