const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    console.log("dh")
    const Token = req.headers.authorization
    
    console.log(Token)

    try{
    if(!Token) return res.status(401).json({status:false,message:"No Tokens"})
        const authtoken = Token.split(" ")[1];
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