import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { Card } from 'primeng/card';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

describe('AppComponent', () => {
	let spectator: Spectator<AppComponent>;
	const createComponent = createComponentFactory({
		component: AppComponent,
		declarations: [MockComponent(ToolbarComponent), MockComponent(Card)],
		imports: [RouterTestingModule],
	});

	it('should create', () => {
		spectator = createComponent();
		expect(spectator.component).toBeTruthy();
	});
});
