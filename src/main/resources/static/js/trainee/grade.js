$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/api/topic",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        success: (res) => {
            $.each(res, function (key, val) {
                if ($('.select_topik option[value = "' + val.id + '"]').length == 0) {
                    $(".select_topik").append(
                        `<option value = ${val.id}>${val.name}</option>`
                    );
                }
            });
        },
    });
});