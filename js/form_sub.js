$(document).ready(() => {
    const form = document.querySelector("form");
    form.addEventListener("submit", event => {
        event.preventDefault();
        let requestData = {
            product: $("#product").val(),
            origin: $("#origin").val(),
            best_before_date: $("#best_before_date").val(),
            amount: $("#amount").val(),
            image: $("#image").val()
        };
        $.ajax({
            type: "POST",
            url: "https://wt.ops.labs.vu.nl/api21/e502cf1e",
            data: requestData,
            success: function(res) {
                console.log("Submission successful")
                console.log(res)
                populate();
            },
            error: function(res) {
                console.log("Error in submission")
                console.log(res)
            }
        })
    })
})