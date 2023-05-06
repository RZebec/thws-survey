import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToDo } from '../../models/todo-model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditModalComponent } from '../modals/todo-edit-modal/todo-edit-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() toDos!: ToDo[];

  @Output() toDoArrayChange = new EventEmitter<ToDo[]>();

  completeStartIndex = 0;

  constructor(private dialog: MatDialog) {}

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
      this.moveToDoInList(toDos, toDoIndex, toDos.length - 1);
      this.getCompleteStartIndex();
    } else {
      toDos[toDoIndex].complete = false;
      this.getCompleteStartIndex();
      // this.moveToDoInList(toDos, toDoIndex, this.completeStartIndex);
    }
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    this.moveToDoInList(this.toDos, event.previousIndex, event.currentIndex);
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

    this.toDoArrayChange.emit(toDoList);
  }
}
