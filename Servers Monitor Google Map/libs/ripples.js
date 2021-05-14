document.body.addEventListener("mousedown", function(e) {
  el=e.target;
  while (el) {
    if (!el.classList || !el.classList.contains("ripple")) {
      el = el.parentNode;
    }
    else {
      break;
    }
  }
  if (el && el.classList.contains("ripple")) {
    e = e.touches ? e.touches[0] : e;
    const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 1.5;
    el.style.cssText = `--s: 0; --o: 1;`;
    el.offsetTop;
    el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
    }
});
