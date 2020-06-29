export interface ButtonProps {
  title: string;
  type?: ButtonType;
  onPress?: () => void;
}

export enum ButtonType {
  Default,
  Secondary = "secondary",
}
