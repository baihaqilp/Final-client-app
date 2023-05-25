$(document).ready(function () {

    let class_id = $("#class_id").val()
    $.ajax({
        url: "/api/classroom/" + class_id,
        method: "GET",
        dataType: "JSON",
        success: (res) => {
            $("#class_name").text(res.name)
            console.log(res.name);
        },
    });

    $("#table-grade").DataTable({
        ajax: {
            url: "/api/grade/classroom/" + class_id,
            dataSrc: "",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                },
            },
            { data: "segment.category.name" },
            { data: "trainee.name" },
            { data: "segment.trainer.name" },
            { data: "average" },
            { data: "name" },
            { data: "status" },

        ],
    });
});