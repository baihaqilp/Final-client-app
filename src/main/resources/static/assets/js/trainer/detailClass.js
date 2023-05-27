$(document).ready(function () {
  let class_id = $("#class_id").val();
  $.ajax({
    method: "GET",
    url: "/api/classroom/" + class_id,
    dataType: "JSON",
    success: function (res) {
      $(".class-name").text(res.name);
    },
  });
  $.ajax({
    url: "/api/segment/class/" + class_id + "/trainer",
    method: "GET",
    success: function (res) {
      res.forEach((val) => {
        let segmentId = res.id;
        console.log(val);
      });
    },
  });
});

// $.ajax({
//   method: "GET",
//   url: "/api/classroom/" + class_id,
//   dataType: "JSON",
//   success: function (res) {
//     $(".class-name").text(res.name);
//   },
// });
// const segmentCardsContainer = $(".segment-cards-container");
// $.ajax({
//   url: "/api/segment/class/" + class_id + "/trainer",
//   method: "GET",
//   success: function (res) {
//     res.forEach(function (segment, index) {
//       //segment card elements
//       const segmentCard = $("<div>").addClass("card mb-3");
//       const cardBody = $("<div>").addClass("card-body");
//       const segmentTitle = $("<h5>")
//         .addClass("card-title")
//         .text(segment.category.name);

//       //Lessons
//       const lessonsContainer = $("<div>").addClass(
//         "container border-bottom mb-3"
//       );
//       const lessonsCardBody = $("<div>").addClass(
//         "card-body d-flex justify-content-between align-items-center"
//       );
//       const lessonsTitle = $("<h5>").addClass("card-title").text("Topic");

//       const lessonsAnchor = $("<a>")
//         .attr("href", "/trainer/topic/segment/" + segment.id) //end point materi
//         .addClass("btn")
//         .html(
//           '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
//         );

//       lessonsCardBody.append(lessonsTitle, lessonsAnchor);
//       lessonsContainer.append(lessonsCardBody);

//       //Tasks
//       const tasksContainer = $("<div>").addClass(
//         "container border-bottom mb-3"
//       );
//       const tasksCardBody = $("<div>").addClass(
//         "card-body d-flex justify-content-between align-items-center"
//       );
//       const tasksTitle = $("<h5>").addClass("card-title").text("Tasks");
//       const tasksAnchor = $("<a>")
//         .attr("href", "/trainer/task/segment/" + segment.id) //end point task
//         .addClass("btn")
//         .html(
//           '<i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>'
//         );

//       tasksCardBody.append(tasksTitle, tasksAnchor);
//       tasksContainer.append(tasksCardBody);

//       cardBody.append(segmentTitle, lessonsContainer, tasksContainer);
//       segmentCard.append(cardBody);

//       segmentCardsContainer.append(segmentCard);
//     });
//   },
// });
