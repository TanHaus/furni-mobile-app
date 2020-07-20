import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../../components";
import { TextWeight } from "../../../components/types";
import { Color } from "../../../styles";
import { loginUser } from "../../../actions/auth";
import MultiSelectView from "react-native-multiselect-view";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function EditPreferencesScreen(props) {
  const { navigation, submitPreferenceData } = props;
  const listRef = useRef("list2");

  const LoremIpsum1 = [
    "wood",
    "metal",
    "fabric",
    "leather",
    "glass",
    "foam",
    "plastic",
    "marble",
    "rock",
    "rattan",
    "beds",
    "chairs",
    "dressers",
    "pink",
    " blue",
    "black",
    "green",
    "yellow",
    "outdoor",
    "stools",
    "rocking chairs",
    "crib",
    "mediterranean",
    "midcentury",
    "southwestern",
    "contemporary",
    "tropical",
  ];

  const handleSetPreferences = () => {
    //TODO
    return null;
  };

  const [show, setShow] = useState(false);

  const onSetPreferences = () => {
    setShow(true);
  };

  const renderItems = () => {
    if (show) {
      // const items = listRef.current.selectedItems().map((item) => {
      //   return <Text>{item.value}</Text>;
      // });

      return (
        <Container>
          <Text>
            How the array looks like for selected items:
            {JSON.stringify(listRef.current.selectedItems())}
          </Text>
          {/* <Text>=================</Text>
          {items} */}
        </Container>
      );
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
        <MultiSelectView
          ref={listRef}
          data={LoremIpsum1}
          activeContainerStyle={styles.activeCom}
          inactiveContainerStyle={styles.inactiveCom}
          activeTextStyle={styles.activeText}
          inactiveTextStyle={styles.inactiveText}
        />
        <Container>
          <TouchableOpacity onPress={onSetPreferences}>
            <View style={styles.button}>
              <Text style={styles.text1}>
                For Dan: After selecting some tags, click this button to see how
                the array DS looks like
              </Text>
            </View>
          </TouchableOpacity>
        </Container>
        {renderItems()}
        <Container>
          <Button title="Set preferences" onPress={handleSetPreferences} />
        </Container>
      </ScrollView>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitLoginData: (loginData) => dispatch(loginUser(loginData)),
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
