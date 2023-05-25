$(document).ready(function () {
  let segment_id = $("#segment_id").val();
  $.ajax({
    url: "/api/segmenttopic",
    method: "GET",
    success: function (response) {
      $(".segment-cards-container").empty();
      response.forEach(function (cardData) {
        let segmentId = cardData.segment.id;
        if (segmentId == segment_id) {
          var head = `
            <h5 class="card-title mt-2" style="font-size: 24px">
              Topik Segment ${cardData.segment.id}
            </h5>
          `;
          var card = `
          <div class="card mb-3">
            <div class="card-body">
              <div class="container border-bottom mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div class="lesson-container-left">
                    <h5 class="card-title">${cardData.topic.name}</h5>
                    <div class="lesson-content">
                      <p class="card-text">${cardData.topic.program.name}</p>
                    </div>
                  </div>
                  <div class="lesson-container-right">
                    <a href="" class="btn">
                      <i class="fa-solid fa-pen-to-square" style="font-size: 28px"></i>
                    </a>
                    <a href="/trainer/materi/topic/${cardData.topic.id}" class="btn">
                      <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
          $(".topic-card-title").append(head);
          $(".segment-cards-container").append(card);
        } else {
        }
      });
    },
  });
});
