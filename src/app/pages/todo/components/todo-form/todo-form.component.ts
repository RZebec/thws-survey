import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ToDo } from '../../models/todo-model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnDestroy, OnInit {
  @Output() toDoChange = new EventEmitter<string>();

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
      .subscribe((value) => this.toDoChange.emit(value));
  }
}
