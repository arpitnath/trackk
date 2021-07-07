import React from 'react'
import { Jumbotron, Groups } from '../containers'
import { Break } from '../components'

const Board: React.FC = () => {
  return (
    <main>
      <Jumbotron />
      <Break />
      <Groups />
    </main>
  )
}

export default Board
