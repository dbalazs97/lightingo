import { createFeatureSelector, createSelector } from '@ngrx/store';
import { lightsFeatureKey, LightsState } from './lights.reducer';

const lightsFeatureSelector = createFeatureSelector<LightsState>(lightsFeatureKey);

export const selectLights = createSelector(lightsFeatureSelector, s => s.lights);
