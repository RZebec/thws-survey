import { AuthService } from './../../../../services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { authState, User } from '@angular/fire/auth';
import { routes } from 'src/app/consts/routes';
import { DatabaseService } from 'src/app/services/database.service';
import { UserDetails } from 'src/app/models/userDetails';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  title: string = '';

  @Input()
  isMenuOpened: boolean = false;

  @Output() isShowSidebar = new EventEmitter<boolean>();

  public user!: UserDetails;
  public routers: typeof routes = routes;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.loadUser();
  }

  public async loadUser() {
    this.user = await this.databaseService.getUserDetails();
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.authService.logout();
  }
}
