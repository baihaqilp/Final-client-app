$(document).ready(function () {
  let class_id = $("#class_id").val();

  $.ajax({
    url: "/api/employee/class/" + class_id,
    method: "GET",
    success: function (response) {
      // console.log(response);
      // Loop through the card data and generate cards dynamically
      response.forEach(function (cardData) {
        console.log(cardData);
        if (cardData.user.roles) {
          let isTrainer = false;
          cardData.user.roles.forEach(function (role) {
            if (role.name === "trainer") {
              isTrainer = true;
              return;
            }
          });
          if (!isTrainer) {
            // Generate the card and append it
            var card = `
            <div class="card mb-3">
              <div class="card-body">
                <div class="container border-bottom mb-3">
                  <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="lesson-container-left">
                      <h5 class="card-title">${cardData.name}</h5>
                      <div class="lesson-content">
                        <p class="card-text">${cardData.classroom.program.name}</p>
                      </div>
                    </div>
                    <div class="lesson-container-right">
                       <a href="/Trainer/trainee-detail" class="btn">
                          <i
                            class="fa-regular fa-note-sticky"
                            style="font-size: 28px"
                          ></i>
                        </a>
                        <a href="/Trainer/trainee-detail" class="btn"
                           ><i
                             class="fa-solid fa-up-right-from-square"
                            style="font-size: 24px"
                          ></i
                        ></a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          `;
            $(".trainee-cards-container").append(card);
          }
        }
      });
    },
  });
});
