import React, { useContext } from 'react'
import { Modal } from '../components'
import { GroupContext, Location } from '../components/Groups'
import { Task } from '../utils/types'

type Props = {
  data: Task
  elementLocation: Location
}

const ModalContainer: React.FC<Props> = ({ data, elementLocation }) => {
  const { setState } = useContext(GroupContext)
  return (
    <Modal.Container>
      <Modal.Header>
        <Modal.Options />
        <Modal.HeaderBody
          location={elementLocation}
          updateTitle={setState}
          title={data.heading}>
          <Modal.HeaderOptions />
        </Modal.HeaderBody>
      </Modal.Header>
      <Modal.Content>
        <Modal.Placeholder />
        <Modal.TextArea
          location={elementLocation}
          updateContent={setState}
          content={data.content}
        />
      </Modal.Content>
    </Modal.Container>
  )
}

export default ModalContainer
