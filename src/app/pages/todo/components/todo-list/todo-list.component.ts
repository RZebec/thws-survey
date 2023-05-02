import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToDo } from '../../models/todo-model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditModalComponent } from '../todo-edit-modal/todo-edit-modal.component';

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

  openEditToDoDialog(): void {
    const dialogRef = this.dialog.open(TodoEditModalComponent);
  }

  getCompleteStartIndex() {
    this.completeStartIndex = this.toDos.findIndex((tL) => tL.complete);
    if (this.completeStartIndex === -1)
      this.completeStartIndex = this.toDos.length - 1;
  }

  onCompleteChange(toDo: ToDo, change: MatCheckboxChange) {
    const toDos: ToDo[] = this.toDos;

    const toDoIndex = this.toDos.findIndex((t) => t.id === toDo.id);

    if (change.checked) {
      toDos[toDoIndex].complete = true;
      this.moveToDoInList(toDos, toDoIndex, this.completeStartIndex);
      this.getCompleteStartIndex();
    } else {
      toDos[toDoIndex].complete = false;
      this.getCompleteStartIndex();
      this.moveToDoInList(toDos, toDoIndex, this.completeStartIndex);
    }
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    this.moveToDoInList(this.toDos, event.previousIndex, event.currentIndex);
  }

  moveToDoInList(toDoList: ToDo[], oldIndex: number, newIndex: number) {
    toDoList.splice(newIndex, 0, toDoList.splice(oldIndex, 1)[0]);

    this.toDoArrayChange.emit(toDoList);

    console.log(oldIndex);
    console.log(newIndex);

    console.log(this.completeStartIndex);

    console.log('-------');

    for (let toDo of this.toDos) {
      console.log(toDo.task);
    }
  }
}
