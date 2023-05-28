$(document).ready(function () {
  let segment_id = $("#segment_id").val();
  $.ajax({
    method: "GET",
    url: "/api/task/segment/" + segment_id,
    dataType: "JSON",
    success: function (res) {
      res.forEach(function (data) {
        var body = `
          <div class="container border-bottom mb-3">
           <div
            class="card-body d-flex justify-content-between align-items-center"
            >
            <h5 class="card-title pb-2">${data.name}</h5>
              <div class="task-container">
                  <h6>Deadline</h6>
                  <p>${data.deadline}</p>
              </div>
              <button
                  type="button"
                  class="btn"
                 data-bs-toggle="modal"
                 data-bs-target="#detailTask"
                 onclick="getById(${data.id})"
                >
                <i
                    class="fa-solid fa-up-right-from-square"
                  style="font-size: 24px"
                ></i>
              </button>
            </div>
          </div>
          `;
        $(".task-content").append(body);
      });
    },
  });
});

function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/task/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#detail_task_id").val(res.id);
      $("#detail_task_name").text(res.name);
      $("#detail_task_desc").text(res.desc);
      $(".detail_task_desc").html(function (index, html) {
        return "<p>" + html.trim().replace(/(\n)+/g, "</p><p>") + "</p>";
      });

      $("#detail_task_deadline").text(res.deadline);
      $("#detail_task_deadline_ipt").val(res.deadline);
      $("#detail_task_segment").text(res.segment.id);
    },
  });
}

function submission() {
  let taskID = $("#detail_task_id").val();
  let deadline = $("#detail_task_deadline_ipt").val();

  let deadlineArr = deadline.split(" ");
  let deadlineTgl = deadlineArr[0].split("-");
  let deadlineTime = deadlineArr[1].split(":");
  let newDeadline = new Date(
    deadlineTgl[2],
    deadlineTgl[1] - 1,
    deadlineTgl[0],
    deadlineTime[0],
    deadlineTime[1]
  );
  let today = new Date();
  if (today > newDeadline) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Tida bisa Submit Karena Sudah Lewat Deadline",
      showConfirmButton: false,
      timer: 1500,
    });
    $("#detailTask").modal("hide");
  } else {
    window.location.href = "/trainee/task/" + taskID + "/submission-add";
  }
}
