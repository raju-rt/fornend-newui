import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-eps',
  templateUrl: './eps.component.html',
  styleUrls: ['./eps.component.less'],
  providers: [ApiService]
})
export class EpsComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  editDetails: any;
  records = 10;
  treeData = {
    "projs": [{
      "select": false,
      "parentId": null,
      "item": false,
      "deleteFlag": true,
      "status": 1,
      "projCode": "",
      "projName": "",
      "childProjs": [],
      "level": 0,
      "leaf": true,
      "expand": true
    }
    ]
  }
  constructor(private _service: ApiService, private _route: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    let request = { "status": "1" }
    this._service.PostService(request, '/projectlib/getEPSOnly')
      .subscribe(
      data => {
        this.List = data.ePSProjectTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        setTimeout(() => {
          jQuery('.addicon').click(function (d) {
            // debugger;
            console.log("fdgdfg");
            d.stopPropagation();
            jQuery(this).parents('header').siblings('ul').toggle();
            jQuery(this).toggleClass('active');

          });
        }, 500);


      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  selectedRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedlist.push(code);
    } else {
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }
  treeJsonBuilder(level, type, i?, j?, k?, l?, m?) {
    const newJson = {
      "select": false,
      "parentId": null,
      "item": false,
      "deleteFlag": true,
      "status": 1,
      "projCode": "",
      "projName": "",
      "childProjs": [],
      "level": level + 1,
      "leaf": true,
      "expand": true
    }
    if (type === 'delete') {
      // array.splice(index, howmany, item1, ....., itemX)
      if (i === undefined && j === undefined && k === undefined && l === undefined && m === undefined) {
        this.treeData.projs[0].childProjs.splice(0, 1);
      }
      if (j === undefined && k === undefined && l === undefined && m === undefined) {
        this.treeData.projs[0].childProjs.splice(i, 1);
      }
      else if (k === undefined && l === undefined && m === undefined) {
        this.treeData.projs[0].childProjs[i].childProjs.splice(j, 1);
      }
      else if (l === undefined && m === undefined) {
        this.treeData.projs[0].childProjs[i].childProjs[j].childProjs.splice(k, 1);
      }
      else if (m === undefined) {
        this.treeData.projs[0].childProjs[i].childProjs[j].childProjs[k].childProjs.splice(l, 1);
      }
      else {
        this.treeData.projs[0].childProjs[i].childProjs[j].childProjs[k].childProjs[l].childProjs.splice(m, 1);
      }

    }
    else {

      if (type === 'addLeaf') {
        newJson.expand = false;
        newJson.leaf = false;
      }

      switch (level) {
        case 0:

          // newJson.code = `level 1-0`
          this.treeData.projs[0].childProjs.push(newJson);
          break;
        case 1:
          // newJson.code = `level 2-${i}`
          this.treeData.projs[0].childProjs[i].childProjs.push(newJson);
          break;
        case 2:
          // newJson.code = `level 3-${j}`
          this.treeData.projs[0].childProjs[i].childProjs[j].childProjs.push(newJson);
          break;
        case 3:
          // newJson.code = `level 4-${k}`
          this.treeData.projs[0].childProjs[i].childProjs[j].childProjs[k].childProjs.push(newJson);
          break;
        case 4:
          // newJson.code = `level 5-${l}`
          // this.treeData.projs[0].childProjs[i].childProjs[j].childProjs[k].childProjs.push(newJson);
          this.treeData.projs[0].childProjs[i].childProjs[j].childProjs[k].childProjs[l].childProjs.push(newJson);
          break;

      }
    }

    console.log(this.treeData)
  }

  SaveData() {
    console.log(this.treeData);
    this._service.PostService(this.treeData, '/projectlib/saveEpsStacture')
      .subscribe(data => {
        console.log(data);
        this.List = data.epsProjs;
        this.List.forEach(element => {
          element.checked = false;
        });
        setTimeout(() => {
          jQuery('.addicon').click(function (d) {
            // debugger;
            console.log("fdgdfg");
            d.stopPropagation();
            jQuery(this).parents('header').siblings('ul').toggle();
            jQuery(this).toggleClass('active');

          });
        }, 500);
        this.treeData = {
          "projs": [{
            "select": false,
            "parentId": null,
            "item": false,
            "deleteFlag": true,
            "status": 1,
            "projCode": "",
            "projName": "",
            "childProjs": [],
            "level": 0,
            "leaf": true,
            "expand": true
          }
          ]
        };
        $('#projCode').modal('hide');
      },
      error => {
        console.log(error);

      },
      () => {
        console.log('call successfull')
      })
  }
  editRecord(record) {
    this.editDetails = record;
    this.treeData.projs[0] = record;
    debugger;
    $('#projCode').modal('show');
  }
}
