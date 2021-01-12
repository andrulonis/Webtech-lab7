function populate() {
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api21/e502cf1e",
    type: "GET",
    success: (data) => {
      let $tbody = $("#table-featured > tbody");
      let rowsNum = $("#table-featured tr").length;
      let table = document.getElementById("table-featured");

      for (let i = rowsNum - 2; i > 0; i--) {
        table.deleteRow(i);
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
      table.parentNode.reset();
      $($tbody).trigger("update")
    },
    error: (data) => {
      console.log(data);
    }
  })
}

$(document).ready(populate()); 