import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule as PrimeShared } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [ToolbarComponent],
	imports: [CommonModule, MenubarModule, PrimeShared, SvgIconsModule],
	exports: [ToolbarComponent],
})
export class SharedModule {}
