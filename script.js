(function () {
  var toggle = document.getElementById("nav-toggle");
  if (!toggle) return;

  document.addEventListener("click", function (ev) {
    var target = ev.target;
    if (!target || !target.closest) return;
    if (target.closest(".nav a")) {
      toggle.checked = false;
    }
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      toggle.checked = false;
    }
  });
})();
