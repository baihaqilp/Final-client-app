$(document).ready(function () {
  $.ajax({
    url: "/api/classroom/trainee",
    method: "GET",
    success: function (response) {
      let class_id = response.id;
      var cardHead = `
        <h5 class="card-title mt-2" style="font-size: 48px">${response.name} - ${response.program.name}</h5>
        `;
      $(".class-title").append(cardHead);
      $.ajax({
        url: "/api/segment/class/" + class_id,
        method: "GET",
        success: function (res) {
          res.forEach((data) => {
            console.log(data);
            var cardBody = `
          <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title pb-2">${data.category.name}</h5>

            <!-- Segment: Trainers -->
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Trainer</h5>
                <p class="card-text">${data.trainer.name}</p>
              </div>
            </div>

            <!-- Segment: Study Materials -->
            <div class="card mb-3">
              <div
                class="card-body d-flex justify-content-between align-items-center"
              >
                <div class="lesson-container">
                  <h5 class="card-title">Topic</h5>
                  <!-- topik dan materi -->
                </div>
                <a href="/trainee/topic/${data.id}" class="btn"
                  ><i
                    class="fa-solid fa-up-right-from-square"
                    style="font-size: 24px"
                  ></i
                ></a>
              </div>
            </div>
            <div class="card mb-3">
              <div
                class="card-body d-flex justify-content-between align-items-center"
              >
                <div class="task-container">
                  <h5 class="card-title">Tasks</h5>
                </div>
                <a href="/trainee/task/segment/${data.id}" class="btn"
                  ><i
                    class="fa-solid fa-up-right-from-square"
                    style="font-size: 24px"
                  ></i
                ></a>
              </div>
            </div>
          </div>
          <div
          class="card-footer d-flex align-items-center justify-content-around bg-white"
          >
            <p class="fs-7">Start Date: ${data.start_date}</p>
            <p class="fs-7">End Date: ${data.end_date}</p>
          </div>
        </div>
          `;
            $(".class-body").append(cardBody);
          });
        },
      });
    },
  });
});
