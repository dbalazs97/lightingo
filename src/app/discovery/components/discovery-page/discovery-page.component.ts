import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, interval, of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { startHueConnection } from '../../../core/store/config/config.actions';
import { ConfigState } from '../../../core/store/config/config.reducer';
import {
	selectConfigDiscoveryState,
	selectConfigLinkButtonErrorState,
	selectConfigRegisterState,
} from '../../../core/store/config/config.selectors';

@Component({
	selector: 'ltg-discovery-page',
	templateUrl: './discovery-page.component.html',
	styleUrls: ['./discovery-page.component.scss'],
})
export class DiscoveryPageComponent implements OnInit, OnDestroy {
	private readonly subscription = new Subscription();

	public connectionState$ = combineLatest([
		this.store.select(selectConfigDiscoveryState),
		this.store.select(selectConfigRegisterState),
		this.store.select(selectConfigLinkButtonErrorState),
	]);

	constructor(private readonly store: Store<ConfigState>) {}

	public ngOnInit(): void {
		this.subscription.add(
			this.connectionState$
				.pipe(
					switchMap(([_, register, linkButton]) => {
						if (register === 2 && linkButton) {
							return interval(1000).pipe(tap(() => this.store.dispatch(startHueConnection.request({}))));
						} else {
							return of();
						}
					}),
				)
				.subscribe(),
		);
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	public tryAgainClicked(): void {
		this.store.dispatch(startHueConnection.request({}));
	}
}
