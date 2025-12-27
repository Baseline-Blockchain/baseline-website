(function () {
  document.documentElement.classList.add("js");

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (_) {
    reduceMotion = false;
  }

  var toggle = document.getElementById("nav-toggle");

  if (toggle) {
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
  }

  var reveal = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!reveal.length) return;

  function showAll() {
    for (var i = 0; i < reveal.length; i++) reveal[i].classList.add("is-visible");
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-visible");
          io.unobserve(entries[i].target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  for (var j = 0; j < reveal.length; j++) io.observe(reveal[j]);

  if (reduceMotion) return;

  function randomHex(len) {
    var out = "";
    var chars = "0123456789abcdef";
    for (var i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
  }

  function startMiningSim() {
    var consoleEl = document.querySelector("[data-mining-sim]");
    if (!consoleEl) return;

    var nonceEl = consoleEl.querySelector('[data-mining="nonce"]');
    var hashEl = consoleEl.querySelector('[data-mining="hash"]');
    var bitsEl = consoleEl.querySelector('[data-mining="bits"]');
    var targetEl = consoleEl.querySelector('[data-mining="target"]');
    var stackEl = document.querySelector("[data-mining-stack]");
    var blockEls = stackEl ? stackEl.querySelectorAll('[data-mining="block"]') : [];

    var nonce = Math.floor(Math.random() * 0xffffffff);
    var target = targetEl ? String(targetEl.textContent || "").trim() : "";
    if (!target) target = "0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    function setText(el, value) {
      if (!el) return;
      el.textContent = value;
    }

    function flashFound() {
      consoleEl.classList.add("is-found");
      if (stackEl) stackEl.classList.add("is-found");
      window.setTimeout(function () {
        consoleEl.classList.remove("is-found");
        if (stackEl) stackEl.classList.remove("is-found");
      }, 650);
    }

    var blockHeight = 0;
    function pushBlock() {
      blockHeight += 1;
      if (!blockEls || !blockEls.length) return;
      for (var i = blockEls.length - 1; i > 0; i--) {
        blockEls[i].textContent = blockEls[i - 1].textContent;
      }
      blockEls[0].textContent = "Block +" + blockHeight;
    }

    // Show something sensible even before the first tick.
    setText(bitsEl, bitsEl ? bitsEl.textContent : "0x1d0225c1");
    setText(targetEl, target);
    pushBlock();

    var lastFound = performance.now();

    window.setInterval(function () {
      nonce = (nonce + 1 + Math.floor(Math.random() * 5000)) >>> 0;
      setText(nonceEl, ("00000000" + nonce.toString(16)).slice(-8));
      setText(hashEl, randomHex(64));

      var now = performance.now();
      if (now - lastFound > 4200) {
        lastFound = now + Math.floor(Math.random() * 800);
        flashFound();
        pushBlock();
      }
    }, 120);
  }

  startMiningSim();
})();
