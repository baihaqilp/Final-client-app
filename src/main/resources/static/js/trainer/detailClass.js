$(document).ready(function () {
  var token = $("meta[name='_csrf']").attr("content");
  var header = $("meta[name='_csrf_header']").attr("content");

  let class_id = $("#class_id").val();

  $.ajax({
    method: "GET",
    url: "/api/classroom/" + class_id,
    dataType: "JSON",
    success: function (res) {
      const classNameTitle = $("<h5>")
        .addClass("card-title mt-2")
        .css("font-size", "48px")
        .text(res.name);
      $(".card-title.mt-2").replaceWith(classNameTitle);
    },
  });
  const segmentCardsContainer = $(".segment-cards-container");
  $.ajax({
    url: "/api/segment/class/" + class_id,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    success: function (res) {
      res.forEach(function (segment, index) {
        //segment card elements
        const segmentCard = $("<div>").addClass("card mb-3");
        const cardBody = $("<div>").addClass("card-body");
        const segmentTitle = $("<h5>")
          .addClass("card-title")
          .text("Segment " + (index + 1));
        // const classNameTitle = $("<h5>").addClass("card-title").text();

        //Lessons
        const lessonsContainer = $("<div>").addClass(
          "container border-bottom mb-3"
        );
        const lessonsCardBody = $("<div>").addClass(
          "card-body d-flex justify-content-between align-items-center"
        );
        const lessonsTitle = $("<h5>").addClass("card-title").text("Lessons");
        // const lessonsText = $("<p>").addClass("card-text");

        const lessonsAnchor = $("<a>")
          .attr("href", "/Trainer/classroom/segment/" + segment.id) //end point materi
          .addClass("btn")
          .html(
            '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
          );

        // lessonsCardBody.append(lessonsTitle, lessonsText, lessonsAnchor);
        lessonsCardBody.append(lessonsTitle, lessonsAnchor);
        lessonsContainer.append(lessonsCardBody);

        //Tasks
        const tasksContainer = $("<div>").addClass(
          "container border-bottom mb-3"
        );
        const tasksCardBody = $("<div>").addClass(
          "card-body d-flex justify-content-between align-items-center"
        );
        const tasksTitle = $("<h5>").addClass("card-title").text("Tasks");
        // const tasksText = $("<p>").addClass("card-text").text("Task disini");
        const tasksAnchor = $("<a>")
          .attr("href", "/Trainer/classroom/segment/task") //end point task
          .addClass("btn")
          .html(
            '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
          );

        // tasksCardBody.append(tasksTitle, tasksText, tasksAnchor);
        tasksCardBody.append(tasksTitle, tasksAnchor);
        tasksContainer.append(tasksCardBody);

        //Submission
        const submissionContainer = $("<div>").addClass("container mb-3");
        const submissionCardBody = $("<div>").addClass(
          "card-body d-flex justify-content-between align-items-center"
        );
        const submissionTitle = $("<h5>")
          .addClass("card-title")
          .text("Submission");
        // const submissionText = $("<p>")
        //   .addClass("card-text")
        //   .text("Submission disini");
        const submissionAnchor = $("<a>")
          .attr("href", "/Trainer/calssroom/segment/submission") //end point submission
          .addClass("btn")
          .html(
            '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
          );

        submissionCardBody.append(submissionTitle, submissionAnchor);
        submissionContainer.append(submissionCardBody);

        cardBody.append(
          segmentTitle,
          lessonsContainer,
          tasksContainer,
          submissionContainer
        );
        segmentCard.append(cardBody);

        segmentCardsContainer.append(segmentCard);
      });
    },
  });
});
