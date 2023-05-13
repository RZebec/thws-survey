import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDo } from '../../../models/todo-model';
import { AnalyticsEvent } from 'src/app/pages/todo/models/analyticsEvent';
import { DatabaseService } from 'src/app/services/database.service';
import { ToDoService } from '../../../services/todo-service';

declare let gtag: Function;

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.scss'],
})
export class TodoEditModalComponent implements OnInit {
  toDo!: ToDo;

  measurementTime: number = 0;

  dateMeasurementTime: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TodoEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDo,
    private databaseService: DatabaseService,
    private toDoService: ToDoService
  ) {}

  ngOnInit(): void {
    this.measurementTime = Date.now();

    this.toDo = {
      id: this.data.id,
      task: this.data.task,
      date: this.data.date,
      complete: this.data.complete,
    };

    this.dialogRef.disableClose = true; //disable default close operation
    this.dialogRef.backdropClick().subscribe((result) => {
      this.logEvent('close');
      this.dialogRef.close(null);
    });
  }

  setDateMeasurementTime() {
    this.dateMeasurementTime = Date.now();
    console.log(this.dateMeasurementTime);
  }

  logDateEvent(eventName: string) {
    this.dateMeasurementTime = Date.now() - this.dateMeasurementTime;

    const eventData: AnalyticsEvent = {
      event_category: 'ToDo-Edit',
      event_label: eventName,
      event_measured_time: this.dateMeasurementTime,
    };

    gtag('event', eventData.event_category, eventData);

    this.databaseService.addAnalyticsEvent(eventData);

    console.log(
      `'ToDo-Edit' -> '${eventName}' = ${this.dateMeasurementTime / 1000} s`
    );
  }

  logEvent(eventName: string) {
    this.measurementTime = Date.now() - this.measurementTime;

    const eventData: AnalyticsEvent = {
      event_category: 'ToDo-Edit',
      event_label: eventName,
      event_measured_time: this.measurementTime,
    };

    gtag('event', eventData.event_category, eventData);

    this.databaseService.addAnalyticsEvent(eventData);

    console.log(
      `'ToDo-Edit' -> '${eventName}' = ${this.measurementTime / 1000} s`
    );
  }

  onNoClick(): void {
    this.logEvent('close');
    this.dialogRef.close(null);
  }

  onSaveToDo() {
    if (this.toDo.date) this.toDoService.setTutorialToDoTaskToComplete(30);
    this.logEvent('save');
    this.dialogRef.close(this.toDo);
  }
}
