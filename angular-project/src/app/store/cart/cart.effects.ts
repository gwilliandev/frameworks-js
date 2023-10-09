import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as fromDtMoney from './cart.actions'

@Injectable()
export class DtMoneyEffects {

  constructor(
    private actions$: Actions
  ) {}

  // fetchEffect$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fromDtMoney.newAction),
  //     concatMap(() => ({} as Observable<{}>)),
  //     map((value) => fromDtMoney.newActionWithProps({ payload: value })),
  //     catchError((error) => throwError(error.message))
  //   )
  // });

}
