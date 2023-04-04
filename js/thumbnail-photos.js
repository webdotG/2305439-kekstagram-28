import {showBigPicture} from './big-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (picture) => {
  //создаю переменную для создания одной миниатюры в неё клонирую содержимое template
  const thumbnail = thumbnailTemplate.cloneNode(true);

  //подставляю значения из обьекта в шаблон template
  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__img').alt = picture.description;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;

  thumbnail.addEventListener('click', () => {
    showBigPicture(picture);
  });

  return thumbnail;
};

const renderThumbnails = (pictures) => {

  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export {renderThumbnails};

