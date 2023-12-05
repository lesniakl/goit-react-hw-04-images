import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';
import { useFinder } from 'hooks/useFinder';

export default function ImageGallery() {
  const { images } = useFinder();

  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} data={image} />
      ))}
    </ul>
  );
}
