

const fromSelect = document.querySelector('[name="from_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toSelect = document.querySelector('[name="to_currency"]');
const toEl = document.querySelector(".to_amount");
const endpoint = "https://api.exchangeratesapi.io/latest";
// to store rates, start w/nothing
const ratesByBase = {};
// listen for input events on the form
const form = document.querySelector(".app form");

// currency list
const currencies = {
  	USD: 'United States Dollar',
  	AUD: 'Australian Dollar',
  	BGN: 'Bulgarian Lev',
  	BRL: 'Brazilian Real',
  	CAD: 'Canadian Dollar',
  	CHF: 'Swiss Franc',
  	CNY: 'Chinese Yuan',
  	CZK: 'Czech Republic Koruna',
  	DKK: 'Danish Krone',
  	GBP: 'British Pound Sterling',
  	HKD: 'Hong Kong Dollar',
  	HRK: 'Croatian Kuna',
  	HUF: 'Hungarian Forint',
  	IDR: 'Indonesian Rupiah',
  	ILS: 'Israeli New Sheqel',
  	INR: 'Indian Rupee',
  	JPY: 'Japanese Yen',
  	KRW: 'South Korean Won',
  	MXN: 'Mexican Peso',
  	MYR: 'Malaysian Ringgit',
  	NOK: 'Norwegian Krone',
  	NZD: 'New Zealand Dollar',
  	PHP: 'Philippine Peso',
  	PLN: 'Polish Zloty',
  	RON: 'Romanian Leu',
  	RUB: 'Russian Ruble',
  	SEK: 'Swedish Krona',
  	SGD: 'Singapore Dollar',
  	THB: 'Thai Baht',
  	TRY: 'Turkish Lira',
  	ZAR: 'South African Rand',
  	EUR: 'Euro',
};

function generateOptions(options) {
	// console.log(options);
	return Object.entries(options)
		.map(
			([currencyCode, currencyName]) =>
			// console.log(currencyCode, currencyName);
			`<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
		)
		.join('');
}

async function fetchRates(base = "USD") {
	const res = await fetch(`${endpoint}?base=${base}`);
	const rates = await res.json();
	// console.log(rates);
	return rates;
}

async function convert(amount, from, to) {
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

function formatCurrency(amount, currency) {
	return Intl.NumberFormat("en-US", {
		style: 'currency',
		currency
	}).format(amount);
}

async function handleInput(e) {
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

// console.log(convert(100, 'CAD', 'USD'));

const optionsHTML = generateOptions(currencies);
// console.log(optionsHTML);
// populate the options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener("input", handleInput);



