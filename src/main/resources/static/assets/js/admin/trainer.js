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

  $("#table-trainer").DataTable({
    ajax: {
      url: "/api/employee/role/1",
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
          return `<div class="dropdown">
              <button class="btn btn-primary dropdown-toggle me-1" type="button"
                  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Action
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="dropwdown-item">
                <button
                    type="button"
                    class="btn btn-outline-primary col-12"
                    data-bs-toggle="modal"
                    data-bs-target="#detailTrainer"
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
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#detail_trainer_id").val(res.id);
      $("#detail_trainer_name").val(res.name);
      $("#detail_trainer_email").val(res.email);
      $("#detail_trainer_phone").val(res.phone);
      $("#detail_trainer_address").val(res.address);
    },
  });
}

function create() {
  let nameVal = $("#create_trainer_name").val();
  let emailVal = $("#create_trainer_email").val();
  let phoneVal = $("#create_trainer_phone").val();
  let addressVal = $("#create_trainer_address").val();
  let usernameVal = $("#create_trainer_username").val();
  let passwordVal = $("#create_trainer_password").val();

  $.ajax({
    method: "POST",
    url: "/api/user",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      username: usernameVal,
      password: passwordVal,
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      address: addressVal,
      roleId: 1,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTrainer").modal("hide");
      $("#table-trainer").DataTable().ajax.reload();
      $("#create_trainer_name").val("");
      $("#create_trainer_email").val("");
      $("#create_trainer_phone").val("");
      $("#create_trainer_address").val("");
      $("#create_trainer_username").val("");
      $("#create_trainer_password").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Trainer success to creat ....",
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

function beforeUpdateRole(id) {
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_trainer_id").val(res.id);
      $("#update_trainer_name").val(res.name);
      $("#update_trainer_email").val(res.email);
      $("#update_trainer_phone").val(res.phone);
      $("#update_trainer_address").val(res.address);
      $("#update_trainer_username").val(res.user.username);
      $("#update_trainer_password").val(res.user.password);
    },
  });
}

function update() {
  let nameVal = $("#update_trainer_name").val();
  let emailVal = $("#update_trainer_email").val();
  let phoneVal = $("#update_trainer_phone").val();
  let addressVal = $("#update_trainer_address").val();
  let usernameVal = $("#update_trainer_username").val();
  let passwordVal = $("#update_trainer_password").val();
  let idVal = $("#update_trainer_id").val();
  console.log(usernameVal);
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
          username: usernameVal,
          password: passwordVal,
          name: nameVal,
          email: emailVal,
          phone: phoneVal,
          address: addressVal,
          roleId: 1
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateTrainer").modal("hide");
          $("#table-trainer").DataTable().ajax.reload();
          $("#update_trainer_id").val("");
          $("#update_trainer_name").val("");
          $("#update_trainer_email").val("");
          $("#update_trainer_phone").val("");
          $("#update_trainer_address").val("");
          $("#update_trainer_username").val("");
          $("#update_trainer_password").val("");
          Swal.fire("Updated!", "Trainer success to update...", "success");
        },
        error: (e) => {

          Swal.fire("Not Updated!", "Trainer Failed to update...", "error");
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
          "Trainer success to delete!!!",
          "success"
        );
        $.ajax({
          method: "DELETE",
          url: "/api/employee/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            $("#table-trainer").DataTable().ajax.reload();
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
          $("#table-trainer").DataTable().ajax.reload();
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
          $("#table-trainer").DataTable().ajax.reload();
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
