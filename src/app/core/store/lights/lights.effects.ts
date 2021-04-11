import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HueLightsApiService } from '../../hue-api/hue-lights-api.service';
import { Light } from '../../model/domain/lights/Light';
import { GetLightsResponse } from '../../model/dto/lights/get-lights.response';
import { LightState } from '../../model/dto/lights/light-state';
import { SetLightStateRequest } from '../../model/dto/lights/set-light-state.request';
import { mapToInterval } from '../utils/map-to-interval';
import { getLights, setLightColor, setLightSwitchState } from './lights.actions';
import { LightsState } from './lights.reducer';
import { selectLights } from './lights.selectors';

@Injectable()
export class LightsEffects {
	public getLights$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getLights.request),
			switchMap(() =>
				this.hueLightsApi.getLights().pipe(
					map(result => this.mapLightsToDomain(result)),
					map(lights => getLights.success({ lights })),
				),
			),
		),
	);
	public setLightColor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setLightColor.request),
			withLatestFrom(this.store.select(selectLights)),
			switchMap(([{ id, color }, lights]) => {
				const setStateDto: SetLightStateRequest = {
					on: !lights.find(light => light.id === id)?.switchState ? true : undefined,
					hue: Math.round(mapToInterval(color.h, 0, 360, 0, 65535)),
					sat: Math.round(mapToInterval(color.s, 0, 100, 0, 254)),
					bri: Math.round(mapToInterval(color.b, 0, 100, 0, 254)),
					transitiontime: 0,
				};
				return this.hueLightsApi
					.setLightState(id, setStateDto)
					.pipe(map(() => setLightColor.success({ update: this.mapLightToDomain(id, setStateDto) })));
			}),
		),
	);
	public setLightSwitchState$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setLightSwitchState.request),
			switchMap(({ id, switchState }) =>
				this.hueLightsApi
					.setLightState(id, {
						on: switchState,
					})
					.pipe(
						map(() =>
							setLightSwitchState.success({ update: this.mapLightToDomain(id, { on: switchState }) }),
						),
					),
			),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly hueLightsApi: HueLightsApiService,
		private store: Store<LightsState>,
	) {}

	private mapLightsToDomain(api: GetLightsResponse): Light[] {
		return Object.keys(api).map(key => this.mapLightToDomain(key, api[key].state, api[key].name) as Light);
	}

	private mapLightToDomain(
		id: string,
		state: Partial<LightState> | LightState,
		name?: string,
	): Partial<Light> | Light {
		return {
			id,
			name,
			switchState: state?.on,
			color: {
				h: Math.round(mapToInterval(state?.hue ?? 0, 0, 65535, 0, 360)),
				s: Math.round(mapToInterval(state?.sat ?? 0, 0, 254, 0, 100)),
				b: Math.round(mapToInterval(state?.bri ?? 0, 0, 254, 0, 100)),
			},
		};
	}
}
