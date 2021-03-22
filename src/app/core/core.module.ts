import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { HueApiBaseUrlInterceptor } from './interceptor/hue-api-base-url.interceptor';
import { ConfigEffects } from './store/config/config.effects';
import { configFeatureKey, configReducer } from './store/config/config.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		StoreModule.forRoot({}),
		StoreModule.forFeature(configFeatureKey, configReducer),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),
		EffectsModule.forRoot([]),
		EffectsModule.forFeature([ConfigEffects]),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HueApiBaseUrlInterceptor,
			multi: true,
		},
	],
})
export class CoreModule {
	constructor(@SkipSelf() @Optional() core: CoreModule) {
		if (core) {
			throw new Error('Core module should be imported only in AppModule!');
		}
	}
}
