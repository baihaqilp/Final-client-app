$(document).ready(function () {
  $(".card-task").on("click", function () {
    $(this).removeClass("new-task");
  });

  $.ajax({
    url: "/api/classroom/trainee",
    method: "GET",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      let class_id = res.id;
      console.log(class_id);
      var program = `
      <p>${res.program.name}</p>
      `;
      var class_sum = `
          <p>${res.name}</p>
        `;
      $(".program-name").append(program);
      $(".class-name").append(class_sum);
    },
  });
  let prevTotal;
  $.ajax({
    url: "/api/task/trainee",
    method: "GET",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      let total = res.length;

      // Check if there are new tasks
      if (total > prevTotal) {
        $(".card-task").addClass("new-task");
      }

      prevTotal = total;
      const doughnutChartData = {
        labels: ["Task"],
        datasets: [
          {
            data: [total],
            backgroundColor: ["#7978E9"],
          },
        ],
      };
      const doughnutCanvas = $("#taskChart")[0].getContext("2d");
      new Chart(doughnutCanvas, {
        type: "doughnut",
        data: doughnutChartData,
        options: {},
      });
    },
  });
});

// $.ajax({
//   url: "/api/classroom/trainee",
//   method: "GET",
//   dataType: "JSON",
//   beforeSend: addCsrfToken(),
//   success: (res) => {
//     let class_id = res.id;
//     console.log(class_id);
//     var class_sum = `
//       <p>${res.name}-${res.program.name}</p>
//     `;
//     $(".class-name").append(class_sum);
//     let totalTopics = 0;
//     let totalMateris = 0;
//     $.ajax({
//       url: "/api/segment/class/" + class_id,
//       method: "GET",
//       dataType: "JSON",
//       success: (res) => {
//         $.each(res, (key, e) => {
//           let segment_id = e.id;
//           // console.log(segment_id);
//           $.ajax({
//             url: "/api/segmenttopic",
//             method: "GET",
//             dataType: "JSON",
//             success: (val) => {
//               let filteredTopics = val.filter(function (e) {
//                 let segmentId = e.segment.id;
//                 return segmentId == segment_id;
//               });

//               let topics = new Set();

//               val.forEach((segmentTopic) => {
//                 if (
//                   segmentTopic.segment &&
//                   segmentTopic.segment.id === segment_id &&
//                   segmentTopic.topic &&
//                   segmentTopic.topic.id
//                 ) {
//                   topics.add(segmentTopic.topic.id);

//                   let topic_id = segmentTopic.topic.id;
//                   console.log(topic_id);
//                   $.ajax({
//                     url: "/api/materi/topic/" + topic_id,
//                     method: "GET",
//                     dataType: "JSON",
//                     success: (res) => {
//                       totalMaterials += res.length;
//                       console.log(totalMaterials);
//                     },
//                   });
//                 }
//               });
//               totalTopics += topics.size;
//               // console.log(totalTopics);
//             },
//           });
//         });
//       },
//     });
//   },
// });
