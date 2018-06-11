import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleloadService {
  fileList: FileList;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

upLoadFile(event) {
  let url = this.router.url;
  this.fileList = event.target.files;
  const file = this.fileList[0];
  const urlPath = this.router.url + '/' + file.name;
  if (url === "/") { url = ""; }
  this.dataService.dbx.filesUpload({ path: urlPath, contents: file })
    .then((theFile) => {
      console.error('DONE!')
      this.dataService.getItems(this.router.url);
    })
    .catch((error) => {
      console.log('Ops här blev det fel ', error);
    });
  }
}
