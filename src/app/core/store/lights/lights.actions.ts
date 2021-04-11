import { props } from '@ngrx/store';
import { HSBColor } from '../../model/domain/HSBColor';
import { Light } from '../../model/domain/lights/Light';
import { createRequestAction } from '../utils/create-request-action';

const feature = '[Lights]';

export const getLights = createRequestAction(
	`${feature} Get lights`,
	props<{ _?: never }>(),
	props<{ lights: Light[] }>(),
	props<{ _?: never }>(),
);

export const setLightSwitchState = createRequestAction(
	`${feature} Set light switch state`,
	props<{ id: string; switchState: boolean }>(),
	props<{ update: Partial<Light> }>(),
	props<{ _?: never }>(),
);

export const setLightColor = createRequestAction(
	`${feature} Set light color`,
	props<{ id: string; color: HSBColor }>(),
	props<{ update: Partial<Light> }>(),
	props<{ _?: never }>(),
);
