import React, { Component } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getPhotosLink } from 'consts/pixabay';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    currentPage: 1,
    modalOpen: false,
    selected: {},
  };

  handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const search = form.elements.search.value;
    const query = getPhotosLink(search, 1);
    this.setState({ currentPage: 1, currentSearch: search, isLoading: true });
    try {
      const response = await fetch(query);
      const data = await response.json();
      const imagesFound = data.hits.map(hit => ({
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
      }));
      this.setState({ images: imagesFound });
    } catch (error) {
      alert('Something went wrong, try again or reload the page.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleMore = async e => {
    const newPage = this.state.currentPage + 1;
    const query = getPhotosLink(this.state.currentSearch, newPage);
    this.setState({ isLoading: true, currentPage: newPage });
    try {
      const response = await fetch(query);
      const data = await response.json();
      const imagesFound = data.hits.map(hit => ({
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
      }));
      this.setState(prevState => {
        return { images: [...prevState.images, ...imagesFound] };
      });
    } catch (error) {
      alert('Something went wrong, try again or reload the page.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleModal = e => {
    if (!this.state.selected.url) {
      const targetURL = e.target.dataset.large;
      const targetALT = e.target.alt;
      this.setState(prevState => {
        return {
          modalOpen: !prevState.modalOpen,
          selected: { url: targetURL, alt: targetALT },
        };
      });
      return;
    }
    this.setState(prevState => {
      return {
        modalOpen: !prevState.modalOpen,
        selected: {},
      };
    });
  };

  render() {
    return (
      <div className={css.App}>
        {this.state.modalOpen && (
          <Modal
            url={this.state.selected.url}
            alt={this.state.selected.alt}
            onModal={this.handleModal}
          />
        )}
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery
          images={this.state.images}
          onModal={this.handleModal}
          isModalOpen={this.state.modalOpen}
        />
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && !this.state.isLoading && (
          <Button onMore={this.handleMore} />
        )}
      </div>
    );
  }
}
