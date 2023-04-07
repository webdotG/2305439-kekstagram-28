
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;//регуляроное выражение для проверки символов
const MAX_HASHTAG_COUNT = 5;
const TAG_ERROR_TEXT = 'теги надо переписать правильно';
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');

//инициализирую/подключаю пристин
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',//элемент на который будут вешаться о правильно или не правильно заполненых полях
  errorTextParent: 'img-upload__field-wrapper',//элемент куда будет выводиться текст ошибки
  errorTextClass: 'img-upload__field-wrapper__error',//класс для стилизации вывода ошибки
});

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
const validateTags = (value) => {//валью передайт сама пристин
  const tags = value//в массиве тэгс копятся хэштеги
    .trim()//обрезаю если есть лищние пробелы в начале или в конце
    .split(' ')//разделяю пробелом хэштеги
    .filter((tag) => tag.trim().length);//прохожу по всему массиву и ещй раз оьрезаю что бы избавиться от лишних случайных пробелов после того как пробелы удалятся тримом и если он будет иметь зоть какуюто длину это не пустая строка то вернет тру
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);//передаю массив тэг в три функции проверки
};//     проверка на длину      на уникальность        прохожу по массиву тэгс и вызываю для каждого элемента функцию

//добавляю валидатор методом встроеным в пристин
pristine.addValidator(
  hashtagField,//поле валидации
  validateTags(),//функция которая будет валидировать
  TAG_ERROR_TEXT//текст ошибки в данном проекте выводится для всех ошибок
);

//включаю валидацию формы при отправке
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
