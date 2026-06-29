// Devlix theme — client-side enhancement. The site works fully without JS.

// Show the build time (rendered as UTC) in the visitor's local timezone.
document.querySelectorAll(".gen-time").forEach(function (el) {
  var when = new Date(el.getAttribute("datetime"));
  if (!isNaN(when.getTime())) el.textContent = when.toLocaleString();
});

// Theme toggle. Without JS the site follows the OS (prefers-color-scheme).
// With JS, this overrides it and remembers the choice in localStorage.
(function () {
  var root = document.documentElement;
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });
})();
