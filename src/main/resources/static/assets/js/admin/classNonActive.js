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
        ],
    });
});
