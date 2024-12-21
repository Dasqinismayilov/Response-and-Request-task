const express = require('express');

const app = express();
const PORT = 3006;


app.use(express.json());


let products = [
    { id: 1, name: 'Laptop', price: 1500, quantity: 10 },
    { id: 2, name: 'Smartphone', price: 800, quantity: 20 },
    { id: 3, name: 'Headphones', price: 200, quantity: 50 },
    { id: 4, name: 'Keyboard', price: 100, quantity: 15 },
    { id: 5, name: 'Mouse', price: 50, quantity: 25 },
    { id: 6, name: 'Monitor', price: 300, quantity: 8 },
    { id: 7, name: 'Printer', price: 250, quantity: 5 },
    { id: 8, name: 'External HDD', price: 120, quantity: 12 },
    { id: 9, name: 'Desk Lamp', price: 40, quantity: 30 },
    { id: 10, name: 'Webcam', price: 70, quantity: 18 },
];


app.get('/products', (req, res) => {
    const { limit, offset } = req.query;

    const startIndex = parseInt(offset) || 0;
    const endIndex = startIndex + (parseInt(limit) || products.length);

    const paginatedProducts = products.slice(startIndex, endIndex);
    res.json({
        total: products.length,
        limit: parseInt(limit) || products.length,
        offset: startIndex,
        data: paginatedProducts,
    });
});


app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find(prod => prod.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});


app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda işləyir.`);
});
