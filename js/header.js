$(document).on("scroll", function() {
    if ($(document).scrollTop() > 100) {
        $(".menu-cambia").removeClass("large").addClass("small");
    } else {
        $(".menu-cambia").removeClass("small").addClass("large");
    }
});