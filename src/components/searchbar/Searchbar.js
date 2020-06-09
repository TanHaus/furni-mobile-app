import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../styles";

export const Searchbar = () => {
  const [searchString, setSearchString] = useState("Search");

  return (
    <SearchbarWrapper>
      <SearchIcon name="ios-search" />
      <SearchField
        onChangeText={setSearchString}
        value={searchString}
      ></SearchField>
    </SearchbarWrapper>
  );
};

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const SearchbarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled(Ionicons)`
  padding-right: 10px;
  font-size: 24;
`;

const SearchField = styled.TextInput`
  width: 100%;
  height: 40px;
  color: ${Color.Palette[5]};
  border-bottom-width: 1px;
`;
