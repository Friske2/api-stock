import express from 'express';
import stock from './routes/stock_routes'
import { connectDb } from './db/connect'
// import bodyParser from 'body-parser'
const app = express();
const PORT = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
connectDb()
app.use(express.json())
stock(app)
app.listen(PORT,()=> {
  console.log(`Example app listening at http://localhost:${PORT}`)
})