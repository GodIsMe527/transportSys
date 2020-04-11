const mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'transportsys',
    multipleStatements: true //是否允许执行多条sql语句
});
//将结果已对象数组返回
let row = (sql, params) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//模块导出
module.exports = {
    row: row,
}