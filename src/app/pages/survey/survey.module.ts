import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SurveyPageComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    SharedModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    ScrollingModule,
  ],
})
export class SurveyModule {}
