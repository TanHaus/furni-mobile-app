import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const MultiSelect = (props) => {
  const { children } = props;
  return <MultiSelectWrapper>{children}</MultiSelectWrapper>;
};

// ---------------------------------------------------------------------------
// STYLING
// ---------------------------------------------------------------------------
const MultiSelectWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
