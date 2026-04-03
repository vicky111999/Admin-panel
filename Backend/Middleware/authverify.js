const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const Token = req.headers.authorization;
  try {
    if (!Token) return errorresponse(res, 404, "Token not found");
    const authtoken = Token.split(" ")[1];
    const ValidToken = jwt.verify(authtoken, process.env.JWT_SECRETKEY);
    if (!ValidToken) return errorresponse(res, 401, "Token expired");
    req.user = ValidToken.id;
    next();
  } catch (err) {
    return errorresponse(res, 500, err.message);
  }
};

module.exports = { verifyToken };
