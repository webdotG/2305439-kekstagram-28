const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECTS = EFFECTS[0];//заношу в переменную дефолтные настройки
let chosenEffect = DEFAULT_EFFECTS;//переменная показывающая выбранный эфект первичные настройки равны дефолтным

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECTS;

//функция показывающая слайдер
const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

//функция прячущая слайдер
const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};


//функция оброботчик
const onEffectsChange = (evt) => {//вешаю обработчик на весь контейнер с эфектами и передаю параметром какое-то действие
  if (!evt.target.classList.contains('effects__radio')) {//
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);//в массиве ефектс ищу обьект имя которого равно вэлью выьранного эфекта и заношу обьект в переменную выбранного эфекта
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? DEFAULT_EFFECTS.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECTS;
  updateSlider();
};

//создаю слайдер
window.noUiSlider.create(sliderElement, {//аргументом выступает элемент которому надо передать параметры слайдера
  range: {
    min: DEFAULT_EFFECTS.min,//передаю значение позиции слайдера по дефолту
    max: DEFAULT_EFFECTS.max,//передаю значение позиции слайдера по дефолту
  },
  start: DEFAULT_EFFECTS.max,//передаю значение шага слайдера
  step: DEFAULT_EFFECTS.step,//передаю значение шага слайдера
  connect: 'lower',
});

hideSlider();//по дефолту прячу слайдер

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);


export {resetEffects};//экспортирую для скрытия модалки
