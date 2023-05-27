$(document).ready(function () {
  let materi_id = $("#materi_id").val();
  $.ajax({
    url: "/api/materi/" + materi_id,
    method: "GET",
    success: function (response) {
      var head = `
           <h5 class="card-title mt-2" style="font-size: 24px">
             ${response.name}
           </h5>
          `;
      $("#materi-name").append(head);
      var body = `
      <div class="lesson-content">
        <p class="card-text">${response.desc}</p>
      </div>
      `;
      $(".card-body").append(body);
      $(".card-body .lesson-content").html(function (index, html) {
        return "<p>" + html.trim().replace(/(\n)+/g, "</p><p>") + "</p>";
      });
    },
  });
});

function getById(id) {
  $.ajax({
    method: "GET",
    url: "/api/materi/" + id,
    // beforeSend: addCsrfToken(),
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#detail_materi_name").val(res.name);
      $("#detail_materi_desc").val(res.desc);
      $("#detail_materi_topic").val(res.topic.name);
      $("#detail_materi_trainer").val(res.employee.name);
    },
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
          url: "/api/materi/" + id,
          dataType: "JSON",
          beforeSend: addCsrfToken(),
          success: (res) => {
            // $(".materi-cards-container").empty();
            swalWithBootstrapButtons
              .fire("Deleted!", "Mtaeri success to delete!!!", "success")
              .then(() => {
                location.reload();
              });
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

// $(document).ready(function () {
//   let materi_id = $("#materi_id").val();
//   $.ajax({
//     url: "/api/materi/" + materi_id,
//     method: "GET",
//     success: function (response) {
//       $(".materi-card-title").empty();
//       $(".materi-cards-container").empty();
//       var uniqueTopics = new Set();
//       response.forEach(function (cardData) {
//         uniqueTopics.add(cardData.topic.name);
//         // var head = `
//         //     <h5 class="card-title mt-2" style="font-size: 24px">
//         //      ${cardData.topic.name}
//         //     </h5>
//         //   `;
//         // var card = `
//         //   <div class="card mb-3">
//         //     <div class="card-body">
//         //       <div class="container border-bottom mb-3">
//         //         <div class="card-body d-flex justify-content-between align-items-center">
//         //           <div class="lesson-container-left">
//         //             <h5 class="card-title">${cardData.name}</h5>
//         //             <div class="lesson-content">
//         //               <p class="card-text">${cardData.desc}</p>
//         //             </div>
//         //             <div class="lesson-content">
//         //               <p class="card-text">${cardData.employee.name}</p>
//         //             </div>
//         //           </div>
//         //           <div class="lesson-container-right">
//         //             <a href="/Trainer/materi/edit/${cardData.id}" class="btn">
//         //               <i class="fa-solid fa-pen-to-square" style="font-size: 28px"></i>
//         //             </a>
//         //             <button
//         //             type="button"
//         //             class="btn mx-3"
//         //             data-bs-toggle="modal"
//         //             data-bs-target="#detailMateri"
//         //             onClick="getById(${cardData.id})"
//         //           >
//         //             <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
//         //           </button>
//         //           <button class="btn" onClick="deleteData(${cardData.id})">
//         //           <i class="fa-solid fa-trash-can" style="font-size: 24px"></i>
//         //           </button>
//         //           </div>
//         //         </div>
//         //       </div>
//         //     </div>
//         //   </div>
//         // `;
//         // // $(".materi-card-title").append(head);
//         // $(".materi-cards-container").append(card);
//       });
//       uniqueTopics.forEach(function (topicName) {
//         var head = `
//           <h5 class="card-title mt-2" style="font-size: 24px">
//             ${topicName}
//           </h5>
//         `;
//         $(".materi-card-title").append(head);
//       });
//     },
//   });
// });
