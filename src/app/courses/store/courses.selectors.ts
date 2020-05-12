import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCoursesData = createSelector(
  createFeatureSelector('courses'),
  state => state
);
