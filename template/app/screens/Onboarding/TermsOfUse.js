import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Animated, View, StyleSheet, Linking } from "react-native";
import { Container, Content, Text } from "native-base";
import Typography from "../../components/Typography";
import Header from "../../components/Headers/Common";
import IconDescription from "../../components/IconDescription";
import global from "../../utils/GlobalStyles";
import { singLifePrivacyPolicyUrl, websiteUrl } from "../../constants/constants";

const styles = StyleSheet.create({
  indentionMain: {
    paddingLeft: 10,
  },
  indentionSub: {
    paddingLeft: 25,
  },
});

function TermsOfUse({ navigation }) {
  const offset = useRef(new Animated.Value(0)).current;
  const onRedirect = (url) => {
    navigation.push("Webview", {
      passUrl: url,
    });
  };

  return (
    <Container>
      <Header
        animated
        animatedValue={offset}
        contained="solid"
        transparent
        right
        rightActionText="CLOSE"
        rightAction={() => navigation.goBack()}
        actionButton="right"
      />

      <Content
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
        style={global.wrapper}
      >
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography type="title3" text="Terms of Use" />

          <View style={global.body}>
            <Typography type="body-bold" text="Access to the App" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="Upon registration, you must provide the required Account information, and designate a User ID and password. By registering with the App, you warrant that all the information you provide are true, complete and up to date." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="You acknowledge that your nominated e-mail address and/or mobile phone number maintained in our records are active and valid, and will be where all enrollment, password-related information, documents, and other correspondences will be sent by us. We reserve the right to validate the information that you provide, and you will receive short message sending (SMS) or electronic mail (email) as confirmation." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Typography type="body" text="App Services will only be available after validation of the information you provided and authentication of your identity through various two-factor authentication methods. Once validated and authenticated, all instructions received from you through the App will be considered fully authorized, and valid and binding. We will not be liable for implementing the transactions you instructed, nor will we have the obligation to confirm the authenticity of any transaction received from you using the App other than by verifying your mobile number through OTP, your User ID and password, or through biometric authentication methods such as but not limited to fingerprint scanning, facial recognition or retina scan." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="d." />}
                >
                  <Typography type="body" text="The App may be installed in up to 5 mobile phones only and can only be accessed one at a time. If you install the App and attempt to access the App on a 6th mobile phone, you will not be permitted to do so. If the App will be installed on a new mobile phone, validation is needed by providing User Id, Password and mobile number through OTP." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="e." />}
                >
                  <Typography type="body" text="There will be instances when the App will be unavailable for use (e.g., system maintenance). Rest assured that we will notify you whenever App is unavailable for use." />
                </IconDescription>
              </View>
            </View>
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Online Password Security" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="You assume full responsibility and liability for all transactions made in your Accounts through the use of the App. It is understood that the password is known only to you and as such, any transaction effected using your password and/or OTP will be conclusively presumed to be done by you or authorized by you." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="You agree that Singlife is entitled to act on the instructions received from you through the App after the correct entry of your User ID, password and/or OTP, or biometric authentication methods such as but not limited to fingerprint scanning, facial recognition and retina scan. You further agree that we will not be liable, and you will indemnify us for any losses, damages or costs that we incur for acting in accordance with or based on your requests/instructions received through App." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Typography type="body" text="You agree to be fully responsible for the Mobile Phone you use to access the App including its maintenance, repair and installation of the necessary security patches and/or upgrades. " />
                </IconDescription>
              </View>
            </View>
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Accurancy of Information" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="Singlife will use reasonable efforts to ensure the accuracy of information accessed through the App but does not warrant the information will be free from error. If you notice an error in the information supplied to you through the App or by the use of any of the App services, you will advise us as soon as possible. We will endeavor to correct the error promptly on a “best efforts basis” and adjust any fees or charges arising out of the error." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="We accept no liability for the consequences arising out of erroneous information that may have been supplied by you through this facility. Hence, you are solely responsible for the correctness of the information that you supply to us through the use of the facility or through any other means such as electronic mail or written communication." />
                </IconDescription>
              </View>
            </View>
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Additional Features and Services" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="Singlife will introduce new App features and services from time to time. We will inform you of these new features and services. The terms in this App Agreement automatically apply to your use of these new features and services in addition to the specific terms and conditions that will be made available to you concerning these features and services." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="Singlife reserves the right to terminate, change or suspend, any of the services and features in the App." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Text>
                    <Typography type="body" text="Singlife is also free to change its vendors, suppliers, and partners in delivering the services. You understand and agree that Singlife may have to share your personal information to its new vendor, supplier, and/or partner to ensure continuity of service. Rest assured that we will safekeep your personal information in line with our" />

                    <Typography
                      type="body-bold"
                      text=" Privacy Policy "
                      style={global.iconColor}
                      onPress={() => onRedirect(singLifePrivacyPolicyUrl)}
                    />

                    <Typography type="body" text="and make sure that our vendor, supplier, and/or partner will do the same. Feel free to discontinue use of the App and contact our" />

                    <Typography
                      type="body-bold"
                      text=" customer support "
                      style={global.iconColor}
                      onPress={() => { navigation.navigate("ContactPage"); }}
                    />

                    <Typography type="body" text="should you disagree with the change and the sharing of your personal information." />
                  </Text>
                </IconDescription>
              </View>
            </View>
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Liability" />

            <Typography style={global.fieldSeparator} type="body" text="Singlife will not be liable for any loss or damage of whatever nature in connection with the implementation of transactions coursed through the App in the following instances: " />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="Disruption, failure, or delay relating to or in connection with the App and/or App Services which are due to circumstances beyond our control, unforeseen events, fortuitous events such as but not limited to pandemics, prolonged power outages, breakdown in computers, software, operating systems and telecommunication facilities, typhoons, floods, public disturbances, and calamities and other similar or related cases." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="Loss or damage arising out of any fraudulent access or utilization of the App due to:" />
                </IconDescription>
              </View>

              {/* list under data c */}
              <View style={[global.fieldSeparator, styles.indentionSub]}>
                <IconDescription
                  icon={<Typography type="body" text="1." />}
                >
                  <Typography type="body" text="theft;" />
                </IconDescription>
              </View>

              <View style={[global.fieldSeparator, styles.indentionSub]}>
                <IconDescription
                  icon={<Typography type="body" text="2." />}
                >
                  <Typography type="body" text="unauthorized disclosure of mobile phone numbers, emails, user ID or passwords; and" />
                </IconDescription>
              </View>

              <View style={[global.fieldSeparator, styles.indentionSub]}>
                <IconDescription
                  icon={<Typography type="body" text="3." />}
                >
                  <Typography type="body" text="unauthorized usage of biometrics and other security measures used by the App with or without your participation." />
                </IconDescription>
              </View>
              {/* list under data c */}

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Typography type="body" text="Your misuse of the App and/or any App Service." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="d." />}
                >
                  <Typography type="body" text="Any inaccurate, incomplete, or incorrect information you provided to us or any fraud or misrepresentation on your part." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="e." />}
                >
                  <Typography type="body" text="Any indirect, incidental, or consequential loss, loss of profit or damage suffered by reason of the use or failure or inability to use the App and/or App Services. " />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="f." />}
                >
                  <Typography type="body" text="Any and all liability, costs, damages, losses and causes of action arising from or in any way connected with the disclosure of information concerning your Accounts and/or transactions with us to unauthorized persons for any reason whatsoever, including but not limited to wiretapping of communication lines or erroneous connection by telecommunication switches, or errors in transmitted information due to faulty lines, and any and all forms of high technology surveillance or fraud." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="g." />}
                >
                  <Typography type="body" text="Any incidental or consequential loss, loss of profit or damage arising from the loss of your mobile phone, mobile devices and other electronic devices enrolled online." />
                </IconDescription>
              </View>
            </View>
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Service Charges and Taxes" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="You will need to be connected to the Internet when using the App. Internet usage may entail charges from your network provider and these are charged directly from your Mobile Phone prepaid load or postpaid account. It is your responsibility to monitor your Mobile Phone charges and to ensure that you have enough mobile credits to access the App and perform financial transactions using the App. We will not be liable for any failure to comply with your financial transaction instructions as a result of the insufficiency of your Mobile phone credits." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="You agree to pay the charges that may be imposed by us when availing of our App Services. We will deduct the charges directly from your Account balance as these are incurred. In the event that the Account has insufficient funds to cover both the financial transaction and the SMS / call charges, if applicable, we reserve the right to refuse to comply with your instructions(s) and you agree that we will not be liable for any losses, costs, or damages which you or any third party may suffer therefrom." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Text>
                    <Typography type="body" text="Singlife reserves the right to change the charges, fees, or other terms described in this App Agreement. When changes are made and/or fees, charges or other material terms are added, we will inform you of such changes either by sending a notice to you at the address you have provided us or send you an email. We may also choose to publish such changes in our" />

                    <Typography
                      type="body-bold"
                      text=" website "
                      style={global.iconColor}
                      onPress={() => Linking.openURL(`https://${websiteUrl}`)}
                    />

                    <Typography type="body" text="or mobile app. " />
                  </Text>
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="d." />}
                >
                  <Typography type="body" text="You agree to be responsible to check the Website from time to time, for any updates to this App Agreement and you further agree that your continued use of the App after any of the changes have taken effect will constitute your consent and adherence to such changes." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="e." />}
                >
                  <Typography type="body" text="You may choose to decline changes by refraining from using the App Services to which these changes relate. However, charges already incurred will remain due from and payable by you. We also reserve the option, in our business judgment, to waive, reduce or reverse charges or fees on a case-to-case basis." />
                </IconDescription>
              </View>
            </View>
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Termination of the Agreement" />

            <Typography style={global.fieldSeparator} type="body" text="You may terminate your use at any time of the App and / or App Services in the following manner. " />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="If you no longer wish to use the App and / or App Services, you can delete/ uninstall the application from the Mobile Phones where you have installed the App. Without the App, you will no longer be able to perform App Services, but you will remain responsible for all transactions performed on your Account and the corresponding fees, charges and taxes which may be due thereon." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="You can also contact us to deactivate your account. This will immediately cancel all your policies. Any remaining balance will be reverted to your bank account." />
                </IconDescription>
              </View>
            </View>

            <Typography style={global.fieldSeparator} type="body" text="Singlife may, at its sole discretion, immediately terminate your use of the App and / or any App Service without incurring any liability should any of the following occur:" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="You fail or refuse to comply with any provision in this App Agreement, and/or Terms of Use. " />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="If your continued use of the App and / or the App Services will expose Singlife to any kind of risk such as but not limited to financial, operational, legal, reputational, regulatory risks." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Typography type="body" text="Your refusal to provide any information required by us or should there be misrepresentation on your part or falsities in the information you provided." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="d." />}
                >
                  <Typography type="body" text="We may also withdraw the App and/or any App Service for security and other reasons. In such instances, you will be given reasonable prior notice." />
                </IconDescription>
              </View>
            </View>

            <Typography style={global.fieldSeparator} type="body" text="The Agreement comprised in this App Agreement will be deemed to remain in full force and effect if and as far as any transaction is completed but not debited to your Account/s prior to termination of the service. Also, termination of the App will not prejudice your liability in respect of things done or omitted to be done prior to termination thereof." />
          </View>

          <View style={global.body}>
            <Typography type="body-bold" text="Miscellaneous" />

            <View style={styles.indentionMain}>
              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="a." />}
                >
                  <Typography type="body" text="Should Singlife become involved in any litigation in relation with this App Agreement or the services performed by virtue of your use of the App, or with any of the rights, powers, and remedies hereunder, all fees and expenses incurred by us in such a litigation, including a reasonable amount for the attorney's fees which amount is hereby agreed to be at the rate of 10% of the sum sought, will be paid by you. " />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="b." />}
                >
                  <Typography type="body" text="It will be understood that access to and use of the App will be subject to applicable requirements and procedures of the proper regulatory authorities and those prescribed by law." />
                </IconDescription>
              </View>

              <View style={global.fieldSeparator}>
                <IconDescription
                  icon={<Typography type="body" text="c." />}
                >
                  <Typography type="body" text="The venue of all legal actions or proceedings arising out of or in connection with these Terms and Conditions will be brought only in the proper courts of Taguig City to the exclusion of all other venues." />
                </IconDescription>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
}

TermsOfUse.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TermsOfUse;
