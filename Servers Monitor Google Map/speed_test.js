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

    var fn = speedTest.markerClickFunction(speedTest.servers[i], latLng);
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
      <div class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.showModalWindow()">
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

      <div class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.showModalWindow()">
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
      
      <div class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.showModalWindow()">
        <i class="fa material-icons info__sector_first_col" style="color:gray;">slow_motion_video</i>
       <div class="info__sector_main" style="justify-content: center;">
        <div class="info__sector_main_row1">
        <span class="info__sector_title">Average Ping</span>
        <span style="float:right">14ms</span>
        </div>
      </div>
      </div>
      
<hr class="gradient_style">

      <div class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.showModalWindow()">
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

      <div class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.showModalWindow()">
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
      
      <div  class="ripple info__sector_wrapside info__sector_wrapside_hover" onclick="speedTest.showModalWindow()">
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


speedTest.showModalWindow = function() {
  var title = "Server-1",
    ip = "192.168.112.101"
    time = "2021-05-09 18:47:27";
    error = `com.exception.XingfuException: Account_AdminAccountId_NotExist
    at com.manage.error.AccountServiceError.error(AccountServiceError.java:135)
    at com.manage.service.account.impl.AdminManageService.checkAdminAcount(AdminManageService.java:123)
    at com.manage.service.account.impl.AdminManageService.updateAdminPassword(AdminManageService.java:56)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
    at java.lang.reflect.Method.invoke(Method.java:606)
    at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:302)
    at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
    at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
    at org.springframework.aop.aspectj.AspectJAfterThrowingAdvice.invoke(AspectJAfterThrowingAdvice.java:59)
    at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
    at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:99)
    at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:281)
    at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:96)
    at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
    at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
    at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
    at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:208)
    at com.sun.proxy.$Proxy42.updateAdminPassword(Unknown Source)
    at com.manage.rest.maintain.account.AdminManageController.updateAdminPassword(AdminManageController.java:208)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
    at java.lang.reflect.Method.invoke(Method.java:606)
    at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:221)
    at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:136)
    at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:110)
    at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:817)
    at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:731)
    at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:85)
    at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:959)
    at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:893)
    at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:968)
    at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:870)
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:650)
    at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:844)
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:731)
    at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:303)
    at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
    at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
    at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
    at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:330)
    at org.springframework.security.web.access.intercept.FilterSecurityInterceptor.invoke(FilterSecurityInterceptor.java:118)
    at org.springframework.security.web.access.intercept.FilterSecurityInterceptor.doFilter(FilterSecurityInterceptor.java:84)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:113)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:103)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:113)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:154)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:45)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:199)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:110)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:50)
    at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:87)
    at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)
    at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:192)
    at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:160)
    at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:346)
    at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:262)
    at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
    at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
    at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:121)
    at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
    at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
    at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
    at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:220)
    at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:122)
    at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:505)
    at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:169)
    at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:103)
    at org.apache.catalina.valves.AccessLogValve.invoke(AccessLogValve.java:956)
    at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:116)
    at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:436)
    at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1078)
    at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:625)
    at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:316)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
    at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
    at java.lang.Thread.run(Thread.java:745)`

    var modalWindow =
  `<!-- Modal -->
  <div class="modal" id="modal-name">
    <div class="modal__sandbox" onclick="speedTest.closeModalWindow()"></div>
    <div class="modal__box">
      <div class="modal__header">
      <!--Column 1-->
      <div style="display:flex;flex-direction:row;">
        <button class="modal__close" onclick="speedTest.closeModalWindow()">&#10006;</button>
        <span style="font-size : 1.4em;margin-top: auto;margin-bottom: auto;">
          【ERROR】
          ${title + ' ' + ip}
          </span>
      </div>
      <!--Column 2-->
      <time> ${time} </time>
  </div><!--Header-->
  
  <div class="modal__body">
    <dl>
     <dt> <span> Exception Information </span> </dt>
     <dd>public abstract boolean com.manage.service.account.IAdminManageService.updateAdminPassword(long,java.lang.String,java.lang.String) </dd>
      
     <dt> <span> User Information </span> </dt>
     
      <dd class="dd__item_wrap"> <div class="dd__item_title"> User ID：</div> 13123456789</dd>
      <dd class="dd__item_wrap"> <div class="dd__item_title">Equipment UUID:</div> f64f2940-fae4-11e7 </dd>
      <dd class="dd__item_wrap"> <div class="dd__item_title">Device Model ：</div> Android 7 </dd>
      <dd class="dd__item_wrap"> <div class="dd__item_title">Client IP:</div> 192.168.0.1 </dd>
      <dd class="dd__item_wrap"> <div class="dd__item_title">Client version number:</div> 1.0.0 </dd>
      
    <dt> <span> Exception Stack </span> </dt>
    <dd>
      ${error}
    </dd>
    </dl>
      </div> <!-- Body -->
    </div> <!-- Body -->
  </div> <!-- Modal -->
  `
  var elem = document.createElement('modal');
  elem.innerHTML = modalWindow;
  document.body.append(elem);
}

speedTest.closeModalWindow = function() {
  var modal = $('modal-name');
  if (!modal.classList.contains('close')) {
    console.log()
    modal.classList.add('close');
    setTimeout(function close() {
        modal.classList.add('hidden');
      modal.parentNode.removeChild(modal);
    }, 400);
  }

}
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

