import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root',
})
export class StepGuardGuard {
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
  > {
    const user = await this.databaseService.getUserDetails();

    if (!user) this.router.navigateByUrl('/login');

    if (!user.acceptedTerms) {
      this.router.navigateByUrl('/terms');
      return false;
    }

    switch (user.step) {
      case 0:
        this.router.navigateByUrl('/terms');
        return true;
      case 1:
        this.router.navigateByUrl('/todo');
        return true;
      case 2:
        this.router.navigateByUrl('/survey');
        return true;
      case 3:
        this.router.navigateByUrl('/done');
        return true;
      default:
        this.router.navigateByUrl('/terms');
        return true;
    }

    return true;
  }
}
