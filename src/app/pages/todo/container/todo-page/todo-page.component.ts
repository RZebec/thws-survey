import { Component, ViewChild } from '@angular/core';
import { ToDo, ToDoList } from '../../models/todo-model';
import { ToDoService } from '../../services/todo-service';
import { AddTodoListModalComponent } from '../../components/add-todo-list-modal/add-todo-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { debounceTime } from 'rxjs';
import { TodoEditModalComponent } from '../../components/todo-edit-modal/todo-edit-modal.component';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  toDoLists: ToDoList[] = [];

  private _newToDoName: string = '';

  private _newToDoListName: string = '';

  tabIndex = 0;

  constructor(private todoService: ToDoService, private dialog: MatDialog) {}

  openAddToDoListDialog(): void {
    const dialogRef = this.dialog.open(AddTodoListModalComponent, {
      data: '',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.getTodoLists();
      debounceTime(1000);
      this.tabIndex = this.toDoLists.length - 1;
    });
  }

  ngOnInit() {
    this.getTodoLists();
  }

  addToDoList() {
    if (this._newToDoListName.trim() !== '')
      this.todoService.createToDoList(this._newToDoListName);
    this.getTodoLists();
  }

  onAddToDoListChange(toDoListName: string) {
    this._newToDoListName = toDoListName;
  }

  removeToDoList(listId: number) {
    this.todoService.removeToDoListById(listId);
    this.getTodoLists();
  }

  addToDo(listId: number) {
    const newToDo: ToDo = {
      id: Math.random(),
      complete: false,
      task: this._newToDoName,
    };
    this.todoService.addTodoToListById(listId, newToDo);
    this.getTodoLists();
  }

  getTodoLists() {
    this.toDoLists = this.todoService.getAllToDoLists();
  }

  getTodosByState(toDos: ToDo[], isComplete: boolean) {
    return toDos ? toDos.filter((t) => t.complete === isComplete) : [];
  }

  onAddToDoChange(toDoName: string) {
    this._newToDoName = toDoName;
  }

  onToDoStateChange(listId: number, toDo: ToDo, state: boolean) {
    toDo.complete = state;
    this.onToDoChange(listId, toDo);
  }

  onToDoChange(listId: number, toDo: ToDo) {
    const toDoListIndex = this.toDoLists.findIndex((tL) => tL.id === listId);

    const toDoIndex = this.toDoLists[toDoListIndex].todos.findIndex(
      (t) => (t.id = toDo.id)
    );

    this.toDoLists[toDoListIndex].todos[toDoIndex] = toDo;

    this.todoService.updateToDoByListId(listId, toDo);
  }

  updateToDosInList(listId: number, toDos: ToDo[]) {
    const toDoListIndex = this.toDoLists.findIndex((tL) => tL.id === listId);

    if (toDoListIndex === -1) return;

    this.toDoLists[toDoListIndex].todos = toDos;

    this.todoService.updateTodoList(this.toDoLists[toDoListIndex]);
  }
}
