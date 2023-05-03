import getRandomHexColor from "./random-color";

const startBtnRef = document.querySelector<HTMLButtonElement>("[data-start]");
const stopBtnRef = document.querySelector<HTMLButtonElement>("[data-stop]");
let changeColor: number;

startBtnRef?.addEventListener("click", makeChangingBodyColor);
stopBtnRef?.addEventListener("click", stopChangingBodyColor);

function makeChangingBodyColor() {
	changeColor = setInterval(() => {
		document.body.style.backgroundColor = getRandomHexColor();
	}, 1000);
	startBtnRef?.setAttribute("disabled", "true");
}
function stopChangingBodyColor() {
	clearInterval(changeColor);
	startBtnRef?.removeAttribute("disabled");
}
