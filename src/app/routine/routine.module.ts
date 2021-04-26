import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { RoutineScreenComponent } from './components/routine-screen/routine-screen.component';
import { RoutineRoutingModule } from './routine-routing.module';

@NgModule({
	declarations: [RoutineScreenComponent],
	imports: [
		CommonModule,
		RoutineRoutingModule,
		DropdownModule,
		CardModule,
		CalendarModule,
		FormsModule,
		DividerModule,
		SvgIconsModule,
		ColorPickerModule,
	],
})
export class RoutineModule {}
