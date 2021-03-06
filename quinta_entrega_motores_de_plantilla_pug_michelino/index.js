const express = require('express');
const path = require('path');
const Product = require('./model/Product');
const PORT = process.env.PORT || 8080;

const app = express();
const products = new Product();

//Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');


//Routes
app.get('/productos', (req, res) => {
    res.render('productList', {products: products.getAll()});
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