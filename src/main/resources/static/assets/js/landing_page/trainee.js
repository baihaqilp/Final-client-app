$(document).ready(function () {
  let myHTML = $(".materi_topic_id").val();

  $.ajax({
    url: "/api/materi/topic/" + myHTML,
    method: "GET",
    success: function (res) {
      let i = 1;
      res.forEach(function (data) {
        html = data.desc.replace(/<style([\s\S]*?)<\/style>/gi, "");
        html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
        html = html.replace(/<\/div>/gi, "\n");
        html = html.replace(/<\/li>/gi, "\n");
        html = html.replace(/<li>/gi, "  *  ");
        html = html.replace(/<\/ul>/gi, "\n");
        html = html.replace(/<\/p>/gi, "\n");
        html = html.replace(/<\/h2>/gi, "\n");
        html = html.replace(/<br\s*[\/]?>/gi, "\n");
        html = html.replace(/<[^>]+>/gi, "");
        if (i == 1) {
          slice = html.slice(0, 150) + "...";
        } else {
          slice = html.slice(0, 80) + "...";
        }
        $(".materi_desc" + data.id).html(slice);
        i++;
      });
    },
  });

  $.ajax({
    url: "/api/materi/topic/" + myHTML,
    method: "GET",
    success: function (res) {
      let i = 1;
      res.forEach(function (data) {
        html = data.desc.replace(/<style([\s\S]*?)<\/style>/gi, "");
        html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
        html = html.replace(/<\/div>/gi, "\n");
        html = html.replace(/<\/li>/gi, "\n");
        html = html.replace(/<li>/gi, "  *  ");
        html = html.replace(/<\/ul>/gi, "\n");
        html = html.replace(/<\/p>/gi, "\n");
        html = html.replace(/<\/h2>/gi, "\n");
        html = html.replace(/<br\s*[\/]?>/gi, "\n");
        html = html.replace(/<[^>]+>/gi, "");
        if (i == 1) {
          slice = html.slice(0, 150) + "...";
        } else {
          slice = html.slice(0, 80) + "...";
        }
        $(".materi_desc" + data.id).html(slice);
        i++;
      });
    },
  });
});
