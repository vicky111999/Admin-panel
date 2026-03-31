const jwt = require("jsonwebtoken")

 const authtoken = ({data})=>{
    return jwt.sign({data},process.env.JWT_SECRETKEY,{expiresIn:'7d'})
}

module.exports = {authtoken}