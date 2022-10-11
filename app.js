const express = require("express");
const path = require("path");
var mysql = require('mysql');
const jsonToTable = require('json-to-table');
const path2 = __dirname + '/views/';
const app = express();
const json2html = require('node-json2html');
const port = 8000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var connection  = require('./database');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(session({ secret: "terraform123", saveUninitialized: true, resave: true }));
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))
///////////////otp
  // Function to generate OTP
  function generateOTP() {
      // Declare a digits variable 
      // which stores all digits
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 4; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
  }
var otp1=generateOTP()
console.log(otp1)
////
var sid = "ACeca2a4f6bba192bd3604722a9c9e8c4d";
var auth_token = "bf01e83583f815d6f753288f5ce55d2e";
var twilio = require("twilio")(sid, auth_token);
twilio.messages
  .create({
    from: "+15076937362",
    to: "+919558771737",
    body: otp1,
  })
  .then(function(res) {console.log("message has sent!")})
  .catch(function(err)  {
    console.log(err);
  });
//////
let secrateKey = "secrateKey";
const crypto = require('crypto');


function encrypt1(text) {
    encryptalgo = crypto.createCipher('aes192', secrateKey);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}

function decrypt1(encrypted) {
    decryptalgo = crypto.createDecipher('aes192', secrateKey);
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}

// 
/////////////try1

// encrypt the message
// input encoding
// output encoding

////////////////////////////////////////////////////////////////////////////////////////////
// let caesarCipher =  (str, key) =>{
//     return str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + key ) % 26 + 65));
//   }
  function encrypt(text, s)
    {
        let result=""
        for (let i = 0; i < text.length; i++)
        {
            let char = text[i];
            if (char.toUpperCase(text[i]))
            {
                let ch =  String.fromCharCode((((char.charCodeAt(0) -65+s) % 26) + 65));
                result += ch;
            }
            else
            {
                let ch = String.fromCharCode((((char.charCodeAt(0)-97+s) % 26) + 97));
                result += ch;
            }
        }
        return result;
    }
    function decrypt(text, s)
    {
        let result1=""
        for (let i = 0; i < text.length; i++)
        {
            let char = text[i];
            if (char.toUpperCase(text[i]))
            {
                let ch =  String.fromCharCode((((char.charCodeAt(0) -65-s) % 26) + 65));
                result1 += ch;
            }
            else
            {
                let ch = String.fromCharCode((((char.charCodeAt(0)-97-s) % 26) + 97));
                result1 += ch;
            }
        }
        return result1;
    }
////////////////////////////////////////////////////////////////////////////////////////

// ENDPOINTS
require('express-dynamic-helpers-patch')(app);
app.dynamicHelpers({
session: function (req, res) {
    return req.session;
    }
});
app.get('/otp', (req, res) => {
    // const params = {}
    res.sendFile(path2 + 'otp.html')
})
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
})


app.get('/new1', (req, res) => {
    const params = {}
    res.status(200).render('index1.pug', params);
})

app.get('/login', (req, res) => {
    res.sendFile(path2 + 'login.html')
})
app.post('/login', function (request, response) {
    var username = encrypt1(request.body.uname);
    var password = encrypt1(request.body.psw);
    if (username && password) {
        connection.query('SELECT * FROM userdata WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                response.redirect('/otp');
            }
            else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
    }
});
app.post('/verify', (req, res) => {
    // const params = {}
    var otp=req.body.otp
    console.log(otp)
    if(otp===otp1)
    {
        res.redirect('/new1');
    }
})


app.get('/reg', (req, res) => {
    res.sendFile(path2 + 'reg.html')
})
app.post('/reg', function (request, response) {
    var username = request.body.uname;
    var password = request.body.psw;
    var age = request.body.age;
    var address = request.body.address;
    if (username && password) {
        connection.getConnection(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "Insert into userdata (username,password,age,address) VALUES ('" + encrypt1(request.body.uname) + "','" + encrypt1(request.body.psw) + "','" + encrypt1(request.body.age) + "','" + encrypt1(request.body.address) + "')"
            response.redirect('/new1');
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(request.body.uname)
                console.log("1 record inserted");
            });
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.get('/book', (req, res) => {
    res.sendFile(path2 + 'addbook.html')
})
app.post('/addbook', function (request, response) {
    var bookname = request.body.bookname;
    var author = request.body.author;
    var price = request.body.price;
    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "Insert into addbook (bookname,author,price) VALUES ('" + encrypt1(request.body.bookname) + "','" + encrypt1(request.body.author) + "','" + encrypt1(request.body.price) + "')"
        connection.query(sql, function (err, result) {
            if (err) throw err;
            response.send("Book  added successfully")
            console.log("1 record inserted");
        });
    });
});
app.get('/disp', (request, response) => {
    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        var sql = `select * from userdata`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            let template = { '<>': 'div', 'html': '${user_id} ${username} ${Address} ${Age} ${password}' };
            let html = json2html.render(result, template);
            response.send(result)
            console.log(html);
        });
    });
});

app.get('/del', (req, res) => {
    res.sendFile(path2 + 'deletebook.html')
})
app.post('/db', function (request, response) {
    var id = request.body.book_id;
    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `DELETE FROM addbook WHERE book_id=${id}`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(request.body.book_id)
            response.send("Book Deleted")
            console.log("1 record inserted");
            // connection.end();
        });
    });
});

app.get('/logout', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});