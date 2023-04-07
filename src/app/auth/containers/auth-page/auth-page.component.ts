import { SignUpModel } from './../../models/signUpModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import {
  doc,
  Firestore,
  getDoc,
  DocumentReference,
  DocumentData,
  setDoc,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { SignUpEmailModel } from '../../models/signUpEmailModel';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  user!: DocumentReference<DocumentData>;
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    private service: AuthService,
    private router: Router,
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private db: Firestore
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('email');

    if (userEmail) {
      this.service.loginSignInWithEMail(userEmail);
    }
  }

  public signInWithGoogle(): void {
    this.service
      .googleLogin()
      .then(async (value: UserCredential) => {
        console.log('Success', value);
        this.openSnackBarSuccess('Success');
        if (!(await this.databaseService.getUserDetails())) {
          this.databaseService.setUserInformation(
            value.user.uid,
            value.user.email!
          );
        }
        this.router.navigateByUrl(this.routers.SURVEY);
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
      .then((data) => {
        this.loginService.setUser(data.user);
        this.loginService.setUserId(data.user.uid);
        this.databaseService.setUserInformation(
          data.user.uid,
          signUpForm.email
        );
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
