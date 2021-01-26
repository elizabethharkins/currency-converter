

import { convert } from "./lib.js";
import { formatCurrency } from "./utils.js";
import { fromInput, fromSelect, toSelect, toEl } from "./elements.js";

export async function handleInput(e) {
	// console.log(e.target);
	// console.log(e.currentTarget);

	const rawAmount = await convert(
		fromInput.value, 
		fromSelect.value, 
		toSelect.value
	);
	// console.log(rawAmount);
	toEl.textContent = formatCurrency(rawAmount, toSelect.value);
}