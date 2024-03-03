function updateData(qty, i) {
    // updating the product's price

    const item_price = document.querySelectorAll(".item-price");
    const newPrice = parseInt(qty) * parseInt(item_price[i].innerHTML);
    // console.log(newPrice)
    document.querySelectorAll(".price")[i].innerHTML = newPrice;

    // updating the total quantity of the product

    const quantity = document.querySelector(".quantity");
    let total_qty = parseInt(0);
    for (let j = 0; j < quantity.length; j++) {
        total_qty += parseInt(quantity[j].value);
        // console.log(quantity[j].value);
    }
    // console.log(total_qty);
    document.getElementById("total_quantity").innerHTML = total_qty;

    // updating the total price of the purchase

    const price = document.querySelectorAll(".price");
    let total_price = parseInt(0);
    for (let j = 0; j < price.length; j++) {
        total_price += parseInt(price[j].innerHTML);
        // console.log(total_price);
    }
    // console.log(total_price)
    document.getElementById("total_price").innerHTML = "₹" + total_price;
}
