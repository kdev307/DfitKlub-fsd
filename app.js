// Required Modules

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

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
    conn.query("SELECT * FROM products", (error, results) => {
        if (error) throw error;
        res.render("store", { products: results });
    });
});

app.get("/signIn", function (req, res, next) {
    res.render("signIn");
});

app.get("/signUp", function (req, res, next) {
    res.render("signUp");
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
