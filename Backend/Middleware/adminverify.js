const jwt = require("jsonwebtoken")
const {  responsehandling } = require("../Utils/response")


const adminverify=(req,res,next)=>{
            try{
                const Token = req.headers.authorization
                const payload = Token.split(' ')[1]
                     if(payload === "null") return responsehandling(res,404,false,"Token not found") 
                const decoded = jwt.verify(payload,process.env.JWT_SECRETKEY)
                if(!decoded) return responsehandling(res,401,false,"Token expired")
                    if(decoded.roleid !== 2) return responsehandling(res,403,false,"Access Denied")
                 req.user = decoded.id 
                next()  
            }
            catch(err){
                return responsehandling(res,500,false,err.message)
            }
            
}

module.exports = {adminverify}