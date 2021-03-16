import { ConfigPortalState } from './config-portal-state';
import { ConfigSoftwareUpdate } from './config-software-update';
import { ConfigSoftwareUpdate2 } from './config-software-update2';
import { ConfigWhitelistItem } from './config-whitelist-item';

export interface GetConfigResponse {
	name: string;
	swupdate?: ConfigSoftwareUpdate;
	swupdate2?: ConfigSoftwareUpdate2;
	whitelist: Record<string, ConfigWhitelistItem>;
	portalstate: ConfigPortalState;
	apiversion: string;
	swversion: string;
	proxyaddress: string;
	proxyport: number;
	linkbutton: boolean;
	ipaddress: string;
	mac: string;
	netmask: string;
	gateway: string;
	dhcp: boolean;
	portalservices: boolean;
	UTC: string;
	localtime: string;
	timezone: string;
	zigbeechannel: number;
	modelid: string;
	bridgeid: string;
	factorynew: boolean;
	replacesbridgeid: string;
	datastoreversion: string;
	starterkitid: string;
}
