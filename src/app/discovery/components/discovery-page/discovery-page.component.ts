import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiscoveryPageService } from './discovery-page.service';

@Component({
	selector: 'ltg-discovery-page',
	templateUrl: './discovery-page.component.html',
	styleUrls: ['./discovery-page.component.scss'],
	providers: [DiscoveryPageService],
})
export class DiscoveryPageComponent implements OnInit, OnDestroy {
	public connectionState$ = this.discoveryPageService.connectionState$;
	private readonly subscription = new Subscription();

	constructor(private readonly discoveryPageService: DiscoveryPageService) {}

	public ngOnInit(): void {
		this.subscription.add(this.discoveryPageService.pollIfWaitingForLinkButton$().subscribe());
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	public tryAgainClicked(): void {
		this.discoveryPageService.tryAgain();
	}
}
