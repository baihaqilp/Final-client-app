$(document).ready(function () {
  // get all class
  $.ajax({
    url: "/api/classroom",
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let class_sum = res.length;
      $("#class_sum").text(class_sum);
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2]
      let msg = ""
      if (status == 409) {
        msg = "Topic sudah ada"
      } else {
        msg = "Something when Wrong !!!"
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      })
    }
  });

  // get all program
  $.ajax({
    url: "/api/program",
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let program_sum = res.length;
      $("#program_sum").text(program_sum);
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2]
      let msg = ""
      if (status == 409) {
        msg = "Topic sudah ada"
      } else {
        msg = "Something when Wrong !!!"
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      })
    }
  });

  // get all trainer
  $.ajax({
    url: "/api/employee/role/" + 1,
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let trainer_sum = res.length;
      $("#trainer_sum").text(trainer_sum);
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2]
      let msg = ""
      if (status == 409) {
        msg = "Topic sudah ada"
      } else {
        msg = "Something when Wrong !!!"
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      })
    }
  });

  // get all trainee
  $.ajax({
    url: "/api/employee/role/" + 2,
    method: "GET",
    dataType: "JSON",
    success: (res) => {
      let trainee_sum = res.length;
      $("#trainee_sum").text(trainee_sum);
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2]
      let msg = ""
      if (status == 409) {
        msg = "Topic sudah ada"
      } else {
        msg = "Something when Wrong !!!"
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      })
    }
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
      let status = "" + err.message[0] + err.message[1] + err.message[2]
      let msg = ""
      if (status == 409) {
        msg = "Topic sudah ada"
      } else {
        msg = "Something when Wrong !!!"
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      })
    }
  });
});
