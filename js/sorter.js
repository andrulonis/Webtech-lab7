$(document).ready(() => {
  $("#table-featured").tablesorter({
    sortInitialOrder: "asc",
    headers: {
      ".no-sort": { sorter: false }
    }
  })
})