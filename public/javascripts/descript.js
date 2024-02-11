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
        const desc = event.target.closest(".pro-details").querySelector(".desc");
        // for the triggered mouse-click event, in the DOM specified element is searched and then the required descendant is selected
        desc.classList.toggle("show"); // Toggle the 'show' class
    });
});

// function toggleDescription() {
//     let prod_desc = document.getElementById("description");
//     if (prod_desc.style.display === "none") {
//         prod_desc.style.display = "block";
//     } else {
//         prod_desc.style.display = "none";
//     }
// }
