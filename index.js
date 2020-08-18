const express = require('express')
var path = require('path');
const app = express();
const mongoose = require("mongoose");
const port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));
// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/EJS", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));
mongoose.promise = global.Promise;




app.get('/', (req, res) =>{
res.render('pages/Home')
});
app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));