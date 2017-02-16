import React from 'react'
import moment from 'moment'
import { Modal, Header, Button } from 'semantic-ui-react'

export default ({ button, header, onClick, settings }) => (
  <Modal trigger={<Button onClick={onClick}>{button}</Button>}>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>A compute job of {moment.duration(settings.duration, 'days').humanize()}</Header>
        <p>We've come up with a fair price of</p>
        <p>€ {(settings.total || 0).toFixed(2)}</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)
