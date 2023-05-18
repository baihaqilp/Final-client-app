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

    $("#table-trainer").DataTable({
        ajax: {
            url: "/api/employee/role/1",
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
            { data: "email" },
            { data: "phone" },
            { data: "address" },
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `
                    <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#detailTrainer"
                    onClick="getById(${data.id})"
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#updateTrainer"
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
        url: "/api/employee/" + id,
        dataType: "JSON",
        success: (res) => {
            $("#update_trainer_name").val(res.id);
            $("#update_trainer_name").val(res.name);
            $("#update_trainer_email").val(res.email);
            $("#update_trainer_phone").val(res.phone);
            $("#update_trainer_address").val(res.address);
        }
    });
}


function create() {
    let nameVal = $("#create_trainer_name").val();
    let emailVal = $("#create_trainer_email").val();
    let phoneVal = $("#create_trainer_phone").val();
    let addressVal = $("#create_trainer_address").val();
    let usernameVal = $("#create_trainer_username").val();
    let passwordVal = $("#create_trainer_password").val();
    console.log(passwordVal);

    $.ajax({
        method: "POST",
        url: "/api/user",
        dataType: "JSON",
        data: JSON.stringify({
            username: usernameVal,
            password: passwordVal,
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
            address: addressVal,
            roleId: 1,
        }),
        contentType: "application/json",
        success: (res) => {
            $("#addTrainer").modal("hide");
            $("#table-trainer").DataTable().ajax.reload();
            $("#create_trainer_name").val("");
            $("#create_trainer_email").val("");
            $("#create_trainer_phone").val("");
            $("#create_trainer_address").val("");
            $("#create_trainer_username").val("");
            $("#create_trainer_password").val("");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Region success to creat ....",
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
        success: (res) => {
            $("#update_trainer_name").val(res.id);
            $("#update_trainer_name").val(res.name);
            $("#update_trainer_email").val(res.email);
            $("#update_trainer_phone").val(res.phone);
            $("#update_trainer_address").val(res.address);

        },
    });
}

function update() {
    let nameVal = $("#create_trainer_name").val();
    let emailVal = $("#create_trainer_email").val();
    let phoneVal = $("#create_trainer_phone").val();
    let addressVal = $("#create_trainer_address").val();
    let idVal = $("#update_id").val();
    console.log(regionVal);
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
                url: "/api/employee/" + idVal,
                dataType: "JSON",
                data: JSON.stringify({
                    username: usernameVal,
                    password: passwordVal,
                    name: nameVal,
                    email: emailVal,
                    phone: phoneVal,
                    address: addressVal,
                    roleId: 1,
                }),
                contentType: "application/json",
                success: (res) => {
                    $("#addTrainer").modal("hide");
                    $("#table-trainer").DataTable().ajax.reload();
                    $("#create_trainer_name").val("");
                    $("#create_trainer_email").val("");
                    $("#create_trainer_phone").val("");
                    $("#create_trainer_address").val("");
                    $("#create_trainer_username").val("");
                    $("#create_trainer_password").val("");
                },
            });
            Swal.fire("Updated!", "Region success to update...", "success");
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
                    "Region success to delete!!!",
                    "success"
                );
                $.ajax({
                    method: "DELETE",
                    url: "/api/employee/" + id,
                    dataType: "JSON",
                    success: (res) => {
                        $("#table-trainer").DataTable().ajax.reload();
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