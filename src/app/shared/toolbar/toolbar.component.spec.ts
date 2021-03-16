import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { MockComponent } from 'ng-mocks';
import { Menubar } from 'primeng/menubar';
import { Toolbar } from 'primeng/toolbar';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
	let spectator: Spectator<ToolbarComponent>;
	const createComponent = createComponentFactory({
		component: ToolbarComponent,
		declarations: [MockComponent(Toolbar), MockComponent(SvgIconComponent), MockComponent(Menubar)],
	});

	it('should create', () => {
		spectator = createComponent();

		expect(spectator.component).toBeTruthy();
	});
});
