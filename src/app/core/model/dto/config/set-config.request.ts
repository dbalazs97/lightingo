import { GetConfigResponse } from './get-config.response';

export interface SetConfigRequest
	extends Partial<
		Pick<
			GetConfigResponse,
			| 'proxyport'
			| 'name'
			| 'swupdate'
			| 'proxyaddress'
			| 'linkbutton'
			| 'ipaddress'
			| 'netmask'
			| 'gateway'
			| 'dhcp'
			| 'UTC'
			| 'timezone'
			| 'zigbeechannel'
		> & {
			touchlink: boolean;
		}
	> {}
