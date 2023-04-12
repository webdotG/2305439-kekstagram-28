import { debounce } from './utils.js';
import { sortRandomly, sortByComments, removeElement } from './utils.js';
import { renderThumbnails } from './thumbnail-photos.js';

const RANDOM_PICTURES_COUNT = 10;
const RENDER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterDefault = filtersContainer.querySelector('#filter-default');
const filterRandom = filtersContainer.querySelector('#filter-random');
const filterDiscussed = filtersContainer.querySelector('#filter-discussed');

let currentFilter = filterDefault;

const showFilters = () => filtersContainer.classList.remove('img-filters--inactive');

const getFilteredPhoto = (photos) => {
  switch(currentFilter) {
    case filterDefault:
      return photos;
    case filterRandom:
      return photos.slice().sort(sortRandomly).slice(0, RANDOM_PICTURES_COUNT);
    case filterDiscussed:
      return photos.slice().sort(sortByComments);
    default:
      return photos.slice();
  }
};

const changeFilter = (evt, photos) => {
  document.querySelectorAll('.picture').forEach(removeElement);

  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = evt.target;
  currentFilter.classList.add('img-filters__button--active');

  renderThumbnails(getFilteredPhoto(photos));
};

const setFilterChange = (photos) => {
  filtersContainer.addEventListener('click', debounce((evt) => {
    changeFilter(evt, photos);
  }, RENDER_DELAY));
};

export { showFilters, setFilterChange };
