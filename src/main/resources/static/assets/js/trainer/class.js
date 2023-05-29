$(document).ready(function () {
  $.ajax({
    url: "/api/segment/all",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      console.log(data);
      const classCardContainer = $("#class-card");
      const cardsPerRow = 4;
      let currentRow;

      data.forEach((e, index) => {
        if (index % cardsPerRow === 0) {
          currentRow = $("<div class='row'></div>");
          classCardContainer.append(currentRow);
        }

        var card = `
          <div class="col-3">
            <a href="/trainer/classroom/${e.classroom.id}/trainer">
            <div class="card border border-1 class-card">
              <div class="card-header">
                <h5>${e.classroom.name}</h5>
                <h6>${e.classroom.program.name}</h6>
              </div>
              <div class="card-body text-muted"><p>Click for detail</p></div>
            </div>
            </a>
          </div>
        `;
        currentRow.append(card);
      });
    },
  });

  $("#table-class").DataTable({
    ajax: {
      url: "/api/segment/trainer",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "classroom.name" },
      { data: "classroom.program.name" },
      {
        data: null,
        render: function (data, type, row, meta) {
          if (data.classroom.isStatus) {
            return `<button
            type="button"
            class="btn btn-success "
          >
            Active
          </button>`;
          } else {
            return `<button
            type="button"
            class="btn btn-secondary "
          >
            Non Active
          </button>`;
          }
        },
      },
      {
        data: null,
        render: (data, type, row, meta) => {
          return `
          <a href="/trainer/classroom/${data.classroom.id}/trainer"
          type="button"
          title="Detail ${data.classroom.name}"
          class="btn mx-3")"
        >
        <i class="fa-solid fa-up-right-from-square" style="font-size: 24px"></i>
        </a>
        <a href="/trainer/trainee/classroom/${data.classroom.id}"
        type="button"
        class="btn mx-3")"
      >
      <i
        class="fa-solid fa-user-graduate px-2"
        style="font-size: 36px; color: #7978e9"
      ></i>
      </a>
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
    dataType: "JSON",
    success: (res) => {
      $("#detail_class_id").val(res.id);
      $("#detail_class_name").val(res.name);
      $("#detail_program_name").val(res.program.name);
    },
  });
}
