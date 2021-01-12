const resetTable = () => {
  let isConfirmed = true
    confirm("Are you sure you want to reset the database?")

  if (isConfirmed) {
    $($tbody).trigger("update")
    
    let json = $.get("https://wt.ops.labs.vu.nl/api21/e502cf1e", (data) => {
      console.log(data)
      data = {}
    }, "json").fail(function(jqXHR) {
      $(".btn-reset").html("There was an error contacting the server: " + jqXHR.status + " " + jqXHR.responseText);
    }
    /*$.ajax({
      url: "https://api.jsonbin.io/b/5ffc4e878aa7af359da8a015",
      type: "GET",
      success: (res) => alert(res),
      error: (xhr, status, err) => alert(err)
    })*/
  }
}