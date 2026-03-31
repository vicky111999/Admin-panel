const db = require("../Config/DB");

const usertable=(callback)=>{
    const sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,roleid INT NOT NULL,name VARCHAR(100) NOT NULL CHECK (name <> ''),email VARCHAR(255) UNIQUE NOT NULL CHECK (email <> ''),password VARCHAR(255) NOT NULL CHECK (password <> ''))"
    db.query(sql,callback)
}

module.exports = { usertable };
