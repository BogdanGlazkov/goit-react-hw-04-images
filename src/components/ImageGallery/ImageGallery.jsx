import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem, Loader, TextButton } from 'components';

export const ImageGallery = ({ images, status, isLoadBtnShown, onLoadMore, perPage }) => {
  const bottom = useRef(null);

  useEffect(() => {
    if (images.length > perPage) {
      setTimeout(() => {
        window.scrollTo({
          top: bottom.current.clientHeight,
          behavior: 'smooth',
        });
      }, 300)
    }
  }, [images, perPage]);

  return (
    <>
      <ul className={s.gallery} ref={bottom}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            tags={tags}
            image={webformatURL}
            largeImage={largeImageURL}
          />
        ))}
      </ul>
      {status === 'pending' && <Loader />}
      {status === 'resolved' && isLoadBtnShown && (
        <TextButton onClick={onLoadMore} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  isLoadBtnShown: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })
  ).isRequired,
};
