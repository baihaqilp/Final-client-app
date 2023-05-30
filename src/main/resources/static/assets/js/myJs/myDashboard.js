$(document).ready(function () {
  $.ajax({
    url: "/api/segment/all",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      let total = data.length;

      const currentDate = new Date();
      let totalEnd = 0;

      data.forEach(function (segment) {
        const endDateParts = segment.end_date.split("-");
        const segmentEndDate = new Date(
          parseInt(endDateParts[2]), // year
          parseInt(endDateParts[1]) - 1, // month
          parseInt(endDateParts[0]) // day
        );

        if (segmentEndDate < currentDate) {
          totalEnd++;
        }
      });
      $("#segment-count").text(total);
      $("#complete-count").text(totalEnd);

      const segmentActive = data.filter(function (val) {
        const endDateParts = val.end_date.split("-");
        const segmentEnd = new Date(
          parseInt(endDateParts[2]), // year
          parseInt(endDateParts[1]) - 1, // month
          parseInt(endDateParts[0]) // day
        );
        return segmentEnd > currentDate;
      });
      console.log(segmentActive.length);
      $("#counter-class").text(segmentActive.length);

      var classes = {};

      $.each(data, function (index, segment) {
        var endDateParts = segment.end_date.split("-");
        var endDate = new Date(
          endDateParts[2],
          endDateParts[1] - 1,
          endDateParts[0]
        );
        var now = new Date();
        if (endDate > now) {
          if (segment.classroom.isStatus) {
            var className = segment.classroom.name;

            if (classes.hasOwnProperty(className)) {
              classes[className]++;
            } else {
              classes[className] = 1;
            }
          }
        } else {
          return null;
        }
      });

      $.each(classes, function (className, employeeCount) {
        console.log(
          "Class: " + className + ", Total Employees: " + employeeCount
        );
        var card = `
          <div class="card border">
            <div class="card-header">
              <h6 class="text-muted">${className}</h6>
            </div>
            <div class="card-body">
               <h6 class="sum-trainee">trainee(s): ${employeeCount} </h6>
             </div>
            </div>
        `;
        $(".trainee-card").append(card);
      });
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
