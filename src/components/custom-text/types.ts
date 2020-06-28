export enum TextWeight {
  Default,
  Regular = "regular",
  Semibold = "semibold",
  Bold = "bold",
  Light = "light",
}

export interface TextProps {
  weight?: TextWeight;
  color?: string;
}
