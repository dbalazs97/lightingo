import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineScreenComponent } from './routine-screen.component';

describe('RoutineScreenComponent', () => {
	let component: RoutineScreenComponent;
	let fixture: ComponentFixture<RoutineScreenComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RoutineScreenComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RoutineScreenComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
