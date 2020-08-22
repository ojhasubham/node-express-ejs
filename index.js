const express = require("express");
var path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//setup public folder
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(`${__dirname}/public`, { maxAge: 864000000 }));
const userRoutes = require("./server/routes/EmailSubscribe");
const bodyParser = require("body-parser");
// MongoDB Connection
mongoose
  .connect(`${process.env.MONGODB_URL}`, {
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", userRoutes);  

app.get("/", (req, res) => {
  res.render("pages/Home");
});      
app.get("/user/:id", (req, res) => {
  res.render("pages/Home");
});
app.get("/thankyou", (req, res) => {
  res.render("pages/ThankYou");
});
app.listen(`${process.env.PORT}`, () => console.log(`MasterEJS app Started on port ${process.env.PORT}!`));
