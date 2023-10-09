import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCartActions from './cart.actions';
import * as fromCartReducer from './cart.reducer';

import { getCartItems, getCartItemsCount } from './cart.selectors';

@Injectable()
export class CartStoreService {

  constructor(
    private store$: Store<fromCartReducer.PartialState>
  ) {}

  dispatchAddItemToCart(payload: fromCartActions.PayloadAdd) {
    this.store$.dispatch(fromCartActions.addItemToCart({ payload }))
  }

  dispatchRemoveItemFromCart(payload: fromCartActions.PayloadRemove) {
    this.store$.dispatch(fromCartActions.removeItemFromCart({ payload }))
  }

  dispatchClearCart() {
    this.store$.dispatch(fromCartActions.clearCart())
  }

  fetchCartItem() {
    return this.store$.select(getCartItems)
  }

  fetchCartItemCount() {
    return this.store$.select(getCartItemsCount)
  }
}
