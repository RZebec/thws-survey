import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { routes } from 'src/app/consts';

@Component({
  selector: 'app-step-navigator-page',
  templateUrl: './step-navigator-page.component.html',
  styleUrls: ['./step-navigator-page.component.scss'],
})
export class StepNavigatorPageComponent {
  public routers: typeof routes = routes;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    const user = this.databaseService.getUserDetails();

    console.log(user);

    if (!user.acceptedTerms) {
      this.router.navigateByUrl(this.routers.TERMS);
      return;
    }

    switch (user.step) {
      case 0:
        this.router.navigateByUrl(this.routers.TERMS);
        return;
      case 1:
        this.router.navigateByUrl(this.routers.TODO);
        return;
      case 2:
        this.router.navigateByUrl(this.routers.SURVEY);
        return;
      case 3:
        this.router.navigateByUrl(this.routers.DONE);
        return;
      default:
        this.router.navigateByUrl(this.routers.TERMS);
    }
  }
}
