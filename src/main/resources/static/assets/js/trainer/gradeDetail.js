$(document).ready(function () {
  let classId = $("#class-id").val();
  console.log(classId);
  $.ajax({
    url: "/api/grade/classroom/" + classId,
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      console.log(data);
      data.forEach((val) => {
        $("#class-name").text(val.trainee.classroom.name);
      });
      $("#table-grade").DataTable({
        data: data,
        destroy: true,
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + 1;
            },
          },
          {
            data: "trainee.name",
          },
          { data: "segment.category.name" },
          { data: "name" },
          { data: "average" },
          { data: "status" },
        ],
      });
    },
  });
});
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
