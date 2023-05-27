$(document).ready(function () {
  $("#password1").keyup(function () {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if (password1 === password2) {
      $("#message").text("Passwords match!");
    } else {
      $("#message").text("Passwords do not match. Please try again.");
    }
  });
  $("#password2").keyup(function () {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if (password1 === password2) {
      $("#message").text("Passwords match!");
    } else {
      $("#message").text("Passwords do not match. Please try again.");
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/program",
    dataType: "JSON",
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('#select_program option[value = "' + val.id + '"]').length == 0) {
          $("#select_program").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });

  $("#select_program").on("change", function () {
    let programId = $("#select_program option:selected").val();
    $("#select_classroom").removeAttr("disabled");
    $.ajax({
      method: "GET",
      url: "/api/classroom/program/" + programId,
      dataType: "JSON",
      success: (res) => {
        $.each(res, function (key, val) {
          if (
            $('#select_classroom option[value = "' + val.id + '"]').length == 0
          ) {
            $("#select_classroom").append(
              `<option value = ${val.id}>${val.name}</option>`
            );
          }
        });
      },
    });
  });

  $("#select_classroom").on("change", function () {
    let classId = $("#select_classroom option:selected").val();
    $("#classroomId").val(classId);
  });
});
