import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phase3',
  templateUrl: './phase3.component.html',
  styleUrls: ['./phase3.component.scss']
})
export class Phase3Component implements OnInit {

  private fileContents;
  constructor() { }

  ngOnInit() {
  }
  displayResults(files: FileList): void {

    const fileInput = document.getElementById('test');
    if (fileInput) {
      let file = files.item(0);
      if (file.type === "text/csv" || file.type === "text/xml" || file.type === "application/json") {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = (e) => {
          this.fileContents = fileReader.result;
        }
      } else {
        document.getElementById("result").innerHTML = "File type not supported!"
      }

    }
  }
}
