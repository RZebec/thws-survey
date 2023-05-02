import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToDoService } from '../../services/todo-service';

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
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToDoList() {
    if (this._newToDoListName.trim() !== '')
      this.toDoService.createToDoList(this._newToDoListName);
    this.dialogRef.close();
  }

  onAddToDoListChange(toDoListName: string) {
    this._newToDoListName = toDoListName;
  }
}
