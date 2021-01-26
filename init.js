

import { fromSelect, toSelect } from "./elements.js";
import { generateOptions } from "./utils.js";
import currencies from "./currencies.js";
import { handleInput } from "./handlers.js";

export function init() {
	// listen for input events on the form
	const form = document.querySelector(".app form");

	const optionsHTML = generateOptions(currencies);
	// console.log(optionsHTML);

	// populate the options elements
	fromSelect.innerHTML = optionsHTML;
	toSelect.innerHTML = optionsHTML;

	form.addEventListener("input", handleInput);
}