/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import * as SecureStore from "expo-secure-store";

// Each first letter of a word will be upper case
export const toUpper = (str) => {
  const lower = String(str).toLowerCase();
  return lower.replace(/(^| )(\w)/g, (x) => x.toUpperCase());
};

// Put comma on numbers
export const formatToAmount = (number) => {
  number = number.replace(/[^0-9]/g, '');
  number += '';
  number = number.replace(',', ''); number = number.replace(',', ''); number = number.replace(',', '');
  number = number.replace(',', ''); number = number.replace(',', ''); number = number.replace(',', '');
  const x = number.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  // eslint-disable-next-line no-useless-concat
  while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
  return x1 + x2;
};

export const cleanMobile = (mobileNo) => {
  let cleaned = (mobileNo).replace(/\D/g, '');
  cleaned = cleaned.slice(0, 10);

  return cleaned;
};

export const formatToMobile = (mobileNo) => {
  let cleaned = (mobileNo).replace(/\D/g, '');
  cleaned = cleaned.slice(0, 10);
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  if (cleaned) {
    match = cleaned.match(/.{1,3}/g);
    return `${match[0] ? match[0] : ''} ${match[1] ? match[1] : ''} ${match[2] ? match[2] : ''}`;
  }

  return '';
};

export const formatToAccountNumber = (accountNumber) => {
  let cleaned = (accountNumber).replace(/\D/g, '');
  cleaned = cleaned.slice(0, 13);
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{5})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return null;
};

export const formatToEonAccountNumber = (eonAccountNumber) => {
  let cleaned = (eonAccountNumber).replace(/\D/g, '');
  cleaned = cleaned.slice(0, 12);
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return null;
};

export const formatToCardNumber = (cardNumber) => {
  if (cardNumber.replace(/\s/g, '').length <= 16) {
    return cardNumber.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
  return cardNumber.slice(0, 19);
};

// Remove comma on numbers
export const stringToNumber = (number) => number.replace(/[^0-9]/g, "");

// Replace X with asterisk
export const replaceAll = (str, find, replace) => str.replace(new RegExp(find, "g"), replace);

// Add comma to number
export const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const saveSecureStore = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureStore = async (key) => {
  const value = await SecureStore.getItemAsync(key);
  return value;
};

// Parse fetched nationalities/countries json from API to json used in our search list
export const parseNationality = (jsonValue) => {
  const parsedJson = [];
  const sortedKeys = Object.entries(jsonValue).sort(([, b], [, a]) => b - a);
  const sections = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  sections.map(sectionVal => {
    const arrayVal = [];
    const obj1 = {};

    sortedKeys.map(value => {
      const obj2 = {};

      if (sectionVal === value[1].charAt(0)) {
        obj2.key = value[0];
        obj2.name = value[1];
        arrayVal.push(obj2);
      } else if (sectionVal === "" && (value[0] === "PHL" || value[0] === "PH")) {
        obj2.key = value[0];
        obj2.name = value[1];
        arrayVal.push(obj2);
      }

      return null;
    });

    obj1.content = arrayVal;
    obj1.section = sectionVal;

    parsedJson.push(obj1);
    return null;
  });

  return parsedJson;
};

// Parse fetched cities and barangays json from API to json used in our search list
export const parseAddress = (jsonValue, type) => { // type: 1 = city, 2 = barangay
  // console.log("First", jsonValue);
  const parsedJson = [];
  const sortedKeys = jsonValue.sort((a, b) => a.name.localeCompare(b.name));

  // console.log("Second", sortedKeys);

  const sections = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  sections.map(sectionVal => {
    const arrayVal = [];
    const obj1 = {};

    sortedKeys.map(value => {
      const obj2 = {};
      if (type === 2 && sectionVal === "") { // No groupings for barangays
        obj2.key = value.id;
        obj2.name = value.name;

        if (type === 1) {
          obj2.province = value.provinceID;
        } else if (type === 2) {
          obj2.city = value.cityAndMunicipalityID;
        }
        arrayVal.push(obj2);
      } else if (type !== 2) {
        if (sectionVal === value.name.charAt(0)) {
          obj2.key = value.id;
          obj2.name = value.name;

          if (type === 1) {
            obj2.province = value.provinceID;
          } else if (type === 2) {
            obj2.city = value.cityAndMunicipalityID;
          }

          arrayVal.push(obj2);
        }
      }

      return null;
    });

    obj1.content = arrayVal;
    obj1.section = sectionVal;

    parsedJson.push(obj1);
    return null;
  });

  return parsedJson;
};

export const incomeDisplay = (incomeValue) => {
  const monthlyIncome = Number(incomeValue) * 3;
  let finalIncome = "";
  if (monthlyIncome > 500000) {
    finalIncome = formatToAmount("500000");
  } else {
    finalIncome = formatToAmount(monthlyIncome.toString());
  }

  return finalIncome;
};
