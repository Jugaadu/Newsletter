const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };


    app.post("/failure",function(req,res){
        res.redirect("/");
    });

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/b2feebb207",
        method: "POST",
        headers: {
            "Authorization": "DMM d8c557dd5ba29640bca944a3c60daa84-us4",
            "content-type": 'application/json'
        },
        body: jsonData,
    };
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            res.sendFile(__dirname+"/failure.html");
        } else {
            console.log(response.statusCode);

            if (response.statusCode == 200) {

                res.sendFile(__dirname+"/success.html");
            }else{
                
                res.sendFile(__dirname+"/failure.html");
            }
        }

    });
    console.log(firstName + " " + lastName + " " + email);
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server is running on port 3000");

})

// d8c557dd5ba29640bca944a3c60daa84-us4
// b2feebb207