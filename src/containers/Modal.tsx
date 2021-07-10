import React, { useContext } from 'react'
import { Modal } from '../components'
import { GroupContext, Location } from '../components/Groups'
import { Task, Tag } from '../utils/types'

type Props = {
  data: Task
  tags: Tag[]
  elementLocation: Location
}

const ModalContainer: React.FC<Props> = ({ data, elementLocation, tags }) => {
  const { setState } = useContext(GroupContext)
  console.log('tags: ', tags)

  return (
    <Modal.Container>
      <Modal.Header>
        <Modal.Options />
        <Modal.HeaderBody
          location={elementLocation}
          updateTitle={setState}
          title={data.heading}>
          <Modal.HeaderOptions>
            {/* Tags will go */}
            <span>new options</span>
          </Modal.HeaderOptions>
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
