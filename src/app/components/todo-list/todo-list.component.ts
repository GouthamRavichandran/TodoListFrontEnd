import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  newTodoDescription: string = '';

  constructor(private todoService: TodoService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (!userId) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    } else {
      this.fetchTodos(userId);
    }
  }

  fetchTodos(userId: number): void {
    this.todoService.getTodos(userId).subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodoDescription.trim()) {
      const userId = this.userService.getUserId();
      const newTodo = { description: this.newTodoDescription, status: false, active: true };

      this.todoService.addTodo(userId!, newTodo).subscribe(todo => {
        this.todos.push(todo);
        this.newTodoDescription = ''; // Clear input field
      },
    error => {
                    console.error('Error adding todo', error);
                });
    }
  }

  updateTodoStatus(todo: any): void {
    this.todoService.updateTodo(todo.id, { status: !todo.status }).subscribe(updatedTodo => {
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    });
  }

  editTodo(todo: any): void {
    const newDescription = prompt("Edit your todo:", todo.description);
    if (newDescription) {
      this.todoService.editTodo(todo.id, { ...todo, description: newDescription, status: false }).subscribe(updatedTodo => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      });
    }
  }


  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
    });
  }
}


























// // src/app/components/todo-list/todo-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { TodoService } from '../../services/todo.service';
// import { UserService } from '../../services/user.service';
//
// @Component({
//   selector: 'app-todo-list',
//   templateUrl: './todo-list.component.html',
//   styleUrls: ['./todo-list.component.css']
// })
// export class TodoListComponent implements OnInit {
//   todos: any[] = [];
//   userId: number | null = null;
//   newTodoDescription: string = '';
//   errorMessage: string = '';
//
//   constructor(private todoService: TodoService, private router: Router, private userService: UserService) {}
//
//   ngOnInit() {
//     this.userId = this.userService.getUserId(); // Get the user ID from UserService
//     if (!this.userId) {
//       this.router.navigate(['/login']); // Redirect to login if user ID is not found
//       return;
//     }
//     this.loadTodos();
//   }
//
//   loadTodos() {
//     this.todoService.getTodos(this.userId).subscribe({
//       next: (todos) => {
//         this.todos = todos.filter(todo => todo.active); // Only show active todos
//       },
//       error: () => {
//         this.errorMessage = 'Failed to load todos.';
//       }
//     });
//   }
//
//   addTodo() {
//     if (!this.newTodoDescription.trim()) {
//       this.errorMessage = 'Description cannot be empty.';
//       return;
//     }
//
//     const newTodo = {
//       description: this.newTodoDescription,
//       status: false,
//       active: true
//     };
//
//     this.todoService.addTodo(this.userId, newTodo).subscribe({
//       next: () => {
//         this.newTodoDescription = '';
//         this.loadTodos(); // Reload todos after adding
//       },
//       error: () => {
//         this.errorMessage = 'Failed to add todo.';
//       }
//     });
//   }
//
//   updateTodo(todoId: number, status: boolean) {
//     this.todoService.updateTodo(todoId, { status, active: true }).subscribe({
//       next: () => {
//         this.loadTodos(); // Reload todos after updating
//       },
//       error: () => {
//         this.errorMessage = 'Failed to update todo.';
//       }
//     });
//   }
//
//   deleteTodo(todoId: number) {
//     this.todoService.deleteTodo(todoId).subscribe({
//       next: () => {
//         this.loadTodos(); // Reload todos after deleting
//       },
//       error: () => {
//         this.errorMessage = 'Failed to delete todo.';
//       }
//     });
//   }
// }




//original
// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-todo-list',
//   templateUrl: './todo-list.component.html',
//   styleUrls: ['./todo-list.component.css']
// })
// export class TodoListComponent {
//
// }
