export interface LightState {
	on: boolean;
	bri: number;
	hue: number;
	sat: number;
	effect: 'none' | 'colorloop';
	xy: [number, number];
	ct: number;
	alert: 'none' | 'select' | 'lselect';
	colormode: 'xy' | 'hs' | 'ct';
	reachable: boolean;
}
