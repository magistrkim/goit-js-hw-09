import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElement = document.querySelector('.form');
const delayElement = document.querySelector('input[name="delay"]');
const stepElement = document.querySelector('input[name="step"]');
const amountElement = document.querySelector('input[name="amount"]');
const createButtonEl = document.querySelector('button');

const getFormValues = () => {
  const firstDelayValue = Number(delayElement.value);
  const stepValue = Number(stepElement.value);
  const amountValue = Number(amountElement.value);
  return { firstDelayValue, stepValue, amountValue };
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const handleSubmitBtnClick = event => {
  event.preventDefault();
  const { firstDelayValue, stepValue, amountValue } = getFormValues();
  createButtonEl.setAttribute('disabled', '');

  let promiseArray = [];
  for (let i = 0; i < amountValue; i += 1) {
    const delay = firstDelayValue + stepValue * i;
    promiseArray = promiseArray.concat(createPromise(i, delay));
  }

  promiseArray.forEach(promise => {
    promise
      .then(data => {
        Notify.success(
          `✅ Fulfilled promise ${data.position} in ${data.delay}ms`
        );
      })
      .catch(data => {
        Notify.failure(
          `❌ Rejected promise ${data.position} in ${data.delay}ms`
        );
      });
  });
};

let warningDisplayed = false;

const handleInputChange = () => {
  const { firstDelayValue, stepValue, amountValue } = getFormValues();
  if (firstDelayValue < 0 || stepValue < 0 || amountValue < 0) {
    if (!warningDisplayed) {
      createButtonEl.setAttribute('disabled', '');
      Notify.warning('Please choose valid value!');
      warningDisplayed = true;
    }
  } else {
    createButtonEl.removeAttribute('disabled');
    warningDisplayed = false;
  }
};

formElement.addEventListener('submit', handleSubmitBtnClick);
delayElement.addEventListener('input', handleInputChange);
stepElement.addEventListener('input', handleInputChange);
amountElement.addEventListener('input', handleInputChange);
