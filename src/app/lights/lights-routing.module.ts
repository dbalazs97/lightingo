import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightsPageComponent } from './components/lights-page/lights-page.component';

const routes: Routes = [{ path: '', component: LightsPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LightsRoutingModule {}
