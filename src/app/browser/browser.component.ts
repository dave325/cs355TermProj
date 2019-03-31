import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      let screen = document.getElementById('screen-info');
      let location = document.getElementById('location-info');
      let navigator = document.getElementById('navigator-info');
      let geolocation = document.getElementById('geolocation-info');
      let el = document.createElement('p');
      el.innerHTML = "Height X Width: " + window.screen.height + "px X " + window.screen.width + "px <br>"
        + "Available height X width: " + window.screen.availHeight + "px X " + window.screen.availWidth + "px <br>"
        + "Color Depth: " + window.screen.colorDepth + "<br>"
        + "Pixel Depth: " + window.screen.pixelDepth + "<br"
        + "Window Height X Width: " + window.innerHeight + "px X " + window.innerWidth + "px";
      screen.appendChild(el);
      el = document.createElement('p');
      el.innerHTML = "href: " + window.location.href + "<br>"
        + "Hostname: " + window.location.hostname + "<br>"
        + "Pathname: " + window.location.pathname + "<br>"
        + "Protocol: " + window.location.protocol + "<br>"
      location.appendChild(el);
      el = document.createElement('p');
      el.innerHTML = "App Name: " + window.navigator.appName + "<br>"
        + "App Version: " + window.navigator.appVersion + "<br> "
        + "Product: " + window.navigator.product + "<br> "
        + "userAgent: " + window.navigator.userAgent + "<br> "
        + "Platform: " + window.navigator.platform + "<br> "
        + "Language: " + window.navigator.languages;
      navigator.appendChild(el);
      el = document.createElement('p');
      window.navigator.geolocation.getCurrentPosition(function (coords) {
        el.innerHTML = "Latitude: " + coords.coords.latitude + "<br>"
          + "Longitude: " + coords.coords.longitude;
      }, function (err) {
        el.innerHTML = "Geolocation not supported!";
      });
      geolocation.appendChild(el);

    }
  

}
