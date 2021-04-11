import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { philipsAssetsIcons } from '../assets/svg/philips-assets';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { startHueConnection } from './core/store/config/config.actions';
import { ConfigState } from './core/store/config/config.reducer';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		SharedModule,
		CardModule,
		BrowserAnimationsModule,
		SvgIconsModule.forRoot({
			icons: philipsAssetsIcons,
		}),
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: (store: Store<ConfigState>) => () => store.dispatch(startHueConnection.request({})),
			deps: [Store],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
