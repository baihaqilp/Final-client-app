$(document).ready(function () {
  const ctx = $("#traineeChart")[0].getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: gradeChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%", // Adjust the size of the doughnut hole
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
});

const gradeChartData = {
  labels: ["Assignment 1", "Assignment 2", "Assignment 3", "Assignment 4"],
  datasets: [
    {
      label: "Grades",
      data: [80, 90, 70, 85],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 205, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
