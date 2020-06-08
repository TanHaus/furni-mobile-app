import styled from "styled-components/native";
import { Color, FontFamily, FontSize, TextStyleType } from "../../styles";
import { TextWeight } from "./types";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const getText = (weight) => {
  switch (weight) {
    case TextWeight.Semibold:
      return FontFamily.Semibold;
    case TextWeight.Bold:
      return FontFamily.Bold;
    case TextWeight.Light:
      return FontFamily.Light;
    default:
      return FontFamily.Regular;
  }
};

const getTextStyle = (style) => {
  return `
		font-size: ${FontSize[style].size}px;
		line-height: ${FontSize[style].lineHeight}px;	
	`;
};

// =============================================================================
// COMPONENT DECLARATIONS
// =============================================================================
const XSmall = styled.Text`
  font-family: ${(props) => getText(props.weight)};
  color: ${(props) => props.color || Color.Palette[2]};
  ${getTextStyle(TextStyleType.XSmall)}
`;

const Small = styled.Text`
  font-family: ${(props) => getText(props.weight)};
  color: ${(props) => props.color || Color.Palette[2]};
  ${getTextStyle(TextStyleType.Small)}
`;

const Regular = styled.Text`
  font-family: ${(props) => getText(props.weight)};
  color: ${(props) => props.color || Color.Palette[2]};
  ${getTextStyle(TextStyleType.Regular)}
`;

const Large = styled.Text`
  font-family: ${(props) => getText(props.weight)};
  color: ${(props) => props.color || Color.Palette[2]};
  ${getTextStyle(TextStyleType.Large)}
`;

const XLarge = styled.Text`
  font-family: ${(props) => getText(props.weight)};
  color: ${(props) => props.color || Color.Palette[2]};
  ${getTextStyle(TextStyleType.XLarge)}
`;

export const CustomText = {
  XSmall,
  Small,
  Regular,
  Large,
  XLarge,
};
