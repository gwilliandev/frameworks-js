import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/store/cart/cart.models';
import { CartStoreService } from 'src/app/store/cart/cart.service';

@Component({
	selector: 'app-checkout-success',
	templateUrl: './checkout-success.component.html',
	styleUrls: ['./checkout-success.component.scss'],
})
export class CheckoutSuccessComponent implements OnInit {
	protected checkoutCart: CartItem[] = [];

	constructor(private cartStore: CartStoreService, private router: Router) {}

	ngOnInit(): void {
		const checkoutCart$ = this.cartStore.fetchCartItem();
		const subscribe = checkoutCart$.subscribe((items) => (this.checkoutCart = items));

		if (this.router.url === '/checkout') {
			subscribe.unsubscribe();
			this.cartStore.dispatchClearCart();
		}
	}

	get cartTotalValue() {
		return this.checkoutCart.reduce((acc, item) => {
			acc += item.price * item.count;
			return acc;
		}, 0);
	}
}
