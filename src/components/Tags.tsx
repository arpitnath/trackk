import React from 'react'
import { Tag } from '../utils/types'

interface TagsComposition {
  Container: React.FC
  List: React.FC
  Tag: React.FC
}

type Props = {
  data: Tag[]
}

const Tags: React.FC<Props> & TagsComposition = ({ data }) => {
  console.log(`%c tags: ${data}, 'color: green`)

  return (
    <div className='tag-wrapper'>
      <h1>TagList component</h1>
    </div>
  )
}

const TagContainer: React.FC = ({ children }) => {
  return <div className='tag-container'>{children}</div>
}

const TagList: React.FC = () => {
  return (
    <div className='tag-list'>
      {/* something similar to group title | when clicked we can write and push it to the tag list */}
      {/* Button to add a new tag */}
      {/* Tag block */}
    </div>
  )
}

const TagBlock: React.FC = () => {
  return <span>tag</span>
}

Tags.Container = TagContainer
Tags.List = TagList
Tags.Tag = TagBlock

export default Tags
