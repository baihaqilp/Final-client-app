$(document).ready(function () {
  $.ajax({
    url: "/api/segment/all",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      console.log(data);
      const classCardContainer = $("#grade-card");
      const cardsPerRow = 4;
      let currentRow;
      const currentDate = new Date();
      const segmentActive = data.filter(function (val) {
        const endDateParts = val.end_date.split("-");
        const segmentEnd = new Date(
          parseInt(endDateParts[2]), // year
          parseInt(endDateParts[1]) - 1, // month
          parseInt(endDateParts[0]) // day
        );
        return segmentEnd > currentDate;
      });
      segmentActive.forEach((e, index) => {
        if (index % cardsPerRow === 0) {
          currentRow = $("<div class='row'></div>");
          classCardContainer.append(currentRow);
        }

        var card = `
            <div class="col-3">
              <a href="/trainer/grade/${e.classroom.id}">
              <div class="class-card border border-2 card  " id="card-${index}">
                <div class="card-header">
                  <h5>${e.classroom.name}</h5>
                  <h6>${e.classroom.program.name}</h6>
                  <p>Click for detail</p>
                </div>
                <div class="card-body text-muted"></div>
              </div>
              </a>
            </div>
          `;
        currentRow.append(card);
        var gradientCard = $(`#card-${index}`);
        gradientCard.css(
          "background",
          `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`
        );
      });
      // data.forEach((data) => {
      //   let classId = data.classroom.id;
      //   $.ajax({
      //     url: "/api/grade/classroom/" + classId,
      //     method: "GET",
      //     dataType: "JSON",
      //     success: (data) => {
      //       // console.log(data);
      //       data.forEach((val) => {
      //         console.log(val);
      //       });
      //     },
      //   });
      // });
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
// $("#table-grade").DataTable({
//     ajax: {
//         url: "/api/segment/trainer",
//         dataSrc: "",
//     },
//     columns: [
//         {
//             data: null,
//             render: function (data, type, row, meta) {
//                 return meta.row + 1;
//             },
//         },
//         { data: "classroom.name" },
//         { data: "classroom.program.name" },
//         {
//             data: null,
//             render: function (data, type, row, meta) {
//                 if (data.classroom.isStatus) {
//                     return `<button
//           type="button"
//           class="btn btn-success "
//         >
//           Active
//         </button>`
//                 } else {
//                     return `<button
//           type="button"
//           class="btn btn-secondary "
//         >
//           Non Active
//         </button>`
//                 }
//             },
//         },
//         {
//             data: null,
//             render: (data, type, row, meta) => {
//                 return `

//       <a href="/trainer/grade/class/${data.classroom.id}"
//       type="button"
//       class="btn mx-3")"
//     >
//     <i
//       class="fa-solid fa-user-graduate px-2"
//       style="font-size: 36px; color: #7978e9"
//     ></i>
//     </a>
//         `;
//             },
//         },
//     ],
// });
