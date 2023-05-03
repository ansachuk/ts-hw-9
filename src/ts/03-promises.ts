import { Notify } from "notiflix/build/notiflix-notify-aio";

type PromiseItem = {
	position: number;
	delay: number;
};

const formRef = document.querySelector<HTMLFormElement>(".form");

const createPromise = (position: number, delay: number): void => {
	const shouldResolve = Math.random() > 0.3;

	const promise = new Promise<PromiseItem>((resolve, reject) => {
		if (shouldResolve) {
			return resolve({ position, delay });
		} else {
			return reject({ position, delay });
		}
	});

	promise
		.then(({ position, delay }) => {
			Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
		})
		.catch(({ position, delay }) => {
			Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
		});
};

const makePromiseList = (firstDelay: number, step: number, amount: number): void => {
	for (let i = 0; i < amount; i += 1) {
		let timeout = firstDelay + step * i;
		setTimeout(() => {
			createPromise(i + 1, timeout);
		}, timeout);
	}
};

const runPromises = (e: SubmitEvent): void => {
	e.preventDefault();
	// const {
	// 	elements: { delay, step, amount },
	// } = e.currentTarget;

	const delay = (e.currentTarget as HTMLFormElement).delay as HTMLInputElement;
	const step = (e.currentTarget as HTMLFormElement).step as HTMLInputElement;
	const amount = (e.currentTarget as HTMLFormElement).amount as HTMLInputElement;

	makePromiseList(Number(delay.value), Number(step.value), Number(amount.value));
};

formRef?.addEventListener("submit", runPromises);
