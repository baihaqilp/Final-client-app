$(document).ready(function () {
  $.ajax({
    url: "/segment/class/trainee",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      let i = 1;
      data.array.forEach((res) => {
        let body = `
      <div class="thumb" onclick="getById()">
        <span class="icon">
          <img
            src="/assets/images/landing_page/service-icon-0${i}.png}"
            alt=""
        /></span>
        <span text="${res.category.name}"></span>
      </div>
      `;
        $(".segmentList").append(body);
        i++;
      });
    },
  });

  getById = (id) => {
    console.log(id);
  };

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

{
  /* <div th:each="segment,iStat : ${segmentTopics}">
  <div th:if="${segment.segment.id == segmentStat.id}">
    <span>
      <i class="fa fa-check"></i>
      <a
        th:href="@{/trainee/topic/}+${segment.topic.id}"
        th:text="${segment.topic.name}"
      ></a>
    </span>
  </div>
</div>; */
}
