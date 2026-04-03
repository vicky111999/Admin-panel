const bcrypt = require("bcrypt");
const db = require("../Config/DB");
const { authtoken } = require("../Utils/authToken");
const { generateOTP } = require("../Utils/otpgenerate");
const { sendmail } = require("../Utils/mailer");
const User = require("../Models/dbQuery");
const { errorresponse, successresponse } = require("../Utils/response");

const register = async (req, res) => {
  const { name, email, password, roleid } = req.body;
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Name,Email,Password is required" });
    else if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ status: false, message: "Email is not required format" });
    else if (!passwordRegex.test(password))
      return res
        .status(400)
        .json({ status: false, message: "Password is not require format" });
    const hashedpassword = await bcrypt.hash(password, 10);
    const emailexist = await User.findOne({ where: { email } });
    if (emailexist) return errorresponse(res, 409, "Email already exist");
    const result = await User.create({
      name,
      email,
      password: hashedpassword,
      roleid,
    });
    return successresponse(res, 200, "Registered Successfully");
  } catch (err) {
    return errorresponse(res, 500, err.message);
  }
};

const login = async (req, res) => {
  const { roleid, email, password } = req.body;
  try {
    if (!roleid || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Email,Password is required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res
        .status(409)
        .json({ status: false, message: "Email is not required format" });
    const data = await User.findOne({ where: { email } });
    if (!data) return errorresponse(res, 404, "Email is not exist");
    const Ispassword = await bcrypt.compare(password, data.dataValues.password);
    if (!Ispassword) return errorresponse(res, 401, "Invalid Password");
    const token = authtoken(data);
    return successresponse(res, 201, "Loggedin Successfully", { token });
  } catch (err) {
    return errorresponse(res, 500, err.message);
  }
};

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ status: false, message: "Email is required" });
    const emailexist = await User.findOne({ where: { email } });
    if (!emailexist) return errorresponse(res, 404, "Email not exists");
    const otp = generateOTP().toString();
    const subject = "Forgotpassword from Trackdo";
    const text = `Your OTP is :${otp}`;
    const hashedOTP = await bcrypt.hash(otp, 10);
    const verifyotpExpired = Date.now() + 5 * 60 * 1000;
    const [otpsent] = await User.update(
      { verify_otp: hashedOTP, verify_otp_expiry: verifyotpExpired },
      { where: { email: emailexist.email } },
    );
    if (!otpsent) return errorresponse(res, 409, "Not Updated");
    const Emailsent = sendmail(email, subject, text);
    return successresponse(res, 200, "Otp sent");
  } catch (err) {
    return errorresponse(res, 500, err.message);
  }
};

const resetpassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;
    if (!email || !otp || !newpassword)
      return res
        .status(400)
        .json({ status: false, message: "Email,OTP,Newpassword is required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ status: false, message: "Email is not required format" });
    const isuser = await User.findOne({ where: { email } });
    if (!isuser) return errorresponse(res, 404, "Email is not exist");
    const data = isuser.toJSON();
    if (!data.verify_otp) return errorresponse(res, 404, "OTP is not exist");
    if (!data.verify_otp_expiry)
      return errorresponse(res, 404, "OTPExpiry is not exist");
    const Isotp = await bcrypt.compare(otp, data.verify_otp);
    if (!Isotp) return errorresponse(res, 409, "Please enter correct OTP");
    if (Date.now() > data.verify_otp_expiry)
      return errorresponse(res, 409, "OTP Expired");
    const verifyotp = "";
    const verifyotpExpired = "";
    const hashedpassword = await bcrypt.hash(newpassword, 10);
    const updateddata = await User.update(
      {
        password: hashedpassword,
        verify_otp: '',
        verify_otp_expiry: '',
      },
      { where: { email } },
    );
    return errorresponse(res, 201, "Password Reseted Successfully");
  } catch (err) {
    return errorresponse(res, 500, err.message);
  }
};

module.exports = { register, login, forgotpassword, resetpassword };
