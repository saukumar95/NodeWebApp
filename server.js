const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', hbs);
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log} \n`, (err) => {
        if (err) {
            console.log("Unable to append in log file.");
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintaincePage.hbs', {
        pageTitle: 'Maintaince Page',
        welcomeMessage: 'This page is under maintaince. Please visit after some time.'
    });
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home.hbs'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});


app.listen(3000, () => {
    console.log("server had started at port 3000")
});