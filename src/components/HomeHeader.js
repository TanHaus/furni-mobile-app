import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { CustomText, TextWeight, Searchbar } from "../components";
import { Color } from "../styles";

function HomeHeader(props) {
  const { state, descriptors, navigation, position } = props;

  return (
    <View>
      <Searchbar />
      <FeatureContainer>
        {state.routes.map(tabGen(state, descriptors, navigation, position))}
      </FeatureContainer>
    </View>
  );
}

export default HomeHeader;

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
