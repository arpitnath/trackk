import React from 'react'
import { Jumbotron, Groups } from '../containers'
import { Break } from '../components'
import Loader from '../components/Loader'

const Board: React.FC = () => {
  const [fakeState, setFakeState] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setFakeState(false)
    }, 700)
  }, [])

  return (
    <main>
      {fakeState ? (
        <Loader />
      ) : (
        <>
          <Jumbotron />
          <Break />
          <Groups />
        </>
      )}
    </main>
  )
}

export default Board
