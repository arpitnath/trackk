import React from 'react'
import { Groups } from '../components'
import { data } from '../utils/defData'

const GroupsContainer: React.FC = () => {
  return (
    <Groups.Container>
      <Groups data={data} />
    </Groups.Container>
  )
}

export default GroupsContainer
