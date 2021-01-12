function populate() {
  $.get("https://wt.ops.labs.vu.nl/api21/e502cf1e", (data) => {

    let $tbody = $("#table-featured > tbody");
    let rowsNum = $("#table-featured tr").length;
    console.log(rowsNum)

    for (let i = rowsNum - 2; i > 0; i--) {
      document.getElementById("table-featured").deleteRow(i);
    }

    for (let i = 0; i < data.length; i++) {
      let row = `
        <tr>
          <td>${data[i].product}</td>
          <td>${data[i].origin}</td>
          <td>${data[i].best_before_date}</td>
          <td>${data[i].amount}</td>
          <td><img src="${data[i].image}" alt="${data[i].product}"></td>
        </tr>`;
      
      $tbody.prepend(row);
    }
    $($tbody).trigger("update")
  })
}

$(document).ready(populate()); 