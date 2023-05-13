import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepNavigatorPageComponent } from './containers/step-navigator-page/step-navigator-page.component';

const routes: Routes = [{ path: '', component: StepNavigatorPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepNavigatorRoutingModule {}
