import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDo, ToDoList } from '../../../models/todo-model';
import { ToDoService } from '../../../services/todo-service';

@Component({
  selector: 'app-todo-list-edit-modal',
  templateUrl: './todo-list-edit-modal.component.html',
  styleUrls: ['./todo-list-edit-modal.component.scss'],
})
export class TodoListEditModalComponent implements OnInit {
  toDoList!: ToDoList;

  constructor(
    public dialogRef: MatDialogRef<TodoListEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDoList,
    private toDoService: ToDoService
  ) {}

  ngOnInit(): void {
    this.toDoList = {
      id: this.data.id,
      name: this.data.name,
      todos: this.data.todos,
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
    this.dialogRef.close(this.toDoList);
  }

  removeToDoList() {
    this.toDoService.removeToDoListById(this.toDoList.id);
    this.dialogRef.close({ id: -1 });
  }
}
