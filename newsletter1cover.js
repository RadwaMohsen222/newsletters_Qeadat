$(document).ready(function () {
  var $flipbook = $(".flipbook");

  $flipbook.turn({
    width: 932,
    height: 1024,
    elevation: 50,
    gradients: true,
    autoCenter: true,
    duration: 1000,
    acceleration: true,
    when: {
      turned: function (e, page) {
        // Adjust shadows or centering on page turn if needed
      }
    }
  });

  // Enable peek/pop corner hover on page 1 when closed
  $flipbook.bind("mouseenter", function () {
    if ($flipbook.turn("page") === 1) {
      $flipbook.turn("peel", "tr"); // Peels the top-right corner slightly on hover
    }
  }).bind("mouseleave", function () {
    if ($flipbook.turn("page") === 1) {
      $flipbook.turn("peel", false); // Resets back when unhovered
    }
  });
});
