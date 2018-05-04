import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
import Chart from 'chart.js';
@Component({
  selector: 'app-resource-curves',
  templateUrl: './resource-curves.component.html',
  styleUrls: ['./resource-curves.component.less'],
  providers: [ApiService]
})
export class ResourceCurvesComponent implements OnInit {
  @ViewChild('charts') charts: ElementRef;
  records = 10;
  List: any = [];
  selectedlist: any = [];
  resourceCreation: FormGroup;
  editDetails: any;
  Isedit = false;
  myBar: any;
  barChartData = {
    labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
    datasets: [{
      type: 'bar',
      label: 'BarChart',
      data: [],
      fill: false,
      backgroundColor: '#82E0AA',
      borderColor: '#82E0AA',
      hoverBackgroundColor: '#82E0AA',
      hoverBorderColor: '#82E0AA',

    }, {
      label: 'LineChart',
      type: 'line',
      data: [],
      fill: false,
      borderColor: '#7FB3D5',
      backgroundColor: '#7FB3D5',
      pointBorderColor: '#7FB3D5',
      pointBackgroundColor: '#7FB3D5',
      pointHoverBackgroundColor: '#7FB3D5',
      pointHoverBorderColor: '#7FB3D5'
    }]
  };
  constructor(private _service: ApiService, private _route: Router, private fb: FormBuilder) {

    this.resourceCreation = this.fb.group({
      'catg': [{ value: 'customised', disabled: true }, Validators.required],
      'range1': [null, Validators.required],
      'range2': [null, Validators.required],
      'range3': [null, Validators.required],
      'range4': [null, Validators.required],
      'range5': [null, Validators.required],
      'range6': [null, Validators.required],
      'range7': [null, Validators.required],
      'range8': [null, Validators.required],
      'range9': [null, Validators.required],
      'range10': [null, Validators.required],
      'total': [null, Validators.compose([Validators.required, FormsValidationService.greaterpercent])],
      'curveType': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getList();

  }
  getList() {
    const request = { 'cmpCode ': null, 'cmpName ': null, 'status': '1' };
    this._service.PostService(request, '/common/getResourceCurves')
      .subscribe(
      data => {
        this.List = data.projResourceCurveTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
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
      const index = this.selectedlist.map(function (x) { return x.id; }).indexOf(code.id);
      this.selectedlist.splice(index, 1);
    }
  }
  saveDetails() {
    this.resourceCreation.get('catg').enable();
    let request: any;
    if (this.Isedit) {
      request = this.editDetails;
      request.catg = this.resourceCreation.value.catg || 'customised';
      request.range1 = this.resourceCreation.value.range1;
      request.range2 = this.resourceCreation.value.range2;
      request.range3 = this.resourceCreation.value.range3;
      request.range4 = this.resourceCreation.value.range4;
      request.range5 = this.resourceCreation.value.range5;
      request.range6 = this.resourceCreation.value.range6;
      request.range7 = this.resourceCreation.value.range7;
      request.range8 = this.resourceCreation.value.range8;
      request.range9 = this.resourceCreation.value.range9;
      request.range10 = this.resourceCreation.value.range10;
      request.total = this.resourceCreation.value.total;
      request.curveType = this.resourceCreation.value.curveType;
    } else {
      request = {
        'resourceCurveTOs': [
          {
            'selected': false, 'clientId': null, 'catg': this.resourceCreation.value.catg || 'customised',
            'status': '1', 'range1': this.resourceCreation.value.range1,
            'range2': this.resourceCreation.value.range2,
            'range3': this.resourceCreation.value.range3,
            'range4': this.resourceCreation.value.range4,
            'range5': this.resourceCreation.value.range5,
            'range6': this.resourceCreation.value.range6,
            'range7': this.resourceCreation.value.range7, 'range8': this.resourceCreation.value.range8,
            'range9': this.resourceCreation.value.range9, 'range10': this.resourceCreation.value.range10,
            'total': this.resourceCreation.value.total, 'curveType': this.resourceCreation.value.curveType
          }]
      };
    }
    this._service.PostService(request, '/common/saveResourceCurves')
      .subscribe(
      data => {
        this.List = data.projResourceCurveTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        this.Isedit = false;
        this.resourceCreation.get('catg').disable();
        $('.modal').modal('hide');
        this.selectedlist = [];
      },
      error => { console.log(error); this.resourceCreation.get('catg').disable(); },
      () => console.log('call Sussessful')
      );
  }

  edit() {
    this.Isedit = true;
    this.editDetails = this.selectedlist[0];
    this.resourceCreation = this.fb.group({
      'catg': [{ value: this.editDetails.catg, disabled: true }, Validators.required],
      'range1': [this.editDetails.range1, Validators.required],
      'range2': [this.editDetails.range2, Validators.required],
      'range3': [this.editDetails.range3, Validators.required],
      'range4': [this.editDetails.range4, Validators.required],
      'range5': [this.editDetails.range5, Validators.required],
      'range6': [this.editDetails.range6, Validators.required],
      'range7': [this.editDetails.range7, Validators.required],
      'range8': [this.editDetails.range8, Validators.required],
      'range9': [this.editDetails.range9, Validators.required],
      'range10': [this.editDetails.range10, Validators.required],
      'total': [this.editDetails.total, Validators.compose([Validators.required, FormsValidationService.greaterpercent])],
      'curveType': [this.editDetails.curveType, Validators.required],
    });
    $('.modal').modal('show');
  }
  OnResourceChange() {
    this.resourceCreation.controls.total.markAsTouched({ onlySelf: true });
    const tot = parseInt(this.resourceCreation.value.range1 || 0, 10) +
      parseInt(this.resourceCreation.value.range2 || 0, 10) +
      parseInt(this.resourceCreation.value.range3 || 0, 10) +
      parseInt(this.resourceCreation.value.range4 || 0, 10) +
      parseInt(this.resourceCreation.value.range5 || 0, 10) +
      parseInt(this.resourceCreation.value.range6 || 0, 10) +
      parseInt(this.resourceCreation.value.range7 || 0, 10) +
      parseInt(this.resourceCreation.value.range8 || 0, 10) +
      parseInt(this.resourceCreation.value.range9 || 0, 10) +
      parseInt(this.resourceCreation.value.range10 || 0, 10);
    this.resourceCreation.patchValue({ total: tot });
  }
  closeModal() {
    this.resourceCreation.reset();
    this.resourceCreation.patchValue({ catg: 'customised' });
    $('.modal').modal('hide');
  }
  verifyCode(val) {

  }
  getChart(record) {
    if (this.myBar) {
      this.myBar.destroy();
    }
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.datasets[0].data.push(record.range1);
    this.barChartData.datasets[1].data.push(record.range1);
    this.barChartData.datasets[0].data.push(record.range2);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2);
    this.barChartData.datasets[0].data.push(record.range3);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3);
    this.barChartData.datasets[0].data.push(record.range4);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4);
    this.barChartData.datasets[0].data.push(record.range5);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4 + record.range5);
    this.barChartData.datasets[0].data.push(record.range6);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4 + record.range5 + record.range6);
    this.barChartData.datasets[0].data.push(record.range7);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4 + record.range5
      + record.range6 + record.range7);
    this.barChartData.datasets[0].data.push(record.range8);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4 + record.range5
      + record.range6 + record.range7 + record.range8);
    this.barChartData.datasets[0].data.push(record.range9);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4 + record.range5 +
      record.range6 + record.range7 + record.range8 + record.range9);
    this.barChartData.datasets[0].data.push(record.range10);
    this.barChartData.datasets[1].data.push(record.range1 + record.range2 + record.range3 + record.range4 + record.range5 +
      record.range6 + record.range7 + record.range8 + record.range9 + record.range10);
    const ctx = this.charts.nativeElement.getContext('2d');
    this.myBar = new Chart(ctx, {
      type: 'bar',
      data: this.barChartData,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Combo Bar Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: true
        }, scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
