let order_id = [];


function checkDispatch() {
    console.log("Receiving....");
    const checking = document.querySelectorAll(".dispatch");
    console.log(checking);
    for (let idx = 0; idx < checking.length; idx++) {
        console.log(checking[idx].checked);
        if (checking[idx].checked) {
            order_id.push(checking[idx].name);
            console.log(checking[idx].name);
            console.log(order_id);
        }
    }
}


function selectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
    });
    checkDispatch();
}

function dispatching() {
    let url = "http://localhost:3000/adminView_Dispatch";
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order_id_container: order_id
        })
    });
    window.location.href = "http://localhost:3000/adminView_Dispatch";
}
