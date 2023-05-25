$(document).ready(function () {
  let trainer_id = $("#trainer_id").val();
  console.log(trainer_id);
  $.ajax({
    url: "/api/segment/trainer",
    method: "GET",
    dataType: "JSON",
    success: function (response) {
      let segments = response.length;
      let uniqueClassrooms = new Set();

      response.forEach((data) => {
        if (
          data.trainer &&
          data.trainer.classroom &&
          data.trainer.classroom.id
        ) {
          uniqueClassrooms.add(data.trainer.classroom.id);
        }
      });

      let classes = uniqueClassrooms.size;

      const doughnutChartData = {
        labels: ["Classes", "Segments"],
        datasets: [
          {
            data: [classes, segments],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      };
      const doughnutCanvas = $("#doughnutChart")[0].getContext("2d");
      new Chart(doughnutCanvas, {
        type: "doughnut",
        data: doughnutChartData,
        options: {},
      });
    },
  });

  $.ajax({
    url: "/api/materi",
    method: "GET",
    dataType: "JSON",
    success: function (response) {
      let materi = response.length;
      let theTopic = new Set();

      response.forEach((data) => {
        if (data.topic && data.topic.id) {
          theTopic.add(data.topic.id);
        }
      });

      let topic = theTopic.size;

      const doughnutChartData = {
        labels: ["Materi", "Topic"],
        datasets: [
          {
            data: [materi, topic],
            backgroundColor: ["#7978E9", "#F3797E"],
          },
        ],
      };
      const doughnutCanvas = $("#materiChart")[0].getContext("2d");
      new Chart(doughnutCanvas, {
        type: "doughnut",
        data: doughnutChartData,
        options: {},
      });
    },
  });

  $.ajax({
    url: "/api/task/trainer",
    method: "GET",
    dataType: "JSON",
    success: function (response) {
      let tasks = response.length;
      let submissions = 0;
      let ajaxRequests = [];
      response.forEach((task) => {
        let taskId = task.id;
        let ajaxRequest = $.ajax({
          url: "/api/submission/task/" + taskId,
          method: "GET",
          dataType: "JSON",
        });
        ajaxRequests.push(ajaxRequest);
      });
      $.when(...ajaxRequests).done(function (...responses) {
        responses.forEach((response) => {
          let res = response[0];
          submissions += res.length;
        });
        const doughnutChartData = {
          labels: ["Task", "Submission"],
          datasets: [
            {
              data: [tasks, submissions],
              backgroundColor: ["#7DA0FA", "#4B49AC"],
            },
          ],
        };
        const doughnutCanvas = $("#taskChart")[0].getContext("2d");
        new Chart(doughnutCanvas, {
          type: "doughnut",
          data: doughnutChartData,
          options: {},
        });
      });
    },
  });

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
