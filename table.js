const sortByColumn = (idx) => {
  let table = document.getElementById("featured")
  let rows = []

  // FIXME: Change 4 to table height
  for (let i = 1; i < 4; i++) {
    let row = table.getElementsByTagName("tr")[i]
    rows.push(row)
  }

  for (let i = 0; i < rows.length; i++) {
    let val = rows[i].getElementsByTagName("td")[idx].innerText
    
  }
  
  /*let sortArr = []

  for (let i = 0; i < rows.length; i++) {
    sortArr.push(rows[i].getElementsByTagName("td")[idx].innerText)
  }*/

  console.log(sortArr[1])
}

const bubbleSort = ()