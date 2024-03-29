import { SignUpModel } from './../../models/signUpModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import {
  Firestore,
  DocumentReference,
  DocumentData,
} from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { SignUpEmailModel } from '../../models/signUpEmailModel';
import { DatabaseService } from 'src/app/services/database.service';
import { TranslateService } from '@ngx-translate/core';
import { routes as constRoutes } from 'src/app/consts';
import { UserDetails } from 'src/app/models/userDetails';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  user!: DocumentReference<DocumentData>;
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;
  public tabIndex = 0;

  constructor(
    private service: AuthService,
    private router: Router,
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private db: Firestore,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.tabIndex = this.translate.currentLang
      ? this.translate.currentLang === 'de'
        ? 1
        : 0
      : 0;
    const userEmail = localStorage.getItem('email');

    if (userEmail) {
      this.service.loginSignInWithEMail(userEmail);
    }

    const userDetailsJSON = localStorage.getItem('userDetails');

    // if (userDetails) this.router.navigateByUrl(constRoutes.DONE);
    if (userDetailsJSON) {
      const userDetails: UserDetails = JSON.parse(userDetailsJSON);

      if (!userDetails.acceptedTerms) {
        this.router.navigateByUrl(this.routers.TERMS);
        return;
      }

      switch (userDetails.step) {
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

  public signInWithGoogle(): void {
    this.service
      .googleLogin()
      .then(async (value: UserCredential) => {
        console.log('Success', value);
        this.openSnackBarSuccess('Success');
        if (!(await this.databaseService.getUserDetails())) {
          await this.databaseService.setUserInformation(value.user.uid);
        }
        this.router.navigateByUrl(this.routers.TERMS);
      })
      .catch((error: any) => {
        console.log('Something went wrong: ', error);
        this.openSnackBarError(error);
      });
  }

  signInGerman() {
    this.translate.use('de');
    this.signInAnonymously();
  }

  signInEnglish() {
    this.translate.use('de');
    this.signInAnonymously();
  }

  public signInAnonymously() {
    this.service
      .loginSignInAnonymously()
      .then(async (value: UserCredential) => {
        console.log('Success', value);
        if (!localStorage.getItem('userId')) {
          this.databaseService.setUserInformation(value.user.uid);
        }
        this.router.navigateByUrl(this.routers.TERMS);
      })
      .catch((error: any) => {
        console.log('Something went wrong: ', error);
        this.openSnackBarError(error);
      });
  }

  public sendLoginForm(credentials: Credentials): void {
    this.service.loginSignInWithEMail(credentials.email);
  }

  public sendSignForm(signUpForm: SignUpModel): void {
    this.signUp(signUpForm);
  }

  public sendSignEmailLinkForm(signUpEmailForm: SignUpEmailModel): void {
    this.service
      .signInWithEmailLink(signUpEmailForm.email)
      .then((data) => {
        this.openSnackBarSuccess('Please use the link in the E-Mail send!');
        localStorage.setItem('email', signUpEmailForm.email);
      })
      .catch((reason) => {
        this.openSnackBarError(reason);
      });
  }

  signUp(signUpForm: SignUpModel) {
    this.service
      .signUp(signUpForm.email, signUpForm.password)
      .then(async (data) => {
        this.loginService.setUser(data.user);
        this.loginService.setUserId(data.user.uid);
        await this.databaseService.setUserInformation(data.user.uid);
        this.openSnackBarSuccess('Success');
        this.onSuccessfulSignUp();
      })
      .catch((e) => {
        this.openSnackBarError(e.message);
      });
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  openSnackBarError(message: string) {
    this.snackBar.open(message, 'Error', { duration: 4000 });
  }

  onSuccessfulSignUp() {
    this.router.navigate(['/dashboard']).then();
  }
}
