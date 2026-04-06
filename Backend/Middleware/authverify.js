const jwt = require("jsonwebtoken");
const { responsehandling } = require("../Utils/response");

const verifyToken = (req, res, next) => {
  const Token = req.headers.authorization;
  try {
    if (!Token) return responsehandling(res,404,false,"Token not found")
    const authtoken = Token.split(" ")[1];
    const ValidToken = jwt.verify(authtoken, process.env.JWT_SECRETKEY);
    if (!ValidToken) return responsehandling(res,401,false,"Token expired")
    req.user = ValidToken.id;
    next();
  } catch (err) {
    return responsehandling(res,500,false,err.message)
  }
};

module.exports = { verifyToken };
