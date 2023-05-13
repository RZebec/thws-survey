import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { routes as constRoutes } from './consts/routes';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo([constRoutes.LOGIN.replace('/', '')]);
const redirectLoggedInToDashboard = () =>
  redirectLoggedInTo([constRoutes.TERMS.replace('/', '')]);

const routes: Routes = [
  {
    path: '',
    redirectTo: constRoutes.STEPNAVIGATOR.replace('/', ''),
    pathMatch: 'full',
  },
  {
    path: constRoutes.LOGIN.replace('/', ''),
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [redirectLoggedInToDashboard],
  },
  {
    path: constRoutes.SIGNUP.replace('/', ''),
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
    canActivate: [redirectLoggedInToDashboard],
  },
  {
    path: constRoutes.STEPNAVIGATOR.replace('/', ''),
    loadChildren: () =>
      import('./pages/step-navigator/step-navigator.module').then(
        (m) => m.StepNavigatorModule
      ),
    canActivate: [redirectUnauthorizedToLogin],
  },
  {
    path: constRoutes.SURVEY.replace('/', ''),
    loadChildren: () =>
      import('./pages/survey/survey.module').then((m) => m.SurveyModule),
    canActivate: [redirectUnauthorizedToLogin],
  },
  {
    path: constRoutes.TODO.replace('/', ''),
    loadChildren: () =>
      import('./pages/todo/todo.module').then((m) => m.TodoModule),
    canActivate: [redirectUnauthorizedToLogin],
  },
  {
    path: constRoutes.TERMS.replace('/', ''),
    loadChildren: () =>
      import('./pages/terms/terms.module').then((m) => m.TermsModule),
    canActivate: [redirectUnauthorizedToLogin],
  },
  {
    path: constRoutes.DONE.replace('/', ''),
    loadChildren: () =>
      import('./pages/done/done.module').then((m) => m.DoneModule),
    canActivate: [redirectUnauthorizedToLogin],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
