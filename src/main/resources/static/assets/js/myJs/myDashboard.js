$(document).ready(function () {
  $.ajax({
    url: "/api/employee/role/2",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      const get1 = data.filter(function (val) {
        let progId = val.classroom.program.id;
        if (
          val.user.isEnabled === true &&
          val.user.roles.some((role) => role.id === 2)
        ) {
          return progId == 1;
        }
      });

      const get2 = data.filter(function (val) {
        let progId = val.classroom.program.id;
        if (
          val.user.isEnabled === true &&
          val.user.roles.some((role) => role.id === 2)
        ) {
          return progId == 3;
        }
      });
      let trainer;
      const getTrainer = data.filter((val) => {
        trainer = val.user.roles.some((role) => role.id === 1);
        return trainer;
      });
      let name = "";
      if (get1.length > 0) {
        name = get1[0].classroom.program.name;
      }
      let name2 = "";
      if (get2.length > 0) {
        name2 = get2[0].classroom.program.name;
      }

      $("#prog-1-name").text(name);
      $("#prog-1-count").text(get1.length);
      $("#prog-2-name").text(name2);
      $("#prog-2-count").text(get2.length);
    },
  });
  $.ajax({
    url: "/api/segment/all",
    method: "GET",
    dataType: "JSON",
    success: (data) => {
      let total = data.length;

      const currentDate = new Date();
      let totalEnd = 0;

      data.forEach(function (segment) {
        const endDateParts = segment.end_date.split("-");
        const segmentEndDate = new Date(
          parseInt(endDateParts[2]), //yesr
          parseInt(endDateParts[1]) - 1, //month
          parseInt(endDateParts[0]) //day
        );

        if (segmentEndDate < currentDate) {
          totalEnd++;
        }
      });
      $("#segment-count").text(total);
      $("#complete-count").text(totalEnd);
      // const uniqueClassroomIds = [];
      // let totalClassrooms = 0;
      // data.forEach(function (segment) {
      //   const classroomId = segment.classroom.id;
      //   if (!uniqueClassroomIds.includes(classroomId)) {
      //     uniqueClassroomIds.push(classroomId);
      //     totalClassrooms++;
      //   }
      // });
      // data.forEach(function (segment) {
      //   const classroomId = segment.classroom.id;
      //   const isStatus = classroom.isStatus;
      //   if (!uniqueClassroomIds.includes(classroomId) && !isStatus) {
      //     uniqueClassroomIds.push(classroomId);
      //     totalClassrooms++;
      //   }
      // });
    },
  });
});
