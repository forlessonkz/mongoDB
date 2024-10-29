const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const PORT = 7000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,  'views'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/products').then(() => {
    console.log('Connected to mongoDB');
}).catch((e) => {
    console.log('Failed to connect to mongoDB')
});

const productsSchema = new mongoose.Schema({
    type: String,
    title: String,
    brand: String,
    model: String,
    price: Number,
});

const products = mongoose.model('products', productsSchema);

app.post('/new', async (req, res) => {
    await new products({
        type: req.body.type,
        title: req.body.title,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
    }).save()
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/new', (req, res) => {
    res.render('addProduct')
})

app.get('/products', async (req, res) => {
    const data = await products.find()
    res.render('products', {data})
})
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
})