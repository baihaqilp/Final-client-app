$(document).ready(function () {

  $('#table-class').DataTable({
    ajax: {
      url: "/api/classroom",
      dataSrc: ""
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        }
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
            data-bs-target="#updateRegion"
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
    beforeSend: addCsrfToken(),
    dataType: "JSON",
    success: (res) => {
      $("#detail_name").val(res.name);

    }
  })
}

function create() {
  let nameVal = $("#create_name").val();

  $.ajax({
    method: "POST",
    url: "/api/region",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addRegion").modal("hide");
      $("#table-region").DataTable().ajax.reload();
      $("#create_name").val("");

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
    url: "/api/region/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_name").val(res.name);
      $("#update_id").val(res.id);

    },
  });
}


function update() {
  let nameVal = $("#update_name").val();
  let idVal = $("#update_id").val();
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
        url: "/api/region/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateRegion").modal("hide");
          $("#table-region").DataTable().ajax.reload();
          $("#update_name").val("");
        },
      });
      Swal.fire("Updated!", "Region success to update...", "success");
    }
  });
}

function deleteRegion(id) {
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
          url: "/api/region/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            $("#table-region").DataTable().ajax.reload();
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