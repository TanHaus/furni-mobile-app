export enum TextWeight {
	Default,
	Regular,
	Semibold,
	Bold,
	Light
}

export interface TextProps {
	weight?: TextWeight;
	color?: string;
}