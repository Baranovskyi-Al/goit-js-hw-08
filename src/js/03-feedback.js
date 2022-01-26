import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const inputElement = document.querySelector('input[name=email]');
const textAreaElement = document.querySelector('textarea[name=message]');

// console.log(formElement);
// console.log(inputElement);
// console.log(textAreaElement);

formElement.addEventListener('input', throttle(dataInLocalStoradge, 500));
formElement.addEventListener('submit', onSubmitClick);

// Проверяем хранилище на наличие данных

const savedData = localStorage.getItem('feedback-form-state');
const parsedData = JSON.parse(savedData);

if (parsedData) {
  inputElement.value = parsedData.email;
  textAreaElement.value = parsedData.message;
}

console.log(localStorage);

// Пишем в хранилище

function dataInLocalStoradge(event) {
  const email = inputElement.value;
  const message = textAreaElement.value;
  localStorage.setItem('feedback-form-state', JSON.stringify({ email, message }));
}

function onSubmitClick(event) {
  event.preventDefault();
  const email = event.currentTarget.elements.email.value;
  const message = event.currentTarget.elements.message.value;

  // Алерт если пустые поля

  if (!email || !message) {
    return alert('Заполни все поля!');
  }

  // Выводим в консоль
  const objectData = {
    message,
    email,
  };
  console.log(objectData);

  // Очищаем поля и хранилище
  localStorage.removeItem('feedback-form-state');
  formElement.reset();
}
