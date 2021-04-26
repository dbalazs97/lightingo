import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoveredGuard } from './core/guard/discovered.guard';

const routes: Routes = [
	{
		path: 'discovery',
		loadChildren: () => import('./discovery/discovery.module').then(m => m.DiscoveryModule),
	},
	{
		path: 'lights',
		loadChildren: () => import('./lights/lights.module').then(m => m.LightsModule),
		canActivate: [DiscoveredGuard],
	},
	{
		path: 'routines',
		loadChildren: () => import('./routine/routine.module').then(m => m.RoutineModule),
		canActivate: [DiscoveredGuard],
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'lights',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
