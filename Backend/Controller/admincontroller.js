const { raw } = require("express");
const User = require("../Models/dbQuery");
const { responsehandling } = require("../Utils/response");

const userfetch = async (req, res) => {
  try {
    let { page, limit } = req.query;
    console.log(page,limit)
    const id = req.user.id
    page = parseInt(page || 1);
    limit = parseInt(limit);
    const isAdmin = await User.findByPk(id, {attributes:["id","roleid"], raw: true });
console.log("hi")
    if (!isAdmin.id || isAdmin.roleid !== 2)
      return responsehandling(res, 401, false, "Admin only get users");
    let offset = parseInt((page - 1) * limit);
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
      attributes: ["id", "name", "email","roleid", "created_at", "updated_at"],
      raw: true,
    });
    const user = {
      id:isAdmin.roleid,
      users: users.rows,
      totalcount: users.count,
      currentpage: page,
      totalpage: Math.ceil(users.count / limit),
      pagesize: limit,
      prevpage: page > 1 ? page - 1 : "",
      nextpage: page * limit < users.count ? page + 1 : "",
    }
    console.log("9",users)
    return responsehandling(res, 200, "Users Fetched successfully", user);
  } catch (err) {
    return responsehandling(res, 500, false, err.message);
  }
};

module.exports = { userfetch };
