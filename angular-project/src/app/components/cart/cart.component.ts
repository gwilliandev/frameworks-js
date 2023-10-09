import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/lib/modal.service';
import { CartStoreService } from 'src/app/store/cart/cart.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	protected display$!: Observable<'open' | 'close'>;
	protected cartItems!: Observable<number>;

	protected isCartWithItems: boolean = false;

	constructor(private modalService: ModalService, private cartStore: CartStoreService) {}

	ngOnInit() {
		this.display$ = this.modalService.watch();
		this.cartItems = this.cartStore.fetchCartItemCount();

		this.cartItems.subscribe((count) => (this.isCartWithItems = count > 0));
	}

	openModal() {
		this.modalService.open();
	}
}
