import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterState,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkMode = false;

  constructor(
    private afAuth: Auth,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private overlayContainer: OverlayContainer
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    translate.addLangs(['de']);

    const browserLang = translate.getBrowserLang();
    if (browserLang !== undefined)
      translate.use(browserLang.match(/en|de/) ? browserLang : 'en');

    console.log(browserLang);

    onAuthStateChanged(this.afAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // localStorage.setItem('userId', uid);
        // ...

        console.log('New UID: ' + uid);
      } else {
        // localStorage.setItem('userId', '');
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const t = params['t'];

      if (t) {
        localStorage.setItem('t', t);
        this.darkMode = t ? t === 'd' : false;
      } else {
        const localStorageID = localStorage.getItem('t');

        if (localStorageID && localStorageID === 'd') {
          this.darkMode = true;
        }

        if (this.darkMode) {
          this.overlayContainer.getContainerElement().classList.add('darkMode');
        }
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }
}
