const products = [
    {
        id: 'redshoe',
        description: 'Red Shoes',
        price: 42.12,
        reviews: [],
    },
    {
        id: 'bluejean',
        description: 'Blue Jean',
        price: 55.55,
        reviews: [],
    }
];

function getAllProducts() {
    //make API calls & database queries
    return products;
}

function getProductsByPrice(min, max) {
    return products.filter((product) => {
        return product.price >= min && product.price <= max;
    })
}

function getProductByID(id) {
    return products.find((product) => {
        return product.id === id;
    });
}

function addNewProduct(id, description, price) {
    const newProduct = {
        id,
        price,
        description,
        reviews: [],
    };

    products.push(newProduct);
    return newProduct;
}

function addNewProductReview(id, rating, comment) {
    const product = getProductByID(id);
    if (product) {
        const newProductReview = {
            rating,
            comment,
        }    
        
        product.reviews.push(newProductReview);
        return newProductReview;
    };
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductByID,
    addNewProduct,
    addNewProductReview,
}