$(document).ready(function () {
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

  $("#table-materi").DataTable({
    ajax: {
      url: "/api/materi",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "name" },
      { data: "topic.name" },
      { data: "employee.name" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <a href="/trainer/classroom/${data.id}/trainer"
            type="button"
            class="btn mx-3")"
           >
            <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
          </a>
          <a href="/trainer/trainee/classroom/${data.id}"
            type="button"
            class="btn mx-3")"
          >
          <i class="fa-solid fa-pen-to-square" style="font-size: 24px"></i>
          </a>
          </button>
          <button class="btn" onClick="deleteData(${data.id})">
            <i class="fa-solid fa-trash-can" style="font-size: 24px"></i>
          </button>
          `;
        },
      },
    ],
  });
});

function create() {
  let nameVal = $("#create_materi_name").val();
  let descVal = $("#create_materi_desc").val();
  let topikVal = $("#select_topic option:selected").val();
  let trainer_id = $("#select_trainer option:selected").val();
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
      trainerId: trainer_id,
      topicId: topikVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addMateri").hide();
      $("#table-materi").DataTable().ajax.reload();
      $("#create_materi_name").val("");
      $("#create_materi_description").val("");
      $("#select_topic").val("");
      $("#select_trainer").val("");
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
