var TodoApp = (function () {

    function TodoApp(containerId) {
        this.containerId = containerId;
    }

    TodoApp.prototype.init = function () {
        var view = new TodoView(this.containerId);
        var controller = new TodoController(view);
        controller.init();
    }

    return TodoApp;

}());