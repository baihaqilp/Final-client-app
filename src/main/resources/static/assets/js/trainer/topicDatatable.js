$(document).ready(function () {
  let segment_id = $("#segment_id").val();
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
  $.ajax({
    method: "GET",
    url: "/api/topic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $.each(res, function (key, val) {
        if ($('.select_topic option[value = "' + val.id + '"]').length == 0) {
          $(".select_topic").append(
            `<option value = ${val.id}>${val.name}</option>`
          );
        }
      });
    },
  });
  $.ajax({
    url: "/api/materi/trainer",
    method: "GET",
    success: function (response) {
      response.forEach((e) => {
        let trainer_id = e.employee.id;
        console.log(e.employee.id);
        $.ajax({
          url: "/api/materi",
          method: "GET",
          dataType: "JSON",
          success: (e) => {
            $("#table-materi").DataTable({
              data: e,
              destroy: true,
              columns: [
                {
                  data: null,
                  render: function (data, type, row, meta) {
                    return meta.row + 1;
                  },
                },
                {
                  data: "topic.name",
                },
                {
                  data: "name",
                },
                {
                  data: "employee.name",
                },
                {
                  data: null,
                  render: function (data, type, row, meta) {
                    if (trainer_id != data.employee.id) {
                      return `
                      <a href="/trainer/materi/${data.id}"class="btn btn-outline-info mx-3">Detail</a>
                       
                        `;
                    } else {
                      return `
                      <div class="d-flex justify-content-center">
                      <a href="/trainer/materi/edit/${data.id}"class="btn btn-outline-warning mx-3">Edit</a>
                      <a href="/trainer/materi/${data.id}"class="btn btn-outline-info mx-3" >Detail</a>
                        <button
                          type="button"
                          class="btn btn-outline-danger mx-3"
                          onClick="deleteMateri(${data.id})"
                        >
                          Delete
                        </button>
                        </div>
                        `;
                    }
                  },
                },
              ],
            });
          },
        });
      });
    },
  });

  $("#table-topic").DataTable({
    ajax: {
      url: "/api/topic",
      method: "GET",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      {
        data: "name",
      },
      {
        data: "program.name",
      },
      {
        data: null,
        render: function (data, type, row, meta) {
          return `
            <div class="d-flex justify-content-center">
            <button
                  type="button"
                 class="btn btn-outline-info mx-3"
                 data-bs-toggle="modal"
                      data-bs-target="#detailTopic"
                   onClick="getById(${data.id})"
              >
                Detail
            </button>
            <button
                type="button"
            class="btn btn-outline-warning mx-3"
            data-bs-toggle="modal"
                      data-bs-target="#updateTopic"
               onClick="beforeUpdate(${data.id})"
             >
                  Edit
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
      let status = "" + err.message[0] + err.message[1] + err.message[2];
      let msg = "";
      if (status == 409) {
        msg = "Topic sudah ada";
      } else {
        msg = "Something when Wrong !!!";
      }

      Swal.fire({
        icon: "error",
        title: status,
        text: msg,
      });
    },
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
          $("#table-topic").DataTable().ajax.reload(null, false);
          $("#create_topic_name").val("");
        },
      });
      Swal.fire("Updated!", "Topic success to update...", "success");
    }
  });
}

function deleteMateri(id) {
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
          url: "/api/materi/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            $("#table-materi").DataTable().ajax.reload();
          },
        });
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Materi success to delete!!!",
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

// $.ajax({
//   url: "/api/segmenttopic",
//   method: "GET",
//   success: function (response) {
//     $(".segment-cards-container").empty();

//     const filteredTopics = response.filter(function (cardData) {
//       let segmentId = cardData.segment.id;
//       return segmentId == segment_id;
//     });
//     console.log(filteredTopics);
//     $("#table-topic").DataTable({
//       data: filteredTopics,
//       columns: [
//         {
//           data: null,
//           render: function (data, type, row, meta) {
//             return meta.row + 1;
//           },
//         },
//         {
//           data: "topic.name", // Access the name property of the topic object
//         },
//         {
//           data: "topic.program.name", // Access the program property of the topic object
//         },
//         {
//           data: null,
//           render: function (data, type, row, meta) {
//             return `
//               <button
//                 type="button"
//                 class="btn mx-3"
//                 data-bs-toggle="modal"
//                 data-bs-target="#detailTopic"
//                 onClick="getMateriByTopicId(${data.topic.id})"
//               >
//                 <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
//               </button>
//               <button
//                 type="button"
//                 class="btn mx-3"
//                 data-bs-toggle="modal"
//                 data-bs-target="#updateTopic"
//                 onClick="beforeUpdate(${data.topic.id})"
//               >
//                 <i class="fa-solid fa-pen-to-square" style="font-size: 24px"></i>
//               </button>
//             `;
//           },
//         },
//       ],
//     });
//   },
// });
