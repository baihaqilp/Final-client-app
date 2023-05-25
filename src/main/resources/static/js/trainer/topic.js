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

  $("#table-topic").DataTable({
    ajax: {
      url: "/api/topic",
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
          <button
            type="button"
            class="btn mx-3"
            data-bs-toggle="modal"
            data-bs-target="#detailTopic"
            onClick="getById(${data.id})"
          >
            <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
          </button>
          <button
            type="button"
            class="btn mx-3"
            data-bs-toggle="modal"
            data-bs-target="#updateTopic"
            onClick="beforeUpdate(${data.id})"
          >
          <i class="fa-solid fa-pen-to-square" style="font-size: 24px"></i>
          </button>
          <button class="btn" onClick="deleteData(${data.id})">
          <i class="fa-solid fa-trash-can" style="font-size: 24px"></i>
          </button>
          `;
        },
      },
    ],
  });
});

function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/topic/" + id,
    // beforeSend: addCsrfToken(),
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#detail_topic_name").val(res.name);
      $("#detail_program").val(res.program.name);
    },
  });
}

function create() {
  let nameVal = $("#create_topic_name").val();
  let programVal = $("#select_program option:selected").val();
  $.ajax({
    method: "POST",
    url: "/api/topic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    // beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: nameVal,
      programId: programVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTopic").modal("hide");
      $("#table-topic").DataTable().ajax.reload();
      $("#create_topic_name").val("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class success to creat ....",
        showConfirmButton: false,
        timer: 1500,
      });
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
    url: "/api/topic/" + id,
    dataType: "JSON",
    success: (res) => {
      $("#update_topic_name").val(res.name);
      $("#update_id").val(res.id);

      $("#update_program").val(res.program.id);
    },
  });
}

function update() {
  let nameVal = $("#update_topic_name").val();
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
        url: "/api/topic/" + idVal,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: nameVal,
          programId: programVal,
        }),
        contentType: "application/json",
        success: (res) => {
          $("#updateTopic").modal("hide");
          $("#table-topic").DataTable().ajax.reload();
          $("#create_topic_name").val("");
        },
      });
      Swal.fire("Updated!", "Topic success to update...", "success");
    }
  });
}

function deleteData(id) {
  console.log(id);
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
          url: "/api/topic/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            $("#table-topic").DataTable().ajax.reload();
          },
        });
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Topic success to delete!!!",
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
