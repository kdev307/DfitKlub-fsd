const filterContainer = document.querySelector(".product-filter");
const productItems = document.querySelectorAll(".product-item");

const sportsButton = document.getElementById("sport");
const sportsCat = document.getElementById("sport-cat");

sportsButton.addEventListener("click", function () {
    if (sportsCat.style.display === "flex") {
        sportsCat.style.display = "none";
    } else {
        sportsCat.style.display = "flex";
    }
});

filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) {
        // Remove 'active' class from the previously active filter
        filterContainer.querySelector(".active").classList.remove("active");

        // Add 'active' class to the clicked filter
        event.target.classList.add("active");

        // Get the filter value from the data-filter attribute
        const filterValue = event.target.getAttribute("data-filter");

        // Iterate over each product item
        productItems.forEach((item) => {
            if (
                item.classList.contains(filterValue) ||
                filterValue === "all" ||
                filterValue === ""
            ) {
                // Show the 'filter-all' element when filter is not 'all'
                if (filterValue !== "all") {
                    if (document.getElementById("sport") && filterValue === "sports") {
                        document.getElementById("sport-cat").style.display = "flex";
                        document.getElementById("filter-all").style.display = "block";
                        document.getElementById("filter-all").style.fontSize = "1.2rem";
                    } else {
                        document.getElementById("filter-all").style.display = "block";
                        document.getElementById("filter-all").style.fontSize = "1.2rem";
                    }
                    // }
                    // if (document.getElementById("sport") && filterValue === "") {
                    //     document.getElementById("sport-cat").style.display = "flex";
                    //     document.getElementById("filter-all").style.display = "block";
                    //     document.getElementById("filter-all").style.fontSize = "1.2rem";
                    // } else if (filterValue !== "all" && ) {
                    //     document.getElementById("filter-all").style.display = "block";
                    //     document.getElementById("filter-all").style.fontSize = "1.2rem";
                } else {
                    // Hide the 'filter-all' element when filter is 'all'
                    document.getElementById("filter-all").style.display = "none";
                    document.getElementById("sport-cat").style.display = "none";
                }
                // Remove 'hide' and add 'show' classes
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                // Remove 'show' and add 'hide' classes
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});
