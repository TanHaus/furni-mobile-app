import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
  MultiSelect,
  MultiSelectOption,
} from "components";
import { TextWeight } from "components/types";
import { Color } from "styles";
import { getTags } from "actions/tags";
import { getUserPreferences, editUserPreferences } from "actions/users";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function EditPreferencesScreen(props) {
  const {
    navigation,
    userId,
    tags,
    userPreferences,
    loadTags,
    loadUserPreferences,
    submitUpdatePreferences,
  } = props;

  const [editUserPreferences, setEditUserPreferences] = useState(
    userPreferences
  );

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    if (userId) loadUserPreferences(userId);
  }, [userId]);

  useEffect(() => {
    setEditUserPreferences(userPreferences);
  }, [userPreferences]);
  const listRef = useRef("list2");

  const handleUpdatePreferences = () => {
    submitUpdatePreferences({ userId, tagIds: editUserPreferences });
    return null;
  };

  const handleChange = (value, isActive) => {
    if (!isActive) {
      const idx = editUserPreferences.findIndex((tagId) => tagId === value);
      setEditUserPreferences((prefs) =>
        prefs.filter((tagId) => tagId != value)
      );
    } else {
      setEditUserPreferences((prefs) => [...prefs, value]);
    }
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>PREFERENCES</Title>
      </TitleContainer>
      <ScrollView>
        <Container>
          <CustomText.Regular color={Color.Palette[4]}>
            Select tags that interest you
          </CustomText.Regular>
        </Container>
        <MultiSelect>
          {tags.map((tag) => (
            <MultiSelectOption
              key={tag.tagId}
              value={tag.tagId}
              label={tag.label}
              active={editUserPreferences.includes(tag.tagId)}
              onChange={handleChange}
            />
          ))}
        </MultiSelect>
        <Button title="Set preferences" onPress={handleUpdatePreferences} />
      </ScrollView>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
    tags: state.tags.tags,
    userPreferences: state.users.userPreferences,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTags: () => dispatch(getTags()),
    loadUserPreferences: (userId) => dispatch(getUserPreferences(userId)),
    submitUpdatePreferences: (data) => dispatch(editUserPreferences(data)),
    // submitLoginData: (loginData) => dispatch(loginUser(loginData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(EditPreferencesScreen);

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Container = styled.View`
  margin-top: 30px;
`;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
  },
  text1: {
    backgroundColor: "#CFDBD5",
    padding: 10,
    borderWidth: 1,
    color: "black",
  },
  activeCom: {
    backgroundColor: Color.Palette[2],
  },
  inactiveCom: {
    backgroundColor: Color.Palette[8],
  },
  activeText: {
    color: Color.Palette[8],
  },
  inactiveText: {
    color: Color.Palette[2],
  },
});
