import { fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { take } from 'rxjs/operators';
import { configFeatureKey } from '../store/config/config.reducer';

import { DiscoveredGuard } from './discovered.guard';

const getStoreState = (linkButtonError: boolean, discoverState: 0 | 1 | 2, registerState: 0 | 1 | 2) => ({
	[configFeatureKey]: {
		discoverState,
		registerState,
		linkButtonError,
	},
});

describe('DiscoveredGuard', () => {
	let spectator: SpectatorService<DiscoveredGuard>;
	const createService = createServiceFactory({
		service: DiscoveredGuard,
		providers: [{ provide: Store, useValue: getMockStore({ initialState: getStoreState(false, 0, 0) }) }],
		imports: [RouterTestingModule.withRoutes([{ path: 'discovery', redirectTo: '' }])],
	});
	let store: MockStore;

	beforeEach(() => {
		spectator = createService();
		store = (spectator.inject(Store) as unknown) as MockStore;
	});

	([
		[0, 0, null],
		[0, 1, null],
		[0, 2, null],
		[1, 0, null],
		[1, 1, true],
		[1, 2, false],
		[2, 0, null],
		[2, 1, false],
		[2, 2, false],
	] as Array<[0 | 1 | 2, 0 | 1 | 2, boolean]>).map(([discovery, register, canActivate]) => {
		it(`should guard route with discovery ${discovery} and register ${register}`, fakeAsync(() => {
			store.setState(getStoreState(false, discovery, register));
			if (canActivate !== null) {
				spectator.service
					.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
					.pipe(take(1))
					.subscribe(value => expect(value).toBe(canActivate));
			} else {
				let result;
				spectator.service
					.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
					.subscribe(activate => (result = activate));
				tick();
				expect(result).toBeUndefined();
			}
		}));
	});
});
