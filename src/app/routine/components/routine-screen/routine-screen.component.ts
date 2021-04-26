import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ltg-routine-screen',
	templateUrl: './routine-screen.component.html',
	styleUrls: ['./routine-screen.component.scss'],
})
export class RoutineScreenComponent implements OnInit {
	public eventSources = [
		{ name: 'Time period', code: 'PER' },
		{ name: 'At a fixed time', code: 'FXT' },
		{ name: 'Geolocation', code: 'GEO' },
	];

	public eventTargets = [
		{
			label: 'Lights',
			svg: 'bulb-group',
			items: [
				{ label: 'Big 1', code: 'l1', svg: 'bulb-flood' },
				{ label: 'Big 2', code: 'l2', svg: 'bulb-flood' },
				{ label: 'Big 3', code: 'l3', svg: 'bulb-flood' },
				{ label: 'Small 1', code: 'l4', svg: 'bulb-candle' },
				{ label: 'Small 2', code: 'l5', svg: 'bulb-candle' },
				{ label: 'Bed right', code: 'l6', svg: 'bulb-flood' },
				{ label: 'Bed left', code: 'l7', svg: 'bulb-flood' },
			],
		},
		{
			label: 'Groups',
			svg: 'bulb-general-group',
			items: [
				{ label: 'Living room', code: 'g1', svg: 'rooms-living' },
				{ label: 'Bedroom', code: 'g2', svg: 'rooms-bedroom' },
			],
		},
	];

	public date = new Date();
	public showItem = false;

	constructor() {}

	ngOnInit(): void {}
}
