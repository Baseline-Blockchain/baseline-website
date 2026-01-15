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

  function setupExplorerLinks() {
    var url = "";
    try {
      url = document.body && document.body.dataset ? String(document.body.dataset.explorerUrl || "") : "";
    } catch (_) {
      url = "";
    }
    if (!url) return;

    var links = document.querySelectorAll("[data-explorer-link]");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", url);
    }
  }

  setupExplorerLinks();

  function setupOsTabs() {
    var groups = document.querySelectorAll(".os-tabs");
    if (!groups.length) return;

    function setActive(group) {
      if (!group || !group.querySelector) return;
      var checked = group.querySelector("input.os-tab:checked");
      if (!checked) return;

      var id = String(checked.id || "");
      var showWin = id.indexOf("unix") === -1;
      var showClass = showWin ? "os-win" : "os-unix";

      var labels = group.querySelectorAll(".os-tablist label");
      for (var i = 0; i < labels.length; i++) {
        var active = labels[i].getAttribute("for") === id;
        if (active) {
          labels[i].classList.add("is-active");
          labels[i].setAttribute("aria-selected", "true");
        } else {
          labels[i].classList.remove("is-active");
          labels[i].setAttribute("aria-selected", "false");
        }
      }

      var panels = group.querySelectorAll(".os-panels .os-panel");
      for (var j = 0; j < panels.length; j++) {
        panels[j].style.display = panels[j].classList.contains(showClass) ? "block" : "none";
      }
    }

    for (var g = 0; g < groups.length; g++) {
      (function (group) {
        var inputs = group.querySelectorAll("input.os-tab");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("change", function () {
            setActive(group);
          });
        }
        setActive(group);
      })(groups[g]);
    }
  }

  setupOsTabs();

  var reveal = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function showAll() {
    for (var i = 0; i < reveal.length; i++) reveal[i].classList.add("is-visible");
  }

  if (reveal.length) {
    if (!("IntersectionObserver" in window)) {
      showAll();
    } else {
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
    }
  }

  function setupCopyButtons() {
    var buttons = document.querySelectorAll(".copy-btn");
    if (!buttons.length) return;

    function fallbackCopy(text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      try {
        document.execCommand("copy");
      } catch (_) {
        // Ignore; some environments disallow programmatic copy.
      }
      document.body.removeChild(ta);
    }

    function setCopied(btn, copied) {
      if (!btn) return;
      if (copied) {
        btn.classList.add("is-copied");
        btn.title = "Copied";
        btn.setAttribute("aria-label", "Copied");
        var icon = btn.querySelector("i");
        if (icon) icon.className = "bi bi-check2";
      } else {
        btn.classList.remove("is-copied");
        btn.title = "Copy";
        btn.setAttribute("aria-label", "Copy commands");
        var icon2 = btn.querySelector("i");
        if (icon2) icon2.className = "bi bi-clipboard";
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          var wrap = btn.closest ? btn.closest(".codewrap") : null;
          var code = wrap ? wrap.querySelector("code") : null;
          var text = code ? String(code.textContent || "") : "";
          if (!text) return;

          var done = function () {
            setCopied(btn, true);
            window.setTimeout(function () {
              setCopied(btn, false);
            }, 1200);
          };

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(text)
              .then(done)
              .catch(function () {
                fallbackCopy(text);
                done();
              });
          } else {
            fallbackCopy(text);
            done();
          }
        });
      })(buttons[i]);
    }
  }

  setupCopyButtons();

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
