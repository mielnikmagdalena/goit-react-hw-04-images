import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Button from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    const apiKey = '38179044-0b179ee03efa6bc6d9a5998f4';
    const perPage = 12;
    const baseUrl = 'https://pixabay.com/api/';

    const url = `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    setLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newImages = data.hits;
        setImages(prevImages => [...prevImages, ...newImages]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
        setLoading(false);
      });
  }, [query, page]);

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <ImageGallery
          images={images}
          onImageClick={handleImageClick}
          onLoadMore={handleLoadMore}
        />
      )}
      {selectedImage && (
        <Modal
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          onClose={closeModal}
        />
      )}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
    </div>
  );
};
