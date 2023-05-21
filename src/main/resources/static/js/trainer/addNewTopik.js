$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/program",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_program option[value = "' + val.id + '"]').length == 0) {
          $(".select_program").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });
});

function create() {
  let nameVal = $("#create_topik_name").val();
  let programVal = $("#select_program option:selected").val();
  $.ajax({
    method: "POST",
    url: "/api/topic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    // beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      programId: programVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTopik").modal("hide");
      $("#select_topic").val("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Topic success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}
