const bcrypt = require("bcrypt");
const db = require("../Config/DB");
const { authtoken } = require("../Utils/authToken");
const { generateOTP } = require("../Utils/otpgenerate");
const { sendmail } = require("../Utils/mailer");
const User = require("../Models/dbQuery");
const { responsehandling } = require("../Utils/response");

const register = async (req, res) => {
  const { name, email, password, roleid } = req.body;
  try {
    if (!name || !email || !password) return responsehandling(res,400,"Name,Email,Password is required")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return responsehandling(res,400,"Email is not required format")
    if (!/^(?=.*[A-Z])/.test(password)) return responsehandling(res,400,"Must includes Uppercase")
    if (!/^(?=.*[a-z])/.test(password)) return responsehandling(res,400,"Must includes Lowercase")
    if (!/^(?=.*[!@#$%^&*])/.test(password)) return responsehandling(res,400,"Must includes Special Character")
    if (!/^(?=.*[\d])/.test(password)) return responsehandling(res,400,"Must includes Numbers")
      if(!password.length > 7) return responsehandling(res,400,"Password atleast 8 characters")
    const hashedpassword = await bcrypt.hash(password, 10);
    const emailexist = await User.findOne({ where: { email } });
    if (emailexist) return responsehandling(res, 409, "Email already exist");
    const result = await User.create({
      name,
      email,
      password: hashedpassword,
      roleid,
    });
    return responsehandling(res, 200, "Registered Successfully");
  } catch (err) {
    return responsehandling(res, 500, err.message);
  }
};

const login = async (req, res) => {
  const {  email, password } = req.body;
  try {
    if ( !email || !password) return responsehandling(res, 409, false,"Email,Password is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) return responsehandling(res, 409, false,"Email is not required format");
    const data = await User.findOne({ where: { email },raw:true });
    if (!data) return responsehandling(res, 404, false,"Email is not exist");
    const Ispassword = await bcrypt.compare(password, data.password);
    if (!Ispassword) return responsehandling(res, 401, false,"Invalid Password");
    const token = authtoken(data);
    const userdetail = {
      token:token,
      email:data.email,
      roleid:data.roleid
    }
    console.log(userdetail)
    return responsehandling(res, 201, "Loggedin Successfully",userdetail);
  } catch (err) {
    return responsehandling(res, 500,err.message);
  }
};

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return responsehandling(res, 409, false,"Email is required");
    const emailexist = await User.findOne({ where: { email } });
    if (!emailexist) return responsehandling(res, 404, false,"Email not exists");
    const otp = generateOTP().toString();
    const maildata ={
      subject:"Forgotpassword from Trackdo",
      text:`Your OTP is :${otp}
      ${`http://localhost:5173/otpreset?email=${email}&otp=${otp}`}`,
    }
    const hashedOTP = await bcrypt.hash(otp, 10);
    const verifyotpExpired = Date.now() + 5 * 60 * 1000;
    const [otpsent] = await User.update(
      { verify_otp: hashedOTP, verify_otp_expiry: verifyotpExpired },
      { where: { id: emailexist.id } },
    );
    if (!otpsent) return responsehandling(res, 409, false,"Not Updated");
    const Emailsent = sendmail(emailexist.email, maildata);
    return responsehandling(res, 200, true,"Otp sent");
  } catch (err) {
    return responsehandling(res, 500, false,err.message);
  }
};

const resetpassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;
    if (!email || !otp || !newpassword) return responsehandling(res, 400, false,"Email,OTP,Newpassword is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return responsehandling(res, 400, false,"Email is not required format");
    const isuser = await User.findOne({ where: { email },raw:true });
    if (!isuser) return responsehandling(res, 404,false, "Email is not exist");
    if (!isuser.verify_otp) return responsehandling(res, 404, false,"OTP is not exist");
    if (!isuser.verify_otp_expiry) return responsehandling(res, 404, false,"OTPExpiry is not exist");
    if(otp.length !== 6) return responsehandling(res, 404, false,"OTP must 6 digit");
    const Isotp = await bcrypt.compare(otp, isuser.verify_otp);
    if (!Isotp) return responsehandling(res, 409, false,"Please enter correct OTP");
    if (Date.now() > isuser.verify_otp_expiry)
      return responsehandling(res, 409,false, "OTP Expired");
    const hashedpassword = await bcrypt.hash(newpassword, 10);
    const updateddata = await User.update(
      {
        password: hashedpassword,
        verify_otp: '',
        verify_otp_expiry: '',
      },
      { where: { id:isuser.id } },
    );
    return responsehandling(res, 201, true,"Password Reseted Successfully");
  } catch (err) {
    return responsehandling(res, 500, false,err.message);
  }
};

module.exports = { register, login, forgotpassword, resetpassword };
