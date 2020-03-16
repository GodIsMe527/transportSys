const db=require("../model/db")
module.exports=(app)=>{
    const express=require("express")
    const router=express.Router()
    router.post("/newUser",async (req,res)=>{
        // console.log(req);
        if(req.body){
            let user=await db.exec({
                sql: 'INSERT INTO test SET ?',
                params: req.body,
                callback: function (r) {
                    res.send(r)
                }
            })
        }else{

        }
        // res.send("556")
    })
    app.use("/admin/api",router)
}