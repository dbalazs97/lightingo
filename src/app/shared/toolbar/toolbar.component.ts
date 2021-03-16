import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'ltg-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
	public menuItems: MenuItem[] = [{ label: 'Lights' }, { label: 'Routines' }, { label: 'Settings' }];
}
