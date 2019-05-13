import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phase5',
  templateUrl: './phase5.component.html',
  styleUrls: ['./phase5.component.scss']
})
export class Phase5Component implements OnInit {

  public formData = {
    term: "",
    isInsensitive: false,
    isPartialMatch:false
  };
   fileContents;
   selectedExportsIndex;
   selectedExports;
  private info;
  constructor(
    private http: HttpClient
  ) { 
    this.selectedExports = [];
    this.selectedExportsIndex = [];
  }

  ngOnInit() {
  }

  submitForm() {
    this.http.post('/api/search', this.formData).toPromise().then(
      (res) => {
        console.log(res)
        this.fileContents = res;
      },
      (err) => {
        console.log(err);
      }
    );
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
    if (this.fileContents.length > 0) {
      this.info = "No file selected";
      return;
    }
    if (this.selectedExports.length > 0) {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.selectedExports));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "info" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.fileContents));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "info" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  }

  submitCSV(): void {

    let csv;
    if (this.selectedExports.length > 0) {
      const items = this.selectedExports;
      //csv = "data:text/csv;charset=utf-8,";
      csv = "title, url, desription\r\n";
      for (let i = 0; i < this.selectedExports.length; i++) {
        csv += this.selectedExports[i].title + ",";
        csv += this.selectedExports[i].url + ",";
        csv += this.selectedExports[i].description + "\r\n";
      }
    } else {
      const items = this.fileContents;
      //csv = "data:text/csv;charset=utf-8,\r\n";
      for (let i = 0; i < this.fileContents.length; i++) {
        csv += this.fileContents[i].title + ",";
        csv += this.fileContents[i].url + ",";
        csv += this.fileContents[i].description + "\r\n";
      }
    }
    var link = document.createElement("a");
    csv = "data:text/csv;charset=utf-8;base64,"+ btoa(csv);
    link.setAttribute("href", csv);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    link.remove();
  }

  submitXML(): void {

    let a = document.createElement('a');
    if (this.selectedExports.length > 0) {
      let fileName = 'info.xml';
      let xmlStr = '<?xml version="1.0"?>\n';
      for (let i = 0; i < this.selectedExports.length; i++) {
        xmlStr += "<result>\n";
        xmlStr += "<title>" + this.selectedExports[i].title.replace(/&/g, "&amp;") + "</title>\n";
        xmlStr += "<url>" + this.selectedExports[i].url.replace(/&/g, "&amp;") + "</url>\n";
        xmlStr += "<description>" + this.selectedExports[i].description.replace(/&/g, "&amp;") + "</description>\n";
        xmlStr += "</result>\n";
      }
      xmlStr += '</results>';
      a.download = fileName;
      a.href = URL.createObjectURL(new File([xmlStr], fileName, { type: 'text/xml' }));
    } else {
      let fileName = 'info.xml';
      let xmlStr = '<?xml version="1.0"?> <results>\n';
      for (let i = 0; i < this.fileContents.length; i++) {
        xmlStr += "<result>\n";
        xmlStr += "<title>" + this.fileContents[i].title.replace(/&/g, "&amp;") + "</title>\n";
        xmlStr += "<url>" + this.fileContents[i].url.replace(/&/g, "&amp;") + "</url>\n";
        xmlStr += "<description>" + this.fileContents[i].description.replace(/&/g, "&amp;") + "</description>\n";
        xmlStr += "</result>\n";
      }
      xmlStr += '</results>';
      a.download = fileName;
      a.href = URL.createObjectURL(new File([xmlStr], fileName, { type: 'text/xml' }));
    }
    a.click();
    a.remove();
  }

  csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  // JSON to CSV Converter
  ConvertToCSV(objArray) {
    const items = objArray;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n');
    csv.replace(/['"]+/g, '');
    return csv;
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

        for (var m in v) {
          if (m.charAt(0) == "@")
            xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
          else
            hasChild = true;
        }
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
          console.log(name);
        }
      }
      else {
        xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
        console.log(name);
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
