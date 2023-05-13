import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepNavigatorPageComponent } from './containers/step-navigator-page/step-navigator-page.component';
import { StepNavigatorRoutingModule } from './step-navigator-routing.module';

@NgModule({
  declarations: [StepNavigatorPageComponent],
  imports: [CommonModule, StepNavigatorRoutingModule],
})
export class StepNavigatorModule {}
