import React from "react";
import { Color } from "styles";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { CustomText } from "components";

export const MultiSelectOption = (props) => {
  const { value, label, active, onChange } = props;
  if (active)
    return (
      <Container
        onPress={() => onChange(value, false)}
        style={{ backgroundColor: Color.Palette[2] }}
      >
        <CustomText.Small color={Color.Palette[8]}>{label}</CustomText.Small>
        <Entypo name="cross" size={24} color={Color.Palette[8]} />
      </Container>
    );
  return (
    <Container
      onPress={() => onChange(value, true)}
      style={{ backgroundColor: Color.Palette[8] }}
    >
      <CustomText.Small color={Color.Palette[2]}>{label}</CustomText.Small>
      <Entypo name="plus" size={24} color={Color.Palette[2]} />
    </Container>
  );
};

// =============================================================================
// STYLING
// =============================================================================
const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 5px 10px;
  margin: 5px;
`;
