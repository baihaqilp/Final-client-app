$(document).ready(function () {


    $("#table-class").DataTable({
        ajax: {
            url: "/api/classroom/noactive",
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
                render: function (data, type, row, meta) {
                    if (data.isStatus) {
                        return `<div
              class="badge bg-success "
            >
              Active
            </div>`
                    } else {
                        return `<div
              class="badge bg-secondary "
            >
              Non Active
            </div>`
                    }
                },
            },
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
                  <a href="/admin/class/${data.id}"
                    type="button"
                    class="p-3")"
                  >
                    Detail
                  </a>
                </div>
                <div class="dropwdown-item mt-2">
                  <a href="/admin/class/${data.id}/trainee"
                    type="button"
                    class="p-3"
                  >
                    Trainee List
                  </a>
                </div>
                </div>
            </div>
            
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
        // beforeSend: addCsrfToken(),
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        success: (res) => {
            $("#detail_name").val(res.name);
        },
    });
}

