import { StatusCodes } from 'http-status-codes'
import { Validator } from 'jsonschema'
import { insertStock } from '../validate/stock_validate'
import db from '../db/connect'
const StockController = {
  getAll(req,res) {
    db.query('select * from user',function(error,result) {
      if(error) {
        res.status(StatusCodes.BAD_REQUEST).send(error)
        return;
      }
      res.status(StatusCodes.OK).send(result)
    })
    // res.status(StatusCodes.UNAUTHORIZED).send({status:"authen failed"})
  },
  insertOne(req,res) {
    var v = new Validator()
    let result = v.validate(req.body,insertStock)
    console.log(result.valid)
    if(result.valid) {
      res.status(StatusCodes.OK).send({data:'insert complete'})
    }
    else {
      res.status(StatusCodes.BAD_REQUEST).send({data: result.errors})
    }
  }
}

export default StockController