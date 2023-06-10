import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collectionSnapshots,
  getDocs,
} from '@angular/fire/firestore';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterState,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { collection } from 'firebase/firestore';
import { UserDetails } from './models/userDetails';
import { Survey } from './pages/survey/survey-page/survey-page.component';
import { AnalyticsEvent } from './pages/todo/models/analyticsEvent';
import { Analytics } from '@angular/fire/analytics';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkMode = false;

  @HostBinding('class') className = '';

  constructor(
    private afAuth: Auth,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private overlayContainer: OverlayContainer,
    private db: Firestore
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

      if (t && (t == 'd' || t == 'l')) {
        localStorage.setItem('t', t);
      }

      const localStorageID = localStorage.getItem('t');

      if (localStorageID && localStorageID === 'd') {
        this.darkMode = true;
      } else if (localStorageID && localStorageID === 'l') {
        this.darkMode = false;
      } else {
        this.darkMode = Math.random() < 0.5;
      }

      localStorage.setItem('t', this.darkMode ? 'd' : 'l');

      this.className = this.darkMode ? 'darkMode' : '';

      if (this.darkMode) {
        document.body.className =
          document.body.className + ' darkModeBackground';
        this.overlayContainer.getContainerElement().classList.add('darkMode');
      }
    });

    this.getAllFirebaseDocs();
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

  async getAllFirebaseDocs() {
    const usersRef = collection(this.db, 'users/');
    const users = await getDocs(usersRef);

    const output: {
      userDetails: any;
      events: any;
      surveys: { name: string; survey: Survey[] }[];
    }[] = new Array();

    const outputCleaned: {
      userDetails: any;
      events: any;
      surveys: any;
    }[] = new Array();

    // users.forEach(async (doc) => {
    for (const doc of users.docs) {
      const user = {
        userDetails: doc.data(),
        events: new Array(),
        surveys: new Array(),
      };

      const userCleaned = {
        userDetails: doc.data(),
        events: {},
        surveys: {},
      };

      const eventsRef = collection(this.db, 'users/' + doc.id + '/events');
      const events = await getDocs(eventsRef);

      // events.forEach(async (event) => user.events.push(event.data()));
      // setTimeout(() => { }, 10000);

      const eventsCleaned = new Array();

      for (const event of events.docs) {
        user.events.push(event.data());

        eventsCleaned.push(event.data());
      }

      userCleaned.events =
        this.groupAndAverageEventsByProperties(eventsCleaned);

      const surveyRef = collection(this.db, 'users/' + doc.id + '/surveys');
      const surveys = await getDocs(surveyRef);

      // survey.forEach(async (s) => user.survey.push(s.data()));
      // setTimeout(() => {}, 10000);

      const surveysCleaned = new Array<Survey>();

      for (const survey of surveys.docs) {
        const surveyDetails: { name: string; survey: Survey[] } = JSON.parse(
          JSON.stringify(survey.data())
        );
        for (const s of surveyDetails.survey) {
          surveysCleaned.push(s);

          s.question = this.translate.instant(s.question);

          if (s.hint) s.hint = this.translate.instant(s.hint);
        }

        user.surveys.push(surveyDetails);
        // userCleaned.surveys.push(surveyDetails);
      }

      userCleaned.surveys =
        this.groupAndAverageSurveyByProperties(surveysCleaned);

      output.push(user);
      outputCleaned.push(userCleaned);

      // console.log(user);
    }

    //console.log(JSON.stringify(output));

    // Convert the JSON object to a string
    const jsonString = JSON.stringify(output, null, 2);

    console.log(jsonString);

    const jsonStringCleaned = JSON.stringify(outputCleaned, null, 2);

    console.log(jsonStringCleaned);

    const jsonStringCleanedOnlyFinished = JSON.stringify(
      outputCleaned.filter((u) => u.userDetails.step === 3),
      null,
      2
    );

    console.log(jsonStringCleanedOnlyFinished);

    console.log(`Total Users: ${output.length}`);

    console.log(
      `Finished Users: ${output.filter((o) => o.userDetails.step === 3).length}`
    );

    console.log(
      `Dark Mode Finished Users: ${
        output.filter((o) => o.userDetails.step === 3 && o.userDetails.darkMode)
          .length
      }`
    );

    console.log(
      `Light Mode Finished Users: ${
        output.filter(
          (o) => o.userDetails.step === 3 && !o.userDetails.darkMode
        ).length
      }`
    );

    console.log(
      `Users with events: ${
        output.filter((o) => o.events && o.events.length > 0).length
      }`
    );

    console.log(
      `Dark Mode Event Users: ${
        output.filter(
          (o) => o.events && o.events.length > 0 && o.userDetails.darkMode
        ).length
      }`
    );

    console.log(
      `Light Mode Event Users: ${
        output.filter(
          (o) => o.events && o.events.length > 0 && !o.userDetails.darkMode
        ).length
      }`
    );
  }

  groupAndAverageEventsByProperties(
    objects: AnalyticsEvent[]
  ): Record<string, number> {
    // const events: AnalyticsEvent[] = new Array<AnalyticsEvent>();

    const result: Record<string, number> = {};

    const tempResult: Record<string, number[]> = {};

    for (const obj of objects) {
      const { event_category, event_label, event_measured_time } = obj;

      const key = `${event_category}-${event_label}`;

      if (!tempResult[key]) {
        tempResult[key] = [];
      }

      tempResult[key].push(event_measured_time);
    }

    for (const key in tempResult) {
      const times = tempResult[key];
      const average = times.reduce((sum, time) => sum + time, 0) / times.length;
      result[key] = average;
    }

    return result;
  }

  groupAndAverageSurveyByProperties(objects: Survey[]): Record<string, string> {
    // const events: AnalyticsEvent[] = new Array<AnalyticsEvent>();

    const result: Record<string, string> = {};

    const tempResult: Record<string, string> = {};

    for (const obj of objects) {
      const { question, numericValue, textValue, selectValue } = obj;

      const key = `${question}`;

      if (!tempResult[key]) {
        tempResult[key] = '';
      }

      if (numericValue) tempResult[key] = numericValue.toString();
      else if (textValue) tempResult[key] = textValue;
      else if (selectValue) tempResult[key] = selectValue;
    }

    // for (const key in tempResult) {
    //   const times = tempResult[key];
    //   const average = times.reduce((sum, time) => sum + time, 0) / times.length;
    //   result[key] = average;
    // }

    return tempResult;
  }
}
