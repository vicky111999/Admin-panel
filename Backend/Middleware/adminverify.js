const jwt = require("jsonwebtoken")
const { errorresponse } = require("../Utils/response")


const adminverify=(req,res,next)=>{
            try{
                const Token = req.headers.authorization
                const payload = Token.split(' ')[1]
                     if(payload === "null") return errorresponse(res,404,"Token not found") 
                const decoded = jwt.verify(payload,process.env.JWT_SECRETKEY)
                if(!decoded) return errorresponse(res,401,"Token expired")
                    if(decoded.roleid !== 2) return errorresponse(res,403,"Access Denied")
                 req.user = decoded.id 
                next()  
            }
            catch(err){
                return errorresponse(res,500,err.message)
            }
            
}

module.exports = {adminverify}