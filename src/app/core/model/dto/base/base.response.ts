export interface SuccessResponse<Key extends keyof any, Value> {
	success: Record<Key, Value>;
}

export interface ErrorResponse {
	error: {
		type: string;
		address: string;
		description: string;
	};
}

export interface BaseResponse<Key extends keyof any, Value> extends Array<SuccessResponse<Key, Value>> {}
