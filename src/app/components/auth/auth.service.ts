import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import * as UI from 'src/app/shared/actions/ui.action';
import * as Auth from 'src/app/shared/actions/auth.actions';

@Injectable()
export class AuthService {
  private user: User;
  private isAuthenticated = false;
  constructor(private router: Router, private auth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<{ui: fromRoot.State}>) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnAuthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth.createUserWithEmailAndPassword(authData.email,
      authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logout() {
    this.auth.auth.signOut();
  }

}

