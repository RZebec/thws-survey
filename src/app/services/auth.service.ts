import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  AuthProvider,
  UserCredential,
  signInAnonymously,
  signInWithEmailLink,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
} from '@angular/fire/auth';
import { routes } from '../consts/routes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public routers: typeof routes = routes;

  constructor(private afAuth: Auth, private router: Router) {}

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  loginSignInAnonymously(): Promise<UserCredential> {
    return signInAnonymously(this.afAuth);
  }

  loginSignInWithEMail(email: string): Promise<UserCredential> {
    return signInWithEmailLink(this.afAuth, email);
  }

  signInWithEmailLink(email: string) {
    return sendSignInLinkToEmail(this.afAuth, email, {
      url: environment.redirectURLEmailSignIn,
      handleCodeInApp: true,
    }).then(() => localStorage.setItem('email', email));
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  googleLogin(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  private oAuthLogin(provider: AuthProvider) {
    return signInWithPopup(this.afAuth, provider);
  }
}
