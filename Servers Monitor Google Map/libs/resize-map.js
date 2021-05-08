
function $(element) {
  return document.getElementById(element);
}
var res = {} 
var hres = {} 
var vres = {} 
var fullWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var fullHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

window.onload = function() 
{   
  // horizontal------------------------\
  hres.p = $("panel");
  hres.d = $("map-container");
  hres.r = $("resize-horizontal");
  hres.curr_width =  hres.p.offsetWidth;
  hres.unlock = false;
  
  hres.r.addEventListener('mousedown', hres.mousedown, false);
  // horizontal------------------------/
  
  // vertical------------------------\
  vres.p = $("panel");
  vres.p2 = $("markerlist");
  vres.d = $("map");
  vres.r = $("resize-vertical");
  vres.curr_height =  vres.d.offsetHeight;
  vres.unlock = false;
  vres.r.addEventListener('mousedown', vres.mousedown, false);
  // vertical------------------------/
  
  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', mouseup, false);
  res.onselectstartF = document.onselectstart;
}

function mousemove(e) 
{
  var change =  hres.curr_width + (e.clientX - hres.curr_width);
  var vchange =  vres.curr_height + (e.clientY- vres.curr_height);

  if( hres.unlock) {
      if(change > 410) {
        if (change < fullWidth*0.5){
          hres.p.style.width = change + 'px';
          hres.d.style.marginLeft  =  change + 'px';
        }
      }
      else {
        hres.p.style.width = '410px';
        hres.d.style.marginLeft  =  '410px';
        }
    }
  if( vres.unlock) {
      if(vchange > 550) {
        if (vchange < fullHeight-200){
          vres.p.style.height = vchange + 'px';
          vres.p2.style.height = vchange - 150 + 'px';
          vres.d.style.height  =  vchange + 'px';
        }
      }
      else {
        vres.d.style.height = '550px';
        vres.p.style.height = '550px';
        vres.p2.style.height = '400px';
        // hres.d.style.marginLeft  =  '200px';
        }
    }
  };
vres.mousedown = function(e) {
  document.onselectstart = () => {
    return false; // cancel selection
  };
  e.onselectstart = function() {
    return false;
  };

  vres.curr_height = vres.d.offsetHeight;
  vres.unlock = true;
};

hres.mousedown = function(e) {
    document.onselectstart = () => {
      return false; // cancel selection
    };
    e.onselectstart = function() {
      return false;
    };
    hres.curr_width = hres.p.offsetWidth;
    hres.unlock = true;
};
function outmousedown(e) {
  if(hres.unlock) {
    e.preventDefault();
  }
};
function mouseup(e) {
  hres.unlock = false;
  vres.unlock = false;
  document.onselectstart = res.onselectstartF;
};
