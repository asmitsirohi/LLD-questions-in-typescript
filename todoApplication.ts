// Design a todo application

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

class Todos {
  todos: Todo[];

  constructor() {
    this.todos = [];
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  markAsComplete(todoId: number) {
    this.todos.forEach((todo) => {
      if (todo.id === todoId) {
        todo.isCompleted = true;
      }
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  viewAllTodos() {
    console.log(this.todos);
  }
}

class TodoApplication {
  todos: Todos;

  constructor(todos: Todos) {
    this.todos = todos;
  }

  addTodo(todo: Todo) {
    this.todos.addTodo(todo);
  }

  deleteTodo(todoId: number) {
    this.todos.deleteTodo(todoId);
  }

  markAsComplete(todoId: number) {
    this.todos.markAsComplete(todoId);
  }

  showAllTodos() {
    this.todos.viewAllTodos();
  }
}

const todos = new Todos();

const todoApp = new TodoApplication(todos);

todoApp.addTodo({ id: 1, text: "This is a first todo", isCompleted: false });
todoApp.addTodo({ id: 2, text: "This is a second todo", isCompleted: false });
todoApp.addTodo({ id: 3, text: "This is a third todo", isCompleted: false });

todoApp.showAllTodos();
todoApp.deleteTodo(2);
todoApp.showAllTodos();
todoApp.markAsComplete(1);
todoApp.showAllTodos();
