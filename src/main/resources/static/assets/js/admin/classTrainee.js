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
            { data: "email" },

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
