import { createReducer, on, Action } from '@ngrx/store';

import { CartItem } from './cart.models';
import * as fromCartActions from './cart.actions';

export interface State {
	items: CartItem[];
}

export interface PartialState {
	readonly [FEATURE_KEY]: State;
}

export const FEATURE_KEY = 'cart';

export const initialState: State = {
	items: [],
};

const _reducer = createReducer(
	initialState,
	on(fromCartActions.addItemToCart, (state, action) => {
		let items: CartItem[] = [];
		const isItemAlreadyInCart = state.items.find((item) => item.id === action.payload.id);

		if (isItemAlreadyInCart) {
			items = state.items.map((item) => {
				if (item.id === action.payload.id) return { ...item, count: item.count + 1 };
				return item;
			});
		} else {
			items = [...state.items, { ...action.payload, count: 1 }];
		}

		return { ...state, items };
	}),
	on(fromCartActions.removeItemFromCart, (state, action) => {
		let items: CartItem[] = [];
		const itemsInCart = state.items.find((item) => item.id === action.payload.id)?.count;

		if (itemsInCart && itemsInCart > 1) {
			items = state.items.map((item) => {
				if (item.id === action.payload.id) return { ...item, count: item.count - 1 };
				return item;
			});
		} else {
			items = [...state.items.filter((item) => item.id !== action.payload.id)];
		}

		return { ...state, items };
	}),
	on(fromCartActions.clearCart, (state, action) => {
		return { ...state, items: [] };
	}),
);

export function CartReducer(state: State | undefined, action: Action) {
	return _reducer(state, action);
}
