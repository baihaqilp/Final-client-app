$(document).ready(function () {
  $.ajax({
    url: "/api/segment/all",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      data.forEach((data) => {
        let classId = data.classroom.id;
        $.ajax({
          url: "/api/grade/classroom/" + classId,
          method: "GET",
          dataType: "JSON",
          success: (data) => {
            data.forEach((val) => {
              console.log(val);
              let cardHeader = `
                    <li class="nav-item" role="presentation">
                        <a
                            class="nav-link"
                            id="${val.trainee.classroom.id}-tab"
                            data-bs-toggle="tab"
                            href="#${val.trainee.classroom.id}"
                            role="tab"
                            aria-controls="task"
                            aria-selected="false"
                        >${val.trainee.classroom.name}</a
                        >
                    </li>                
                    `;
              let cardBody = `
                    <div
                        class="tab-pane fade"
                        id="${val.trainee.classroom.id}"
                        role="tabpanel"
                        aria-labelledby="${val.trainee.classroom.id}-tab"
                    >
                    <table
                         class="table display table-stripped table-bordered mt-3 text-center"
                        id="table-${val.trainee.classroom.id}" style="width: 100%";
                    >
                    <thead class="table">
                        <tr>
                            <th class="col-1 text-center">No.</th>
                            <th class="col-1 text-center">Name</th>
                            <th class="col-1 text-center">Grade</th>
                            <th class="col-2 text-center">Nilai</th>
                            <th class="col-2 text-center">Status</th>
                            <th class="col-1 text-center">Segment</th>
                        </tr>
                    </thead>
                    </table>
                     </div>
                      `;
              $(".nav-tabs").append(cardHeader);
              $(".tab-content").append(cardBody);
              $("#table-" + val.trainee.classroom.id).DataTable({
                data: data,
                destroy: true,
                columns: [
                  {
                    data: null,
                    render: function (data, type, row, meta) {
                      return meta.row + 1;
                    },
                  },
                  { data: "trainee.name" },
                  { data: "name" },
                  { data: "average" },
                  { data: "status" },
                  { data: "segment.category.name" },
                ],
              });
            });

            $(".nav-link").click(function () {
              $(".nav-link.active").removeClass("active");
              $(".tab-pane.active.show").removeClass("active show");
              $(this).addClass("active");
              $($(this).attr("href")).addClass("active show");
            });
          },
        });
      });
    },
  });
});
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
