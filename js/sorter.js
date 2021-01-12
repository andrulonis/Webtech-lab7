const sortTable = () => {
  $("table").tablesorter({
    sortInitialOrder: "asc",
    headers: {
      ".no-sort": { sorter: false }
    }
  })
}

$(document).ready(sortTable)