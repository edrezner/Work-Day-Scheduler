// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//Code is wrapped using $(dociment).ready() to ensure the code runs on full load/render.
$(document).ready(function workScheduler () {
  var dayJs = dayjs();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  /* This function saves the input from the text field; 'this' is used in reference to the 
  save button. The key in local storage is set to match the div id, and the value is the string
  that occupies the text input field with class 'description'. These elements are selected using
  the parent() and siblings() methods. */ 
  var saveBtn = $('.saveBtn');
  saveBtn.click(function () {
    var hourId = $(this).parent().attr('id');
    var scheduleEntryData = $(this).siblings('.description').val();    
    localStorage.setItem(hourId, scheduleEntryData);
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  /* This function dynamically updates the classes to past, present, or future depending on the hour associated
  with the div element. This is done by converting the 24 hour format from Day.js into a number, taking the div id
  'hour-x' and using the split method at the hyphen to create two arrays with the number (currently a string) occupying the second index.
  That string is also converted to a number using the Number constructor so it can be compared against the current Day.js hour using conditional
  statements.*/ 
  var hourDay = Number(dayJs.format('H'));
  $('div[id*="hour-"]').each(function applyClasses() {
    var id = $(this).attr('id');
    var hour = Number(id.split('-').pop());
    
    if (hour < hourDay) {
      $(this).removeClass('present future');
      $(this).addClass('past');
    }

    if (hour === hourDay) {
      $(this).removeClass('past future');
      $(this).addClass('present');
    }

    if (hour > hourDay) {
      $(this).removeClass('past present');
      $(this).addClass('future');
    }
  });
  
  
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Grabs the current values in local storage and applies them to their corresponding text box matched by div id.
  $('div[id*="hour-"]').each(function applyLocalStorage() {
    var id = $(this).attr('id');
    var scheduleText = localStorage.getItem(id);
    $(this).children('.description').val(scheduleText);
  });

  // TODO: Add code to display the current date in the header of the page.

  // This uses Day.js day/month/numbered day to apply the current day to the header.
  var day = dayJs.format('dddd, MMMM D');
  $('#currentDay').text(day);
});



