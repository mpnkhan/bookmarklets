(()=>{
    const body = document.body;
    if (body.style.filter === "grayscale(100%)") {
        body.style.filter = "none";
    } else {
        body.style.filter = "grayscale(100%)";
    }
})();