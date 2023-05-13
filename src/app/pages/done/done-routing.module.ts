import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonePageComponent } from './containers/done-page/done-page.component';

const routes: Routes = [{ path: '', component: DonePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoneRoutingModule {}
