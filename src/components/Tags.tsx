import React, { useContext, useState } from 'react'
import { Button } from '../containers'
import { Tag } from '../utils/types'

interface TagsComposition {
  Container: React.FC
  List: React.FC<{ tag: string }>
  Tag: React.FC<{ data: string }>
  Title: React.FC<{ title: string }>
  Addtag: React.FC<{ updateTag: (arg: string) => void }>
}

type Props = {
  data: Tag[]
  color: string
  update: (tag: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TagContext: React.Context<any> = React.createContext(null)

const Tags: React.FC<Props> & TagsComposition = ({ data, color, update }) => {
  const [tagState, setTagState] = useState(data)
  const [addState, setAddState] = useState(false)

  const tagContext = {
    tagColor: color,
    state: tagState
  }

  const updateTag = (tag: string) => {
    setAddState(false)

    if (tag !== 'Add a new tag' && tag !== '') {
      update(tag)
    }
  }

  React.useEffect(() => {
    setTagState(data)
  }, [data])

  return (
    <TagContext.Provider value={tagContext}>
      <div className='tag-wrapper'>
        <Tags.Title title='Type' />
        <div className='tag-list'>
          {tagState.map((data) => (
            <Tags.List key={data.id} tag={data.tag} />
          ))}
          {!addState ? (
            <Button
              ClassName=''
              onclickFunction={() => setAddState(true)}
              icon={'carbon:add'}
            />
          ) : (
            <Tags.Addtag updateTag={updateTag} />
          )}
        </div>
      </div>
    </TagContext.Provider>
  )
}

const TagContainer: React.FC = ({ children }) => {
  return <div className='tag-container'>{children}</div>
}

const TagList: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <>
      {/* something similar to group title | when clicked we can write and push it to the tag list */}
      {/* Button to add a new tag */}
      {/* Tag block */}
      <Tags.Tag data={tag} />
    </>
  )
}

const TagBlock: React.FC<{ data: string }> = ({ data }) => {
  const { tagColor } = useContext(TagContext)
  const [bg] = useState({
    tagcolor: {
      backgroundColor: tagColor
    }
  })
  return (
    <span style={bg.tagcolor} className='tag-block'>
      {data}
    </span>
  )
}

const TagTitle: React.FC<{ title: string }> = ({ title }) => {
  return <span>{title}</span>
}

const AddTag: React.FC<{ updateTag: (arg: string) => void }> = ({
  updateTag
}) => {
  const [state, setState] = useState('Add a new tag')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setState(e.target.value)
  }

  return (
    <div className='add-container'>
      <input value={state} onChange={handleChange} />
      <Button
        ClassName='check-btn'
        onclickFunction={() => updateTag(state)}
        icon={'ant-design:check-outlined'}
      />
    </div>
  )
}

Tags.Container = TagContainer
Tags.List = TagList
Tags.Tag = TagBlock
Tags.Title = TagTitle
Tags.Addtag = AddTag

export default Tags
