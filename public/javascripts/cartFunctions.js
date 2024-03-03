let item_count = 0;
let cart = [];

function addToCart(item_id) {
    item_count++;
    document.getElementById("prod_count").innerHTML = item_count;
    console.log(item_id);
    const btnName = "btn" + item_id;
    console.log(btnName);
    document.getElementById(btnName).disabled = true;
    document.getElementById(btnName).innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
    cart.push(item_id);
}

function openMyCart() {
    let url = "http://localhost:3000/myCart";
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cart: cart,
            item_count: item_count,
        }),
    });
    // window.location.href = "/myCart";
    window.open("http://localhost:3000/myCart", "_blank");
}
