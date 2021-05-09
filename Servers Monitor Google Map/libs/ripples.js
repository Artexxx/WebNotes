document.body.addEventListener("mousedown", function(event) {
    var target = event.target;

    while (target) {
      if (!target.classList || !target.classList.contains("ripple")) {
        target = target.parentNode;
      }
      else {
        break;
      }
    }

    if (target && target.classList.contains("ripple")) {
        var offset = target.getBoundingClientRect();
        var style  = window.getComputedStyle(target);
            
        var div = document.createElement('div');
      
        div.classList.add('effect-ripple');
        
        div.style.height    = style.height;
        div.style.width     = style.height;
        div.style.top       = `${(event.clientY - offset.top)  - (parseInt(div.style.height) / 2)}px`;
        div.style.left      = `${(event.clientX - offset.left) -  (parseInt(div.style.width) / 2)}px`;
        
        if (target.classList.contains("light")) {
            div.classList.add("effect-ripple-light");
        }
        target.appendChild(div);

        setTimeout(function() {
            div.style.backgroundColor = "rgba(0, 0, 0, 0)";
        }, 1300);

        setTimeout(function() {
            div.outerHTML = "";
            delete div;
        },1490);
    }
});