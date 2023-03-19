import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

const startTimerBtnEl = document.querySelector('button[data-start]');
const daysValueEL = document.querySelector('span[data-days]');
const hoursValueEL = document.querySelector('span[data-hours]');
const minutesValueEL = document.querySelector('span[data-minutes]');
const secondsValueEL = document.querySelector('span[data-seconds]');

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const updateTimerUI = ({ days, hours, minutes, seconds }) => {
  daysValueEL.textContent = addLeadingZero(days);
  hoursValueEL.textContent = addLeadingZero(hours);
  minutesValueEL.textContent = addLeadingZero(minutes);
  secondsValueEL.textContent = addLeadingZero(seconds);
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
};

let intervalId; // Declare intervalId once as a global variable

const handleStartBtnClick = chosenDate => {
  intervalId = setInterval(() => {
    const deltaTime = chosenDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimerUI({ days, hours, minutes, seconds });
    if (deltaTime < 1) {
      clearInterval(intervalId);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notify.info('Blue and yellow in my heart forever');
      Notify.warning('Glory to Ukraine!');
      return;
    }
  }, 1000);
  Notify.success('Tick-tock...tick-tock..!');
  startTimerBtnEl.setAttribute('disabled', '');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        Notify.failure('Please choose a date in the future');
    } else {
      startTimerBtnEl.removeAttribute('disabled');
      startTimerBtnEl.addEventListener('click', () => {
        handleStartBtnClick(selectedDates[0]);
      });
    }
  },
};

flatpickr('#datetime-picker', options);
startTimerBtnEl.setAttribute('disabled', '');
