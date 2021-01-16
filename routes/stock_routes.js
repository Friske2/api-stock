import StockController from '../controllers/stock_controller'
export default function stock(app) {
    //product
    app.get('/api/v1/product', StockController.getAllProduct)
    app.get('/api/v1/product/:id', StockController.getProductByID)
    app.get('/api/v1/product/findByBarcode/:barcode', StockController.getProductByBarcode)
    app.post('/api/v1/product', StockController.insertProduct)
    app.put('/api/v1/product', StockController.updateProduct)
    app.delete('/api/v1/product/:id', StockController.deleteProduct)

    //category
    app.get('/api/v1/category', StockController.getAllCategory)
    app.post('/api/v1/category', StockController.insertCategory)
    app.put('/api/v1/category', StockController.updateCategory)
    app.delete('/api/v1/category/:id', StockController.deleteCategory)

    //order
    app.post('/api/v1/order', StockController.addOrder)
    app.delete('/api/v1/order/:id', StockController.cancelOrder)

}