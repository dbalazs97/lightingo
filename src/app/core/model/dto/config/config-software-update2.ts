import { ConfigUpdateState } from './config-update-state';

export interface ConfigSoftwareUpdate2 {
	checkforupdate: boolean;
	state: ConfigUpdateState;
	lastinstall: string;
	lastchange: string;
	bridge: {
		state: ConfigUpdateState;
		lastinstall: string;
	};
	autoinstall: {
		updatetime: string;
		on: boolean;
	};
}
