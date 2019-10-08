import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, LogOut } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';



@Injectable()
export class AuthEffects {

  @Effect({dispatch: false}) // if side effect doesn't prodcue any action
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem("user",JSON.stringify(action.payload)))
  );

  @Effect({dispatch:false})
  logout$ = this.actions$.pipe(
    ofType<LogOut>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem("user");
      this.router.navigateByUrl('login');
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem("user");
    if(userData) {
      return of(new Login(JSON.parse(userData)))
    }
    else {
      return of(new LogOut())
    }
  });

  constructor(private actions$: Actions, private router: Router) {}

}
