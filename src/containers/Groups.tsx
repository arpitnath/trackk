import React from 'react'
import { Groups } from '../components'
import { data } from '../utils/defData'
import ErrorBoundary from '../components/ErrorBoundary'

const GroupsContainer: React.FC = () => {
  return (
    <Groups.Container>
      <ErrorBoundary>
        <Groups data={data} />
      </ErrorBoundary>
    </Groups.Container>
  )
}

export default GroupsContainer
