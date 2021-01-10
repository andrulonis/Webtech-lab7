const sortByColumn = (idx) => {
  let table = document.getElementById("featured")
  let rows = []

  // FIXME: Change 4 to table height
  for (let i = 1; i < 4; i++) {
    let row = table.getElementsByTagName("tr")[i]
    rows.push(row)
  }

  for (let i = 0; i < rows.length; i++) {
    if (i != rows.length) {
      var val = rows[i].getElementsByTagName("td")[idx].innerText
      var nextVal = rows[i+1].getElementsByTagName("td")[idx].innerText
    }

    for (let j = 0; j < rows.length; j++) {
      if (val < nextVal) {
        let temp = rows[j]
        rows[j] = rows[j+1]
        rows[j+1] = temp
      }
    }
  }
  
  /*let sortArr = []

  for (let i = 0; i < rows.length; i++) {
    sortArr.push(rows[i].getElementsByTagName("td")[idx].innerText)
  }*/

  console.log(rows)
}