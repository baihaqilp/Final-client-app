$(document).ready(function () {
  $.ajax({
    url: "/api/segment/class/trainee",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      let i = 1;
      let task_body = "";
      data.forEach((res) => {
        let body = `
        <div class="thumb" onclick=getById(${res.id})>
          <span class="icon">
            <img
              src="/assets/images/landing_page/service-icon-0${i}.png"
              alt=""
          /></span>
          <span >${res.category.name}</span>
        </div>
        `;
        $("#segment-list").append(body);
      });
    },
  });

  // $.ajax({
  //   url: "/api/segmenttopic/" + id,
  //   method: "GET",
  //   dataType: "JSON",
  //   success: function (data) {
  //     $("#update-id").val(data.id);
  //     $("#class-id").val(data.classroom.id);
  //     $(".user-name").text(data.name);
  //     $("#first-name-icon").val(data.name);
  //     $("#email-id-icon").val(data.email);
  //     $("#mobile-id-icon").val(data.phone);
  //     $("#address-id-icon").val(data.address);
  //     $("#username-id-icon").val(data.user.username);
  //     $("#password-id-icon").val(data.user.password);
  //     data.user.roles.forEach((role) => {
  //       $("#role-id").val(role.id);
  //     });
  //   },
  // });
});
getById = (id) => {
  $.ajax({
    url: "/api/segmenttopic/bysegment/" + id,
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      let i = 1;
      let body = "";
      data.forEach((res) => {
        body += `
          <span
            ><i class="fa fa-check"></i>
            <a
              href="/trainee/topic/${res.topic.id}"
            >${res.topic.name}</a
          ></span>
          `;
        i++;
      });
      $("#tessu" + data[0].segment.id).html(body);
    },
  });
};
