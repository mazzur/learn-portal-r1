import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Course } from 'App/courses/course';

export interface State {}

export const reducers: ActionReducerMap<State> = {};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
