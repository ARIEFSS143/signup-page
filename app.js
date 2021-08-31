const express = require('express');
const bp = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bp.urlencoded({extended:true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/styles.css");
});

app.post("/failure", function() {
    res.redirect("/");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const check = req.body.check;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/ac397ced1f"

    const options = {
        method: "POST",
        auth: "friends:ff479cabc537d11f335c9d1a7f13fef1-us5"
    }

     const request = https.request(url, options, function(response){

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
         response.on("data", function(data) {
             console.log(JSON.parse(data));
         })

     })
    request.write(jsonData);
    request.end();
  
});


app.listen(3000, function() {
    console.log("server is running on port 3000");
});
//ff479cabc537d11f335c9d1a7f13fef1-us5

//ac397ced1f