import { ConfigState } from './config/config.reducer';
import { LightsState } from './lights/lights.reducer';

export interface AppState {
	config: ConfigState;
	lights: LightsState;
}
