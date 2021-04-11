import { Action, createReducer, on } from '@ngrx/store';
import { HSBColor } from '../../model/domain/HSBColor';
import { Light } from '../../model/domain/lights/Light';
import { getLights, setLightColor, setLightSwitchState } from './lights.actions';

export const lightsFeatureKey = 'lights';

export interface LightsState {
	lights: Light[];
}

const initialState: LightsState = {
	lights: [],
};

export const lightsReducer = (stateIncoming: LightsState, actionIncoming: Action) => {
	const reducer = createReducer<LightsState>(
		initialState,
		on(getLights.success, (state, action) => ({ ...state, lights: action.lights })),
		on(setLightSwitchState.success, (state, action) => {
			const lights = state.lights.slice();
			const index = lights.findIndex(light => light.id === action.update.id);
			lights.splice(index, 1, { ...lights[index], switchState: action.update.switchState ?? true });
			return { ...state, lights };
		}),
		on(setLightColor.success, (state, action) => {
			const lights = state.lights.slice();
			const index = lights.findIndex(light => light.id === action.update.id);
			lights.splice(index, 1, { ...lights[index], switchState: true, color: action.update.color as HSBColor });
			return { ...state, lights };
		}),
	);

	return reducer(stateIncoming, actionIncoming);
};
