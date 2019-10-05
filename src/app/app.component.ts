import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import { AppState } from './reducers';
import { LogOut } from './auth/auth.actions';
import { map } from 'rxjs/operators';
import { isLoggedIn, isLoggedOut } from './auth/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     isLoggedIn$: Observable<boolean>;
     isLoggedOut$: Observable<boolean>;
    constructor(private store: Store<AppState>,
      private router: Router) {

    }

    ngOnInit() {
      this.isLoggedIn$ = this.store.pipe(
       // map(state => state.auth.loggedIn)
       select(isLoggedIn)
      )

      this.isLoggedOut$ = this.store.pipe(
       // map(state => !state.auth.loggedIn)
       select(isLoggedOut)
      )
    }

    logout() {
      this.store.dispatch(new LogOut());
      this.router.navigateByUrl('/login');
    }


}
