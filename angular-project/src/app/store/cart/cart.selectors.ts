import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, PartialState, FEATURE_KEY } from './cart.reducer';

export const getState = createFeatureSelector<PartialState, State>(FEATURE_KEY);

export const getCartItems = createSelector(getState, (state: State) => state.items);

export const getCartItemsCount = createSelector(getState, (state: State) => state.items.length);
