import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutineScreenComponent } from './components/routine-screen/routine-screen.component';

const routes: Routes = [
	{
		path: '',
		component: RoutineScreenComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RoutineRoutingModule {}
