$(document).ready(function () {
  let class_id = $("#class_id").val();
  $.ajax({
    method: "GET",
    url: "/api/program",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_program option[value = "' + val.id + '"]').length == 0) {
          $(".select_program").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });
  $.ajax({
    method: "GET",
    url: "/api/topic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_topic option[value = "' + val.id + '"]').length == 0) {
          $(".select_topic").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });
  $.ajax({
    method: "GET",
    url: "/api/classroom/" + class_id,
    dataType: "JSON",
    success: function (res) {
      $(".class-name").text(res.name);
      $("#name-class").text(res.name);
    },
  });
  $.ajax({
    url: "/api/segment/class/" + class_id + "/trainer",
    method: "GET",
    success: function (res) {
      res.forEach((segment) => {
        let segmentId = segment.id;
        $("#segment_id").val(segmentId);
        let segmentName = segment.category.name;
        let card = `
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <h4 class="segment-name">${segmentName}</h4>
              <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#addTopicSegment"
                  >
                  <i class="fa-solid fa-plus" style="color: blue;" title="add topic to this segment"></i>
                  </button>
            </div>
            <div class="card-body">
              <div class="accordion" id="accordion-${segmentId}">
              </div>
            </div>
          </div>
        `;

        $(".container").append(card);

        $.ajax({
          url: "/api/segmenttopic",
          method: "GET",
          dataType: "JSON",
          success: (topics) => {
            const filteredTopics = topics.filter(function (topic) {
              let topicSegmentId = topic.segment.id;
              return segmentId == topicSegmentId;
            });
            filteredTopics.forEach((topic) => {
              let topicId = topic.topic.id;
              let topicName = topic.topic.name;
              $.ajax({
                url: "/api/materi/topic/" + topicId,
                method: "GET",
                dataType: "JSON",
                success: (materials) => {
                  const materialsList = materials.map((material) => {
                    return `<li><a href="/trainer/materi/${material.id}"><span>${material.name}</span></a></li>`;
                  });
                  const accordionItem = `
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading-${topicId}">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse-${topicId}"
                          aria-expanded="false"
                          aria-controls="collapse-${topicId}"
                        >
                          ${topicName}
                        </button>
                      </h2>
                      <div
                        id="collapse-${topicId}"
                        class="accordion-collapse collapse"
                        aria-labelledby="heading-${topicId}"
                        data-bs-parent="#accordion-${segmentId}"
                      >
                        <div class="accordion-body">
                          <ul class="topic-materials">
                            ${materialsList.join("")}
                          </ul>
                        </div>
                      </div>
                    </div>
                  `;

                  $(`#accordion-${segmentId}`).append(accordionItem);
                },
              });
            });
          },
        });
      });
    },
  });
  $.ajax({
    url: "/api/employee/class/" + class_id,
    method: "GET",
    dataType: "JSON",
    success: (e) => {
      const get1 = e.filter(function (val) {
        if (val.user.isEnabled === true) {
          return val;
        }
      });
      $("#table-trainee").DataTable({
        data: get1,
        destroy: true,
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + 1;
            },
          },
          { data: "name" },
        ],
        searching: false,
      });
    },
  });
  $.ajax({
    url: "/api/task/trainer",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      const filterTask = data.filter((task) => {
        let classId = task.segment.classroom.id;
        return classId == class_id;
      });
      console.log(filterTask);
      $("#table-task").DataTable({
        data: filterTask,
        destroy: true,
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + 1;
            },
          },
          { data: "name" },
          { data: "deadline" },
          { data: "segment.category.name" },
        ],
        searching: false,
      });
    },
  });
});

function create() {
  let segment_id = $("#segment_id").val();
  let start_dateVal = $("#create_ts_start_date").val();
  let end_dateVal = $("#create_ts_end_date").val();
  let topicVal = $("#select_topic option:selected").val();
  $.ajax({
    method: "POST",
    url: "/api/segmenttopic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    // beforeSend: addCsrfToken(),
    data: JSON.stringify({
      segmentId: segment_id,
      topicId: topicVal,
      start_date: start_dateVal,
      end_date: end_dateVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTopic").modal("hide");
      location.reload();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
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
}

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
