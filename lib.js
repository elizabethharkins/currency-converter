

const endpoint = "https://api.exchangeratesapi.io/latest";
// to store rates, start w/nothing
const ratesByBase = {};

export async function fetchRates(base = "USD") {
	const res = await fetch(`${endpoint}?base=${base}`);
	const rates = await res.json();
	// console.log(rates);
	return rates;
}

export async function convert(amount, from, to) {
	// could fetch rates each time ... might be slow/affected by rate limits

	// first check if rates exist to convert from 
	if (!ratesByBase[from]) {
		// console.log(`no ${from} to convert to ${to}`);
		const rates = await fetchRates(from);
		// console.log(rates);
		// store for next time
		ratesByBase[from] = rates;
	}
	// convert the amount that they passed in 
	const rate = ratesByBase[from].rates[to];
	const convertedAmount = rate * amount;
	// console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
	return convertedAmount;
}