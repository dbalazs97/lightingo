import { LightConfig } from './light-config';
import { LightSoftwareUpdate } from './light-software-update';
import { LightState } from './light-state';
import { LightType } from './light-type';

export interface LightResponse {
	name: string;
	type: LightType;
	state: LightState;
	config: LightConfig;
	modelid: string;
	manufacturername: string;
	productname: string;
	capabilities: Record<string, unknown>;
	swupdate: LightSoftwareUpdate;
	uniqueid: string;
	swversion: string;
}
