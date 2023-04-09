import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnail-photos.js';

const pictures = getPictures();
renderThumbnails(pictures);
