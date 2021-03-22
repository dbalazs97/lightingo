import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { philipsAssetsIcons } from '../assets/svg/philips-assets';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		SharedModule,
		CardModule,
		SvgIconsModule.forRoot({
			icons: philipsAssetsIcons,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
