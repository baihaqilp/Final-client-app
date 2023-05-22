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
    url: "/api/",
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
