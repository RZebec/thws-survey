// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   firebaseConfig: {
//     apiKey: "AIzaSyBa6gaCyKpnn3jkGzuLhHPuMm_ODRe-CVQ",
//     authDomain: "firestarter-demo-3c120.firebaseapp.com",
//     databaseURL: "https://firestarter-demo-3c120.firebaseio.com",
//     projectId: "firestarter-demo-3c120",
//     storageBucket: "firestarter-demo-3c120.appspot.com",
//     messagingSenderId: "943791726198",
//     appId: "1:943791726198:web:0fffe5798c80b34f2bc957"
//   }
// };

export const environment = {
  production: false,
  redirectURLEmailSignIn: 'http://localhost:4200/signUp',
  firebaseConfig: {
    apiKey: 'AIzaSyByJsfEwJEgCNHGkXZR0YhGw4SW2jEOO8U',
    authDomain: 'thws-survey.firebaseapp.com',
    databaseURL:
      'https://thws-survey-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'thws-survey',
    storageBucket: 'thws-survey.appspot.com',
    messagingSenderId: '414975428516',
    appId: '1:414975428516:web:3471586e5df65dd28fa331',
    measurementId: 'G-980S3WK4TT',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
