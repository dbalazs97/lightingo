import { createFeatureSelector, createSelector } from '@ngrx/store';
import { configFeatureKey, ConfigState } from './config.reducer';

const configFeatureSelector = createFeatureSelector<ConfigState>(configFeatureKey);

export const selectConfigAppId = createSelector(configFeatureSelector, s => s.appId);
export const selectConfigHueIp = createSelector(configFeatureSelector, s => s.hueIp);

export const selectConfigRegisterState = createSelector(configFeatureSelector, s => s.registerState);
export const selectConfigDiscoveryState = createSelector(configFeatureSelector, s => s.discoverState);
export const selectConfigLinkButtonErrorState = createSelector(configFeatureSelector, s => s.linkButtonError);
