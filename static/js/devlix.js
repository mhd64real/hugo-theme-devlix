// Devlix theme — client-side enhancement. The site works fully without JS.

// Show the build time (rendered as UTC) in the visitor's local timezone, with
// the resolved UTC offset in parentheses. No JS leaves the UTC+0 base time.
document.querySelectorAll(".gen-time").forEach(function (el) {
  var when = new Date(el.getAttribute("datetime"));
  if (isNaN(when.getTime())) return;
  var off = -when.getTimezoneOffset();        // minutes east of UTC
  var abs = Math.abs(off);
  var hh = Math.floor(abs / 60), mm = abs % 60;
  var zone = "UTC" + (off < 0 ? "-" : "+") + hh + (mm ? ":" + (mm < 10 ? "0" : "") + mm : "");
  el.textContent = when.toLocaleString() + " (" + zone + ")";
});

(function () {
  var root = document.documentElement;

  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Theme to hand Giscus: an explicit override (toggle, or a locked scheme)
  // wins; otherwise let Giscus follow the OS like the rest of the page.
  function giscusTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    var s = root.getAttribute("data-scheme");
    if (s === "light" || s === "dark") return s;
    return "preferred_color_scheme";
  }

  var sentTheme = null;
  function syncGiscus() {
    var theme = giscusTheme();
    if (theme === sentTheme) return;
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame || !frame.contentWindow) return;
    sentTheme = theme;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      "https://giscus.app"
    );
  }

  // Giscus posts a message once its iframe is ready; sync the theme then (and
  // again whenever it reports back — the sentTheme guard makes that a no-op).
  window.addEventListener("message", function (e) {
    if (e.origin === "https://giscus.app" && e.data && e.data.giscus) syncGiscus();
  });

  // Theme toggle. Without JS the site follows the OS (prefers-color-scheme).
  // With JS, this overrides it, remembers the choice, and updates Giscus live.
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncGiscus();
    });
  });
})();
