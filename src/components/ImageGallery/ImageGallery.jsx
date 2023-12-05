import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            data={image}
            onModal={this.props.onModal}
            isModalOpen={this.props.isModalOpen}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
