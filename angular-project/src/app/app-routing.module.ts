import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
	{
		path: '',
		title: 'home',
		component: HomeComponent,
	},
	{
		path: 'checkout',
		title: 'checkout',
		component: CheckoutSuccessComponent,
	},
	{
		path: '**',
		title: 'page404',
		component: Page404Component,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
