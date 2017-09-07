const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs'); //stop here do not call next()
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Home Page',
        link: '/about',
        linkName: 'About',
        welcome: 'Welcome to this test website using Node/Express'
    });
});

app.get('/about', (request, response)=> {
    // response.send('<h1>About Page</h1>');
    response.render('about.hbs',{
        title: 'About Page template',
        link: '/',
        linkName: 'Home',
    });
});

app.get('/bad', (request, response) => {
    // console.log(request);
    response.send({
        errorMessage: 'Unable to process request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});