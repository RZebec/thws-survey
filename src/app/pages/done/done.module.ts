import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonePageComponent } from './containers/done-page/done-page.component';
import { DoneRoutingModule } from './done-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DonePageComponent],
  imports: [
    CommonModule,
    DoneRoutingModule,
    MatCardModule,
    SharedModule,
    TranslateModule,
  ],
})
export class DoneModule {}
