const startChangeColorBtnEl = document.querySelector('button[data-start]');
const stopChangeColorBtnEl = document.querySelector('button[data-stop]');

const PROMT_DELAY = 1000;
let intervalId = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const handleBtnStartChangeColorClick = () => {
  intervalId = setInterval(() => {
    const hexColor = getRandomHexColor();
    document.body.style.backgroundColor = hexColor;
    startChangeColorBtnEl.setAttribute('disabled', '');
    stopChangeColorBtnEl.removeAttribute('disabled');
    // startChangeColorBtnEl.classList.add('disabled');
    // stopChangeColorBtnEl.classList.remove('disabled');
  }, 1000);
};

const handleBtnStopChangeColorClick = () => {
  clearInterval(intervalId);
  stopChangeColorBtnEl.setAttribute('disabled', '');
  startChangeColorBtnEl.removeAttribute('disabled');
  //  stopChangeColorBtnEl.classList.add('disabled');
  //  startChangeColorBtnEl.classList.remove('disabled');
};

startChangeColorBtnEl.addEventListener('click', handleBtnStartChangeColorClick);
stopChangeColorBtnEl.addEventListener('click', handleBtnStopChangeColorClick);

stopChangeColorBtnEl.setAttribute('disabled', '');
// stopChangeColorBtnEl.classList.add('disabled');
