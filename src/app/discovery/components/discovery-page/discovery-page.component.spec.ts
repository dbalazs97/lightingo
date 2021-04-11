import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { MockComponent } from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { BehaviorSubject, of } from 'rxjs';

import { DiscoveryPageComponent } from './discovery-page.component';
import { DiscoveryPageService } from './discovery-page.service';

describe('DiscoveryPageComponent', () => {
	let spectator: Spectator<DiscoveryPageComponent>;
	const connectionStateSubject = new BehaviorSubject<[0 | 1 | 2, 0 | 1 | 2, boolean]>([0, 0, false]);
	const discoveryPageServiceSpy: Partial<DiscoveryPageService> = {
		connectionState$: connectionStateSubject.asObservable(),
		pollIfWaitingForLinkButton$: jasmine.createSpy('pollIfWaitingForLinkButton$').and.returnValue(of()),
		tryAgain: jasmine.createSpy('tryAgain'),
	};

	const createComponent = createComponentFactory({
		component: DiscoveryPageComponent,
		declarations: [MockComponent(SvgIconComponent)],
		componentProviders: [
			{
				provide: DiscoveryPageService,
				useValue: discoveryPageServiceSpy,
			},
		],
		imports: [BrowserTestingModule, ButtonModule, InputNumberModule],
	});

	beforeEach(() => {
		spectator = createComponent({ detectChanges: false });
	});

	it('should write loading on initialization', () => {
		connectionStateSubject.next([0, 0, false]);
		spectator.detectChanges();
		expect(spectator.element).toContainText('Loading');
	});

	it('should write successful connect', () => {
		connectionStateSubject.next([1, 1, false]);
		spectator.detectChanges();
		expect(spectator.element).toContainText('Successfully connected to Hue Bridge');
	});

	it('should write can not connect', () => {
		connectionStateSubject.next([1, 2, false]);
		spectator.detectChanges();
		expect(spectator.element).toContainText('Can not connect to Hue Bridge');
	});

	it('should write can not connect', () => {
		connectionStateSubject.next([1, 2, true]);
		spectator.detectChanges();
		expect(spectator.element).toContainText('Setup Hue Bridge');
	});

	it('should write can not connect', () => {
		connectionStateSubject.next([2, 0, false]);
		spectator.detectChanges();
		expect(spectator.element).toContainText('Hue Bridge not found on network');
	});

	it('should dispatch action when button clicked', () => {
		connectionStateSubject.next([1, 2, false]);
		spectator.detectChanges();
		spectator.click('[label="Try again"]');
		spectator.detectChanges();
		expect(discoveryPageServiceSpy.tryAgain).toHaveBeenCalled();
	});
});
