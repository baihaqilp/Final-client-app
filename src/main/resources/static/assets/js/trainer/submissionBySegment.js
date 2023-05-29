$(document).ready(function () {
  let segment_id = $("#segment_id").val();

  $.ajax({
    url: "/api/segmentmateri/segment/" + segment_id,
    method: "GET",
    success: function (response) {
      console.log(response);
      response.forEach(function (cardData) {
        console.log(typeof cardData.materi.id);
        var card = `
          <div class="card mb-3">
            <div class="card-body">
              <div class="container border-bottom mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div class="lesson-container-left">
                    <h5 class="card-title">${cardData.materi.topic.name}</h5>
                    <div class="lesson-content">
                      <p class="card-text">${cardData.materi.name}</p>
                    </div>
                  </div>
                  <div class="lesson-container-right">
                    <a href="/trainer/classroom/segment/materi/${cardData.materi.id}" class="btn">
                      <i class="fa-solid fa-pen-to-square" style="font-size: 28px"></i>
                    </a>
                    <a href="#" class="btn">
                      <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        $(".segment-cards-container").append(card);
      });
    },
  });
});
