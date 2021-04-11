import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { getLights } from '../../../core/store/lights/lights.actions';
import { LightsState } from '../../../core/store/lights/lights.reducer';
import { selectLights } from '../../../core/store/lights/lights.selectors';

@Injectable()
export class LightsPageService implements OnDestroy {
	public destroyed$ = new Subject();
	public lights$ = this.store.select(selectLights);

	constructor(private readonly store: Store<LightsState>) {}

	public loadPage(): void {
		this.store.dispatch(getLights.request({}));
		this.pollLightState();
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private pollLightState(): void {
		this.store.dispatch(getLights.request({}));
		interval(10000)
			.pipe(
				takeUntil(this.destroyed$),
				tap(() => this.store.dispatch(getLights.request({}))),
			)
			.subscribe();
	}
}
