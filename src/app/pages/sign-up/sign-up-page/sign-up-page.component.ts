import { Component, OnInit } from '@angular/core';
import { doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { routes } from 'src/app/consts/routes';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  constructor(
    private service: AuthService,
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    const signInEmail = localStorage.getItem('email');

    if (signInEmail) {
      this.service
        .loginSignInWithEMail(signInEmail)
        .then((user: UserCredential) => {
          this.databaseService.setUserInformation(user.user.uid);
          this.router.navigateByUrl(routes.TODO);
        });
    }
  }
}
