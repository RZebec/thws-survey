import { Component, Input } from '@angular/core';
import { ToDo, ToDoList } from '../../models/todo-model';
import { TutorialToDoList } from '../../models/tutorialToDos';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { routes as constRoutes } from '../../../../consts/routes';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {
  @Input()
  toDoList!: ToDoList;

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  getDateColor(date: number): string {
    const dateNow = new Date(new Date(Date.now()).toDateString()).getTime();
    const toDoDate = new Date(new Date(date).toDateString()).getTime();

    if (dateNow > toDoDate) return 'red';
    if (dateNow < toDoDate) return 'green';

    return 'orange';
  }

  getCompleteCount(toDos: ToDo[]): number {
    return toDos.filter((t) => t.complete).length;
  }

  updateToDosInList(toDos: ToDo[]) {
    this.toDoList.todos = toDos;
  }

  deleteButtonCondition(): boolean {
    return !(
      this.toDoList.todos.filter((t) => t.complete).length >=
      this.toDoList.todos.length - 1
    );
  }

  deleteTutorial() {
    this.databaseService.updateUserStep(2);
    this.router.navigateByUrl(constRoutes.STEPNAVIGATOR);
  }
}
