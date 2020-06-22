import React from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CustomText, Searchbar } from "./index";
import { TextWeight } from "./types";
import { Color } from "../styles";
import { Ionicons } from "@expo/vector-icons";

export const HomeHeader = (props) => {
  const { state, descriptors, navigation, position } = props;

  return (
    <View>
      <SearchbarWrapper onPress={() => navigation.navigate("search")}>
        <SearchIcon name="ios-search" />
        <CustomText.Regular color={Color.Palette[4]}>Search</CustomText.Regular>
      </SearchbarWrapper>
      <FeatureContainer>
        {state.routes.map(tabGen(state, descriptors, navigation, position))}
      </FeatureContainer>
    </View>
  );
};

// -----------------------------------------------------------------------------
// HELPER FUNCTION
// -----------------------------------------------------------------------------
function tabGen(state, descriptors, navigation, position) {
  return (route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <Feature
        accessibilityRole="button"
        key={index}
        accessibilityStates={isFocused ? ["selected"] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <FeatureText weight={TextWeight.Bold} isFocused={isFocused}>
          {route.name}
        </FeatureText>
      </Feature>
    );
  };
}

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const FeatureText = styled(CustomText.Small)`
  text-transform: uppercase;

  ${(props) => {
    if (props.isFocused) {
      return `
          color: ${Color.Primary};
          text-decoration-line: underline;
        `;
    } else {
      return `
          color: ${Color.Palette[6]};
        `;
    }
  }}
`;

const Feature = styled.TouchableOpacity`
  padding: 5px;
`;

const FeatureContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const SearchbarWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled(Ionicons)`
  padding-right: 10px;
  font-size: 24px;
`;
