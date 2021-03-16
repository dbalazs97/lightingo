import {
	HttpErrorResponse,
	HttpEvent,
	HttpEventType,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigState } from '../store/config/config.reducer';
import { selectConfigAppId, selectConfigHueIp } from '../store/config/config.selectors';

@Injectable()
export class HueApiBaseUrlInterceptor implements HttpInterceptor {
	constructor(private configStore: Store<ConfigState>) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return combineLatest([
			this.configStore.select(selectConfigHueIp),
			this.configStore.select(selectConfigAppId),
		]).pipe(
			switchMap(([ip, appId]) => {
				return next
					.handle(
						request.clone({
							url: request.url.startsWith('hue:')
								? request.url.replace('hue:', `${ip}/api`).replace('{user}', `${appId}`)
								: request.url,
						}),
					)
					.pipe(
						map(e => {
							if (request.url.startsWith('hue:') && e.type === HttpEventType.Response) {
								if (e.body[0]?.error) {
									throw new HttpErrorResponse({
										status: 500,
										statusText: 'Simulated error',
										error: e.body[0].error,
									});
								} else {
									return e;
								}
							} else {
								return e;
							}
						}),
					);
			}),
		);
	}
}
