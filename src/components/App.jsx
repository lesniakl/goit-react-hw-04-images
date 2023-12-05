import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { useFinder } from 'hooks/useFinder';

export default function App() {
  const { isOpen, isLoading, images } = useFinder();

  return (
    <div className={css.App}>
      {isOpen && <Modal />}
      <Searchbar />
      <ImageGallery />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button />}
    </div>
  );
}
