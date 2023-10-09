import { createAction, props } from '@ngrx/store';

import { CartItem } from './cart.models';

export type PayloadAdd = CartItem;

export type PayloadRemove = Pick<CartItem, 'id'>;

export const KEY = '[Cart]';

export const addItemToCart = createAction(`${KEY} Add item to cart Action`, props<{ payload: PayloadAdd }>());

export const removeItemFromCart = createAction(`${KEY} Remove item to cart Action`, props<{ payload: PayloadRemove }>());

export const clearCart = createAction(`${KEY} Clear cart Action`);
