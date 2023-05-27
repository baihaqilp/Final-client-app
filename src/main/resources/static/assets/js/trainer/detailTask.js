$(document).ready(function () {
  let id = $("#id").val();
  let task_desc = $("#task_desc").val();
  $("#summer").html(task_desc);
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
    method: "POST",
    url: "/api/evaluation",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      nilai: nilaiVal,
      submission_id: submissionVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#evaluate").modal("hide");

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
