$(document).ready(function () {
  $.ajax({
    url: "",
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.error(error);
    },
  });
});
