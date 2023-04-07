import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [SurveyPageComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    SharedModule,
    DragDropModule,
    MatCardModule,
    ScrollingModule,
  ],
})
export class SurveyModule {}
