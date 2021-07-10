import React from 'react'
import { Tags } from '../components'
import { Tag } from '../utils/types'

type Props = {
  tags: Tag[]
  color: string
  update: (tag: string) => void
  remove: (tag: string) => void
}

const TagsContainer: React.FC<Props> = ({ tags, color, update, remove }) => {
  return (
    <Tags.Container>
      <Tags data={tags} color={color} update={update} remove={remove} />
    </Tags.Container>
  )
}

export default TagsContainer
