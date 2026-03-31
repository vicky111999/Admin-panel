const { usertable } =  require("../Models/dbQuery");


usertable((err)=>{
        if(err) return console.log("Table not connected",err)
         return console.log("Table created")   
})