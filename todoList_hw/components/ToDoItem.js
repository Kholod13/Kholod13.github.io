export default class ToDoItem {
    #text;
    #status;
    #startDate;
    #endDate;

    constructor(text) {
        this.#text = text;
        this.#status = false;
        this.#startDate = new Date();
        this.#endDate = null;
    }

    complete() {
        this.#status = !this.#status;
        this.#endDate = this.#status ? new Date() : null;
        return this.#status;
    }
    // ToDoItem.js
    getStatus() {
        return this.#status;
    }

    getText() {
        return this.#text;
    }

    getDate() {
        const formatDT = (date) =>
            date
                ? `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                : 'not finished';

        return `${formatDT(this.#startDate)} / ${formatDT(this.#endDate)}`;
    }
}