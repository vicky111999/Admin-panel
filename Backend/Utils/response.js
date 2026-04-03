const successresponse = (res, statuscode, message, data = null,token=null) => {
  return res.status(statuscode).json({ status: true, message, data,token });
};

const errorresponse = (res, statuscode, message) => {
  return res.status(statuscode).json({ status: false, message });
};

module.exports = { successresponse, errorresponse };
