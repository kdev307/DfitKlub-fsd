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

// Rendering the Home Page/ Index Page for the customer
app.get("/", function (req, res, next) {
    res.render("index");
});

app.get("/index", function (req, res, next) {
    res.render("index");
});

// Rendering the Sign Up Page for the customer

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

// Rendering the Sign In Page for the customer

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

// Accessing MyCart of the customer

let cart_items_id = []; // general array used to pass to the function as a part of the functional programming
let cart_item_details = [];
let item_in_cart = 0;
function getItemDetails(cart_items_id, size) {
    cart_items_id.map((item) => {
        conn.query(
            "SELECT * FROM products WHERE prod_id= ?",
            [item],
            function (error, results_item) {
                cart_item_details.push(results_item[0]);
            }
        );
    });
    item_in_cart = size;
}

// Rendering MyCart of the customer

app.get("/myCart", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id= ? and username= ?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                res.render("myCart", {
                    username: susername,
                    userid: sid,
                    items: cart_item_details,
                    item_count: item_in_cart,
                });
            } else res.render("signIn");
        }
    );
});

let cart_items = []; // the array storing the ids of the products added to the cart by the customer
app.post("/myCart", function (req, res, next) {
    cart_items = req.body.cart;
    let unique = []; // checks for duplicate elements
    cart_items.forEach((index) => {
        if (!unique.includes(index)) unique.push(index);
    });
    getItemDetails(unique, unique.length);
});

// Rendering the checkout (after clicking buy now on myCart Page)

app.post("/checkout", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id = ? and username= ? ",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                conn.query("SELECT * FROM products", function (error, results) {
                    if (!error) {
                        const item_id = req.body.itemid;
                        const qty = req.body.quantity;
                        const total_sub_price = req.body.subprice;
                        const userid = req.cookies.cookuid;
                        let currDate = new Date();
                        if (item_id.length == 1) {
                            if (qty[0] != 0) {
                                conn.query(
                                    "INSERT INTO orders (order_id, user_id, prod_id, quantity, price, datetime) VALUES (?, ?, ?, ?, ?, ?)",
                                    [
                                        uuidv4(),
                                        userid,
                                        item_id,
                                        qty,
                                        total_sub_price * qty,
                                        currDate,
                                    ],
                                    function (error, results, fields) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(500);
                                        } else {
                                            cart_items_id = [];
                                            cart_item_details = [];
                                            item_in_cart = 0;
                                            getItemDetails(cart_items_id, 0);
                                            res.render("confirmed", {
                                                username: susername,
                                                userid: sid,
                                            });
                                        }
                                    }
                                );
                            }
                        } else {
                            item_id.map((item, i) => {
                                if (qty[i] != 0) {
                                    conn.query(
                                        "INSERT INTO orders (order_id, user_id, prod_id, quantity, price, datetime) VALUES (?, ?, ?, ?, ?, ?)",
                                        [
                                            uuidv4(),
                                            userid,
                                            item,
                                            qty[i],
                                            total_sub_price[i] * qty[i],
                                            currDate,
                                        ],
                                        function (error, results, field) {
                                            if (error) {
                                                console.log(error);
                                                res.send(500);
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        cart_items_id = [];
                        cart_item_details = [];
                        item_in_cart = 0;
                        getItemDetails(cart_items_id, 0);
                        res.render("confirmed", { username: susername, userid: sid });
                    }
                });
            } else {
                res.render("signIn");
            }
        }
    );
});

// Rendering the Order Confirmation Page

// app.get("/confirmed", function (req, res, next) {
//     const sid = req.cookies.cookuid;
//     const susername = req.cookies.cookusername;
//     conn.query(
//         "SELECT id, username FROM users WHERE id= ? and username= ?",
//         [sid, susername],
//         function (error, results) {
//             if (!error && results) {
//                 conn.query("SELECT order_id, datetime FROM orders WHERE user_id= ?",[sid], function(error,results){
//                     if(!error && results){
//                         res.render("confirmed", {
//                             username: susername,
//                             userid: sid,
//                             orders:results,
//                         });
//                     }
//                     else{
//                         res.render("signIn");
//                     }
//                 })
//             } else {
//                 res.render("signIn");
//             }
//         }
//     );
// });

app.get("/confirmed", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id= ? and username= ?",
        [sid, susername],
        function (error, userResults) {
            if (!error && userResults && userResults.length > 0) {
                conn.query(
                    "SELECT od.order_id, od.datetime FROM order_dispatch od, products prod WHERE od.user_id = ? AND prod.prod_id = od.prod_id ",
                    [sid],
                    function (error, orderResults) {
                        if (!error && orderResults && orderResults.length > 0) {
                            res.render("confirmed", {
                                username: susername,
                                userid: sid,
                                order_details: orderResults,
                                item_count: item_in_cart,
                            });
                        } else {
                            res.render("confirmed", {
                                username: susername,
                                userid: sid,
                                order_details: [],
                                item_count: 0,
                            });
                        }
                    }
                );
            } else {
                res.render("signIn");
            }
        }
    );
});

app.post("/confirmed", function (req, res, next) {
    res.render("confirmed");
});

app.get("/myOrders", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id= ? and username= ?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                conn.query(
                    "SELECT od.order_id, od.user_id, od.quantity, od.price, od.datetime, prod.prod_id, prod.prod_name, prod.prod_img FROM order_dispatch od, products prod WHERE od.user_id = ? AND prod.prod_id = od.prod_id ORDER BY od.datetime DESC",
                    [sid],
                    function (error, orderResults) {
                        if (!error) {
                            res.render("myOrders", {
                                order_history: orderResults,
                                item_count: item_in_cart,
                            });
                        }
                    }
                );
            } else {
                res.render("signIn");
            }
        }
    );
});

// Logging out the customer

app.get("/logOut", function (req, res, next) {
    res.clearCookie();
    return res.redirect("/signIn");
});

/*++++++++++++++++++++++++++++++++++Admin End Portal++++++++++++++++++++++++++++++++*/

// Rendering the Admin Sign In Page

app.get("/adminSignIn", function (req, res, next) {
    res.render("adminSignIn");
});

app.post("/adminSignIn", function (req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;

    conn.query(
        "SELECT username, password FROM admin WHERE username=?",
        [userName],
        function (error, results) {
            if (error) {
                res.render("signIn");
            } else {
                if (results[0].password === password) {
                    conn.query(
                        "SELECT id, username FROM admin WHERE username=?",
                        [userName],
                        function (error, results) {
                            if (error) res.sendStatus(404);
                            else {
                                const aid = results[0].id;
                                const ausername = results[0].username;
                                res.cookie("cookuid", aid);
                                res.cookie("cookusername", ausername);
                                res.redirect("adminHomePage");
                            }
                        }
                    );
                } else {
                    res.render("adminSignIn");
                }
            }
        }
    );
});

// Rendering the Admin Home Page

app.get("/adminHomePage", function (req, res, next) {
    console.log("cookuid: ", req.cookies.cookuid);
    console.log("cookusername: ", req.cookies.cookusername);
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM admin WHERE id= ? and username= ?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                res.render("adminHomePage", {
                    username: susername,
                    userid: sid,
                    item: results,
                });
            } else {
                res.render("adminSignIn");
            }
        }
    );
});

// Rendering Admin View for Dispatching Orders

app.get("/adminView_Dispatch", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;

    conn.query(
        "SELECT id, username FROM admin WHERE id= ? and username= ?",
        [sid, susername],
        function (error, adminResults) {
            if (!error && adminResults) {
                conn.query(
                    "SELECT * FROM orders ORDER BY datetime",
                    function (error, dispatchResults) {
                        res.render("adminView_Dispatch", {
                            username: susername,
                            userid: sid,
                            orders_dispatched: dispatchResults,
                        });
                    }
                );
            } else {
                res.render("adminSignIn");
            }
        }
    );
});

let total_orders = [];

app.post("/adminView_Dispatch", function (req, res, next) {
    total_orders = req.body.order_id_container;
    let unique = [];
    total_orders.forEach((index) => {
        if (!unique.includes(index)) {
            unique.push(index);
        }
    });
    for (let i = 0; i < unique.length; i++) {
        conn.query(
            "SELECT * FROM orders WHERE order_id=?",
            [unique[i]],
            function (error, resultsItem) {
                if (!error) {
                    let currDate = new Date();
                    conn.query(
                        "INSERT INTO order_dispatch (order_id, user_id, prod_id, quantity, price, datetime) VALUES (?,?,?,?,?,?)",
                        [
                            resultsItem[0].order_id,
                            resultsItem[0].user_id,
                            resultsItem[0].prod_id,
                            resultsItem[0].quantity,
                            resultsItem[0].price,
                            currDate,
                        ],
                        function (error, results) {
                            if (!error) {
                                conn.query(
                                    "DELETE FROM orders WHERE order_id=?",
                                    [resultsItem[0].order_id],
                                    function (error, results2) {
                                        if (!error) {
                                        } else {
                                            res.sendStatus(500).send("Something Went Wrong :( ");
                                        }
                                    }
                                );
                            } else {
                                res.sendStatus(500).send("Something Went Wrong :( ");
                            }
                        }
                    );
                } else {
                    res.sendStatus(500).send("Something Went Wrong :( ");
                }
            }
        );
    }

    conn.query("SELECT * FROM orders ORDER BY datetime", function (error, dispatchResults2) {
        res.render("adminView_Dispatch", {
            username: req.cookies.cookusername,
            dispatched_orders: dispatchResults2,
        });
    });
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
