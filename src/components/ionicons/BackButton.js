import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../styles";

export const BackButton = (props) => {
  const { size, color, onPress } = props;
  return (
    <Ionicons
      name="ios-arrow-back"
      size={size || 24}
      color={color || Color.Palette[3]}
      style={{ paddingTop: 10, paddingBottom: 10 }}
      onPress={onPress}
    />
  );
};
