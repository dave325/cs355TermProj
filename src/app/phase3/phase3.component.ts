import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { rejects } from 'assert';

@Component({
  selector: 'app-phase3',
  templateUrl: './phase3.component.html',
  styleUrls: ['./phase3.component.scss']
})
export class Phase3Component implements OnInit {

  private fileContents;
  private selectedExportsIndex;
  private selectedExports;
  constructor(private http: HttpClient) {
    this.selectedExports = [];
    this.selectedExportsIndex = [];
  }

  ngOnInit() {
  }
  displayResults(files: FileList): void {

    const fileInput = document.getElementById('test');
    if (fileInput) {
      let file = files.item(0);
      if (file.name.split(".")[1] === "csv" || file.type === "text/xml" || file.type === "application/json") {
        if (file.type == "application/json") {
          let fileReader = new FileReader();

          fileReader.onload = (e: any) => {
            this.fileContents = JSON.parse(e.target.result);
          }
          this.fileContents = JSON.stringify(this.fileContents);
          fileReader.readAsText(file);
        } else if (file.type === "text/xml") {
          let fileReader = new FileReader();

          let newFile = new Promise((resolve, reject) => {

            fileReader.onload = (e: any) => {
              let temp = new DOMParser().parseFromString(e.target.result, "text/xml");
              resolve(JSON.parse(this.xml2json(temp, "")).root);
            }

          });
          newFile.then((res) => {
            this.fileContents = res;
            console.log(res)
          })
          fileReader.readAsText(file);
        }else{
          let fileReader = new FileReader();

          let newFile = new Promise((resolve, reject) => {

            fileReader.onload = (e: any) => {
              resolve(JSON.parse(this.csvJSON(e.target.result)));
            }

          });
          newFile.then((res) => {
            this.fileContents = res;
            console.log(res)
          })
          fileReader.readAsText(file);
        }
      } else {
        document.getElementById("result").innerHTML = "File type not supported!"
      }

    }
  }

  updateInfo(i: number) {
    let temp;
    if (this.selectedExportsIndex.includes(i)) {
      temp = this.selectedExportsIndex.indexOf(0);
      this.selectedExportsIndex.splice(temp, 1);
      this.selectedExports.splice(temp, 1);
      return;
    }
    this.selectedExportsIndex.push(i);
    this.selectedExports.push(this.fileContents[i]);
  }
  submit(): void {
    console.log(this.selectedExportsIndex);
    console.log(this.selectedExports)
  }
  csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  /*	This work is licensed under Creative Commons GNU LGPL License.
  
    License: http://creativecommons.org/licenses/LGPL/2.1/
     Version: 0.9
    Author:  Stefan Goessner/2006
    Web:     http://goessner.net/ 
  */
  json2xml(o, tab) {
    var toXml = function (v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
        for (var i = 0, n = v.length; i < n; i++)
          xml += ind + toXml(v[i], name, ind + "\t") + "\n";
      }
      else if (typeof (v) == "object") {
        var hasChild = false;
        xml += ind + "<" + name;
        for (var m in v) {
          if (m.charAt(0) == "@")
            xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
          else
            hasChild = true;
        }
        xml += hasChild ? ">" : "/>";
        if (hasChild) {
          for (var m in v) {
            if (m == "#text")
              xml += v[m];
            else if (m == "#cdata")
              xml += "<![CDATA[" + v[m] + "]]>";
            else if (m.charAt(0) != "@")
              xml += toXml(v[m], m, ind + "\t");
          }
          xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
        }
      }
      else {
        xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
      }
      return xml;
    }, xml = "";
    for (var m in o)
      xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
  }
  xml2json(xml, tab) {
    var X = {
      toObj: function (xml) {
        var o = {};
        if (xml.nodeType == 1) {   // element node ..
          if (xml.attributes.length)   // element with attributes  ..
            for (var i = 0; i < xml.attributes.length; i++)
              o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
          if (xml.firstChild) { // element has child nodes ..
            var textChild = 0, cdataChild = 0, hasElementChild = false;
            for (var n = xml.firstChild; n; n = n.nextSibling) {
              if (n.nodeType == 1) hasElementChild = true;
              else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
              else if (n.nodeType == 4) cdataChild++; // cdata section node
            }
            if (hasElementChild) {
              if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                X.removeWhite(xml);
                for (var n = xml.firstChild; n; n = n.nextSibling) {
                  if (n.nodeType == 3)  // text node
                    o["#text"] = X.escape(n.nodeValue);
                  else if (n.nodeType == 4)  // cdata node
                    o["#cdata"] = X.escape(n.nodeValue);
                  else if (o[n.nodeName]) {  // multiple occurence of element ..
                    if (o[n.nodeName] instanceof Array)
                      o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                    else
                      o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                  }
                  else  // first occurence of element..
                    o[n.nodeName] = X.toObj(n);
                }
              }
              else { // mixed content
                if (!xml.attributes.length)
                  o = X.escape(X.innerXml(xml));
                else
                  o["#text"] = X.escape(X.innerXml(xml));
              }
            }
            else if (textChild) { // pure text
              if (!xml.attributes.length)
                o = X.escape(X.innerXml(xml));
              else
                o["#text"] = X.escape(X.innerXml(xml));
            }
            else if (cdataChild) { // cdata
              if (cdataChild > 1)
                o = X.escape(X.innerXml(xml));
              else
                for (var n = xml.firstChild; n; n = n.nextSibling)
                  o["#cdata"] = X.escape(n.nodeValue);
            }
          }
          if (!xml.attributes.length && !xml.firstChild) o = null;
        }
        else if (xml.nodeType == 9) { // document.node
          o = X.toObj(xml.documentElement);
        }
        else
          alert("unhandled node type: " + xml.nodeType);
        return o;
      },
      toJson: function (o, name, ind) {
        var json = name ? ("\"" + name + "\"") : "";
        if (o instanceof Array) {
          for (var i = 0, n = o.length; i < n; i++)
            o[i] = X.toJson(o[i], "", ind + "\t");
          json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
        }
        else if (o == null)
          json += (name && ":") + "null";
        else if (typeof (o) == "object") {
          var arr = [];
          for (var m in o)
            arr[arr.length] = X.toJson(o[m], m, ind + "\t");
          json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
        }
        else if (typeof (o) == "string")
          json += (name && ":") + "\"" + o.toString() + "\"";
        else
          json += (name && ":") + o.toString();
        return json;
      },
      innerXml: function (node) {
        var s = ""
        if ("innerHTML" in node)
          s = node.innerHTML;
        else {
          var asXml = function (n) {
            var s = "";
            if (n.nodeType == 1) {
              s += "<" + n.nodeName;
              for (var i = 0; i < n.attributes.length; i++)
                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
              if (n.firstChild) {
                s += ">";
                for (var c = n.firstChild; c; c = c.nextSibling)
                  s += asXml(c);
                s += "</" + n.nodeName + ">";
              }
              else
                s += "/>";
            }
            else if (n.nodeType == 3)
              s += n.nodeValue;
            else if (n.nodeType == 4)
              s += "<![CDATA[" + n.nodeValue + "]]>";
            return s;
          };
          for (var c = node.firstChild; c; c = c.nextSibling)
            s += asXml(c);
        }
        return s;
      },
      escape: function (txt) {
        return txt.replace(/[\\]/g, "\\\\")
          .replace(/[\"]/g, '\\"')
          .replace(/[\n]/g, '\\n')
          .replace(/[\r]/g, '\\r');
      },
      removeWhite: function (e) {
        e.normalize();
        for (var n = e.firstChild; n;) {
          if (n.nodeType == 3) {  // text node
            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
              var nxt = n.nextSibling;
              e.removeChild(n);
              n = nxt;
            }
            else
              n = n.nextSibling;
          }
          else if (n.nodeType == 1) {  // element node
            X.removeWhite(n);
            n = n.nextSibling;
          }
          else                      // any other node
            n = n.nextSibling;
        }
        return e;
      }
    };
    if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
  }
}
