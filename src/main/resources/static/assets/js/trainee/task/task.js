$(document).ready(function () {
  let today = new Date();
  $.ajax({
    method: "GET",
    url: "/api/task/trainee",
    dataType: "JSON",
    success: function (res) {
      let i = 1;
      let bg = "";
      let stringDeadline = "";
      let deadlineDate = "";
      res.forEach(function (data) {
        let deadlineArr = data.deadline.split(" ");
        let deadlineTgl = deadlineArr[0].split("-");
        let deadlineTime = deadlineArr[1].split(":");
        let newDeadline = new Date(
          deadlineTgl[2],
          deadlineTgl[1] - 1,
          deadlineTgl[0],
          deadlineTime[0],
          deadlineTime[1]
        );
        console.log(newDeadline, "asdasdas");
        if (today > newDeadline) {
          bg = "bg-danger text-white";
        } else {
          bg = "bg-info text-dark";
        }
        var body = `
          <div class="col-4 my-3">
            <div class="card ">
              <div class="card-header ${bg} ">Task Name&nbsp;:&nbsp;${data.name}</div>
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
        i++;
        if (i == 4) {
          i = 1;
        }
      });
    },
  });
});
