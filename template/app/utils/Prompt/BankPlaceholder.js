import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Container, Content, View } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { updateCashInHistory, updateStatus } from "../../redux/cashin";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import AlertMessage from "../../screens/CashIn/AlertMessage";
import global from "../GlobalStyles";

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default function BankPlaceholder({ navigation, route }) {
  const { bank, next } = route.params;
  const dateToday = new Date();
  const dispatch = useDispatch();
  const cashInInfo = useSelector(state => state.cashin.cashIn);
  const [alert, showAlert] = useState(false);

  const onSubmit = () => {
    const cashInHistoryItem = {
      id: cashInInfo.history.length + 1,
      amount: cashInInfo.amount,
      datetime_created: dateToday,
      from: 4,
      going_to: 2,
      ending_balance: 10000,
      bank_data: {
        bank_name: bank,
      },
    };

    if (cashInInfo.amount !== 1001) {
      dispatch(updateCashInHistory(cashInHistoryItem));
    }

    if (next === "SinglifeAccountActivated") {
      navigation.push(next);
    } else {
      showAlert(true);
    }
  };

  const alertAction = () => {
    showAlert(false);

    if (cashInInfo.amount !== 1001) {
      dispatch(updateStatus(false));
      navigation.push("MainTab");
    }

    if (cashInInfo.amount === 1001 && cashInInfo.history.length === 0) {
      navigation.navigate("CashIn");
    }

    if (cashInInfo.amount === 1001 && cashInInfo.history.length !== 0) {
      dispatch(updateStatus(true));
      navigation.push("MainTab");
    }
  };

  const closeAlert = () => {
    showAlert(false);

    if (cashInInfo.amount === 1001) {
      dispatch(updateStatus(true));
    } else {
      dispatch(updateStatus(false));
    }

    navigation.navigate("Account");
    // navigation.push("MainTab");
  };

  return (
    <Container>
      <Header transparent />

      <Content style={global.wrapper} contentContainerStyle={styles.content}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography text={`Connecting to - ${bank}`} type="body-bold" />

          <View style={global.fieldSeparator}>
            <Button
              full
              variant="primary-contained"
              text="Proceed"
              onPress={onSubmit}
            />
          </View>
        </View>
      </Content>

      <AlertMessage open={alert} type={cashInInfo.amount === 1001 ? "fail" : "success"} footerAction={alertAction} closeAction={closeAlert} />
    </Container>
  );
}

BankPlaceholder.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

BankPlaceholder.defaultProps = {
  route: {},
};
