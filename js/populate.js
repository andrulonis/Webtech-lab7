$(document).ready(() => {
  $.get("https://wt.ops.labs.vu.nl/api21/e502cf1e", (data) => {
    let rows = [];
    let $table = $("#table-featured");

    for (let i = 0; i < data.length; i++) {
      let row = `
        <tr>
          <td>${data[i].product}</td>
          <td>${data[i].origin}</td>
          <td>${data[i].best_before_date}</td>
          <td>${data[i].amount}</td>
          <td>placeholder</td>
        </tr>
      `;
      $table.append(row);
    }
  })
})