import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as colorConvert from 'color-convert';
import { Light } from '../../../core/model/domain/lights/Light';
import { LightItemService } from './light-item.service';

@Component({
	selector: 'ltg-light-item',
	templateUrl: './light-item.component.html',
	styleUrls: ['./light-item.component.scss'],
	providers: [LightItemService],
})
export class LightItemComponent implements OnInit, OnChanges {
	@Input() public light!: Light;

	public form: FormGroup = this.lightItemService.form;

	constructor(private readonly lightItemService: LightItemService) {}

	public get colorAsString(): string {
		const [h, s, l] = colorConvert.hsv.hsl([this.light.color.h, this.light.color.s, this.light.color.b]);
		return `hsl(${h} ${s}% ${l}%)`;
	}

	public ngOnInit(): void {
		this.lightItemService.loadPage(this.light);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.light && this.form) {
			this.form.setValue(
				{
					color: this.light.color,
					switch: this.light.switchState,
				},
				{ emitEvent: false, onlySelf: true },
			);
		}
	}

	public reloadForCachedTab(): void {
		this.form.setValue(this.form.value, { emitEvent: false });
	}
}
