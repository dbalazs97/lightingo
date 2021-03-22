import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HueConfigApiService } from '../../hue-api/hue-config-api.service';
import { HueDiscoveryService } from '../../hue-api/hue-discovery.service';
import { discoverHueBridges, registerApplication, startHueConnection } from './config.actions';
import { ConfigState } from './config.reducer';
import { selectConfigAppId, selectConfigHueIp } from './config.selectors';

@Injectable()
export class ConfigEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly configStore: Store<ConfigState>,
		private readonly hueDiscoveryApiService: HueDiscoveryService,
		private readonly hueConfigApiService: HueConfigApiService,
		private readonly router: Router,
	) {}

	public startHueConnection$ = createEffect(() =>
		this.actions$.pipe(
			ofType(startHueConnection.request),
			concatLatestFrom(() => {
				return combineLatest([
					this.configStore.select(selectConfigAppId),
					this.configStore.select(selectConfigHueIp),
				]);
			}),
			switchMap(([, [appId, hueIps]]) => {
				if (!hueIps) {
					return of(discoverHueBridges.request({}));
				} else if (!appId) {
					return of(registerApplication.request({ name: 'lightningo-app' }));
				} else {
					return this.hueConfigApiService.getConfiguration().pipe(
						map(result => {
							if (!!result.whitelist) {
								return startHueConnection.success({ id: appId });
							} else {
								return registerApplication.error({ linkButtonError: false });
							}
						}),
						catchError(() => of(startHueConnection.error({}))),
					);
				}
			}),
		),
	);

	public discoverHueBridges$ = createEffect(() =>
		this.actions$.pipe(
			ofType(discoverHueBridges.request),
			switchMap(() =>
				this.hueDiscoveryApiService.discoverHueBridges().pipe(
					switchMap(result => {
						localStorage.setItem('hue-ip-address', result[0]);
						return of(
							discoverHueBridges.success({ ip: result[0] }),
							registerApplication.request({ name: 'lightningo-app' }),
						);
					}),
					catchError(() => of(discoverHueBridges.error({}))),
				),
			),
		),
	);

	public registerApplication$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerApplication.request),
			concatLatestFrom(() => this.configStore.select(selectConfigAppId)),
			switchMap(([action, appId]) => {
				if (!appId) {
					return this.hueConfigApiService.registerApplication({ devicetype: action.name }).pipe(
						map(result => {
							localStorage.setItem('hue-app-id', result[0].success.username);
							return registerApplication.success({ appId: result[0].success.username });
						}),
						catchError(error =>
							of(
								registerApplication.error({
									linkButtonError:
										error?.error?.description?.includes('link button not pressed') ?? false,
								}),
							),
						),
					);
				} else {
					return of(registerApplication.success({ appId }));
				}
			}),
		),
	);

	public startHueConnectionError$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(discoverHueBridges.error, registerApplication.error, startHueConnection.error),
				switchMap(() => this.router.navigateByUrl('discovery')),
			),
		{ dispatch: false },
	);
}
