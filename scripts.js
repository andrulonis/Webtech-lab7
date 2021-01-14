// TOOD: All modern browsers support JSON.stringify(object), and knowing how to use it (see ZyBook 7.8) will save you a lot of time!

$(document).ready(() => {
  // Custom date sorter
  $.tablesorter.addParser({
    id: "dates",
    format: (cellText, table, cell, cellIndex) => {
      // Do not sort the input row
      if (cell.parentNode.className != "row-input") {
        let split = cellText.split(" ");
        let month = months.indexOf(split[0]);
        let year = split[1];

        // Sort by difference in milliseconds since 1970-01-01
        return new Date(year, month).getTime();
      }

      return cellText;
    },
    type: "numeric"
  })

  sortTable()
  populate()
  $(".btn-reset").click(resetTable);
  addFormHandler()
})

const sortTable = () => {
  $("table").tablesorter({
    // Sort ascending by default
    sortInitialOrder: "asc",
    headers: {
      // Disable sorter on elements with a "no-sort" class
      ".no-sort": { 
        sorter: false 
      }
    }
  })
}

function populate() {
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api21/e502cf1e",
    type: "GET",
    success: data => {
      let $tbody = $("#table-featured > tbody");
      let rowCount = $("#table-featured tr").length;
      let table = document.getElementById("table-featured");

      // rowCount - 2 in order to leave the header and submission row untouched 
      for (let i = rowCount - 2; i > 0; i--) {
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

      table.parentNode.reset(); // Reset HTML form
      $($tbody).trigger("update")
    },
    error: data => {
      console.error(data);
    }
  })
}

const resetTable = () => {
  let isConfirmed =
    confirm("Are you sure you want to reset the database?")

  if (isConfirmed) {
    $.ajax({
      url: "https://wt.ops.labs.vu.nl/api21/e502cf1e/reset",
      type: "GET",
      success: res => {
        console.log(res)
        populate();
      },
      error: res => console.error(res)
    })
  } 
}

const months = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
];

// Format date from "yyyy-mm-dd" to "mmmm yyyy"
const formatDate = date => {
  let split = date.split("-");
  let year = parseInt(split[0]);
  let month = parseInt(split[1]) - 1; // Remove 1 because JS counts months from 0-11

  return `${months[month]} ${year}`;
}

function addFormHandler() {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    let requestData = {
      product: $("#product").val(),
      origin: $("#origin").val(),
      best_before_date: formatDate($("#best_before_date").val()),
      amount: $("#amount").val(),
      image: $("#image").val()
    };

    $.ajax({
      type: "POST",
      url: "https://wt.ops.labs.vu.nl/api21/e502cf1e",
      data: requestData,
      success: res => {
        console.log("Submission successful: ");
        console.log(res);
        populate();
      },
      error: res => {
        console.error("Error in submission: ");
        console.error(res);
      }
    })
  })
}