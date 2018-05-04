import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-asset-maintenance-category',
  templateUrl: './asset-maintenance-category.component.html',
  styleUrls: ['./asset-maintenance-category.component.less'],
  providers: [ApiService]
})
export class AssetMaintenanceCategoryComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  editDetails: any;
  records = 10;
  treeData = {
    "assetMaintenanceCategoryTOs": [{
      "select": false,
      "parentId": null,
      "item": false,
      "deleteFlag": true,
      "status": 1,
      "code": "",
      "name": "",
      "childAssetMaintenanceCategoryTOs": [],
      "level": 0,
      "leaf": true,
      "expand": true
    }
    ]
  }
  request = { "status": "1" }
  constructor(private _service: ApiService, private _route: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._service.PostService(this.request, '/centrallib/getAssetMaintenanceCategory')
      .subscribe(
      data => {
        this.List = data.assetMaintenanceCategoryTOs;
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
      "childAssetMaintenanceCategoryTOs": [],
      "level": level + 1,
      "leaf": true,
      "expand": true
    }
    if (type === 'delete') {
      // array.splice(index, howmany, item1, ....., itemX)
      if (i === undefined && j === undefined && k === undefined && l === undefined && m === undefined) {
        this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs.splice(0, 1);
      }
      if (j === undefined && k === undefined && l === undefined && m === undefined) {
        this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs.splice(i, 1);
      }
      else if (k === undefined && l === undefined && m === undefined) {
        this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs.splice(j, 1);
      }
      else if (l === undefined && m === undefined) {
        this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs.splice(k, 1);
      }
      else if (m === undefined) {
        this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs[k].childAssetMaintenanceCategoryTOs.splice(l, 1);
      }
      else {
        this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs[k].childAssetMaintenanceCategoryTOs[l].childAssetMaintenanceCategoryTOs.splice(m, 1);
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
          this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs.push(newJson);
          break;
        case 1:
          // newJson.code = `level 2-${i}`
          this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs.push(newJson);
          break;
        case 2:
          // newJson.code = `level 3-${j}`
          this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs.push(newJson);
          break;
        case 3:
          // newJson.code = `level 4-${k}`
          this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs[k].childAssetMaintenanceCategoryTOs.push(newJson);
          break;
        case 4:
          // newJson.code = `level 5-${l}`
          // this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs[k].childAssetMaintenanceCategoryTOs.push(newJson);
          this.treeData.assetMaintenanceCategoryTOs[0].childAssetMaintenanceCategoryTOs[i].childAssetMaintenanceCategoryTOs[j].childAssetMaintenanceCategoryTOs[k].childAssetMaintenanceCategoryTOs[l].childAssetMaintenanceCategoryTOs.push(newJson);
          break;

      }
    }

    console.log(this.treeData)
  }

  SaveData() {
    console.log(this.treeData);
    this._service.PostService(this.treeData, '/centrallib/saveAssetMaintenanceCategory')
      .subscribe(data => {
        console.log(data);
        this.List = data.assetMaintenanceCategoryTOs;
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
          "assetMaintenanceCategoryTOs": [{
            "select": false,
            "parentId": null,
            "item": false,
            "deleteFlag": true,
            "status": 1,
            "code": "",
            "name": "",
            "childAssetMaintenanceCategoryTOs": [],
            "level": 0,
            "leaf": true,
            "expand": true
          }
          ]
        };
        $('#assetmainCreate').modal('hide');
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
    this.treeData.assetMaintenanceCategoryTOs[0] = record;
    debugger;
    $('#assetmainCreate').modal('show');
  }
  reset() {
    this.request = { "status": "1" };
    this.getList();
  }
}
