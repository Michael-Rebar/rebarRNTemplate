import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { verticalScale } from "react-native-size-matters";
import color from "./Color";

const screenHeight = Dimensions.get("screen").height - StatusBar.currentHeight;
const screenWidth = Dimensions.get("window").width;
const toastPosition = Platform.OS === "ios" ? screenWidth * 0.275 : screenWidth * 0.3;
export default StyleSheet.create({
  wrapper: {
    backgroundColor: color.white,
  },
  content: {
    paddingVertical: "5%",
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: "8%",
  },
  contentNoTopPadding: {
    paddingTop: 0,
  },
  container: {
    height: screenHeight,
  },
  iconBtn: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: color.orangeRed,
    fontFamily: "SharpSansSemibold",
    fontSize: RFValue(14),
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  iconButton: {
    padding: 0,
  },
  iconColor: {
    color: color.orangeRed,
  },
  grayBox: {
    backgroundColor: color.veryLightGray,
    borderColor: color.border,
    padding: 24,
    borderRadius: 4,
  },
  body: {
    marginTop: 40,
  },
  body2: {
    marginTop: 80,
  },
  labelSeparator: {
    marginTop: 5,
  },
  fieldSeparator: {
    marginTop: 24,
  },
  buttonSeparator: {
    marginTop: 14,
  },
  buttonSeparatorHalf: {
    marginTop: 7,
  },
  illuSeparator: {
    marginTop: 44,
  },
  betweenButtonsLeft: {
    paddingRight: 15.1,
  },
  betweenButtonsRight: {
    paddingLeft: 15.1,
  },
  rowSeparator: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: color.veryLightPink,
    backgroundColor: color.veryLightPink,
  },
  bgGray: {
    backgroundColor: color.lightGray,
  },
  link: {
    width: "auto",
  },
  carouselImage: {
    alignItems: "center",
    backgroundColor: "rgb(241, 251, 250)",
    borderRadius: 4,
    height: screenHeight * 0.25,
    justifyContent: "center",
    width: "100%",
  },
  carouselImagePlain: {
    alignItems: "center",
    borderRadius: 4,
    height: screenHeight * 0.25,
    justifyContent: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  modalView: {
    marginTop: 20,
    marginHorizontal: "2%",
    marginBottom: 0,
    paddingBottom: 0,
  },
  modalViewListItem: {
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 0,
  },
  modalViewTitle: {
    marginHorizontal: "2%",
  },
  modalHeaderView: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 3,
    elevation: 0,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalFooterView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 3,
    elevation: 0,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalFooterViewForm: {
    width: "100%",
    zIndex: 3,
    elevation: 0,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  modalFooterViewFormSticky: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 3,
    elevation: 0,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  passwordShow: {
    position: "absolute",
    bottom: 13,
    right: 0,
  },
  passwordIcon: {
    color: color.black,
  },
  iconListItem: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
  },
  iconListItemCenter: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconListItemStart: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  iconListItemContent: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    paddingLeft: 12,
  },
  iconListItemContentBetween: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  hide: {
    display: "none",
  },
  textlink: {
    fontSize: RFValue(14),
    color: color.black,
    fontFamily: "SharpSansBook",
    lineHeight: RFValue(20),
    letterSpacing: 0.5,
  },
  textlinkSmall: {
    fontSize: RFValue(12),
    color: color.black,
    fontFamily: "SharpSansBook",
    lineHeight: RFValue(20),
  },
  textlinkButtonDefault: {
    fontSize: RFValue(14),
    fontFamily: "SharpSansBook",
  },
  textlinkButtonBold: {
    fontFamily: "SharpSansSemibold",
    fontSize: RFValue(14),
    lineHeight: RFValue(18.41),
    letterSpacing: 0.5,
  },
  textlinkBold: {
    fontFamily: "SharpSansSemibold",
    fontSize: RFValue(14),
    lineHeight: RFValue(22),
    letterSpacing: 0.5,
  },
  iconColorError: {
    color: color.errorRed,
  },
  fieldSeparatorHalf: {
    marginTop: 12,
  },
  fieldSeparatorThird: {
    marginTop: 8,
  },
  contentNoVertical: {
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: "3%",
  },
  textlinkOrange: {
    fontSize: RFValue(14),
    fontWeight: "400",
    fontFamily: "SharpSansBook",
    color: color.orangeRed,
    lineHeight: RFValue(18.41),
    letterSpacing: 0.5,
  },
  textlinkBlack: {
    fontSize: RFValue(14),
    fontWeight: "400",
    fontFamily: "SharpSansBook",
    lineHeight: RFValue(18.41),
    letterSpacing: 0.5,
  },
  tabContentColor: {
    backgroundColor: "#FAFAFA",
  },
  cameraSubText: {
    fontSize: RFValue(12),
    lineHeight: RFValue(16),
    fontFamily: "SharpSansBook",
    fontWeight: "500",
    color: color.white,
  },
  radioItem: {
    flexDirection: "row",
    borderBottomColor: color.veryLightPink,
    borderBottomWidth: 1,
    paddingVertical: verticalScale(22),
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  radioItemNotCenter: {
    flexDirection: "row",
    borderBottomColor: color.veryLightPink,
    borderBottomWidth: 1,
    paddingVertical: verticalScale(22),
    paddingHorizontal: "5%",
  },
  contentVertical: {
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: "6%",
    paddingTop: "6%",
  },
  textAlignRight: {
    textAlign: "right",
  },
  centerVertically: {
    justifyContent: "center",
  },
  alignItemsFlexEnd: {
    alignItems: "flex-end",
  },
  alignItemsFlexStart: {
    alignItems: "flex-start",
  },
  textParagraph: {
    paddingBottom: "5%",
  },
  textWithUnderline: {
    textDecorationLine: "underline",
  },
  whiteText: {
    color: color.white,
  },
  box: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 26,
    paddingHorizontal: "5%",
  },
  close: {
    position: "absolute",
    right: 8,
    top: 12,
    zIndex: 2,
  },
  tooltip: {
    padding: 9,
    paddingRight: 18,
  },
  tooltipContent: {
    backgroundColor: color.veryLightGray,
    padding: 10,
    width: screenWidth * 0.6,
    height: "100%",
    borderRadius: 5,
  },
  toastTextColor: {
    color: color.white,
    fontSize: RFValue(14),
    fontFamily: "SharpSansSemibold",
    letterSpacing: 0.5,
    alignContent: "center",
    justifyContent: "center",
  },
  toastText: {
    fontFamily: "SharpSansSemibold",
    fontSize: verticalScale(14),
    textAlign: "center",
  },
  toastView: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    bottom: screenHeight * (1 / 2),
    left: toastPosition,
    width: "40%",
    height: verticalScale(50),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  toastContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    paddingLeft: Platform.OS === "ios" ? 10 : 0,
  },
  menu: {
    width: "100%",
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  menuIcon: {
    marginRight: 20,
  },
  menuText: {
    flex: 2,
  },
  illustrationContainer: {
    alignItems: "flex-end",
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  half: {
    width: "50%",
  },
  third: {
    width: "75%",
  },
  quarter: {
    width: "25%",
  },
  itemContent: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  idTextWidth: {
    width: "90%",
  },
  contentFlex: { flex: 1 },
  flexEndCenter: {
    alignItems: "flex-end",
    alignSelf: "center",
  },
  colArrowCenter: {
    alignItems: "center",
  },
  flexStartCenter: {
    alignItems: "flex-start",
    alignSelf: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  smPaddingVertical: {
    paddingVertical: 10,
  },
});
