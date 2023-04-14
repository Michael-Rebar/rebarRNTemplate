import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import Moment from "moment";
import SkeletonContent from 'react-native-skeleton-content';
import BottomSheet from "../../components/BottomSheet";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import global from "../../utils/GlobalStyles";
import colors from "../../utils/Color";
import { validId as validIdList } from "../../constants/constants";

// Helper
import { formatToAmount } from "../../constants/helper";

// API
import { getEkycDetails } from "../../api/ekyc";
import { retrievePartyInformation } from "../../api/party";

// Redux
import { updateNotifications } from "../../redux/notifications";
import { updateCustomerInfo } from "../../redux/customer";

const styles = StyleSheet.create({
  fontRed: {
    textAlign: "right",
    color: colors.orangeRed,
  },
  rowTitle: {
    backgroundColor: colors.lightGray,
  },
});

export default function ProfileInformation({ navigation, module, onLayout, onScrollContent }) {
  const toast = useToast();
  const verifyMyIdentityAlertActionSheetRef = useRef();
  const verifyMyIdentityAlertScrollViewRef = useRef();
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [ekycDetails, setEkycDetails] = useState("");
  const [nationalityName, setNationalityName] = useState("");
  const [ekycId, setEkycId] = useState("");
  const dispatch = useDispatch();

  const customerInfo = useSelector(state => state.customer.customer_info);
  const referencesInfo = useSelector(state => state.references.references);
  const notifications = useSelector(state => state.notifications.notifications);
  const pageTitle = (module === "Profile") ? "Manage your profile information." : "Make sure your details are correct before proceeding.";

  const handlePersonalInformationEdit = () => {
    if (module === "Profile") {
      verifyMyIdentityAlertActionSheetRef.current.show();
    } else if (module === "EkycReviewProfile") {
      navigation.push("EkycPersonalInformation");
    } else {
      navigation.push("PersonalInformationEdit");
    }
  };

  const handleContactInformationEdit = () => {
    if (module === "Profile") {
      navigation.push("ProfileContactInformationEdit");
    } else {
      navigation.push("ContactInformationEdit");
    }
  };

  const handleFinancialInformationEdit = () => {
    if (module === "Profile") {
      navigation.push("ProfileFinancialInformationEdit");
    } else {
      navigation.push("FinancialInformationEdit");
    }
  };

  const handleTriggerNotif = (ekycRecord) => {
    if (ekycRecord.ekyc_status_description === "Clear") {
      const notifExist = notifications.find(n => n.title === "We’re glad to have you with us");
      if (!notifExist) {
        const newNotification = {
          id: notifications.length + 1,
          title: "We’re glad to have you with us",
          datetime_created: new Date(),
          datetime_read: "",
          notification_type: 6,
        };
        dispatch(updateNotifications(newNotification));
      }
    }
  };

  const handleVerifyMyIdentity = () => {
    const ekycStatus = ekycDetails.ekyc_status_description;
    if (ekycStatus === "Clear") {
      navigation.navigate("ProfilePersonalInformationEdit");
    } else if (ekycStatus === "Created" || ekycStatus === "Drafted") {
      if (ekycDetails.docu_file_front_id.length === 0) {
        navigation.push("GovernmentId");
      } else if (ekycDetails.docu_file_front_id.length === 1) {
        const idType = ekycDetails.docu_file_front_id[0].id_type;
        if (ekycDetails.live_photo_id !== null) {
          navigation.push("EkycReviewProfile");
        } else if (ekycDetails.docu_file_back_id.length === 0 && idType !== "PASSPORT") {
          navigation.push("CaptureId", { cameraSide: "back" });
        } else {
          navigation.push("Selfie");
        }
      }
    } else {
      navigation.navigate("ProfilePersonalInformationEdit");
    }
  };

  const handleId = (ekycRecord) => {
    let frontId = ekycRecord.docu_file_front_id;
    if (frontId.length !== 0) {
      frontId = frontId[0].id_type;
      const idFound = validIdList.find(vL => vL.type === frontId);
      if (idFound) {
        setEkycId(idFound.value);
      }
    }
  };

  const initEkyc = async () => {
    await getEkycDetails(`?applicantId=${customerInfo.applicant_id}`)
      .then((response) => {
        const { data } = response;
        if (data.data.length !== 0) {
          const latestEkycRecord = data.data.reduce((prev, curr) => (Number(prev.id) > Number(curr.id) ? prev : curr));
          setEkycDetails(latestEkycRecord);
          handleTriggerNotif(latestEkycRecord);
          handleId(latestEkycRecord);
        }
      })
      .catch((err) => {
        toast.show(`Error: Retrieve Ekyc Information: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
        setIsSkeletonLoading(false);
      });
  };

  const initParty = async () => {
    const partyId = customerInfo.party_id;
    await retrievePartyInformation(`/${partyId}`)
      .then((response) => {
        const { data } = response;
        if (data.data.length !== 0) {
          const updatedCustomerInfo = {
            ...customerInfo,
            applicant_id: data.data[0].applicant_id,
          };

          dispatch(updateCustomerInfo(updatedCustomerInfo));
          initEkyc();
        }
      })
      .catch((err) => {
        toast.show(`Error: Retrieve Party Information: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
        setIsSkeletonLoading(false);
      });
  };

  const dispalyMonthlyIncome = () => {
    const roundedValue = Math.round(customerInfo.financial_info.monthly_income);
    const finalAmount = formatToAmount(roundedValue.toString());

    return <Typography type="body" style={global.textAlignRight} text={`PHP ${finalAmount}`} />;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 1500);

    if (module === "Profile") {
      initParty();
    }

    const getNationalityName = referencesInfo.nationalities_raw[customerInfo.personal_info.nationality];
    setNationalityName(getNationalityName);
  }, []);

  return (
    <Content onScroll={onScrollContent} style={global.wrapper} onLayout={onLayout}>
      <View>
        <View style={[global.content, global.contentNoTopPadding, { paddingBottom: 0 }]}>
          <Typography type="title3" text={pageTitle} />
        </View>

        <Grid style={global.body}>
          <Row size={4} style={styles.rowTitle}>
            <Col>
              <View style={global.box}>
                <View style={global.third}><Typography type="body-bold" text="PERSONAL INFORMATION" /></View>
                <View style={global.quarter}>
                  <TouchableOpacity transparent disabled={ekycDetails.ekyc_status_description === "Pending" || isSkeletonLoading} onPress={() => handlePersonalInformationEdit()}>
                    <Typography type="body-bold" style={[styles.fontRed, (ekycDetails.ekyc_status_description === "Pending" || isSkeletonLoading) && { opacity: 0.5 }]} text="EDIT" />
                  </TouchableOpacity>
                </View>
              </View>
            </Col>
          </Row>

          {ekycDetails.ekyc_status_description === "Pending" && (
            <Row size={4}>
              <Col>
                <TouchableOpacity style={global.box}>
                  <Typography type="body" text="We’re currently processing your information." />
                </TouchableOpacity>
              </Col>
            </Row>
          )}

          {(module === "Profile")
            ? (
              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="FULL NAME" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 130, height: 20 },
                        ]}
                      >
                        <Typography type="body" style={global.textAlignRight} text={`${customerInfo.personal_info.first_name} ${customerInfo.personal_info.middle_name === "N/A" ? "" : customerInfo.personal_info.middle_name} ${customerInfo.personal_info.last_name}`} />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>
            )
            : (
              <React.Fragment>
                <Row size={4}>
                  <Col>
                    <View style={global.box}>
                      <View style={global.half}><Typography type="body-bold" text="FIRST NAME" /></View>
                      <View style={global.half}>
                        <SkeletonContent
                          containerStyle={{ alignItems: "flex-end" }}
                          isLoading={isSkeletonLoading}
                          layout={[
                            { width: 130, height: 20 },
                          ]}
                        >
                          <Typography type="body" style={global.textAlignRight} text={customerInfo.personal_info.first_name} />
                        </SkeletonContent>
                      </View>
                    </View>
                  </Col>
                </Row>

                <Row size={4}>
                  <View style={global.rowSeparator} />
                </Row>

                <Row size={4}>
                  <Col>
                    <View style={global.box}>
                      <View style={global.half}><Typography type="body-bold" text="MIDDLE NAME" /></View>
                      <View style={global.half}>
                        <SkeletonContent
                          containerStyle={{ alignItems: "flex-end" }}
                          isLoading={isSkeletonLoading}
                          layout={[
                            { width: 130, height: 20 },
                          ]}
                        >
                          <Typography type="body" style={global.textAlignRight} text={customerInfo.personal_info.middle_name === "N/A" ? "" : customerInfo.personal_info.middle_name} />
                        </SkeletonContent>
                      </View>
                    </View>
                  </Col>
                </Row>

                <Row size={4}>
                  <View style={global.rowSeparator} />
                </Row>

                <Row size={4}>
                  <Col>
                    <View style={global.box}>
                      <View style={global.half}><Typography type="body-bold" text="LAST NAME" /></View>
                      <View style={global.half}>
                        <SkeletonContent
                          containerStyle={{ alignItems: "flex-end" }}
                          isLoading={isSkeletonLoading}
                          layout={[
                            { width: 130, height: 20 },
                          ]}
                        >
                          <Typography type="body" style={global.textAlignRight} text={customerInfo.personal_info.last_name} />
                        </SkeletonContent>
                      </View>
                    </View>
                  </Col>
                </Row>
              </React.Fragment>
            )}

          <Row size={4}>
            <View style={global.rowSeparator} />
          </Row>

          <Row size={4}>
            <Col>
              <View style={global.box}>
                <View style={global.half}><Typography type="body-bold" text="DATE OF BIRTH" /></View>
                <View style={global.half}>
                  <SkeletonContent
                    containerStyle={{ alignItems: "flex-end" }}
                    isLoading={isSkeletonLoading}
                    layout={[
                      { width: 125, height: 20 },
                    ]}
                  >
                    <Typography type="body" style={global.textAlignRight} text={Moment(customerInfo.personal_info.birth_date).format("MMM DD, YYYY")} />
                  </SkeletonContent>
                </View>
              </View>
            </Col>
          </Row>

          <Row size={4}>
            <View style={global.rowSeparator} />
          </Row>

          <Row size={4}>
            <Col>
              <View style={global.box}>
                <View style={global.half}><Typography type="body-bold" text="GENDER" /></View>
                <View style={global.half}>
                  <SkeletonContent
                    containerStyle={{ alignItems: "flex-end" }}
                    isLoading={isSkeletonLoading}
                    layout={[
                      { width: 80, height: 20 },
                    ]}
                  >
                    <Typography type="body" style={global.textAlignRight} text={customerInfo.personal_info.gender === "M" ? "Male" : "Female"} />
                  </SkeletonContent>
                </View>
              </View>
            </Col>
          </Row>

          <Row size={4}>
            <View style={global.rowSeparator} />
          </Row>

          <Row size={4}>
            <Col>
              <View style={global.box}>
                <View style={global.half}><Typography type="body-bold" text="NATIONALITY" /></View>
                <View style={global.half}>
                  <SkeletonContent
                    containerStyle={{ alignItems: "flex-end" }}
                    isLoading={isSkeletonLoading}
                    layout={[
                      { width: 80, height: 20 },
                    ]}
                  >
                    <Typography
                      type="body"
                      style={global.textAlignRight}
                      text={nationalityName}
                    />
                  </SkeletonContent>
                </View>
              </View>
            </Col>
          </Row>

          <Row size={4}>
            <View style={global.rowSeparator} />
          </Row>

          <Row size={4}>
            <Col>
              <View style={global.box}>
                <View style={global.half}><Typography type="body-bold" text="PLACE OF BIRTH" /></View>
                <View style={global.half}>
                  <SkeletonContent
                    containerStyle={{ alignItems: "flex-end" }}
                    isLoading={isSkeletonLoading}
                    layout={[
                      { width: 80, height: 20 },
                    ]}
                  >
                    <Typography
                      type="body"
                      style={global.textAlignRight}
                      text={customerInfo.personal_info.birth_place}
                    />
                  </SkeletonContent>
                </View>
              </View>
            </Col>
          </Row>

          {(module === "Profile")
            ? (
              <React.Fragment>
                <Row size={4}>
                  <View style={global.rowSeparator} />
                </Row>
                <Row size={4}>
                  <Col>
                    <View style={global.box}>
                      <View style={global.half}><Typography type="body-bold" text="ID" /></View>
                      <View style={global.half}>
                        <SkeletonContent
                          containerStyle={{ alignItems: "flex-end" }}
                          isLoading={isSkeletonLoading}
                          layout={[
                            { width: 140, height: 20 },
                          ]}
                        >
                          <Typography type="body" style={global.textAlignRight} text={ekycId} />
                        </SkeletonContent>
                      </View>
                    </View>
                  </Col>
                </Row>
              </React.Fragment>
            )
            : null}

          {module !== "EkycReviewProfile" && (
            <Row size={4} style={styles.rowTitle}>
              <Col>
                <View style={global.box}>
                  <View style={global.third}><Typography type="body-bold" text="CONTACT INFORMATION" /></View>
                  <View style={global.quarter}>
                    <TouchableOpacity disabled={isSkeletonLoading} onPress={() => handleContactInformationEdit()}>
                      <Typography type="body-bold" style={[styles.fontRed, isSkeletonLoading && { opacity: 0.5 }]} text="EDIT" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Col>
            </Row>
          )}

          {(module === "Profile")
            ? (
              <React.Fragment>
                <Row size={4}>
                  <Col>
                    <View style={global.box}>
                      <View style={global.half}><Typography type="body-bold" text="MOBILE" /></View>
                      <View style={global.half}>
                        <SkeletonContent
                          containerStyle={{ alignItems: "flex-end" }}
                          isLoading={isSkeletonLoading}
                          layout={[
                            { width: 120, height: 20 },
                          ]}
                        >
                          <Typography type="body" style={global.textAlignRight} text={customerInfo.mobile_num} />
                        </SkeletonContent>
                      </View>
                    </View>
                  </Col>
                </Row>
                <Row size={4}>
                  <View style={global.rowSeparator} />
                </Row>
              </React.Fragment>
            )
            : null}

          {module !== "EkycReviewProfile" && (
            <React.Fragment>
              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="EMAIL" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 140, height: 20 },
                        ]}
                      >
                        <Typography
                          type="body"
                          style={global.textAlignRight}
                          text={customerInfo.contact_info.email}
                        />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>

              <Row size={4}>
                <View style={global.rowSeparator} />
              </Row>

              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.quarter}><Typography type="body-bold" text="ADDRESS" /></View>
                    <View style={global.third}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 140, height: 20 },
                          { width: 130, height: 20, marginTop: "2%" },
                          { width: 160, height: 20, marginTop: "2%" },
                          { width: 120, height: 20, marginTop: "2%" },
                        ]}
                      >
                        <Typography type="body" style={global.textAlignRight} text={`${customerInfo.contact_info.address}, ${customerInfo.contact_info.barangay}, ${customerInfo.contact_info.city}, ${customerInfo.contact_info.province} ${customerInfo.contact_info.zip_code}`} />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>

              <Row size={4} style={styles.rowTitle}>
                <Col>
                  <View style={global.box}>
                    <View style={global.third}><Typography type="body-bold" text="FINANCIAL INFORMATION" /></View>
                    <View style={global.quarter}>
                      <TouchableOpacity disabled={isSkeletonLoading} onPress={() => handleFinancialInformationEdit()}>
                        <Typography type="body-bold" style={[styles.fontRed, isSkeletonLoading && { opacity: 0.5 }]} text="EDIT" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Col>
              </Row>

              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="EMPLOYMENT STATUS" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 140, height: 20 },
                        ]}
                      >
                        <Typography type="body" style={global.textAlignRight} text={customerInfo.financial_info.employment_status} />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>

              <Row size={4}>
                <View style={global.rowSeparator} />
              </Row>

              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="SOURCE OF FUNDS" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 80, height: 20 },
                        ]}
                      >
                        <Typography type="body" style={global.textAlignRight} text={customerInfo.financial_info.fund_source} />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>

              <Row size={4}>
                <View style={global.rowSeparator} />
              </Row>

              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="CIVIL STATUS" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 80, height: 20 },
                        ]}
                      >
                        <Typography type="body" style={global.textAlignRight} text={customerInfo.financial_info.civil_status} />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>

              <Row size={4}>
                <View style={global.rowSeparator} />
              </Row>

              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="CHILDREN" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 30, height: 20 },
                        ]}
                      >
                        <Typography type="body" style={global.textAlignRight} text={customerInfo.financial_info.children_num.toString()} />
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>

            </React.Fragment>
          )}

          {module !== "EkycReviewProfile" && (
            <React.Fragment>
              <Row size={4}>
                <View style={global.rowSeparator} />
              </Row>

              <Row size={4}>
                <Col>
                  <View style={global.box}>
                    <View style={global.half}><Typography type="body-bold" text="MONTHLY INCOME" /></View>
                    <View style={global.half}>
                      <SkeletonContent
                        containerStyle={{ alignItems: "flex-end" }}
                        isLoading={isSkeletonLoading}
                        layout={[
                          { width: 110, height: 20 },
                        ]}
                      >
                        {dispalyMonthlyIncome()}
                      </SkeletonContent>
                    </View>
                  </View>
                </Col>
              </Row>
              <Row size={4}>
                <View style={global.rowSeparator} />
              </Row>
            </React.Fragment>
          )}
        </Grid>
      </View>

      <BottomSheet actionSheetRef={verifyMyIdentityAlertActionSheetRef} scrollViewRef={verifyMyIdentityAlertScrollViewRef}>
        <View style={global.modalViewListItem}>
          <Grid>
            <Row size={4} style={{ marginHorizontal: "5%" }}>
              <Col>
                <Typography text="Before you can edit your personal information, we’ll need to verify your identity again to keep your account secure. You won’t be able to use your account while verification is being processed." type="body" />
              </Col>
            </Row>

            <Row size={4} style={[{ marginHorizontal: "5%" }, global.body]}>
              <Col>
                <Button full variant="primary-contained" text="VERIFY MY IDENTITY" onPress={() => { handleVerifyMyIdentity(); verifyMyIdentityAlertActionSheetRef.current.hide(); }} />
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet>
    </Content>
  );
}

ProfileInformation.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  module: PropTypes.string.isRequired,
  onLayout: PropTypes.func,
  onScrollContent: PropTypes.func,
};

ProfileInformation.defaultProps = {
  navigation: null,
  onLayout: () => { },
  onScrollContent: () => { },
};
