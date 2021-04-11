import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HSBColor } from '../../../core/model/domain/HSBColor';
import { Light } from '../../../core/model/domain/lights/Light';
import { setLightColor, setLightSwitchState } from '../../../core/store/lights/lights.actions';
import { LightsState } from '../../../core/store/lights/lights.reducer';

@Injectable()
export class LightItemService implements OnDestroy {
	public form = new FormGroup({
		color: new FormControl({ h: 0, s: 0, b: 0 }),
		switch: new FormControl(false),
	});
	public destroyed$ = new Subject();

	constructor(private readonly store: Store<LightsState>) {}

	public loadPage(light: Light): void {
		this.form.setValue({
			color: light.color,
			switch: light.switchState,
		});

		this.form
			.get('color')
			?.valueChanges.pipe(
				takeUntil(this.destroyed$),
				debounceTime(200),
				distinctUntilChanged((a: HSBColor, b: HSBColor) => a.h === b.h && a.s === b.s && a.b === b.b),
			)
			.subscribe(color => {
				this.form.get('switch')?.setValue(true);
				this.store.dispatch(setLightColor.request({ id: light.id, color }));
			});

		this.form
			.get('switch')
			?.valueChanges.pipe(takeUntil(this.destroyed$), debounceTime(200), distinctUntilChanged())
			.subscribe(switchState => this.store.dispatch(setLightSwitchState.request({ id: light.id, switchState })));
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
