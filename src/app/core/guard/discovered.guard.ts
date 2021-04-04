import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, iif, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigState } from '../store/config/config.reducer';
import { selectConfigDiscoveryState, selectConfigRegisterState } from '../store/config/config.selectors';

@Injectable({
	providedIn: 'root',
})
export class DiscoveredGuard implements CanActivate {
	constructor(private readonly configStore: Store<ConfigState>, private readonly router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return combineLatest([
			this.configStore.select(selectConfigDiscoveryState),
			this.configStore.select(selectConfigRegisterState),
		]).pipe(
			switchMap(([discovery, register]) =>
				iif(
					() => discovery === 1 && register === 1,
					of(true),
					of(false).pipe(tap(() => this.router.navigateByUrl('/discovery'))),
				),
			),
		);
	}
}
