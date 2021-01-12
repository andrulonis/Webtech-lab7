const months = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

const parseDate = (str) => {
  let split = str.split(" ");
  let month = months.indexOf(split[0]);
  let year = split[1];

  let date = new Date(year, month);
  return date;
}

const formatDate = (date) => {
  // date format: yyyy-mm-dd
  let split = date.split("-");
  let year = parseInt(split[0]);
  let month = parseInt(split[1]) - 1;

  return months[month] + " " + year;
}