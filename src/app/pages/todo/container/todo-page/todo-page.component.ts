import { Component } from '@angular/core';
import { ToDo, ToDoList } from '../../models/todo-model';
import { ToDoService } from '../../services/todo-service';
import { AddTodoListModalComponent } from '../../components/modals/add-todo-list-modal/add-todo-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';

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

  completedToDosCount = 0;

  addTodoFormControl: FormControl = new FormControl();

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

    this.addTodoFormControl.valueChanges.subscribe((value) => {
      this._newToDoName = value;
    });
  }

  getCompleteCount(toDos: ToDo[]): number {
    return toDos.filter((t) => t.complete).length;
  }

  addToDoList() {
    if (this._newToDoListName.trim() === '') return;

    this.todoService.createToDoList(this._newToDoListName);
    this.getTodoLists();

    this.tabIndex = this.toDoLists.length - 1;
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
    this.toDoLists.find((tL) => tL.id === listId)!.todos.push(newToDo);
    this._newToDoName = '';
    this.addTodoFormControl.setValue('');
    // this.getTodoLists();
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
