$(document).ready(function () {
  $("#create_materi_description").summernote({
    height: 300,
  });
  $.ajax({
    method: "GET",
    url: "/api/topic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_topic option[value = "' + val.id + '"]').length == 0) {
          $(".select_topic").append(
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
  let descVal = $("#create_materi_description").summernote("code");
  let topikVal = $("#select_topic option:selected").val();

  console.log(nameVal, topikVal);
  $.ajax({
    url: "/api/materi",
    method: "POST",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      desc: descVal,
      topicId: topikVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#create_materi_name").val("");
      $("#create_materi_description").summernote("option", "height", 300);
      $("#select_topik ").val("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.replace("/trainer/topic");
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Materi sudah ada";
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
