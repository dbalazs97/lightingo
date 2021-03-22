import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, merge, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, timeout, toArray } from 'rxjs/operators';
import { HueDiscoveryResponse } from '../model/dto/config/hue-discovery.response';

@Injectable({
	providedIn: 'root',
})
export class HueDiscoveryService {
	constructor(private readonly http: HttpClient) {}

	private discoverAtMeetHue(): Observable<HueDiscoveryResponse> {
		return this.http.get<HueDiscoveryResponse>('https://discovery.meethue.com/');
	}

	private discoverByPortKnocking(): Observable<string[]> {
		const observables: Observable<string>[][] = [];
		for (let i = 0; i < 16; i++) {
			observables.push([]);
			for (let j = 0; j < 16; j++) {
				observables[i].push(
					this.http
						.head(`http://192.168.0.${i * 16 + j}/api/config`, {
							withCredentials: false,
							observe: 'response',
						})
						.pipe(
							timeout(1000),
							catchError(e => of(e)),
							map((v: HttpResponse<any>) => {
								return v?.status < 300 && v?.status >= 200 ? `http://192.168.0.${i * 16 + j}` : '';
							}),
						),
				);
			}
		}

		return concat(...observables.map(items => merge(...items))).pipe(
			filter(v => !!v),
			toArray(),
			switchMap(ips => (ips.length === 0 ? throwError('IP not found') : of(ips))),
		);
	}

	public discoverHueBridges(): Observable<string[]> {
		return this.discoverAtMeetHue().pipe(
			map(result => result.map(r => `http://${r.internalipaddress}`)),
			catchError(() => this.discoverByPortKnocking()),
		);
	}
}
