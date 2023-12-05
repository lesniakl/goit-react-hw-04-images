import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.props.onSearch}>
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
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
