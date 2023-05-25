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
    method: "GET",
    url: "/api/segment/trainer",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      let class_sum = res.length;
      $("#class_sum").text(class_sum);
    },
  });

  $.ajax({
    method: "GET",
    url: "/api/materi",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      let materi_sum = res.length;
      $("#materi_sum").text(materi_sum);
    },
  });

  $.ajax({
    method: "GET",
    url: "/api/task",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      const filteredTask = res.filter(function (data) {
        let trainerId = data.segment.trainer.id;
        return trainerId == trainer_id;
      });
      let task_sum = filteredTask.length;
      $("#task_sum").text(task_sum);
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
