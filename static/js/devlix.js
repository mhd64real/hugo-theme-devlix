// Devlix theme — all client-side behavior lives in this one file.
// Both features degrade gracefully: with JS off, the page still works.

// 1) Email: the address is split across data attributes so scrapers can't
//    read it as one string. Here we reassemble it and make it clickable.
document.querySelectorAll(".email-link").forEach(function (el) {
  var address = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
  el.setAttribute("href", "mailto:" + address);
  var label = el.querySelector(".email-text");
  if (label) label.textContent = address;
});

// 2) Generation time: the page is built with a UTC timestamp. Here we show it
//    in the visitor's own local time. The exact UTC value stays in the tooltip.
document.querySelectorAll(".gen-time").forEach(function (el) {
  var when = new Date(el.getAttribute("datetime"));
  if (!isNaN(when.getTime())) el.textContent = when.toLocaleString();
});
