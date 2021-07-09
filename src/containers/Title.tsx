import React from 'react'
import { Title } from '../components'
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
  return (
    <Title.Wrapper>
      <Title>
        <Title.Head grpI={grpI} title={title} update={update} />
        <Title.Count count={numberOfTasks} />
      </Title>
    </Title.Wrapper>
  )
}

export default TitleContainer
