import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { ModalService } from 'src/app/lib/modal.service';
import { CartItem } from 'src/app/store/cart/cart.models';
import { CartStoreService } from 'src/app/store/cart/cart.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	protected display$!: Observable<'open' | 'close'>;
	protected cartItems!: Observable<CartItem[]>;

	protected cartTotalValue: number = 0;
	protected isCartWithItems: boolean = false;

	constructor(private modalService: ModalService, private router: Router, private cartStore: CartStoreService) {}

	ngOnInit() {
		this.display$ = this.modalService.watch();
		this.cartItems = this.cartStore.fetchCartItem();

		this.cartItems.subscribe((cartItems) => {
			this.isCartWithItems = cartItems.length > 0;

			this.cartTotalValue = cartItems.reduce((acc, item) => {
				acc += item.price * item.count;
				return acc;
			}, 0);
		});
	}

	handleAddItemToCart(item: CartItem) {
		this.cartStore.dispatchAddItemToCart(item);
	}

	handleRemoveItemFromCart(id: string) {
		this.cartStore.dispatchRemoveItemFromCart({ id });
	}

	handleCheckout() {
    this.close();
		this.router.navigate(['/checkout']);
	}

	close() {
		this.modalService.close();
	}
}
