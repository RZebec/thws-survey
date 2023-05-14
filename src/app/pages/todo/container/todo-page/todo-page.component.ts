import { Component } from '@angular/core';
import { ToDo, ToDoList } from '../../models/todo-model';
import { ToDoService } from '../../services/todo-service';
import { AddTodoListModalComponent } from '../../components/modals/add-todo-list-modal/add-todo-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TodoListEditModalComponent } from '../../components/modals/todo-list-edit-modal/todo-list-edit-modal.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AnalyticsEvent } from 'src/app/pages/todo/models/analyticsEvent';

declare let gtag: Function;
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  toDoLists: ToDoList[] = [];

  private _newToDoName: string = '';

  private _newToDoListName: string = '';

  newToDoCounter = 0;

  tabIndex = 0;

  completedToDosCount = 0;

  measurementTime: number = 0;

  addTodoFormControl: FormControl = new FormControl();

  tutorialToDoList: ToDoList;

  constructor(
    private todoService: ToDoService,
    private dialog: MatDialog,
    private databaseService: DatabaseService
  ) {
    this.tutorialToDoList = this.todoService.getTutorialToDoList();
  }

  openAddToDoListDialog(): void {
    const dialogRef = this.dialog.open(AddTodoListModalComponent, {
      data: '',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.getTodoLists();
      this.tutorialToDoList = this.todoService.getTutorialToDoList();
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

  setMeasureTime() {
    this.measurementTime = Date.now();
    console.log(this.measurementTime);
  }

  logEvent(eventName: string) {
    this.measurementTime = Date.now() - this.measurementTime;

    const eventData: AnalyticsEvent = {
      event_category: 'ToDo-Add',
      event_label: eventName,
      event_measured_time: this.measurementTime,
    };

    gtag('event', eventData.event_category, eventData);

    this.databaseService.addAnalyticsEvent(eventData);

    console.log(
      `'ToDo-Add' -> '${eventName}' = ${this.measurementTime / 1000} s`
    );
  }

  openEditToDoListDialog(toDoList: ToDoList): void {
    const dialogRef = this.dialog.open(TodoListEditModalComponent, {
      data: toDoList,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.id !== -1) this.todoService.updateTodoList(result);
      this.getTodoLists();
    });
  }

  getCompleteCount(toDos: ToDo[]): number {
    return toDos.filter((t) => t.complete).length;
  }

  addToDoList() {
    if (this._newToDoListName.trim() === '') return;

    const newToDoList: ToDoList = {
      id: Math.random(),
      todos: [],
      name: this._newToDoListName,
    };

    this.todoService.createToDoList(newToDoList);

    // this.getTodoLists();

    this.toDoLists = [...this.toDoLists, newToDoList];

    this.tabIndex = this.toDoLists.length + 1;
  }

  onAddToDoListChange(toDoListName: string) {
    this._newToDoListName = toDoListName;
  }

  removeToDoList(listId: number) {
    this.todoService.removeToDoListById(listId);
    this.getTodoLists();
  }

  addToDo(listId: number) {
    if (this._newToDoName.trim() === '') return;

    this.newToDoCounter++;

    if (this.newToDoCounter === 3) {
      this.todoService.setTutorialToDoTaskToComplete(20);
      this.tutorialToDoList = this.todoService.getTutorialToDoList();
    }

    this.logEvent('save');

    this.setMeasureTime();

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

    this.tutorialToDoList = this.todoService.getTutorialToDoList();

    this.toDoLists[toDoListIndex].todos = toDos;

    this.todoService.updateTodoList(this.toDoLists[toDoListIndex]);
  }
}
