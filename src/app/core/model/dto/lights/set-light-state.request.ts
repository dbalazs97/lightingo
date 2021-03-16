import { LightState } from './light-state';

export interface SetLightStateRequest extends Partial<Omit<LightState, 'colormode' | 'reachable'>> {
	transitiontime?: number;
	bri_inc?: number;
	sat_inc?: number;
	hue_inc?: number;
	ct_inc?: number;
	xy_inc?: [number, number];
}
