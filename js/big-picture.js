import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture'); //нахожу блок для отображения большой фотки
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');//нахожу блок c шаблоном коментария и в его контенте нахожу блок с коментом
const PARTITION_SIZE = 5;//сколько еще загружать показывать комментариев
const showMoreCommentsButton = document.querySelector('.social__comments-loader');//кнопка показать ещё
const socialCommentsElement = document.querySelector('.social__comments');//создаю дом элемент нахожу шаблон по селектору
const socialCommentCount = document.querySelector('.social__comment-count');//сколько сейчас показано комментариев из списка
const closeBigPictureButton = document.querySelector('.big-picture__cancel');//нашёл кнопку для закрытия бигпикч
const totalCommentsCountElement = socialCommentCount.querySelector('.total-comments-count');
const shownCommentsCountElement = socialCommentCount.querySelector('.shown-comments-count');

//функция для закрытия полноэкранного изображения через esc
const onDocumentKeydown = (evt) => {//отловлиаю событие на документе
  if (isEscapeKey(evt)) {//проверяю условие если событие это нажатие кнопки esc то
    evt.preventDefault();//убрать дефолтное поведение
    closeBigPicture();//вызвать функцию клоз бигпикчер
  }
};

//функция для создания комментария
const createCommentElement = (comment) => {//создаю функцию для создания коментариев аргументом передаю параметр комент взятый
  const commentElement = commentTemplateElement.cloneNode(true);//создаю дом элемент клонируя всё содиржимое из шаблона
  commentElement.querySelector('.social__picture').src = comment.avatar;//в элемнте нахожу селектор и присваеваю его src новое значение обьекта комент по ключу аватар
  commentElement.querySelector('.social__picture').alt = comment.name;//в элемнте нахожу селектор и присваеваю его alt новое значение обьекта комент по ключу name
  commentElement.querySelector('.social__text').textContent = comment.message;//в элемнте нахожу селектор и меняю его содержимое строки на значение обьекта комент по ключу message
  return commentElement;//возвращаю commentElement с результатом его работы
};

//функция для показа комментов
const showComments = (comments) => {//функция для показа комментов
  socialCommentsElement.innerHTML = '';//обнуляю кго содердимое
  const totalCommentsCount = comments.length;//показывает общее число коментариев
  if (totalCommentsCount === 0) {//если общее число коментов равно 0
    socialCommentCount.classList.add('hidden');//прячу счётчик
    showMoreCommentsButton.classList.add('hidden');//прячу кнопку показать коменты
  } else {
    socialCommentCount.classList.remove('hidden');//показываю счетчик коментов
    showMoreCommentsButton.classList.remove('hidden');//показываю кнопку для загрузеи коментов

    totalCommentsCountElement.textContent = totalCommentsCount;//в блоке бигпикчер нахожу селектор счётчик коментов и меняю его контент на число длину массива коментариев
    let shownComments = 0;//счетчик показаных комментариев

    //функция для показа комментов по очереди
    const showCommentsPartition = () => {
      const commentsForShow = comments.slice(shownComments, shownComments + PARTITION_SIZE);//вырезаю из массиваначало показанныч коментов и конец массива показанные +5 в итоге остаются как раз 5 которые показываются
      shownComments += commentsForShow.length;//счетчик сколько всего коментов
      shownCommentsCountElement.textContent = shownComments;//вставляю в счетчик цифру показаных коментов
      //создаю фрагмент
      const fragment = document.createDocumentFragment();//создаю контейнер фрагмент
      commentsForShow.forEach((comment) => {//иду по массиву из уже 5и вырезанных коментариев на каждой итерации получаю один обьект коментария(comment)
        const commentElement = createCommentElement(comment);//в переменную засовыаю созданный дом элемент фцнкцией криейт которя запускается запускается пять раз так как мы передали туда 5 вырезанных коментов
        fragment.append(commentElement);//вставляю в фрагмент елементы
      });
      //посылаю а лист коментариев фрагмент
      socialCommentsElement.append(fragment);//вставляю в лист коментов фрагмент с дом элеметами
      if (shownComments >= totalCommentsCount) {//если показанные комменты больше или равны массиву всех коментариев то
        showMoreCommentsButton.classList.add('hidden');//прячу кнопку показать коментарии
        showMoreCommentsButton.removeEventListener('click', showCommentsPartition);//удаляю обработчик клика и вызова функции показа порционно
      }
    };

    //обработчик на клик по кнопке и запуск функции по показу порционно
    showMoreCommentsButton.addEventListener('click', showCommentsPartition);
    showCommentsPartition();
  }
};

//функция для просмотра полноэкранного изображения
const showBigPicture = (picture) => {//
  bigPicture.querySelector('.big-picture__img img').src = picture.url;//подставляю в бигпикч имг данные из обьекта пикчер
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;//подставляю в бигпикч имг данные из обьекта пикчер
  bigPicture.querySelector('.likes-count').textContent = picture.likes;////подставляю в счетчик лайков строку из обьекта пикчер по ключу лайк
  document.body.classList.add('modal-open');//что бы фон не скролился
  showComments(picture.comments);//вызываю функцию и передаю ей аргумент из обьекта пикчер по ключу коментс
  bigPicture.classList.remove('hidden');//удалить у бигпикчи класс хиден
  document.addEventListener('keydown', onDocumentKeydown);//добавить событие кейдаун
};

//функция для закрытия полноэкранного изображения
function closeBigPicture() {//описываю поведение функции по закрытию бигпикчи
  bigPicture.classList.add('hidden');//добавить бигпикчи класс хиден
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);//удалить событие кейдаун
}

//отлов события для закрытия полноэкранного изображения
closeBigPictureButton.addEventListener('click', () => {//
  closeBigPicture();
});

export {showBigPicture};
