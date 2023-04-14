import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useToast } from "react-native-toast-notifications";
import { navigationRef } from "../components/RootNavigation";
import BottomSheet from "../components/BottomSheet";
import Button from "../components/Buttons/Button";
import Typography from "../components/Typography";
import global from "../utils/GlobalStyles";

// Redux
import { resetCustomerInfo } from "../redux/customer";
import { updateInvalidDevice } from "../redux/device";

// API
import { getRefreshToken } from "../api/auth";
import credentials from "../api/config/credentials";

// Helper - Utils
import { getSecureStore, saveSecureStore } from "../constants/helper";
import logoutFunction from "../utils/Logout";

// Splash
import Splash from "../screens/Splash";

// Login
import Login from "../screens/OnboardingSSO";
import BiometricsLogin from "../screens/OnboardingSSO/BiometricsLogin";
import Eligible from "../screens/OnboardingSSO/Eligible";
import NotEligible from "../screens/OnboardingSSO/NotEligible";
import OTPVerification from "../screens/OnboardingSSO/Otp";
import SsoTool from "../screens/OnboardingSSO/SsoTool";
import UpdatePassword from "../screens/OnboardingSSO/UpdatePassword";

// Prompts
import Placeholder from "../utils/Prompt/Placeholder";
import AccountPlaceholder from "../utils/Prompt/AccountPlaceholder";
import BankPlaceholder from "../utils/Prompt/BankPlaceholder";
import BPIPlaceholder from "../utils/Prompt/BPIPlaceholder";
import Webview from "../utils/Prompt/Webview";

// Non SSO
import SinglifeAccount from "../screens/Onboarding/SinglifeAccount";
import SinglifePlan from "../screens/Onboarding/SinglifePlan";
import SinglifeProtect from "../screens/Onboarding/SinglifeProtect";
import AboutUs from "../screens/Onboarding/AboutUs";
import Legal from "../screens/Onboarding/Legal";
import ContactPage from "../screens/Onboarding/ContactPage";
import Faq from "../screens/Onboarding/FaqIndex";
import TermsOfUse from "../screens/Onboarding/TermsOfUse";

// SSO
import OnboardingSlide from "../screens/Onboarding/OnboardingSlide";
import AccountCreation from "../screens/OnboardingSSO/AccountCreation";
import PersonalInformationEdit from "../screens/OnboardingSSO/PersonalInformationEdit";
import ContactInformationEdit from "../screens/OnboardingSSO/ContactInformationEdit";
import FinancialInformationEdit from "../screens/OnboardingSSO/FinancialInformationEdit";
import ReviewInformation from "../screens/OnboardingSSO/ReviewInformation";
import CreatePassword from "../screens/OnboardingSSO/CreatePassword";
import EmailConfirmation from "../screens/OnboardingSSO/EmailConfirmation";

// Ekyc
import Ekyc from "../screens/Ekyc";
import GovernmentId from "../screens/Ekyc/GovernmentId";
import ReviewId from "../screens/Ekyc/ReviewId";
import Selfie from "../screens/Ekyc/Selfie";
import ReviewSelfie from "../screens/Ekyc/ReviewSelfie";
import Processing from "../screens/Ekyc/Processing";
import EkycPersonalInformation from "../screens/Ekyc/EkycPersonalInformation";
import EkycPersonalInformationFail from "../screens/Ekyc/EkycPersonalInformationFail";
import EkycReviewProfile from "../screens/Ekyc/EkycReviewProfile";
import CaptureId from "../screens/Ekyc/CaptureId";
import CaptureSelfie from "../screens/Ekyc/CaptureSelfie";

// Notification
import Notification from "../screens/Notification";
import WithoutNotes from "../screens/Notification/WithoutNotes";
import WithIllustration from "../screens/Notification/WithIllustration";
import EkycFailAttempt from "../screens/Notification/EkycFailAttempt";
import EkycAttemptExceed from "../screens/Notification/EkycAttemptExceed";
import EkycDeclined from "../screens/Notification/EkycDeclined";

// Profile
import MainProfile from "../screens/Profile";
import ProfileOptions from "../screens/Profile/ProfileOptions";
import ProfileCustomerId from "../screens/Profile/ProfileCustomerId";
import ProfilePasswordSecurity from "../screens/Profile/ProfilePasswordSecurity";
import ProfilePromotionsAndCampaigns from "../screens/Profile/ProfilePromotionsAndCampaigns";
import ProfilePersonalInformationEdit from "../screens/Profile/ProfilePersonalInformationEdit";
import ProfileContactInformationEdit from "../screens/Profile/ProfileContactInformationEdit";
import ProfileFinancialInformationEdit from "../screens/Profile/ProfileFinancialInformationEdit";
import ProfileEnrolledBanks from "../screens/Profile/ProfileEnrolledBanks";
import ProfileNewBankDetails from "../screens/Profile/ProfileNewBankDetails";
import ProfileEditBankDetails from "../screens/Profile/ProfileEditBankDetails";
import ProfileSelectBanks from "../screens/Profile/ProfileSelectBanks";

// PFE
import PFE from "../screens/PFE";
import SinglifeAccountBenefits from "../screens/PFE/SinglifeAccountBenefits";
import Declaration from "../screens/PFE/Declaration";
import Benefits from "../screens/PFE/Benefits";
import ProtectFromEmergency from "../screens/PFE/ProtectFromEmergency";
import Beneficiary from "../screens/PFE/Beneficiary";
import SurvivingFamilyMembers from "../screens/PFE/SurvivingFamilyMembers";
import AccountPage from "../screens/PFE/AccountPage";
import TermsAndConditions from "../screens/PFE/TermsAndConditions";
import ExclusionsAndLimitations from "../screens/PFE/ExclusionsAndLimitations";
import AcknowledgementAndDeclarations from "../screens/PFE/AcknowledgementAndDeclarations";

// Cash In
import CashIn from "../screens/CashIn";
import SinglifeCardTerms from "../screens/CashIn/SinglifeCardTerms";
import CashInFirstTime from "../screens/CashIn/CashInFirstTime";
import TransferViaInstapay from "../screens/CashIn/TransferViaInstapay";
import BPIAccountList from "../screens/CashIn/BPIAccountList";
import BPIAuthPage from "../screens/CashIn/BPIAuthPage";
import UBPAuthPage from "../screens/CashIn/UBPAuthPage";
import SinglifeAccountActivated from "../screens/CashIn/SinglifeAccountActivated";
import CashInAmount from "../screens/CashIn/CashInAmount";
import CashInOtp from "../screens/CashIn/CashInOtp";
import CashInNotify from "../screens/CashIn/CashInNotify";

// Cash Out
import WithdrawalAmount from "../screens/CashOut/WithdrawalAmount";
import ReviewAmount from "../screens/CashOut/ReviewAmount";
import TransferSuccess from "../screens/CashOut/TransferSuccess";
import CashOutOtp from "../screens/CashOut/CashOutOtp";
import AccessSinglifeWallet from "../screens/CashOut/AccessSinglifeWallet";
import TransferFail from "../screens/CashOut/TransferFail";

// Singelife Card
import TransactionHistoryRequestCopy from "../screens/SinglifeCard/TransactionHistoryRequestCopy";
import CardReplacementReason from "../screens/SinglifeCard/CardReplacementReason";
import SelectDeliveryAddress from "../screens/SinglifeCard/SelectDeliveryAddress";
import ConfirmCardReplacement from "../screens/SinglifeCard/ConfirmCardReplacement";
import DeliveryAddress from "../screens/SinglifeCard/DeliveryAddress";
import AddNewAddressOtp from "../screens/SinglifeCard/AddNewAddressOtp";
import EditAddressOtp from "../screens/SinglifeCard/EditAddressOtp";
import TemporaryBlockOtp from "../screens/SinglifeCard/TemporaryBlockOtp";
import AccessSinglifeAccount from "../screens/SinglifeCard/AccessSinglifeAccount";
import PermanentlyBlocked from "../screens/SinglifeCard/PermanentlyBlocked";
import DeliveryDetails from "../screens/SinglifeCard/DeliveryDetails";
import ShowCard from "../screens/SinglifeCard/ShowCard";
import CardActivation from "../screens/SinglifeCard/CardActivation";
import NominatePin from "../screens/SinglifeCard/NominatePin";
import SinglifeWallet from "../screens/SinglifeCard/SinglifeWallet";
import CardPreview from "../screens/SinglifeCard/CardPreview";

// Main Tabs
import MainTab from "../screens/MainTabs";
import TransactionHistory from "../screens/MainTabs/TransactionHistory";
import InterestRateInfo from "../screens/MainTabs/InterestRateInfo";
import AccountDetails from "../screens/MainTabs/AccountDetails";

// Help
import HelpHub from "../screens/HelpHub";
import HelpAbout from "../screens/HelpHub/HelpAbout";
import SinglifeAccountTermsAndConditions from "../screens/HelpHub/SinglifeAccountTermsAndConditions";

// Policy Viewing
import PolicyView from "../screens/PolicyViewing/PolicyView";
import Documents from "../screens/PolicyViewing/Documents";
import CancelPolicy from "../screens/PolicyViewing/CancelPolicy";
import CancelPolicyReasons from "../screens/PolicyViewing/CancelPolicy/Reasons";
import CancelPolicyDone from "../screens/PolicyViewing/CancelPolicy/Done";

// Timers
let inactivityTimer = null;
let expiresTimer = null;

const Stack = createStackNavigator();
function Navigation() {
  const toast = useToast();
  const dispatch = useDispatch();
  const inactivityAlertActionSheetRef = useRef();
  const inactivityAlertScrollViewRef = useRef();
  const logoutAlertActionSheetRef = useRef();
  const logoutAlertScrollViewRef = useRef();
  const login6thDeviceActionSheetRef = useRef();
  const login6thDeviceScrollViewRef = useRef();
  const differentDeviceActionSheetRef = useRef();
  const differentDeviceScrollViewRef = useRef();
  const customerInfo = useSelector(state => state.customer.customer_info);
  const is6thDevice = useSelector(state => state.device.is_6th_device);
  const invalidDevice = useSelector(state => state.device.invalid_device);

  const [inactivityTimeBase, setInactivityTimeBase] = useState(0);
  const [inactivityTimeCount, setInactivityTimeCount] = useState(0);
  const [inactivityTimeStart, setInactivityTimeStart] = useState(true);
  const [logoutTimeCount, setLogoutTimeCount] = useState(180);
  const [logoutTimeStart, setLogoutTimeStart] = useState(false);

  const [expiresTimeCount, setExpiresTimeCount] = useState(0);
  const [expiresTimeStart, setExpiresTimeStart] = useState(false);
  const [expiresIn, setExpiresIn] = useState(0);
  const [refereshExpiresIn, setRefereshExpiresIn] = useState(0);

  const onGetRefreshToken = async () => {
    const tokens = await getSecureStore("singlifeTokens");
    const parseToken = JSON.parse(tokens);

    if (tokens !== null) {
      const payload = {
        client_id: credentials.dev.token_client_id,
        grant_type: credentials.dev.token_refresh_grant_type,
        client_secret: credentials.dev.token_client_secret,
        redirect_uri: credentials.dev.token_redirect_uri,
        refresh_token: parseToken.refresh_token,
      };

      await getRefreshToken(payload)
        .then((response) => {
          const { data } = response;
          const updatedTokens = {
            ...parseToken,
            access_token: data.access_token,
            expires_in: data.expires_in,
            id_token: data.id_token,
            "not-before-policy": data["not-before-policy"],
            refresh_expires_in: data.refresh_expires_in,
            sessionTimeout: data.sessionTimeout,
            scope: data.scope,
            token_type: data.token_type,
            session_state: data.session_state,
            refresh_token: data.refresh_token,
            inactivityTimeout: data.inactivityTimeout,
          };

          saveSecureStore("singlifeTokens", JSON.stringify(updatedTokens));
          setExpiresIn(data.expires_in);
          setRefereshExpiresIn(data.refresh_expires_in);
          setExpiresTimeStart(true);
          setExpiresTimeCount(0);
        })
        .catch((err) => {
          console.log("REFRESH_TOKEN_ERROR NAVIGATION", err.response);
          toast.show(`Error: On Refresh Token: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
            type: "custom_type",
            placement: "top",
            duration: 3000,
            offset: 10,
            animationType: "zoom-in",
          });
        });
    }
  };

  const setTimeoutsBase = async () => {
    const tokens = await getSecureStore("singlifeTokens");
    const parseToken = JSON.parse(tokens);

    if (parseToken !== null) {
      setInactivityTimeBase(parseToken.inactivityTimeout / 1000);
      setLogoutTimeCount((parseToken.sessionTimeout / 1000));
      setExpiresIn(parseToken.expires_in);
      setRefereshExpiresIn(parseToken.refresh_expires_in);
      setExpiresTimeStart(true);
      setInactivityTimeStart(true);
    }
  };

  const handleLogout = async () => {
    inactivityAlertActionSheetRef.current.hide();
    logoutAlertActionSheetRef.current.hide();
    differentDeviceActionSheetRef.current.hide();

    setInactivityTimeStart(false);
    setInactivityTimeCount(0);
    setLogoutTimeStart(false);

    const logoutResponse = await logoutFunction();
    const deviceInfo = await getSecureStore("deviceInfo");
    const parseDevice = JSON.parse(deviceInfo);

    if (logoutResponse === "SUCCESS") {
      if (parseDevice?.fingerprint_id_enabled === 1 || parseDevice?.face_id_enable === 1) {
        navigationRef.current.navigate("BiometricsLogin");
      } else if (parseDevice?.mobile_num !== "") {
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "SsoTool", params: { mobileNum: `+${parseDevice?.mobile_num}` } }],
        });
      } else {
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
      dispatch(resetCustomerInfo());
    } else {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  const handleKeepLogin = () => {
    setInactivityTimeStart(true);
    setInactivityTimeCount(0);
    setLogoutTimeStart(false);
    setTimeoutsBase();
    onGetRefreshToken();
    inactivityAlertActionSheetRef.current.hide();
  };

  const resetInactivity = () => {
    if (!logoutTimeStart) setInactivityTimeCount(0);
  };

  useEffect(() => {
    if (inactivityTimeBase !== 0) {
      if (inactivityTimeStart === true && inactivityTimeCount < inactivityTimeBase && customerInfo.mobile_num !== "") {
        inactivityTimer = setTimeout(() => {
          setInactivityTimeCount(inactivityTimeCount + 1);
        }, 1000);
      } else if (inactivityTimeCount === inactivityTimeBase) {
        inactivityAlertActionSheetRef.current.show();
        setInactivityTimeStart(false);
        setLogoutTimeStart(true);
      }

      if (logoutTimeStart === true && logoutTimeCount !== 0 && customerInfo.mobile_num !== "") {
        inactivityTimer = setTimeout(() => {
          setLogoutTimeCount((logoutTimeCount - 1));
        }, 1000);
      } else if (logoutTimeCount === 0) {
        setLogoutTimeStart(false);
        inactivityAlertActionSheetRef.current.hide();
        setTimeout(() => {
          logoutAlertActionSheetRef.current.show();
        }, 300);
      }
    }

    return () => {
      clearTimeout(inactivityTimer);
    };
  }, [inactivityTimeStart, inactivityTimeCount, logoutTimeStart, logoutTimeCount, customerInfo.mobile_num, inactivityTimeBase]);

  useEffect(() => {
    if (expiresIn !== 0 && expiresTimeStart && customerInfo.party_id !== "" && expiresIn !== expiresTimeCount) {
      expiresTimer = setTimeout(() => {
        setExpiresTimeCount(expiresTimeCount + 1);
      }, 1000);
    } else if ((expiresIn === expiresTimeCount) && customerInfo.party_id !== "") {
      setExpiresTimeStart(false);
      onGetRefreshToken();
    }

    return () => {
      clearTimeout(expiresTimer);
    };
  }, [customerInfo.party_id, expiresIn, refereshExpiresIn, expiresTimeStart, expiresTimeCount]);

  useEffect(() => {
    if (is6thDevice) logoutAlertActionSheetRef.current.show();
  }, [is6thDevice]);

  useEffect(() => {
    if (!invalidDevice) {
      differentDeviceActionSheetRef.current.show();
    }

    dispatch(updateInvalidDevice(true));
  }, [invalidDevice]);

  useEffect(() => {
    setTimeout(() => {
      setTimeoutsBase();
    }, 2000);
  }, []);

  return (
    <View style={{ width: '100%', height: '100%' }} onTouchStart={() => resetInactivity()}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Splash" component={Splash} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="OnboardingSlide" component={OnboardingSlide} />

        {/* Login */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="BiometricsLogin" component={BiometricsLogin} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Eligible" component={Eligible} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="NotEligible" component={NotEligible} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="OTPVerification" component={OTPVerification} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="SsoTool" component={SsoTool} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="UpdatePassword" component={UpdatePassword} />

        {/* Prompts */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Placeholder" component={Placeholder} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AccountPlaceholder" component={AccountPlaceholder} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="BankPlaceholder" component={BankPlaceholder} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="BPIPlaceholder" component={BPIPlaceholder} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="Webview" component={Webview} />

        {/* Non SSO */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifeAccount" component={SinglifeAccount} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifePlan" component={SinglifePlan} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifeProtect" component={SinglifeProtect} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Legal" component={Legal} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AboutUs" component={AboutUs} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ContactPage" component={ContactPage} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Faq" component={Faq} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="TermsOfUse" component={TermsOfUse} />

        {/* SSO */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AccountCreation" component={AccountCreation} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="PersonalInformationEdit" component={PersonalInformationEdit} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="ContactInformationEdit" component={ContactInformationEdit} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="FinancialInformationEdit" component={FinancialInformationEdit} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ReviewInformation" component={ReviewInformation} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CreatePassword" component={CreatePassword} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EmailConfirmation" component={EmailConfirmation} />

        {/* Ekyc */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Ekyc" component={Ekyc} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="GovernmentId" component={GovernmentId} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ReviewId" component={ReviewId} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Selfie" component={Selfie} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ReviewSelfie" component={ReviewSelfie} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Processing" component={Processing} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EkycReviewProfile" component={EkycReviewProfile} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EkycPersonalInformation" component={EkycPersonalInformation} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EkycPersonalInformationFail" component={EkycPersonalInformationFail} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CaptureId" component={CaptureId} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CaptureSelfie" component={CaptureSelfie} />

        {/* Notification */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Notification" component={Notification} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="WithoutNotes" component={WithoutNotes} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="WithIllustration" component={WithIllustration} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EkycFailAttempt" component={EkycFailAttempt} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EkycAttemptExceed" component={EkycAttemptExceed} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EkycDeclined" component={EkycDeclined} />

        {/* Profile */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="MainProfile" component={MainProfile} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfilePersonalInformationEdit" component={ProfilePersonalInformationEdit} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileContactInformationEdit" component={ProfileContactInformationEdit} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileFinancialInformationEdit" component={ProfileFinancialInformationEdit} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileOptions" component={ProfileOptions} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileCustomerId" component={ProfileCustomerId} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfilePromotionsAndCampaigns" component={ProfilePromotionsAndCampaigns} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfilePasswordSecurity" component={ProfilePasswordSecurity} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileEnrolledBanks" component={ProfileEnrolledBanks} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileSelectBanks" component={ProfileSelectBanks} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileNewBankDetails" component={ProfileNewBankDetails} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ProfileEditBankDetails" component={ProfileEditBankDetails} />

        {/* PFE */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="PFE" component={PFE} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifeAccountBenefits" component={SinglifeAccountBenefits} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Declaration" component={Declaration} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="Benefits" component={Benefits} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="ProtectFromEmergency" component={ProtectFromEmergency} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="Beneficiary" component={Beneficiary} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SurvivingFamilyMembers" component={SurvivingFamilyMembers} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AccountPage" component={AccountPage} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ExclusionsAndLimitations" component={ExclusionsAndLimitations} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AcknowledgementAndDeclarations" component={AcknowledgementAndDeclarations} />

        {/* Cash In */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CashIn" component={CashIn} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="SinglifeCardTerms" component={SinglifeCardTerms} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="TransferViaInstapay" component={TransferViaInstapay} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="BPIAccountList" component={BPIAccountList} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="BPIAuthPage" component={BPIAuthPage} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="UBPAuthPage" component={UBPAuthPage} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifeAccountActivated" component={SinglifeAccountActivated} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CashInFirstTime" component={CashInFirstTime} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CashInAmount" component={CashInAmount} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CashInOtp" component={CashInOtp} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="CashInNotify" component={CashInNotify} />

        {/* Cash Out */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="WithdrawalAmount" component={WithdrawalAmount} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ReviewAmount" component={ReviewAmount} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="TransferSuccess" component={TransferSuccess} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CashOutOtp" component={CashOutOtp} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AccessSinglifeWallet" component={AccessSinglifeWallet} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="TransferFail" component={TransferFail} />

        {/* Singlife Card */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="TransactionHistoryRequestCopy" component={TransactionHistoryRequestCopy} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CardReplacementReason" component={CardReplacementReason} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SelectDeliveryAddress" component={SelectDeliveryAddress} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ConfirmCardReplacement" component={ConfirmCardReplacement} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="DeliveryAddress" component={DeliveryAddress} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AddNewAddressOtp" component={AddNewAddressOtp} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="EditAddressOtp" component={EditAddressOtp} />
        <Stack.Screen options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} name="TemporaryBlockOtp" component={TemporaryBlockOtp} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AccessSinglifeAccount" component={AccessSinglifeAccount} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="PermanentlyBlocked" component={PermanentlyBlocked} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="DeliveryDetails" component={DeliveryDetails} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="ShowCard" component={ShowCard} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CardActivation" component={CardActivation} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="NominatePin" component={NominatePin} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifeWallet" component={SinglifeWallet} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CardPreview" component={CardPreview} />

        {/* Main Tabs */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="MainTab" component={MainTab} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="InterestRateInfo" component={InterestRateInfo} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="AccountDetails" component={AccountDetails} />

        {/* Help */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="HelpHub" component={HelpHub} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="HelpAbout" component={HelpAbout} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="SinglifeAccountTermsAndConditions" component={SinglifeAccountTermsAndConditions} />

        {/* Policy Viewing */}
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="PolicyView" component={PolicyView} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="PolicyDocuments" component={Documents} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CancelPolicy" component={CancelPolicy} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CancelPolicyReasons" component={CancelPolicyReasons} />
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name="CancelPolicyDone" component={CancelPolicyDone} />

      </Stack.Navigator>
      <BottomSheet actionSheetRef={inactivityAlertActionSheetRef} scrollViewRef={inactivityAlertScrollViewRef} persistTap closeOnTouchBackdrop={false} closeOnPressBack={false}>
        <View style={global.contentNoVertical}>
          <Typography text="Hello, are you still there?" type="title2" />
          <Grid style={global.fieldSeparator}>
            <Row size={4}>
              <Col>
                <Text>
                  <Typography text="You seem busy. For your security, we'll automatically log you out in." type="body" />
                  <Typography text={` ${logoutTimeCount} `} type="body-bold" />
                  <Typography text="seconds." type="body" />
                </Text>
              </Col>
            </Row>
            <Row size={4} style={global.fieldSeparator}>
              <Col>
                <Button full variant="default-outlined" text="LOG ME OUT" onPress={() => handleLogout()} />
              </Col>
            </Row>
            <Row size={4} style={global.fieldSeparatorHalf}>
              <Col>
                <Button full variant="primary-default" text="KEEP ME LOGGED IN" onPress={() => handleKeepLogin()} />
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet>

      <BottomSheet actionSheetRef={login6thDeviceActionSheetRef} scrollViewRef={login6thDeviceScrollViewRef} onClose={() => handleLogout()}>
        <View style={global.contentNoVertical}>
          <Typography text="You’ve logged in on your 6th device." type="title3" />
          <Grid style={global.fieldSeparator}>
            <Row size={4}>
              <Col>
                <Typography text="You’ve already logged in on 5 different devices. You can no longer log in on another device." type="body" />
              </Col>
            </Row>
            <Row size={4} style={global.fieldSeparator}>
              <Col>
                <Button full variant="default-outlined" text="OK" onPress={() => handleLogout()} />
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet>

      <BottomSheet actionSheetRef={logoutAlertActionSheetRef} scrollViewRef={logoutAlertScrollViewRef} onClose={() => handleLogout()} persistTap closeOnTouchBackdrop={false} closeOnPressBack={false}>
        <View style={global.contentNoVertical}>
          <Typography text="Logged out" type="title3" />
          <Grid style={global.fieldSeparator}>
            <Row size={4}>
              <Col>
                <Typography text="For your security, we logged you out. Please log in again." type="body" />
              </Col>
            </Row>

            <Row size={4} style={global.fieldSeparator}>
              <Col>
                <Button full variant="primary-contained" text="LOG IN" onPress={() => handleLogout()} />
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet>

      <BottomSheet actionSheetRef={differentDeviceActionSheetRef} scrollViewRef={differentDeviceScrollViewRef} onClose={() => handleLogout()}>
        <View style={global.contentNoVertical}>
          <Typography text="Logged out" type="title3" />
          <Grid style={global.fieldSeparator}>
            <Row size={4}>
              <Col>
                <Typography text="We noticed you logged in on a different device. For your security, we logged you out of this device." type="body" />
              </Col>
            </Row>
            <Row size={4} style={global.fieldSeparator}>
              <Col>
                <Button full variant="default-outlined" text="OK" onPress={() => handleLogout()} />
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet>
    </View>
  );
}

export default Navigation;
