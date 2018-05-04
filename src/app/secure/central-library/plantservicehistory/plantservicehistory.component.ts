import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-plantservicehistory',
  templateUrl: './plantservicehistory.component.html',
  styleUrls: ['./plantservicehistory.component.less'],
  providers: [ApiService]
})
export class PlantservicehistoryComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  records = 10;
  treeData = {
    "plantServiceClassificationMstrTOs": [
      {
        "select": false,
        "parentId": null,
        "item": false,
        "deleteFlag": true,
        "status": 1,
        "code": "",
        "name": "",
        "plantServiceClassificationMstrTOs": [],
        "level": 0,
        "leaf": true,
        "expand": true
      }
    ]
  };
  editDetails: any;
  constructor(private _service: ApiService, private _route: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    let request = { "status": "1" }
    this._service.PostService(request, '/centrallib/getPlantClassService')
      .subscribe(
      data => {
        this.List = data.plantServiceClassificationMstrTOs;
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
      "code": "",
      "name": "",
      "plantServiceClassificationMstrTOs": [],
      "level": level + 1,
      "leaf": true,
      "expand": true
    }
    if (type === 'delete') {
      // array.splice(index, howmany, item1, ....., itemX)
      if (i === undefined && j === undefined && k === undefined && l === undefined && m === undefined) {
        this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs.splice(0, 1);
      }
      if (j === undefined && k === undefined && l === undefined && m === undefined) {
        this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs.splice(i, 1);
      }
      else if (k === undefined && l === undefined && m === undefined) {
        this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs.splice(j, 1);
      }
      else if (l === undefined && m === undefined) {
        this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs.splice(k, 1);
      }
      else if (m === undefined) {
        this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs[k].plantServiceClassificationMstrTOs.splice(l, 1);
      }
      else {
        this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs[k].plantServiceClassificationMstrTOs[l].plantServiceClassificationMstrTOs.splice(m, 1);
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
          this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs.push(newJson);
          break;
        case 1:
          // newJson.code = `level 2-${i}`
          this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs.push(newJson);
          break;
        case 2:
          // newJson.code = `level 3-${j}`
          this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs.push(newJson);
          break;
        case 3:
          // newJson.code = `level 4-${k}`
          this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs[k].plantServiceClassificationMstrTOs.push(newJson);
          break;
        case 4:
          // newJson.code = `level 5-${l}`
          // this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs[k].plantServiceClassificationMstrTOs.push(newJson);
          this.treeData.plantServiceClassificationMstrTOs[0].plantServiceClassificationMstrTOs[i].plantServiceClassificationMstrTOs[j].plantServiceClassificationMstrTOs[k].plantServiceClassificationMstrTOs[l].plantServiceClassificationMstrTOs.push(newJson);
          break;

      }
    }

    console.log(this.treeData)
  }

  SaveData() {
    console.log(this.treeData);
    this._service.PostService(this.treeData, '/centrallib/savePlantClassService')
      .subscribe(data => {
        console.log(data);
        this.List = data.plantServiceClassificationMstrTOs;
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
          "plantServiceClassificationMstrTOs": [
            {
              "select": false,
              "parentId": null,
              "item": false,
              "deleteFlag": true,
              "status": 1,
              "code": "",
              "name": "",
              "plantServiceClassificationMstrTOs": [],
              "level": 0,
              "leaf": true,
              "expand": true
            }
          ]
        };
        $('#plantServiceCreate').modal('hide');
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
    this.treeData.plantServiceClassificationMstrTOs[0] = record;
    debugger;
    $('#plantServiceCreate').modal('show');
  }
}
