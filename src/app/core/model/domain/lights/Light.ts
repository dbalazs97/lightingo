import { HSBColor } from '../HSBColor';

export interface Light {
	id: string;
	name: string;
	switchState: boolean;
	color: HSBColor;
}
