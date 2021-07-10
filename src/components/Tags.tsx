import React, { useContext, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Button } from '../containers'
import { useLocalStorgeState } from '../hooks/localStorageState'
import { addToSavetags } from '../utils/helpers'
import { savedTags } from '../utils/labels'
import { Tag } from '../utils/types'

interface TagsComposition {
  Container: React.FC
  List: React.FC<{ tag: Tag; onclick?: (arg?: string) => void }>
  Tag: React.FC<{ data: string; onclick?: (arg?: string) => void; id: string }>
  Title: React.FC<{ title: string }>
  Addtag: React.FC<{ updateTag: (arg: string) => void }>
  SuggestiveTags: React.FC<{ state: Tag[] }>
  Wrapper: React.FC
}

type Props = {
  data: Tag[]
  color: string
  update: (tag: string) => void
  remove: (arg: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TagContext: React.Context<any> = React.createContext(null)

const Tags: React.FC<Props> & TagsComposition = ({
  data,
  color,
  update,
  remove
}) => {
  const [state, setState] = useLocalStorgeState('tags', savedTags)
  const [tagState, setTagState] = useState(data)
  const [addState, setAddState] = useState(false)

  const updateTag = (tag: string) => {
    setAddState(false)

    if (tag !== 'Add a new tag' && tag !== '') {
      update(tag)
      setState((prev: Tag[]) => {
        const copyOfPrevState = JSON.parse(JSON.stringify(prev))

        const newState = addToSavetags(copyOfPrevState, tag)
        return newState
      })
    }
  }
  const tagContext = {
    tagColor: color,
    state: tagState,
    updateTag: updateTag,
    removeTag: remove
  }

  useEffect(() => {
    setTagState(data)
  }, [data])

  return (
    <TagContext.Provider value={tagContext}>
      <Tags.Wrapper>
        <div className='tag-wrapper'>
          <Tags.Title title='Type' />
          <div className='tag-list'>
            {tagState.map((data) => (
              <Tags.List key={data.id} tag={data} />
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

        {addState && <Tags.SuggestiveTags state={state} />}
      </Tags.Wrapper>
    </TagContext.Provider>
  )
}

const TagContainer: React.FC = ({ children }) => {
  return <div className='tag-container'>{children}</div>
}

const TagList: React.FC<{ tag: Tag; onclick?: () => void }> = ({
  tag,
  onclick
}) => {
  return (
    <>
      <Tags.Tag onclick={onclick} data={tag.tag} id={tag.id} />
    </>
  )
}

const TagBlock: React.FC<{ data: string; onclick?: () => void; id: string }> =
  ({ data, onclick, id }) => {
    const { tagColor, removeTag } = useContext(TagContext)
    const [bg] = useState({
      tagcolor: {
        backgroundColor: tagColor
      }
    })
    return (
      <>
        <span
          data-tip
          data-for='tagtooltip'
          onDoubleClick={() => removeTag(id)}
          role='none'
          onClick={onclick}
          style={bg.tagcolor}
          className='tag-block'>
          {data}
        </span>
        <ReactTooltip id='tagtooltip' place='bottom' effect='solid'>
          Double click to remove a tag
        </ReactTooltip>
      </>
    )
  }

const TagTitle: React.FC<{ title: string }> = ({ title }) => {
  return <span>{title}</span>
}

const AddTag: React.FC<{ updateTag: (arg: string) => void }> = ({
  updateTag
}) => {
  const [state, setState] = useState('Add a new tag')
  const { tagColor } = useContext(TagContext)
  const [bg] = useState({
    color: {
      backgroundColor: tagColor
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setState(e.target.value)
  }

  return (
    <div className='add-container'>
      <input
        onClick={() => setState('')}
        value={state}
        onChange={handleChange}
      />
      <div style={bg.color} className='tag-btn'>
        <Button
          ClassName='check-btn tag-check-btn '
          onclickFunction={() => updateTag(state)}
          icon={'carbon:settings-check'}
        />
      </div>
    </div>
  )
}

const SavedTags: React.FC<{ state: Tag[] }> = ({ state }) => {
  const { updateTag } = useContext(TagContext)
  const handleClick = (arg: Tag) => {
    updateTag(arg.tag)
  }

  return (
    <div className='saved-wrapper'>
      <p>Your recent tags</p>
      <div className='savedtags-container'>
        {state.map((tag: Tag) => (
          <Tags.List onclick={() => handleClick(tag)} key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  )
}

const Wrapper: React.FC = ({ children }) => {
  return <div className='main-wrapper'>{children}</div>
}

Tags.Container = TagContainer
Tags.List = TagList
Tags.Tag = TagBlock
Tags.Title = TagTitle
Tags.Addtag = AddTag
Tags.SuggestiveTags = SavedTags
Tags.Wrapper = Wrapper

export default Tags
