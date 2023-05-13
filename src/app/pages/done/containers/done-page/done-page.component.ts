import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-done-page',
  templateUrl: './done-page.component.html',
  styleUrls: ['./done-page.component.scss'],
})
export class DonePageComponent {
  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.updateUserSurveyTime();
  }
}
