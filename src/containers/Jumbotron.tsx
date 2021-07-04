import React from 'react'
import { Jumbotron } from '../components'

const JumbotronContainer = () => {
  return (
    <Jumbotron.Container>
      <Jumbotron>
        <Jumbotron.Pane>
          <Jumbotron.Title title={'Dev-Board'} />
          <Jumbotron.Content>
            <p>
              {' '}
              <span role='img' aria-label='mountain'>
                ⛰{' '}
              </span>
              Epics are large overarching initiatives.{' '}
            </p>
            <p>
              {' '}
              <span role='img' aria-label='run'>
                🏃‍♂️
              </span>{' '}
              Sprints are time-bounded pushes to complete a set of tasks.
            </p>
            <p>
              {' '}
              <span role='img' aria-label='hammer'>
                🔨{' '}
              </span>
              Tasks are theactions that make up epics.
            </p>
            <p>
              {' '}
              <span role='img' aria-label='bug'>
                🐞
              </span>{' '}
              Bugs are tasks to fix things.
            </p>
          </Jumbotron.Content>
        </Jumbotron.Pane>
      </Jumbotron>
    </Jumbotron.Container>
  )
}

export default JumbotronContainer
