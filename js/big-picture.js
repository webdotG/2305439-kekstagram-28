/*
- надо найти блок который отвечает за показ большой фотографии;
- взяьть/найти заготовленный template;
- создать функцию которая будет менять/подставлять значения из template на сгенерированные нами,
- так как работы с комментариями дохуя, то вынесем их в отдельные функции
- функция по созданию комментариев которая принимант аргументом для работы
 */
import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture'); //нахожу блок для отображения большой фотки
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');//нахожу блок c шаблоном коментария и в его контенте нахожу блок с коментом

const createCommentElement = (comment) => {//создаю функцию для создания коментариев аргументом передаю параметр комент взятый из фнкции криейт пикчер

  const commentElement = commentTemplateElement.cloneNode(true);//создаю дом элемент клонируя всё содиржимое из шаблона
  commentElement.querySelector('.social__picture').src = comment.avatar;//в элемнте нахожу селектор и присваеваю его src новое значение обьекта комент по ключу аватар
  commentElement.querySelector('.social__picture').alt = comment.name;//в элемнте нахожу селектор и присваеваю его alt новое значение обьекта комент по ключу name
  commentElement.querySelector('.social__text').textContent = comment.message;//в элемнте нахожу селектор и меняю его содержимое строки на значение обьекта комент по ключу message
  return commentElement;//возвращаю commentElement с результатом его работы
};

const showComments = (comments) => {//функция для показа комментов
  bigPicture.querySelector('.comments-count').textContent = comments.length;//в блоке бигпикчер нахожу селектор счётчик коментов и меняю его контент на число длину массива коментариев

  const socialCommentsElement = document.querySelector('.social__comments');//создаю дом элемент нахожу шаблон по селектору
  socialCommentsElement.innerHTML = '';//
  const fragment = document.createDocumentFragment();//
  comments.forEach((comment) => {//
    const commentElement = createCommentElement(comment);//
    fragment.append(commentElement);//
  });
  socialCommentsElement.append(fragment);//
};

const commentsLoader = document.querySelector('.comments-loader');//
const commentCount = document.querySelector('.social__comment-count');//
const closeBigPictureButton = document.querySelector('.big-picture__cancel');//нашёл кнопку для закрытия бигпикчер

const onDocumentKeydown = (evt) => {//отловлиаю событие на документе
  if (isEscapeKey(evt)) {//проверяю условие если событие это нажатие кнопки esc то
    evt.preventDefault();//убрать дефолтное поведение
    closeBigPicture();//вызвать функцию клоз бигпикчер
  }
};

const showBigPicture = (picture) => {//
  bigPicture.querySelector('.big-picture__img img').src = picture.url;//
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;//
  bigPicture.querySelector('.likes-count').textContent = picture.likes;//
  document.body.classList.add('modal-open');//
  showComments(picture.comments);//
  commentsLoader.classList.add('hidden');//
  commentCount.classList.add('hidden');//
  bigPicture.classList.remove('hidden');//удалить у бигпикчи класс хиден
  document.addEventListener('keydown', onDocumentKeydown);//добавить событие кейдаун
};

function closeBigPicture () {//описываю поведение функции по закрытию бигпикчи
  bigPicture.classList.add('hidden');//добавить бигпикчи класс хиден
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);//удалить событие кейдаун
}

closeBigPictureButton.addEventListener('click', () => {//
  closeBigPicture();
});


export {showBigPicture};
