$(document).ready(function () {
    $(".nav-link").click(function (e) {
        e.preventDefault();

        // Remove the 'active' class from all sidebar options
        $(".nav-link").removeClass("active");

        // Add the 'active' class to the clicked sidebar option
        $(this).addClass("active");

        // Get the selected page from the 'data-page' attribute
        // var selectedPage = $(this).data("page");

        // TODO: Change the page content based on the selected page
        // You can implement this part based on your specific requirements
    });

    $("#table-program").DataTable({
        ajax: {
            url: "/api/program",
            dataSrc: "",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                data: "name",
            },
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `
                    <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#detailProgram"
                    onClick="getById(${data.id})"
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#updateProgram"
                    onClick="beforeUpdate(${data.id})"
                  >
                    Edit
                  </button>
                  <button class="btn btn-danger" onClick="deletedata(${data.id})">
                    Delete
                  </button>
                  `;
                }
            }
        ]
    });
});



function getById(id) {
    $.ajax({
        method: "GET",
        url: "/api/program/" + id,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        success: (res) => {
            $("#detail_program_id").val(res.id);
            $("#detail_program_name").val(res.name);
        }
    });
}


function create() {
    let nameVal = $("#create_program_name").val();

    $.ajax({
        method: "POST",
        url: "/api/program",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            name: nameVal,
        }),
        contentType: "application/json",
        success: (res) => {
            $("#addProgram").modal("hide");
            $("#table-program").DataTable().ajax.reload();
            $("#create_program_name").val("");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Program success to creat ....",
                showConfirmButton: false,
                timer: 1500,
            });

        },
    });
}

function beforeUpdate(id) {
    $.ajax({
        method: "GET",
        url: "/api/employee/" + id,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        success: (res) => {
            $("#update_program_id").val(res.id);
            $("#update_program_name").val(res.name);

        },
    });
}

function update() {
    let nameVal = $("#update_program_name").val();
    let idVal = $("#update_program_id").val();
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
                url: "/api/program/" + idVal,
                dataType: "JSON",
                beforeSend: addCsrfToken(),
                data: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    phone: phoneVal,
                    address: addressVal,
                }),
                contentType: "application/json",
                success: (res) => {
                    $("#updateProgram").modal("hide");
                    $("#table-program").DataTable().ajax.reload();
                    $("#update_program_id").val("");
                    $("#update_program_name").val("");
                },
            });
            Swal.fire("Updated!", "Program success to update...", "success");
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

function deletedata(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "ms-3 btn btn-success",
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
                swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "Program success to delete!!!",
                    "success"
                );
                $.ajax({
                    method: "DELETE",
                    url: "/api/program/" + id,
                    dataType: "JSON",
                    beforeSend: addCsrfToken(),
                    success: (res) => {
                        $("#table-program").DataTable().ajax.reload();
                    },
                });
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