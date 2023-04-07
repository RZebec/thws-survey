import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyPageComponent } from './survey-page/survey-page.component';

const routes: Routes = [{ path: '', component: SurveyPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
