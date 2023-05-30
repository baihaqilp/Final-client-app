$(document).ready(function () {
  $("#create_task_desc").summernote({ height: 200 });
  $.ajax({
    method: "GET",
    url: "/api/segment/all",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_segment option[value = "' + val.id + '"]').length == 0) {
          $(".select_segment").append(
            `<option value = ${val.id}>${val.classroom.name}---${val.category.name}</option>`
          );
        }
      });
    },
  });

  $("#table-task").DataTable({
    ajax: {
      url: "/api/task/trainer",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      {
        data: "name",
      },
      { data: "deadline" },
      { data: "segment.classroom.name" },
      { data: "segment.category.name" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle me-1" type="button"
                  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Action
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="dropwdown-item">
                <a href="#sub" class="btn btn-outline-primary col-12" onclick="moveToSubTab(${data.id})">
                Submission
                </a>
              </div>
              <div class="dropwdown-item mt-2">
              <button
                type="button"
                class="btn btn-outline-info col-12"
                data-bs-toggle="modal"
                data-bs-target="#detailTask"
                onClick="getById(${data.id})"
              >
                Detail
              </button>
              <div class="dropwdown-item mt-2">
                <button
                  type="button"
                  class="btn btn-outline-warning col-12"
                  data-bs-toggle="modal"
                  data-bs-target="#updateTask"
                  onClick="beforeUpdate(${data.id})"
                >
                  Edit
              </button>
              </div>
              <div class="dropwdown-item mt-2">
                
                <button class="btn btn-outline-danger col-12" onClick="deletedata(${data.id})">
                  Delete
                </button>
              </div>
              </div>
          </div>
        
          `;
        },
      },
    ],
  });
});

// get submission by task id
function moveToSubTab(id) {
  $("#task").removeClass("show active");
  $("#sub").addClass("show active");
  $("#task-tab").removeClass("active");
  $("#sub-tab").addClass("active");
  $("#sub-tab").removeAttr("hidden");
  $("#table-submission").DataTable({
    ajax: {
      url: "/api/submission/task/" + id,
      dataSrc: "",
    },
    destroy: true,
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "employee.name" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
            <a href="${data.submission_url}"
            type="button"
            class="btn btn-success mx-3")"
          >
          <i class="fa-solid fa-file-arrow-down">
          <span class="file" style="display: none;">${data.submission_file}</span></i>
          </a>
            `;
        },
      },
      { data: "submission_date" },
      {
        data: null,
        render: function (data, type, row, meta) {
          if (data.evaluation != null) {
            return data.evaluation.nilai;
          }
          return data.evaluation;
        },
      },
      {
        data: null,
        render: function (data, type, row, meta) {
          if (data.evaluation != null) {
            return data.evaluation.trainer.name;
          }
          return data.evaluation;
        },
      },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
                        <button
                            id="eval"
                            type="button"
                            class="btn mx-3"
                            data-bs-toggle="modal"
                            data-bs-target="#evaluate"
                            onclick="beforeEval(${data.id})"
                            style="background-color: white; border-color: #4b49ac; color: #4b49ac"
                        >
                            Eval
                        </button>
                            `;
        },
      },
    ],
  });
}
function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/task/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      console.log(res);
      $("#detail_task_id").text(res.id);
      $("#detail_task_name").text(res.name);
      $("#detail_task_desc").text(res.desc);
      $("#detail_task_deadline").text(res.deadline);
      $("#detail_segment_id").text(res.segment.category.name);
    },
  });
}

function create() {
  let nameVal = $("#create_task_name").val();
  let descVal = $("#create_task_desc").val();
  let deadlineVal = $("#create_task_deadline").val();
  let segmentVal = $("#select_segment option:selected").val();
  $.ajax({
    method: "POST",
    url: "/api/task",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      desc: descVal,
      deadline: deadlineVal,
      segmentId: segmentVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTask").modal("hide");
      // $("#table-task").DataTable().ajax.reload();
      location.reload();
      $("#create_task_name").val("");
      $("#create_task_desc").val("");
      $("#create_task_deadline").val("");
      $("#create_task_deadline").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      let err = JSON.parse(xhr.responseText);
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Task sudah ada";
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

function beforeUpdate(id) {
  $.ajax({
    method: "GET",
    url: "/api/task/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_id").val(res.id);
      $("#update_task_name").val(res.name);
      $("#update_task_desc").val(res.desc);
      let deadline = res.deadline;
      let deadlineArr = deadline.split(" ");
      let deadlineTgl = deadlineArr[0].split("-");
      let deadlineTime = deadlineArr[1].split(":");

      $("#update_task_deadline").val(
        deadlineTgl[2] +
          "-" +
          deadlineTgl[1] +
          "-" +
          deadlineTgl[0] +
          "T" +
          deadlineTime[0] +
          ":" +
          deadlineTime[1]
      );
      $("#update_segment").val(res.segment.id);
      $("#update_task_desc").summernote({ height: 300 });
    },
  });
}

function update() {
  let nameVal = $("#update_task_name").val();
  let descVal = $("#update_task_desc").val();
  let deadlineVal = $("#update_task_deadline").val();
  let segmentVal = $("#update_segment").val();
  let idVal = $("#update_id").val();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "PUT",
        url: "/api/task/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          desc: descVal,
          deadline: deadlineVal,
          segmentId: segmentVal,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateTask").modal("hide");
          // $("#table-task").DataTable().reload();
          location.reload();
          $("#update_id").val("");
          $("#update_task_name").val("");
          $("#update_task_desc").val("");
          $("#update_task_deadline").val("");
          $("#update_program").val("");
        },
      });
      Swal.fire("Updated!", "Task success to update...", "success");
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        "Cancelled",
        "Your imaginary file is safe :)",
        "error"
      );
    }
  });
}

function deletedata(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "ms-3 btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Region success to delete!!!",
          "success"
        );
        $.ajax({
          method: "DELETE",
          url: "/api/task/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            // location.reload();
            $("#table-task").DataTable().ajax.reload();
          },
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
}

function beforeEval(id) {
  $("#eval_submission").val(id);
}

function beforeEvalDetail(id) {
  $("#eval_submission").val(id);
}

function eval() {
  let nilaiVal = $("#eval_nilai").val();
  let submissionVal = $("#eval_submission").val();
  $.ajax({
    method: "PUT",
    url: "/api/evaluation/" + submissionVal,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      nilai: nilaiVal,
      submission_id: submissionVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $(".modal").modal("hide");
      $("#table-submission").DataTable().ajax.reload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Evaluation success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}
