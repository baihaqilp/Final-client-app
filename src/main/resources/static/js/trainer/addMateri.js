$(document).ready(function () {
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
});

function create() {
  let nameVal = $("#create_materi_name").val();
  let descVal = $("#create_materi_description").val();
  let topikVal = $("#select_topik option:selected").val();

  console.log(nameVal, descVal, topikVal);
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
    }),
    contentType: "application/json",
    success: (res) => {
      $("#create_materi_name").val("");
      $("#create_materi_description").val("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}
