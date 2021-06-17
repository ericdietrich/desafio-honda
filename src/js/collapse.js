$(document).on("ready", handleCollapse());

function handleCollapse() {
  if ($(window).width() > 992) {
    $(".collapse-element").each((index, item) => {
      $(item).addClass("show");
    });
  }

  $(document).on("click", ".show-more", function () {
    $(this).attr("aria-expanded") === "true"
      ? $(this).css("transform", "rotate(180deg)")
      : $(this).css("transform", "rotate(0deg)");
  });
}
