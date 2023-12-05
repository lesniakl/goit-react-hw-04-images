export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = 'https://pixabay.com/api/';
export const getPhotosLink = (search, page) => {
  return `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
};
