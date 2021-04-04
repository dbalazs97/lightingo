import { TestBed } from '@angular/core/testing';

import { DiscoveredGuard } from './discovered.guard';

describe('DiscoveredGuard', () => {
	let guard: DiscoveredGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(DiscoveredGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
