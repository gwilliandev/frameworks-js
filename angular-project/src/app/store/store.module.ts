import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CartStoreService } from './cart/cart.service';

import { DtMoneyEffects } from './cart/cart.effects';
import * as fromCartReducer from './cart/cart.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      [fromCartReducer.FEATURE_KEY]: fromCartReducer.CartReducer,
    }),
    EffectsModule.forRoot([DtMoneyEffects]),
  ],
  providers: [CartStoreService],
})
export class StoreDataAccessModule {}
