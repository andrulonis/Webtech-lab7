$(document).ready(() => {
  dateParser();
  sortTable();
  populate();
  $(".btn-reset").click(resetTable);
  $("#btn-search").click(searchProduct);
  $().click(updateProduct); //HERE ADD THE UPDATE THING
  addFormHandler();
});

function searchProduct() {
  let id = $(".searchbar").val();
  
  $.ajax({
    url: `http://localhost:3000/products/${id}`,
    type: "GET",
    success: data => {
      let $tbody = $("#table-search > tbody");
      let rowCount = $("#table-search tr").length;
      let table = document.getElementById("table-search");

      if (rowCount > 1) {
        table.deleteRow(1);
      };

      let row = `
        <tr>
            <td>${data.product}</td>
            <td>${data.origin}</td>
            <td>${data.best_before_date}</td>
            <td>${data.amount}</td>
            <td><img src="${data.image}" alt="${data.product}"></td>
        </tr>`;
        
      $tbody.prepend(row);
      $($tbody).trigger("update");
    },
    error: () => {
      alert("Couldn't find product");
    }
  });
}

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
  });
};

function populate() {
  $.ajax({
    url: "http://localhost:3000/products",
    type: "GET",
    success: data => {
      let $tbody = $("#table-featured > tbody");
      let rowCount = $("#table-featured tr").length;
      let table = document.getElementById("table-featured");

      // rowCount - 2 in order to leave the header and submission row untouched 
      for (let i = rowCount - 2; i > 0; i--) {
        table.deleteRow(i);
      };

      for (let i = 0; i < data.length; i++) {
        let row = `
          <tr>
              <td>${data[i].product}</td>
              <td>${data[i].origin}</td>
              <td>${data[i].best_before_date}</td>
              <td>${data[i].amount}</td>
              <td><img src="${data[i].image}" alt="${data[i].product}"></td>
              <td class="btn-delete" id="${data[i].id}">Delete product</td>
          </tr>`;
        
        $tbody.prepend(row);
      };

      $(".btn-delete").click(deleteProduct)
      table.parentNode.reset(); // Reset HTML form
      $($tbody).trigger("update");
    },
    error: () => {
      alert("Retrieving data unsuccessful");
    }
  });
};

const resetTable = () => {
  let isConfirmed = confirm("Are you sure you want to reset the database?");

  if (isConfirmed) {
    $.ajax({
      url: "http://localhost:3000/reset",
      type: "GET",
      success: res => {
        console.log(res);
        populate();
      },
      error: () => {
        alert("Error occurred while resetting database");
      }
    });
  };
};

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
      url: "http://localhost:3000/products",
      data: JSON.stringify(requestData),
      contentType: "application/json",
      success: () => {
        console.log("Submission successful");
        populate();
      },
      error: (e) => {
        console.error(JSON.stringify(e));
        alert("Error in submission");
      }
    });
  });
};

// Custom date sorter
function dateParser() {
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
      };
    
      return cellText;
    },
    type: "numeric"
  });
};

//Deletes a product of specific ID
function deleteProduct() {
  let isConfirmed = confirm("Are you sure you want to delete the product?");

  if (isConfirmed) {
    $.ajax({
      url: `http://localhost:3000/products/${this.id}`,
      type: "DELETE",
      success: res => {
        console.log(res);
        populate();
      },
      error: () => {
        alert("Error occurred while deleting product");
      }
    });
  };
}

function updateProduct() {
  requestData = {
    id: $("#id").val(),
    product: $("#product").val(),
    origin: $("#origin").val(),
    best_before_date: formatDate($("#best_before_date").val()),
    amount: $("#amount").val(),
    image: $("#image").val()
  }
  $.ajax({
    url: "http://localhost:3000/products/",
    type: "PUT",
    data: JSON.stringify(requestData),
    contentType: "application/json",
    success: res => {
      console.log(res);
      populate();
    },
    error: () => {
      alert("Error occurred while updating product");
    }
  });
}