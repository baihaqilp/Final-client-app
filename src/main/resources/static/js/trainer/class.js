$(document).ready(function () {
  $("#table-class").DataTable({
    ajax: {
      url: "/api/classroom",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "name" },
      { data: "program.name" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <button
          type="button"
          class="btn mx-3"
          data-bs-toggle="modal"
          data-bs-target="#detailClass"
          onClick="getById(${data.id})"
        >
        <i
          class="fa-solid fa-up-right-from-square"
          style="font-size: 24px"
        ></i>
        </button>`;
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
