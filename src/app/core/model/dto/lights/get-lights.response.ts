import { LightResponse } from './light.response';

export interface GetLightsResponse {
	[id: string]: LightResponse;
}
