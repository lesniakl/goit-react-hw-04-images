import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useFinder } from 'hooks/useFinder';

export default function ImageGalleryItem({ data }) {
  const { toggleModal } = useFinder();

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={data.webformatURL}
        data-large={data.largeImageURL}
        alt={data.tags}
        className={css.ImageGalleryItemImage}
        onClick={toggleModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
};
