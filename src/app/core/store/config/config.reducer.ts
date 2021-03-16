import { Action, createReducer, on } from '@ngrx/store';
import { discoverHueBridges, registerApplication, startHueConnection } from './config.actions';

export const configFeatureKey = 'config';

export interface ConfigState {
	appId?: string;
	hueIp?: string;
	name: string;
	linkButtonError: boolean;
	discoverState: 0 | 1 | 2;
	registerState: 0 | 1 | 2;
}

const initialState: ConfigState = {
	appId: localStorage.getItem('hue-app-id') ?? undefined,
	hueIp: localStorage.getItem('hue-ip-address') ?? undefined,
	name: '',
	linkButtonError: false,
	discoverState: 0,
	registerState: 0,
};

export const configReducer = (stateIncoming: ConfigState, actionIncoming: Action) => {
	const reducer = createReducer<ConfigState>(
		initialState,
		on(startHueConnection.success, state => ({ ...state, registerState: 1, discoverState: 1 })),
		on(startHueConnection.error, state => ({ ...state, registerState: 2, discoverState: 2 })),
		on(registerApplication.request, state => ({ ...state, discoverState: 1 })),
		on(registerApplication.success, (state, action) => ({
			...state,
			appId: action.appId,
			registerState: 1,
		})),
		on(registerApplication.error, (state, action) => ({
			...state,
			linkButtonError: action.linkButtonError,
			registerState: 2,
		})),
		on(discoverHueBridges.success, (state, action) => ({ ...state, hueIp: action.ip, discoverState: 1 })),
		on(discoverHueBridges.error, state => ({ ...state, discoverState: 2 })),
	);
	return reducer(stateIncoming, actionIncoming);
};
