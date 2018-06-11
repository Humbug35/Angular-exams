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
    this.fileList = event.target.files;
    console.log('FileList: ', this.fileList);
    const file = this.fileList[0];
    console.log('File: ', file);
    this.dataService.dbx.filesUpload({ path: '/' + file.name, contents: file })
      .then((theFile) => {
        console.log('Filen: ', theFile);
      })
      .catch((error) => {
        console.log('Ops här blev det fel ', error);
      });
  }
}
