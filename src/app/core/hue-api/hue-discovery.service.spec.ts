import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { HueDiscoveryResponse } from '../model/dto/config/hue-discovery.response';
import { HueDiscoveryService } from './hue-discovery.service';

describe('HueDiscoveryService', () => {
	let spectator: SpectatorHttp<HueDiscoveryService>;
	const createService = createHttpFactory(HueDiscoveryService);

	beforeEach(() => (spectator = createService()));

	it('should get IP from meet hue', () => {
		const testIP = '192.168.0.88';
		spectator.service.discoverHueBridges().subscribe(value => expect(value).toEqual([`http://${testIP}`]));
		spectator
			.expectOne('https://discovery.meethue.com/', HttpMethod.GET)
			.flush([{ id: '', internalipaddress: testIP }] as HueDiscoveryResponse);
	});

	it('should get IP from discovery', () => {
		const testIP = '192.168.0.88';
		spectator.service.discoverHueBridges().subscribe(value => expect(value).toEqual([`http://${testIP}`]));
		spectator.expectOne('https://discovery.meethue.com/', HttpMethod.GET).error(new ErrorEvent('Http Error'));
		for (let i = 0; i < 16; i++) {
			const requests = spectator.expectConcurrent(
				Array.from({ length: 16 }).map((_, index) => ({
					url: `http://192.168.0.${i * 16 + index}/api/config`,
					method: HttpMethod.HEAD,
				})),
			);

			requests.forEach(req => {
				if (req.request.url.includes(testIP)) {
					req.flush({});
				} else {
					req.error(new ErrorEvent('Http Error'));
				}
			});
		}
	});
});
