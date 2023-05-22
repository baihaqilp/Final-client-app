$(document).ready(function () {
    let id = $("#id").val();
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
            { data: "submission_file" },
            { data: "submission_date" },
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `
            <a href="/Trainer/classroom/${data.id}"
            type="button"
            class="btn btn-warning mx-3")"
          >
            Detail
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