import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import convertMs from "./comvert-ms";

const refs = {
  textInpur: document.querySelector("#datetime-picker"),
  startButton: document.querySelector("[data-start]"),
  daysField: document.querySelector("[data-days]"),
  hoursField: document.querySelector("[data-hours]"),
  minutesField: document.querySelector("[data-minutes]"),
  secondsField: document.querySelector("[data-seconds]"),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};
let pickedDate = null;

refs.startButton.setAttribute("disabled", "true");

flatpickr(refs.textInpur, options);

function makeStartTimer() {
  const id = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      pickedDate - new Date().getTime()
    );
    const { daysField, hoursField, minutesField, secondsField } = refs;

    if (seconds < 0) {
      clearInterval(id);
      Notify.success("✅ Time is over!");
      return;
    }

    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);
  }, 1000);
}

function onClose(selectedDates) {
  pickedDate = selectedDates[0].getTime();

  if (pickedDate < new Date().getTime()) {
    refs.startButton.setAttribute("disabled", "true");
    Notify.failure("Please choose a date in the future");
    return;
  }

  refs.startButton.removeAttribute("disabled");
}

function addLeadingZero(value) {
  if (String(value).length === 1) {
    return `0${value}`;
  }
  return value;
}

refs.startButton.addEventListener("click", makeStartTimer);
