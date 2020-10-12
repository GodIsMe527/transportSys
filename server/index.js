const express = require("express")
const app = express()
app.use(require("cors")())
app.use(express.json())
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
    next();
});
app.use("/admin", express.static(__dirname + "/admin"))
// app.use("/app", express.static(__dirname + "/app"))
const adminRouter = require("./router/admin")(app)
// const appRouter = require("./router/app")(app)
app.listen(3000, function () {
    console.log("正在开启3000端口");
})