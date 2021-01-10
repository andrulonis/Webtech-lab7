const sortByColumn = (idx) => {
  let table = document.getElementById("featured")
  let rows = []

  // TODO: unify usage for both tables
  // TODO: add to each header the same function and let it calculate which idx to use on its own
  // FIXME: Change 4 to table height
  // TODO: Add toLowerCase()
  for (let i = 1; i < table.getElementsByTagName("table")[0].rows.length - 2; i++) {
    let row = table.getElementsByTagName("tr")[i]
    rows.push(row)
  }

  for (let i = 0; i < rows.length - 1; i++) {
    for (let j = 0; j < rows.length - i - 1; j++) {
      var val = rows[j].getElementsByTagName("td")[idx].innerText
      var nextVal = rows[j+1].getElementsByTagName("td")[idx].innerText


      // Convert strings to numbers
      if (!isNaN(parseInt(val))) {
        val = parseInt(val);
        nextVal = parseInt(nextVal);
      }
      
      // Swap values
      if (val > nextVal) {
        let temp = rows[j]
        rows[j] = rows[j+1]
        rows[j+1] = temp
      }
    }
  }

  // Replace values
  let tempRows = rows;
  rows.forEach((el, i) => el.remove())
  let inputRow = document.getElementById("inputrow")
  let tbody = table.getElementsByTagName("tbody")[0]

  for (let i = 0; i < tempRows.length; i++) {
    tbody.insertBefore(tempRows[i], inputRow)
  }
}