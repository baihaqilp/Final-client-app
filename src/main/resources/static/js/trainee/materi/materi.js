$(document).ready(function () {
  let materi_id = $("#materi_id").val();
  console.log(materi_id);
  $.ajax({
    url: "/api/materi/" + materi_id,
    method: "GET",
    success: function (response) {
      console.log(response);
      var head = `
           <h5 class="card-title mt-2" style="font-size: 24px">
             ${response.name}
           </h5>
          `;
      $(".materi-card-title").append(head);
      var body = `
      <div class="lesson-content">
        <p class="card-text">${response.desc}</p>
      </div>
      `;
      $(".materi-card-content").append(body);
      $(".materi-card-content .lesson-content").html(function (index, html) {
        return "<p>" + html.trim().replace(/(\n)+/g, "</p><p>") + "</p>";
      });
    },
  });
});
