import { StatusCodes } from 'http-status-codes'
import { Validator } from 'jsonschema'
import { insertStock } from '../validate/stock_validate'
import db from '../db/connect'
const StockController = {
    getProductByID(req, res) {
        db.query('select p.id,p.barcode,p.name,p.count ,p.price,c.id as categories_id,c.category_name from products p left join categories c on c.id=p.category_id WHERE p.id =? and p.is_delete=0', req.params.id, function(error, result) {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message)
                return;
            }
            res.status(StatusCodes.OK).send(result)
        })
    },
    getProductByBarcode(req, res) {
        db.query('select p.id,p.barcode,p.name,p.count ,p.price,c.id as categories_id,c.category_name from products p left join categories c on c.id=p.category_id WHERE p.barcode=? and p.is_delete=0', req.params.barcode, function(error, result) {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message)
                return;
            }
            res.status(StatusCodes.OK).send(result)
        })
    },
    getAllProduct(req, res) {
        db.query('select p.id,p.barcode,p.name,p.count ,p.price,c.id as categories_id,c.category_name from products p left join categories c on c.id=p.category_id where p.is_delete=0', function(error, result) {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message)
                return;
            }
            console.log(result)
            res.status(StatusCodes.OK).send(result)
        })
    },
    // insertOne(req, res) {
    //     var v = new Validator()
    //     let result = v.validate(req.body, insertStock)
    //     console.log(result.valid)
    //     if (result.valid) {
    //         res.status(StatusCodes.OK).send({ data: 'insert complete' })
    //     } else {
    //         res.status(StatusCodes.BAD_REQUEST).send({ data: result.errors })
    //     }
    // },
    insertProduct(req, res) {
        db.query('INSERT INTO products SET ?', req.body, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.CREATED).send({ id: result.insertId })
            }
        });
    },
    updateProduct(req, res) {
        let putData = [req.body.barcode, req.body.name, req.body.count, req.body.price, req.body.category_id, req.body.id, ]
        let query = 'UPDATE products SET barcode=?,name=?,count=?,price=?,category_id=?,update_date=UTC_TIMESTAMP WHERE id =?'
        db.query(query, putData, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.CREATED).send({ id: req.body.id })
            }
        })
    },
    deleteProduct(req, res) {
        let id = Number(req.params.id)
        db.query('UPDATE  `products` SET is_delete=1 WHERE `products`.`id` = ?', id, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.OK).send({ id: id })
            }
        })
    },
    insertCategory(req, res) {
        db.query('INSERT INTO categories SET ?', req.body, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.CREATED).send({ id: result.insertId })
            }
        });
    },
    updateCategory(req, res) {
        let putData = [req.body.category_name, req.body.description, req.body.id]
        let query = 'UPDATE categories SET category_name=?,description=? WHERE id =?'
        db.query(query, putData, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.CREATED).send({ id: req.body.id })
            }
        })
    },
    deleteCategory(req, res) {
        let id = Number(req.params.id)
        db.query('UPDATE  `categories` SET is_delete=1 WHERE `categories`.`id` = ?', id, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.OK).send({ id: id })
            }
        })
    },
    getAllCategory(req, res) {
        db.query('select id,category_name,description from categories where is_delete=0', function(error, result) {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message)
                return;
            }
            console.log(result)
            res.status(StatusCodes.OK).send(result)
        })
    },
    addOrder(req, res) {
        db.query('insert into `order` (order_date) VALUES (UTC_TIMESTAMP)', (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.CREATED).send({ id: result.insertId })
            }
        });
    },
    cancelOrder(req, res) {
        let id = Number(req.params.id)
        let query = 'UPDATE `order` SET  is_delete=1 where id=?'
        db.query(query, id, (error, result) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
            } else {
                res.status(StatusCodes.CREATED).send({ id: id })
            }
        })
    }

}

export default StockController