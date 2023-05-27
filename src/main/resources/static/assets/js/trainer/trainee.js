$(document).ready(function () {
  let class_id = $("#class_id").val();

  $("#table-trainee").DataTable({
    ajax: {
      url: "/api/employee/class/" + class_id,
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
      { data: "phone" },
      { data: "classroom.program.name" },
      {
        data: null,
        render: function (data, type, row, meta) {
          if (data.user.isEnabled) {
            return `<div class="btn btn-success">Active</div`
          } else {
            return `<div class="btn btn-danger">Non Active</div`
          }
        },
      },
    ],
  });
});
