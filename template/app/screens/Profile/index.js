import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Container } from "native-base";
import Header from "../../components/Headers/Common";
import ProfileInformation from "../Common/ProfileInformation";

export default function MainProfile({ navigation }) {
  const offset = useRef(new Animated.Value(0)).current;
  const [headerViewHeight, setHeaderViewHeight] = useState(0);

  const onHeaderLayout = (e) => {
    if (headerViewHeight === 0) {
      setHeaderViewHeight(e.nativeEvent.layout.height);
    }
  };

  return (
    <Container>
      <Header transparent animated animatedValue={offset} onLayout={onHeaderLayout} back contained="solid" backAction={() => navigation.navigate("ProfileOptions")} actionButton="left" />
      <ProfileInformation
        headerViewHeight={headerViewHeight}
        onScrollContent={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
        navigation={navigation}
        module="Profile"
      />
    </Container>
  );
}

MainProfile.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
