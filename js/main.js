import {renderThumbnails, setThumbnailClickHandler} from './thumbnail-photos.js';
import { prepareUploadForm,onFormSubmit, hideFormLoadImg} from './validate-form.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import {showBigPicture} from './big-picture.js';
import {showFilters, setFilterChange} from './filter.js';


getData()
  .then((photos) => {
    const onThumbnailClick = (photoId) => {
      const photo = photos.find(({id}) => id === photoId);

      showBigPicture(photo);
    };

    renderThumbnails(photos);
    setThumbnailClickHandler(onThumbnailClick);
    setFilterChange(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

prepareUploadForm();
showFilters();

