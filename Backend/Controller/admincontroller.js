const { raw } = require("express");
const User = require("../Models/dbQuery");
const { responsehandling } = require("../Utils/response");

const userfetch = async (req, res) => {
  try {
    let { page, limit } = req.query;
    const id = req.user.id;
    page = parseInt(page || 1);
    limit = parseInt(limit || 10);
    const isAdmin = await User.findByPk(id, {
      attributes: ["id", "roleid"],
      raw: true,
    });
    if (!isAdmin.id || isAdmin.roleid !== 2)
      return responsehandling(res, 401, false, "Admin only get users");
    let offset = parseInt((page - 1) * limit);
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
      attributes: ["id", "name", "email", "roleid", "created_at", "updated_at"],
      raw: true,
    });
    const user = {
      id: isAdmin.roleid,
      users: users.rows,
      totalcount: users.count,
      currentpage: page,
      totalpage: Math.ceil(users.count / limit),
      pagesize: limit,
      prevpage: page > 1 ? page - 1 : "",
      nextpage: page * limit < users.count ? page + 1 : "",
    };
    return responsehandling(res, 200, "Users Fetched successfully", user);
  } catch (err) {
    return responsehandling(res, 500, false, err.message);
  }
};
const userdelete = async (req, res) => {
  try {
    console.log("hi")
    const { id } = req.params;
    if (!id) return responsehandling(res, 400, "Id required");
    const Isuser = await User.findByPk(id,{raw:true})
    if(!Isuser) return responsehandling(res,404,"User not found")
    const deleteduser = await User.destroy({where:{id},raw:true})
    if(!deleteduser) return responsehandling(res,404,"User not deleted")
     return responsehandling(res,200,"User soft deleted successfully")
  } catch (err) {
    return responsehandling(res, 500, err.message);
  }
};
const useredit =async(req,res)=>{
        try{
          const {name,email} = req.body
          if(!name || !email || !id) return responsehandling(res,400,"Name and Email is required")
          if(! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return responsehandling(res,400,"Email is required form")  
          const Isuser = await User.findOne({where:{email},raw:true})
          if(!Isuser) return responsehandling(res,404,"User not found")
          const [Updateduser] = await User.update({name,email},{where:{id:Isuser.id},raw:true}) 
          if(!Updateduser) return responsehandling(res,404,"No user updated")
          return responsehandling(res,200,"Successfully Updated")  
        }
        catch(err){
          return responsehandling(res,500,err.message)
        }
}
module.exports = { userfetch, userdelete, useredit };
