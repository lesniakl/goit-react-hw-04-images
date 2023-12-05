import React from 'react';
import css from './Searchbar.module.css';
import { useFinder } from 'hooks/useFinder';

export default function Searchbar() {
  const { getSearch, getData, addImages, setPage } = useFinder();

  const handleSubmit = async e => {
    e.preventDefault();
    const search = getSearch(e.currentTarget);
    const imagesFound = await getData(search, 1);
    setPage(1);
    addImages(imagesFound, false);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

// Searchbar.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };
