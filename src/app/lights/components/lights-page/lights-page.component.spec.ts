import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightsPageComponent } from './lights-page.component';

describe('LightsPageComponent', () => {
	let component: LightsPageComponent;
	let fixture: ComponentFixture<LightsPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LightsPageComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LightsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
