import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToDoService } from '../../../services/todo-service';
import { DatabaseService } from 'src/app/services/database.service';
import { AnalyticsEvent } from 'src/app/pages/todo/models/analyticsEvent';
import { ToDoList } from '../../../models/todo-model';

@Component({
  selector: 'app-add-todo-list-modal',
  templateUrl: './add-todo-list-modal.component.html',
  styleUrls: ['./add-todo-list-modal.component.scss'],
})
export class AddTodoListModalComponent {
  _newToDoListName: string = '';

  constructor(
    private toDoService: ToDoService,
    public dialogRef: MatDialogRef<AddTodoListModalComponent>,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  measurementTime: number = 0;

  ngOnInit() {
    this.measurementTime = Date.now();
  }

  logEvent(eventName: string) {
    this.measurementTime = Date.now() - this.measurementTime;

    const eventData: AnalyticsEvent = {
      event_category: 'ToDo-List-Add',
      event_label: eventName,
      event_measured_time: this.measurementTime,
    };

    this.databaseService.addAnalyticsEvent(eventData);

    console.log(
      `'ToDo-List-Add' -> '${eventName}' = ${this.measurementTime / 1000} s`
    );
  }

  onNoClick(): void {
    this.logEvent('close');
    this.dialogRef.close();
  }

  addToDoList() {
    if (this._newToDoListName.trim() !== '') {
      const newToDoList: ToDoList = {
        id: Math.random(),
        todos: [],
        name: this._newToDoListName,
      };

      this.toDoService.createToDoList(newToDoList);
      this.toDoService.setTutorialToDoTaskToComplete(10);
    }
    this.logEvent('close');
    this.dialogRef.close();
  }

  onAddToDoListChange(toDoListName: string) {
    this._newToDoListName = toDoListName;
  }
}
