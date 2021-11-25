const { validationResult } = require('express-validator');

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      message: error.msg,
    };
  },
});

module.exports = myValidationResult;
