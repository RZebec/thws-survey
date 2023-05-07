import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDo } from '../../../models/todo-model';

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.scss'],
})
export class TodoEditModalComponent implements OnInit {
  toDo!: ToDo;

  constructor(
    public dialogRef: MatDialogRef<TodoEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDo
  ) {}

  ngOnInit(): void {
    this.toDo = {
      id: this.data.id,
      task: this.data.task,
      date: this.data.date,
      complete: this.data.complete,
    };

    this.dialogRef.disableClose = true; //disable default close operation
    this.dialogRef.backdropClick().subscribe((result) => {
      this.dialogRef.close(null);
    });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSaveToDo() {
    this.dialogRef.close(this.toDo);
  }
}
