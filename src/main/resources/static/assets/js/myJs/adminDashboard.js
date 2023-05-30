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

function test() {
  return JSON.parse(
    $.ajax({
      url: "/api/segment",
      method: "GET",
      dataType: "JSON",
      global: false,
      async: false,
      success: function (data) {
        return data;
      },
    }).responseText
  );
}

document.addEventListener("DOMContentLoaded", function () {
  let datas = test();
  let events = [];
  $.each(datas, function (key, val) {
    let start = val.start_date.split("-");
    let end = val.end_date.split("-");
    events.push({
      title: val.classroom.name + "--" + val.category.name,
      start: start[2] + "-" + start[1] + "-" + start[0],
      end: end[2] + "-" + end[1] + "-" + end[0],
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });
  });

  var calendarEl = document.querySelector("#calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    themeSystem: 'bootstrap5',
    eventColor: "sky",
    events: events,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
  });

  calendar.render();
});
