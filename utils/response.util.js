resUtil = (statusCode, errorMsg, failedMsg) => {
  let error = new Error(errorMsg);

  error.statusCode = statusCode;
  error.errorMsg = errorMsg;
  error.failedMsg = failedMsg;

  return error;
};

module.exports = resUtil;
