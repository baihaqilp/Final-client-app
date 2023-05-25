$(document).ready(function () {
  let segment_id = $("#segment_id").val();

  $.ajax({
    method: "GET",
    url: "/api/segmenttopic",
    dataType: "JSON",
    success: function (res) {
      res.forEach(function (data) {
        let segmentId = data.segment.id;
        if (segmentId == segment_id) {
          let topic_id = data.topic.id;
          $.ajax({
            method: "GET",
            url: "/api/materi/topic/" + topic_id,
            dataType: "JSON",
            success: (res) => {
              var topicCard = $(`
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-title">Topic: ${data.topic.name}</h5>
                    <div class="materi-body"></div>
                  </div>
                </div>
              `);
              res.forEach((e) => {
                var materiCard = $(`
                  <div class="container border-bottom mb-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                      <h5 class="card-title">${e.name}</h5>
                      <a href="/trainee/topic/materi/${e.id}" class="btn">
                        <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
                      </a>
                    </div>
                  </div>
                `);
                topicCard.find(".materi-body").append(materiCard);
              });
              $(".topic-content").append(topicCard);
            },
          });
        }
      });
    },
  });
});
