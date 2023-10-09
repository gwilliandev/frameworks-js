import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';

import { StoreDataAccessModule } from './store/store.module';

import { AppComponent } from './app.component';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { Page404Component } from './pages/page404/page404.component';
import { CartComponent } from './components/cart/cart.component';
import { ModalComponent } from './components/cart/components/modal/modal.component';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HomeComponent,
		CheckoutSuccessComponent,
		Page404Component,
		CartComponent,
		ModalComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: false,
		}),
		AppRoutingModule,
		StoreDataAccessModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
