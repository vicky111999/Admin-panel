const bcrypt = require("bcrypt");
const db = require("../Config/DB");
const { authtoken } = require("../Token/authToken");

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
      [roleid, name, email, hashedpassword],(err)=>{
        if(err?.code === 'ER_DUP_ENTRY') return res.status(409).json({status:false,message:'Email already exist'})
       return res
      .status(200)
      .json({ status: true, message: "Registered Successfully" });
        }
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

    db.query("SELECT * FROM users WHERE email  = ?", [email], async(err, result) => {
      if (err) return res.status(400).json({ status: false, message: err });
      const data = result[0];
      if (!data?.email)
        return res
          .status(404)
          .json({ status: false, message: "Email is not exist" });
const Ispassword = await bcrypt.compare(password,data.password)
 if (!Ispassword)
        return res
          .status(401)
          .json({ status: false, message: "Invalid Password" });

      const token = authtoken(data.id);
      return res
        .status(201)
        .json({ status: true, message: "Loggedin Successfully", token: token });
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};



module.exports = { register, login };
