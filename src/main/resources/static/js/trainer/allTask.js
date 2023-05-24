$(document).ready(function () {
  let trainer_id = 1;
  $.ajax({
    method: "GET",
    url: "/api/segment/trainer",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {

      $.each(res, function (key, val) {
        if ($('.select_segment option[value = "' + val.id + '"]').length == 0) {
          $(".select_segment").append(
            `<option value = ${val.id}>${val.classroom.name}---${val.id}</option>`
          );
        }
      });
    },
  });
  $("#table-task").DataTable({
    ajax: {
      url: "/api/task/trainer",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      {
        data: "name",
      },
      { data: "deadline" },
      { data: "segment.classroom.name" },
      { data: "segment.id" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
                  <a
                    class="btn"
                    href="/trainer/classroom/segment/task/detail/${data.id}"
                  >
                  <i class="fa-solid fa-up-right-from-square" style="font-size: 18px"></i>
                  </a>
                  <button
                    type="button"
                    class="btn mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#updateTask"
                    onClick="beforeUpdate(${data.id})"
                  >
                  <i class="fa-solid fa-pen-to-square" style="font-size: 18px"></i>
                  </button>
                  <button class="btn" onClick="deletedata(${data.id})">
                  <i class="fa-solid fa-trash-can" style="font-size: 18px"></i>
                  </button>
                  `;
        },
      },
    ],
  });
});

// function getById(id) {
//   $.ajax({
//     method: "GET",
//     url: "/api/task/" + id,
//     dataType: "JSON",
//     beforeSend: addCsrfToken(),
//     success: (res) => {
//       $("#detail_task_id").val(res.id);
//       $("#detail_task_name").val(res.name);
//       $("#detail_task_email").val(res.email);
//       $("#detail_task_phone").val(res.phone);
//       $("#detail_task_address").val(res.address);
//     },
//   });
// }

function create() {
  let nameVal = $("#create_task_name").val();
  let descVal = $("#create_task_desc").val();
  let deadlineVal = $("#create_task_deadline").val();
  let segmentVal = $("#select_segment option:selected").val();
  $.ajax({
    method: "POST",
    url: "/api/task",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      desc: descVal,
      deadline: deadlineVal,
      segmentId: segmentVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTask").modal("hide");
      location.reload();
      // $("#table-task").DataTable().ajax.reload();
      $("#create_task_name").val("");
      $("#create_task_desc").val("");
      $("#create_task_deadline").val("");
      $("#create_task_deadline").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
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
}

function beforeUpdate(id) {
  $.ajax({
    method: "GET",
    url: "/api/task/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_id").val(res.id);
      $("#update_task_name").val(res.name);
      $("#update_task_desc").val(res.desc);
      $("#update_task_deadline").val(res.deadline);
      $("#update_segment").val(res.segment.id);
      console.log(res.deadline);
    },
  });
}

function update() {
  let nameVal = $("#update_task_name").val();
  let descVal = $("#update_task_desc").val();
  let deadlineVal = $("#update_task_deadline").val();
  let segmentVal = $("#update_segment").val();
  let idVal = $("#update_id").val();
  console.log(nameVal, descVal, deadlineVal, segmentVal, idVal);
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
        url: "/api/task/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          desc: descVal,
          deadline: deadlineVal,
          segmentId: segmentVal,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateTask").modal("hide");
          // $("#table-task").DataTable().ajax.reload();
          location.reload();
          $("#update_id").val("");
          $("#update_task_name").val("");
          $("#update_task_desc").val("");
          $("#update_task_deadline").val("");
          $("#update_program").val("");
        },
      });
      Swal.fire("Updated!", "Task success to update...", "success");
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        "Cancelled",
        "Your imaginary file is safe :)",
        "error"
      );
    }
  });
}

function deletedata(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "ms-3 btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  console.log(id);
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Region success to delete!!!",
          "success"
        );
        $.ajax({
          method: "DELETE",
          url: "/api/task/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            // location.reload();
            $("#table-task").DataTable().ajax.reload();
          },
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
}
