import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss'],
})
export class TodoListFormComponent {
  @Output() toDoListChange = new EventEmitter<string>();

  task: FormControl = new FormControl();

  private unsubscribe = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.task.valueChanges
      .pipe(debounceTime(200), takeUntil(this.unsubscribe))
      .subscribe((value) => this.toDoListChange.emit(value));
  }
}
