import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HandleloadService {
  fileList: FileList;

  constructor(private dataService: DataService) { }

  upLoadFile(event) {
    console.log('Kommer vi hit?');
    this.fileList = event.target.files;
    console.log('Hit då?');
    const file = this.fileList[0];
    console.log('Hoppas vi kommer hit');
    this.dataService.dbx.filesUpload({ path: '/' + file.name, contents: file })
      .then((theFile) => {
        console.log('Filen: ', theFile);
      })
      .catch((error) => {
        console.log('Ops här blev det fel ', error);
      });
  }
}
