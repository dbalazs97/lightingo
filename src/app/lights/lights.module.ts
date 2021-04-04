import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LightsPageComponent } from './components/lights-page/lights-page.component';

@NgModule({
	declarations: [LightsPageComponent],
	imports: [CommonModule, SharedModule],
})
export class LightsModule {}
