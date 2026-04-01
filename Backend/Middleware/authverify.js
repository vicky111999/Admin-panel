const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const Token = req.headers.authorization
    try{
    if(!Token) return res.status(401).json({status:false,message:"No Tokens"})
        const authtoken = Token.split(" ")[1];
    console.log(process.env.JWT_SECRETKEY,"joihoio")
    const ValidToken = jwt.verify(authtoken,process.env.JWT_SECRETKEY)
    if(!ValidToken) return res.status(401).json({status:false,message:"Token expired"})
        req.user = ValidToken.id
    
    next()
    }
    catch(err){
            console.log(err)
    }
}

module.exports = {verifyToken}