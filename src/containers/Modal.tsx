import React, { useContext } from 'react'
import { Modal } from '../components'
import { Tags } from './'
import { GroupContext, Location } from '../components/Groups'
import { Task, Tag } from '../utils/types'

type Props = {
  data: Task
  tags: Tag[]
  elementLocation: Location
  color: string
  update: (tag: string) => void
  removeTags: (arg: string) => void
  closeModal: (arg: boolean) => void
}

const ModalContainer: React.FC<Props> = ({
  data,
  elementLocation,
  tags,
  color,
  update,
  removeTags,
  closeModal
}) => {
  const { setState } = useContext(GroupContext)

  return (
    <Modal.Container>
      <Modal.Header>
        <Modal.Options close={closeModal} />
        <Modal.HeaderBody
          location={elementLocation}
          updateTitle={setState}
          title={data.heading}>
          <Modal.HeaderOptions>
            <Tags
              remove={removeTags}
              update={update}
              color={color}
              tags={tags}
            />
          </Modal.HeaderOptions>
        </Modal.HeaderBody>
      </Modal.Header>
      <Modal.Content>
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
