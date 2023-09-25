import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import convertMs from "./convert-ms";

const refs = {
	textInput: document.querySelector<HTMLInputElement>("#datetime-picker"),
	startButton: document.querySelector<HTMLButtonElement>("[data-start]"),
	daysField: document.querySelector<HTMLSpanElement>("[data-days]"),
	hoursField: document.querySelector<HTMLSpanElement>("[data-hours]"),
	minutesField: document.querySelector<HTMLSpanElement>("[data-minutes]"),
	secondsField: document.querySelector<HTMLSpanElement>("[data-seconds]"),
};

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose,
};

let pickedDate: number;

refs.startButton?.setAttribute("disabled", "true");

if (refs.textInput) {
	flatpickr(refs.textInput, options);
}

function makeStartTimer() {
	const id = setInterval(() => {
		const { days, hours, minutes, seconds } = convertMs(pickedDate - new Date().getTime());

		const { daysField, hoursField, minutesField, secondsField } = refs;

		if (seconds < 0) {
			clearInterval(id);
			Notify.success("✅ Time is over!");
			return;
		}

		if (daysField && hoursField && minutesField && secondsField) {
			daysField.textContent = addLeadingZero(days);
			hoursField.textContent = addLeadingZero(hours);
			minutesField.textContent = addLeadingZero(minutes);
			secondsField.textContent = addLeadingZero(seconds);
		}
	}, 1000);
}

function onClose(selectedDates: Date[]): void {
	pickedDate = selectedDates[0].getTime();

	if (pickedDate < new Date().getTime()) {
		refs.startButton?.setAttribute("disabled", "true");
		Notify.failure("Please choose a date in the future");
		return;
	}

	refs.startButton?.removeAttribute("disabled");
}

function addLeadingZero(value: number): string {
	if (String(value).length === 1) {
		return `0${value}`;
	}
	return String(value);
}

refs.startButton?.addEventListener("click", makeStartTimer);
