// Devlix theme — client-side enhancement. The site works fully without JS.

// Show the build time (rendered as UTC) in the visitor's local timezone.
document.querySelectorAll(".gen-time").forEach(function (el) {
  var when = new Date(el.getAttribute("datetime"));
  if (!isNaN(when.getTime())) el.textContent = when.toLocaleString();
});
