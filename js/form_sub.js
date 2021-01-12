$(document).ready(() => {
    let $tbody = $("#table-featured > tbody");
    const form = document.querySelector("form");
    form.addEventListener("submit", event => {
        event.preventDefault();
        let requestData = {
            product: $("#product").val(),
            origin: $("#origin").val(),
            best_before_date: $("#est_before_date").val(),
            amount: $("#amount").val(),
            image: $("#image").val()
        };
        $.post("https://wt.ops.labs.vu.nl/api21/e502cf1e", requestData, function(data) {
            console.log("test");
        }, "json");
        $($tbody).trigger("update")
    })
})