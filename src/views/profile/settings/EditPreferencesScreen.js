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
import { StyleSheet } from "react-native";
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
    getTagsLoading,
    getUserPreferencesLoading,
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
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          Select tags that interest you
        </CustomText.Regular>
      </Container>
      <ScrollView>
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
      </ScrollView>
      <Button title="Set preferences" onPress={handleUpdatePreferences} />
      {getTagsLoading && getUserPreferencesLoading && (
        <StyledActivityIndicator size="large" />
      )}
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
    tags: state.tags.tags,
    userPreferences: state.users.userPreferences,
    getTagsLoading: state.tags.getTagsLoading,
    getUserPreferencesLoading: state.users.getUserPreferencesLoading,
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
  margin: 10px;
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

const StyledActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;
