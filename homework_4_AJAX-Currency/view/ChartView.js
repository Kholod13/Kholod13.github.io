export default class ChartView {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.chartInstance = null;
    }

    render(data, currencyLabel) {
        const labels = data.map(item => item.exchangedate);
        const rates = data.map(item => item.rate);

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(this.canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${currencyLabel} rate in UAH`,
                    data: rates,
                    borderColor: '#3498db',
                    fill: false,
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: false } }
            }
        });
    }

    showError(message) {
        const errorBox = document.getElementById('errorBox');
        if (errorBox) errorBox.innerText = message;
    }
}