import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { Light } from '../../../core/model/domain/lights/Light';
import { LightsPageService } from './lights-page.service';

@Component({
	selector: 'ltg-lights-page',
	templateUrl: './lights-page.component.html',
	styleUrls: ['./lights-page.component.scss'],
	providers: [LightsPageService],
})
export class LightsPageComponent implements OnInit {
	public lights: Observable<Light[]> = this.lightsPageService.lights$;

	constructor(private readonly lightsPageService: LightsPageService) {}

	public trackBy: TrackByFunction<Light> = (index: number, light: Light) => light.id;

	public ngOnInit(): void {
		this.lightsPageService.loadPage();
	}
}
