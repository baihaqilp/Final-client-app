$(document).ready(function () {
  const ctx = $("#gradeChart")[0].getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: gradeChartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });

  $.ajax({
    url: "/api/classroom/trainee",
    method: "GET",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      let class_id = res.id;
      var class_sum = `
      <p>${res.name}-${res.program.name}</p>
      `;
      $(".class-sum").append(class_sum);
      $.ajax({
        url: "/api/segment/class/" + class_id,
        method: "GET",
        success: (e) => {
          e.forEach((x) => {
            let id = x.id;
            $.ajax({
              url: "/api/task/segment/" + id,
              method: "GET",
              success: (y) => {
                let task_sum = y.length;
                $("#task-sum").text(task_sum);
              },
            });
          });
        },
      });
    },
  });
});

const gradeChartData = {
  labels: ["Assignment 1", "Assignment 2", "Assignment 3", "Assignment 4"],
  datasets: [
    {
      label: "Grades",
      data: [80, 90, 70, 85],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};
