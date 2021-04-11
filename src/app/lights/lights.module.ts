import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LightsEffects } from '../core/store/lights/lights.effects';
import { lightsFeatureKey, lightsReducer } from '../core/store/lights/lights.reducer';
import { SharedModule } from '../shared/shared.module';
import { LightItemComponent } from './components/light-item/light-item.component';
import { LightsPageComponent } from './components/lights-page/lights-page.component';
import { LightsRoutingModule } from './lights-routing.module';

@NgModule({
	declarations: [LightsPageComponent, LightItemComponent],
	imports: [
		CommonModule,
		SharedModule,
		AccordionModule,
		LightsRoutingModule,
		InputSwitchModule,
		ColorPickerModule,
		FormsModule,
		ButtonModule,
		StoreModule.forFeature(lightsFeatureKey, lightsReducer),
		EffectsModule.forFeature([LightsEffects]),
		ReactiveFormsModule,
	],
})
export class LightsModule {}
