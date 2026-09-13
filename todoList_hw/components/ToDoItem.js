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
}