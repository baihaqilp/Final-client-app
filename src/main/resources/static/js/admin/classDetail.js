$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/api/employee/role/1",
        dataType: "JSON",
        success: (res) => {
            $.each(res, function (key, val) {
                if ($('.select_trainer option[value = "' + val.id + '"]').length == 0) {
                    $(".select_trainer").append(`<option value = ${val.id}>${val.name}</option>`)
                }
            })
        },
    });
    let class_id = $("#id").val();
    $('#table-segment').DataTable({
        ajax: {
            url: "/api/segment/class/" + class_id,
            dataSrc: ""
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return "Segmen " + meta.row + 1;
                }
            },
            { data: "trainer.name" },
            { data: "start_date" },
            { data: "end_date" },
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `
            <button
              type="button"
              class="btn btn-warning mx-3"
              data-bs-toggle="modal"
              data-bs-target="#updateRegion"
              onClick="beforeUpdate(${data.id})"
            >
              Ganti Trainer
            </button>
            <button class="btn btn-danger" onClick="deleteData(${data.id})">
              Delete
            </button>
            `;
                },
            },
        ]
    });

});

function create() {
    let start_date = $("#create__start_date").val();
    let end_date = $("#create_end_date").val();
    let trainer_id = $("#trainer_id option:selected").val();
    let class_id = $("#id").val();
    console.log(trainer_id)
    console.log(class_id);

    $.ajax({
        method: "POST",
        url: "/api/segment",
        dataType: "JSON",
        data: JSON.stringify({
            start_date: start_date,
            end_date: end_date,
            trainerId: trainer_id,
            classroomId: class_id
        }),
        contentType: "application/json",
        success: (res) => {
            $("#addSegment").modal("hide");
            $("#table-segment").DataTable().ajax.reload();
            $("#create__start_date").val("");
            $("#create__end_date").val("");

        },
    });
}
