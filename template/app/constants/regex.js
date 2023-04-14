/* eslint-disable import/prefer-default-export */
export const addressRegex = new RegExp(/^[a-zA-Z0-9 ñ!@#$%\\^&*)(+=.,_-]*$/);
// export const nameRegex = new RegExp(/^[a-zA-Z0-9_ ñ]*$/);
export const nameRegex = new RegExp(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9_ ñ!'@#$%\\^&*)(+=.,_-]*$/);
// One uppercase, One lowercase, One number, One special character and minimum 8 letters
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm;
// One uppercase.
export const upperCaseRegex = new RegExp("(?=.*[A-Z])");
// One lowercase.
export const lowerCaseRegex = new RegExp("(?=.*[a-z])");
// Number only.
export const numberRegex = new RegExp("[0-9]+");
// Special Character
export const specialCharRegex = new RegExp(/[\W|_]/);
// For bank account number - letters and numbers only
export const accountNumberRegex = new RegExp(/^[a-zA-Z0-9]*$/);
