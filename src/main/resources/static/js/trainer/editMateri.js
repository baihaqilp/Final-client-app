$(document).ready(function () {
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

  let materi_id = $("#materi_id").val();
  $.ajax({
    method: "GET",
    url: "/api/materi/" + materi_id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#update_id").val(res.id);
      $("#update_materi_name").val(res.name);
      $("#update_materi_desc").summernote("code", res.desc);
      // $("#update_materi_desc").val(res.desc);
      $("#update_topic").val(res.topic.id);
      $("#trainer_id").val(res.employee.id);
    },
  });
});

function update() {
  let nameVal = $("#update_materi_name").val();
  let idVal = $("#update_id").val();
  let descVal = $("#update_materi_desc").val();
  let topikVal = $("#update_topic option:selected").val();
  let trainerId = $("#trainer_id").val();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "PUT",
        url: "/api/materi/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          desc: descVal,
          topicId: topikVal,
          trainerId: trainerId,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#update_id").val(res.id);
          $("#update_materi_name").val(res.name);
          $("#update_materi_desc").val(res.desc);
          $("#update_topic").val(res.topic.id);
          $("#trainer_id").val(res.employee.id);
        },
      });
      Swal.fire("Updated!", "Materi success to update...", "success");
    }
  });
}
