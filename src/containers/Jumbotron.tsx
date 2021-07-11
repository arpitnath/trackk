import React from 'react'
import { Jumbotron } from '../components'

const JumbotronContainer: React.FC = () => {
  return (
    <Jumbotron.Container>
      <Jumbotron>
        <Jumbotron.Pane>
          <Jumbotron.Title title={'Trackk-Board'} />
          <Jumbotron.Content />
        </Jumbotron.Pane>
      </Jumbotron>
    </Jumbotron.Container>
  )
}

export default JumbotronContainer
