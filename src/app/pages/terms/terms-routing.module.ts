import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsPageComponent } from './containers/terms-page/terms-page.component';

const routes: Routes = [{ path: '', component: TermsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsRoutingModule {}
