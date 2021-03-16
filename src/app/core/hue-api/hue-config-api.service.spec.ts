import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { HueConfigApiService } from './hue-config-api.service';

describe('HueConfigApiService', () => {
	let spectator: SpectatorHttp<HueConfigApiService>;
	const createService = createHttpFactory(HueConfigApiService);

	beforeEach(() => (spectator = createService()));

	it('should register application', () => {
		spectator.service.registerApplication({ devicetype: 'any' }).subscribe();
		spectator.expectOne('hue:/', HttpMethod.POST);
	});

	it('should get configuration', () => {
		spectator.service.getConfiguration().subscribe();
		spectator.expectOne('hue:/{user}/config', HttpMethod.GET);
	});
});
