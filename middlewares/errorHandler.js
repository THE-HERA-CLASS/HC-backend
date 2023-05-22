errorHandler = async (err, req, res, next) => {
  const { statusCode, errorMsg, failedMsg } = err;
  console.error(err);

  if (statusCode) {
    res.status(statusCode).json({ errMsg: errorMsg });
  } else {
    res.status(400).json({ errMsg: `${failedMsg}` });
  }
};

module.exports = errorHandler;
