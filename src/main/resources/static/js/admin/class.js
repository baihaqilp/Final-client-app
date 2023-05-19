$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/program",
    dataType: "JSON",
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
        render: (data, type, row, meta) => {
          return `
          <a href="/admin/class/${data.id}"
            type="button"
            class="btn btn-warning mx-3")"
          >
            Detail
          </a>
          <button
            type="button"
            class="btn btn-warning mx-3"
            data-bs-toggle="modal"
            data-bs-target="#updateClass"
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
    ],
  });
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
});

function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/classroom/" + id,
    // beforeSend: addCsrfToken(),
    dataType: "JSON",
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

  console.log(programVal);
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
        // beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          programId: 1,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateClass").modal("hide");
          $("#table-class").DataTable().ajax.reload();
          $("#create_class_name").val("");
        },
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
