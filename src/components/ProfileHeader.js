import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { CustomText } from "./index";
import { TextWeight } from "./types";
import { Color } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ProfileHeader = (props) => {
  const { state, descriptors, navigation, position } = props;

  return (
    <View>
      <ProfileDescription>
        <Image source={require("../assets/listings/purple-chair.png")} />
        <TextContainer>
          <CustomText.Large weight={TextWeight.SemiBold}>
            Furni
          </CustomText.Large>
          <CustomText.Regular>★★★★★</CustomText.Regular>
        </TextContainer>
        <IconContainer>
          <MaterialCommunityIcons
            name="heart-outline"
            size={35}
            onPress={() => navigation.navigate("liked")}
          />
          <MaterialCommunityIcons
            name="settings-outline"
            size={35}
            onPress={() => navigation.navigate("settings")}
          />
        </IconContainer>
      </ProfileDescription>
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
        <FeatureText weight={TextWeight.SemiBold} isFocused={isFocused}>
          {route.name}
        </FeatureText>
      </Feature>
    );
  };
}

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const ProfileDescription = styled.View`
  flex-direction: row;
  margin-top: 20px;
  padding-left: 10px;
  position: relative;
`;

const Image = styled.ImageBackground`
  height: 75px;
  width: 75px;
  border-radius: 150px;
  overflow: hidden;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

const IconContainer = styled(MaterialCommunityIcons)`
  display: flex;
  align-items: center;
  margin: auto 10px auto auto;
`;

const FeatureContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
  margin: 40px 0 20px;
  height: 30px;
`;

const FeatureText = styled(CustomText.Small)`
  text-transform: uppercase;
  text-align: center;
  display: flex;
  text-align-vertical: center;

  height: 100%;

  ${(props) => {
    if (props.isFocused) {
      return `
        background-color: ${Color.Primary};
        color: ${Color.Palette[8]};
        `;
    } else {
      return `
        background-color: ${Color.Palette[8]};
        color: ${Color.Primary};
        `;
    }
  }}
`;

const Feature = styled.TouchableOpacity`
  width: 50%;
`;
