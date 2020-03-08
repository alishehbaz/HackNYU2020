//Nabeel was here :)

//Libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const md5 = require('md5')
const id = require('shortid')

//Mongoose - Mongodb
const User = require('./models/User')
mongoose.connect('mongodb://urrarefubd5wsgeopsid:FZJFSB59fFyE0scLQczy@b8myi3588oqnhzj-mongodb.services.clever-cloud.com:27017/b8myi3588oqnhzj')

//App Constants
const app = express();

app.use(session({
    secret: 'du0o$o@rlKamu-#f3ecRuK',
    resave: true,
    saveUninitialized: true,
    maxAge: 5000000
}));

const PORT = process.env.PORT || 5000;

app.set('view engine', 'pug')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public')); // static public folder


var auth = function(req, res, next) {
    if (req.session && req.session.email) {
      return next();
    } else {
      return res.redirect('/login')
    }
  };

  var notalreadyauth = function(req, res, next) {
    if (req.session && req.session.email) {
        return res.redirect('/')
    } else {
        return next();
    }
  }

app.get('/', auth,(req,res)=>{
    User.find({}, (err,data)=>{
        if(err) throw err
        var classes = data[0].class
        res.render('index', {userName: req.session.name, userEmail: req.session.email, classes: classes})
    })
})

app.get('/login',notalreadyauth,(req,res)=>{
    let forward = req.query.err
    res.render('login', {message: forward})
})

app.get('/register', notalreadyauth,(req,res)=>{
    res.render('register')
})

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login')
});

//Aarav smells :(
app.post('/api/login', (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    User.find({email: email, password: md5(password)}, (err, data)=>{
        if(err) throw err
        console.log("Logged in: "+data)
        if(data[0]) {
            req.session.name = data[0].name
            req.session.email = email
            res.redirect('/')
        } else {
            let message = "Incorrect Username or Password"
            res.redirect('/login?err='+message)
        }
    })
})
//lol
//Nabeel was here :)
app.post('/api/register', (req,res)=>{
    let name = req.body.fname+" "+req.body.lname
    let email = req.body.email
    let password = req.body.password
    let password1 = req.body.password1

    if(password !== password1) {
        res.redirect('/register')
    } else {
        var newUser = new User({
            name: name,
            email: email,
            password: md5(password)
        })
    
        newUser.save((err, data)=>{
            if(err) throw err
            console.log(data)
            req.session.name = name
            req.session.email = email
            res.redirect('/')
        })
    }
})

//Dashboard
app.get('/class', auth,(req,res)=>{
    console.log("CLASS ID: "+req.query.id)

    function searchClass(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].classId === nameKey) {
                return myArray[i];
            }
        }
    }

    User.find({email: req.session.email}, (err, data)=>{
        if(err) throw err
        let verifedWork = []
        let classdata = data[0].class
        let classIndex = searchClass(req.query.id, classdata)
        User.find({email: req.session.email}, (err, data)=>{
            if(err) throw err
            let workdata = data[0].classWork
            for(let x=0; x< workdata.length; x++){
                if(workdata[x].classId == req.query.id) {
                    verifedWork.push(workdata[x])
                }
            }
            res.render('class', {classData: classIndex, workData: verifedWork})
        })
    })
})

app.get('/addclass', auth,(req,res)=>{
    res.render('addclass')
})

app.post('/api/addclass', auth, (req,res)=>{
    let className = req.body.className
    let classId = id.generate()
    User.update(
        { email: req.session.email}, 
        { $push: {class: {classId, className}}}, (err, data)=>{
            console.log(err)
            console.log(data)
        }
    )
    res.redirect('/')
})

app.post('/api/assignment', auth,(req,res)=>{
    let classWorkTitle = req.body.assignmenttitle
    let classWorkDesc = req.body.assignmentdesc
    var returnURL = (req.headers.referer).replace('http://localhost:5000', '')
    console.log(returnURL)
    let classId = returnURL.replace('/class?id=', '')
    console.log(classWorkTitle, classWorkDesc)
    User.update(
        { email: req.session.email}, 
        { $push: {classWork: {classId, classWorkTitle, classWorkDesc}}}, (err, data)=>{
            console.log(err)
            console.log(data)
        }
    )
    res.redirect(returnURL)
})
 
//404 Router
app.use((req, res, next) => {
    return res.status(404);
});

//Listen
app.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}`);
});