var TodoController = (function () {

    function TodoController(view) {
        this.view = view;
    }

    TodoController.prototype.init = init;

    return TodoController;

    // ==================================================================

    function init() {
        // filter=   0:all   1:active   2:completed
        this.model = { todos: [], filter: 0 };

        var scope = {
            addTodo: addTodo.bind(this),
            filterTodos: filterTodos.bind(this),
            completeTodo: completeTodo.bind(this)
        };

        this.view.init(scope);
    }

    function addTodo(value) {
        if (!value) return;
        this.model.todos.push({ title: value });
        render.call(this);
    }

    function completeTodo(todo) {
        todo.completed = !todo.completed;
        render.call(this);
    }

    function filterTodos(filter) {
        this.model.filter = +filter;
        render.call(this);
    }

    // ==================================================================

    function render() {
        var filter = this.model.filter,
            filteredTodos = this.model.todos.filter(function (t) {
                if (filter === 0) return true;
                return filter === 1 ? !t.completed : t.completed
            });
        this.view.renderTodos(filteredTodos);
    }

}());