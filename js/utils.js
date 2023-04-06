const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};
const getRandomArrayElement = (array) =>array[getRandomInteger(0, array.length - 1)];

const createIdGenerator = () =>{
  let lastGenerateId = 0;

  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';//проверяю событие на нажатие esc

export {getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey};
