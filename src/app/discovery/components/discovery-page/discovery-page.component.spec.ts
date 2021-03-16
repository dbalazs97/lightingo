import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { Store } from '@ngrx/store';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { skip } from 'rxjs/operators';
import { startHueConnection } from '../../../core/store/config/config.actions';
import { configFeatureKey } from '../../../core/store/config/config.reducer';

import { DiscoveryPageComponent } from './discovery-page.component';

const getStoreState = (linkButtonError: boolean, discoverState: 0 | 1 | 2, registerState: 0 | 1 | 2) => ({
	[configFeatureKey]: {
		discoverState,
		registerState,
		linkButtonError,
	},
});

describe('DiscoveryPageComponent', () => {
	let spectator: Spectator<DiscoveryPageComponent>;
	const createComponent = createComponentFactory({
		component: DiscoveryPageComponent,
		declarations: [MockComponent(SvgIconComponent)],
		providers: [{ provide: Store, useValue: getMockStore({ initialState: getStoreState(false, 0, 0) }) }],
		imports: [BrowserTestingModule, ButtonModule, InputNumberModule],
	});

	let store: MockStore;

	beforeEach(() => {
		spectator = createComponent({ detectChanges: false });
		store = (spectator.inject(Store) as unknown) as MockStore;
	});

	it('should write loading on initialization', () => {
		store.setState(getStoreState(false, 0, 0));
		spectator.detectChanges();
		expect(spectator.element).toContainText('Loading');
	});

	it('should write successful connect', () => {
		store.setState(getStoreState(false, 1, 1));
		store.refreshState();
		spectator.detectChanges();
		expect(spectator.element).toContainText('Successfully connected to Hue Bridge');
	});

	it('should write can not connect', () => {
		store.setState(getStoreState(false, 1, 2));
		store.refreshState();
		spectator.detectChanges();
		expect(spectator.element).toContainText('Can not connect to Hue Bridge');
	});

	it('should write can not connect', () => {
		store.setState(getStoreState(true, 1, 2));
		store.refreshState();
		spectator.detectChanges();
		expect(spectator.element).toContainText('Setup Hue Bridge');
	});

	it('should write can not connect', () => {
		store.setState(getStoreState(false, 2, 0));
		store.refreshState();
		spectator.detectChanges();
		expect(spectator.element).toContainText('Hue Bridge not found on network');
	});

	it('should dispatch action when button clicked', () => {
		store.setState(getStoreState(false, 1, 2));
		store.refreshState();
		spectator.detectChanges();
		store.scannedActions$
			.pipe(skip(1))
			.subscribe(action => expect(action.type).toEqual(startHueConnection.request.type));
		spectator.click('[label="Try again"]');
	});
});
