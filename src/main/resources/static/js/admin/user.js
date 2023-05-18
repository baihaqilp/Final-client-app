$(document).ready(function () {
    $(".nav-link").click(function (e) {
        e.preventDefault();

        // Remove the 'active' class from all sidebar options
        $(".nav-link").removeClass("active");

        // Add the 'active' class to the clicked sidebar option
        $(this).addClass("active");

        // Get the selected page from the 'data-page' attribute
        // var selectedPage = $(this).data("page");

        // TODO: Change the page content based on the selected page
        // You can implement this part based on your specific requirements
    });
});
