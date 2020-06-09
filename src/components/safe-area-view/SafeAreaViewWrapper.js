import React from "react";
import styled from "styled-components/native";

export const SafeAreaViewWrapper = (props) => {
  const { children } = props;

  return <SafeAreaViewBase>{children}</SafeAreaViewBase>;
};

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const SafeAreaViewBase = styled.SafeAreaView`
  height: 100%;
  margin: 7.5% 5% 5%;
  position: relative;
`;
