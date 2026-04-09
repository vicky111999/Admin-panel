const { raw } = require("express");
const User = require("../Models/dbQuery");
const { responsehandling } = require("../Utils/response");
const { Op } = require("sequelize");

const userfetch = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    const id = req.user.id;
    if(!id) return responsehandling(res,401,"not authenticated")
    page = parseInt(page || 1);
    limit = parseInt(limit || 10);
    console.log("1")
    const isAdmin = await User.findByPk(id, {
      attributes: ["id", "roleid"],
      raw: true,
    });
    console.log("2")

    if (!isAdmin.id || isAdmin.roleid !== 2)
      return responsehandling(res, 401, false, "Admin only get users");
    let offset = parseInt((page - 1) * limit);
    let wherecondition = {
      deleted: {
        [Op.ne]: 1,
      },
    };
    if (search) {
      wherecondition = {
        deleted: {
          [Op.ne]: 1,
        },
        // roleid: 3,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }
    console.log("3")
    console.log(offset)
    const users = await User.findAndCountAll({
      where: wherecondition,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      attributes: ["id", "name", "email", "roleid", "created_at", "updated_at"],
      raw: true,
    });
    
    if (!users.rows.length) return responsehandling(res, 400, "No users found");

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
    const { id } = req.params;
    if (!id) return responsehandling(res, 400, "Id required");
    if(req.user.id) return responsehandling(res,400,"You can't delete yourself")
    const Isuser = await User.findByPk(id, { raw: true });
    if (!Isuser) return responsehandling(res, 404, "User not found");
    const [deleteduser] = await User.update(
      { deleted: 1, deleted_by: req.user.id, deleted_at:new Date() },
      { where: { id }, raw: true },
    );
    if (!deleteduser) return responsehandling(res, 404, "User not deleted");
    return responsehandling(res, 200, "User soft deleted successfully");
  } catch (err) {
    return responsehandling(res, 500, err.message);
  }
};
const useredit = async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.params.id;
    console.log(name, email, id);
    if (!name || !email || !id)
      return responsehandling(res, 400, "Name and Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return responsehandling(res, 400, "Email is required form");
    const Isuser = await User.findByPk(id, { raw: true });
    if (!Isuser) return responsehandling(res, 404, "User not found");
    const [Updateduser] = await User.update(
      { name, email },
      { where: { id: Isuser.id }, raw: true },
    );
    if (!Updateduser) return responsehandling(res, 404, "No user updated");
    return responsehandling(res, 200, "Successfully Updated");
  } catch (err) {
    return responsehandling(res, 500, err.message);
  }
};

module.exports = { userfetch, userdelete, useredit };
