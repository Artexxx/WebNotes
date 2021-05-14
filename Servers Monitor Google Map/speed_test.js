function $(element) {
  return document.getElementById(element);
}

var speedTest = {};

speedTest.servers = null;
speedTest.map = null;
speedTest.markerClusterer = null;
speedTest.markers = [];
speedTest.infoWindow = null;

speedTest.init = function () {
  var latlng = new google.maps.LatLng(39.91, 116.38);
  var options = {
    'zoom': 2,
    'minZoom': 2,
    'center': latlng,
    'disableDefaultUI': true,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
  };
  speedTest.map = new google.maps.Map($('map'), options);
  speedTest.servers = data.servers;
  var useGmm = $('usegmm');
  google.maps.event.addDomListener(useGmm, 'click', speedTest.change);
  speedTest.infoWindow = new google.maps.InfoWindow();

  speedTest.showMarkers();
  speedTest.ImportSearchLib()
  speedTest.ImportLegendLib()
};

speedTest.showMarkers = function () {
  speedTest.markers = [];

  // Включение кластеризации
  var type = 1;
  if ($('usegmm').checked) {
    type = 0;
  }
  if (speedTest.markerClusterer) {
    speedTest.markerClusterer.clearMarkers();
  }


  var panel = $('markerlist'); panel.innerHTML = "";

  for (var i = 0; i < speedTest.servers.length; i++) {
    var titleText = speedTest.servers[i].title;
    var statusText = speedTest.servers[i].status_text;
    var statusColor = speedTest.servers[i].status_color;
    var markerColor = speedTest.servers[i].marker_color.replace("#", "");
    var ipportText = speedTest.servers[i].ipport;

    var item = document.createElement('tr');
    // 1 колонка - статус
    var status = document.createElement('td');
    // 2 колонка - название
    var title = document.createElement('td');
    // 3 колонка - IP:Порт
    var ipport = document.createElement('td');

    status.className = "status";
    status.innerHTML = `<span class="label" style="background-color:${statusColor}">${statusText}</span>`

    title.href = '#';
    title.className = 'title';
    Array.prototype.sample = function () { return this[Math.floor(Math.random() * this.length)]; }
    title.innerHTML = `<span class="flag-icon flag-icon-${["ru", "ru", "ru", "ru", "gb", "ua"].sample()}"></span>${titleText}`;

    ipport.className = "ipport";
    ipport.innerHTML = `<span class="ipport_text">62.122.215.21:81</span>`;
    
    item.appendChild(status);
    item.appendChild(title);
    item.appendChild(ipport);
    panel.appendChild(item);

    var latLng = new google.maps.LatLng(speedTest.servers[i].latitude, speedTest.servers[i].longitude);

    var imageUrl = `http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=FFFFFF,${markerColor},000000&ext=.png`

    var markerImage = new google.maps.MarkerImage(imageUrl,
      new google.maps.Size(24, 32));

    var marker = new google.maps.Marker({
      'position': latLng,
      'icon': markerImage,
      "animation": google.maps.Animation.DROP,
    });

    var fn = speedTest.markerClickFunction(speedTest.servers[i], latLng, statusColor, statusText);
    google.maps.event.addListener(marker, 'click', fn);
    google.maps.event.addDomListener(item, 'click', fn);
    speedTest.markers.push(marker);
  }


  window.setTimeout(speedTest.time, 0);
};

speedTest.markerClickFunction = function (server, latlng) {
  return function (e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    var color_info = "#31ccec";
    var color_warning = "#f2c037";
    var color_error = "#f44336";

    var infoHtml =
      `<div class="info">
  <div style="padding-left:10px;">
      <div class="info__title_wrap">
        <h3 class="info_title_text two_line_ellipsis"> ${server.title}</h3>
      </div>
      <div class="info__sector_wrap">
        <span class="info__sector_title">
        Server Status
        </span>
        <span class="label" style="background-color:${server.status_color}; float: right;">
        ${server.status_text}
        </span>
      </div>
      <div class="info__sector_wrap">
        <span class="info__sector_title">
        Pooling IP Adress
        </span>
        <span style="float:right;">
        62.122.215.70
        </span>
      </div>

      <div class="info__sector_wrapside">
      <i class="fa fa-windows info__sector_first_col" style="color:gray;font-size:20px;"></i>
      <div class="info__sector_main">
        <span class="info__sector_main_row1 info__sector_title">
        Machine Type
        </span>
        <div class="info__sector_main_row2 ellipsis">
        Windows 2017 R4 Server
        </div>
      </div>
      </div>
  </div>   
<hr class="gradient_style">
      <div class="ripple info__sector_wrapside info__sector_wrapside_hover">
        <i class="fa material-icons info__sector_first_col" style="color:gray;">select_all</i>
      <div class="info__sector_main">
        <div class="info__sector_main_row1 info__sector_title">
        CPU load
        <span style="float:right">93%</span>
        </div>
        <div class="info__sector_main_row2 progress_bar" style="color:red">
          <div class="progress_bar_track"></div>
          <div class="progress_bar_model" style="width:93%"></div>
        </div>
      </div>
      </div>

      <div class="ripple info__sector_wrapside info__sector_wrapside_hover">
        <i class="fa material-icons info__sector_first_col" style="color:gray;">memory</i>
      <div class="info__sector_main">
        <div class="info__sector_main_row1 info__sector_title">
        Memory Used
        <span style="float:right">72%</span>
        </div>
        <div class="info__sector_main_row2 progress_bar" style="color:yellow">
          <div class="progress_bar_track"></div>
          <div class="progress_bar_model" style="width:72%"></div>
        </div>
      </div>
      </div>
      
      <div class="ripple info__sector_wrapside info__sector_wrapside_hover">
        <i class="fa material-icons info__sector_first_col" style="color:gray;">slow_motion_video</i>
       <div class="info__sector_main" style="justify-content: center;">
        <div class="info__sector_main_row1">
        <span class="info__sector_title">Average Ping</span>
        <span style="float:right">14ms</span>
        </div>
      </div>
      </div>
      
<hr class="gradient_style">

      <div class="ripple info__sector_wrapside info__sector_wrapside_hover">
        <i class="fa material-icons info__sector_first_col" style="color:${color_warning};">warning</i>
      <div class="info__sector_main" style="justify-content: center;">
        <div class="info__sector_main_row1">
          <span class="info__sector_title two_line_ellipsis">Admin Password</span>
          <time style="float:right">17:04</time>
        </div>
        <div class="info__sector_main_row2 ellipsis">
        public abstract boolean com.manage.service.account.IAdminManageService.updateAdminPassword(long,java.lang.String,java.lang.String)
        </div>
      </div>
      </div>

      <div class="ripple info__sector_wrapside info__sector_wrapside_hover">
        <i class="fa material-icons info__sector_first_col" style="color:${color_error};">error</i>
      <div class="info__sector_main" style="justify-content: center;">
        <div class="info__sector_main_row1">
          <span class="info__sector_title two_line_ellipsis">Admin Manage Service Admin Manage ServiceAdmin Manage Service</span>
          <time style="float:right">17:04</time>
        </div>
        <div class="info__sector_main_row2 ellipsis">
        public abstract boolean com.manage.service.account.IAdminManageService.updateAdminPassword(long,java.lang.String,java.lang.String)
        </div>
      </div>
      </div>
      
      <div  class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.ASS()">
        <i class="fa material-icons info__sector_first_col" style="color:${color_info};">info</i>
      <div class="info__sector_main" style="justify-content: center;">
        <div class="info__sector_main_row1">
          <span class="info__sector_title two_line_ellipsis">New version 1.2.5</span>
          <time style="float:right">17:04</time>
        </div>
        <div class="info__sector_main_row2 ellipsis">
        public abstract boolean com.manage.service.account.IAdminManageService.updateAdminPassword(long,java.lang.String,java.lang.String)
        </div>
      </div>
      </div>
<hr class="gradient_style">
  Ссылка: <a href="#" target="_blank">TODO</a>
  </div>`;

    speedTest.infoWindow.setContent(infoHtml);
    speedTest.infoWindow.setPosition(latlng);

    speedTest.infoWindow.open(speedTest.map);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    google.maps.event.addListener(speedTest.map, 'click', function () {
      speedTest.infoWindow.close();
    });
  };
};


speedTest.clear = function () {
  $('timetaken').innerHTML = 'cleaning...';
  for (var i = 0, marker; marker = speedTest.markers[i]; i++) {
    marker.setMap(null);
  }
};

speedTest.change = function () {
  speedTest.clear();
  speedTest.showMarkers();
};

speedTest.time = function () {
  $('timetaken').innerHTML = 'timing...';
  var start = new Date();
  if ($('usegmm').checked) {
    speedTest.markerClusterer = new MarkerClusterer(speedTest.map, speedTest.markers, { imagePath: 'images/m' });
  } else {
    for (var i = 0, marker; marker = speedTest.markers[i]; i++) {
      marker.setMap(speedTest.map);
    }
  }
  var end = new Date();
  $('timetaken').innerHTML = end - start;
};

speedTest.ImportLegendLib = function () {
  var legend = $('legend')
  legend.innerHTML += `<i style="background: #477AC2"></i><span>Low</span><br><i style="background: #448D40"></i><span>Medium</span><br><i style="background: #E6E696"></i><span>High</span><br><i style="background: #E8E6E0"></i><span>Full</span><br><i style="background: #FFFFFF"></i><span>Down</span><br>`
  speedTest.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

  setTimeout(function () { legend.classList.add('show_legend'); }, 900);
}
speedTest.ASS = function () {
  alert("ASS");
}

speedTest.ImportSearchLib = function () {
  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
    $('pac-input'));
  speedTest.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function () {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    // For each place, get the icon, place name, and location.
    // markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      // Create a marker for each place.
      // position: place.geometry.location
      bounds.extend(place.geometry.location);
    }
    speedTest.map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(speedTest.map, 'bounds_changed', function () {
    var bounds = speedTest.map.getBounds();
    searchBox.setBounds(bounds);
  });
}

