$(document).ready(function () {
  let class_id = $("#class_id").val();
  let trainer_id = $("#trainer_id").val();
  console.log(class_id, trainer_id);
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
    url: "/api/segment/class/" + class_id + "/trainer",
    method: "GET",
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
        const lessonsTitle = $("<h5>").addClass("card-title").text("Topic");
        // const lessonsText = $("<p>").addClass("card-text");

        const lessonsAnchor = $("<a>")
          .attr("href", "/trainer/topic/segment/" + segment.id) //end point materi
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
          .attr("href", "/trainer/task/segment/" + segment.id) //end point task
          .addClass("btn")
          .html(
            '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
          );

        // tasksCardBody.append(tasksTitle, tasksText, tasksAnchor);
        tasksCardBody.append(tasksTitle, tasksAnchor);
        tasksContainer.append(tasksCardBody);

        //Trainee
        // const traineeContainer = $("<div>").addClass("container mb-3");
        // const traineeCardBody = $("<div>").addClass(
        //   "card-body d-flex justify-content-between align-items-center"
        // );
        // const traineeTtitle = $("<h5>")
        //   .addClass("card-title")
        //   .text("Submission");
        // // const submissionText = $("<p>")
        // //   .addClass("card-text")
        // //   .text("Submission disini");
        // const traineeAnchor = $("<a>")
        //   .attr("href", "/Trainer/calssroom/segment/trainee") //end point submission
        //   .addClass("btn")
        //   .html(
        //     '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
        //   );

        // traineeCardBody.append(traineeContainer, traineeAnchor);
        // traineeContainer.append(traineeCardBody);

        cardBody.append(segmentTitle, lessonsContainer, tasksContainer);
        segmentCard.append(cardBody);

        segmentCardsContainer.append(segmentCard);
      });
    },
  });
});
