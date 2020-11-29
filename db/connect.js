import mysql from 'mysql'
import config from '../config'
const db = mysql.createConnection(config)

export function connectDb() {
  db.connect(function (err) {
    if(err) {
      console.log(err)
    }
  })
}
export default db