$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/role",
    dataType: "JSON",
    success: (res) => {
      let radio = "";
      $.each(res, function (key, val) {
        radio += `
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="role_trainee_role" value="${val.id}">
          <label class="form-check-label" for="inlineRadio1" >${val.name}</label>
        </div>

        `
      });
      $(".radio_status").html(radio)
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
    $("#select_classroom").empty();
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
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle me-1" type="button"
                  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Action
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="dropwdown-item">
                <button
                    type="button"
                    class="btn col-12 btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#detailTrainee"
                    onClick="getById(${data.id})"
                  >
                    Detail
                  </button>
              </div>
              <div class="dropwdown-item mt-2">
                  <button
                  type="button"
                  class="btn btn-outline-warning col-12 "
                  data-bs-toggle="modal"
                  data-bs-target="#changeRole"
                  onClick="beforeRoleChange(${data.id})"
                >
                  Change Role
                </button>
              </div>
              <div class="dropwdown-item mt-2 col-12 ">
                  <button class="btn btn-outline-danger col-12 " onClick="deletedata(${data.id})">
                  Delete
                </button>
              </div>
              </div>
          </div>
                    
                  
                  
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
  let passwordVal = Math.random().toString(36).slice(-8);
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

function beforeStatusChange(id) {
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    success: (res) => {
      console.log(res.name);
      $("#status_trainee_id").val(res.id);
      $("#status_trainee_name").val(res.name);
      $("input[value='" + res.user.isEnabled + "']").prop('checked', true);
      console.log(res.user.isEnabled);
    },
  });
}

function beforeRoleChange(id) {
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    success: (res) => {
      console.log(res.name);
      $("#role_trainee_id").val(res.id);
      $("#role_trainee_name").val(res.name);
      $("input[value='" + res.user.roles[0].id + "']").prop('checked', true);
    },
  });

}

function updateRole() {
  let idVal = $("#role_trainee_id").val();
  let role = $("input[name='role_trainee_role']:checked").val();
  console.log(idVal, role);
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
        method: "POST",
        url: "/api/user/changeRole",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          id: idVal,
          roleId: role,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#changeRole").modal("hide");
          $("#table-trainee").DataTable().ajax.reload();
          $("#role_trainee_name").val("");
          $("#role_trainee_id").val("");
          Swal.fire("Updated!", "Trainee success to update...", "success");
        },

      });

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWith.fire(
        "Cancelled",
        "Your imaginary file is safe :)",
        "error"
      );
    }
  });
}

function updateStatus() {
  let idVal = $("#status_trainee_id").val();
  let status = $("input[name='status']:checked").val();
  let ids = parseInt(idVal)
  let stat = null
  if (status == "true") {
    stat = true
  } else {
    stat = false
  }

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
        method: "POST",
        url: "/api/user/changeStatus",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          id: idVal,
          status: stat,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#changeStatus").modal("hide");
          $("#table-trainee").DataTable().ajax.reload();
          $("#status_trainee_name").val("");
          $("#status_trainee_id").val("");
          $("#status_id").val("");
        },
      });
      Swal.fire("Updated!", "Trainee success to update...", "success");
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swal.fire(
        "Cancelled",
        "Your imaginary file is safe :)",
        "error"
      );
    }
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
          $("#changeRole").modal("hide");
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
