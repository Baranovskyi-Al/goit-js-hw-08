import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const inputElement = document.querySelector('input[name=email]');
const textAreaElement = document.querySelector('textarea[name=message]');

// console.log(formElement);
// console.log(inputElement);
// console.log(textAreaElement);

formElement.addEventListener('input', throttle(local, 500));
formElement.addEventListener('submit', onSubmit);

const savedData = localStorage.getItem('feedback-form-state');
const parsedData = JSON.parse(savedData);

if (parsedData) {
  inputElement.value = parsedData.email;
  textAreaElement.value = parsedData.message;
}

function local(event) {
  const email = inputElement.value;
  const message = textAreaElement.value;
  localStorage.setItem('feedback-form-state', JSON.stringify({ email, message }));
}

function onSubmit(event) {
  event.preventDefault();
  const email = event.currentTarget.elements.email.value;
  const message = event.currentTarget.elements.message.value;
  if (!message || !email) {
    return alert('Заполни все поля!');
  }
  const objectData = {
    message,
    email,
  };
  console.log(objectData);
  localStorage.removeItem('feedback-form-state');
  formElement.reset();
}
