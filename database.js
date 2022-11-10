
var mysql=require('mysql');
var con =mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "root",
        database:"project",
        port:3306

        });
module.exports = con;
