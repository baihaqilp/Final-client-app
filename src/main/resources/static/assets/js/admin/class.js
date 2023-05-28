$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/program",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_program option[value = "' + val.id + '"]').length == 0) {
          $(".select_program").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });

  $("#table-class").DataTable({
    ajax: {
      url: "/api/classroom",
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
                  class="btn btn-outline-primary col-12")"
                >
                  Detail
                </a>
              </div>
              <div class="dropwdown-item mt-2">
                <button
                  type="button"
                  class="btn btn-outline-warning col-12"
                  data-bs-toggle="modal"
                  data-bs-target="#updateClass"
                  onClick="beforeUpdate(${data.id})"
                >
                  Edit
                </button>
              </div>
              <div class="dropwdown-item mt-2">
                <a href="/admin/class/${data.id}/trainee"
                  type="button"
                  class="btn btn-outline-info col-12"
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

function create() {
  let nameVal = $("#create_class_name").val();
  let programVal = $("#select_program option:selected").val();
  $.ajax({
    method: "POST",
    url: "/api/classroom",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    // beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      programId: programVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addClass").modal("hide");
      $("#table-class").DataTable().ajax.reload();
      $("#create_class_name").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    error: function (e) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Something went WRONG !!!",
      })
    }
  });
}

function beforeUpdate(id) {
  $.ajax({
    method: "GET",
    url: "/api/classroom/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_class_name").val(res.name);
      $("#update_id").val(res.id);

      $("#update_program").val(res.program.id);
    },
  });
}

function update() {
  let nameVal = $("#update_class_name").val();
  let idVal = $("#update_id").val();
  let programVal = $("#update_program option:selected").val();

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
        url: "/api/classroom/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          programId: programVal,
          isStatus: 1,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateClass").modal("hide");
          $("#table-class").DataTable().ajax.reload();
          $("#create_class_name").val("");
        },
        error: function (e) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Something went WRONG !!!",
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
          url: "/api/classroom/" + id,
          dataType: "JSON",
          // beforeSend: addCsrfToken(),
          success: (res) => {
            $("#table-class").DataTable().ajax.reload();
          },
          error: function (e) {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: "Something went WRONG !!!",
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
