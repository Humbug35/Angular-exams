import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  fileList: FileList;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {}

  upLoadFile(event) {
    let results = document.getElementById('file-progress');
    let url = decodeURI(this.router.url);
    if (url === "/") { url = ""; }
    this.fileList = event.target.files;
    const file = this.fileList[0];
    const urlPath = url + '/' + file.name;
    results.classList.add('loading');
    results.innerHTML = 'Upload in progress...';
    this.dataService.dbx.filesUpload({ path: urlPath, contents: file })
      .then(() => {
        this.dataService.getItems(url);
        results.classList.remove('loading');
        results.classList.add('success');
        results.innerHTML = 'File Uploaded!';
        setTimeout(() => {
          results.classList.remove('success');
          results.innerHTML = '';
        }, 3000);
      })
      .catch((error) => {
        results.classList.remove('loading');
        results.classList.add('fail');
        results.innerHTML = 'Error, try again.';
        setTimeout(() => {
          results.classList.remove('fail');
          results.innerHTML = '';
        }, 3000);
      });
  }
}
