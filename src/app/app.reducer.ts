import * as fromUI from 'src/app/shared/reducers/ui.reducer';
import * as fromAuth from 'src/app/shared/reducers/auth.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
