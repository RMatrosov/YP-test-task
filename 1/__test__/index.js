/*
 Изначально я бы проверил правильность выполнения задания.
 Если в условии задания нужно проверить только задана ли высота блока,
 то ее я бы и проверил, но если в условии имеются и другие пункты то их проверка
 являлась бы обязательной.
 Так же я посчитал нужным проверку на наличие самого блока и правильность заданных параметров.
 Прекрасно понимая то, что изучающий программирование человек в самом начале своего пути
 при работе с тренажером способен допустить любую ошибку.
 При проверке кода я бы следовал закону Мерфи: "Если что-нибудь может пойти не так, оно пойдёт не так".
 Но касательно данной работы я бы проверил:
 1) Значение свойства height у элемента div.
 2) Имеется ли свойства height у элемента div.
 3) Имеется ли класс content у элемента div.
 4) Значение свойства width у элемента div.
 5) Значение свойства background-color у элемента div.
*/

const errors = [];

const content = document.querySelector('.content');
const body = document.querySelector('body');

if (content === null) {
  errors.push({error: 'отсутствует класс content у элемента div'})
} else {
  const contentWidth = parseInt(getComputedStyle(content)
      .width.replace(/[a-zа-яё]/gi, ''));
  const bodyWidth = parseInt(getComputedStyle(body)
      .width.replace(/[a-zа-яё]/gi, ''));
  const contentColor = getComputedStyle(content).getPropertyValue('background-color')
  const windowHeight = window.innerHeight;
  const contentHeight = parseInt(getComputedStyle(content)
      .height.replace(/[a-zа-яё]/gi, ''));

  if (contentHeight === 0) {
    errors.push({error: 'ошибка! не задано свойство height'})
  } else if (contentHeight !== windowHeight) {
    errors.push({error: 'Неправильное значение свойства height у элемента div'})
  }
  if (contentColor !== 'rgb(0, 0, 0)') {
    errors.push({error: 'ошибка! цвет не соответствует заданию'})
  }
  if (contentWidth !== bodyWidth) {
    errors.push({error: 'Неправильное значение свойства width у элемента div'})
  }
}


console.log(errors);
