const express = require('express')
const app = express()
const database = require("./db")
// const bodyparser = require("body-parser")
const ResultModel = require("./models/Result")
const LoginModel = require("./models/Login")
const session = require("express-session")

app.use(express.urlencoded({ extended: false })) 
app.use(express.json()) 
app.use(session({secret: lkjwehULIYQWGDUWQYU}))

<<<<<<< HEAD
//conection with database
database.authenticate().then(() => {
=======
database.authenticate().then(() => {    
>>>>>>> 97ed56ccffcea576a0f66e30975b440668354f97
    console.log("Successfully connected to database")
}).catch(err => {
    console.log(err)
})

app.use(express.static("."))

app.get('/', (req, res) => {    
    res.sendFile(__dirname + '/index.html')
})

//get all users
app.get("/users", (req, res) => {
    LoginModel.findAll().then(users => {
        if(users) {
            return res.json(users)
        }
        return res.json({msg: "No results user"})
    }).catch(err => {
        res.json(err)
    })    
})

//get all results
app.get('/results', (req, res) => {
    ResultModel.findAll().then(results => {
        if(results) {
            return res.json(results)
        }
        return res.json({msg: "No results"})
    })
})

<<<<<<< HEAD
//return all user the database
app.get('/getUserResults/:username', (req, res) => {
    const {username} = req.params
    if(username) {
        LoginModel.findOne({where: {username: username}, include: [{ model: ResultModel }]})
        .then(user => {
            console.log(user)
            res.json(user.results)
        }).catch(err => {
            res.json(err)
        })
    }
})

//save all operations
app.post('/saveOperation', (req, res) => {
    const {operation, result, username} = req.body    
    LoginModel.findOne({where: {username}}).then(user => {
        if(user) {
            ResultModel.create({operation, result, loginId: user.id}).then(result => {
                console.log("Save")
                res.json({id: result.id, operation, result: result.result, username})
            })
            .catch(err => {
                res.json(err)
            })
        }
        else {
            LoginModel.create({username}).then(newUser => {

                ResultModel.create({operation, result, loginId: newUser.id}).then(result => {
                    console.log("Save here")
                    res.json({id: result.id, operation, result: result.result, username})
                })
                .catch(err => {
                    res.json(err)
                }) 
            })
        }
    }).catch(err => {
        return res.json(err)
=======
app.post('/saveOperation', (req, res) => {
    const {operation, result} = req.body
    ResultModel.create({operation, result}).then(result => {
        console.log("Save")
        res.json({operation, result})
    })
    .catch(err => {
        res.json(err)
    })
})

app.post('/createUser', (req, res) => {
    LoginModel.create({
        username: "Anderson Giusti"
    }).then((user) => {
        console.log("Created user")
        res.send(user.username)
>>>>>>> 97ed56ccffcea576a0f66e30975b440668354f97
    })
    
})

//return the result realized in front for back
app.post("/select", (req, res) => {
    const {display, result} = req.body    
    console.log(`Operation: ${display}\nResults: ${result}`);
    res.send({display})    
})

<<<<<<< HEAD
//port the server
=======
>>>>>>> 97ed56ccffcea576a0f66e30975b440668354f97
app.listen(3000, (err) => {
    if (err) {
        console.log('No server')
    } else {
        console.log('Server online url http://localhost:3000/')
    }
})

