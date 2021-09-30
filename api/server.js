const express = require('express');
const { errorHandling, validateUser } = require('./middleware');
const server = express();
server.use(express.json());

const dummyData = [{
    username: 'kaderade18',
    password: 'password',
    id: 0
},
{
    username: 'tobascochicken',
    password: 'password',
    id: 1
}];

const add = (user) => {
    dummyData.push(user);
    return user;
};

const login = (credentials) => {
    return dummyData.find( user => user.username === credentials.username && user.password === credentials.password);
};

server.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1>');
});

server.get('/api/users', (req, res) => {
    res.status(200).json(dummyData);
});

server.post('/api/register', validateUser,(req, res, next) => {
    try {
        // res.send(`<h1>Thanks for registering, ${req.newUser.username}, Enjoy!</h1>`);
        res.status(201).json(add(req.newUser));
    }
    catch (err){
        next(err);
    }
});

server.post('/api/login', validateUser, (req, res, next) => {
    try {
        const checkCredentials = login(req.body);
        if(checkCredentials) {
            // res.send(`<h1>Welcome to DummyApp!</h1>`);
            res.status(200).json({ message: "Welcome to DummyApp!" });
        } else {
            next({ status:400, message: "User not found, are you sure you're signed up?" });
        }
    }
    catch (err){
        next(err);
    }
});

server.use('*', (req, res, next) => {
    next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` });
});
  
server.use(errorHandling);

module.exports = server;
