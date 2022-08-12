const products = [
    {
        id: 'redshoe',
        description: 'Red Shoes',
        price: 42.12,
    },
    {
        id: 'bluejean',
        description: 'Blue Jean',
        price: 55.55,
    }
];

function getAllProducts() {
    //make API calls & database queries
    return products;
}

module.exports = {
    getAllProducts,
}