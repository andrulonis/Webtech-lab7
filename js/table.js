// TODO: Use tablesorter from the web

$(document).ready(() => {
  $("th").click(e => {
    let $table = $(e.target).parent().parent().parent()[0]; // th > tr > tbody > $table
    let isFormChild = $table.parentNode.nodeName == "FORM";
    
    let rows = [];

    // Substract input rows if the table is inside a form
    let rowSubstraction = isFormChild ? 2 : 0;

    for (let i = 1; i < $table.rows.length - rowSubstraction; i++) {
      let row = $table.getElementsByTagName("tr")[i];
      rows.push(row);
    }

    let $columnIndex = $(e.target).index();
  
    for (let i = 0; i < rows.length - 1; i++) {
      for (let j = 0; j < rows.length - i - 1; j++) {
        var val = rows[j].getElementsByTagName("td")[$columnIndex].innerText;
        var nextVal = rows[j+1].getElementsByTagName("td")[$columnIndex].innerText;

        // Convert strings to numbers
        if (!isNaN(parseInt(val))) {
          val = parseInt(val);
          nextVal = parseInt(nextVal);
        }
        else if (true) {
          //need date REPAIR THIS SHIT TODO: FIXME: ALL TAGS
          // Get index of date row
        }
        else {
          val = val.toLowerCase();
          nextVal = nextVal.toLowerCase();

        }


        // Swap values
        if (val > nextVal) {
          let temp = rows[j];
          rows[j] = rows[j+1];
          rows[j+1] = temp;
        }
      }
    }

    // Replace values
    let tempRows = rows;
    rows.forEach((el) => el.remove());

    let tbody = $table.getElementsByTagName("tbody")[0];
    let headerRow = tbody.childNodes[1];

    for (let i = 0; i < tempRows.length; i++) {
      $(tempRows[i]).insertBefore(headerRow);
    }
  })
})