import React from 'react'
import { Tags } from '../components'
import { Tag } from '../utils/types'

const TagsContainer: React.FC<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <Tags.Container>
      <Tags data={tags} />
    </Tags.Container>
  )
}

export default TagsContainer
