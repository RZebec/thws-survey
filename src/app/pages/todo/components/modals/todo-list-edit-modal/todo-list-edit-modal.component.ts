import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoList } from '../../../models/todo-model';
import { ToDoService } from '../../../services/todo-service';
import { AnalyticsEvent } from 'src/app/pages/todo/models/analyticsEvent';
import { DatabaseService } from 'src/app/services/database.service';

declare let gtag: Function;
@Component({
  selector: 'app-todo-list-edit-modal',
  templateUrl: './todo-list-edit-modal.component.html',
  styleUrls: ['./todo-list-edit-modal.component.scss'],
})
export class TodoListEditModalComponent implements OnInit {
  toDoList!: ToDoList;

  measurementTime: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TodoListEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDoList,
    private toDoService: ToDoService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.measurementTime = Date.now();

    this.toDoList = {
      id: this.data.id,
      name: this.data.name,
      todos: this.data.todos,
    };

    this.dialogRef.disableClose = true; //disable default close operation
    this.dialogRef.backdropClick().subscribe((result) => {
      this.logEvent('close');
      this.dialogRef.close(null);
    });
  }

  logEvent(eventName: string) {
    this.measurementTime = Date.now() - this.measurementTime;

    const eventData: AnalyticsEvent = {
      event_category: 'ToDo-List-Edit',
      event_label: eventName,
      event_measured_time: this.measurementTime,
    };

    gtag('event', eventData.event_category, eventData);

    this.databaseService.addAnalyticsEvent(eventData);

    console.log(
      `'ToDo-List-Edit' -> '${eventName}' = ${this.measurementTime / 1000} s`
    );
  }

  onNoClick(): void {
    this.logEvent('close');
    this.dialogRef.close(null);
  }

  onSaveToDo() {
    this.logEvent('save');
    this.dialogRef.close(this.toDoList);
  }

  removeToDoList() {
    this.logEvent('remove');
    this.toDoService.removeToDoListById(this.toDoList.id);
    this.dialogRef.close({ id: -1 });
  }
}
