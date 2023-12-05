import React from 'react';
import css from './Button.module.css';
import { useFinder } from 'hooks/useFinder';

export default function Button() {
  const { currentPage, setPage, getData, getSearch, addImages } = useFinder();

  const handleMore = async e => {
    const newPage = currentPage + 1;
    const search = getSearch();
    const imagesFound = await getData(search, newPage);
    setPage(newPage);
    addImages(imagesFound, true);
  };

  return (
    <button type="button" className={css.Button} onClick={handleMore}>
      Load more
    </button>
  );
}
