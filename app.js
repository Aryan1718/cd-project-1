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
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))
////////
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
    var username = request.body.uname;
    
    username=encrypt1(username)
    var password=request.body.psw;
    password=encrypt1(password)
    if (username && password) {
        connection.query('SELECT * FROM userdata WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                response.redirect('/new1');
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


app.get('/reg', (req, res) => {
    res.sendFile(path2 + 'reg.html')
})
app.post('/reg', function (request, response) {
    var username = request.body.uname;
    // var username = cipher.update(request.body.uname, "utf-8", "hex");
    // encryptedData += cipher.final("hex");
    var password = request.body.psw;
    var age = request.body.age;
    var address = request.body.address;
    if (username && password) {
        connection.getConnection(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "Insert into userdata (username,password,age,address) VALUES ('" +  encrypt1(request.body.uname) + "','" +  encrypt1(request.body.psw,13) + "','" +  encrypt1(request.body.age,15) + "','" +  encrypt1(request.body.address,14) + "')"
            response.redirect('/new1');
            connection.query(sql, function (err, result) {
                if (err) throw err;
                // let try1= encrypt1(request.body.uname)
                // console.log(try1)
                // let tr2=decrypt1(try1)
                // console.log(tr2)
                // // let encryptedData = cipher.update(request.body.uname, "utf-8", "hex");
                // encryptedData += cipher.final("hex");
                // console.log("Encrypted message: " + encryptedData);
                // let decryptedData = decipher.update(tr2, "hex", "utf-8");
                // decryptedData += decipher.final("utf8");
                // console.log("Decrypted message: " + decryptedData);
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
        var sql = "Insert into addbook (bookname,author,price) VALUES ('" + request.body.bookname + "','" + request.body.author + "','" + request.body.price + "')"
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