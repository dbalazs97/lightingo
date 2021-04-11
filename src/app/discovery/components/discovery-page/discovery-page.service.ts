import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { startHueConnection } from '../../../core/store/config/config.actions';
import { ConfigState } from '../../../core/store/config/config.reducer';
import {
	selectConfigDiscoveryState,
	selectConfigLinkButtonErrorState,
	selectConfigRegisterState,
} from '../../../core/store/config/config.selectors';

@Injectable()
export class DiscoveryPageService {
	public connectionState$ = combineLatest([
		this.store.select(selectConfigDiscoveryState),
		this.store.select(selectConfigRegisterState),
		this.store.select(selectConfigLinkButtonErrorState),
	]);

	constructor(private readonly store: Store<ConfigState>) {}

	public pollIfWaitingForLinkButton$(): Observable<unknown> {
		return this.connectionState$.pipe(
			switchMap(([_, register, linkButton]) => {
				if (register === 2 && linkButton) {
					return interval(1000).pipe(tap(() => this.store.dispatch(startHueConnection.request({}))));
				} else {
					return of();
				}
			}),
		);
	}

	public tryAgain(): void {
		this.store.dispatch(startHueConnection.request({}));
	}
}
