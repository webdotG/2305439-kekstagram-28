/*
- надо найти блок который отвечает за показ большой фотографии;
- взяьть/найти заготовленный template;
- создать функцию которая будет менять/подставлять значения из template на сгенерированные нами,
- так как работы с комментариями дохуя, то вынесем их в отдельные функции
- функция по созданию комментариев которая принимант аргументом для работы
 */
const bigPicture = document.querySelector('.big-picture'); //нахожу блок для отображения большой фотки
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');//нахожу блок c шаблоном коментария и в его контенте нахожу блок с коментом

const createCommentElement = (comment) => {//создаю функцию для создания коментариев аргументом передаю параметр комент взятый из фнкции криейт пикчер

  const commentElement = commentTemplateElement.cloneNode(true);//создаю дом элемент клонируя всё содиржимое из шаблона
  commentElement.querySelector('.social__picture').src = comment.avatar;//в элемнте нахожу селектор и присваеваю его src новое значение обьекта комент по ключу аватар
  commentElement.querySelector('.social__picture').alt = comment.name;//
  commentElement.querySelector('.social__text').textContent = comment.message;//
  return commentElement;//
};

const showComments = (comments) => {//
  bigPicture.querySelector('.comments-count').textContent = comments.length;//

  const socialCommentsElement = document.querySelector('.social__comments');//
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

const showBigPicture = (picture) => {//
  bigPicture.querySelector('.big-picture__img img').src = picture.url;//
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;//
  bigPicture.querySelector('.likes-count').textContent = picture.likes;//
  document.body.classList.add('modal-open');//
  showComments(picture.comments);//
  commentsLoader.classList.add('hidden');//
  commentCount.classList.add('hidden');//
  onBigPicture();
};

const closeBigPictureButton = document.querySelector('.big-picture__cancel');//нашёл кнопку для закрытия бигпикчер
const isEscapeKey = (evt) => evt.key === 'Escape';//проверяю событие на нажатие esc

const onDocumentKeydown = (evt) => {//отловлиаю событие на документе
  if (isEscapeKey(evt)) {//проверяю условие если событие это нажатие кнопки esc то
    evt.preventDefault();//убрать дефолтное поведение
    offBigPicture();//вызвать функцию клоз бигпикчер
  }
};

function onBigPicture () {//описываю поведение функции по открытии бигпикчи
  bigPicture.classList.remove('hidden');//удалить у бигпикчи класс хиден
  document.addEventListener('keydown', onDocumentKeydown);//добавить событие кейдаун
}

function offBigPicture () {//описываю поведение функции по закрытию бигпикчи
  bigPicture.classList.add('hidden');//добавить бигпикчи класс хиден
  document.removeEventListener('keydown', onDocumentKeydown);//удалить событие кейдаун
}

closeBigPictureButton.addEventListener('click', () => {//
  offBigPicture();
});


export {showBigPicture};//
