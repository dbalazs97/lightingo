export interface ConfigSoftwareUpdate {
	checkforupdate: boolean;
	devicetypes: Record<string, unknown>;
	updatestate: 0 | 1 | 2 | 3;
	url: string;
	text: string;
	notify: boolean;
}
