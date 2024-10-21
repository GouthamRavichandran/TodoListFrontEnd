import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:9090/todolist'; // Backend url

  constructor(private http: HttpClient) {}

  // Fetch all todos for a specific user
  getTodos(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  // Add a new todo
  addTodo(userId: number, todo: { description: string; status: boolean; active: boolean }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}`, todo);
  }

  // Update an existing todo status
  updateTodo(todoId: number, todo: { status: boolean}): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/status/${todoId}`, todo);
  }

  // Edit todo
  editTodo(todoId: number, editedTodo: { description: string; status: boolean }): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/edit/${todoId}`, editedTodo);
    }

  // Delete todo
  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todoId}`);
  }
}
