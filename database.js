var mysql=require('mysql');
var con =mysql.createPool(
    {
            // host:"localhost",
            // user:"root",
            // password:"yash@123",
            // database:"project"
            host: "terraform-20221010200318227600000001.cwq1rj9hzdnj.us-east-1.rds.amazonaws.com",
            user: "yash",
            password: "yash@123"
        });
module.exports = con;