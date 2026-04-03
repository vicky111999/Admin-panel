const jwt = require("jsonwebtoken")

 const authtoken = (data)=>{
   return  jwt.sign({id:data.id,roleid:data.roleid},process.env.JWT_SECRETKEY,{expiresIn:'7d'})
}

module.exports = {authtoken}