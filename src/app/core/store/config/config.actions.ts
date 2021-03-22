import { props } from '@ngrx/store';
import { createRequestAction } from '../utils/create-request-action';

const feature = '[Config]';

export const startHueConnection = createRequestAction(
	`${feature} Start Hue connection`,
	props<{ _?: never }>(),
	props<{ id: string }>(),
	props<{ _?: never }>(),
);

export const discoverHueBridges = createRequestAction(
	`${feature} Discover hue bridges`,
	props<{ _?: never }>(),
	props<{ ip: string }>(),
	props<{ _?: never }>(),
);

export const registerApplication = createRequestAction(
	`${feature} Register application`,
	props<{ name: string }>(),
	props<{ appId: string }>(),
	props<{ linkButtonError: boolean }>(),
);
