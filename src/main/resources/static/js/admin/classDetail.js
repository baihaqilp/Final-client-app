$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/api/employee/role/1",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        success: (res) => {
            $.each(res, function (key, val) {
                if ($('.select_trainer option[value = "' + val.id + '"]').length == 0) {
                    $(".select_trainer").append(`<option value = ${val.id}>${val.name}</option>`)
                }
            })
        },
        error: function (e) {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Something went WRONG !!!",
            })
        }
    });
    let class_id = $("#id").val();
    $('#table-segment').DataTable({
        ajax: {
            url: "/api/segment/class/" + class_id,
            dataSrc: "",
            error: function (e) {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Something went WRONG !!!",
                })
            }
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
                    return "Segmen " + (meta.row + 1);
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
              data-bs-target="#updateSegment"
              onClick="beforeUpdate(${data.id})"
            >
              Edit
            </button>
            <button class="btn btn-danger" onClick="deleteData(${data.id})">
              Delete
            </button>
            `;
                },
            },
        ]
    });

    $('#table-trainee').DataTable({
        ajax: {
            url: "/api/employee/class/" + class_id,
            dataSrc: "",
            error: function (e) {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Something went WRONG !!!",
                })
            }
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: "name" },
            { data: "email" },
            { data: "phone" },
            {
                data: null,
                render: function (data, type, row, meta) {
                    if (data.user.isEnabled) {
                        return "Active"
                    } else {
                        return "Non-Active"
                    }
                }
            }
        ]
    });

});

function create() {
    let start_date = $("#create__start_date").val();
    let end_date = $("#create_end_date").val();
    let trainer_id = $("#trainer_id option:selected").val();
    let class_id = $("#id").val();

    $.ajax({
        method: "POST",
        url: "/api/segment",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
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
        error: function (xhr, textStatus, errorThrown) {
            let err = JSON.parse(xhr.responseText);
            let status = "" + err.message[0] + err.message[1] + err.message[2]
            let msg = ""
            if (status == 409) {
                msg = "Topic sudah ada"
            } else {
                msg = "Something when Wrong !!!"
            }

            Swal.fire({
                icon: "error",
                title: status,
                text: msg,
            })
        }
    });

}

function beforeUpdate(id) {
    $.ajax({
        method: "GET",
        url: "/api/segment/" + id,
        dataType: "JSON",
        success: (res) => {
            $("#update__start_date").val(res.start_date);
            $("#update_end_date").val(res.end_date);
            $("#class_id").val(res.classroom.id);
            $("#segment_id").val(res.id);
            $("#update_trainer_id").val(res.trainer.id);

        },
        error: function (xhr, textStatus, errorThrown) {
            let err = JSON.parse(xhr.responseText);
            let status = "" + err.message[0] + err.message[1] + err.message[2]
            let msg = ""
            if (status == 409) {
                msg = "Topic sudah ada"
            } else {
                msg = "Something when Wrong !!!"
            }

            Swal.fire({
                icon: "error",
                title: status,
                text: msg,
            })
        }
    });
}


function update() {
    let start_date = $("#update__start_date").val();
    let end_date = $("#update_end_date").val();
    let trainer_id = $("#update_trainer_id option:selected").val();
    let class_id = $("#class_id").val();
    let segment_id = $("#segment_id").val();


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "PUT",
                url: "/api/segment/" + segment_id,
                dataType: "JSON",
                beforeSend: addCsrfToken(),
                data: JSON.stringify({
                    start_date: start_date,
                    end_date: end_date,
                    classroomId: class_id,
                    trainerId: trainer_id
                }),
                contentType: "application/json",
                success: (res) => {
                    $("#updateSegment").modal("hide");
                    $("#table-segment").DataTable().ajax.reload();
                    $("#update_start_date").val("");
                    $("#update_end_date").val("");
                },
                error: function (xhr, textStatus, errorThrown) {
                    let err = JSON.parse(xhr.responseText);
                    let status = "" + err.message[0] + err.message[1] + err.message[2]
                    let msg = ""
                    if (status == 409) {
                        msg = "Topic sudah ada"
                    } else {
                        msg = "Something when Wrong !!!"
                    }

                    Swal.fire({
                        icon: "error",
                        title: status,
                        text: msg,
                    })
                }
            });
            Swal.fire("Updated!", "Region success to update...", "success");
        }
    });
}

function deleteData(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method: "DELETE",
                    url: "/api/segment/" + id,
                    dataType: "JSON",
                    beforeSend: addCsrfToken(),
                    success: (res) => {
                        $("#table-segment").DataTable().ajax.reload();
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        let err = JSON.parse(xhr.responseText);
                        let status = "" + err.message[0] + err.message[1] + err.message[2]
                        let msg = ""
                        if (status == 409) {
                            msg = "Topic sudah ada"
                        } else {
                            msg = "Something when Wrong !!!"
                        }

                        Swal.fire({
                            icon: "error",
                            title: status,
                            text: msg,
                        })
                    }
                });
                swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "Region success to delete!!!",
                    "success"
                );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "Your imaginary file is safe :)",
                    "error"
                );
            }
        });


}
