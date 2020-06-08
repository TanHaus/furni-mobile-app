import React from "react";
import styled from "styled-components/native";
import { ButtonType } from "./types";
import { CustomText, TextWeight } from "../index";
import { Color } from "../../styles";

export const Button = (props) => {
  const { title, onPress } = props;
  const type = props.type || ButtonType.Default;

  return (
    <Main buttonType={type} onPress={onPress}>
      <ButtonText buttonType={type} weight={TextWeight.Semibold}>
        {title}
      </ButtonText>
    </Main>
  );
};

// =============================================================================
// STYLING
// =============================================================================
const Main = styled.TouchableOpacity`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  ${(props) => {
    switch (props.buttonType) {
      case ButtonType.Secondary:
        return `
					border: 1.5px solid ${Color.Primary};
					background-color: white;
				`;
      default:
        return `
					border: 1.5px solid transparent;
					background-color: ${Color.Primary};
				`;
    }
  }}
`;

const ButtonText = styled(CustomText.Large)`
  margin-bottom: 0;
  ${(props) => {
    switch (props.buttonType) {
      case ButtonType.Secondary:
        return `
					color: ${Color.Primary};
				`;
      default:
        return `
					color: white;
				`;
    }
  }}
`;
