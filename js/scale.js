
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

//
const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;//получаю нужный процент
  scaleInputElement.value = `${value}%`;
};

//
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);//перевожу строку в число
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

//
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

//
const resetScale = () =>scaleImage(DEFAULT_SCALE);

//
smallerButtonElement.addEventListener('click', onSmallerButtonClick);
//
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};

