import ToDoItem from './components/ToDoItem.js';

(function() {
    //array tasks
    const taskList = [];
    //main elements for managing tasks
    const input = document.getElementById('input');
    const btnAdd = document.getElementById('addToDoBtn');
    const list = document.getElementById('list');

    renderList();

    //methods
    function applyTaskAppearance(task, li, divInput, divLabel, btnDelete, btnClose) {
        if (task.getStatus()) {
            li.className = "input-group pe-3 bg-success-subtle rounded-end border border-success-subtle d-flex justify-content-between align-items-center";
            divLabel.className = "form-check-label stretched-link text-decoration-line-through";
            btnDelete.className = "btn btn-danger invisible";
            btnClose.className = "btn btn-close custom-close";
            divInput.checked = true;
            divInput.disabled = true;
        } else {
            li.className = "input-group rounded-end border border-secondary-subtle d-flex justify-content-between align-items-center";
            divLabel.className = "form-check-label stretched-link";
            btnDelete.className = "btn btn-danger end-rounded";
            btnClose.className = "btn btn-close custom-close d-none";
            divInput.checked = false;
            divInput.disabled = false;
        }
    }

    function renderList() {
        list.innerHTML = ""; // очистка перед перерисовкой

        if (taskList.length === 0) {
            list.classList.add('listChecker'); // add, не setAttribute
            const empty = document.createElement('h3');
            empty.innerText = 'Add your first task and manage your life!';
            list.appendChild(empty);
            return;
        }

        list.classList.remove('listChecker');

        taskList.forEach((task, index) => {
            const li = document.createElement("li");
            const liContainer = document.createElement("div");
            liContainer.setAttribute("class", "ps-3");

            const divInput = document.createElement("input");
            divInput.setAttribute("class", "form-check-input custom-check me-1");
            divInput.setAttribute("type", "checkbox");
            divInput.setAttribute("id", `task-checkbox-${index}`);

            const divLabel = document.createElement("label");
            divLabel.setAttribute("for", `task-checkbox-${index}`);
            divLabel.innerHTML = task.getText();

            const btnDelete = document.createElement("button");
            btnDelete.setAttribute("type", "button");
            btnDelete.innerHTML = "Delete";

            const btnClose = document.createElement("button");
            btnClose.setAttribute("type", "button");

            applyTaskAppearance(task, li, divInput, divLabel, btnDelete, btnClose); // сразу выставляем вид по текущему статусу

            // чекбокс: обычное выполнение задачи
            divInput.addEventListener("change", () => {
                task.complete();
                applyTaskAppearance(task, li, divInput, divLabel, btnDelete, btnClose);
            });

            // крестик: раз чекбокс станет disabled, именно эта кнопка возвращает задачу обратно
            btnClose.addEventListener("click", () => {
                task.complete(); // переключаем статус обратно на false
                applyTaskAppearance(task, li, divInput, divLabel, btnDelete, btnClose);
            });

            // Delete: полное удаление задачи из списка
            btnDelete.addEventListener("click", () => {
                const idx = taskList.indexOf(task);
                taskList.splice(idx, 1);
                renderList();
            });

            li.appendChild(liContainer);
            liContainer.appendChild(divInput);
            liContainer.appendChild(divLabel);
            li.appendChild(btnDelete);
            li.appendChild(btnClose);
            list.appendChild(li);
        });
    }
    //events
    btnAdd.addEventListener('click', function(event) {
        event.preventDefault();

        const task = new ToDoItem(input.value);
        taskList.push(task);

        input.value = '';
        renderList();
    })


})();