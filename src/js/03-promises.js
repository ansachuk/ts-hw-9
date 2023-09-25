import { Notify } from "notiflix/build/notiflix-notify-aio";

const formRef = document.querySelector(".form");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
function makePromiseList(firstDelay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    let timeout = firstDelay + step * i;
    setTimeout(() => {
      createPromise(i + 1, timeout);
    }, timeout);
  }
}
function runPromises(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  makePromiseList(
    Number(delay.value),
    Number(step.value),
    Number(amount.value)
  );
}

formRef.addEventListener("submit", runPromises);
