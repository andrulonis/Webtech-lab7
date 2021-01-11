$(document).ready(() => {
  let len = document.getElementById("table-featured").rows.length;
  console.log(len)

  $("#table-featured").tablesorter({
    sortInitialOrder: "asc",
    headers: {
      ".no-sort": { sorter: false }
    }
  })
})