import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnail-photos.js';
import {prepareUploadForm} from './validate-form.js';

const pictures = getPictures();
renderThumbnails(pictures);
prepareUploadForm();
