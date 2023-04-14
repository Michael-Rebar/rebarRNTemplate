import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Container } from "native-base";
import Header from "../../components/Headers/Common";
import PersonalInformation from "../Forms/PersonalInformation";

export default function ProfilePersonalInformationEdit({ navigation }) {
  const offset = useRef(new Animated.Value(0)).current;
  const [headerViewHeight, setHeaderViewHeight] = useState(0);

  const onHeaderLayout = (e) => {
    if (headerViewHeight === 0) {
      setHeaderViewHeight(e.nativeEvent.layout.height);
    }
  };

  return (
    <Container>
      <Header animated animatedValue={offset} contained="solid" onLayout={onHeaderLayout} back backAction={() => { navigation.goBack(); }} transparent actionButton="left" />
      <PersonalInformation
        headerViewHeight={headerViewHeight}
        onScrollContent={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
        isProgressive={false}
        navigation={navigation}
        module="Profile"
      />
    </Container>
  );
}

ProfilePersonalInformationEdit.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
