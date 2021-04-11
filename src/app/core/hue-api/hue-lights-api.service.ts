import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../model/dto/base/base.response';
import { GetLightsResponse } from '../model/dto/lights/get-lights.response';
import { SetLightStateRequest } from '../model/dto/lights/set-light-state.request';

@Injectable({
	providedIn: 'root',
})
export class HueLightsApiService {
	constructor(private readonly http: HttpClient) {}

	public getLights(): Observable<GetLightsResponse> {
		return this.http.get<GetLightsResponse>('hue:/{user}/lights');
	}

	public setLightState(id: string, dto: SetLightStateRequest): Observable<SuccessResponse<string, number | boolean>> {
		return this.http.put<SuccessResponse<string, number | boolean>>(`hue:/{user}/lights/${id}/state`, dto);
	}
}
