import { AuthService } from './../../../../services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { authState, User } from '@angular/fire/auth';
import { routes } from 'src/app/consts/routes';
import { DatabaseService } from 'src/app/services/database.service';
import { UserDetails } from 'src/app/models/userDetails';
import { TranslateService } from '@ngx-translate/core';

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

  selectedLang;

  public user!: UserDetails;
  public routers: typeof routes = routes;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.loadUser();
    this.selectedLang = translate.currentLang;
  }

  public async loadUser() {
    this.user = this.databaseService.getUserDetails();
  }

  switchLang() {
    this.selectedLang = this.selectedLang === 'en' ? 'de' : 'en';
    this.translate.use(this.selectedLang);
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.authService.logout();
  }
}
