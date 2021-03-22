export interface ConfigPortalState {
	signedon: boolean;
	incoming: boolean;
	outgoing: boolean;
	communication: 'connected' | 'disconnected';
}
