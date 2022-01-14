import React, {
  useContext,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../contexts/socket.jsx';

const Remove = ({ item, handleModalClose }) => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  const handleChannelRemove = () => {
    socket.emit('removeChannel', { id: item.id }, (response) => {
      console.log(response);
      handleModalClose();
    });
  };

  return (
    <Modal show onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannelText')}</p>
        <div className="d-flex justify-content-end pt-3">
          <Button variant="secondary" type="button" className="mr-2" onClick={handleModalClose}>{t('modals.cancelButton')}</Button>
          <Button variant="danger" type="submit" onClick={handleChannelRemove}>{t('modals.deleteButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
