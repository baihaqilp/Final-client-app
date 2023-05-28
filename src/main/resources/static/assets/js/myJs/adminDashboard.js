$(document).ready(function () {

    let events = []
    $.ajax({
        url: "/api/segment",
        method: "GET",
        dataType: "JSON",
        success: (data) => {
            $.each(data, function (ey, val) {

                let stDate = val.start_date;
                let arrDate = stDate.split("-");
                let newStDate = new Date(arrDate[2], arrDate[1] - 1, [arrDate[0]])
                let edDate = val.end_date;
                let arredDate = edDate.split("-");
                let newedDate = new Date(arredDate[2], arredDate[1] - 1, [arredDate[0]])

                vent = {
                    "id": val.id,
                    "title": val.classroom.name + " -- " + val.category.name,
                    "url": "admin/class/" + val.classroom.id,
                    "class": "event-important",
                    "start": newStDate.getTime(), // Milliseconds
                    "end": newedDate.getTime() //
                }
                events.push(vent)
            })


        },
    });
    console.log(events);

    var calendar = $('#calendar').calendar({
        tmpl_path: "/assets/js/tmpls/",
        events_source: function () { return events; },
        language: 'id-ID',
    });

    $.ajax({
        url: "/api/employee/role/1",
        method: "GET",
        dataType: "JSON",
        success: (data) => {

            $("#trainer-count").text(data.length)
        },
    });

    $.ajax({
        url: "/api/employee/role/2",
        method: "GET",
        dataType: "JSON",
        success: (data) => {
            $("#trainee-count").text(data.length)
        },
    });

    $.ajax({
        url: "/api/classroom",
        method: "GET",
        dataType: "JSON",
        success: (data) => {

            $("#class-count").text(data.length)
        },
    });

    $.ajax({
        url: "/api/classroom/noactive",
        method: "GET",
        dataType: "JSON",
        success: (data) => {
            $("#classno-count").text(data.length)
        },
    });



});


