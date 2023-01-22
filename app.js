const express = require("express");
const path = require("path");
const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");
var mysql = require('mysql');
const jsonToTable = require('json-to-table');
const path2 = __dirname + '/views/';
const app = express();
const json2html = require('node-json2html');
const port = 8000;
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
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


var passChange={
    '@':'x',
    '=':'p',
    "'":'z',
    '#':'a',
    '$':'s',
    "%":'t',
    '^':'y',
    '&':'u',
    '(':'i',
    ')':'q',
    '-':'p',
    '+':'v',
    '<':'m',
    '>':'n',
    ',':'b',
    '.':'c',
    '?':'g',
    '/':'o'
}

console.log(passChange)

// console.log(twilio.messages.body)
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
    console.log(username)
    console.log(password)
    var r1;
    if (username && password) {
        connection.query('SELECT * FROM userdata WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                // var 
                // console.log(decrypt1(results[0]['mno']))
                var number1="+91";
                var number2=decrypt1(results[0]['mno'])
                var finalnumber= number1.concat(number2)
                console.log(finalnumber)

                console.log(typeof(number))
                //
                var sid = "ACeca2a4f6bba192bd3604722a9c9e8c4d";
                var auth_token = "14995be3ca27ccd16ab7c2768be47d17";
                var twilio = require("twilio")(sid, auth_token);
                twilio.messages
                .create({
                    from: "+15076937362",
                    to: finalnumber,
                    body: otp1,
                })
                .then(function(res) {console.log("message has sent!")})
                .catch(function(err)  {
                    console.log(err);
  });
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
    var mno = request.body.mno;
    console.log(password);
    
    for(var i=0;i<=password.length;i++){
        console.log(password[i]);
            for(var key in passChange) {
                var value = passChange[key];
                if(password[i]==key){
                    password=password.replace(password[i],value)
                }

              }
            
        }

    console.log(password)

    if (username && password) {
        connection.getConnection(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "Insert into userdata (username,password,age,address,mno) VALUES ('" + encrypt1(request.body.uname) + "','" + encrypt1(request.body.psw) + "','" + (request.body.age) + "','" + encrypt1(request.body.address) + "','" + encrypt1(request.body.mno) + "')"
            connection.query(sql,(err,result)=>{
                if(err) throw err
                console.log('Inserted...')
            })
            console.log(request.body.mno)
            response.redirect('/new1');
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
            console.log(decrypt1(request.body.price))
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
app.get('/pay', (req, res) => {
    res.sendFile(path2 + 'pay.html')
})
app.get('/top', (req, res) => {
    res.sendFile(path2 + 'table.html')
})
app.post("/paynow", [parseUrl, parseJson], (req, res) => {
    var paymentDetails = {
      amount: req.body.amount,
      customerId: req.body.name,
      customerEmail: req.body.email,
      customerPhone: req.body.phone
  }

      var params = {};
      params['MID'] = config.PaytmConfig.mid;
      params['WEBSITE'] = config.PaytmConfig.website;
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
      params['CUST_ID'] = paymentDetails.customerId;
      params['TXN_AMOUNT'] = paymentDetails.amount;
    //   params['CALLBACK_URL'] = 'http://localhost:3000/callback';
      params['EMAIL'] = paymentDetails.customerEmail;
      params['MOBILE_NO'] = paymentDetails.customerPhone;
  
  
      checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
          var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
          // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
  
          var form_fields = "";
          for (var x in params) {
              form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
          }
          form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
  
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
          res.end();
      });
  
  });
app.get('/aboutus', (request, res) => {
    res.sendFile(path2 + 'aboutus.html')
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});