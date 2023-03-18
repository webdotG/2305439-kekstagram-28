/*

 */
let someObj = {
  id: 1 ,
  url: 'photos/{{случайное число от 1 до 25}}.jpg',
  description: 'someDescription',
  likes: 15,
  comments: [
    {
      id: 1 ,
      name: 'someName',
      avatar: 'img/avatar-{{случайное число от 1 до 6}}.svg ',
      message: 'Всё отлично!',
    },
  ]
};
//проверка обьекта
console.log('проверка обьекта', someObj);
//проверка ключа обьекта
console.log('проверка ключа обьекта', someObj['id']);
//проверка массива внутри обьекта
console.log('проверка массива внутри обьекта', someObj.comments);
//проверка значения второго эдемента массива внутри обьекта
console.log('проверка значения первого эдемента массива внутри обьекта', someObj.comments[0].id);

//фуекция для создания обьекта
const createUserId = function () {
  return {
    id: 0 ,
    url: '',
    description: '',
    likes: 0,
    comments: [
      {
        id: 0,
        name: '',
        avatar: '',
        message: '',
      },
    ]
  };
};
console.log('проверка функции создания обьекта юзер',createUserId());

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
console.log('получение рандомного числа', getRandomInteger(1, 25));

