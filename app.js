import express from 'express';
const app = express();
const PORT = "3000";
app.listen(PORT,()=> {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
app.use("*", (req, res) => {
     console.log("enter route");
     let text = "Hi <a href='https://medium.com/bakatest-          me'>https://medium.com/bakatest-me</a>";
     return res.send(text);
})