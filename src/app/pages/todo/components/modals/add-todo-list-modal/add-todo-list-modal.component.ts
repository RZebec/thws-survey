import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToDoService } from '../../../services/todo-service';
import { DatabaseService } from 'src/app/services/database.service';
import { AnalyticsEvent } from 'src/app/pages/todo/models/analyticsEvent';

declare let gtag: Function;

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

    gtag('event', eventData.event_category, eventData);

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
    if (this._newToDoListName.trim() !== '')
      this.toDoService.createToDoList(this._newToDoListName);
    this.logEvent('close');
    this.dialogRef.close();
  }

  onAddToDoListChange(toDoListName: string) {
    this._newToDoListName = toDoListName;
  }
}
