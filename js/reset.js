$(document).ready(() => {
  $(".btn-reset").click(resetTable)
})

const resetTable = () => {
  let isConfirmed = true
    confirm("Are you sure you want to reset the database?")

  if (isConfirmed) {
    $.ajax({
      url: "https://wt.ops.labs.vu.nl/api21/e502cf1e/reset",
      type: "GET",
      success: (res) => {
        console.log(res)
        populate();
      },
      error: (res) => console.log(res)
    })
  } 
}