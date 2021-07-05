import React from 'react'
import { Data, Group } from '../utils/types'

interface GroupComposition {
  Container: React.FC
  List: React.FC<GroupList>
  ListTitle: React.FC<{ title: string }>
}

type Props = {
  data: Data
}
type GroupList = {
  group: Group
  title: string
}

const Groups: React.FC<Props> & GroupComposition = ({ data }) => {
  return (
    <div className='group-wrapper'>
      {data.map((group) => (
        <Groups.List key={group.title} title={group.title} group={group} />
      ))}
    </div>
  )
}

const GroupContainer: React.FC = ({ children }) => {
  return <div className='group-container'>{children}</div>
}

const GroupLists: React.FC<GroupList> = ({ title, group }) => {
  console.log('GROUP: ', group)

  return (
    <div className='grp-list'>
      <Groups.ListTitle title={title} />
    </div>
  )
}

const ListTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <p className='grp-title'>
      {title}
      <span role='img' aria-label='rocket'>
        🚀
      </span>
    </p>
  )
}

Groups.Container = GroupContainer
Groups.List = GroupLists
Groups.ListTitle = ListTitle

export default Groups
