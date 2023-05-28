$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/task/trainee",
    dataType: "JSON",
    success: function (res) {
      res.forEach(function (data) {
        var body = `
        <div class="col">
          <div class="card">
            <div class="card-header">Task Name&nbsp;:&nbsp;${data.name}</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <div class="task-container">
                        <h6>Segment</h6>
                        <p>${data.segment.id}</p>
                      </div>
                    </div>
                    <div class="col">
                      <div class="task-container">
                        <h6>Deadline</h6>
                        <strong><p>${data.deadline}</p></strong>
                      </div>
                    </div>
                  </div>
                  <div class="task-container my-1">
                      <h6>Trainer</h6>
                      <p>${data.segment.trainer.name}</p>
                  </div>
                  <div class="d-grid gap-2">
                    <a href="/trainee/task/${data.id}/submission-add" class="btn btn-outline-info btn-sm rounded">
                    Detail Task
                    </a>
                  </div>
                </div>
            </div>
          </div>
      </div>
        `;
        $(".task-content").append(body);
      });
    },
  });
});
$("#task_deadline").on("load", function () {
  let deadline = $("#task_deadline").val();

  let today = new Date();
  console.log(deadline);
});
