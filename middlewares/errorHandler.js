errorHandler = async (err, req, res, next) => {
  const { statusCode, responseMsg, failedMsg } = err;
  console.error(err);

  if (statusCode) {
    res.status(statusCode).json({ errMsg: responseMsg });
  } else {
    res.status(400).json({ errMsg: `${failedMsg}` });
  }
};

module.exports = errorHandler;
