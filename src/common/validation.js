/* eslint-disable no-useless-escape */
export const VALIDATION_DATA = {
  email: {
    minLength: 8,
    maxLength: 250,
    required: true,
    regex: [
      {
        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        message: 'Invalid Email Provided'
      }
    ]
  },
  password: {
    minLength: 8,
    maxLength: 256,
    required: true,
    regex: [
      {
        pattern: /[A-Z]/,
        message: 'Should contain at least one capital letter'
      },
      {
        pattern: /[a-z]/,
        message: 'Should contain at least one small letter'
      },
      {
        pattern: /\d/,
        message: 'Should contain at least one number'
      },
      {
        pattern: /[!@#\$%^&*(),.?":{}|<>]/,
        message: 'Should contain at least one special character'
      }
    ]
  }
};
