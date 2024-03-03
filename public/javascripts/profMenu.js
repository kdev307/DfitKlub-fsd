const profBtn = document.getElementById("profile-btn");
const profOpts = document.getElementById("profile-div");

profBtn.addEventListener("click", (event) => {
    if (profOpts.style.display === "flex") {
        profOpts.style.display = "none";
        profOpts.style.transition = "all 5s ease-in-out";
    } else {
        profOpts.style.display = "flex";
        profOpts.style.transition = "all 5s ease-in-out";
    }
});
