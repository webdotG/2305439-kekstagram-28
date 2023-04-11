const SCALE_STEP = 25;//один шаг равен 25
const MIN_SCALE = 25;//минимальное значение зума
const MAX_SCALE = 100;//максимальное значение зума
const DEFAULT_SCALE = 100;//дефолтный размер

const smallerButtonElement = document.querySelector('.scale__control--smaller');//нахожу кнопку уменьщения размера
const biggerButtonElement = document.querySelector('.scale__control--bigger');//нахожу кнопку увеличения размера
const scaleInputElement = document.querySelector('.scale__control--value');//нахожу инпут показывающий значение нынешнего размера
const imageElement = document.querySelector('.img-upload__preview img');//нахожу картинку из блока предварительного просмотра

//функция изменения размера фото
const scaleImage = (value) => {//принимает в сеья какое-то значение
  imageElement.style.transform = `scale(${value / 100})`;//так как свойство стайл трансформ в css ситается от 0 до 1 то нужно получить процент от некого значения и передать его свойству css
  scaleInputElement.value = `${value}%`;//дом элементу в значение взлью передаю передаю результат вычислений и знак процента
};

//функция уеньщения фото при нажатии
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);//перевожу строку в число
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

//функция увелечения картинки при нажатии
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);//
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

//функция перкдает картинке некие дефолтные парамеиры
const resetScale = () =>scaleImage(DEFAULT_SCALE);

//отлавливаю событие на элементе и включаю функцию кноаки уменьшения
smallerButtonElement.addEventListener('click', onSmallerButtonClick);
//отлавливаю событие на элементе и включаю функцию кноаки увелечения
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};//экспортиру функцыию

