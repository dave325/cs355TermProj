import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  url;
  info;
  constructor(
    private http: HttpClient
  ) {
    this.url = "";
    this.info = null;
  }

  ngOnInit() {
  }
  private validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }
  submit() {
    if (this.validURL(this.url)) {
      this.http.post('/api/puppet', { url: this.url }).toPromise().then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else {
      this.info = "Invalid Url";
    }
  }
}
