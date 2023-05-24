$(document).ready(function () {
  let id = $("#id").val();
  $("#table-submission").DataTable({
    ajax: {
      url: "/api/submission/task/" + id,
      dataSrc: "",
    },
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
            ${data.submission_file}
          </a>
            `;
        },
      },
      { data: "submission_date" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <button
            type="button"
            class="btn mx-3"
            data-bs-toggle="modal"
            data-bs-target="#evaluate"
            onclick="beforeEval(${meta.row})"
            style="background-color: white; border-color: #4b49ac; color: #4b49ac"
          >
            Eval
          </a>
            `;
        },
      },
    ],
  });
});

function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/classroom/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#detail_class_id").val(res.id);
      $("#detail_class_name").val(res.name);
      $("#detail_program_name").val(res.program.name);
    },
  });
}

function beforeEval(rowIdx) {
  let table = $("#table-submission").DataTable();
  let rowData = table.row(rowIdx).data();

  let trainerId = rowData.task.segment.trainer.id;
  let trainee = rowData.employee.name;
  let submissionId = rowData.id;
  console.log(trainerId, trainee, submissionId);
  $("#eval_trainer_id").val(trainerId);
  $("#eval_trainee_name").val(trainee);
  $("#eval_submission").val(submissionId);
}

function eval() {
  let trainerId = $("#eval_trainer_id").val();
  let nilaiVal = $("#eval_nilai").val();
  let submissionVal = $("#eval_submission").val();
  console.log(trainerId, nilaiVal, submissionVal);
  $.ajax({
    method: "POST",
    url: "/api/evaluation",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      nilai: nilaiVal,
      submission_id: submissionVal,
      trainer_id: trainerId,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#evaluate").modal("hide");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Region success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}
