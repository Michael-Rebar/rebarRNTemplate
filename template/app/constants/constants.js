// Month mapping
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

// eKyc Valid Ids
export const validId = [
  { id: 1, value: "Driver's License", type: "DRIVING_LICENSE", side: ["front", "back"] },
  { id: 2, value: "National Identity Card (UMID)", type: "UNKNOWN", side: ["front", "back"] },
  { id: 3, value: "Passport", type: "PASSPORT", side: ["front"] },
  { id: 4, value: "Postal ID", type: "UNKNOWN", side: ["front", "back"] },
  { id: 5, value: "PRC (issued prior to Sep 2019)", type: "UNKNOWN", side: ["front", "back"] },
  { id: 6, value: "Social Security Card", type: "UNKNOWN", side: ["front", "back"] },
  { id: 7, value: "Voter’s ID", type: "UNKNOWN", side: ["front", "back"] },
];

// Transaction History Icons - Mapping
export const pdfTxnIconsMapping = [
  { type: "Interest", description: ["Interest Earned"] },
  { type: "Cash In", description: ["Wallet to PDF Transfer", "Cash-in via Bank Transfer"] },
  { type: "Others", description: ["Policy Cancellation Refund", "Fund Balance Adjustment", "Fund Balance Adjustment"] },
  { type: "Premium", description: ["Premium Payment"] },
  { type: "Cash Out", description: ["Cash-out to", "PDF to Wallet Transfer"] },
  { type: "Fees", description: ["App Usage Fees/Charges", "Card Replacement Fees/Charges"] },
  { type: "Withdrawal", description: [] },
];

/**
  * Top Suggested Bank

  * 0053 - BDO Unibank Inc;
  * 0004 - BPI;
  * 0010 - Chinabank;
  * 0026 - Metrobank;
  * 0014 - Security Bank;
  * 0041 - Unionbank
 * */
export const topSuggestedBanks = ["0053", "0004", "0010", "0026", "0014", "0041"];

export const cancelReasons = [
  { id: 1, value: "I can’t pay anymore" },
  { id: 2, value: "I found a better product" },
  { id: 3, value: "I don’t need it anymore" },
  { id: 4, value: "I'm not happy with your services" },
  { id: 5, value: "Others" },
];

export const agreementTypes = ["TERMS_OF_USE"];

// Reusable values
export const percentRate = 5;
export const helpEmail = "help@singlife.com";
export const contactNumber = "+632-8299-3737";
export const websiteUrl = "singlife.com.ph";
export const facebookUrl = "https://www.facebook.com/SinglifePhilippines";
export const loginUrl = "https://phoenix.account.singlife.com/auth/realms/philippines-customers/protocol/openid-connect/auth?client_id=ph-mobile-app&redirect_uri=https://vizegmpnj1.execute-api.ap-southeast-1.amazonaws.com/v1/SsoCallbackDev&state=0%2F62d697d2-8810-41d7-920b-5f6501625978&response_type=code&scope=openid&username=";
export const unionBankPrivacySecurityUrl = "https://www.unionbankph.com/privacy-security";
export const eonBankPHUrl = "https://www.eonbankph.com";
export const consumerAffairsEmail = "consumeraffairs@bsp.gov.ph";

// FAQ & Legal CMS Pages URL
export const faqUrl = "https://singlife.com.ph/about/faqs/?type_mobile=1";
export const faqCashInUrl = "https://singlife.com.ph/about/faqs/how-do-i-cash-in-to-my-singlife-account-/?type_mobile=1";
export const singlifeTermsOfUseUrl = "https://singlife.com.ph/terms-of-use/?type_mobile=1";
export const singLifePrivacyPolicyUrl = "https://singlife.com.ph/privacy_policy/?type_mobile=1";
export const singlifeInternetSecurityUrl = "https://singlife.com.ph/internet_security/?type_mobile=1";
export const singlifeCustomerCharterUrl = "https://singlife.com.ph/customer_charter/?type_mobile=1";
