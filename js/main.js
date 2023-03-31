import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnaili-photos.js';

const pictures = getPictures();
renderThumbnails(pictures);
