import { createAction, NotAllowedCheck } from '@ngrx/store';
import { ActionCreatorProps } from '@ngrx/store/src/models';

export const createRequestAction = <TReq extends object, TSucc extends object, TErr extends object>(
	name: string,
	requestProps: ActionCreatorProps<TReq> & NotAllowedCheck<TReq>,
	successProps: ActionCreatorProps<TSucc> & NotAllowedCheck<TSucc>,
	errorProps: ActionCreatorProps<TErr> & NotAllowedCheck<TErr>,
) => ({
	request: createAction(name, requestProps),
	success: createAction(`${name} success`, successProps),
	error: createAction(`${name} error`, errorProps),
});
