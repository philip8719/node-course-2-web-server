const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req,res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Chicken</h1>'); 
    res.render('home.hbs',{
        pageTitle: 'Home Page of a chicken wowhey',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'omg wow its a chicken wow amazing chicken lig lol hey',
        header: 'Home Page wow for a chicken wow'
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Oh no what this i not so good'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});