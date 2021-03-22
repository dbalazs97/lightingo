import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DiscoveryPageComponent } from './components/discovery-page/discovery-page.component';
import { DiscoveryRoutingModule } from './discovery-routing.module';

@NgModule({
	declarations: [DiscoveryPageComponent],
	imports: [CommonModule, DiscoveryRoutingModule, SvgIconsModule, InputNumberModule, ButtonModule],
})
export class DiscoveryModule {}
