$(document).ready(function () {
  let deadline = $("#task_deadline").val();
  let stringDeadline =
    new Date(deadline).getFullYear() +
    " " +
    new Date(deadline).getMonth() +
    " " +
    new Date(deadline).getDate() +
    " " +
    new Date(deadline).getHours() +
    ":" +
    new Date(deadline).getMinutes();
  let deadlineDate = new Date(Date.parse(stringDeadline));

  let stringDetail =
    new Date(deadline).getDate() +
    "-" +
    new Date(deadline).getMonth() +
    "-" +
    new Date(deadline).getFullYear() +
    " " +
    new Date(deadline).getHours() +
    ":" +
    new Date(deadline).getMinutes();
  let taskDetail = new Date(stringDetail);
  $("#taskDetail").html(stringDetail);

  let now = new Date();

  let stringDeadline2 =
    new Date(now).getFullYear() +
    " " +
    new Date(now).getMonth() +
    " " +
    new Date(now).getDate() +
    " " +
    new Date(now).getHours() +
    ":" +
    new Date(now).getMinutes();
  let deadlineDate2 = new Date(Date.parse(stringDeadline2));

  if (deadlineDate2 > deadlineDate) {
    console.log(deadlineDate2);
    $(".fileSub").prop("disabled", true);
    $("#fileSub").html("Already passed the deadline");
    $("#fileSub").removeClass("btn btn-outline-primary btn-sm ");
    $("#fileSub").addClass("btn btn-sm btn-danger");
  } else {
    $(".fileSub").prop("disabled", false);
    $("#fileSub").html("Submit");
    $("#fileSub").removeClass("btn btn-sm btn-danger");
    $("#fileSub").addClass("btn btn-outline-primary btn-sm");
  }
});
