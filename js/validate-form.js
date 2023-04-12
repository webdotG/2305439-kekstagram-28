import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {sendData} from './api.js';
import {openSuccessModal, openErrorModal} from './upload-message.js';
import {getTypeMessage} from './upload-message.js';

const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;//регуляроное выражение для проверки символов
const MAX_HASHTAG_COUNT = 5;
const TAG_ERROR_TEXT = 'теги надо переписать правильно';
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

//инициализирую/подключаю пристин
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',//элемент на который будут вешаться о правильно или не правильно заполненых полях
  errorTextParent: 'img-upload__field-wrapper',//элемент куда будет выводиться текст ошибки
  errorTextClass: 'img-upload__field-wrapper__error',//класс для стилизации вывода ошибки

});

//должна отменять поведение закрытия окна редактора если поле тегов или поле коментов в фокусе
const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;
//эктив элемент показывает какой элемент сейчас в фокусе если это инпут загрузки фото или поле ввода коментария;

//функция показа модалки редоктирования и описания фото
const showFormLoadImg = () => {
  overlay.classList.remove('hidden');//показываю окно редактирования фото удаляя класс
  body.classList.add('modal-open');//добавляю класс который отвечает за скролл боди при открытом окне
  document.addEventListener('keydown', onDocumentKeydown);//вешаю на документ отлов на нажптие клавиши в данном слкчае проверку на esc
};

//функция закрытия модалки редоктирования и описания фото
const hideFormLoadImg = () => {
  form.reset();//затираю данные формы при закрытии модалки
  resetScale();//сбрасываю настройки зума
  resetEffects();//сбрасываю настройки эфектов
  pristine.reset();//сбрасыва ощибки и сам пристин
  overlay.classList.add('hidden');//прячу модалку редактирования изоброжений
  body.classList.remove('modal-open');//снимаю класс отвечающий за скрол
  document.removeEventListener('keydown', onDocumentKeydown);//снимаю обработчик
};

//проверяет если событие нажатие клавиши = esc и поля НЕ в фокусе то прячу модалку редактора
function onDocumentKeydown (evt) {//отловлиаю событие на документе
  if (evt.key === 'Escape' && !isTextFieldFocused() && !getTypeMessage()) {//проверяю условие если событие это нажатие кнопки esc и если одно из полей ввода не в фокусе
    evt.preventDefault();//убрать дефолтное поведение
    hideFormLoadImg();//вызвать функцию скрытьмодал
  }
}


//функция при нажатии cancel бтн
const onCancelButtonClick = () => {
  hideFormLoadImg();//прячу окно редактирования со всеми вытекающими
};

//функция при изменении состояния инпута файла
const onFileInputChange = () => {
  showFormLoadImg();//показываю окно редактирования изображения
};

//проверка на вводимые символы
const isValidTag = (tag) => VALID_SIMBOLS.test(tag);//проверяю каждый тег с помощью регулярного выражения

//проверка на количество ввожимых тегов
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;//проверяю массив хэштегов на разрешенную длину

//функция для проверки уникальности тегов
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());//иду по массиву тэгс выдёрниваю от туда каждый тег и сосздаю новый массив приведенный к нижнему регистру
  return lowerCaseTags.length === new Set(lowerCaseTags).size;//сэт проверяет на уникальность введённых тегов убирает повторяющиеся и свойством сайз возвращает число не уникальных тегов
  //если длина массиа приведенных к нижнему регистру тегов ровна размеру уникальныз тегов после удаления повторяющихся то вернёт все введённве теги
};

//функция для валидации
const validateTags = (value) => {//валью передайт сама пристин это её встроенный первый параметр
  const tags = value//в массиве тэгс копятся хэштеги
    .trim()//обрезаю если есть лищние пробелы в начале или в конце
    .split(' ')//соединяю теги пустой строкой- ставлю пробелы между тегами
    .filter((tag) => tag.trim().length);//прохожу по всему массиву и ещй раз оьрезаю что бы избавиться от лишних случайных пробелов после того как пробелы удалятся тримом и если он будет иметь зоть какуюто длину это не пустая строка то вернет тру
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);//передаю массив тэг в три функции проверки
};//     проверка на длину      на уникальность        прохожу по массиву тэгс и вызываю для каждого элемента функцию


//добавляю валидатор методом встроеным в пристин
pristine.addValidator(
  hashtagField,//поле валидации
  validateTags,//функция которая будет валидировать
  TAG_ERROR_TEXT//текст ошибки в данном проекте выводится для всех ошибок
);


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


//функция валидацию формы при отправке
const onFormSubmit = (evt) => {
  pristine.validate();

  // ! проверка если валидная форма то получаю данные с сервера
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        openSuccessModal();
        hideFormLoadImg();
      })
      .catch(() => {
        openErrorModal();
      })
      .finally(unblockSubmitButton);
  }
};

const prepareUploadForm = () => {
  fileField.addEventListener('change', onFileInputChange);//проверяю событие на изменение "состояния" инпута
  cancelButton.addEventListener('click', onCancelButtonClick);//отлавливаю клик по кнопке отменить и закрываю модалку сбрасывая настройки
  form.addEventListener('submit', onFormSubmit);//отлавливаю событие отправки
  onDocumentKeydown();
};

export {prepareUploadForm, onFormSubmit, hideFormLoadImg};
