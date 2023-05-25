$(document).ready(function () {
  // get all class
  $.ajax({
    url: "/api/classroom",
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let classes = res.length;
      const doughnutChartData = {
        labels: ["Classes"],
        datasets: [
          {
            data: [classes],
            backgroundColor: ["rgba(255, 99, 132, 0.6)"],
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

    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
      } else {
        msg = "Something when Wrong !!!";
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      });
    },
  });

  // get all program
  $.ajax({
    url: "/api/program",
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let program_sum = res.length;
      const doughnutChartData = {
        labels: ["Program"],
        datasets: [
          {
            data: [program_sum],
            backgroundColor: ["#98BDFF"],
          },
        ],
      };
      const doughnutCanvas = $("#progChart")[0].getContext("2d");
      new Chart(doughnutCanvas, {
        type: "doughnut",
        data: doughnutChartData,
        options: {},
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
      } else {
        msg = "Something when Wrong !!!";
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      });
    },
  });

  // get all trainer
  $.ajax({
    url: "/api/employee/role/" + 1,
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let trainer_sum = res.length;
      const doughnutChartData = {
        labels: ["Trainer"],
        datasets: [
          {
            data: [trainer_sum],
            backgroundColor: ["#7DA0FA"],
          },
        ],
      };
      const doughnutCanvas = $("#trainerChart")[0].getContext("2d");
      new Chart(doughnutCanvas, {
        type: "doughnut",
        data: doughnutChartData,
        options: {},
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
      } else {
        msg = "Something when Wrong !!!";
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      });
    },
  });

  // get all trainee
  $.ajax({
    url: "/api/employee/role/" + 2,
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let trainee_sum = res.length;
      const doughnutChartData = {
        labels: ["Trainee"],
        datasets: [
          {
            data: [trainee_sum],
            backgroundColor: ["#7978E9"],
          },
        ],
      };
      const doughnutCanvas = $("#traineeChart")[0].getContext("2d");
      new Chart(doughnutCanvas, {
        type: "doughnut",
        data: doughnutChartData,
        options: {},
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
      } else {
        msg = "Something when Wrong !!!";
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      });
    },
  });

  $.ajax({
    url: "/api/classroom",
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let classes = res.length;
      $.ajax({
        url: "/api/program",
        method: "GET",
        dataType: "JSON",
        success: (res) => {
          let program_sum = res.length;
          $.ajax({
            url: "/api/employee/role/" + 1,
            method: "GET",
            dataType: "JSON",
            success: (res) => {
              let trainer_sum = res.length;
              $.ajax({
                url: "/api/employee/role/" + 2,
                method: "GET",
                dataType: "JSON",
                success: (res) => {
                  let trainee_sum = res.length;
                  const polar = {
                    labels: ["Classroom", "Program", "Trainer", "Trainee"],
                    datasets: [
                      {
                        data: [classes, program_sum, trainer_sum, trainee_sum],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.6)",
                          "#98BDFF",
                          "#7DA0FA",
                          "#7978E9",
                        ],
                      },
                    ],
                  };
                  const polarCanvas = $("#allChart")[0].getContext("2d");
                  new Chart(polarCanvas, {
                    type: "polarArea",
                    data: polar,
                    options: {},
                  });
                },
              });
            },
          });
        },
      });
    },
  });

  // get all segment
  $.ajax({
    url: "/api/segment",
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let segment_sum = res.length;
      $("#segment_sum").text(segment_sum);
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
      } else {
        msg = "Something when Wrong !!!";
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      });
    },
  });
});
