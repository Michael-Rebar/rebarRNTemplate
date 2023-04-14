import React from "react";
import { StyleSheet, View, TouchableOpacity, BackHandler } from "react-native";
import PropTypes from "prop-types";
import { Container, Content } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { scale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import global from "../../utils/GlobalStyles";
import color from "../../utils/Color";
import RightChevron from "../../assets/images/icons/right-chevron.svg";

const styles = StyleSheet.create({
  bankItem: {
    width: "100%",
    borderBottomWidth: 1,
    paddingHorizontal: "5%",
    paddingVertical: scale(24),
    paddingRight: 0,
    borderColor: color.veryLightGray,
  },
});

export default function EnrolledCard({ navigation, route }) {
  const { from } = route.params ? route.params : "ProfileOptions";
  const banks = useSelector(state => state.banks.banks);
  const referencesInfo = useSelector(state => state.references.references);
  const handleBack = () => {
    if (from === "EmergencyFund") {
      navigation.navigate("AccessSinglifeAccount");
    } else if (from === "MainTab") {
      navigation.navigate("Account");
    } else {
      navigation.navigate("ProfileOptions");
    }
  };

  const getBankName = (bankId) => {
    const mergeBanks = referencesInfo.banks[0].content.concat(referencesInfo.banks[1].content);
    const bankDetails = mergeBanks.find(mB => mB.key === String(bankId));
    if (bankDetails) {
      return bankDetails.name;
    }

    return "---";
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (from === "EmergencyFund") {
          navigation.navigate("AccessSinglifeAccount");
        } else if (from === "MainTab") {
          navigation.navigate("Account");
        } else {
          navigation.navigate("ProfileOptions");
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [route]),
  );

  const renderEnrolledBanks = () => banks.map((_row, key) => (
    <Row size={4} style={styles.bankItem} key={`bank-${key + 1}`}>
      <Col>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileEditBankDetails", { id: _row.id, bankId: _row.bank_id })} transparent>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.95 }}>
              <Typography type="body-bold" text={getBankName(_row.bank_id)} />
            </View>
            <View style={{ justifyContent: "center", borderColor: color.black }}>
              <RightChevron />
            </View>
          </View>
          <View style={global.fieldSeparator}>
            <Typography type="body" text={_row.name} />
            <Typography type="body" style={global.buttonSeparatorHalf} text={_row.account_no} />
          </View>
        </TouchableOpacity>
      </Col>
    </Row>
  ));

  return (
    <Container>
      <Header contained="solid" transparent back backAction={() => handleBack()} actionButton="left" />

      <Content style={global.wrapper}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography text="Enrolled Bank Accounts" type="title3" />
        </View>
        <Grid>{renderEnrolledBanks()}</Grid>
        {(banks.length < 2) && (
          <View style={global.content}>
            <TouchableOpacity style={global.fieldSeparator} onPress={() => navigation.navigate("ProfileSelectBanks", { from })}>
              <Typography style={[global.iconColor, global.textCenter]} type="body-bold" text="ADD ACCOUNT" />
            </TouchableOpacity>
          </View>
        )}
      </Content>
    </Container>
  );
}

EnrolledCard.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

EnrolledCard.defaultProps = {
  route: null,
};
