import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyPageComponent {
  constructor() {}

  board: Board = {
    name: 'Test Board',
    columns: [
      {
        name: 'Ideas',
        tasks: [
          'Some random idea',
          'This is another random idea',
          'build an awesome application',
        ],
      },
      {
        name: 'Research',
        tasks: ['Lorem ipsum', 'foo', "This was in the 'Research' column"],
      },
      {
        name: 'Todo',
        tasks: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
      },
      {
        name: 'Done',
        tasks: [
          'Get up',
          'Brush teeth',
          'Take a shower',
          'Check e-mail',
          'Walk dog',
        ],
      },
    ],
  };

  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
