// const showDesc = document.querySelector(".show-desc");
// const prod_desc = document.querySelectorAll(".desc");

// showDesc.addEventListener("click", (event) => {
//     prod_desc.forEach((item) => {
//         if (item.style.display !== "block") {
//             item.style.display = "block";
//         } else {
//             item.style.display = "none";
//         }
//     });
// });

// const showDescButtons = document.querySelectorAll(".show-desc");

// showDescButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//         const desc = event.target.closest(".pro-details").querySelector(".desc");
//         if (desc.style.display !== "block") {
//             desc.style.display = "block";
//         } else {
//             desc.style.display = "none";
//         }
//     });
// });

const showDescButtons = document.querySelectorAll(".show-desc"); // selects every button with class=".show-desc"

showDescButtons.forEach((button) => {
    // iterating the functionality for every button present
    button.addEventListener("click", (event) => {
        // adding event listener on button click which is the event
        const proDetails = event.target.closest(".pro-details");
        const desc = proDetails.querySelector(".desc");
        // for the triggered mouse-click event, in the DOM specified element is searched and then the required descendant is selected
        desc.classList.toggle("show"); // Toggle the 'show' class
        let divDetails = document.querySelectorAll(".pro-details");
        proDetails.style.height = "auto";
        // const card = event.target.closest(".product-card");
        // const details = card.querySelector(".pro-details");
        // const desc = card.querySelector(".desc");

        // desc.classList.toggle("show");

        // details.style.height = "auto";
    });
    // details.style.height = "12rem";
});
