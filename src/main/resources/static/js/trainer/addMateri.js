$(document).ready(function () {
  $("#create_materi_description").summernote();
  $.ajax({
    method: "GET",
    url: "/api/topic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_topik option[value = "' + val.id + '"]').length == 0) {
          $(".select_topik").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });
  $.ajax({
    method: "GET",
    url: "/api/employee/role/" + 1,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_trainer option[value = "' + val.id + '"]').length == 0) {
          $(".select_trainer").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });
});

function create() {
  let nameVal = $("#create_materi_name").val();
  let descVal = $("#create_materi_description").val();
  let topikVal = $("#select_topik option:selected").val();
  let trainer_id = $("#select_trainer option:selected").val();

  $.ajax({
    url: "/api/materi",
    method: "POST",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    // beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      desc: descVal,
      topicId: topikVal,
      trainerId: trainer_id,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#create_materi_name").val("");
      $("#create_materi_description").summernote();
      $("#select_topik ").val("");
      $("#select_trainer ").val("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class success to creat ....",
        showConfirmButton: false,
        timer: 1500,
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
}
