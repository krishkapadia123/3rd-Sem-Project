const obj = require("./con");
const { models } = require("mongoose");
const port = 8080;

obj.app.get("/login", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    obj.tblUser.find({ username: username, password: password }, (err, data) => {
        console.log(data);

        if (JSON.stringify(data).length > 2)
            res.send(JSON.stringify({data:data}));
        else
            res.send("Login Fail")
    })
})
obj.app.get("/signup", (req, res) => {
    var tmp = new obj.tblUser({
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        phone: req.query.phone
    });
    obj.tblUser.find({username:tmp.username,password:tmp.password,email:tmp.email,phone:tmp.phone},(err,data)=>{
        if (JSON.stringify(data).length > 2)
        {
            res.send("User Already Signup..");
        }
        else
        {
            tmp.save((err, data) => {
                console.log(data);
                res.send(JSON.stringify(data));
            })
        }
        //console.log(data);
    })
    /*tmp.save((err, data) => {
        console.log(data);
        res.send(JSON.stringify(data));
    })*/
})
obj.app.listen(port, () => {
    console.log("Server running on port : ", port)
})


