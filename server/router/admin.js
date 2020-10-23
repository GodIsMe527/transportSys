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
        console.log(pwd);
        let r = await db.row(sql, [name]);
        if (r && r.length > 0) {
            r = r[0];
            if (r.pwd === pwd) {
                if (r.type != 3) {
                    data.code = -96;
                    data.message = "权限不足";
                    res.send(data);
                    return;
                }
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
        let data = {}, sqlPlus = "", paramArray = [], sql, result, num;
        let currentPage = parseInt(req.query.currentPage);
        let pageSize = parseInt(req.query.pageSize);
        let startP = req.query.startP;
        let endP = req.query.endP;
        let startDP = req.query.startDP;
        let endDP = req.query.endDP;
        let driverP = req.query.driverP;
        let vehicleD = req.query.vehicleD;
        let cargoD = req.query.cargoD;
        if (startP) {
            sqlPlus += " and startAddress=?";
            paramArray.push(startP);
        }
        if (endP) {
            sqlPlus += " and endAddress=?";
            paramArray.push(endP);
        }
        if (startDP) {
            sqlPlus += " and unix_timestamp(createTime)>=?";
            paramArray.push(startDP);
        }
        if (endDP) {
            sqlPlus += " and unix_timestamp(createTime)<=?";
            paramArray.push(endDP);
        }
        if (driverP) {
            sqlPlus += " and driver=?";
            paramArray.push(driverP);
        }
        if (vehicleD) {
            sqlPlus += " and vehicle=?";
            paramArray.push(vehicleD);
        }
        if (cargoD) {
            sqlPlus += " and cargo=?";
            paramArray.push(cargoD);
        }
        if (status == 0 || status == 1) {
            sql = "select * from record where status=?" + sqlPlus + " limit ?,?";
            result = await db.row(sql, [parseInt(status)].concat(paramArray).concat([(currentPage - 1) * pageSize, currentPage * pageSize]));
            sql = "select count(*) from record where status=?" + sqlPlus;
            num = await db.row(sql, [parseInt(status)].concat(paramArray));
        } else {
            sql = "select * from record" + (sqlPlus ? (" where" + sqlPlus) : "") + " limit ?,?";
            result = await db.row(sql, paramArray.concat([(currentPage - 1) * pageSize, currentPage * pageSize]));
            sql = "select count(*) from record" + (sqlPlus ? (" where" + sqlPlus) : "");
            num = await db.row(sql, paramArray);
        }
        data.data = result;
        data.total = num[0]["count(*)"];
        data.code = 0;
        res.send(data)
    });
    /**
     * 获取收益记录
     */
    router.get("/queryChartData", async (req, res) => {
        let data = {}, sqlPlus = "", sqlPlusTime = "", paramArray = [], paramArrayTime = [], sql, result, sqlDate = "",
            sqlParam = "time";
        let startP = req.query.startP;
        let endP = req.query.endP;
        let startDP = req.query.startDP;
        let endDP = req.query.endDP;
        let driverP = req.query.driverP;
        let vehicleD = req.query.vehicleD;
        let cargoD = req.query.cargoD;
        let dateType = req.query.dateType;
        if (startP) {
            sqlPlus ? (sqlPlus += " and startAddress=?") : (sqlPlus = " startAddress=?");
            paramArray.push(startP);
        }
        if (endP) {
            sqlPlus ? (sqlPlus += " and endAddress=?") : (sqlPlus = " endAddress=?");
            paramArray.push(endP);
        }
        if (startDP) {
            console.log("dateType=" + dateType);
            if (dateType == 0) {
                sqlPlus ? (sqlPlus += " and createTime>=?") : (sqlPlus = " createTime>=?");
                sqlPlusTime ? (sqlPlusTime += " and a.datelist>=?") : (sqlPlusTime = " a.datelist>=?");
                paramArray.push(startDP);
                paramArrayTime.push(startDP);
                sqlDate = `( createTime, "%Y-%m" )`;
                sqlParam = "time"
            } else if (dateType == 1) {
                sqlPlus ? (sqlPlus += " and createTime>=?") : (sqlPlus = " createTime>=?");
                sqlPlusTime ? (sqlPlusTime += " and a.datelist>=?") : (sqlPlusTime = " a.datelist>=?");
                paramArray.push(startDP + "-01");
                paramArrayTime.push(parseInt(startDP.split("-")[0]) * 12 + parseInt(startDP.split("-")[1]) - 2000 * 12);
                sqlDate = `( createTime, "%Y-%m" )`;
                sqlParam = "monthNum"
            } else if (dateType == 2) {

            }
        }
        if (endDP) {
            if (dateType == 0) {
                sqlPlus ? (sqlPlus += " and createTime<=?") : (sqlPlus = " createTime<=?");
                sqlPlusTime ? (sqlPlusTime += " and a.datelist<=?") : (sqlPlusTime = " a.datelist<=?");
                paramArray.push(endDP);
                paramArrayTime.push(endDP);
            } else if (dateType == 1) {
                let temp = [], finalDP = "";
                sqlPlus ? (sqlPlus += " and createTime<?") : (sqlPlus = " createTime<?");
                sqlPlusTime ? (sqlPlusTime += " and a.datelist<=?") : (sqlPlusTime = " a.datelist<=?");
                temp = endDP.split("-");
                if (temp[1] == 12) {
                    finalDP = (parseInt(endDP.split("-")[0]) + 1) + "-01-01";
                } else {
                    finalDP = endDP.split("-")[0] + "-" + (parseInt(endDP.split("-")[1]) + 1) + "-01";
                }
                paramArray.push(finalDP);
                paramArrayTime.push(parseInt(endDP.split("-")[0]) * 12 + parseInt(endDP.split("-")[1]) - 2000 * 12);
            } else if (dateType == 2) {
                sqlPlus ? (sqlPlus += " and createTime<?") : (sqlPlus = " createTime<?");
                sqlPlusTime ? (sqlPlusTime += " and a.datelist<=?") : (sqlPlusTime = " a.datelist<=?");
                paramArray.push(endDP + "-01-01");
                paramArrayTime.push(endDP);
            }
        }
        if (driverP) {
            sqlPlus ? (sqlPlus += " and driver=?") : (sqlPlus = " driver=?");
            paramArray.push(driverP);
        }
        if (vehicleD) {
            sqlPlus ? (sqlPlus += " and vehicle=?") : (sqlPlus = " vehicle=?");
            paramArray.push(vehicleD);
        }
        if (cargoD) {
            sqlPlus ? (sqlPlus += " and cargo=?") : (sqlPlus = " cargo=?");
            paramArray.push(cargoD);
        }
        sqlPlus ? sqlPlus = (" where" + sqlPlus) : "";
        sqlPlusTime ? sqlPlusTime = (" where" + sqlPlusTime) : "";
        paramArray = paramArray.concat(paramArrayTime);
        console.log(paramArray);
        if (dateType == 0) {
            sql = `SELECT a.datelist date,ifnull(b.totalPrice,0) num FROM calendar a LEFT join (SELECT DATE_FORMAT( createTime, "%Y-%m-%d" ) AS time,SUM(totalPrice) AS totalPrice FROM record ${sqlPlus} GROUP BY DATE_FORMAT( createTime, "%Y-%m-%d" )) b on a.datelist=b.time ${sqlPlusTime} ORDER BY a.datelist`;
        } else if (dateType == 1) {
            sql = `SELECT a.datelist date,ifnull(b.totalPrice,0) num FROM monyea a LEFT join (SELECT monthNum AS time,SUM(totalPrice) AS totalPrice FROM record ${sqlPlus} GROUP BY monthNum) b on a.datelist=b.time ${sqlPlusTime} ORDER BY a.datelist`;
        } else if (dateType == 0) {

        }
        // sql = `SELECT a.datelist date,ifnull(b.totalPrice,0) num FROM calendar a LEFT join (SELECT DATE_FORMAT${sqlDate} AS time,SUM(totalPrice) AS totalPrice FROM record ${sqlPlus} GROUP BY DATE_FORMAT${sqlDate}) b on a.datelist=b.${sqlParam} ${sqlPlusTime} ORDER BY a.datelist`;
        result = await db.row(sql, paramArray);
        result.map(item => {
            let tempDate=parseInt(item.date)
            item.date = (parseInt(tempDate / 12)+2000) + "-"+(tempDate % 12).toString().padStart(2,"0");
        });
        data.data = result;
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
        let r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"],
            req.body["startAddress"], req.body["endAddress"], req.body["vehicle"], req.body["driver"], req.body["downFee"], req.body["roadFee"], req.body["id"]]);
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "修改成功";
            res.send(data);
        }
    });
    /**
     * 修改记录价格
     */
    router.post("/updatePrice", async (req, res) => {
        let sql = "update record set price=? where id=?";
        let data = {};
        let r = await db.row(sql, [req.body["price"], req.body["id"]]);
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
     * 修改记录状态
     */
    router.post("/delRecord", async (req, res) => {
        let sql = "update record set status=? where id=?";
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
        let price = util.toDecimal2(parseFloat(req.body["price"]) * parseFloat(req.body["num"]), 2) - req.body["downFee"] - req.body["roadFee"];
        console.log(parseFloat(req.body["price"]) * parseFloat(req.body["num"]));
        console.log(util.toDecimal2(parseFloat(req.body["price"]) * parseFloat(req.body["num"]), 2));
        console.log(util.toDecimal2(parseFloat(req.body["price"]) * parseFloat(req.body["num"]), 2) - req.body["downFee"]);
        console.log(util.toDecimal2(parseFloat(req.body["price"]) * parseFloat(req.body["num"]), 2) - req.body["downFee"] - req.body["roadFee"]);
        if (downFee && roadFee) {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,downFee,roadFee,vehicle,totalPrice) values(?,?,?,?,?,?,now(),?,?,?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["downFee"], req.body["roadFee"], req.body["vehicle"], price]);
        } else if (downFee) {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,downFee,vehicle,totalPrice) values(?,?,?,?,?,?,now(),?,?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["downFee"], req.body["vehicle"], price]);
        } else if (roadFee) {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,roadFee,vehicle,totalPrice) values(?,?,?,?,?,?,now(),?,?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["roadFee"], req.body["vehicle"], price]);
        } else {
            sql = "insert into record(cargo,weight,price,startAddress,endAddress,driver,createTime,vehicle,totalPrice) values(?,?,?,?,?,?,now(),?,?)";
            r = await db.row(sql, [req.body["cargo"], req.body["num"], req.body["price"], req.body["startAddress"], req.body["endAddress"], req.body["driver"], req.body["vehicle"], price]);
        }
        if (r && r.affectedRows) {
            data.code = 0;
            data.message = "添加成功";
            res.send(data);
        }
    });
    app.use("/admin/api", router)
}