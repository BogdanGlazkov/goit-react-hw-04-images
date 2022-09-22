import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './ImageGalleryItem.module.css';
import { Modal } from 'components';

export const ImageGalleryItem = ({ image, tags, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <li className={s.item} onClick={handleOpenModal}>
        <img className={s.image} src={image} alt={tags} />
      </li>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <img src={largeImage} alt={tags} />
        </Modal>
      )}
    </>
  );
};


ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
