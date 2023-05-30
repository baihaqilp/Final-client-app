$(document).ready(function () {
  $.ajax({
    url: "/api/employee/profile",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      $("#update-id").val(data.id);
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
    $("#button").removeAttr("hidden");
    // $("#submit-btn").click(updateProfile);
  });

  // $("#edit-password").click(function () {
  //   $("#update-password").removeAttr("hidden");
  //   $(".edit-password").removeAttr("readonly");
  //   $("#button").removeAttr("hidden");
  //   $(".edit-profile").prop("readonly", true);
  //   $("#submit-btn").click(updatePassword);
  // });

  $("#new-pass-1").keyup(function () {
    var pass1 = $("#new-pass-1").val();
    var pass2 = $("#new-pass-2").val();

    if (pass1 === pass2) {
      $("#message").text("Passwords match!");
    } else {
      $("#message").text("Passwords do not match. Please try again.");
    }
  });
  $("#new-pass-2").keyup(function () {
    var pass1 = $("#new-pass-1").val();
    var pass2 = $("#new-pass-2").val();

    if (pass1 === pass2) {
      $("#new-pass-2").removeClass("is-invalid");
      $("#new-pass-2").addClass("is-valid");
      $("#message").text("Passwords match!");
    } else {
      $("#new-pass-2").removeClass("is-valid");
      $("#new-pass-2").addClass("is-invalid");
      $("#message").text("Passwords do not match. Please try again.");
    }
  });
});

function updateProfile() {
  let idVal = $("#update-id").val();
  let roleId = $("#role-id").val();
  let nameVal = $("#first-name-icon").val();
  let emailVal = $("#email-id-icon").val();
  let mobile = $("#mobile-id-icon").val();
  let addressVal = $("#address-id-icon").val();
  let usernameVal = $("#username-id-icon").val();
  let passVal = $("#password-id-icon").val();
  Swal.fire({
    title: "Are you sure to update your profile?",
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
          roleId: roleId,
          name: nameVal,
          email: emailVal,
          phone: mobile,
          address: addressVal,
          username: usernameVal,
          password: passVal,
        }),
        contentType: "application/json",
        success: (res) => {},
        error: function (xhr, textStatus, errorThrown) {
          let err = JSON.parse(xhr.responseText);
          let status = "" + err.message[0] + err.message[1] + err.message[2];
          let msg = "";
          if (status == 409) {
            msg = "Error";
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
  let old = $("#old-pass").val();
  let newPass = $("#new-pass-2").val();
  console.log(old, newPass);
  Swal.fire({
    title: "Are you sure to update your password?",
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
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          passwordOld: old,
          passwordNew: newPass,
        }),
        contentType: "application/json",
        success: (res) => {
          // $.ajax({
          //   url: "/logout",
          //   method: "POST",
          //   success: () => {
          //     window.location.href = "/login";
          //   },
          //   error: (xhr, textStatus, errorThrown) => {
          //     console.log("Logout error:", textStatus);
          //   },
          // });
          Swal.fire({
            icon: "success",
            title: "BERHASIL",
            text: "BERHASIL GANTI PASSWORD",
          });
        },
        error: function (xhr, textStatus, errorThrown) {
          let err = JSON.parse(xhr.responseText);
          let status = "" + err.message[0] + err.message[1] + err.message[2];
          let msg = "";
          if (status == 409) {
            msg = "Error";
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
