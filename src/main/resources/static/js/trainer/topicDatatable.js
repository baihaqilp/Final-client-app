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
    url: "/api/segmenttopic",
    method: "GET",
    success: function (response) {
      $(".segment-cards-container").empty();

      // Filter the response to get only the topics with matching segment_id
      const filteredTopics = response.filter(function (cardData) {
        let segmentId = cardData.segment.id;
        return segmentId == segment_id;
      });
      console.log(filteredTopics);
      $("#table-topic").DataTable({
        data: filteredTopics,
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + 1;
            },
          },
          {
            data: "topic.name", // Access the name property of the topic object
          },
          {
            data: "topic.program.name", // Access the program property of the topic object
          },
          {
            data: null,
            render: function (data, type, row, meta) {
              return `
                <button
                  type="button"
                  class="btn mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#detailTopic"
                  onClick="getMateriByTopicId(${data.topic.id})"
                >
                  <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
                </button>
                <button
                  type="button"
                  class="btn mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#updateTopic"
                  onClick="beforeUpdate(${data.topic.id})"
                >
                  <i class="fa-solid fa-pen-to-square" style="font-size: 24px"></i>
                </button>
              `;
            },
          },
        ],
      });
    },
  });
});

function getMateriByTopicId(id) {
  console.log(id);
  $("#table-materi").DataTable({
    destroy: true,
    ajax: {
      url: "/api/materi/topic/" + id,
      dataSrc: "",
      error: function (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "name" },
      { data: "topic.name" },
      { data: "employee.name" },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <a href="/trainer/materi/${data.id}"
            type="button"
            class="btn mx-3")"
          >
          <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
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
          <button class="btn" onClick="deleteData(${data.id})">
            <i class="fa-solid fa-trash-can" style="font-size: 24px"></i>
          </button>
          `;
        },
      },
    ],

  });
}
// function getById(id) {
//   $.ajax({
//     method: "GET",
//     url: "/api/topic/" + id,
//     // beforeSend: addCsrfToken(),
//     dataType: "JSON",
//     beforeSend: addCsrfToken(),
//     success: (res) => {
//       $("#detail_topic_name").val(res.name);
//       $("#detail_program").val(res.program.name);
//     },
//   });
// }

function create() {
  let segment_id = $("#segment_id").val();
  let start_dateVal = $("#create_ts_start_date").val();
  let end_dateVal = $("#create_ts_end_date").val();
  let topicVal = $("#select_topic option:selected").val();
  console.log(segment_id, start_dateVal, end_dateVal, topicVal);
  $.ajax({
    method: "POST",
    url: "/api/segmenttopic",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    // beforeSend: addCsrfToken(),
    data: JSON.stringify({
      segmentId: segment_id,
      topicId: topicVal,
      start_date: start_dateVal,
      end_date: end_dateVal,
    }),
    contentType: "application/json",
    success: (res) => {
      $("#addTopic").modal("hide");
      location.reload();

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
          $("#table-topic").DataTable().ajax.reload(null, false);
          $("#create_topic_name").val("");
        },
      });
      Swal.fire("Updated!", "Topic success to update...", "success");
    }
  });
}

// function deleteData(id) {
//   console.log(id);
//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//     },
//     buttonsStyling: false,
//   });

//   swalWithBootstrapButtons
//     .fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true,
//     })
//     .then((result) => {
//       if (result.isConfirmed) {
//         $.ajax({
//           method: "DELETE",
//           url: "/api/topic/" + id,
//           dataType: "JSON",
//           beforeSend: addCsrfToken(),
//           success: (res) => {
//             $("#table-topic").DataTable().ajax.reload();
//           },
//         });
//         swalWithBootstrapButtons.fire(
//           "Deleted!",
//           "Topic success to delete!!!",
//           "success"
//         );
//       } else if (
//         /* Read more about handling dismissals below */
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire(
//           "Cancelled",
//           "Your imaginary file is safe :)",
//           "error"
//         );
//       }
//     });
// }
