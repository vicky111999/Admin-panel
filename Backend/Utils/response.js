

const responsehandling = (res,statuscode,message,data=null)=>{
  return res.status(statuscode).json({status:statuscode<=400,message,data})
}

module.exports = {responsehandling };
