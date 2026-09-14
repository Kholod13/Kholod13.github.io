import ExchangeRateModel from '../model/ExchangeRateModel.js';
import ChartView from '../view/ChartView.js';

export default class AppController {
    constructor() {
        this.model = new ExchangeRateModel();
        this.view = new ChartView('rateChart');

        this.btnSend = document.getElementById('btnSend');
        this.currency = document.getElementById('currency');
        this.dateStart = document.getElementById('ex_date_start');
        this.dateEnd = document.getElementById('ex_date_end');

        this.init();
    }

    init() {
        this.btnSend.addEventListener('click', () => this.handleChartRequest());
    }

    async handleChartRequest() {
        try {
            const data = await this.model.fetchRates(
                this.currency.value,
                this.dateStart.value,
                this.dateEnd.value
            );
            this.view.render(data, this.currency.value);
        } catch (error) {
            console.error(error);
            this.view.showError('Не удалось загрузить курс валют');
        }
    }
}