$(document).ready(function () {
  var currentPageUrl = window.location.href;
  $(".nav-link").removeClass("active");
  $(".nav-link").each(function () {
    var itemUrl = $(this).attr("href");

    if (currentPageUrl.indexOf(itemUrl) > -1) {
      $(".nav-link.dash").removeClass("active");
      $(".nav-link.dash").addClass("line");
      $(this).addClass("active");
      $(this).removeClass("line");
    }
  });
});
