

const responsehandling = (res,statuscode,success=null,message,data=null)=>{
  console.log(success)
  return res.status(statuscode).json({status:success,message,data})
}

module.exports = {responsehandling };
