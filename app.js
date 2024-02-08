// Required Modules

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fileUpload = require("express-fileupload");
var { v4: uuidv4 } = require("uuid");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// Connecting to the Database
const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abcd1234!@#$",
    database: "dfitklub-fsd",
});
conn.connect();

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

app.get("/", function (req, res, next) {
    res.render("index");
});

app.get("/index", function (req, res, next) {
    res.render("index");
});

app.get("/store", function (req, res, next) {
    conn.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        res.render("store", { products: results });
    });
});

app.get("/signUp", function (req, res, next) {
    res.render("signUp");
});

app.post("/signUp", function (req, res, next) {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const userName = req.body.userName;
    const password = req.body.password;

    conn.query(
        "INSERT INTO users (user_id, user_name, user_email, , user_mobileNo,user_usrnm,user_password, user_address) VALUES (?,?,?,?,?,?,?)",
        [uuidv4(), name, email, mobile, userName, password, address],
        function (error, results, fields) {
            if (error) console.log(error);
            else res.render("signIn");
        }
    );
});

app.get("/signIn", function (req, res, next) {
    res.render("signIn");
});

app.get("/adminSignIn", function (req, res, next) {
    res.render("adminSignIn");
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

app.use("/", indexRouter);
app.use("/users", usersRouter);
// Catch 404 and Forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
