import getRandomHexColor from './random-color';

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
let changeColor = null;

startBtnRef.addEventListener('click', makeChangingBodyColor);
stopBtnRef.addEventListener('click', stopChangingBodyColor);

function makeChangingBodyColor() {
  changeColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnRef.setAttribute('disabled', 'true');
}
function stopChangingBodyColor() {
  clearInterval(changeColor);
  startBtnRef.removeAttribute('disabled');
}
