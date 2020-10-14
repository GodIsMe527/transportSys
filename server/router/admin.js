const db = require("../model/db");
const util = require("../utils");
const md5 = require("md5");
module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    /**
     * 登录
     */
    router.post("/login", async (req, res) => {
        let sql = "select * from user where userName=?";
        let data = {}, name = req.body["name"], pwd = req.body["pwd"];
        let r = await db.row(sql, [name]);
        if (r && r.length > 0) {
            r = r[0];
            if (r.pwd === pwd) {
                let randomStr = util.randomString(24) + "WLT" + new Date().getTime()
                let token = md5(randomStr);           //登陆后生成token   随机字符串+固定字符串+时间戳
                sql = "insert into loginrecord(userName,token,createTime) values(?,?,?)";
                r = await db.row(sql, [name, token, parseInt(new Date().getTime() / 1000)]);
                if (r.affectedRows == 1) {
                    data.code = 0;
                    data.token = token
                    data.message = "登录成功";
                } else {
                    data.code = -97;
                    data.message = "登录失败";
                }
                console.log(r);
            } else {
                data.code = -99;
                data.message = "用户名或密码错误";
            }
            res.send(data);
        } else {
            data.code = -98;
            data.message = "用户不存在";
            res.send(data);
        }
    });
    /**
     * 新建用户
     */
    router.post("/newUser", async (req, res) => {
        let sql = "insert into user(userName,phone,pwd,status,time) values(?,?,?,?,?)"
        let data = {};
        let r = await db.row(sql, [req.body["name"], req.body["phone"], req.body["pwd"], req.body["type"], req.body["time"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    /**
     * 修改用户
     */
    router.post("/editUser", async (req, res) => {
        let sql = "", data = {}, r = "";
        if (req.body["pwd"]) {
            sql = "update user set userName=? , phone=? ,pwd=?  where id=?";
            r = await db.row(sql, [req.body["name"], req.body["phone"], req.body["pwd"], req.body["id"]]);
        } else {
            sql = "update user set userName=? , phone=? where id=?";
            r = await db.row(sql, [req.body["name"], req.body["phone"], req.body["id"]]);
        }
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 新建地点
     */
    router.post("/newPoint", async (req, res) => {
        let sql = "insert into address(name,type,createTime) values(?,?,now())";
        let data = {};
        let r = await db.row(sql, [req.body["name"], req.body["type"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    /**
     * 新建车辆
     */
    router.post("/newVehicle", async (req, res) => {
        let sql = "insert into vehicle(no,type,createTime) values(?,?,now())";
        let data = {};
        let r = await db.row(sql, [req.body["no"], req.body["type"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    /**
     * 新建货物
     */
    router.post("/newCargo", async (req, res) => {
        let sql = "insert into cargo(name,createTime) values(?,now())";
        let data = {};
        let r = await db.row(sql, [req.body["name"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    /**
     * 获取用户列表
     */
    router.get("/getUserList", async (req, res) => {
        let status = req.query.status;
        let currentPage = req.query.currentPage;
        let pageSize = req.query.pageSize;
        let sql, data, result, num;
        data = {};
        if (status == 0 || status == 1) {
            sql = "select * from user where type=? limit ?,?";
            result = await db.row(sql, [parseInt(status), (currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from user where type=?";
            num = await db.row(sql, [parseInt(status)]);
        } else {
            sql = "select * from user limit ?,?";
            result = await db.row(sql, [(currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from user";
            num = await db.row(sql, []);
        }
        data.data = result;
        data.total = num[0]["count(*)"];
        data.code = 0;
        res.send(data)
    });
    /**
     * 获取起点列表
     */
    router.get("/getStartPointList", async (req, res) => {
        let status = req.query.status;
        let data = {}, sql, result, num;
        let currentPage = req.query.currentPage;
        let pageSize = req.query.pageSize;
        if (status == 0 || status == 1) {
            sql = "select * from address where status=? limit ?,?";
            result = await db.row(sql, [parseInt(status), (currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from address where status=?";
            num = await db.row(sql, [parseInt(status)]);
        } else {
            sql = "select * from address limit ?,?";
            result = await db.row(sql, [(currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from address";
            num = await db.row(sql, []);
        }
        data.data = result;
        data.total = num[0]["count(*)"];
        data.code = 0;
        res.send(data)
    });
    /**
     * 获取车辆列表
     */
    router.get("/getVehicleList", async (req, res) => {
        let status = req.query.status;
        let data = {}, sql, result, num;
        let currentPage = req.query.currentPage;
        let pageSize = req.query.pageSize;
        if (status == 0 || status == 1) {
            sql = "select * from vehicle where status=? limit ?,?";
            result = await db.row(sql, [parseInt(status), (currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from vehicle where status=?";
            num = await db.row(sql, [parseInt(status)]);
        } else {
            sql = "select * from vehicle limit ?,?";
            result = await db.row(sql, [(currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from vehicle";
            num = await db.row(sql, []);
        }
        data.data = result;
        data.total = num[0]["count(*)"];
        data.code = 0;
        res.send(data)
    });
    /**
     * 获取货物列表
     */
    router.get("/getCargoList", async (req, res) => {
        let status = req.query.status;
        let data = {}, sql, result, num;
        let currentPage = req.query.currentPage;
        let pageSize = req.query.pageSize;
        if (status == 0 || status == 1) {
            sql = "select * from cargo where status=? limit ?,?";
            result = await db.row(sql, [parseInt(status), (currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from cargo where status=?";
            num = await db.row(sql, [parseInt(status)]);
        } else {
            sql = "select * from cargo limit ?,?";
            result = await db.row(sql, [(currentPage - 1) * pageSize, parseInt(pageSize)]);
            sql = "select count(*) from cargo";
            num = await db.row(sql, []);
        }
        data.data = result;
        data.total = num[0]["count(*)"];
        data.code = 0;
        res.send(data)
    });
    /**
     * 获取记录列表
     */
    router.get("/getRecordList", async (req, res) => {
        let status = req.query.status;
        let data = {}, sql, result, num;
        let currentPage = parseInt(req.query.currentPage);
        let pageSize = parseInt(req.query.pageSize);
        if (status == 0 || status == 1) {
            sql = "select * from record where status=? limit ?,?";
            result = await db.row(sql, [parseInt(status), (currentPage - 1) * pageSize, currentPage * pageSize]);
            sql = "select count(*) from record where status=?";
            num = await db.row(sql, [parseInt(status)]);
        } else {
            sql = "select * from record limit ?,?";
            result = await db.row(sql, [(currentPage - 1) * pageSize, currentPage * pageSize]);
            sql = "select count(*) from record";
            num = await db.row(sql, []);
        }
        data.data = result;
        data.total = num[0]["count(*)"];
        data.code = 0;
        res.send(data)
    });
    /**
     * 修改用户状态
     */
    router.post("/delUser", async (req, res) => {
        let sql = "update user set type=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["type"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 新增地点
     */
    router.post("/editPoint", async (req, res) => {
        let sql = "insert into address(name,createTime) values(?,now())";
        let data = {};
        let r = await db.row(sql, [req.body["name"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    /**
     * 修改地点
     */
    router.post("/editStartPoint", async (req, res) => {
        let sql = "update address set name=? , type=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["name"], req.body["type"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改车辆
     */
    router.post("/editVehicle", async (req, res) => {
        let sql = "update vehicle set no=? , type=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["no"], req.body["type"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改货物
     */
    router.post("/editCargo", async (req, res) => {
        let sql = "update cargo set name=?  where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["name"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改记录
     */
    router.post("/editRecord", async (req, res) => {
        let sql = "update record set cargo=? , weight=? , price=?  , startAddress=? , endAddress=? , vehicle=? , driver=? , downFee=? , roadFee=?  where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["cargo"],req.body["num"],req.body["price"],
            req.body["startAddress"],req.body["endAddress"],req.body["vehicle"],req.body["driver"],req.body["downFee"],req.body["roadFee"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改地点状态
     */
    router.post("/deletePoint", async (req, res) => {
        let sql = "update address set status=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["status"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改车辆状态
     */
    router.post("/deleteVehicle", async (req, res) => {
        let sql = "update vehicle set status=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["status"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改货物状态
     */
    router.post("/deleteCargo", async (req, res) => {
        let sql = "update cargo set status=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["status"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 新增记录
     */
    router.post("/newRecord", async (req, res) => {
        let downFee = req.body["downFee"], roadFee = req.body["roadFee"], data = {}, sql = "", r = [];
        if (downFee && roadFee) {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,downFee,roadFee,vehicle) values(?,?,?,?,?,?,now(),?,?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["downFee"], req.body["roadFee"],req.body["vehicle"]]);
        } else if (downFee) {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,downFee,vehicle) values(?,?,?,?,?,?,now(),?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["downFee"],req.body["vehicle"]]);
        } else if (roadFee) {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,roadFee,vehicle) values(?,?,?,?,?,?,now(),?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["roadFee"],req.body["vehicle"]]);
        } else {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,vehicle) values(?,?,?,?,?,?,now(),?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"],req.body["vehicle"]]);
        }
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    app.use("/admin/api", router)
}