$(document).ready(function () {
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

  $;
  $("#table-trainee").DataTable({
    ajax: {
      url: "/api/employee/role/2",
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
      { data: "email" },
      { data: "phone" },
      { data: "address" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
                    <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#detailTrainee"
                    onClick="getById(${data.id})"
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#updateTrainee"
                    onClick="beforeUpdate(${data.id})"
                  >
                    Edit
                  </button>
                  <button class="btn btn-danger" onClick="deletedata(${data.id})">
                    Delete
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
    success: (res) => {
      $("#detail_trainee_id").val(res.id);
      $("#detail_trainee_name").val(res.name);
      $("#detail_trainee_email").val(res.email);
      $("#detail_trainee_phone").val(res.phone);
      $("#detail_trainee_address").val(res.address);
    },
  });
}

function create() {
  let nameVal = $("#create_trainee_name").val();
  let emailVal = $("#create_trainee_email").val();
  let phoneVal = $("#create_trainee_phone").val();
  let addressVal = $("#create_trainee_address").val();
  let usernameVal = $("#create_trainee_username").val();
  let passwordVal = $("#create_trainee_password").val();
  let classId = $("#select_classroom option:selected").val();
  Swal.fire({
    title: "Now loading",
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 5000,
    didOpen: () => {
      swal.showLoading();
    },
  });
  $.ajax({
    method: "POST",
    url: "/api/register",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      username: usernameVal,
      password: passwordVal,
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      address: addressVal,
      roleId: 2,
      classroomId: classId,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTrainee").modal("hide");
      $("#table-trainee").DataTable().ajax.reload();
      $("#create_trainee_name").val("");
      $("#create_trainee_email").val("");
      $("#create_trainee_phone").val("");
      $("#create_trainee_address").val("");
      $("#create_trainee_username").val("");
      $("#create_trainee_password").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Trainee success to create ....",
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

function beforeUpdate(id) {
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_trainee_id").val(res.id);
      $("#update_trainee_name").val(res.name);
      $("#update_trainee_email").val(res.email);
      $("#update_trainee_phone").val(res.phone);
      $("#update_trainee_address").val(res.address);
    },
  });
}

function update() {
  let nameVal = $("#update_trainee_name").val();
  let emailVal = $("#update_trainee_email").val();
  let phoneVal = $("#update_trainee_phone").val();
  let addressVal = $("#update_trainee_address").val();
  let idVal = $("#update_trainee_id").val();
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
          roleId: 1,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#addTrainee").modal("hide");
          $("#table-trainee").DataTable().ajax.reload();
          $("#create_trainee_name").val("");
          $("#create_trainee_email").val("");
          $("#create_trainee_phone").val("");
          $("#create_trainee_address").val("");
          $("#create_trainee_username").val("");
          $("#create_trainee_password").val("");
        },
      });
      Swal.fire("Updated!", "Trainee success to update...", "success");
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
          "Trainee success to delete!!!",
          "success"
        );
        $.ajax({
          method: "DELETE",
          url: "/api/employee/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            $("#table-trainee").DataTable().ajax.reload();
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
