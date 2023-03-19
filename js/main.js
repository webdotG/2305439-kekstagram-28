function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
console.log('рандомное число ', getRandomInteger(1, 25));

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
console.log('рандомное число generatePhotoId ', generatePhotoId());
const generateUrlId = createRandomIdFromRangeGenerator(1, 25);
console.log('рандомное число generateUrlId ', generateUrlId());
const generateLikes = createRandomIdFromRangeGenerator(15, 200);
console.log('рандомное число generateLikes ', generateLikes());
const generateCommentsAvatar = getRandomInteger(1, 6);
console.log('рандомное число generateCommentsAvatar ', generateCommentsAvatar);
const message = ['Всё отлично!', 'Всё Не отлично!'];
console.log('коментарии :', message);
const photoIdObj = {
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,//??? почему тут скобки ${generateUrlId()}
  description: 'someDescription',
  likes: generateLikes(),
  comments : {
    id: 0,
    avatar: `img/avatar-${generateCommentsAvatar}.svg`,//??? а тут нет ${generateCommentsAvatar}
  },
};
console.log(photoIdObj);
console.log(photoIdObj.comments.id);
