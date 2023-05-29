$(document).ready(function () {
  $.ajax({
    url: "/api/employee/role/1",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      $("#trainer-count").text(data.length);
    },
  });

  $.ajax({
    url: "/api/employee/role/2",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      $("#trainee-count").text(data.length);
    },
  });

  $.ajax({
    url: "/api/classroom",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      $("#class-count").text(data.length);
    },
  });

  $.ajax({
    url: "/api/classroom/noactive",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      $("#classno-count").text(data.length);
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.querySelector("#calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    eventColor: "sky",

    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
  });

  calendar.render();
});
