const bcrypt = require("bcrypt");
const db = require("../Config/DB");
const { authtoken } = require("../Token/authToken");
const { generateOTP } = require("../Otpgenerate/otpgenerate");
const { sendmail } = require("../Sendmail/mailer");

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
    db.query(
      "INSERT INTO users (roleid,name,email,password) VALUES (?,?,?,?)",
      [roleid, name, email, hashedpassword],
      (err) => {
        if (err?.code === "ER_DUP_ENTRY")
          return res
            .status(409)
            .json({ status: false, message: "Email already exist" });
        return res
          .status(200)
          .json({ status: true, message: "Registered Successfully" });
      },
    );
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
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

    db.query(
      "SELECT * FROM users WHERE email  = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(400).json({ status: false, message: err });
        const data = result[0];
        if (!data?.email)
          return res
            .status(404)
            .json({ status: false, message: "Email is not exist" });
        const Ispassword = await bcrypt.compare(password, data.password);
        if (!Ispassword)
          return res
            .status(401)
            .json({ status: false, message: "Invalid Password" });
        const token = authtoken(data);
        return res
          .status(201)
          .json({
            status: true,
            message: "Loggedin Successfully",
            token: token,
          });
      },
    );
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const forgotpassword = (req, res) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ status: false, message: "Email is required" });
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      try {
        const data = result[0];
        if (!data)
          return res
            .status(404)
            .json({ status: false, message: "Email not exists" });
        const otp = generateOTP().toString();
        const subject = "Forgotpassword from Trackdo";
        const text = `Your OTP is :${otp}`;
        const hashedOTP = await bcrypt.hash(otp, 10);
        const verifyotpExpired = Date.now() + 5 * 60 * 1000;
        db.query(
          "UPDATE users SET verifyotp = ? , verifyotpExpired = ? WHERE email = ?",
          [hashedOTP, verifyotpExpired, data.email],
        );
        const Emailsent = sendmail(email, subject, text);
        return res.status(200).json({ status: true, message: "Otp sent" });
      } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
      }
    },
  );
};

const resetpassword = async (req, res) => {
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
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      try {
        console.log(err);

        const data = result[0];
        if (!data.email)
          return res
            .status(404)
            .json({ status: false, message: "Email is not exist" });
        if (!data.verifyotp)
          return res
            .status(404)
            .json({ status: false, message: "OTP is not exist" });
        if (!data.verifyotpExpired)
          return res
            .status(404)
            .json({ status: false, message: "OTPExpiry is not exist" });

        const Isotp = await bcrypt.compare(otp, data.verifyotp);
        if (!Isotp)
          return res
            .status(409)
            .json({ status: false, message: "Please enter correct OTP" });

        if (Date.now() > data.verifyotpExpired)
          return res
            .status(409)
            .json({ status: false, message: "OTP Expired" });
        const verifyotp = "";
        const verifyotpExpired = "";
    const hashedpassword = await bcrypt.hash(newpassword, 10);
        db.query(
          "UPDATE users SET password = ?, verifyotp =?, verifyotpExpired=? WHERE email = ?",
          [hashedpassword, verifyotp, verifyotpExpired, email],
        );

        return res
          .status(201)
          .json({ status: true, message: "Password Reseted Successfully" });
      } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
      }
    },
  );
};

module.exports = { register, login, forgotpassword, resetpassword };
