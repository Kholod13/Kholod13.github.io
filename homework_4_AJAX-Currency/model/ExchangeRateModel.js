export default class ExchangeRateModel {
    async fetchRates(currency, start, end){
        const startFmt = start.replaceAll("-", "");
        const endFmt = end.replaceAll("-", "");

        const URI = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${startFmt}&end=${endFmt}&valcode=${currency}&sort=exchangedate&order=desc&json`;

        const response = await fetch(URI);
        if (!response.ok) {
            throw new Error(`NBU API error: ${response.status}`);
        }

        const data = await response.json();
        return data.reverse();
    }
}