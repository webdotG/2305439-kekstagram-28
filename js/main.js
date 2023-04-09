import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnail-photos.js';
import {showFormLoadImg, hideFormLoadImg} from './validate-form.js';

const pictures = getPictures();
renderThumbnails(pictures);
showFormLoadImg();
hideFormLoadImg();
