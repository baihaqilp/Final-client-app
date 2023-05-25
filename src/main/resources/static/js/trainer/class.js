$(document).ready(function () {
  // $.ajax({
  //   url: "/api/segment/trainer/" + 2,
  //   method: "GET",
  //   dataType: "JSON",
  //   success: (res) => {
  //     $.each(res);
  //   },
  // });
  $("#table-class").DataTable({
    ajax: {
      url: "/api/segment/trainer",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "classroom.name" },
      { data: "classroom.program.name" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <a href="/trainer/classroom/${data.classroom.id}/trainer"
          type="button"
          class="btn mx-3")"
        >
        <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
        </a>
        <a href="/trainer/trainee/classroom/${data.classroom.id}"
        type="button"
        class="btn mx-3")"
      >
      <i
        class="fa-solid fa-user-graduate px-2"
        style="font-size: 36px; color: #7978e9"
      ></i>
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
