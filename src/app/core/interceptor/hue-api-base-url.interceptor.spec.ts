import { HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BaseResponse, ErrorResponse } from '../model/dto/base/base.response';
import { configFeatureKey } from '../store/config/config.reducer';

import { HueApiBaseUrlInterceptor } from './hue-api-base-url.interceptor';

describe('HueApiBaseUrlInterceptor', () => {
	let store: MockStore;
	let spectator: SpectatorService<HueApiBaseUrlInterceptor>;
	const createService = createServiceFactory({
		service: HueApiBaseUrlInterceptor,
		providers: [{ provide: Store, useValue: getMockStore({}) }],
	});

	const hueRequest = new HttpRequest('GET', 'hue:/lights');
	const httpsRequest = new HttpRequest('GET', 'https://lights');
	const mockSuccessResponse: BaseResponse<'test', number> = [{ success: { test: 3 } }];
	const mockErrorResponse: ErrorResponse[] = [{ error: { address: 'test', description: 'test', type: 'test' } }];
	const mockIp = 'http://192.168.0.88';
	const mockAppIp = 'ndz34f457hf3rt4oke4fsr4n6458';

	const httpHandler: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj('HttpHandler', ['handle']);

	beforeEach(() => {
		spectator = createService();
		store = (spectator.inject(Store) as unknown) as MockStore;
	});

	it('should not touch urls that not start with hue', () => {
		httpHandler.handle.and.callFake(req => {
			expect(req.url).toBe(httpsRequest.url);
			return of(new HttpResponse({ body: mockSuccessResponse }));
		});
		spectator.service
			.intercept(httpsRequest, httpHandler)
			.subscribe(result => expect((result as HttpResponse<any>).body).toEqual(mockSuccessResponse));
	});

	it('should replace urls that start with hue given ip and appid', () => {
		store.setState({
			[configFeatureKey]: {
				hueIp: mockIp,
				appId: mockAppIp,
			},
		});

		httpHandler.handle.and.callFake(req => {
			expect(req.url).toBe(`${mockIp}/api${hueRequest.url.split(':')[1]}`);
			return of(new HttpResponse({ body: mockSuccessResponse }));
		});
		spectator.service
			.intercept(hueRequest, httpHandler)
			.subscribe(result => expect((result as HttpResponse<any>).body).toEqual(mockSuccessResponse));
	});

	it('should translate error body to http error', () => {
		store.setState({
			[configFeatureKey]: {
				hueIp: mockIp,
				appId: mockAppIp,
			},
		});

		httpHandler.handle.and.callFake(req => {
			expect(req.url).toBe(`${mockIp}/api${hueRequest.url.split(':')[1]}`);
			return of(new HttpResponse({ body: mockErrorResponse }));
		});
		spectator.service.intercept(hueRequest, httpHandler).subscribe({
			error(error: HttpErrorResponse): void {
				expect(error.error).toEqual(mockErrorResponse[0].error);
				expect(error.status).toBe(500);
			},
		});
	});
});
