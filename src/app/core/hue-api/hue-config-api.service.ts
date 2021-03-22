import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/dto/base/base.response';
import { CreateUserRequest } from '../model/dto/config/create-user.request';
import { GetConfigResponse } from '../model/dto/config/get-config.response';

@Injectable({
	providedIn: 'root',
})
export class HueConfigApiService {
	constructor(private readonly http: HttpClient) {}

	public registerApplication(dto: CreateUserRequest): Observable<BaseResponse<'username', string>> {
		return this.http.post<BaseResponse<'username', string>>('hue:/', dto);
	}

	public getConfiguration(): Observable<GetConfigResponse> {
		return this.http.get<GetConfigResponse>('hue:/{user}/config');
	}
}
