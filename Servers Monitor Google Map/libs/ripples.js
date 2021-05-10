// document.body.addEventListener("mousedown", function(event) {
//     var target = event.target;

//     while (target) {
//       if (!target.classList || !target.classList.contains("ripple")) {
//         target = target.parentNode;
//       }
//       else {
//         break;
//       }
//     }

//     if (target && target.classList.contains("ripple")) {
//         var offset = target.getBoundingClientRect();
//         var style  = window.getComputedStyle(target);
            
//         var div = document.createElement('div');
      
//         // div.classList.add('effect-ripple');
//         div.style.backgroundColor = "red";
//         div.style.height    = style.height;
//         div.style.width     = style.width;
//         div.style.top       = `${(event.clientY - offset.top)  - (parseInt(div.style.height) / 2)}px`;
//         div.style.left      = `${(event.clientX - offset.left) -  (parseInt(div.style.width) / 2)}px`;
//         console.log(style.height);
//         // if (target.classList.contains("light")) {
//         //     div.classList.add("effect-ripple-light");
//         // }
//         target.appendChild(div);

//         setTimeout(function() {
//             div.style.backgroundColor = "rgba(0, 0, 0, 0)";
//         }, 1300);

//         setTimeout(function() {
//             div.outerHTML = "";
//             delete div;
//         },1490);
//     }
// });
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

    console.log("ASS", Math.random() * (100))
    e = e.touches ? e.touches[0] : e;
    const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
    el.style.cssText = `--s: 0; --o: 1;`;
    el.offsetTop;
    el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
    }
});
// function addRipple() {
//   [].map.call(document.querySelectorAll('.ripple'), el => {
//       el.addEventListener('click', e => {
//           console.log("ASS", Math.random() * (100))
//           e = e.touches ? e.touches[0] : e;
//           const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
//           el.style.cssText = `--s: 0; --o: 1;`;
//           el.offsetTop;
//           el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
//       });
//   });
// }