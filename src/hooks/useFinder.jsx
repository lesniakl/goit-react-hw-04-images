import { getPhotosLink } from 'consts/pixabay';
import PropTypes from 'prop-types';

const { createContext, useContext, useState } = require('react');

const FinderContext = createContext();

export const useFinder = () => useContext(FinderContext);

export const FinderProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentSearch, setSearch] = useState('');
  const [currentPage, setPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const addImages = (newImages, addMore) => {
    if (addMore) {
      setImages([...images, ...newImages]);
      return;
    }
    setImages([...newImages]);
  };

  const toggleModal = e => {
    if (selected.url) {
      setOpen(!isOpen);
      setSelected({});
      return;
    }
    const targetURL = e.target.dataset.large;
    const targetALT = e.target.alt;
    setOpen(!isOpen);
    setSelected({ url: targetURL, alt: targetALT });
  };

  const getSearch = target => {
    if (!target) {
      return currentSearch;
    }
    const search = target.elements.search.value;
    setSearch(search);
    return search;
  };

  const getData = async (search, page) => {
    const query = getPhotosLink(search, page);
    setLoading(true);
    try {
      const response = await fetch(query);
      const data = await response.json();
      const imagesFound = data.hits.map(hit => ({
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
      }));
      return [...imagesFound];
    } catch (error) {
      alert(`Something went wrong, try again or reload the page.`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <FinderContext.Provider
      value={{
        images,
        isLoading,
        currentPage,
        setPage,
        isOpen,
        selected,
        toggleModal,
        addImages,
        getSearch,
        getData,
      }}
    >
      {children}
    </FinderContext.Provider>
  );
};

FinderContext.Provider.propTypes = {
  value: PropTypes.shape({
    images: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    selected: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    getSearch: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
  }),
};
