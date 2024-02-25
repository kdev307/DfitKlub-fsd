// Required Modules

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

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
const { log } = require("console");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abcd1234!@#$",
    database: "dfitklub-fsd",
});
conn.connect();

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// Main API of the Web Application

// Rendering the Home Page/ Index Page
app.get("/", function (req, res, next) {
    res.render("index");
});

app.get("/index", function (req, res, next) {
    res.render("index");
});

// Rendering the Sign Up Page

app.get("/signUp", function (req, res, next) {
    res.render("signUp");
});

// Accessing & Storing the entered details by the user

app.post("/signUp", function (req, res, next) {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const userName = req.body.userName;
    const password = req.body.password;

    conn.query(
        "INSERT INTO users (id, name, email,  mobileNo, username, password, address) VALUES (?,?,?,?,?,?,?)",
        [uuidv4(), name, email, mobile, userName, password, address],
        function (error, results, fields) {
            if (error) console.log(error);
            else res.render("signIn");
        }
    );
});

// Rendering the Sign In Page

app.get("/signIn", function (req, res, next) {
    res.render("signIn");
});

// Validation of the User at the time Log In and Redirecting to the Store Page for purchasing

app.post("/signIn", function (req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(userName);
    conn.query(
        "SELECT username, password FROM users WHERE username = ?",
        [userName],
        function (error, results) {
            if (error) res.render("signIn");
            else {
                if (results[0].password === password) {
                    conn.query(
                        "SELECT id, username FROM users WHERE username = ?",
                        [userName],
                        function (error, results) {
                            if (error) res.status(404);
                            else {
                                const userid = results[0].id;
                                const username = results[0].username;
                                res.cookie("cookuid", userid);
                                res.cookie("cookusername", username);
                                res.redirect("/store");
                            }
                        }
                    );
                } else {
                    res.render("signIn");
                }
            }
        }
    );
});

// Rendering the Store Page after User Validation and storing credentials using cookies

app.get("/store", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    console.log(sid);
    conn.query(
        "SELECT id, username FROM users WHERE id = ?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                conn.query("SELECT * FROM products", function (error, results) {
                    if (!error) {
                        res.render("store", {
                            userid: sid,
                            username: susername,
                            products: results,
                        });
                    }
                });
            } else {
                res.render("signIn");
            }
        }
    );
});

// Rendering the Admin Sign In Page

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
