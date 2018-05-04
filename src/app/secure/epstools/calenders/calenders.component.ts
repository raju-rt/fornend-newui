import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-calenders',
  templateUrl: './calenders.component.html',
  styleUrls: ['./calenders.component.less'],
  providers: [ApiService, DatePipe]

})
export class CalendersComponent implements OnInit {
  List: any;
  selectedlist = [];
  mStatus = '';
  CalenderForm: FormGroup;
  records = 10;
  dateList: any = { 'Sun': [], 'Mon': [], 'Tue': [], 'Wed': [], 'Thur': [], 'Fri': [], 'Sat': [] };
  weekList: any = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router, private date: DatePipe) { }

  ngOnInit() {
    this.getCalenders();
  }
  getCalenders() {
    let request = { "status": 1, "calType": "GCAL" };
    this._service.PostService(request, '/calendar/getCalendars')
      .subscribe(
      data => {
        this.List = data.calenderTOs;
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
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }

  getCalender() {
    let rec = this.selectedlist[0];
    var request = { "calendarId": rec.id, "status": rec.status, "month": this.date.transform(new Date(), 'MM-yyyy') };
    this._service.PostService(request, '/calendar/getCalDays')
      .subscribe(data => {
        console.log(data);
        console.log(new Date());
        this.dateList = { 'Sun': [], 'Mon': [], 'Tue': [], 'Wed': [], 'Thur': [], 'Fri': [], 'Sat': [] };
        const indexes = Object.keys(data.calenderDaysMap);
        for (let i = 0; i <= indexes.length; i++) {
          const curdate = new Date(data.calenderDaysMap[indexes[i]]);
          const day = curdate.getDay();
          const curday = this.weekList[day];
          const firstDa = new Date(curdate.getFullYear(), curdate.getMonth(), 1).getDay();
          const daynum = Math.ceil((curdate.getDate() + firstDa) / 7);
          const numdt: any = Date.parse(curdate.toDateString());
          this.dateList[curday][daynum - 1 || 0] = curdate;
          this.dateList[curday][daynum - 1 || 0].dateNum = numdt;
        }
      }, error => {
        console.log(error)
      })
  }
}
