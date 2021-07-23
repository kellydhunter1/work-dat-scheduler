const currentDate = moment().format("dddd, MMMM Do YYYY");
const currentTime = moment().format("h:mm a");

// display current day and time in header
$("#currentDate").append(currentDate);
$("#currentTime").append(currentTime);

// time converted into moments.js timing


