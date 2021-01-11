const sortTable = () => {
  $("#table-featured").tablesorter({
    sortInitialOrder: "asc",
    headers: {
      ".no-sort": { sorter: false }
    }
  })
}

$(document).ready(sortTable)