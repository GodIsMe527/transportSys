const db = require("../model/db")
module.exports = (app) => {
    const express = require("express")
    const router = express.Router()
    /**
     * 新建用户
     */
    router.post("/newUser", async (req, res) => {
        // console.log(req);
        // if (req.body) {
        //     let user = await db.exec({
        //         sql: 'INSERT INTO test SET ?',
        //         params: req.body,
        //         callback: function (r) {
        //             res.send(r)
        //         }
        //     })
        // } else {
        //
        // }
        // res.send("556")
        let sql = "insert into user(userName,phone,pwd,status,time) values(?,?,?,?,?)"
        let data = {};
        let r = await db.row(sql, [req.body["name"], req.body["phone"], req.body["pwd"], req.body["type"],req.body["time"]]);
        // if (r.length > 0) {
        console.log(r);
        if (r && r.affectedRows) {
            data.code = 0
            data.message = "添加成功"
            res.send(data)
        }
    })
    /**
     * 获取用户列表
     */
    router.get("/getUserList", async (req, res) => {
        let sql = "select * from user"
        let data = {};
        let r = await db.row(sql, []);
        // if (r.length > 0) {
        data.data = r
        data.code = 0
        res.send(data)
        // } else {
        //     res.send(data)
        // }
    })
    app.use("/admin/api", router)
}