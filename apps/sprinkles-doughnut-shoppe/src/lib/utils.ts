export function formatCurrency(amount: number, currency: string) {
	const rates = { USD: 1, EUR: 0.85, GBP: 0.73 };
	const symbols = { USD: "$", EUR: "€", GBP: "£" };
	const convertedAmount = amount * (rates[currency as keyof typeof rates] || 1);
	return `${symbols[currency as keyof typeof symbols] || "$"}${convertedAmount.toFixed(2)}`;
}
