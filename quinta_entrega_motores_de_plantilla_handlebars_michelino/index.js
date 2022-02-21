const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const Product = require('./model/Product');
const PORT = process.env.PORT || 8080;

const app = express();
const products = new Product();

//Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Template engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}));

app.set('views', './views');
app.set('view engine', 'hbs');


//Routes
app.get('/productos', (req, res) => {
    let productsAmount = products.getAll();
    let list = productsAmount.length > 0;
    res.render('list', {products: productsAmount, list});
});

app.post('/productos', (req, res) => {
    products.save(req.body);
    res.redirect('/');
});


//Port connection
const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});