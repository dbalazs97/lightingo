import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { SuccessResponse } from '../model/dto/base/base.response';
import { SetLightStateRequest } from '../model/dto/lights/set-light-state.request';
import { HueLightsApiService } from './hue-lights-api.service';

describe('HueLightsApiService', () => {
	let spectator: SpectatorHttp<HueLightsApiService>;
	const createService = createHttpFactory(HueLightsApiService);

	beforeEach(() => (spectator = createService()));

	it('should get lights', () => {
		spectator.service.getLights().subscribe();
		spectator.expectOne('hue:/{user}/lights', HttpMethod.GET);
	});

	it('should get configuration', () => {
		const testId = '1';
		const dto: SetLightStateRequest = {};
		const testResult: SuccessResponse<string, number | boolean> = { success: { test: 0 } };

		spectator.service.setLightState(testId, dto).subscribe(result => expect(result).toBe(testResult));
		spectator.expectOne(`hue:/{user}/lights/${testId}/state`, HttpMethod.PUT).flush(testResult);
	});
});
