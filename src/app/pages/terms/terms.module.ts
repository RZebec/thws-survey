import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsPageComponent } from './containers/terms-page/terms-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TermsRoutingModule } from './terms-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TermsModalComponent } from './components/modals/terms-modal/terms-modal.component';

@NgModule({
  declarations: [TermsPageComponent, TermsModalComponent],
  imports: [CommonModule, TermsRoutingModule, SharedModule, MatDialogModule],
})
export class TermsModule {}
