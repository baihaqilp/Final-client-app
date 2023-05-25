$(document).ready(function () {
    // $.ajax({
    //   url: "/api/segment/trainer/" + 2,
    //   method: "GET",
    //   dataType: "JSON",
    //   success: (res) => {
    //     $.each(res);
    //   },
    // });
    $("#table-grade").DataTable({
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
                render: function (data, type, row, meta) {
                    if (data.classroom.isStatus) {
                        return `<button
              type="button"
              class="btn btn-success "
            >
              Active
            </button>`
                    } else {
                        return `<button
              type="button"
              class="btn btn-secondary "
            >
              Non Active
            </button>`
                    }
                },
            },
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `
            
          <a href="/trainer/grade/class/${data.classroom.id}"
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