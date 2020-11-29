import StockController from '../controllers/stock_controller'
export default function stock(app) {
  app.get('/stock',StockController.getAll)
  app.post('/stock',StockController.insertOne)
}