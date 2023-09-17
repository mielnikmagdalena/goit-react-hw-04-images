import React, { Component } from 'react';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem.jsx';
import styles from './ImageGallery.module.css'; // Importuj moduł CSS

class ImageGallery extends Component {
  render() {
    return (
      <div>
        <ul className={styles.ImageGallery}>
          {this.props.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={this.props.onImageClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;
