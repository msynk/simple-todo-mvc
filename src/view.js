var TodoView = (function () {
    var $ = document.querySelector.bind(document),
        ce = document.createElement.bind(document);

    function TodoView(rootId) {
        this.rootElement = $('#' + rootId);
    }

    TodoView.prototype.init = init;
    TodoView.prototype.renderTodos = renderTodos;

    return TodoView;

    function init(scope) {
        this.scope = scope;
        this.elements = {};

        this.rootElement.innerHTML = getTemplate();

        var me = this;
        ['todoForm', 'todoInput', 'todoList', 'filterButtons'].forEach(function (id) { me.elements[id] = $('#' + id); });
        this.elements.todoForm.addEventListener('submit', submitForm.bind(me));
        this.elements.filterButtons.addEventListener('click', filter.bind(me));
        this.elements.todoInput.focus();
    }

    function renderTodos(todos) {
        this.elements.todoList.innerHTML = '';
        var me = this;
        (todos || []).forEach(function (t) {
            me.elements.todoList.prepend(createLi.call(me, t));
        });
    }

    // ====================================================================================================================

    function submitForm(e) {
        e.preventDefault();
        var todoInput = this.elements.todoInput;
        var value = todoInput.value;
        if (!value) return;

        this.scope.addTodo(value);
        todoInput.value = '';
        todoInput.focus();
    }

    function filter(e) {
        var value = e.target.getAttribute('value');
        this.scope.filterTodos(value);
    }

    function createLi(todo) {
        var li = ce('li'),
            titleSpan = ce('span'),
            completeButton = ce('button');

        li.append(titleSpan);
        li.append(completeButton);
        li.className = 'todo-li ' + (todo.completed ? 'completed' : '');

        titleSpan.className = 'todo-title';
        titleSpan.textContent = todo.title;

        completeButton.className = 'todo-btn-complete';
        completeButton.textContent = todo.completed ? 'undo' : 'do';
        completeButton.addEventListener('click', function (e) { this.scope.completeTodo(todo); }.bind(this));

        return li;
    }


    function getTemplate() {
        return `
            <form id="todoForm">
                <input id="todoInput" autocomplete="off" placeholder="Enter new Todo..." />
                <button>Add</button>
            </form>

            <ol id="todoList" class="todo-list"></ol>

            <div id="filterButtons">
                <button value="0">All</button>
                <button value="1">Active</button>
                <button value="2">Completed</button>
            </div>
        `
    }

}());