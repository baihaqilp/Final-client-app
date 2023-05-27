$(document).ready(function () {
  const cardContent = $(".card-content");
  let class_id = $("#class_id");
  $.ajax({
    url: "/api/segment/class/" + class_id,
    method: "GET",
    success: function (response) {
      response.forEach(function (segment) {
        const segmentCard = $("<div>").addClass("card mb-3");
        const cardBody = $("<div>").addClass("card-body");

        const segmentTitle = $("<h5>")
          .addClass("card-title pb-2")
          .text(segment.classroom.program.name);
        const classTitle = $("<h5>")
          .addClass("card-title")
          .text(segment.classroom.name);

        const dateContainer = $("<div>").addClass(
          "container border-bottom mb-3"
        );
        const dateCardBody = $("<div>").addClass(
          "card-body d-flex justify-content-between align-items-center"
        );
        const startDateTitle = $("<h5>")
          .addClass("card-title")
          .text("Start Date");
        const startDateText = $("<p>")
          .addClass("card-text")
          .text(segment.start_date);
        const endDateTitle = $("<h5>").addClass("card-title").text("End Date");
        const endDateText = $("<p>")
          .addClass("card-text")
          .text(segment.end_date);

        // Append the elements to the HTML structure
        dateCardBody.append(startDateTitle, startDateText);
        dateCardBody.append(endDateTitle, endDateText);
        dateContainer.append(dateCardBody);
        cardBody.append(segmentTitle, classTitle, dateContainer);
        segmentCard.append(cardBody);
        cardContent.append(segmentCard);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
});
