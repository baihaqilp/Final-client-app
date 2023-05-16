$(document).ready(function () {
  $("#password2").keyup(function () {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if (password1 === password2) {
      $("#message").text("Passwords match!");
    } else {
      $("#message").text("Passwords do not match. Please try again.");
    }
  });
  $("#password1").keyup(function () {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if (password1 === password2) {
      $("#message").text("Passwords match!");
    } else {
      $("#message").text("Passwords do not match. Please try again.");
    }
  });
});
