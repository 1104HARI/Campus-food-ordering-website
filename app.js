const express = require("express");
const mysql = require("mysql");
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");

const cookieParser = require("cookie-parser");
const app = express();

doenv.config({
  path: "./.env",
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});
db.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connection Success");
  }
});
app.use("/pic", express.static('pic'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {

  res.set({
      "Allow-access-Allow-Origin": '*'
  })

  return res.redirect('login');

}).listen(3000);

const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs"); 

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);
app.use("/", require("./route/pages"));
app.use("/auth", require("./route/auth"));
app.get("/home",(req,res)=>{
  res.render("home");
});

app.get("/style",(req,res)=>{
  res.render("style");
});

app.get("/login",(req,res)=>{
  res.render("login");
});
app.get("/admin",(req,res)=>{
  res.render("admin");
});

app.get("/register",(req,res)=>{
   res.render("register");
 });
 
app.get("/profile",(req,res)=>{
   res.render("profile");
 });
 app.get("/res",(req,res)=>{
  res.render("res");
});
app.get("/shopping",(req,res)=>{
  res.render("shopping");
});
app.get("/payment",(req,res)=>{
  res.render("payment");
});
app.get("/admin",(req,res)=>{
  res.render("admin");
});
app.post("/place_order",(req,res)=>{
  
});
app.listen(5000, ()=>{
  console.log("Server Started @ Port 5000");
});
