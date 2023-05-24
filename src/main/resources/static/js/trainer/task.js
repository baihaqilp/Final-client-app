$(document).ready(function () {
  let segmentId = $("#segment_id").val();

  $("#table-task").DataTable({
    ajax: {
      url: "/api/task/segment/" + segmentId,
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
      { data: "desc" },
      { data: "deadline" },
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

function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#detail_task_id").val(res.id);
      $("#detail_task_name").val(res.name);
      $("#detail_task_email").val(res.email);
      $("#detail_task_phone").val(res.phone);
      $("#detail_task_address").val(res.address);
    },
  });
}

function create() {
  let nameVal = $("#create_task_name").val();
  let descVal = $("#create_task_desc").val();
  let deadlineVal = $("#create_task_deadline").val();
  let segmentVal = $("#segment_id").val();
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
      $("#table-task").DataTable().ajax.reload();
      $("#create_task_name").val("");
      $("#create_task_desc").val("");
      $("#create_task_deadline").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Region success to creat ....",
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
    url: "/api/employee/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_task_id").val(res.id);
      $("#update_task_name").val(res.name);
      $("#update_task_email").val(res.email);
      $("#update_task_phone").val(res.phone);
      $("#update_task_address").val(res.address);
    },
  });
}

function update() {
  let nameVal = $("#update_task_name").val();
  let emailVal = $("#update_task_email").val();
  let phoneVal = $("#update_task_phone").val();
  let addressVal = $("#update_task_address").val();
  let idVal = $("#update_task_id").val();
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
        url: "/api/employee/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          email: emailVal,
          phone: phoneVal,
          address: addressVal,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateTask").modal("hide");
          $("#table-task").DataTable().ajax.reload();
          $("#update_task_id").val("");
          $("#update_task_name").val("");
          $("#update_task_email").val("");
          $("#update_task_phone").val("");
          $("#update_task_address").val("");
          $("#update_task_username").val("");
          $("#updatee_task_password").val("");
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
          url: "/api/employee/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
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
