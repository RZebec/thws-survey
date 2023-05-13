import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToDo } from '../../models/todo-model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditModalComponent } from '../modals/todo-edit-modal/todo-edit-modal.component';
import { AnalyticsEvent } from 'src/app/pages/todo/models/analyticsEvent';
import { DatabaseService } from 'src/app/services/database.service';
import { ToDoService } from '../../services/todo-service';

declare let gtag: Function;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() toDos!: ToDo[];

  @Output() toDoArrayChange = new EventEmitter<ToDo[]>();

  completeStartIndex = 0;

  dragMeasurementTime = 0;

  constructor(
    private dialog: MatDialog,
    private databaseService: DatabaseService,
    private toDoService: ToDoService
  ) {}

  ngOnInit() {
    this.getCompleteStartIndex();
  }

  openEditToDoDialog(toDo: ToDo): void {
    const dialogRef = this.dialog.open(TodoEditModalComponent, {
      data: toDo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.updateToDoInList(result);
    });
  }

  getCompleteStartIndex() {
    this.completeStartIndex = this.toDos.findIndex((tL) => tL.complete);
    if (this.completeStartIndex === -1)
      this.completeStartIndex = this.toDos.length - 1;
  }

  setDragMeasurementTime() {
    this.dragMeasurementTime = Date.now();
    console.log(this.dragMeasurementTime);
  }

  logDragEvent(eventName: string) {
    this.dragMeasurementTime = Date.now() - this.dragMeasurementTime;

    const eventData: AnalyticsEvent = {
      event_category: 'ToDo-List',
      event_label: eventName,
      event_measured_time: this.dragMeasurementTime,
    };

    gtag('event', eventData.event_category, eventData);

    this.databaseService.addAnalyticsEvent(eventData);

    console.log(
      `'ToDo-List' -> '${eventName}' = ${this.dragMeasurementTime / 1000} s`
    );
  }

  getDateColor(date: number): string {
    const dateNow = new Date(new Date(Date.now()).toDateString()).getTime();
    const toDoDate = new Date(new Date(date).toDateString()).getTime();

    if (dateNow > toDoDate) return 'red';
    if (dateNow < toDoDate) return 'green';

    return 'orange';
  }

  onCompleteChange(toDo: ToDo, change: MatCheckboxChange) {
    const toDos: ToDo[] = this.toDos;

    const toDoIndex = this.toDos.findIndex((t) => t.id === toDo.id);

    if (change.checked) {
      toDos[toDoIndex].complete = true;
      // this.moveToDoInList(toDos, toDoIndex, toDos.length - 1);
      // this.getCompleteStartIndex();
      if (toDos.filter((t) => t.complete).length >= 2)
        this.toDoService.setTutorialToDoTaskToComplete(50);
      this.updateToDoInList(this.toDos[toDoIndex]);
    } else {
      toDos[toDoIndex].complete = false;
      // this.getCompleteStartIndex();
      // this.moveToDoInList(toDos, toDoIndex, this.completeStartIndex);
      this.updateToDoInList(this.toDos[toDoIndex]);
    }
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    this.moveToDoInList(this.toDos, event.previousIndex, event.currentIndex);
    this.logDragEvent('todo-dragged');
  }

  updateToDoInList(toDo: ToDo) {
    const toDoIndex = this.toDos.findIndex((t) => t.id === toDo.id);

    if (toDoIndex === -1) return;

    this.toDos[toDoIndex] = toDo;

    this.toDoArrayChange.emit(this.toDos);
  }

  removeToDoFromList(toDoId: number) {
    const toDoIndex = this.toDos.findIndex((t) => t.id === toDoId);

    if (toDoIndex === -1) return;

    this.toDos.splice(toDoIndex, 1);

    this.toDoArrayChange.emit(this.toDos);
  }

  moveToDoInList(toDoList: ToDo[], oldIndex: number, newIndex: number) {
    toDoList.splice(newIndex, 0, toDoList.splice(oldIndex, 1)[0]);
    this.toDoService.setTutorialToDoTaskToComplete(40);
    this.toDoArrayChange.emit(toDoList);
  }
}
