require ('dotenv').config();
const express = require('express')
    session = require('express-session'),
    {SERVER_PORT, SESSION_SECRET} = process.env,
    checkForSession = require('./middlewares/checkForSession'),
    swagCtrl = require('./controllers/swagcontroller'),
    authCtrl = require('./controllers/authController'),
    cartCtrl = require('./controllers/cartController'),
    searchCtrl = require('./controllers/searchController')

const app = express()

app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagCtrl.read)

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/:id', cartCtrl.add)
app.post('/api/checkout/:id', cartCtrl.checkout)
app.delete('/api/car/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)


app.listen(SERVER_PORT, () => console.log(`server is listening on ${SERVER_PORT}`))