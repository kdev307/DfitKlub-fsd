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
    const email = req.body.email;
    const mobile = req.body.mobile;
    const userName = req.body.userName;
    const password = req.body.password;
    const address = req.body.address;
    const dob = req.body.dob;
    const addCountry = req.body.country;
    const addPincode = req.body.pincode;
    const bloodgroup = req.body.bloodgroup;
    const gender = req.body.gender;
    conn.query(
        "INSERT INTO users (id, name, dateOfbirth, bloodgroup, gender, email,  mobileNo, username, password, address, country, pincode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            uuidv4(),
            name,
            dob,
            bloodgroup,
            gender,
            email,
            mobile,
            userName,
            password,
            address,
            addCountry,
            addPincode,
        ],
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
        "SELECT id, username FROM users WHERE id= ? AND username= ?",
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
        "SELECT id, username FROM users WHERE id = ? AND username= ? ",
        [sid, susername],
        function (error, userResults) {
            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }
            if (userResults.length === 0) {
                return res.render("signIn");
            }

            conn.query("SELECT * FROM products", function (error, productResults) {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                }
                const item_id = req.body.itemid;
                const qty = req.body.quantity;
                const total_sub_price = req.body.subprice;
                const userid = sid;
                let currDate = new Date();
                res.cookie("delDate", currDate);

                if (typeof item_id === 'string') {
                    if (Number(qty) !== 0) {
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
                            function (error, results) {
                                if (error) {
                                    console.log(error);
                                    return res.sendStatus(500);
                                }
                                cart_items_id = [];
                                cart_item_details = [];
                                item_in_cart = 0;
                                getItemDetails(cart_items_id, 0);
                                res.redirect("/confirmed");
                            }
                        );
                    }
                } else {
                    item_id.forEach((item, i) => {
                        if (qty[i] !== 0) {
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
                                function (error, results) {
                                    if (error) {
                                        console.log(error);
                                        return res.sendStatus(500);
                                    }
                                    if (i === item_id.length - 1) {
                                        // Last item processed
                                        cart_items_id = [];
                                        cart_item_details = [];
                                        item_in_cart = 0;
                                        getItemDetails(cart_items_id, 0);
                                        res.redirect("/confirmed");
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }
    );
});

// Rendering the Order Confirmation Page

app.get("/confirmed", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    const expectDelDate = req.cookies.delDate;
    console.log("Format of Delivery Date", typeof (expectDelDate));
    console.log("Delivery Date", expectDelDate);
    conn.query(
        "SELECT id, username FROM users WHERE id= ? AND username= ?",
        [sid, susername],
        function (error, userResults) {
            if (!error && userResults) {
                res.render("confirmed", {
                    username: susername,
                    userid: sid,
                });
            }
            else {
                console.log("Unable to Place the Order")
                res.render("signIn");
            }
        })
});


app.post("/confirmed", function (req, res, next) {
    res.render("confirmed");
});

// Rendering My Profile Page of the Customer

app.get("/myProfile", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id=? AND username=?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                conn.query(
                    "SELECT name, DATE_FORMAT(dateOfBirth, '%M %e, %Y') AS dateOfbirth, bloodgroup, gender, email, mobileNo, username, address, country, pincode FROM users WHERE id= ? AND username= ?",
                    [sid, susername],
                    function (error, userResults) {
                        if (!error) {
                            res.render("myProfile", {
                                userid: sid,
                                username: susername,
                                user_details: userResults,
                            });
                        }
                    }
                );
            }
        }
    );
});

// Rendering the My Orders Page of the Customer

app.get("/myOrders", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id= ? AND username= ?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                conn.query(
                    "SELECT od.order_id, od.user_id, od.quantity, od.price, od.datetime, prod.prod_id, prod.prod_name, prod.prod_img FROM order_dispatch od, products prod WHERE od.user_id = ? AND prod.prod_id = od.prod_id ORDER BY od.datetime DESC",
                    [sid],
                    function (error, orderResults) {
                        if (!error) {
                            res.render("myOrders", {
                                username: susername,
                                userid: sid,
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

// Rendering the Edit Profile Page of the customer

app.get("/editProfile", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id=? AND username=?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                res.render("editProfile", {
                    username: susername,
                    userid: sid,
                    item_count: item_in_cart,
                });
            }
        }
    );
});

// Changing Address

app.post("/updateAddress", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM usres WHERE id= ? AND username=?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                const address = req.body.address;
                const country = req.body.country;
                const pincode = req.body.pincode;
                conn.query(
                    "UPDATE users SET address=?, country=?, pincode=? WHERE id=?",
                    [address, country, pincode, sid],
                    function (error, new_results) {
                        if (!error) {
                            res.render("editProfile", {
                                username: susername,
                                userid: sid,
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

// Changing Contact

app.post("/updateContact", function (req, res, next) {
    const sid = req.body.cookuid;
    const susername = req.body.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id=? AND username=?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                const mobileNo = req.body.mobile;
                conn.query(
                    "UPDATE users SET mobileNo=? WHERE id=? ",
                    [mobileNo, sid],
                    function (error, new_results) {
                        if (!error) {
                            res.render("editProfile", {
                                username: susername,
                                userid: sid,
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

// Changing Password

app.post("/updatePassword", function (req, res, next) {
    const sid = req.body.cookuid;
    const susername = req.body.cookusername;
    conn.query(
        "SELECT id, username FROM users WHERE id=? AND username=?",
        [sid, susername],
        function (error, results) {
            if (!error && results) {
                const old_password = req.body.old_password;
                const new_password = req.body.new_password;
                conn.query(
                    "UPDATE users SET password=? WHERE id=? AND password=?",
                    [new_password, sid, old_password],
                    function (error, new_results) {
                        if (!error) {
                            res.render("editProfile", {
                                username: susername,
                                userid: sid,
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
    res.clearCookie('sid');
    res.clearCookie('susername');
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
        "SELECT id, username FROM admin WHERE id= ? AND username= ?",
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

// Rendering the Admin Add Product Page

app.get("/admin_AddProduct", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM admin WHERE id= ? AND username= ?", [sid, susername], function (error, results) {
            if (!error && results) {
                res.render("admin_AddProduct", {
                    username: susername,
                    userid: sid,
                    items: results,
                });
            }
            else {
                res.render("adminSignIn");
            }
        }
    )
});


app.post("/admin_AddProduct", function (req, res, next) {
    const id = req.body.prodID;
    const name = req.body.prodName;
    const description = req.body.prodDescription;
    const category = req.body.prodCategory;
    const price = req.body.prodPrice;
    const rating = req.body.prodRating;
    if (!req.files) {
        return res.status(400).send("Image was not Uploaded");
    }
    const pro_image = req.files.prodImg;
    console.log(pro_image);
    const pro_image_name = pro_image.name;
    if (pro_image.mimetype == "image/jpeg" || pro_image.mimetype == "image/png" || pro_image.mimetype == "image/webp") {
        pro_image.mv("public/images/shop/" + pro_image_name, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            conn.query(
                "INSERT INTO products (prod_id, prod_name, prod_description, prod_category, prod_price, prod_rating, prod_img) VALUES (?,?,?,?,?,?,?)",
                [id, name, description, category, price, rating, pro_image_name],
                function (error, results, fields) {
                    if (error) console.log(error);
                    else {
                        res.redirect("/admin_AddProduct?message=Product20%Added20%Successfully");
                    }
                }
            );
        });
    }
    else {
        res.render("admin_AddProduct");
    }
});


// Rendering the Admin Update Product Price Page

app.get("/admin_UpdatePrice", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM admin WHERE id= ? AND username= ?", [sid, susername], function (error, results) {
            if (!error && results) {
                conn.query("SELECT * FROM products", function (error, results) {
                    if (!error) {
                        res.render("admin_UpdatePrice", {
                            username: susername,
                            userid: sid,
                            items: results,
                        });
                    }
                    else {
                        res.render("adminSignIn");
                    }
                });
            }
        }
    )
});


app.post("/admin_updatePrice", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;
    conn.query(
        "SELECT id, username FROM admin WHERE id= ? AND username= ?", [sid, susername], function (error, results) {
            if (!error && results) {
                const item_name = req.body.item_name;
                const new_product_price = req.body.NewProdPrice;
                conn.query("SELECT prod_name FROM products WHERE prod_name= ?", [item_name], function (error, results1) {
                    if (!error) {
                        conn.query("UPDATE products SET prod_price= ? WHERE prod_name= ?", [new_product_price, item_name],
                            function (error, results2) {
                                if (!error) {
                                    res.redirect("adminHomePage");
                                }
                                else {
                                    res.status(500).send("Cannot Update the Price");
                                }
                            });
                    }
                    else {
                        res.status(500).send("Cannot find the Product");
                    }
                });
            }
            else {
                res.render("adminHomePage")
            }
        }
    );

});

// Rendering Admin View & Dispatch Orders Page

app.get("/adminView_Dispatch", function (req, res, next) {
    const sid = req.cookies.cookuid;
    const susername = req.cookies.cookusername;

    conn.query(
        "SELECT id, username FROM admin WHERE id= ? AND username= ?",
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
            console.log(unique)
        }
    });
    console.log(unique);
    for (let i = 0; i < unique.length; i++) {
        conn.query(
            "SELECT * FROM orders WHERE order_id=?",
            [unique[i]],
            function (error, resultsItem) {
                console.log(resultsItem);
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
                                        if (error) {
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
