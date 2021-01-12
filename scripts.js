$(document).ready(() => {
  $.tablesorter.addParser({
    id: "dates",
    is: (s, table, cell, $cell) => {
      return false
    },
    format: (s, table, cell, cellIndex) => {
      if (cell.parentNode.className != "row-input") {
        let split = s.split(" ");
        let month = months.indexOf(split[0]);
        let year = split[1];

        return new Date(year, month).getTime();
      }

      return s;
    },
    type: "numeric"
  })

  sortTable()
  populate()
  addReset()
  formSub()
})

const sortTable = () => {
    $("table").tablesorter({
        sortInitialOrder: "asc",
        headers: {
            ".no-sort": { sorter: false }
        }
    })
}

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

function addReset() {
    $(".btn-reset").click(resetTable);
}

const resetTable = () => {
    let isConfirmed = true
        confirm("Are you sure you want to reset the database?")

    if (isConfirmed) {
        $.ajax({
        url: "https://wt.ops.labs.vu.nl/api21/e502cf1e/reset",
        type: "GET",
        success: (res) => {
            console.log(res)
            populate();
        },
        error: (res) => console.log(res)
        })
    } 
}

function formSub() {
    const form = document.querySelector("form");
    form.addEventListener("submit", event => {
        event.preventDefault();
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
            success: function(res) {
                console.log("Submission successful")
                console.log(res)
                populate();
            },
            error: function(res) {
                console.log("Error in submission")
                console.log(res)
            }
        })
    })
}