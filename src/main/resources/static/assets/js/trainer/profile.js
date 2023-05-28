$(document).ready(function () {
  $.ajax({
    url: "/api/employee/profile",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      $("#update-id").val(data.id);
      $("#class-id").val(data.classroom.id);
      $(".user-name").text(data.name);
      $("#first-name-icon").val(data.name);
      $("#email-id-icon").val(data.email);
      $("#mobile-id-icon").val(data.phone);
      $("#address-id-icon").val(data.address);
      $("#username-id-icon").val(data.user.username);
      $("#password-id-icon").val(data.user.password);
      data.user.roles.forEach((role) => {
        $("#role-id").val(role.id);
      });
    },
  });

  $("#edit-profile").click(function () {
    $(".edit-profile").removeAttr("readonly");
    $("#update-profile").show();
    $("#button").removeAttr("hidden");
    $(".edit-password").prop("readonly", true);
    $("#update-password").prop("hidden", true);
    $("#submit-btn").attr("onclick", "updateProfile()");
  });

  $("#edit-password").click(function () {
    $("#update-password").removeAttr("hidden");
    $(".edit-password").removeAttr("readonly");
    $("#button").removeAttr("hidden");
    $(".edit-profile").prop("readonly", true);
    $("#submit-btn").attr("onclick", "updatePassword()");
  });
});

function updateProfile() {
  let idVal = $("#update-id").val();
  let classId = $("#class-id").val();
  let roleId = $("#role-id").val();
  let nameVal = $("#first-name-icon").val();
  let emailVal = $("#email-id-icon").val();
  let mobile = $("#mobile-id-icon").val();
  let addressVal = $("#address-id-icon").val();
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
        dataType: "JSON",
        url: "/api/employee/" + idVal,
        method: "PUT",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          id: idVal,
          classroomId: classId,
          roleId: roleId,
          name: nameVal,
          email: emailVal,
          phone: mobile,
          address: addressVal,
        }),
        contentType: "application/json",
        success: (res) => {},
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
      Swal.fire("Updated!", "Profile success to update...", "success");
    }
  });
}

function updatePassword() {
  var old = $("#password-id-icon").val();
  var newPass = $("#new-pass-1").val();
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
        url: "/api/user/changepassword",
        method: "POST",
        dataType: "JSON",
        data: JSON.stringify({
          passwordOld: old,
          passwordNew: newPass,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateSegment").modal("hide");
          $("#table-segment").DataTable().ajax.reload();
          $("#update_start_date").val("");
          $("#update_end_date").val("");
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
      Swal.fire("Updated!", "Password success to update...", "success");
    }
  });
}
