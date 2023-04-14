/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_info: {
    // first_name: "Neri",
    // gender: "female",
    // last_name: "Flores",
    // middle_name: "Lou",
    // nationality: "Filipino",
    // nationality_id: 62,
    // place_of_birth: "Taguig",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "male",
    nationality: "",
    nationality_id: "",
    place_of_birth: "",
    mobile_num: "",
    contact_info: {
      email: "",
      password: "",
      mobile_no: "",
      address: "",
      province: "",
      province_id: "",
      city: "",
      city_id: "",
      barangay: "",
      barangay_id: "",
      zipcode: "",
    },
    financial_info: {
      employment_status: "",
      employment_status_text: "",
      employment_status_type: "",
      employment_status_type_text: "",
      source_of_funds: "",
      source_of_funds_text: "",
      others: "",
      status: "",
      number_of_children: "0",
      monthly_income: "",
    },
    ekyc_info: {
      id: "",
      valid_id: "",
      valid_id_name: "",
      country_name: "",
      country_id: "",
      status: 0,
    },
    attempts: {
      otp: 0,
      otp_allowed_resend: 3, // revert back to 10 after demo
      ekyc: 0,
      ekyc_attempt_interval_datetime: "",
      ekyc_allowed_attempt: 3,
    },
    biometrics: {
      finger_id: false,
      face_id: false,
    },
    delivery_address: {
      // mobile_field: "09237123833",
      // address: "455 Blk. 1, Lot 3, Spring Ville",
      // barangay: "Barangay 1 (Sangandaan)",
      // barangay_id: "137501001",
      // city: "Caloocan",
      // city_id: "200",
      // province: "Metro Manila",
      // province_id: "12",
      // zipcode: "1300",
      // nearest_landmark: "Alfamart",
    },
    selected_delivery_address: "default",
    agree_pfe: false,
    from_screen: "",
    first_time_cashin: false,
    singlife_account_active: false,
    is_logged_in: false,
  },
};

// Pending for Ekyc BE - Will replace all user redux store saving
// eslint-disable-next-line no-unused-vars
const temporaryInitialState = {
  offeringId: "PhGCSAcBv1",
  user: "Customer",
  parties: [
    {
      relation: "Primary", // Default to Primary
      givenName: "",
      middleName: "",
      familyName: "",
      preferredName: "",
      gender: "Male",
      dateOfBirth: "",
      lastKYCDate: "",
      marketingOptions: [
        {
          type: "SMS",
          value: false,
        },
        {
          type: "Email",
          value: false,
        },
        {
          type: "Push Notification",
          value: false,
        },
      ],
      documents: [
        {
          documentType: "Mobile",
          documentNumber: "",
        },
      ],
      contactPoints: [
        {
          type: "Mobile",
          value: "",
        },
        {
          type: "Email",
          value: "",
        },
      ],
      credentials: [
        {
          type: "userPassword",
          value: "",
        },
        {
          type: "hashPassword",
          value: "", // Are we the one to hash the password? If yes, what will we use for hashing? Is it MD5?
        },
      ],
      addresses: [
        {
          addressType: "Residential",
          line1: "",
          barangay: "",
          municipality: "",
          province: "",
          zipCode: "",
        },
        {
          addressType: "Place of Birth",
          line1: "",
          barangay: "", // Can be empty if addressType is "Place of Birth"
          municipality: "", // Can be empty if addressType is "Place of Birth"
          province: "", // Can be empty if addressType is "Place of Birth"
          zipCode: "", // Can be empty if addressType is "Place of Birth"
        },
      ],
      maritalStatus: "",
      employmentStatus: "",
      sourceOfFund: "",
      nationality: "",
      countryOfResidence: "PHL",
      countryOfOrigin: "PHL",
      acquisitionCode: "", // Can be empty
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.user_info = action.payload;
    },
    updateEkycAttemptCounter: (state) => {
      state.user_info.attempts.ekyc += 1;
    },
    updateEkycAttempInterval: (state, action) => {
      state.user_info.attempts.ekyc_attempt_interval_datetime = action.payload;
    },
    updateResendCounter: (state) => {
      state.user_info.attempts.otp += 1;
    },
    resetUserInfo: () => initialState,
  },
});

export const { updateUserInfo, updateEkycAttemptCounter, resetUserInfo, updateResendCounter, updateEkycAttempInterval } = userSlice.actions;

export default userSlice.reducer;
